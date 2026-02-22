---
name: "Google Ads Campaign Manager"
description: "Complete Google Ads management: analysis, optimization, budget changes, and campaign editing via browser automation"
alwaysAllow: ["mcp__browser-agent__browser_navigate", "mcp__browser-agent__browser_click", "mcp__browser-agent__browser_execute_js", "mcp__browser-agent__browser_screenshot", "mcp__browser-agent__browser_get_text", "mcp__browser-agent__browser_type"]
requiredSources:
  - browser-agent
---

# Google Ads Campaign Manager Skill

Complete Google Ads campaign management through browser automation. Extends `/google-ads-analysis` with campaign editing, budget management, keyword operations, and optimization actions.

## Core Capabilities

### 1. Campaign Analysis (from google-ads-analysis)
- Year-over-year performance comparison
- ROAS, CPA, CTR, Conversion Rate calculations
- Campaign health verdicts
- Visual reports via datatable

### 2. Campaign Editing (NEW)
- Pause/enable campaigns and ad groups
- Adjust daily budgets
- Modify bidding strategies
- Change campaign settings

### 3. Keyword Management (NEW)
- Add negative keywords (campaign/ad group level)
- Pause underperforming keywords
- Adjust keyword bids
- Add new keywords

### 4. Ad Management (NEW)
- Pause/enable ads
- Create new Responsive Search Ads
- Update ad copy (headlines, descriptions)

### 5. Budget Optimization (NEW)
- Recommend budget reallocations
- Apply budget changes across campaigns
- Set budget alerts

## Prerequisites

**Browser Profile**: Select appropriate browser profile with Google Ads access
- **Recommended**: Use profile where client Google Ads accounts are authenticated
- **Auto-detect**: Skill will list available profiles at runtime
- **Typical profiles**: Schmidt (19+ clients), AlexanderWirt, or client-specific profiles

**Knowledge Base**: Official Google Ads documentation reference (auto-loaded by skill)

**Related Skill**: `/google-ads-analysis` (read-only analysis)

## Core Workflow

### Part A: Analysis (Inherited from google-ads-analysis)

#### Step 1: Navigate to Google Ads

**Step 1.1: List Available Profiles**
```javascript
// Get list of browser profiles with Google Ads access
browser_list_profiles()
```

**Step 1.2: Navigate to Google Ads**
```javascript
// Use selected profile (ask user or use active profile)
profileId: "<selected-profile-id>"  // From list_profiles result
url: "https://ads.google.com"
```

**Expected State**: Account selector visible (number depends on selected profile)

#### Step 2: Select Account

**Extract Account List**:
```javascript
const accounts = [];
const accountElements = document.querySelectorAll('[role="menuitem"]');

accountElements.forEach(el => {
  const name = el.querySelector('[class*="name"]')?.textContent.trim();
  const id = el.querySelector('[class*="id"]')?.textContent.trim();
  if (name && id) {
    accounts.push({ name, id });
  }
});

JSON.stringify(accounts, null, 2);
```

**Click Account**: Use `browser_click` on account name selector

#### Step 3: Enable YoY Comparison

1. **Click Date Selector**: Find button with current date range text (e.g., "21. Jan bis 19. Feb 2026")
2. **Toggle "Vergleichen"**: Click comparison toggle
3. **Select "Letztes Jahr"**: Choose year-over-year comparison
4. **Click "Übernehmen"**: Apply changes
5. **Wait for page refresh**

#### Step 4: Extract Performance Metrics

