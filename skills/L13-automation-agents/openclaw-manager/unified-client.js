#!/usr/bin/env node
/**
 * Unified OpenClaw Client
 * Supports both:
 * - BoAs (srv2) - Simple MCP protocol
 * - WS Bot (srv1) - Gateway Protocol v3
 */

const WebSocket = require('ws');
const crypto = require('crypto');

class OpenClawClient {
  constructor(config) {
    this.name = config.name;
    this.url = config.url;
    this.token = config.token;
    this.protocol = config.protocol; // 'mcp' or 'gateway-v3'

    this.ws = null;
    this.authenticated = false;
    this.requestId = 0;
    this.pendingRequests = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const wsOptions = this.protocol === 'gateway-v3' ? {
        headers: { 'Origin': this.url.replace('/mcp-jsonrpc', '').replace('wss://', 'https://') }
      } : {};

      this.ws = new WebSocket(this.url, wsOptions);

      this.ws.on('open', () => {
        console.error(`[${this.name}] Connected`);
      });

      this.ws.on('message', (data) => {
        const msg = JSON.parse(data);
        this.handleMessage(msg, resolve, reject);
      });

      this.ws.on('error', (e) => reject(e));
      this.ws.on('close', () => {
        console.error(`[${this.name}] Disconnected`);
        this.authenticated = false;
      });

      setTimeout(() => reject(new Error('Connection timeout')), 15000);
    });
  }

  handleMessage(msg, resolve, reject) {
    // BoAs (srv2) - Simple MCP protocol
    if (this.protocol === 'mcp') {
      if (msg.type === 'auth_challenge') {
        const hmac = crypto.createHmac('sha256', this.token);
        hmac.update(msg.nonce);
        this.ws.send(JSON.stringify({
          type: 'auth_response',
          response: hmac.digest('hex')
        }));
      } else if (msg.type === 'auth_success') {
        console.error(`[${this.name}] Authenticated`);
        this.authenticated = true;
        resolve();
      } else if (msg.jsonrpc === '2.0' && msg.id) {
        const pending = this.pendingRequests.get(msg.id);
        if (pending) {
          pending.resolve(msg.result || msg.error);
          this.pendingRequests.delete(msg.id);
        }
      }
    }

    // WS Bot (srv1) - Gateway Protocol v3
    if (this.protocol === 'gateway-v3') {
      if (msg.type === 'event' && msg.event === 'connect.challenge') {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
        const nonce = msg.payload.nonce;
        const signature = crypto.sign(null, Buffer.from(nonce), privateKey).toString('hex');

        this.ws.send(JSON.stringify({
          type: 'req',
          id: 'auth',
          method: 'connect',
          params: {
            minProtocol: 3,
            maxProtocol: 3,
            client: {
              id: 'openclaw-control-ui',
              version: '1.0.0',
              platform: 'web',
              mode: 'webchat'
            },
            role: 'operator',
            auth: { token: this.token },
            device: {
              id: crypto.createHash('sha256').update(publicKey.export({ type: 'spki', format: 'der' })).digest('hex').substring(0, 32),
              publicKey: publicKey.export({ type: 'spki', format: 'der' }).toString('hex'),
              signature,
              signedAt: msg.payload.ts,
              nonce
            }
          }
        }));
      } else if (msg.type === 'res' && msg.id === 'auth' && msg.ok === true) {
        console.error(`[${this.name}] Authenticated (Gateway v3)`);
        this.authenticated = true;
        resolve();
      } else if (msg.type === 'res' && msg.id) {
        const pending = this.pendingRequests.get(msg.id);
        if (pending) {
          pending.resolve(msg.ok ? msg.payload : msg.error);
          this.pendingRequests.delete(msg.id);
        }
      }
    }
  }

  async call(method, params = {}) {
    if (!this.authenticated) {
      throw new Error('Not authenticated');
    }

    return new Promise((resolve, reject) => {
      const id = `req-${++this.requestId}`;
      this.pendingRequests.set(id, { resolve, reject });

      if (this.protocol === 'mcp') {
        // MCP JSON-RPC format
        this.ws.send(JSON.stringify({
          jsonrpc: '2.0',
          id,
          method,
          params
        }));
      } else if (this.protocol === 'gateway-v3') {
        // Gateway v3 format
        this.ws.send(JSON.stringify({
          type: 'req',
          id,
          method,
          params
        }));
      }

      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Export for use in skill
module.exports = { OpenClawClient };

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const serverName = args[0] || 'boas';

  const configs = {
    boas: {
      name: 'BoAs',
      url: 'wss://001.srv2.it-reality.de/mcp-jsonrpc',
      token: '16b934a517cba35fd2c82659bb4ff20390e5c84420df18a3b6a1d09e0c059079',
      protocol: 'mcp'
    },
    wsbot: {
      name: 'WS Bot',
      url: 'wss://001.srv1.it-reality.de/mcp-jsonrpc',
      token: '4131e9713a1ef07c8a55007a391960bc5501207c1e4dc1294f789fe840786f14',
      protocol: 'gateway-v3'
    }
  };

  const config = configs[serverName];
  if (!config) {
    console.error('Usage: node unified-client.js [boas|wsbot] [method] [params...]');
    process.exit(1);
  }

  const client = new OpenClawClient(config);

  (async () => {
    try {
      await client.connect();

      const method = args[1] || 'health';
      const params = args[2] ? JSON.parse(args[2]) : {};

      console.log(`\nCalling ${method}...`);
      const result = await client.call(method, params);

      console.log('\nResult:');
      console.log(JSON.stringify(result, null, 2));

      client.close();
      process.exit(0);
    } catch (error) {
      console.error('Error:', error.message);
      client.close();
      process.exit(1);
    }
  })();
}
