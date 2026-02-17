# Styling Patterns for Word Documents

Complete guide for applying professional styling to Word documents using python-docx.

---

## Document Structure

### Professional Document Template

```python
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def create_professional_document(company: str):
    """Create professionally styled document."""
    doc = Document()

    # Set document margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1.25)
        section.right_margin = Inches(1.25)

    return doc
```

---

## Company Branding Patterns

### 2Penguins (Digital/Web Agency)

**Colors:**
- Primary: `#1E40AF` (Blue) - RGB(30, 64, 175)
- Secondary: `#F59E0B` (Orange) - RGB(245, 158, 11)

**Fonts:**
- Headings: Arial Bold
- Body: Arial Regular

**Implementation:**
```python
def apply_2penguins_style(paragraph, style_type='heading'):
    """Apply 2Penguins branding to paragraph."""
    run = paragraph.runs[0] if paragraph.runs else paragraph.add_run()

    if style_type == 'heading':
        run.font.name = 'Arial'
        run.font.size = Pt(18)
        run.font.bold = True
        run.font.color.rgb = RGBColor(30, 64, 175)  # Blue
    elif style_type == 'subheading':
        run.font.name = 'Arial'
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = RGBColor(245, 158, 11)  # Orange
    else:  # body
        run.font.name = 'Arial'
        run.font.size = Pt(11)
        run.font.color.rgb = RGBColor(31, 41, 55)  # Dark gray
```

---

### w&k Connect (CRM/ERP)

**Colors:**
- Primary: `#059669` (Green) - RGB(5, 150, 105)
- Secondary: `#6366F1` (Indigo) - RGB(99, 102, 241)

**Implementation:**
```python
def apply_wk_style(paragraph, style_type='heading'):
    """Apply w&k Connect branding."""
    run = paragraph.runs[0] if paragraph.runs else paragraph.add_run()

    if style_type == 'heading':
        run.font.name = 'Open Sans'
        run.font.size = Pt(16)
        run.font.bold = True
        run.font.color.rgb = RGBColor(5, 150, 105)  # Green
```

---

### WS Agency (Marketing/SEO)

**Colors:**
- Primary: `#DC2626` (Red) - RGB(220, 38, 38)
- Secondary: `#0891B2` (Cyan) - RGB(8, 145, 178)

---

### Topholz24 (E-commerce)

**Colors:**
- Primary: `#92400E` (Brown) - RGB(146, 64, 14)
- Secondary: `#15803D` (Green) - RGB(21, 128, 61)

---

## Headers and Footers

### Professional Header

```python
from docx.oxml.ns import qn

def add_header(doc, company_logo_path: str, document_title: str):
    """Add professional header with logo and title."""
    section = doc.sections[0]
    header = section.header

    # Create header table (2 columns)
    header_table = header.add_table(rows=1, cols=2, width=Inches(6))
    header_table.autofit = False

    # Left cell: Logo
    left_cell = header_table.rows[0].cells[0]
    paragraph = left_cell.paragraphs[0]
    run = paragraph.add_run()
    run.add_picture(company_logo_path, width=Inches(1.5))

    # Right cell: Document title and date
    right_cell = header_table.rows[0].cells[1]
    right_cell.vertical_alignment = WD_ALIGN_PARAGRAPH.CENTER
    p = right_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

    run = p.add_run(document_title)
    run.font.size = Pt(12)
    run.font.bold = True

    p.add_run('\n')

    from datetime import date
    date_run = p.add_run(date.today().strftime('%d %B %Y'))
    date_run.font.size = Pt(10)
    date_run.font.color.rgb = RGBColor(107, 114, 128)  # Gray
```

### Professional Footer

```python
def add_footer(doc, company_name: str, contact_info: dict):
    """Add footer with company info and page numbers."""
    section = doc.sections[0]
    footer = section.footer

    # Company contact line
    p = footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    contact_text = f"{company_name} | {contact_info.get('address', '')} | {contact_info.get('email', '')} | {contact_info.get('phone', '')}"
    run = p.add_run(contact_text)
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(107, 114, 128)

    # Page numbers
    p.add_run('\n')
    page_run = p.add_run('Page ')
    page_run.font.size = Pt(9)

    # Add page number field
    from docx.oxml import OxmlElement
    fldChar1 = OxmlElement('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')

    instrText = OxmlElement('w:instrText')
    instrText.text = 'PAGE'

    fldChar2 = OxmlElement('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'end')

    page_run._r.append(fldChar1)
    page_run._r.append(instrText)
    page_run._r.append(fldChar2)
```