```javascript
const pageText = document.body.innerText;

// Extract summary metrics with YoY changes
const kosten = pageText.match(/Kosten\s+([\d.,]+\s*€)\s*arrow_[a-z]+\s*(-?[\d.,]+\s*€)/);
const impressions = pageText.match(/Impr\.\s+([\d.,]+)\s*arrow_[a-z]+\s*(-?[\d.,]+)/);
const clicks = pageText.match(/(\d+)\s+Klicks/);
const conversions = pageText.match(/Conversions[^\d]*([\d.,]+)/);
const convValue = pageText.match(/Conversion-Wert[^\d]*([\d.,]+\s*€)/);

// Extract campaign-level data
const campaigns = [];
const rows = document.querySelectorAll('tbody tr');

rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length > 8) {
    const name = cells[0]?.textContent.trim();
    const status = cells[1]?.textContent.trim();
    const budget = cells[2]?.textContent.trim();
    const cost = cells[8]?.textContent.trim();
    const conv = cells[15]?.textContent.trim();
    const convVal = cells[13]?.textContent.trim();

    campaigns.push({ name, status, budget, cost, conversions: conv, conversionValue: convVal });
  }
});

JSON.stringify({
  summary: {
    cost: { current: kosten?.[1], change: kosten?.[2] },
    impressions: { current: impressions?.[1], change: impressions?.[2] },
    clicks: clicks?.[1],
    conversions: conversions?.[1],
    conversionValue: convValue?.[1]
  },
  campaigns: campaigns
}, null, 2);
```

#### Step 5: Calculate Metrics

**ROAS** (Return on Ad Spend):
```
ROAS = (Conversion Value / Cost) × 100%
```

**CPA** (Cost Per Acquisition):
```
CPA = Cost / Conversions
```

**CTR** (Click-Through Rate):
```
CTR = (Clicks / Impressions) × 100%
```

**Conversion Rate**:
```
Conv Rate = (Conversions / Clicks) × 100%
```

**Health Indicators**:
- ✅ ROAS > 600% = Excellent
- ✅ ROAS 400-600% = Good
- ⚠️ ROAS < 400% = Needs optimization
- ✅ CPA < €50 (e-commerce) = Excellent
- ✅ Conv. Rate > 3% = Excellent

### Part B: Campaign Management (NEW)

#### Step 6: Pause/Enable Campaign

**Navigate to Campaigns**:
- Click **Kampagnen** tab (or already on Campaigns view)

**Select Campaign**:
1. Find campaign row by name
2. Click checkbox next to campaign name

**Change Status**:
- **Pause**: Click **Bearbeiten** dropdown → **Pausieren**
- **Enable**: Click **Bearbeiten** dropdown → **Aktivieren**

**Verify**:
- Check status column changes to "Pausiert" or "Aktiviert"

#### Step 7: Adjust Campaign Budget

**Method A - Direct Edit** (single campaign):
1. Click campaign name to open details
2. Click **Einstellungen** (Settings) tab
3. Click budget value (e.g., "€50")
4. Enter new budget amount
5. Click **Speichern** (Save)

**Method B - Bulk Edit** (multiple campaigns):
1. Select multiple campaigns (checkboxes)
2. Click **Bearbeiten** → **Budget ändern**
3. Enter new budget or percentage change
4. Click **Anwenden**

**Extract Current Budget** (for verification):
```javascript
const campaignName = "Search - Running Shoes";
const rows = document.querySelectorAll('tbody tr');

for (const row of rows) {
  const name = row.querySelector('td:first-child')?.textContent.trim();
  if (name === campaignName) {
    const budgetCell = row.querySelector('td:nth-child(3)');  // Budget column
    const currentBudget = budgetCell?.textContent.trim();
    console.log(`Current budget: ${currentBudget}`);
    break;
  }
}
```

#### Step 8: Add Negative Keywords

**Navigate to Keywords**:
- Click **Keywords** → **Negative Keywords**

**Add Negative Keyword**:
1. Click **+ (Plus)** button
2. Select **Campaign** or **Ad Group** level
3. Enter keyword (e.g., "gratis", "kostenlos", "free")
4. Select match type:
   - **Broad**: Excludes variations
   - **Phrase**: Excludes exact phrase
   - **Exact**: Excludes exact match only
5. Click **Speichern**

**Bulk Add from Search Terms**:
1. Navigate to **Keywords** → **Suchbegriffe** (Search Terms)
2. Filter by high cost, low conversions
3. Select irrelevant terms (checkboxes)
4. Click **Als negative Keywords hinzufügen**
5. Choose campaign or ad group
6. Click **Speichern**

