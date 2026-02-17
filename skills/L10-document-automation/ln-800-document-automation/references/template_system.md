# Template System Reference

Guide for reusable document templates across ln-800 document automation workers.

---

## Template Architecture

### Template Storage Structure

```
C:\Users\alexa\.craft-agent\workspaces\my-workspace\skills\ln-800-document-automation\templates\
│
├── docx/                           # Word document templates
│   ├── 2penguins_proposal.docx
│   ├── wk_report.docx
│   ├── ws_pitch.docx
│   └── topholz_contract.docx
│
├── xlsx/                           # Excel spreadsheet templates
│   ├── 2penguins_analytics.xlsx
│   ├── wk_crm_report.xlsx
│   ├── ws_seo_report.xlsx
│   └── topholz_inventory.xlsx
│
├── pptx/                           # PowerPoint presentation templates
│   ├── 2penguins_pitch_deck.pptx
│   ├── ws_strategy.pptx
│   └── generic_presentation.pptx
│
└── metadata/                       # Template metadata (JSON)
    ├── docx_templates.json
    ├── xlsx_templates.json
    └── pptx_templates.json
```

---

## Template Metadata Schema

### docx_templates.json

```json
{
  "templates": [
    {
      "id": "2penguins-proposal",
      "name": "2Penguins Client Proposal",
      "company": "2penguins",
      "path": "docx/2penguins_proposal.docx",
      "type": "proposal",
      "variables": [
        "client_name",
        "project_name",
        "project_scope",
        "timeline",
        "budget",
        "deliverables"
      ],
      "sections": [
        "Executive Summary",
        "Project Scope",
        "Technical Approach",
        "Timeline & Milestones",
        "Budget & Pricing",
        "Terms & Conditions"
      ],
      "branding": {
        "logo": "logo-2penguins.png",
        "primary_color": "#1E40AF",
        "secondary_color": "#F59E0B"
      },
      "last_updated": "2026-02-15"
    },
    {
      "id": "wk-report",
      "name": "w&k Connect CRM Report",
      "company": "wk",
      "path": "docx/wk_report.docx",
      "type": "report",
      "variables": [
        "report_period",
        "total_clients",
        "active_deals",
        "revenue",
        "top_brokers"
      ],
      "sections": [
        "Executive Summary",
        "Key Metrics",
        "Broker Performance",
        "Pipeline Analysis",
        "Recommendations"
      ],
      "branding": {
        "logo": "logo-wk.png",
        "primary_color": "#059669",
        "secondary_color": "#6366F1"
      },
      "last_updated": "2026-02-15"
    }
  ]
}
```

### xlsx_templates.json

```json
{
  "templates": [
    {
      "id": "ws-seo-report",
      "name": "WS Agency SEO Report",
      "company": "ws",
      "path": "xlsx/ws_seo_report.xlsx",
      "type": "analytics",
      "sheets": [
        {
          "name": "Summary",
          "columns": ["Metric", "Current", "Previous", "Change %"],
          "charts": [
            {
              "type": "LineChart",
              "title": "Traffic Trend",
              "data_range": "B2:D13"
            }
          ]
        },
        {
          "name": "Keywords",
          "columns": ["Keyword", "Rank", "Search Volume", "Difficulty"],
          "conditional_formatting": [
            {
              "column": "Rank",
              "rule": "color_scale",
              "colors": ["#10B981", "#F59E0B", "#EF4444"]
            }
          ]
        },
        {
          "name": "Competitors",
          "columns": ["Competitor", "Domain Authority", "Traffic", "Keywords"],
          "charts": [
            {
              "type": "BarChart",
              "title": "Competitor Comparison",
              "data_range": "B2:D10"
            }
          ]
        }
      ],
      "variables": [
        "client_name",
        "report_month",
        "traffic_data",
        "keyword_data",
        "competitor_data"
      ],
      "branding": {
        "logo": "logo-ws.png",
        "primary_color": "#DC2626",
        "header_color": "#DC2626"
      },
      "last_updated": "2026-02-15"
    }
  ]
}
```

---

## Variable Substitution System

### Placeholder Syntax

Templates use double-brace syntax for variables:
```
{{variable_name}}
```

**Examples:**
- `{{client_name}}` → "ACME Corp"
- `{{project_budget}}` → "€25,000"
- `{{report_date}}` → "2026-02-15"

### Variable Types

