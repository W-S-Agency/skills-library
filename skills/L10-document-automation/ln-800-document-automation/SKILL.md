---
name: ln-800-document-automation
description: L1 Orchestrator for document automation. Routes requests to specialized workers (docx/xlsx/pptx/pdf). Auto-detects format and delegates to ln-810/ln-820/ln-830/ln-840.
---

# Document Automation Orchestrator

Top-level orchestrator for all document generation and processing tasks. Automatically routes to specialized workers based on document format.

## Overview

### What This Skill Does

Coordinates complete document automation pipeline:
- **Auto-detection:** Analyzes user request to determine document type (Word/Excel/PowerPoint/PDF)
- **Routing:** Delegates to appropriate L3 worker based on operation type
- **Error handling:** Suggests alternatives for unsupported formats
- **Composition:** Can chain multiple document operations (generate → email, extract → analyze)

### When to Use This Skill

Use this skill when:
- Creating business documents (proposals, contracts, reports)
- Generating analytics reports with charts (Excel)
- Building presentations (pitch decks, project reviews)
- Extracting data from PDF documents (invoices, contracts)
- Need automatic format detection without specifying worker

**Alternative:** Invoke workers directly if you know exact format:
1. [ln-810-docx-generator](../ln-810-docx-generator/SKILL.md) - Word documents
2. [ln-820-xlsx-reporter](../ln-820-xlsx-reporter/SKILL.md) - Excel reports
3. [ln-830-pptx-builder](../ln-830-pptx-builder/SKILL.md) - PowerPoint presentations
4. [ln-840-pdf-extractor](../ln-840-pdf-extractor/SKILL.md) - PDF extraction

### When NOT to Use

Do NOT use if:
- Format already known → Use specific worker directly (faster)
- Need custom document processing not covered by workers → Implement custom solution
- Document format unsupported (e.g., Pages, Numbers, Keynote) → Manual processing required

---

## Core Concepts

### Orchestrator Pattern

**ln-800-document-automation is a pure orchestrator** - it does NOT execute work directly:
- ✅ Analyzes user request (detect intent and format)
- ✅ Makes routing decisions (which worker to invoke)
- ✅ Delegates all work via Skill tool (ln-810, ln-820, ln-830, ln-840)
- ✅ Handles errors and suggests alternatives
- ❌ Does NOT generate documents (workers do this)
- ❌ Does NOT process PDFs (ln-840 does this)
- ❌ Does NOT prompt for missing parameters (workers handle this)

**Workers:**
- **ln-810-docx-generator:** Creates Word documents (proposals, contracts, reports)
- **ln-820-xlsx-reporter:** Creates Excel reports with charts and analytics
- **ln-830-pptx-builder:** Creates PowerPoint presentations (pitch decks, reviews)
- **ln-840-pdf-extractor:** Extracts text, tables, metadata from PDFs

### Format Detection Logic

```
User request analysis:
1. Extract keywords: "proposal" → docx, "report" + "chart" → xlsx, "presentation" → pptx, "extract" + "PDF" → pdf
2. Check file extensions: .docx, .xlsx, .pptx, .pdf
3. Analyze context: business proposal → docx, analytics → xlsx, pitch → pptx, invoice parsing → pdf
4. Fallback: Ask user to clarify format if ambiguous
```

**Examples:**
- "Create client proposal for 2Penguins" → ln-810 (docx)
- "Generate monthly CRM report with charts" → ln-820 (xlsx)
- "Build pitch deck for WS Agency" → ln-830 (pptx)
- "Extract invoice data from PDF" → ln-840 (pdf)

### Business Use Cases by Company

#### 2Penguins (Web/Digital/Signage)
- **Client proposals:** ln-810 (branded Word documents)
- **Project presentations:** ln-830 (pitch decks)
- **PDF requirements extraction:** ln-840 (client briefs)

#### w&k Connect (CRM/ERP Integration)
- **CRM reports:** ln-820 (weekly analytics with charts)
- **Contract generation:** ln-810 (client agreements)
- **Data extraction:** ln-840 (supplier invoices)

#### WS Agency (Marketing/SEO)
- **SEO reports:** ln-820 (monthly traffic reports)
- **Marketing presentations:** ln-830 (strategy pitch decks)
- **Client email campaigns:** ln-810 (proposal documents)