**Verify**:
```javascript
// Check negative keywords were added
const negativeKeywords = [];
const rows = document.querySelectorAll('table[aria-label*="Negative"] tbody tr');

rows.forEach(row => {
  const keyword = row.querySelector('td:first-child')?.textContent.trim();
  const matchType = row.querySelector('td:nth-child(2)')?.textContent.trim();
  if (keyword) {
    negativeKeywords.push({ keyword, matchType });
  }
});

JSON.stringify({ total: negativeKeywords.length, keywords: negativeKeywords }, null, 2);
```

#### Step 9: Pause Underperforming Keywords

**Navigate to Keywords**:
- Click **Keywords** tab

**Identify Underperformers**:
Filter by:
- **High CPC** (above account average)
- **Low Quality Score** (< 5/10)
- **Zero conversions** (but significant spend)

**Extract & Filter**:
```javascript
const keywords = [];
const rows = document.querySelectorAll('tbody tr');

rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length > 10) {
    const keyword = cells[0]?.textContent.trim();
    const status = cells[1]?.textContent.trim();
    const maxCPC = parseFloat(cells[5]?.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
    const conversions = parseFloat(cells[10]?.textContent.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    const cost = parseFloat(cells[8]?.textContent.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    // Flag underperformers
    if (cost > 50 && conversions === 0 && status === 'Aktiviert') {
      keywords.push({ keyword, cost, conversions, action: 'PAUSE' });
    }
  }
});

JSON.stringify({ underperformers: keywords.length, keywords }, null, 2);
```

**Pause Keywords**:
1. Select keyword checkboxes
2. Click **Bearbeiten** → **Pausieren**
3. Confirm action

#### Step 10: Modify Bidding Strategy

**Navigate to Campaign Settings**:
1. Click campaign name
2. Click **Einstellungen** tab
3. Scroll to **Gebotsstrategie** (Bidding Strategy) section

**Change Strategy**:
1. Click current strategy (e.g., "Conversions maximieren")
2. Select new strategy:
   - **Ziel-CPA** (Target CPA)
   - **Ziel-ROAS** (Target ROAS)
   - **Klicks maximieren** (Maximize Clicks)
   - **Conversion-Wert maximieren** (Maximize Conversion Value)
3. If Target CPA/ROAS selected, enter target value
4. Click **Speichern**

**Verify**:
- Check **Gebotsstrategie** shows new strategy
- Monitor performance over 2-4 weeks (learning phase)

## Common Use Cases

### Use Case 1: Weekly Optimization Routine

**Goal**: Review performance and optimize campaigns every Monday

**Steps**:
1. **Run analysis** (Part A: Steps 1-5)
2. **Identify issues**:
   - Campaigns with ROAS < 400%
   - Keywords with CPC > €5 and 0 conversions
   - High-spend low-conversion search terms
3. **Take actions**:
   - Pause underperforming campaigns/keywords
   - Add negative keywords from search terms
   - Reduce budgets for low ROAS campaigns
4. **Generate report**:
   - DataTable with top/bottom performers
   - Recommendations list
   - Budget reallocation suggestions
5. **Present to client** or apply changes

**Example DataTable**:
```datatable
{
  "title": "Weekly Google Ads Optimization - [Client Name]",
  "columns": [
    { "key": "campaign", "label": "Campaign", "type": "text" },
    { "key": "cost", "label": "Cost (7d)", "type": "currency" },
    { "key": "conversions", "label": "Conversions", "type": "number" },
    { "key": "roas", "label": "ROAS", "type": "percent" },
    { "key": "action", "label": "Action Taken", "type": "badge" }
  ],
  "rows": [
    {
      "campaign": "Search - Brand Terms",
      "cost": 450,
      "conversions": 28,
      "roas": 6.2,
      "action": "No action (performing well)"
    },
    {
      "campaign": "Display - Remarketing",
      "cost": 320,
      "conversions": 3,
      "roas": 1.8,
      "action": "Budget reduced -30%"
    },
    {
      "campaign": "Search - Generic Terms",
      "cost": 890,
      "conversions": 12,
      "roas": 3.4,
      "action": "Added 15 negative keywords"
    }
  ]
}
```

### Use Case 2: Budget Reallocation

**Goal**: Move budget from low-ROAS to high-ROAS campaigns

**Steps**:
1. **Calculate ROAS** for all campaigns
2. **Sort by ROAS** (descending)
3. **Identify**:
   - **Winners**: Top 20% by ROAS
   - **Losers**: Bottom 20% by ROAS
