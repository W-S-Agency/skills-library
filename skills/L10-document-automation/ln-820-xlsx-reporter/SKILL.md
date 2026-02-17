---
name: ln-820-xlsx-reporter
description: L3 Worker for Excel report generation. Creates analytics reports with charts, formulas, conditional formatting using openpyxl.
---

# Excel Reporter (L3 Worker)

Creates professional Excel reports with charts, analytics, and conditional formatting.

## Purpose & Scope

- Generate .xlsx reports from data (CRM, SEO, inventory)
- Add charts (bar, line, pie) for data visualization
- Apply conditional formatting and formulas
- Support multiple worksheets
- NOT for PDF extraction (use ln-840)

## Dependencies

```python
openpyxl==3.1.2
pandas==2.2.0  # For data manipulation
```

## Core Functions

### 1. Create Report from Data

```python
import openpyxl
from openpyxl.chart import BarChart, Reference

def create_crm_report(data: list, output_path: str):
    """Generate CRM report with broker activity chart."""
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Broker Activity"

    # Add headers
    ws.append(['Broker', 'Leads', 'Deals', 'Revenue'])

    # Add data
    for row in data:
        ws.append(row)

    # Add chart
    chart = BarChart()
    chart.title = "Broker Performance"
    data_ref = Reference(ws, min_col=2, min_row=1, max_col=4, max_row=len(data)+1)
    chart.add_data(data_ref, titles_from_data=True)
    ws.add_chart(chart, 'F2')

    wb.save(output_path)
    return output_path
```

### 2. Apply Conditional Formatting

```python
from openpyxl.styles import PatternFill

def apply_traffic_light(ws, column: str, rows: int):
    """Apply green/orange/red formatting based on values."""
    for row in range(2, rows + 1):
        cell = ws[f"{column}{row}"]
        value = cell.value

        if value >= 80:
            cell.fill = PatternFill(start_color="10B981", fill_type="solid")  # Green
        elif value >= 50:
            cell.fill = PatternFill(start_color="F59E0B", fill_type="solid")  # Orange
        else:
            cell.fill = PatternFill(start_color="EF4444", fill_type="solid")  # Red
```

## Workflow

1. **Load data:** From CRM API, database, or CSV
2. **Create workbook:** Add worksheets for different data types
3. **Add headers:** Apply company branding colors
4. **Fill data:** Write rows and formulas
5. **Add charts:** Bar/Line/Pie charts for visualization
6. **Apply formatting:** Conditional formatting, number formats
7. **Save report:** Export as .xlsx

## Business Use Cases

**2Penguins:** Project budgets, time tracking
**w&k Connect:** Weekly CRM reports, broker analytics
**WS Agency:** SEO reports, traffic trends, campaign ROI
**Topholz24:** Inventory reports, supplier analysis

## Chart Types

- **BarChart:** Broker performance, revenue comparison
- **LineChart:** Traffic trends, growth over time
- **PieChart:** Market share, client distribution
- **ScatterChart:** Correlation analysis

## Definition of Done

- [ ] Data loaded and validated
- [ ] Worksheets created with headers
- [ ] Charts added for key metrics
- [ ] Conditional formatting applied
- [ ] Company branding colors used
- [ ] Report saved to output path

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
