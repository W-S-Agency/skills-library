/**
 * Browser Manager - Handles Playwright browser lifecycle
 * Manages browser instances and page contexts
 */

import { chromium, firefox, webkit } from 'playwright';

export class BrowserManager {
  constructor(config) {
    this.config = config;
    this.browsers = new Map();
    this.pages = [];
  }

  async launch() {
    const browserTypes = {
      chromium,
      firefox,
      webkit
    };

    // Launch all configured browsers
    const launchPromises = this.config.browsers.map(async (browserName) => {
      const browserType = browserTypes[browserName];
      if (!browserType) {
        throw new Error(`Unknown browser: ${browserName}`);
      }

      const browser = await browserType.launch({
        headless: this.config.headless !== false,
        timeout: 30000
      });

      this.browsers.set(browserName, browser);
    });

    await Promise.all(launchPromises);
  }

  async getPage(browserName, width, height) {
    const browser = this.browsers.get(browserName);
    if (!browser) {
      throw new Error(`Browser not launched: ${browserName}`);
    }

    // Create new context with viewport
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 2, // Retina display
      userAgent: this.getUserAgent(browserName)
    });

    const page = await context.newPage();
    this.pages.push({ page, context });

    return page;
  }

  async close() {
    // Close all pages and contexts
    for (const { page, context } of this.pages) {
      try {
        await page.close();
        await context.close();
      } catch (error) {
        // Ignore errors during cleanup
      }
    }

    // Close all browsers
    const closePromises = Array.from(this.browsers.values()).map(browser =>
      browser.close().catch(() => {})
    );

    await Promise.all(closePromises);

    this.browsers.clear();
    this.pages = [];
  }

  getUserAgent(browserName) {
    // Return realistic user agents for each browser
    const userAgents = {
      chromium: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
      webkit: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15'
    };

    return userAgents[browserName] || userAgents.chromium;
  }
}
