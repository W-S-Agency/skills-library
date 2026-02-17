---
name: ln-840-pdf-extractor
description: L3 Worker for PDF data extraction. Extracts text, tables, metadata from PDF documents using pypdf and pdfplumber.
---

# PDF Extractor (L3 Worker)

Extracts text, tables, and metadata from PDF documents.

## Purpose & Scope

- Extract text from PDF pages
- Detect and extract tables to pandas DataFrame
- Extract metadata (author, creation date)
- Search for patterns (invoice numbers, emails)
- NOT for PDF generation (use ln-810 + pdf export)

## Dependencies

```python
pypdf==4.0.1
pdfplumber==0.11.0
pandas==2.2.0
```

## Core Functions

### 1. Extract Text

```python
import pdfplumber

def extract_text(pdf_path: str) -> str:
    """Extract all text from PDF."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text
```

### 2. Extract Tables

```python
def extract_tables(pdf_path: str) -> list:
    """Extract all tables from PDF as DataFrames."""
    tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_tables = page.extract_tables()
            for table in page_tables:
                df = pd.DataFrame(table[1:], columns=table[0])
                tables.append(df)
    return tables
```

### 3. Extract Invoice Data

```python
import re

def extract_invoice_data(pdf_path: str) -> dict:
    """Extract invoice number, date, amount from PDF."""
    text = extract_text(pdf_path)

    # Regex patterns
    invoice_pattern = r'Invoice #?:?\s*(\w+-?\d+)'
    date_pattern = r'(\d{4}-\d{2}-\d{2})'
    amount_pattern = r'Total:?\s*€?(\d+[,.]?\d+)'

    return {
        'invoice_number': re.search(invoice_pattern, text).group(1),
        'date': re.search(date_pattern, text).group(1),
        'amount': float(re.search(amount_pattern, text).group(1).replace(',', ''))
    }
```

## Business Use Cases

**2Penguins:** Extract client requirements from PDF briefs
**w&k Connect:** Parse contracts, invoice processing
**WS Agency:** Extract competitor data from PDF reports
**Topholz24:** Supplier invoice parsing, product specs extraction

## Extraction Types

- **Text:** Full document, page-level, paragraph-level
- **Tables:** Structured data to pandas DataFrame
- **Metadata:** Author, title, creation date, keywords
- **Patterns:** Invoice numbers, emails, phone numbers, amounts

## Definition of Done

- [ ] PDF loaded successfully
- [ ] Text/tables extracted
- [ ] Data validated (no corrupted extraction)
- [ ] Output formatted (JSON, CSV, or DataFrame)
- [ ] Results returned to caller

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
