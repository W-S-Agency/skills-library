---
name: ln-853-calendar-booking
description: L3 Worker for calendar automation. Auto-schedule meetings, check availability using google-workspace source (Calendar API).
---

# Calendar Booking (L3 Worker)

Automates meeting scheduling and availability checks via Google Calendar.

## Purpose & Scope

- Check calendar availability (free/busy)
- Create calendar events with attendees
- Find optimal meeting slots
- Send calendar invites
- Uses **google-workspace** source (Calendar API)

## Dependencies

```python
google-api-python-client==2.115.0
pytz==2024.1  # Timezone handling
```

## Core Functions

### 1. Check Availability

```python
from googleapiclient.discovery import build

def check_availability(calendar_id: str, start: str, end: str):
    """Check if calendar has free slots."""
    service = build('calendar', 'v3', credentials=credentials)

    body = {
        "timeMin": start,
        "timeMax": end,
        "items": [{"id": calendar_id}]
    }

    result = service.freebusy().query(body=body).execute()
    busy_times = result['calendars'][calendar_id]['busy']

    return len(busy_times) == 0  # True if free
```

### 2. Create Meeting

```python
def create_meeting(title: str, start: str, end: str, attendees: list):
    """Create calendar event with attendees."""
    service = build('calendar', 'v3', credentials=credentials)

    event = {
        'summary': title,
        'start': {'dateTime': start, 'timeZone': 'Europe/Berlin'},
        'end': {'dateTime': end, 'timeZone': 'Europe/Berlin'},
        'attendees': [{'email': email} for email in attendees],
    }

    result = service.events().insert(calendarId='primary', body=event).execute()
    return result['htmlLink']  # Calendar invite link
```

### 3. Find Optimal Slot

```python
def find_meeting_slot(attendees: list, duration_minutes: int):
    """Find first available slot for all attendees."""
    # Check availability for each attendee
    # Find overlapping free times
    # Return optimal slot (earliest available)
    pass
```

## Business Use Cases

**2Penguins:** Schedule client kickoff meetings
**WS Agency:** Book strategy review calls with clients
**w&k Connect:** Auto-schedule CRM demo calls

## Timezone Handling

Always use explicit timezones:
```python
'timeZone': 'Europe/Berlin'  # Germany (GMT+1)
```

## Definition of Done

- [ ] Availability checked for all attendees
- [ ] Optimal slot found (or alternatives suggested)
- [ ] Calendar event created
- [ ] Invites sent to attendees
- [ ] Event link returned

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
