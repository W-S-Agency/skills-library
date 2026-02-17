# openpyxl Complete Guide

Production-ready patterns for Excel report generation with charts and styling.

---

## Installation

```bash
pip install openpyxl==3.1.2 pandas==2.2.0
```

---

## Basic Operations

### Create Workbook

```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment

wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Report"

# Write data
ws['A1'] = 'Month'
ws['B1'] = 'Revenue'
ws.append(['January', 50000])
ws.append(['February', 65000])

wb.save('report.xlsx')
```

---

## Charts

### Bar Chart

```python
from openpyxl.chart import BarChart, Reference

# Create chart
chart = BarChart()
chart.title = "Monthly Revenue"
chart.x_axis.title = "Month"
chart.y_axis.title = "Revenue (€)"

# Define data range
data = Reference(ws, min_col=2, min_row=1, max_row=13)
cats = Reference(ws, min_col=1, min_row=2, max_row=13)

chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)

# Add to worksheet
ws.add_chart(chart, "D2")
```

### Line Chart

```python
from openpyxl.chart import LineChart

chart = LineChart()
chart.title = "Traffic Trend"
chart.style = 13  # Blue theme

data = Reference(ws, min_col=2, min_row=1, max_col=3, max_row=13)
chart.add_data(data, titles_from_data=True)

ws.add_chart(chart, "D15")
```

### Pie Chart

```python
from openpyxl.chart import PieChart

chart = PieChart()
chart.title = "Market Share"

data = Reference(ws, min_col=2, min_row=2, max_row=5)
labels = Reference(ws, min_col=1, min_row=2, max_row=5)

chart.add_data(data)
chart.set_categories(labels)

ws.add_chart(chart, "F2")
```

---

## Styling

### Cell Styling

```python
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# Header styling
header_font = Font(name='Arial', size=11, bold=True, color='FFFFFF')
header_fill = PatternFill(start_color='1E40AF', end_color='1E40AF', fill_type='solid')
header_alignment = Alignment(horizontal='center', vertical='center')

ws['A1'].font = header_font
ws['A1'].fill = header_fill
ws['A1'].alignment = header_alignment
```

### Conditional Formatting

```python
from openpyxl.formatting.rule import ColorScaleRule

# Traffic light colors (Red → Yellow → Green)
rule = ColorScaleRule(
    start_type='min', start_color='EF4444',  # Red
    mid_type='percentile', mid_value=50, mid_color='F59E0B',  # Orange
    end_type='max', end_color='10B981'  # Green
)

ws.conditional_formatting.add('B2:B100', rule)
```

---

## Formulas

```python
# SUM formula
ws['B14'] = '=SUM(B2:B13)'

# AVERAGE
ws['C14'] = '=AVERAGE(C2:C13)'

# Percentage change
ws['D2'] = '=(B2-C2)/C2'
ws['D2'].number_format = '0.0%'
```

---

## Number Formatting

```python
# Currency
ws['B2'].number_format = '€#,##0.00'

# Percentage
ws['C2'].number_format = '0.0%'

# Date
ws['A2'].number_format = 'YYYY-MM-DD'

# Large numbers with thousands separator
ws['D2'].number_format = '#,##0'
```

---

## Column Width & Row Height

```python
# Auto-adjust column width
ws.column_dimensions['A'].width = 20
ws.column_dimensions['B'].width = 15

# Row height
ws.row_dimensions[1].height = 30
```

---

## Complete Example: CRM Report

```python
import openpyxl
from openpyxl.chart import BarChart, Reference
from openpyxl.styles import Font, PatternFill, Alignment
from datetime import date

def create_crm_report(broker_data: list):
    """Generate w&k Connect CRM report with charts."""
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Broker Performance"

    # Title
    ws.merge_cells('A1:E1')
    ws['A1'] = f'w&k Connect CRM Report - {date.today().strftime("%B %Y")}'
    ws['A1'].font = Font(size=16, bold=True, color='059669')
    ws['A1'].alignment = Alignment(horizontal='center')

    # Headers
    headers = ['Broker', 'Leads', 'Deals', 'Revenue', 'Conversion %']
    for col, header in enumerate(headers, start=1):
        cell = ws.cell(row=3, column=col)
        cell.value = header
        cell.font = Font(bold=True, color='FFFFFF')
        cell.fill = PatternFill(start_color='059669', fill_type='solid')
        cell.alignment = Alignment(horizontal='center')

    # Data
    for row_idx, broker in enumerate(broker_data, start=4):
        ws.cell(row=row_idx, column=1, value=broker['name'])
        ws.cell(row=row_idx, column=2, value=broker['leads'])
        ws.cell(row=row_idx, column=3, value=broker['deals'])
        ws.cell(row=row_idx, column=4, value=broker['revenue'])
        ws.cell(row=row_idx, column=5, value=broker['conversion'])

        # Format currency
        ws.cell(row=row_idx, column=4).number_format = '€#,##0.00'
        ws.cell(row=row_idx, column=5).number_format = '0.0%'

    # Chart
    chart = BarChart()
    chart.title = "Broker Performance (Revenue)"
    data = Reference(ws, min_col=4, min_row=3, max_row=len(broker_data)+3)
    cats = Reference(ws, min_col=1, min_row=4, max_row=len(broker_data)+3)
    chart.add_data(data, titles_from_data=True)
    chart.set_categories(cats)
    ws.add_chart(chart, "G3")

    wb.save('crm_report.xlsx')
```

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
