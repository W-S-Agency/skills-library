---
name: "Finance"
description: "Journal entries, account reconciliation, financial statements, variance analysis — для 4 бизнесов Alexander Wirt"
---

# Finance Skill

AI-powered финансовый агент для управления бухгалтерией, отчётностью и финансовым анализом 4 бизнесов:
- **2Penguins** (web/digital/signage)
- **WS Agency** (маркетинг/SEO)
- **Topholz24** (e-commerce)
- **w&k Connect GmbH** (B2B CRM/ERP интеграции)

## Команды

### `/finance:journal-entry`
Создаёт journal entry (проводку):

```bash
/finance:journal-entry "Paid office rent for February"
```

**Workflow:**
1. 🔍 Анализирует описание транзакции
2. 💡 Предлагает debit/credit accounts
3. ✍️ Генерирует journal entry
4. ✅ Запрашивает подтверждение
5. 📊 Записывает в систему

**Output:**
```markdown
## Journal Entry: Office Rent Payment

**Date**: 2026-02-21
**Description**: Paid office rent for February 2026

### Proposed Entry

| Account | Debit | Credit | Notes |
|---------|-------|--------|-------|
| 6510 - Rent Expense | €1,200.00 | - | February rent |
| 1010 - Bank Account | - | €1,200.00 | Payment from main account |

**Total**: €1,200.00 = €1,200.00 ✅

### Explanation
- **Debit Rent Expense**: Увеличиваем расход (expense account)
- **Credit Bank Account**: Уменьшаем cash (asset account)

**Approve?** [Y/n]
```

**Advanced:**
```bash
/finance:journal-entry "Received payment from client €5,000 for web development project" --company 2Penguins
```

### `/finance:reconcile`
Сверка счетов (account reconciliation):

```bash
/finance:reconcile "Bank Account" --month "2026-02"
```

**Сверяет:**
- Book balance (бухгалтерский баланс)
- Bank statement balance (выписка из банка)
- Identifies discrepancies

**Output:**
```markdown
## Bank Reconciliation: February 2026

### Summary
- **Book Balance (end of month)**: €24,560.00
- **Bank Statement Balance**: €24,350.00
- **Difference**: €210.00 ❌

### Reconciliation

#### Outstanding Checks (не обработаны банком)
| Date | Check # | Payee | Amount |
|------|---------|-------|--------|
| 2026-02-28 | 1245 | Supplier GmbH | €350.00 |
| 2026-02-27 | 1244 | Office Supplies | €120.00 |
**Total**: €470.00

#### Deposits in Transit (не учтены банком)
| Date | Description | Amount |
|------|-------------|--------|
| 2026-02-28 | Client payment | €2,100.00 |
**Total**: €2,100.00

#### Bank Fees (не записаны в книгах)
| Date | Description | Amount |
|------|-------------|--------|
| 2026-02-15 | Monthly service fee | €12.00 |
| 2026-02-20 | Wire transfer fee | €8.00 |
**Total**: €20.00

### Adjusted Balances
- **Book Balance**: €24,560.00 - €20.00 (fees) = **€24,540.00**
- **Bank Balance**: €24,350.00 + €2,100.00 (deposit) - €470.00 (checks) = **€25,980.00**

### Remaining Discrepancy
❌ **€1,440.00** — требует investigation

### Recommendations
1. ✅ Record bank fees (€20.00)
2. 🔍 Investigate €1,440 discrepancy (check for missing transactions)
3. 📋 Create journal entry for bank fees
```

### `/finance:statement`
Генерирует financial statements:

```bash
/finance:statement "income" --period "2026-Q1" --company "2Penguins"
```

**Types:**
- `income` — Income Statement (P&L)
- `balance` — Balance Sheet
- `cashflow` — Cash Flow Statement
- `retained-earnings` — Statement of Retained Earnings