| Type | Example | Formatting |
|------|---------|------------|
| **String** | `{{client_name}}` | As-is |
| **Number** | `{{budget}}` | `€1,234.56` |
| **Date** | `{{project_start}}` | `2026-03-01` (ISO) or `01 March 2026` |
| **Percentage** | `{{growth_rate}}` | `+15.3%` |
| **List** | `{{deliverables}}` | Bullet points |
| **Table** | `{{broker_stats}}` | Word table or Excel range |

### Python Implementation

```python
from docx import Document

def fill_template(template_path: str, variables: dict, output_path: str):
    """Fill Word template with variables."""
    doc = Document(template_path)

    # Replace in paragraphs
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

---

## Template Creation Guidelines

### Word Document Templates (.docx)

**Structure:**
1. **Header:** Company logo + document type
2. **Title Page:** {{client_name}}, {{project_name}}, date
3. **Table of Contents:** Auto-generated (updateable)
4. **Sections:** Use Heading styles (Heading 1, Heading 2)
5. **Placeholders:** {{variable}} in body text
6. **Footer:** Company info + page numbers

**Best Practices:**
- Use Styles (not manual formatting) for consistency
- Leave placeholder text visible: "Client Name: {{client_name}}"
- Include sample data for visual reference
- Test with real data before deploying

**Example Template Paragraph:**
```
This proposal is prepared for {{client_name}} to deliver {{project_name}}.
The estimated budget is {{project_budget}} with completion by {{deadline}}.

Key Deliverables:
{{deliverables}}
```

---

### Excel Spreadsheet Templates (.xlsx)

**Structure:**
1. **Summary Sheet:** Overview metrics, KPIs, key charts
2. **Data Sheets:** Raw data tables (one per data type)
3. **Charts Sheet:** Consolidated visualizations
4. **Notes Sheet:** Methodology and explanations

**Header Row:**
- Row 1: Title (merged cells, company color background)
- Row 2: Subtitle (report period, client name)
- Row 3: Blank (spacing)
- Row 4: Column headers (bold, company color)

**Best Practices:**
- Define named ranges for chart data (easier updates)
- Use data validation for input cells
- Protect formula cells (unprotect only input cells)
- Add notes/comments for complex calculations

**Example Template Structure:**
```
A1:E1 (merged): "WS Agency SEO Report" (red background, white text)
A2:E2 (merged): "Client: {{client_name}} | Month: {{report_month}}"
A4:E4: Headers (Metric | Current | Previous | Change % | Status)
A5:E20: Data rows (formulas in columns D, E)
G4:M20: Line chart (Traffic Trend)
```

---

### PowerPoint Presentation Templates (.pptx)

**Master Slide Layouts:**
1. **Title Slide:** Company logo, title, subtitle, date
2. **Section Header:** Large heading, company accent color
3. **Title and Content:** Standard bullet points
4. **Two Content:** Side-by-side text or images
5. **Image with Caption:** Full-bleed image + text overlay
6. **Quote Slide:** Large quote text, attribution
7. **Thank You:** Contact info + company logo

**Placeholder Types:**
- `{{slide_title}}` - Slide heading
- `{{bullet_points}}` - List items (one per line)
- `{{image_path}}` - Image file location
- `{{chart_data}}` - Data for embedded chart

**Best Practices:**
- Use master slides (not per-slide formatting)
- Consistent fonts and colors across all slides
- Limit text (max 6 bullet points per slide)
- High-quality images (min 1920×1080 for full-bleed)

---

## Template Versioning

### Version Numbering

Templates use semantic versioning: `MAJOR.MINOR.PATCH`

**Examples:**
- `2penguins_proposal_v1.0.0.docx` - Initial template
- `2penguins_proposal_v1.1.0.docx` - Added new section
- `2penguins_proposal_v2.0.0.docx` - Complete redesign

### Change Log

Maintain `CHANGELOG.md` in templates directory:

```markdown
# Template Changelog

## 2penguins_proposal.docx

### v1.1.0 (2026-02-20)
- Added "Technical Stack" section
- Updated branding colors to match new brand guidelines
- Added code snippet placeholder for API specs

