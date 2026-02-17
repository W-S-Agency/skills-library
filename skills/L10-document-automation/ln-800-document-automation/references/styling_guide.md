# Document Styling & Branding Guide

Guidelines for applying company branding to generated documents across all 4 businesses.

---

## Company Branding Matrix

| Company | Primary Color | Secondary Color | Logo | Font | Use Cases |
|---------|--------------|-----------------|------|------|-----------|
| **2Penguins** | #1E40AF (Blue) | #F59E0B (Orange) | logo-2penguins.png | Arial, Helvetica | Client proposals, project specs |
| **w&k Connect** | #059669 (Green) | #6366F1 (Indigo) | logo-wk.png | Open Sans, Roboto | CRM reports, contracts |
| **WS Agency** | #DC2626 (Red) | #0891B2 (Cyan) | logo-ws.png | Poppins, Inter | SEO reports, pitch decks |
| **Topholz24** | #92400E (Brown) | #15803D (Green) | logo-topholz.png | Montserrat, Lato | Inventory reports, supplier docs |

---

## Word Documents (.docx) Branding

### Header Structure

**Standard Header (all companies):**
```
┌─────────────────────────────────────────────────────────┐
│ [Company Logo]                    [Document Type]       │
│                                    [Date]                │
└─────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Logo: 180×45 pixels (4:1 aspect ratio)
- Header height: 1.5 cm
- Margins: 1 cm top, 2 cm left/right

### Footer Structure

**Standard Footer:**
```
┌─────────────────────────────────────────────────────────┐
│ [Company Name] | [Address] | [Email] | [Phone]          │
│                          Page [X] of [Y]                 │
└─────────────────────────────────────────────────────────┘
```

**Font:** 9pt, Gray (#6B7280)

### Company-Specific Styles

#### 2Penguins - Digital/Web Agency

**Template:** `templates/2penguins_proposal_template.docx`

**Colors:**
- Headings: #1E40AF (Blue)
- Subheadings: #F59E0B (Orange)
- Body text: #1F2937 (Dark Gray)

**Fonts:**
- Heading 1: Arial Bold, 18pt
- Heading 2: Arial Bold, 14pt
- Body: Arial, 11pt
- Code blocks: Courier New, 10pt (for technical specs)

**Special Elements:**
- Tech stack tables with blue headers
- Screenshot placeholders with orange borders
- Project timeline with blue/orange color scheme

---

#### w&k Connect - CRM/ERP Integration

**Template:** `templates/wk_report_template.docx`

**Colors:**
- Headings: #059669 (Green)
- Highlights: #6366F1 (Indigo)
- Body text: #111827 (Black)

**Fonts:**
- Heading 1: Open Sans Bold, 16pt
- Heading 2: Open Sans Semibold, 13pt
- Body: Roboto, 11pt
- Metrics: Roboto Mono, 10pt (for numbers)

**Special Elements:**
- KPI boxes with green background
- Data tables with indigo headers
- Client logos in footer (if applicable)

---

#### WS Agency - Marketing/SEO

**Template:** `templates/ws_pitch_template.docx`

**Colors:**
- Headings: #DC2626 (Red)
- Accents: #0891B2 (Cyan)
- Body text: #0F172A (Dark Blue-Gray)

**Fonts:**
- Heading 1: Poppins Bold, 20pt
- Heading 2: Poppins Semibold, 15pt
- Body: Inter, 11pt
- Quotes: Inter Italic, 12pt

**Special Elements:**
- Case study callout boxes (red border)
- Testimonial sections (cyan background)
- Social media icons in footer

---

#### Topholz24 - E-commerce

**Template:** `templates/topholz_contract_template.docx`

**Colors:**
- Headings: #92400E (Brown)
- Highlights: #15803D (Green)
- Body text: #18181B (Black)

**Fonts:**
- Heading 1: Montserrat Bold, 16pt
- Heading 2: Montserrat Semibold, 13pt
- Body: Lato, 11pt
- Legal text: Lato, 9pt

**Special Elements:**
- Product tables with brown headers
- Price cells with green highlighting (positive) or red (negative)
- Supplier logos in appendix

---

## Excel Spreadsheets (.xlsx) Branding

### Header Row Styling

**Standard Header Row:**
- Background color: Company primary color
- Font color: White (#FFFFFF)
- Font: Bold, 11pt
- Alignment: Center
- Border: Bottom border, 2pt

### Company-Specific Themes

#### 2Penguins Analytics

**Template:** `templates/2penguins_analytics_template.xlsx`

**Color Scheme:**
- Headers: #1E40AF (Blue)
- Positive values: #10B981 (Green)
- Negative values: #EF4444 (Red)
- Neutral: #6B7280 (Gray)

**Charts:**
- Bar charts: Blue (#1E40AF)
- Line charts: Blue (#1E40AF) primary, Orange (#F59E0B) secondary
- Pie charts: Blue-Orange gradient

---

#### w&k Connect CRM Reports

**Template:** `templates/wk_crm_report_template.xlsx`

**Color Scheme:**
- Headers: #059669 (Green)
- KPI cells: #6366F1 (Indigo) background, white text
- Target met: #10B981 (Green)
- Target missed: #F59E0B (Orange)

**Charts:**
- Bar charts: Green (#059669)
- Line charts: Indigo (#6366F1)
- Heatmaps: Green (high) to Red (low)

**Conditional Formatting:**
```python
# Green if > target, Red if < target
rule = {
    'type': 'cellIs',
    'operator': 'greaterThan',
    'formula': ['$B$2'],  # Target cell
    'fill': {'bgColor': '#10B981'},
}
```

---

#### WS Agency SEO Reports

**Template:** `templates/ws_seo_report_template.xlsx`

**Color Scheme:**
- Headers: #DC2626 (Red)
- Traffic growth: #10B981 (Green)
- Traffic decline: #EF4444 (Red)
- Neutral: #64748B (Slate Gray)

**Charts:**
- Traffic trends: Red (#DC2626) line chart
- Keyword rankings: Cyan (#0891B2) bar chart
- Conversion funnel: Red-Cyan gradient

**Metrics Formatting:**
- Percentages: `+15.3%` (green if positive, red if negative)
- Numbers: `1,234` (comma separator)
- Currency: `€1,234.56`

---

#### Topholz24 Inventory

**Template:** `templates/topholz_inventory_template.xlsx`

**Color Scheme:**
- Headers: #92400E (Brown)
- In stock: #10B981 (Green)
- Low stock: #F59E0B (Orange)
- Out of stock: #EF4444 (Red)

**Conditional Formatting:**
```python
# Stock level alerts
if stock < reorder_point:
    color = '#EF4444'  # Red