**Output (Income Statement):**
```spreadsheet
{
  "filename": "2Penguins_Income_Statement_Q1_2026.xlsx",
  "sheetName": "Income Statement",
  "columns": [
    { "key": "category", "label": "Account", "type": "text" },
    { "key": "jan", "label": "January", "type": "currency" },
    { "key": "feb", "label": "February", "type": "currency" },
    { "key": "mar", "label": "March", "type": "currency" },
    { "key": "total", "label": "Q1 Total", "type": "currency" },
    { "key": "pct", "label": "% of Revenue", "type": "percent" }
  ],
  "rows": [
    { "category": "Revenue", "jan": 45000, "feb": 48000, "mar": 52000, "total": 145000, "pct": 1.0 },
    { "category": "  Web Development", "jan": 28000, "feb": 30000, "mar": 32000, "total": 90000, "pct": 0.62 },
    { "category": "  Digital Signage", "jan": 17000, "feb": 18000, "mar": 20000, "total": 55000, "pct": 0.38 },
    { "category": "Cost of Sales", "jan": -12000, "feb": -13000, "mar": -14000, "total": -39000, "pct": -0.27 },
    { "category": "Gross Profit", "jan": 33000, "feb": 35000, "mar": 38000, "total": 106000, "pct": 0.73 },
    { "category": "Operating Expenses", "jan": -22000, "feb": -23000, "mar": -24000, "total": -69000, "pct": -0.48 },
    { "category": "  Salaries", "jan": -15000, "feb": -15000, "mar": -15000, "total": -45000, "pct": -0.31 },
    { "category": "  Rent", "jan": -1200, "feb": -1200, "mar": -1200, "total": -3600, "pct": -0.02 },
    { "category": "  Marketing", "jan": -3500, "feb": -4000, "mar": -4500, "total": -12000, "pct": -0.08 },
    { "category": "  Other", "jan": -2300, "feb": -2800, "mar": -3300, "total": -8400, "pct": -0.06 },
    { "category": "Net Income", "jan": 11000, "feb": 12000, "mar": 14000, "total": 37000, "pct": 0.26 }
  ]
}
```

**Key Metrics:**
```markdown
## Financial Highlights (Q1 2026)

### Profitability
- **Gross Profit Margin**: 73% ✅ (target: > 70%)
- **Net Profit Margin**: 26% ✅ (target: > 20%)
- **Revenue Growth**: +8% MoM (Jan → Mar)

### Performance vs Budget
- **Revenue**: €145K vs €140K budget (+3.6% ✅)
- **Net Income**: €37K vs €35K budget (+5.7% ✅)
- **Expenses**: €69K vs €72K budget (-4.2% ✅ under budget)
```

### `/finance:variance`
Variance analysis (план vs факт):

```bash
/finance:variance "2026-02" --compare "budget"
```

**Анализирует:**
- Actual vs Budget
- Actual vs Prior Period
- Favorable/Unfavorable variances

**Output:**
```markdown
## Variance Analysis: February 2026

### Revenue Variance

| Category | Budget | Actual | Variance | % |
|----------|--------|--------|----------|---|
| Web Development | €30,000 | €30,000 | €0 | 0% |
| Digital Signage | €16,000 | €18,000 | +€2,000 | +12.5% 🟢 |
| **Total Revenue** | **€46,000** | **€48,000** | **+€2,000** | **+4.3%** 🟢 |

**Analysis:**
- 🟢 **Favorable**: Digital Signage exceeded budget by €2K (+12.5%)
- **Reason**: Unexpected project from existing client (MEGA Mietpark)

### Expense Variance

| Category | Budget | Actual | Variance | % |
|----------|--------|--------|----------|---|
| Salaries | €15,000 | €15,000 | €0 | 0% |
| Marketing | €3,500 | €4,000 | -€500 | -14.3% 🔴 |
| Rent | €1,200 | €1,200 | €0 | 0% |
| Other | €2,500 | €2,800 | -€300 | -12.0% 🔴 |
| **Total Expenses** | **€22,200** | **€23,000** | **-€800** | **-3.6%** 🔴 |

**Analysis:**
- 🔴 **Unfavorable**: Marketing overspent by €500 (-14.3%)
- **Reason**: Additional Google Ads spend for new campaign
- 🔴 **Unfavorable**: Other expenses over by €300
- **Reason**: Unexpected software subscription renewal

### Net Income Variance

| Metric | Budget | Actual | Variance |
|--------|--------|--------|----------|
| **Net Income** | **€23,800** | **€25,000** | **+€1,200** 🟢 |

**Overall**: +5.0% favorable (revenue increase offset expense overrun)

### Recommendations
1. ✅ **Celebrate**: Digital Signage growth (+12.5%)
2. ⚠️ **Review**: Marketing budget (overspent 2 months in row)
3. 📋 **Plan**: Adjust Q2 budget based on actuals
```

### `/finance:close`
Month-end/quarter-end close checklist:

```bash
/finance:close "2026-02" --type month
```

