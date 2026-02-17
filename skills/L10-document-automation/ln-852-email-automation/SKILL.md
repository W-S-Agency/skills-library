---
name: ln-852-email-automation
description: L3 Worker for email campaigns and transactional emails. Supports Gmail and Outlook using google-workspace source and Jinja2 templates.
---

# Email Automation (L3 Worker)

Automates email campaigns and transactional emails via Gmail/Outlook.

## Purpose & Scope

- Send single emails or bulk campaigns
- Use Jinja2 templates for personalization
- Attach files (reports, documents)
- Schedule delayed emails
- Uses **google-workspace** source (Gmail API)

## Dependencies

```python
google-api-python-client==2.115.0
jinja2==3.1.2
```

## Core Functions

### 1. Send Single Email

```python
from googleapiclient.discovery import build

def send_email(to: str, subject: str, body: str, attachments: list = None):
    """Send email via Gmail API."""
    service = build('gmail', 'v1', credentials=credentials)

    message = create_message(to, subject, body, attachments)
    service.users().messages().send(userId='me', body=message).execute()
```

### 2. Send Bulk Campaign

```python
from jinja2 import Template

def send_campaign(recipients: list, template: str, data: dict):
    """Send personalized email to multiple recipients."""
    tmpl = Template(template)

    for recipient in recipients:
        body = tmpl.render(client_name=recipient['name'], **data)
        send_email(recipient['email'], data['subject'], body)
```

### 3. Email with Attachment

```python
def send_report(to: str, report_path: str):
    """Send email with Excel/PDF report attached."""
    subject = "Monthly Report"
    body = "Please find attached your monthly report."
    send_email(to, subject, body, attachments=[report_path])
```

## Business Use Cases

**WS Agency:** SEO report delivery, client email campaigns
**w&k Connect:** CRM alert emails, weekly reports to management
**2Penguins:** Project update emails to clients

## Template Example

```html
Hello {{client_name}},

Your SEO report for {{month}} is ready.

Key Metrics:
- Traffic: {{traffic}} visits (+{{growth}}%)
- Keywords: {{keywords_ranked}} ranked

Best regards,
WS Agency Team
```

## Definition of Done

- [ ] Template loaded and variables filled
- [ ] Recipients validated (valid emails)
- [ ] Emails sent successfully
- [ ] Delivery confirmed (no bounces)
- [ ] Summary returned (sent count)

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
