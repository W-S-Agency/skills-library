---
name: ln-810-docx-generator
description: L3 Worker for Word document generation. Creates proposals, contracts, reports with company branding using python-docx.
---

# Word Document Generator (L3 Worker)

Creates professional Word documents (proposals, contracts, reports) with company branding.

## Purpose & Scope

- Generate .docx documents from templates with variable substitution
- Apply company branding (2Penguins, w&k Connect, WS Agency, Topholz24)
- Add headers/footers, tables, images, styles
- Export to PDF (optional)
- NOT for PDF editing (use ln-840 for extraction)

## When to Use

Use this worker when:
- Creating client proposals, contracts, business reports
- Need Word format with company branding
- Require structured documents (sections, TOC, tables)

## Dependencies

```python
# Required packages
python-docx==1.1.0
lxml==5.1.0
Pillow==10.2.0  # For image handling
```

## Core Functions

### 1. Create Document from Template

```python
from docx import Document

def create_from_template(template_path: str, variables: dict, output_path: str):
    """Fill template with variables and save."""
    doc = Document(template_path)

    # Replace placeholders in paragraphs
    for paragraph in doc.paragraphs:
        for key, value in variables.items():
            placeholder = f"{{{{{key}}}}}"
            if placeholder in paragraph.text:
                paragraph.text = paragraph.text.replace(placeholder, str(value))

    # Replace in tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for key, value in variables.items():
                    placeholder = f"{{{{{key}}}}}"
                    if placeholder in cell.text:
                        cell.text = cell.text.replace(placeholder, str(value))

    doc.save(output_path)
    return output_path
```

### 2. Apply Company Branding

```python
def apply_branding(doc: Document, company: str):
    """Apply company-specific colors and logo."""
    branding = {
        '2penguins': {'primary': '#1E40AF', 'logo': 'logo-2penguins.png'},
        'wk': {'primary': '#059669', 'logo': 'logo-wk.png'},
        'ws': {'primary': '#DC2626', 'logo': 'logo-ws.png'},
        'topholz': {'primary': '#92400E', 'logo': 'logo-topholz.png'},
    }

    config = branding[company]
    # Add logo to header
    # Set heading colors
    return doc
```

## Workflow

1. **Load template:** Select company-specific template
2. **Collect variables:** Get client_name, project_name, etc.
3. **Fill template:** Replace {{placeholders}}
4. **Apply branding:** Add logo, colors
5. **Save document:** Export as .docx (or .pdf)

## Critical Rules

- Use templates from ln-800/templates/docx/
- All variables must use {{variable}} syntax
- Preserve company branding consistently
- Test output before sending to client

## Business Use Cases

**2Penguins:** Client proposals, project specs
**w&k Connect:** Client contracts, CRM reports
**WS Agency:** Marketing proposals, case studies
**Topholz24:** Supplier contracts, product specs

## Definition of Done

- [ ] Template loaded successfully
- [ ] All variables replaced (no {{placeholders}} left)
- [ ] Company branding applied (logo, colors)
- [ ] Document saved to output path
- [ ] Output validated (open in Word to verify)

## Reference Files

- [python-docx Guide](./references/python_docx_guide.md) - Library patterns
- [Styling Patterns](./references/styling_patterns.md) - Branding application
- [Examples](./examples/) - Sample generation scripts

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
