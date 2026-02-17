---
name: ln-854-notification-hub
description: L3 Worker for multi-channel notifications. Sends alerts via Slack, Email, Webhooks with priority routing.
---

# Notification Hub (L3 Worker)

Multi-channel notification system for alerts and updates.

## Purpose & Scope

- Send notifications to Slack, Email, SMS
- Trigger webhooks (Zapier, Make, custom)
- Priority routing (critical → Slack+Email, normal → Email only)
- Uses **bitrix24** source (webhooks) and **google-workspace** (email)

## Dependencies

```python
slack-sdk==3.26.2
requests==2.31.0
```

## Core Functions

### 1. Send Slack Notification

```python
import requests

def send_slack(webhook_url: str, message: str):
    """Send notification to Slack channel."""
    payload = {'text': message}
    requests.post(webhook_url, json=payload)
```

### 2. Unified Notification

```python
def notify(message: str, priority: str = 'normal', channels: list = None):
    """Send notification to multiple channels based on priority."""
    if channels is None:
        # Auto-select based on priority
        if priority == 'critical':
            channels = ['slack', 'email']
        elif priority == 'high':
            channels = ['slack']
        else:
            channels = ['email']

    for channel in channels:
        if channel == 'slack':
            send_slack(SLACK_WEBHOOK, message)
        elif channel == 'email':
            send_email_alert(ADMIN_EMAIL, 'Alert', message)
```

### 3. CRM Event Webhook

```python
def on_crm_event(event_type: str, data: dict):
    """Trigger notification on CRM events (new lead, deal closed)."""
    if event_type == 'high_value_lead' and data['value'] > 50000:
        notify(
            f"🚨 High-value lead: {data['name']} - €{data['value']}",
            priority='critical'
        )
```

## Business Use Cases

**w&k Connect:** CRM alerts (new high-value leads, deals closed)
**Topholz24:** Inventory alerts (low stock, out of stock)
**WS Agency:** Campaign milestones (traffic goals reached)
**2Penguins:** Project status updates (deployment complete)

## Priority Levels

| Priority | Channels | Use Case |
|----------|----------|----------|
| **Critical** | Slack + Email | System down, high-value lead |
| **High** | Slack | Deal closed, goal reached |
| **Normal** | Email | Daily reports, status updates |
| **Low** | Log only | Debug info, metrics |

## Definition of Done

- [ ] Message formatted for channel
- [ ] Priority level determined
- [ ] Notification sent to all channels
- [ ] Delivery confirmed
- [ ] Summary returned (channels used)

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