4. **Calculate reallocation**:
   ```
   Total to reallocate = Sum of loser budgets × 50%
   Per-winner increase = Total to reallocate / Number of winners
   ```
5. **Apply changes**:
   - Reduce loser budgets by 50%
   - Increase winner budgets proportionally
6. **Monitor** for 2 weeks, adjust if needed

**Example**:
```
BEFORE:
- Campaign A (ROAS 800%): €100/day
- Campaign B (ROAS 200%): €100/day

AFTER:
- Campaign A (ROAS 800%): €150/day (+50%)
- Campaign B (ROAS 200%): €50/day (-50%)

Expected Result: Higher overall ROAS
```

### Use Case 3: Search Terms Cleanup

**Goal**: Add negative keywords to reduce wasted spend

**Steps**:
1. Navigate to **Keywords** → **Suchbegriffe**
2. **Filter by**:
   - Last 30 days
   - Cost > €10
   - Conversions = 0
3. **Extract search terms**:
   ```javascript
   const searchTerms = [];
   const rows = document.querySelectorAll('tbody tr');

   rows.forEach(row => {
     const term = row.querySelector('td:first-child')?.textContent.trim();
     const cost = parseFloat(row.querySelector('td:nth-child(8)')?.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
     const conversions = parseFloat(row.querySelector('td:nth-child(10)')?.textContent) || 0;

     if (cost > 10 && conversions === 0) {
       searchTerms.push({ term, cost, action: 'ADD_AS_NEGATIVE' });
     }
   });

   JSON.stringify({ total: searchTerms.length, terms: searchTerms }, null, 2);
   ```
4. **Review terms manually**: Identify truly irrelevant (not just low-performing)
5. **Add as negative keywords**:
   - Select terms (checkboxes)
   - Click **Als negative Keywords hinzufügen**
   - Choose **Campaign** level (broad exclusion)
6. **Monitor savings** over next 7 days

**Typical Negative Keyword Categories**:
- **Job seekers**: "job", "karriere", "stellenangebot"
- **Free/cheap seekers**: "gratis", "kostenlos", "billig"
- **DIY/how-to**: "selber machen", "anleitung", "tutorial"
- **Competitors**: Competitor brand names

### Use Case 4: Ad Copy Testing

**Goal**: Create and test new ad variations

**Steps**:
1. Navigate to **Anzeigen & Erweiterungen** (Ads & Extensions)
2. Click **+ (Plus)** → **Responsive Suchanzeige**
3. **Create Ad**:
   - Select ad group
   - Enter 3-15 headlines (mix of value props, CTAs, keywords)
   - Enter 2-4 descriptions
   - Set final URL
   - **Pin strategically**: Pin H1 if critical (e.g., brand name), leave others flexible
4. **Save ad**
5. **Wait 2-4 weeks** for data (min 100 clicks)
6. **Compare performance**:
   - Navigate to **Anzeigen** tab
   - Filter by ad group
   - Compare CTR, Conversion Rate between ads
7. **Pause underperformers**, create new variants

**Ad Copy Best Practices**:
- **Include keyword** in at least 2 headlines
- **Use numbers**: "50% Rabatt", "24h Lieferung"
- **Strong CTA**: "Jetzt kaufen", "Kostenlos testen"
- **Unique value prop**: "Versandkostenfrei", "30 Tage Rückgabe"

### Use Case 5: Campaign Health Check

**Goal**: Monthly audit of all campaigns

**Steps**:
1. **Run full analysis** (Part A)
2. **Check each campaign** for:
   - **Budget**: Is it limited? (check "Limited by budget" status)
   - **Bidding**: Is strategy appropriate for goal?
   - **Targeting**: Locations, languages correct?
   - **Ad schedule**: Running at optimal times?
   - **Quality Score**: Average QS < 5/10? (check Keywords tab)
3. **Flag issues**:
   - Budget-limited campaigns with high ROAS (increase budget)
   - Manual CPC campaigns with 30+ conversions (switch to Smart Bidding)
   - Campaigns targeting wrong locations
   - Low Quality Score keywords (pause or improve landing page)