**Checklist:**
```markdown
## Month-End Close: February 2026

### Pre-Close (Due: Feb 28)
- [ ] All invoices sent (AR)
- [ ] All bills entered (AP)
- [ ] Payroll recorded
- [ ] Bank statements downloaded

### Reconciliations (Due: Mar 3)
- [ ] Bank accounts reconciled
- [ ] Credit card statements reconciled
- [ ] Intercompany balances reconciled
- [ ] Inventory counted (if applicable)

### Adjusting Entries (Due: Mar 5)
- [ ] Accrued expenses
- [ ] Prepaid expenses amortization
- [ ] Depreciation
- [ ] Revenue recognition adjustments

### Reporting (Due: Mar 7)
- [ ] Income Statement generated
- [ ] Balance Sheet generated
- [ ] Cash Flow Statement generated
- [ ] Variance Analysis completed

### Review (Due: Mar 10)
- [ ] Financial statements reviewed by CFO/CEO
- [ ] Variances investigated and explained
- [ ] Board package prepared (if applicable)

### Finalize (Due: Mar 12)
- [ ] Period locked in accounting system
- [ ] Documents archived
- [ ] Dashboards updated

**Progress**: 8/18 (44%) ⏳
**Status**: On Track ✅
**Next Action**: Complete bank reconciliations by Mar 3
```

### `/finance:audit-support`
Готовит документы для audit:

```bash
/finance:audit-support "2025" --auditor "Grant Thornton"
```

**Output:**
```markdown
## Audit Support Package: FY 2025

### Documents Prepared

#### Financial Statements
- ✅ Income Statement (2025)
- ✅ Balance Sheet (Dec 31, 2025)
- ✅ Cash Flow Statement (2025)
- ✅ Statement of Retained Earnings

#### Supporting Schedules
- ✅ Accounts Receivable Aging (Dec 31, 2025)
- ✅ Accounts Payable Aging (Dec 31, 2025)
- ✅ Fixed Assets Schedule (with depreciation)
- ✅ Loan Amortization Schedule
- ✅ Prepaid Expenses Schedule

#### Bank Reconciliations
- ✅ All 12 months reconciled
- ✅ Outstanding items documented

#### Documentation
- ✅ Chart of Accounts
- ✅ Accounting Policies
- ✅ Journal Entry Register (all JEs with explanations)
- ✅ Budget vs Actual Reports

### Audit Queries (Anticipated)

**Expected Questions:**
1. Explain revenue recognition policy → [Link to policy doc]
2. Justify large expenses (> €5K) → [Expense report with approvals]
3. Confirm related party transactions → [None in 2025]

### Missing Items ⚠️
- [ ] Board meeting minutes (need from CEO)
- [ ] Signed contracts for 3 major clients
- [ ] Insurance policy certificates

**Next Steps**:
1. Request missing items from Alexander
2. Schedule kickoff meeting with Grant Thornton
3. Prepare management representation letter
```

## Интеграции

### Accounting Systems
- **Bitrix24** (CRM, invoicing, basic accounting)
- **Google Sheets** (budget tracking, custom reports)
- **DATEV** (немецкая бухгалтерия, if used)

### Banking
- **Bank APIs** (transaction import, balance check)
- **PayPal/Stripe** (payment processing reconciliation)

### Data Sources
- **Snowflake/BigQuery** (data warehouse для analytics)
- **Excel/Sheets** (budget imports, manual adjustments)

## Принципы

- **Double-entry bookkeeping**: Каждая транзакция = debit + credit
- **GAAP/IFRS compliance**: Следуем стандартам
- **German tax law**: Учитываем немецкое налоговое законодательство
- **Audit trail**: Каждое изменение документировано
- **Separation of duties**: Review process для критичных операций

## Best Practices

### 1. **Monthly close discipline**
Закрывай месяц в течение 10 дней после окончания.

### 2. **Reconcile frequently**
Bank reconciliation — минимум monthly, лучше weekly.

### 3. **Document everything**
Каждый journal entry должен иметь explanation.

### 4. **Review variances**
Budget vs Actual — не просто цифры, а insights.

### 5. **Prepare for audit continuously**
Не жди audit — документируй в процессе.

## Примеры

### Для 2Penguins (Web/Digital Signage)
```bash
/finance:statement "income" --period "2026-Q1" --company "2Penguins"
/finance:variance "2026-02" --company "2Penguins"
```

### Для WS Agency (Marketing/SEO)
```bash
/finance:journal-entry "Received payment from client €5K for SEO services" --company "WS-Agency"
/finance:reconcile "Bank Account" --month "2026-02" --company "WS-Agency"
```

### Для Topholz24 (E-commerce)
```bash
/finance:statement "cashflow" --period "2026-Q1" --company "Topholz24"
/finance:variance "2026-02" --compare "prior-year" --company "Topholz24"
```

### Для w&k Connect (B2B Integrations)
```bash
/finance:close "2026-02" --company "wk-Connect"
/finance:audit-support "2025" --company "wk-Connect"
```

## Метрики

Finance Skill отслеживает:
- **Close speed** (days to close month)
- **Reconciliation completeness** (% accounts reconciled)
- **Variance accuracy** (predicted vs actual variances)
- **Audit readiness** (% documents prepared)

Используй `/finance:stats` для financial health dashboard.
