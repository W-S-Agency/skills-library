# Supported Document Types

Reference guide for ln-800-document-automation supported formats, libraries, and use cases.

---

## Format Support Matrix

| Format | Extension | Worker | Primary Library | Use Cases | Business Priority |
|--------|-----------|--------|-----------------|-----------|-------------------|
| **Word** | .docx | ln-810 | python-docx 1.1.0 | Proposals, Contracts, Reports | ⭐⭐⭐ HIGH |
| **Excel** | .xlsx | ln-820 | openpyxl 3.1.2 | Analytics, Inventory, CRM Reports | ⭐⭐⭐ HIGH |
| **PowerPoint** | .pptx | ln-830 | python-pptx 0.6.23 | Pitch Decks, Reviews, Demos | ⭐⭐ MEDIUM |
| **PDF** | .pdf | ln-840 | pypdf 4.0.1 + pdfplumber 0.11.0 | Data Extraction, OCR | ⭐⭐⭐ HIGH |

---

## Format Details

### Word Documents (.docx)

**Worker:** ln-810-docx-generator

**Library:** python-docx 1.1.0
```python
from docx import Document
doc = Document()
doc.add_heading('Title', 0)
doc.save('output.docx')
```

**Capabilities:**
- ✅ Text formatting (bold, italic, underline)
- ✅ Headers and footers
- ✅ Tables and images
- ✅ Styles and themes
- ✅ Page breaks and sections
- ❌ Track changes (read-only)
- ❌ Macros/VBA

**Use Cases:**
- **2Penguins:** Client proposals, project specs
- **w&k Connect:** Client contracts, agreements
- **WS Agency:** Marketing proposals, case studies
- **Topholz24:** Supplier contracts, terms & conditions

**Performance:**
- Small documents (<10 pages): <5 seconds
- Medium documents (10-50 pages): 5-15 seconds
- Large documents (50+ pages): 15-30 seconds

---

### Excel Spreadsheets (.xlsx)

**Worker:** ln-820-xlsx-reporter

**Library:** openpyxl 3.1.2 + pandas 2.2.0
```python
import openpyxl
wb = openpyxl.Workbook()
ws = wb.active
ws['A1'] = 'Data'
wb.save('output.xlsx')
```

**Capabilities:**
- ✅ Formulas (SUM, AVERAGE, VLOOKUP, IF)
- ✅ Charts (Bar, Line, Pie, Scatter)
- ✅ Conditional formatting
- ✅ Data validation
- ✅ Multiple worksheets
- ✅ Pivot tables (basic)
- ❌ Macros/VBA
- ❌ Power Query

**Use Cases:**
- **2Penguins:** Project budgets, time tracking
- **w&k Connect:** Weekly CRM reports, broker activity analytics
- **WS Agency:** SEO reports, traffic analytics, campaign metrics
- **Topholz24:** Inventory reports, stock alerts, supplier analysis

**Chart Types:**
- `BarChart` - Broker activity, revenue comparison
- `LineChart` - Traffic trends, growth over time
- `PieChart` - Market share, client distribution
- `ScatterChart` - Correlation analysis

**Performance:**
- Small datasets (<1,000 rows): <10 seconds
- Medium datasets (1,000-10,000 rows): 10-30 seconds
- Large datasets (10,000+ rows): 30-60 seconds

---

### PowerPoint Presentations (.pptx)

**Worker:** ln-830-pptx-builder

**Library:** python-pptx 0.6.23
```python
from pptx import Presentation
prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[0])
prs.save('output.pptx')
```

**Capabilities:**
- ✅ Slide layouts (title, bullet, blank, image)
- ✅ Text formatting (fonts, colors, alignment)
- ✅ Images and shapes
- ✅ Tables
- ✅ Notes and comments
- ❌ Animations
- ❌ Transitions
- ❌ Embedded videos

**Use Cases:**
- **2Penguins:** Client pitch decks, project demos
- **w&k Connect:** CRM training presentations
- **WS Agency:** Marketing strategy presentations, client pitch decks
- **Topholz24:** Product catalogs, supplier presentations

**Slide Layouts:**
1. Title Slide - Cover slide with title and subtitle
2. Title and Content - Bullet points
3. Section Header - Chapter dividers
4. Two Content - Side-by-side comparisons
5. Comparison - Before/after
6. Title Only - Custom content
7. Blank - Full flexibility
8. Content with Caption - Image + description

**Performance:**
- Small presentations (<10 slides): <10 seconds
- Medium presentations (10-30 slides): 10-20 seconds
- Large presentations (30+ slides): 20-40 seconds

---

### PDF Documents (.pdf)

**Worker:** ln-840-pdf-extractor

**Libraries:**
- pypdf 4.0.1 - Text extraction, metadata
- pdfplumber 0.11.0 - Table extraction, layout analysis
- pytesseract (optional) - OCR for scanned PDFs

```python
import pdfplumber
with pdfplumber.open('input.pdf') as pdf:
    first_page = pdf.pages[0]
    text = first_page.extract_text()
```