#### Topholz24 (E-commerce)
- **Inventory reports:** ln-820 (stock analytics)
- **Supplier contracts:** ln-810 (agreement generation)
- **Product data extraction:** ln-840 (supplier PDFs)

---

## Workflow

### Phase 1: Intent Detection (Automated)

Analyze user request to determine:
1. **Operation type:** Create, extract, analyze, convert
2. **Document format:** docx, xlsx, pptx, pdf
3. **Business context:** Company (2Penguins/w&k/WS/Topholz24), document type (proposal/report/pitch)

**Detection keywords:**
- **docx:** proposal, contract, agreement, document, letter, report (textual)
- **xlsx:** report (with charts), analytics, inventory, data, spreadsheet, metrics
- **pptx:** presentation, pitch deck, slides, demo, review
- **pdf:** extract, parse, analyze, read, OCR

**Output:** Format detected (docx/xlsx/pptx/pdf) + operation type (create/extract)

### Phase 2: Worker Selection (Routing)

Based on detected format, delegate to appropriate worker:

```
IF format = docx:
    Skill(skill: "my-workspace:ln-810-docx-generator", args: user_request)
ELSE IF format = xlsx:
    Skill(skill: "my-workspace:ln-820-xlsx-reporter", args: user_request)
ELSE IF format = pptx:
    Skill(skill: "my-workspace:ln-830-pptx-builder", args: user_request)
ELSE IF format = pdf:
    Skill(skill: "my-workspace:ln-840-pdf-extractor", args: user_request)
ELSE:
    Error: "Unsupported format. Supported: docx, xlsx, pptx, pdf"
```

**Note:** Use fully-qualified skill names with `my-workspace:` prefix for SDK plugin invocation.

### Phase 3: Worker Execution (Delegated)

Worker handles all document operations:
- Parameter collection (template, data, branding)
- Document generation/processing
- Output file creation
- Error handling

**After completion:** Worker returns summary with file path(s).

### Phase 4: Result Summary

**Objective:** Provide user with result summary and next steps.

```
✅ [ORCHESTRATOR] Document automation complete

Operation: Created client proposal (docx)
Worker: ln-810-docx-generator
Output: /path/to/proposal_2026-02-15.docx
Duration: 15 seconds

Next Steps:
- Review document for accuracy
- Apply company branding if needed
- Send to client via ln-852-email-automation
```

**Output:** Summary message with file location and suggested next actions

---

## Critical Rules

### 1. Pure Orchestrator Pattern

**Orchestrator responsibilities:**
- ✅ Intent detection (analyze request keywords)
- ✅ Format detection (docx/xlsx/pptx/pdf)
- ✅ Routing decisions (which worker to invoke)
- ✅ Error handling (unsupported formats)

**Worker responsibilities** (NOT orchestrator):
- ❌ Document generation → Workers (ln-810/ln-820/ln-830)
- ❌ PDF processing → ln-840
- ❌ Parameter validation → Workers
- ❌ Template selection → Workers

### 2. Fully-Qualified Skill Names

**CRITICAL:** When invoking workers via Skill tool, use fully-qualified names:
- ✅ `my-workspace:ln-810-docx-generator`
- ✅ `my-workspace:ln-820-xlsx-reporter`
- ✅ `my-workspace:ln-830-pptx-builder`
- ✅ `my-workspace:ln-840-pdf-extractor`
- ❌ `ln-810-docx-generator` (missing workspace prefix)

**Rationale:** WS Workspace is mounted as SDK plugin, requires workspace prefix.

### 3. No User Prompts at Orchestrator Level

**Orchestrator does NOT prompt user:**
- ❌ NO "Which format do you prefer?" confirmation (auto-detect from request)
- ❌ NO parameter collection (workers handle this)
- ❌ NO template selection (workers handle this)

**All user interaction delegated to workers:**
- Workers collect missing parameters (template path, data, branding)
- Workers confirm operations before execution
- Workers handle errors and retries

### 4. Error Handling