---

## Tables

### Professional Table Styling

```python
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.shared import Pt

def create_styled_table(doc, data: list, headers: list, company: str):
    """Create professionally styled table."""
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    # Header row
    header_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        cell = header_cells[i]
        cell.text = header

        # Style header
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.font.bold = True
                run.font.size = Pt(11)
                run.font.color.rgb = RGBColor(255, 255, 255)  # White

        # Company-specific header color
        if company == '2penguins':
            cell._element.get_or_add_tcPr().append(
                parse_xml(f'<w:shd {nsdecls("w")} w:fill="1E40AF"/>')
            )

    # Data rows
    for row_data in data:
        row = table.add_row()
        for i, value in enumerate(row_data):
            row.cells[i].text = str(value)

    return table
```

---

## Lists and Bullets

### Custom Bullet Points

```python
def add_custom_bullets(doc, items: list, company: str):
    """Add custom styled bullet points."""
    for item in items:
        p = doc.add_paragraph(item, style='List Bullet')

        # Custom styling
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.space_after = Pt(6)

        for run in p.runs:
            run.font.name = 'Arial'
            run.font.size = Pt(11)
```

---

## Page Breaks and Sections

```python
from docx.enum.text import WD_BREAK

def add_page_break(doc):
    """Add page break."""
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

def add_section_header(doc, title: str, company: str):
    """Add styled section header."""
    p = doc.add_heading(title, level=1)

    for run in p.runs:
        if company == '2penguins':
            run.font.color.rgb = RGBColor(30, 64, 175)
        elif company == 'wk':
            run.font.color.rgb = RGBColor(5, 150, 105)
```

---

## Complete Example: 2Penguins Proposal

```python
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from datetime import date

def generate_2penguins_proposal(
    client_name: str,
    project_name: str,
    budget: float,
    deliverables: list
):
    """Generate complete 2Penguins proposal with branding."""
    doc = Document()

    # 1. Add header
    add_header(doc, 'logo-2penguins.png', 'Project Proposal')

    # 2. Title page
    title = doc.add_heading(f'Proposal for {client_name}', level=0)
    apply_2penguins_style(title, 'heading')

    subtitle = doc.add_paragraph(project_name)
    apply_2penguins_style(subtitle, 'subheading')

    doc.add_paragraph(f'Date: {date.today().strftime("%d %B %Y")}')

    add_page_break(doc)

    # 3. Executive Summary
    add_section_header(doc, 'Executive Summary', '2penguins')
    doc.add_paragraph(
        f'2Penguins is pleased to present this proposal for {project_name}. '
        f'This project will deliver a comprehensive digital solution for {client_name}.'
    )

    # 4. Project Scope
    add_section_header(doc, 'Project Scope', '2penguins')
    add_custom_bullets(doc, deliverables, '2penguins')

    # 5. Budget
    add_section_header(doc, 'Investment', '2penguins')

    budget_table_data = [
        ['Item', 'Amount'],
        ['Development', f'€{budget * 0.7:,.2f}'],
        ['Design', f'€{budget * 0.2:,.2f}'],
        ['Project Management', f'€{budget * 0.1:,.2f}'],
        ['Total', f'€{budget:,.2f}']
    ]

    # Create table (simplified for example)
    table = doc.add_table(rows=len(budget_table_data), cols=2)
    for i, row_data in enumerate(budget_table_data):
        for j, cell_data in enumerate(row_data):
            table.rows[i].cells[j].text = cell_data

    # 6. Footer
    add_footer(doc, '2Penguins GmbH', {
        'address': 'Berlin, Germany',
        'email': 'hello@2penguins.com',
        'phone': '+49 30 1234567'
    })

    # Save
    output_path = f'proposals/{client_name.lower().replace(" ", "_")}_proposal_{date.today().isoformat()}.docx'
    doc.save(output_path)

    return output_path
```

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