4. **Generate health report**:
   - Overall account health score
   - Campaign-by-campaign status
   - Prioritized action items

## Best Practices

### ✅ DO

**Before Making Changes**:
- **Take screenshot** of current state for rollback reference
- **Document reason** for each change
- **Check client approval** for major changes (budget >20%, pausing campaigns)
- **Test in low-impact campaigns first**

**When Optimizing**:
- **Wait for learning phase** (2-4 weeks) after changing bidding strategy
- **Make gradual changes**: 10-20% budget adjustments max
- **One change at a time**: Isolate impact of each optimization
- **Monitor daily** for first week after changes

**When Reporting**:
- **Show YoY comparison**: Contextualize performance
- **Explain "why"**: Don't just report metrics, provide insights
- **Visualize data**: Use datatables, screenshots
- **Provide next steps**: Clear action items

### ❌ DON'T

**Risky Actions**:
- **Don't pause all campaigns** without client approval
- **Don't change budgets >50%** in one adjustment
- **Don't switch bidding strategies** without 30+ conversions
- **Don't delete campaigns** (pause instead, allows rollback)

**Common Mistakes**:
- **Don't panic during learning phase** (fluctuations normal)
- **Don't add broad match keywords** without conversion tracking
- **Don't ignore mobile performance** (50%+ of traffic)
- **Don't set unrealistic targets** (Target CPA based on guess vs. historical data)

**When Making Changes**:
- **Don't make multiple changes simultaneously** (can't isolate impact)
- **Don't skip documentation** (note what/why/when changed)
- **Don't ignore Quality Score** (affects CPC and ad rank)

## Troubleshooting

### Budget Change Not Saving

**Symptoms**: New budget entered but reverts to old value

**Fixes**:
1. **Refresh page** and retry
2. **Check shared budgets**: Campaign may use shared budget (change at budget level)
3. **Check permissions**: Account access level allows budget changes?
4. **Clear browser cache**: Old data cached

### Campaign Won't Enable

**Symptoms**: Campaign status stays "Pausiert" after clicking Enable

**Fixes**:
1. **Check billing**: Payment method valid?
2. **Check policy violations**: Any ads disapproved?
3. **Check targeting**: Location/language set?
4. **Check ad group**: At least one active ad?
5. **Check keywords**: At least one active keyword?

### Negative Keywords Not Showing

**Symptoms**: Added negative keywords but still seeing unwanted search terms

**Fixes**:
1. **Check match type**: Broad match negative may not block all variations
2. **Check level**: Campaign-level negative vs. ad group-level
3. **Wait for processing**: Can take 24hrs to take full effect
4. **Check exclusions list**: Verify keyword actually saved

### Bidding Strategy Change Failed

**Symptoms**: Strategy change doesn't save or reverts

**Fixes**:
1. **Check conversion tracking**: Target CPA/ROAS requires conversion tracking enabled
2. **Check conversion count**: Need 30+ conversions for Target CPA, 50+ for Target ROAS
3. **Check campaign type**: Some strategies not available for all campaign types (e.g., no Manual CPC for Performance Max)

## Integration with Other Skills

### /google-ads-analysis
- **Relationship**: This skill extends google-ads-analysis
- **Use together**: Run analysis first, then use manager for optimizations

### /google-tag-manager
- **Conversion tracking**: Use GTM to verify conversion tags firing correctly
- **Troubleshooting**: If conversions not tracking, audit GTM setup

### /google-analytics
- **Attribution**: Cross-reference Google Ads conversions with GA4 data
- **User behavior**: Understand what happens after ad click

## Reference Documentation

**Knowledge Base**:
`C:\Users\alexa\.craft-agent\workspaces\my-workspace\sessions\260222-amber-coyote\data\google-ads-knowledge-base.md`

**Official Google Resources**:
- [Google Ads Help](https://support.google.com/google-ads)
- [Optimization Guide](https://support.google.com/google-ads/topic/3119116)
- [Bidding Strategies](https://support.google.com/google-ads/answer/2472725)

---

**Next Steps**:
1. Run weekly optimization routine
2. Monitor performance changes over 2-4 weeks
3. Iterate based on results
4. Consider API integration for bulk operations (future MCP source)