**Unsupported formats:**
```
Error: Unsupported format detected: .pages

Supported formats:
- .docx (Word) → Use ln-810-docx-generator
- .xlsx (Excel) → Use ln-820-xlsx-reporter
- .pptx (PowerPoint) → Use ln-830-pptx-builder
- .pdf (PDF extraction) → Use ln-840-pdf-extractor

Suggestion: Convert .pages to .docx using Pages app, then retry.
```

**Ambiguous requests:**
```
Request ambiguous: "Create report"

Clarification needed:
- Excel report with charts? → Use ln-820-xlsx-reporter
- Word report document? → Use ln-810-docx-generator

Please specify format or provide more context.
```

---

## Definition of Done

Before completing work, verify ALL checkpoints:

**✅ Intent Detection Complete (Phase 1):**
- [ ] User request analyzed
- [ ] Operation type detected (create/extract)
- [ ] Format detected (docx/xlsx/pptx/pdf)
- [ ] Business context identified (company, document type)

**✅ Worker Delegated (Phase 2):**
- [ ] Appropriate worker selected based on format
- [ ] Skill invoked with fully-qualified name (`my-workspace:ln-XXX`)
- [ ] User request passed to worker

**✅ Worker Execution Complete (Phase 3):**
- [ ] Worker returned success status
- [ ] Output file created
- [ ] Worker summary received

**✅ Result Summary Provided (Phase 4):**
- [ ] Summary message displayed (operation, worker, output path)
- [ ] Next steps suggested (review, branding, distribution)
- [ ] User informed of completion

**Output:** Summary message with file location and next steps

---

## Integration with Ecosystem

### Called By

Users directly:
- "Create proposal for 2Penguins client"
- "Generate monthly CRM report with charts"
- "Extract invoice data from PDF"
- "Build pitch deck for WS Agency"

### Calls (via Skill tool)

- **ln-810-docx-generator** (Phase 2) - Word document generation
- **ln-820-xlsx-reporter** (Phase 2) - Excel report generation
- **ln-830-pptx-builder** (Phase 2) - PowerPoint presentation generation
- **ln-840-pdf-extractor** (Phase 2) - PDF data extraction

### Downstream

After ln-800-document-automation completes:
- **ln-852-email-automation** - Send generated document via email
- **ln-851-sheets-sync** - Import extracted data to Google Sheets
- **ln-854-notification-hub** - Notify team of document completion

**Composition examples:**
- Generate report → Email to client: `ln-820 → ln-852`
- Extract PDF data → Sync to Sheets: `ln-840 → ln-851`
- Create proposal → Notify team: `ln-810 → ln-854`

---

## Best Practices

### Format Detection

**DO:**
- ✅ Analyze keywords in user request
- ✅ Check file extensions if mentioned
- ✅ Consider business context (CRM report → xlsx, client proposal → docx)
- ✅ Ask for clarification if truly ambiguous

**DON'T:**
- ❌ Assume format without evidence
- ❌ Ignore user-specified format (if explicitly mentioned)
- ❌ Delegate to wrong worker (breaks trust)

### Worker Trust

**Trust worker results:** Workers return summary, orchestrator doesn't re-verify files.

**Error propagation:** If worker returns error, report to user with worker's error message.

**No retry logic:** If worker fails, do NOT retry automatically. Report error and suggest manual intervention.

### Composition Workflows

**Multi-step operations:** Chain multiple workers when needed:
1. Generate document (ln-810/ln-820/ln-830)
2. Email to recipient (ln-852)
3. Notify team (ln-854)

**Example workflow:**
```
User: "Create SEO report and email to client@example.com"

Step 1: ln-800 detects xlsx format → delegates to ln-820
Step 2: ln-820 generates report → returns path
Step 3: ln-800 detects email intent → delegates to ln-852
Step 4: ln-852 sends email with attachment → confirms delivery
```

---

## Example Usage

### Example 1: Client Proposal (2Penguins)

**Request:**
```
"Create client proposal for 2Penguins - new digital signage project"
```

**Execution:**

1. **Phase 1: Intent Detection**
   - Keywords: "proposal" → docx format
   - Company: 2Penguins
   - Document type: Client proposal

2. **Phase 2: Worker Selection**
   - Format: docx
   - Delegate to: ln-810-docx-generator