elif stock < 2 * reorder_point:
    color = '#F59E0B'  # Orange
else:
    color = '#10B981'  # Green
```

---

## PowerPoint Presentations (.pptx) Branding

### Master Slide Layouts

**Standard Layouts:**
1. Title Slide - Company logo, title, subtitle, date
2. Section Header - Chapter divider with company color
3. Title and Content - Bullet points with branded bullets
4. Two Content - Side-by-side comparison
5. Quote Slide - Large quote with company accent color
6. Thank You - Contact information with company logo

### Company-Specific Themes

#### 2Penguins Pitch Decks

**Template:** `templates/2penguins_pitch_template.pptx`

**Theme:**
- Background: White
- Accent bars: Blue (#1E40AF) left border on each slide
- Icons: Orange (#F59E0B)
- Bullets: Blue circles

**Slide Transitions:**
- Subtle fade (0.5s duration)
- No animations (professional)

**Font Sizes:**
- Title: 44pt Arial Bold
- Subtitle: 28pt Arial
- Body: 18pt Arial
- Footer: 12pt Arial

---

#### WS Agency Strategy Presentations

**Template:** `templates/ws_strategy_template.pptx`

**Theme:**
- Background: White with subtle red gradient (top-right corner)
- Headers: Red (#DC2626) bottom border
- Icons: Cyan (#0891B2)
- Bullets: Red squares

**Special Slides:**
- Case Study: Large image (60% slide), text overlay (40%)
- Metrics: Large numbers (72pt) with cyan accent
- Timeline: Horizontal with red milestones

---

## PDF Styling (via docx→pdf conversion)

**Recommended workflow:**
1. Generate .docx with branding (ln-810)
2. Convert to .pdf using python-docx → pdf library
3. Preserve fonts and colors

**PDF-specific considerations:**
- Embed fonts to ensure consistency
- Use high-resolution logos (300 DPI)
- Optimize file size for email (target <5MB)

---

## Logo Requirements

### File Specifications

| Logo Type | Format | Size | Usage |
|-----------|--------|------|-------|
| High-res | PNG | 1200×300 px | Print documents |
| Standard | PNG | 600×150 px | Screen documents |
| Small | PNG | 240×60 px | Email signatures |
| Vector | SVG | Scalable | Presentations |

### Logo Placement

**Word Documents:**
- Header: Top-left, 180×45 px
- Footer: Centered, 120×30 px (optional)

**Excel Spreadsheets:**
- Top-left corner of first sheet
- Header row A1:D1 (merged)

**PowerPoint:**
- Title slide: Centered, 600×150 px
- Content slides: Top-right, 180×45 px

---

## Branding Application Functions

### Python Helper Functions

```python
def apply_company_branding(doc, company: str):
    """Apply company-specific branding to Word document."""
    branding = {
        '2penguins': {
            'primary': '#1E40AF',
            'secondary': '#F59E0B',
            'logo': 'logo-2penguins.png',
            'font': 'Arial'
        },
        'wk': {
            'primary': '#059669',
            'secondary': '#6366F1',
            'logo': 'logo-wk.png',
            'font': 'Open Sans'
        },
        'ws': {
            'primary': '#DC2626',
            'secondary': '#0891B2',
            'logo': 'logo-ws.png',
            'font': 'Poppins'
        },
        'topholz': {
            'primary': '#92400E',
            'secondary': '#15803D',
            'logo': 'logo-topholz.png',
            'font': 'Montserrat'
        }
    }

    config = branding[company]
    # Apply header with logo
    # Set heading colors
    # Configure fonts

    return doc