### v1.0.0 (2026-02-15)
- Initial template creation
- 6 sections: Executive Summary, Scope, Technical Approach, Timeline, Budget, Terms
```

---

## Template Selection Logic

### Auto-Selection Algorithm

```python
def select_template(company: str, doc_type: str, format: str) -> str:
    """Auto-select appropriate template based on context."""
    template_map = {
        ('2penguins', 'proposal', 'docx'): 'docx/2penguins_proposal.docx',
        ('2penguins', 'analytics', 'xlsx'): 'xlsx/2penguins_analytics.xlsx',
        ('wk', 'report', 'docx'): 'docx/wk_report.docx',
        ('wk', 'crm', 'xlsx'): 'xlsx/wk_crm_report.xlsx',
        ('ws', 'seo', 'xlsx'): 'xlsx/ws_seo_report.xlsx',
        ('ws', 'pitch', 'pptx'): 'pptx/ws_strategy.pptx',
        ('topholz', 'contract', 'docx'): 'docx/topholz_contract.docx',
        ('topholz', 'inventory', 'xlsx'): 'xlsx/topholz_inventory.xlsx',
    }

    key = (company, doc_type, format)
    template = template_map.get(key)

    if not template:
        # Fallback to generic template
        fallbacks = {
            'docx': 'docx/generic_document.docx',
            'xlsx': 'xlsx/generic_spreadsheet.xlsx',
            'pptx': 'pptx/generic_presentation.pptx',
        }
        template = fallbacks.get(format)

    return template
```

---

## Custom Template Creation

### Process for New Templates

1. **Identify need:** New document type or company
2. **Design template:** Create in Word/Excel/PowerPoint
3. **Add placeholders:** Use {{variable}} syntax
4. **Apply branding:** Company colors, logo, fonts
5. **Test with sample data:** Verify placeholders work
6. **Update metadata:** Add to docx_templates.json
7. **Document variables:** List all {{placeholders}} in README
8. **Version and deploy:** Save as v1.0.0, deploy to templates/

### Template Quality Checklist

- [ ] All placeholders use {{variable}} syntax
- [ ] Company branding applied (logo, colors, fonts)
- [ ] Styles used (not manual formatting)
- [ ] Sample data provided for visual reference
- [ ] Metadata updated in JSON file
- [ ] Tested with real data
- [ ] Version number assigned
- [ ] Changelog entry created

---

## Template Inheritance

### Base Templates

Create base templates for common document types:

**Base Proposal Template:**
```
base_proposal.docx
├── Header (logo placeholder)
├── Title Page (client, project)
├── Executive Summary
├── [Custom Sections]
├── Terms & Conditions
└── Footer (company info)
```

**Company Customization:**
1. Copy base template
2. Apply company branding
3. Add/remove sections as needed
4. Save as company_type_template.docx

**Benefits:**
- Consistency across companies
- Faster template creation
- Easier maintenance (update base, propagate changes)

---

## Integration with Workers

### ln-810 (docx-generator)

```python
# Worker loads template metadata
templates = load_json('templates/metadata/docx_templates.json')

# User specifies company and type
company = '2penguins'
doc_type = 'proposal'

# Auto-select template
template_id = f"{company}-{doc_type}"
template_info = next(t for t in templates['templates'] if t['id'] == template_id)

# Fill template
variables = collect_variables(template_info['variables'])
output = fill_template(template_info['path'], variables, 'output.docx')
```

### ln-820 (xlsx-reporter)

```python
# Load Excel template
wb = openpyxl.load_workbook('templates/xlsx/ws_seo_report.xlsx')

# Fill data in named ranges
ws = wb['Summary']
ws['B5'] = traffic_data['current']  # Named cell: current_traffic
ws['C5'] = traffic_data['previous']  # Named cell: previous_traffic

# Update charts (auto-update via named ranges)
wb.save('output_report.xlsx')
```

---

## Performance Optimization

### Template Caching

**Problem:** Loading large templates repeatedly is slow.

**Solution:** Cache parsed templates in memory.

```python
from functools import lru_cache

@lru_cache(maxsize=20)
def load_template_cached(template_path: str):
    """Load and cache template for reuse."""
    return Document(template_path)

# First call: loads from disk (slow)
doc1 = load_template_cached('templates/docx/2penguins_proposal.docx')

# Second call: returns cached version (fast)
doc2 = load_template_cached('templates/docx/2penguins_proposal.docx')
```

**Benefits:**
- 10x faster for repeated template usage
- Reduces disk I/O
- Ideal for batch document generation

---

## Best Practices Summary

### Do's ✅

- Use semantic versioning for templates
- Maintain metadata JSON files
- Test templates with real data before deployment
- Use company branding consistently
- Cache templates for performance
- Document all variables in metadata

### Don'ts ❌

- Don't hardcode company-specific data in base templates
- Don't use manual formatting (use Styles instead)
- Don't create duplicate templates (use inheritance)
- Don't skip version numbers
- Don't deploy untested templates

---

**Last Updated:** 2026-02-15
**Maintainer:** WS Workspace