3. **Phase 3: Worker Execution**
   - ln-810 collects parameters (template: 2Penguins branding, project details)
   - ln-810 generates document with branding
   - Output: `/documents/proposals/2penguins_proposal_2026-02-15.docx`

4. **Phase 4: Result Summary**
   ```
   ✅ [ORCHESTRATOR] Client proposal created

   Operation: Word document generation
   Worker: ln-810-docx-generator
   Output: /documents/proposals/2penguins_proposal_2026-02-15.docx
   Template: 2Penguins branded template

   Next Steps:
   - Review proposal for accuracy
   - Send to client via ln-852-email-automation
   - Track in CRM (Bitrix24)
   ```

**Result:** Professional client proposal with 2Penguins branding ready to send

---

### Example 2: CRM Analytics Report (w&k Connect)

**Request:**
```
"Generate weekly CRM report with broker activity charts for w&k Connect"
```

**Execution:**

1. **Phase 1: Intent Detection**
   - Keywords: "report" + "charts" → xlsx format
   - Company: w&k Connect
   - Document type: CRM analytics report

2. **Phase 2: Worker Selection**
   - Format: xlsx
   - Delegate to: ln-820-xlsx-reporter

3. **Phase 3: Worker Execution**
   - ln-820 queries CRM data (via bitrix24 source)
   - ln-820 generates charts (bar charts for broker activity)
   - Output: `/reports/crm/wk_weekly_report_2026-02-15.xlsx`

4. **Phase 4: Result Summary**
   ```
   ✅ [ORCHESTRATOR] CRM report generated

   Operation: Excel report with charts
   Worker: ln-820-xlsx-reporter
   Output: /reports/crm/wk_weekly_report_2026-02-15.xlsx
   Data source: Bitrix24 (last 7 days)
   Charts: 3 bar charts (activity, leads, deals)

   Next Steps:
   - Review metrics for accuracy
   - Email to management via ln-852-email-automation
   - Sync to Google Sheets via ln-851-sheets-sync (optional)
   ```

**Result:** Excel report with broker activity analytics and charts

---

### Example 3: Invoice Data Extraction (Topholz24)

**Request:**
```
"Extract product data from supplier invoice PDF - /invoices/supplier_invoice_2026-02.pdf"
```

**Execution:**

1. **Phase 1: Intent Detection**
   - Keywords: "extract" + "PDF" → pdf format
   - Company: Topholz24
   - Document type: Supplier invoice
   - File: /invoices/supplier_invoice_2026-02.pdf

2. **Phase 2: Worker Selection**
   - Format: pdf
   - Delegate to: ln-840-pdf-extractor

3. **Phase 3: Worker Execution**
   - ln-840 extracts text from PDF
   - ln-840 detects tables (products, quantities, prices)
   - ln-840 extracts metadata (supplier, invoice number, date)
   - Output: Structured data (JSON/CSV)

4. **Phase 4: Result Summary**
   ```
   ✅ [ORCHESTRATOR] Invoice data extracted

   Operation: PDF data extraction
   Worker: ln-840-pdf-extractor
   Input: /invoices/supplier_invoice_2026-02.pdf
   Output: /data/extracted/invoice_2026-02.json

   Extracted:
   - Supplier: Holz GmbH
   - Invoice #: INV-2026-0234
   - Products: 12 items
   - Total: €4,567.89

   Next Steps:
   - Review extracted data for accuracy
   - Sync to Google Sheets via ln-851-sheets-sync
   - Update inventory system (Topholz24)
   ```

**Result:** Structured product data extracted from PDF, ready for import

---

## Chat Output Prefix

Use emoji prefix for visual differentiation:
- 📄 [DOC ORCHESTRATOR] - ln-800-document-automation

**Purpose:** Helps users distinguish document orchestrator from other orchestrators (scope, task, etc.).

---

## Reference Files

### Supported Formats
See [references/document_types.md](./references/document_types.md) for complete format support matrix.

### Branding Guidelines
See [references/styling_guide.md](./references/styling_guide.md) for company branding patterns (2Penguins, WS Agency).

### Template System
See [references/template_system.md](./references/template_system.md) for reusable template structure.

---

**Version:** 1.0.0
**Last Updated:** 2026-02-15
**Next Review:** After Phase 1 completion