```

---

## Best Practices

### Color Usage

1. **Consistency:** Use company primary color for all headings
2. **Contrast:** Ensure text is readable (WCAG AA compliance)
3. **Hierarchy:** Primary color for H1, secondary for H2, neutral for body

### Font Selection

1. **Professional fonts only:** Avoid Comic Sans, Papyrus, etc.
2. **Sans-serif for screen:** Arial, Helvetica, Open Sans, Roboto
3. **Serif for print:** Times New Roman, Georgia (legal documents only)

### Logo Placement

1. **Don't distort:** Maintain aspect ratio
2. **Sufficient whitespace:** 10px padding around logo
3. **High resolution:** Use vector (SVG) when possible

---

## Template Locations

All company templates stored in:
```
C:\Users\alexa\.ws-workspace\workspaces\my-workspace\skills\ln-800-document-automation\templates\
│
├── 2penguins_proposal_template.docx
├── 2penguins_analytics_template.xlsx
├── 2penguins_pitch_template.pptx
│
├── wk_report_template.docx
├── wk_crm_report_template.xlsx
│
├── ws_pitch_template.docx
├── ws_seo_report_template.xlsx
├── ws_strategy_template.pptx
│
├── topholz_contract_template.docx
└── topholz_inventory_template.xlsx
```

**Note:** Templates are placeholders for Phase 1. Actual branded templates to be created in Phase 3 (customization).

---

**Last Updated:** 2026-02-15
**Maintainer:** WS Workspace
