# python-docx Library Guide

Quick reference for Word document generation using python-docx.

## Installation

```bash
pip install python-docx==1.1.0
```

## Basic Usage

### Create New Document

```python
from docx import Document

doc = Document()
doc.add_heading('Document Title', 0)
doc.add_paragraph('This is a paragraph.')
doc.save('output.docx')
```

### Load Existing Template

```python
doc = Document('template.docx')
# Modify content
doc.save('output.docx')
```

## Common Operations

### Headings

```python
doc.add_heading('Heading 1', level=1)
doc.add_heading('Heading 2', level=2)
```

### Paragraphs

```python
p = doc.add_paragraph('Normal text')
p.add_run(' bold text').bold = True
p.add_run(' italic text').italic = True
```

### Tables

```python
table = doc.add_table(rows=3, cols=3)
table.rows[0].cells[0].text = 'Header 1'
```

### Images

```python
from docx.shared import Inches
doc.add_picture('logo.png', width=Inches(2))
```

## Styling

```python
from docx.shared import Pt, RGBColor

run = p.add_run('Styled text')
run.font.size = Pt(14)
run.font.color.rgb = RGBColor(0, 0, 255)  # Blue
```

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