**Capabilities:**
- ✅ Text extraction
- ✅ Table detection and extraction
- ✅ Metadata (author, creation date, keywords)
- ✅ Page-level processing
- ✅ Pattern matching (regex search)
- ⚠️ OCR for scanned PDFs (requires pytesseract)
- ❌ PDF generation (use docx→pdf conversion instead)
- ❌ PDF editing

**Use Cases:**
- **2Penguins:** Extract client requirements from PDF briefs
- **w&k Connect:** Parse client contracts, invoice processing
- **WS Agency:** Extract competitor analysis from PDF reports
- **Topholz24:** Supplier invoice parsing, product spec extraction

**Extraction Types:**
- **Text:** Full text, paragraph-level, page-level
- **Tables:** Structured data to pandas DataFrame
- **Metadata:** Author, title, subject, creation date
- **Patterns:** Invoice numbers, emails, phone numbers, amounts

**Performance:**
- Small PDFs (<10 pages): <5 seconds
- Medium PDFs (10-50 pages): 5-20 seconds
- Large PDFs (50+ pages): 20-60 seconds
- Scanned PDFs with OCR: 2-5x slower

---

## Unsupported Formats

| Format | Reason | Alternative |
|--------|--------|-------------|
| .doc (Word 97-2003) | Legacy format | Convert to .docx using Word/LibreOffice |
| .xls (Excel 97-2003) | Legacy format | Convert to .xlsx using Excel/LibreOffice |
| .ppt (PowerPoint 97-2003) | Legacy format | Convert to .pptx using PowerPoint/LibreOffice |
| .pages (Apple Pages) | Proprietary | Convert to .docx using Pages app |
| .numbers (Apple Numbers) | Proprietary | Convert to .xlsx using Numbers app |
| .key (Apple Keynote) | Proprietary | Convert to .pptx using Keynote app |
| .odt (OpenDocument Text) | Different API | Convert to .docx using LibreOffice |
| .ods (OpenDocument Spreadsheet) | Different API | Convert to .xlsx using LibreOffice |

---

## Format Selection Guide

### When to Use Each Format

**Use .docx when:**
- Need text-heavy documents with formatting
- Creating business proposals or contracts
- Require headers/footers and page numbering
- Need to share with clients (universal format)

**Use .xlsx when:**
- Working with structured data (tables, rows/columns)
- Need calculations and formulas
- Require charts and visualizations
- Generating analytics or reports

**Use .pptx when:**
- Creating visual presentations
- Need slide-based structure
- Presenting to stakeholders
- Building pitch decks or demos

**Use .pdf extraction when:**
- Receiving data in PDF format (invoices, contracts)
- Need to parse structured data from documents
- Extracting tables or specific patterns
- Archiving or analyzing scanned documents

---

## Dependencies

### Python Packages

```txt
# Document Generation
python-docx==1.1.0        # Word documents
openpyxl==3.1.2           # Excel spreadsheets
python-pptx==0.6.23       # PowerPoint presentations

# PDF Processing
pypdf==4.0.1              # PDF text extraction
pdfplumber==0.11.0        # PDF table extraction

# Supporting Libraries
pandas==2.2.0             # Data manipulation
Pillow==10.2.0            # Image processing
lxml==5.1.0               # XML parsing (docx backend)

# Optional
pytesseract==0.3.10       # OCR for scanned PDFs
```

### Installation

```bash
pip install python-docx openpyxl python-pptx pypdf pdfplumber pandas Pillow lxml
```

---

## Performance Benchmarks

Tested on: Python 3.10.11, Windows 11, Intel i7-12700

| Operation | Document Size | Time | Memory |
|-----------|---------------|------|--------|
| Create docx (10 pages) | 50KB | 3.2s | 15MB |
| Create xlsx (1,000 rows, 3 charts) | 120KB | 8.5s | 35MB |
| Create pptx (20 slides) | 2.5MB | 12.1s | 45MB |
| Extract PDF text (50 pages) | 1.2MB | 4.7s | 25MB |
| Extract PDF tables (10 pages) | 800KB | 6.3s | 40MB |

---

## Best Practices

### Format Selection

1. **Match format to content type:**
   - Text-heavy → .docx
   - Data-heavy → .xlsx
   - Visual-heavy → .pptx

2. **Consider audience:**
   - Internal reports → .xlsx (editable)
   - Client proposals → .docx → .pdf (read-only)
   - Presentations → .pptx (interactive)

3. **Optimize for distribution:**
   - Email attachments → Prefer .pdf (smaller, universal)
   - Collaborative editing → Use native formats (.docx, .xlsx, .pptx)

### Performance Optimization

1. **Batch operations:**
   - Generate multiple documents in single worker invocation
   - Reuse templates to avoid repeated parsing

2. **Large datasets:**
   - Use pandas for data manipulation before Excel generation
   - Pre-process data to reduce formula calculations

3. **Image handling:**
   - Compress images before insertion
   - Use appropriate resolution (72 DPI for screen, 300 DPI for print)

---

**Last Updated:** 2026-02-15
**Maintainer:** WS Workspace
