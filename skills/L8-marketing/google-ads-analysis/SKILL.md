---
name: "Google Ads Analysis"
description: "Comprehensive Google Ads campaign analysis with YoY comparison and reporting"
alwaysAllow: ["mcp__browser-agent__browser_navigate", "mcp__browser-agent__browser_click", "mcp__browser-agent__browser_execute_js", "mcp__browser-agent__browser_screenshot"]
requiredSources:
  - browser-agent
---

# Google Ads Campaign Analysis Skill

Analyze Google Ads campaigns with year-over-year comparison, performance metrics, and actionable insights.

## Core Workflow

### 1. Navigate to Google Ads
- Use browser-agent to access open Google Ads tab
- Identify account and active campaigns
- Take initial screenshot for context

### 2. Set Date Range & Comparison
**Current Period:** Last 30 days (default) or user-specified
**Comparison:** Previous year (same 30-day window)

**Steps to enable YoY comparison:**
1. Click date selector button (look for current date range text)
2. Toggle "Vergleichen" (Compare) switch ON
3. Select "Letztes Jahr" (Last Year) from comparison options
4. Click "Übernehmen" (Apply) button
5. Wait for page refresh

### 3. Extract Metrics
Use `browser_execute_js` to extract structured data from the page:

```javascript
const result = {
  period: document.querySelector('[class*="date"]')?.textContent,
  totalMetrics: {},
  campaigns: []
};

// Extract summary metrics
const pageText = document.body.innerText;
const kosten = pageText.match(/Kosten\s+([\d.,]+\s*€)\s*arrow_[a-z]+\s*(-?[\d.,]+\s*€)/);
const impressions = pageText.match(/Impr\.\s+([\d.,]+)\s*arrow_[a-z]+\s*(-?[\d.,]+)/);
const clicks = pageText.match(/(\d+)\s+Klicks/);
const conversions = pageText.match(/Conversions[^\d]*([\d.,]+)/);

result.totalMetrics = {
  cost: { current: kosten[1], change: kosten[2] },
  impressions: { current: impressions[1], change: impressions[2] },
  clicks: clicks[1],
  conversions: conversions[1]
};

// Extract campaign-level data
const rows = document.querySelectorAll('tbody tr');
rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length > 8) {
    result.campaigns.push({
      name: cells[0]?.textContent.trim(),
      budget: cells[1]?.textContent.trim(),
      cost: cells[8]?.textContent.trim(),
      conversions: cells[15]?.textContent.trim(),
      convValue: cells[13]?.textContent.trim()
    });
  }
});

JSON.stringify(result, null, 2);
```

### 4. Calculate Key Insights

**Performance Metrics:**
- **ROAS** = Conversion Value / Cost
- **CPA** = Cost / Conversions
- **CTR** = (Clicks / Impressions) × 100%
- **Conversion Rate** = (Conversions / Clicks) × 100%
- **YoY Growth** = ((Current - Previous) / Previous) × 100%

**Health Indicators:**
- ✅ ROAS > 600% = Excellent
- ✅ ROAS 400-600% = Good
- ⚠️ ROAS < 400% = Needs optimization
- ✅ CPA < €50 (e-commerce) = Excellent
- ✅ Conv. Rate > 3% = Excellent

### 5. Generate Analysis Report

Structure the report with:

1. **Executive Summary**
   - Period analyzed
   - Total spend & change YoY
   - Total conversions & ROAS
   - Overall health verdict

2. **Campaign Breakdown**
   - Top performers (by ROAS, conversions)
   - Underperformers (high CPA, low ROAS)
   - Budget allocation insights

3. **YoY Comparison**
   - Cost trend (↑/↓ and %)
   - Impressions trend
   - Conversion efficiency changes
   - Seasonal insights

4. **Actionable Recommendations**
   - Budget reallocation suggestions
   - Campaign optimization priorities
   - Keyword/ad copy improvements
   - Bidding strategy adjustments

### 6. Present Data Visually

Use **datatable** blocks for structured metrics:

```datatable
{
  "title": "Campaign Performance - Last 30 Days",
  "columns": [
    { "key": "campaign", "label": "Campaign", "type": "text" },
    { "key": "cost", "label": "Cost", "type": "currency" },
    { "key": "conversions", "label": "Conversions", "type": "number" },
    { "key": "roas", "label": "ROAS", "type": "percent" },
    { "key": "cpa", "label": "CPA", "type": "currency" }
  ],
  "rows": [...]
}
```

## Important Notes

### Date Selector Navigation
- **Button ID changes dynamically** — always find by text content, not ID
- Look for text like "21. Jan bis 19. Feb 2026"
- Selector has class pattern: `button _ngcontent-*`

### Comparison Toggle
- Toggle element: `material-toggle` with class `comparison-toggle`
- Check `aria-checked` attribute to verify state
- Options appear AFTER toggle is enabled

### Data Extraction Patterns
Google Ads uses Material Design components:
- Tables: `tbody tr` → `td` cells
- Metrics: Text patterns with `arrow_downward` or `arrow_upward` for changes
- Numbers: German format `1.234,56` (dot for thousands, comma for decimal)

### Common Pitfalls
❌ **Don't** use hardcoded element IDs (they change on every page load)
❌ **Don't** assume data loads instantly (use `setTimeout` or wait for elements)
❌ **Don't** parse HTML directly (use `innerText` or `textContent`)

✅ **Do** search by text content and ARIA labels
✅ **Do** wait for UI state changes after clicks
✅ **Do** extract data through JavaScript execution

## Weekly Analysis Routine

**Monday Morning Check (15 min):**
1. Run skill to get last 7 days vs. previous 7 days
2. Review top 3 campaigns by conversions
3. Check for budget-limited campaigns
4. Add negative keywords from Search Terms

**Monthly Deep Dive:**
1. Last 30 days vs. same period last year
2. Full campaign audit
3. ROAS by campaign type
4. Device performance breakdown
5. Hour-of-day patterns

## Integration with Voice Output

After generating analysis, always offer to **voice summarize** key findings:

```
Хочешь чтобы я озвучил основные выводы?
```

Use `/voice-output` skill to speak:
- Total spend and YoY change
- Overall ROAS
- Top 3 campaigns
- Critical alerts (budget limits, low ROAS)

## Reference Documentation

Internal guide: `C:\Users\alexa\.craft-agent\workspaces\my-workspace\sessions\260220-true-bison\data\google-ads-interface-guide.md`

Key sections:
- Comparison setup (detailed steps)
- All metrics definitions
- Benchmarks by industry
- Troubleshooting UI issues
