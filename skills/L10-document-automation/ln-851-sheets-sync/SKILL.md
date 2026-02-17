---
name: ln-851-sheets-sync
description: L3 Worker for Google Sheets integration. Bidirectional sync between Sheets and CRM/databases using google-workspace source.
---

# Google Sheets Sync (L3 Worker)

Syncs data between Google Sheets and other systems (Bitrix24, databases).

## Purpose & Scope

- Read/write Google Sheets data
- Sync CRM data to Sheets (one-way or bidirectional)
- Detect and resolve conflicts
- Uses **google-workspace** source (already configured)

## Dependencies

```python
gspread==6.0.2
google-auth==2.26.2
pandas==2.2.0
```

## Core Functions

### 1. Read from Sheets

```python
import gspread

def read_sheet(spreadsheet_id: str, range_name: str):
    """Read data from Google Sheets."""
    gc = gspread.authorize(credentials)
    sh = gc.open_by_key(spreadsheet_id)
    ws = sh.worksheet('Sheet1')

    data = ws.get(range_name)
    return pd.DataFrame(data[1:], columns=data[0])
```

### 2. Write to Sheets

```python
def write_sheet(spreadsheet_id: str, range_name: str, data: list):
    """Write data to Google Sheets."""
    gc = gspread.authorize(credentials)
    sh = gc.open_by_key(spreadsheet_id)
    ws = sh.worksheet('Sheet1')

    ws.update(range_name, data)
```

### 3. Bidirectional Sync

```python
def sync_crm_to_sheets(crm_data: list, spreadsheet_id: str):
    """Sync Bitrix24 CRM data to Google Sheets."""
    # Fetch current Sheets data
    sheets_data = read_sheet(spreadsheet_id, 'A1:Z100')

    # Compare and detect changes
    # ...

    # Write updates to Sheets
    write_sheet(spreadsheet_id, 'A2', crm_data)
```

## Business Use Cases

**w&k Connect:** Sync Bitrix24 leads/deals to Google Sheets for reporting
**Topholz24:** Sync inventory data to Sheets for analysis
**WS Agency:** Export campaign metrics to Sheets for client access

## Conflict Resolution

- **Last-write-wins:** Newest data overwrites older
- **Manual review:** Flag conflicts for user decision
- **Merge:** Combine non-conflicting fields

## Definition of Done

- [ ] Sheets data read successfully
- [ ] Data validated (no corrupted values)
- [ ] Sync completed (write to Sheets)
- [ ] Conflicts resolved (if bidirectional)
- [ ] Summary returned (rows updated)

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
