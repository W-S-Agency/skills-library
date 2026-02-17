---
name: ln-850-integration-helpers
description: L1 Coordinator for integration automation. Routes requests to specialized workers (Sheets sync, email, calendar, notifications). Uses google-workspace and bitrix24 sources.
---

# Integration Helpers Coordinator

Coordinates integration tasks across Google Workspace, Bitrix24, and other services.

## Overview

### What This Skill Does

Routes integration requests to specialized workers:
- **Sheets sync (ln-851):** Google Sheets ↔ CRM bidirectional sync
- **Email automation (ln-852):** Gmail/Outlook campaign and transactional emails
- **Calendar booking (ln-853):** Auto-schedule meetings, availability checks
- **Notifications (ln-854):** Multi-channel alerts (Slack, Email, Webhooks)

## Core Concepts

### Coordinator Pattern

**ln-850 is a pure coordinator** - delegates all work to workers:
- ✅ Analyzes user request (detect integration type)
- ✅ Validates sources (check google-workspace, bitrix24 active)
- ✅ Routes to appropriate worker
- ❌ Does NOT perform integrations directly

### Source Integration

| Worker | WS Workspace Source | Tools Used |
|--------|---------------------|------------|
| **ln-851** | google-workspace | sheets_read, sheets_write |
| **ln-852** | google-workspace | gmail_send, gmail_search |
| **ln-853** | google-workspace | calendar_create, calendar_list |
| **ln-854** | bitrix24 | webhooks (custom) |

## Workflow

1. **Intent Detection:** Analyze request keywords
2. **Source Validation:** Check if required source active
3. **Worker Delegation:** Route to ln-851/852/853/854
4. **Result Summary:** Return worker output to user

## Business Use Cases

**w&k Connect:** CRM → Sheets sync, email reports
**WS Agency:** Email campaigns, client notifications
**2Penguins:** Calendar booking for client meetings
**Topholz24:** Inventory alerts, supplier notifications

## Workers

- [ln-851-sheets-sync](../ln-851-sheets-sync/SKILL.md) - Google Sheets integration
- [ln-852-email-automation](../ln-852-email-automation/SKILL.md) - Email campaigns
- [ln-853-calendar-booking](../ln-853-calendar-booking/SKILL.md) - Meeting scheduling
- [ln-854-notification-hub](../ln-854-notification-hub/SKILL.md) - Multi-channel alerts

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
