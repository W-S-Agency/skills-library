---
name: "Google Analytics 4 Analysis"
description: "GA4 traffic analysis, conversion tracking, funnel analysis, and audience insights via browser automation"
alwaysAllow: ["mcp__browser-agent__browser_navigate", "mcp__browser-agent__browser_click", "mcp__browser-agent__browser_execute_js", "mcp__browser-agent__browser_screenshot", "mcp__browser-agent__browser_get_text"]
requiredSources:
  - browser-agent
---

# Google Analytics 4 Analysis Skill

Analyze Google Analytics 4 data through browser automation. Track traffic sources, conversion funnels, user behavior, e-commerce performance, and identify optimization opportunities.

## Core Capabilities

### 1. Traffic Analysis
- Traffic sources (organic, paid, direct, referral, social)
- Geographic and demographic breakdown
- Device/browser distribution
- Landing page performance

### 2. Conversion Analysis
- Conversion events tracking
- Funnel visualization and drop-off analysis
- Goal completion rates
- E-commerce transaction analysis

### 3. User Behavior
- Page engagement (scroll depth, time on page)
- User journey path analysis
- Session duration and bounce rate
- New vs. returning users

### 4. E-commerce Performance
- Product performance
- Transaction revenue and quantity
- Average order value
- Shopping behavior funnel

### 5. Audience Insights
- User demographics (age, gender, interests)
- Technology (device, browser, OS)
- Engagement patterns
- Lifetime value analysis

## Prerequisites

**Browser Profile**: Select appropriate browser profile with Google Analytics access
- **Recommended**: Use profile where client GA4 properties are accessible
- **Auto-detect**: Skill will list available profiles at runtime
- **Typical profiles**: Schmidt, AlexanderWirt, or client-specific profiles

**Knowledge Base**: Official Google Analytics 4 documentation reference (auto-loaded by skill)

## Core Workflow

### Step 1: Navigate to Google Analytics

**Step 1.1: List Available Profiles**
```javascript
// Get list of browser profiles with GA4 access
browser_list_profiles()
```

**Step 1.2: Navigate to Google Analytics**
```javascript
// Use selected profile (ask user or use active profile)
profileId: "<selected-profile-id>"  // From list_profiles result
url: "https://analytics.google.com"
```

**Expected State**: Property selector visible

### Step 2: Select Property

**Extract Property List**:
```javascript
const properties = [];
const propertyElements = document.querySelectorAll('[data-test-id="property-selector-item"]');

propertyElements.forEach(el => {
  const name = el.querySelector('[class*="name"]')?.textContent.trim();
  const id = el.querySelector('[class*="id"]')?.textContent.trim();
  if (name) {
    properties.push({ name, id });
  }
});

JSON.stringify(properties, null, 2);
```

**Click Property**: Use `browser_click` on property name

### Step 3: Set Date Range

**Default**: Last 30 days

**Change Date Range**:
1. Click date selector (top right, shows current range)
2. Select preset:
   - **Letzten 7 Tage** (Last 7 days)
   - **Letzten 30 Tage** (Last 30 days)
   - **Letzten 90 Tage** (Last 90 days)
3. Or **Benutzerdefiniert** (Custom) for specific dates
4. **Optional**: Enable **Vergleichen** (Compare) for period-over-period
5. Click **Übernehmen** (Apply)

### Step 4: Navigate to Reports

**Standard Reports**:
- **Berichte** → **Übersicht** (Reports Snapshot)
- **Berichte** → **Echtzeit** (Realtime)
- **Berichte** → **Lebenszyklus** (Life Cycle):
  - **Akquisition** (Acquisition) - Traffic sources
  - **Engagement** - Pages, events, conversions
  - **Monetarisierung** (Monetization) - E-commerce
  - **Bindung** (Retention) - Cohorts, user engagement
- **Berichte** → **Nutzer** (User) - Demographics, tech

**Exploration Reports** (Advanced):
- **Entdecken** (Explore) → Choose template:
  - **Freiform** (Free Form) - Custom table builder
  - **Trichteranalyse** (Funnel Exploration) - Conversion funnel
  - **Pfadanalyse** (Path Exploration) - User journey
  - **Segmentüberschneidung** (Segment Overlap) - Venn diagram
  - **Nutzer-Explorer** (User Explorer) - Individual users
  - **Kohortenanalyse** (Cohort Exploration) - Retention
  - **Nutzerleben** (User Lifetime) - LTV analysis

### Step 5: Extract Traffic Sources

**Navigate to**: **Berichte** → **Lebenszyklus** → **Akquisition** → **Traffic-Akquisition**

**Extract Data**:
```javascript
const trafficSources = [];
const rows = document.querySelectorAll('table tbody tr');

rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length >= 5) {
    const source = cells[0]?.textContent.trim();
    const users = cells[1]?.textContent.trim();
    const sessions = cells[2]?.textContent.trim();
    const engagementRate = cells[3]?.textContent.trim();
    const conversions = cells[4]?.textContent.trim();

    trafficSources.push({
      source,
      users: parseInt(users.replace(/\D/g, '')),
      sessions: parseInt(sessions.replace(/\D/g, '')),
      engagementRate,
      conversions: parseInt(conversions.replace(/\D/g, ''))
    });
  }
});

// Calculate totals
const totals = {
  totalUsers: trafficSources.reduce((sum, s) => sum + s.users, 0),
  totalSessions: trafficSources.reduce((sum, s) => sum + s.sessions, 0),
  totalConversions: trafficSources.reduce((sum, s) => sum + s.conversions, 0)
};

JSON.stringify({ totals, sources: trafficSources }, null, 2);
```

**Analyze**:
- **Top sources**: Which channels drive most traffic?
- **Conversion rate by source**: Conversions / Sessions
- **Traffic quality**: Engagement rate (higher = better)

### Step 6: Analyze Conversion Funnel

**Navigate to**: **Entdecken** → **Neuer Bericht** → **Trichteranalyse**

**Configure Funnel**:
1. Click **+ Schritt hinzufügen** (Add Step)
2. Define steps:
   - **Step 1**: `page_view` (Landing Page)
   - **Step 2**: `view_item` (Product View)
   - **Step 3**: `add_to_cart` (Add to Cart)
   - **Step 4**: `begin_checkout` (Checkout)
   - **Step 5**: `purchase` (Purchase)
3. Set **Zeitrahmen** (Timeframe): Last 30 days
4. **Optional**: Add breakdown dimension (Device category, Traffic source)
5. Click **Anwenden**

**Extract Funnel Data**:
```javascript
const funnelSteps = [];
const stepElements = document.querySelectorAll('[data-test-id="funnel-step"]');

stepElements.forEach((el, idx) => {
  const stepName = el.querySelector('[data-test-id="step-name"]')?.textContent.trim();
  const count = el.querySelector('[data-test-id="step-count"]')?.textContent.trim();
  const dropoff = el.querySelector('[data-test-id="step-dropoff"]')?.textContent.trim();

  funnelSteps.push({
    step: idx + 1,
    name: stepName,
    users: parseInt(count.replace(/\D/g, '')),
    dropoffRate: dropoff
  });
});

// Calculate conversion rate
const firstStep = funnelSteps[0]?.users || 1;
const lastStep = funnelSteps[funnelSteps.length - 1]?.users || 0;
const overallConversionRate = ((lastStep / firstStep) * 100).toFixed(2);

JSON.stringify({
  overallConversionRate: `${overallConversionRate}%`,
  steps: funnelSteps
}, null, 2);
```

**Identify Issues**:
- **Highest drop-off**: Which step loses most users?
- **Abandonment rate**: (Step N - Step N+1) / Step N
- **Optimization target**: Focus on biggest drop-off

### Step 7: Analyze E-commerce Performance

**Navigate to**: **Berichte** → **Lebenszyklus** → **Monetarisierung** → **E-Commerce-Käufe**

**Extract E-commerce Metrics**:
```javascript
const ecommerce = {
  summary: {},
  products: []
};

// Extract summary metrics
const summaryText = document.body.innerText;
const totalRevenue = summaryText.match(/Gesamtumsatz[^\d]*([\d.,]+\s*€)/);
const transactions = summaryText.match(/Transaktionen[^\d]*([\d.,]+)/);
const avgOrderValue = summaryText.match(/Durchschnittlicher Bestellwert[^\d]*([\d.,]+\s*€)/);

ecommerce.summary = {
  totalRevenue: totalRevenue?.[1],
  transactions: transactions?.[1],
  averageOrderValue: avgOrderValue?.[1]
};

// Extract product-level data
const rows = document.querySelectorAll('table tbody tr');
rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length >= 5) {
    const productName = cells[0]?.textContent.trim();
    const itemRevenue = cells[1]?.textContent.trim();
    const itemsPurchased = cells[2]?.textContent.trim();
    const itemsViewed = cells[3]?.textContent.trim();
    const addToCarts = cells[4]?.textContent.trim();

    ecommerce.products.push({
      name: productName,
      revenue: itemRevenue,
      purchased: parseInt(itemsPurchased.replace(/\D/g, '')),
      viewed: parseInt(itemsViewed.replace(/\D/g, '')),
      addToCarts: parseInt(addToCarts.replace(/\D/g, ''))
    });
  }
});

JSON.stringify(ecommerce, null, 2);
```

**Calculate Product Metrics**:
```javascript
// For each product
products.forEach(product => {
  // Add-to-cart rate
  product.atcRate = ((product.addToCarts / product.viewed) * 100).toFixed(2) + '%';

  // Purchase rate (from add-to-cart)
  product.purchaseRate = ((product.purchased / product.addToCarts) * 100).toFixed(2) + '%';

  // Overall conversion rate (view to purchase)
  product.conversionRate = ((product.purchased / product.viewed) * 100).toFixed(2) + '%';
});
```

### Step 8: Audience Demographics

**Navigate to**: **Berichte** → **Nutzer** → **Demografische Merkmale** → **Übersicht**

**Extract Demographics**:
```javascript
const demographics = {
  age: [],
  gender: [],
  interests: []
};

// Age distribution
const ageRows = document.querySelectorAll('table[aria-label*="Alter"] tbody tr');
ageRows.forEach(row => {
  const ageRange = row.querySelector('td:first-child')?.textContent.trim();
  const users = row.querySelector('td:nth-child(2)')?.textContent.trim();
  demographics.age.push({ range: ageRange, users });
});

// Gender distribution
const genderRows = document.querySelectorAll('table[aria-label*="Geschlecht"] tbody tr');
genderRows.forEach(row => {
  const gender = row.querySelector('td:first-child')?.textContent.trim();
  const users = row.querySelector('td:nth-child(2)')?.textContent.trim();
  demographics.gender.push({ gender, users });
});

JSON.stringify(demographics, null, 2);
```

### Step 9: Generate Analysis Report

**Structure Report with DataTable**:

Use `datatable` blocks for GA4 analysis results:

```datatable
{
  "title": "GA4 Traffic Analysis - [Client Name] - Last 30 Days",
  "columns": [
    { "key": "source", "label": "Traffic Source", "type": "text" },
    { "key": "users", "label": "Users", "type": "number" },
    { "key": "sessions", "label": "Sessions", "type": "number" },
    { "key": "engagementRate", "label": "Engagement Rate", "type": "percent" },
    { "key": "conversions", "label": "Conversions", "type": "number" },
    { "key": "conversionRate", "label": "Conv. Rate", "type": "percent" }
  ],
  "rows": [
    {
      "source": "google / organic",
      "users": 4523,
      "sessions": 5678,
      "engagementRate": 0.68,
      "conversions": 142,
      "conversionRate": 0.025
    },
    {
      "source": "google / cpc",
      "users": 1234,
      "sessions": 1456,
      "engagementRate": 0.72,
      "conversions": 89,
      "conversionRate": 0.061
    },
    {
      "source": "direct / (none)",
      "users": 2345,
      "sessions": 2789,
      "engagementRate": 0.65,
      "conversions": 67,
      "conversionRate": 0.024
    }
  ]
}
```

**Key Insights Section**:
1. **Traffic Distribution**: Organic 60%, Paid 20%, Direct 15%, Other 5%
2. **Top Converter**: Google Ads (6.1% conversion rate)
3. **Engagement Leader**: Social media (75% engagement rate)
4. **Opportunity**: Increase paid budget (highest conversion rate)

## Common Use Cases

### Use Case 1: Monthly Traffic Report

**Goal**: Generate monthly traffic summary for client

**Steps**:
1. Set date range: Last 30 days vs. previous 30 days
2. Navigate to **Traffic-Akquisition**
3. Extract traffic sources data
4. Calculate:
   - Total users (current vs. previous)
   - Traffic mix percentages
   - Top 3 sources by conversions
   - YoY growth per channel
5. Create datatable report with insights
6. Add screenshots of key charts
7. Provide recommendations:
   - Which channels to invest more
   - Which channels to optimize
   - New channels to explore

**Example Output**:
```
📊 Monthly Traffic Report - February 2026

Total Users: 8,102 (+12% vs. January)
Total Sessions: 9,923 (+15% vs. January)
Overall Conversion Rate: 2.98%

Top Performers:
1. Google Ads (CPC) - 6.1% conversion rate (+0.8% MoM)
2. Organic Search - 60% of traffic, 2.5% conv rate
3. Direct Traffic - 24% of traffic, 2.4% conv rate

Recommendations:
- Increase Google Ads budget (highest ROAS)
- Improve organic conversion rate (SEO landing page optimization)
- Test social media advertising (currently 0% of traffic)
```

### Use Case 2: Conversion Funnel Optimization

**Goal**: Identify and fix funnel drop-offs

**Steps**:
1. Create funnel exploration (Step 6)
2. Identify highest drop-off step
3. Analyze by device/traffic source breakdown
4. Hypothesis: Why are users dropping off?
   - **Checkout drop-off**: Shipping costs too high? Too many form fields?
   - **Cart drop-off**: Unclear CTA? Trust issues?
5. Recommend fixes:
   - A/B test simplified checkout
   - Add trust badges
   - Optimize mobile experience (if mobile has higher drop-off)
6. Monitor funnel after changes

**Example Finding**:
```
🔍 Funnel Drop-off Analysis

Step 3 → Step 4 (Cart → Checkout): 45% drop-off rate

Mobile vs. Desktop:
- Mobile drop-off: 58% 🔴
- Desktop drop-off: 32% 🟢

Hypothesis: Mobile checkout UX issue

Recommendation:
- Simplify mobile checkout (reduce form fields)
- Add guest checkout option
- Test one-page checkout on mobile
```

### Use Case 3: Product Performance Analysis

**Goal**: Identify top/bottom performing products

**Steps**:
1. Navigate to **Monetarisierung** → **E-Commerce-Käufe**
2. Extract product-level data
3. Calculate metrics:
   - Add-to-cart rate (ATC / Views)
   - Purchase rate (Purchases / ATC)
   - Overall conversion rate (Purchases / Views)
4. Sort by revenue (descending)
5. Identify:
   - **Winners**: High revenue + high conversion rate
   - **Opportunity**: High traffic, low conversion (optimize product page)
   - **Losers**: Low traffic, low conversion (consider removal)
6. Provide recommendations per product category

**Example Analysis**:
```datatable
{
  "title": "Product Performance - Top 10 by Revenue",
  "columns": [
    { "key": "product", "label": "Product", "type": "text" },
    { "key": "revenue", "label": "Revenue", "type": "currency" },
    { "key": "views", "label": "Views", "type": "number" },
    { "key": "atcRate", "label": "ATC Rate", "type": "percent" },
    { "key": "convRate", "label": "Conv. Rate", "type": "percent" },
    { "key": "action", "label": "Recommendation", "type": "text" }
  ],
  "rows": [
    {
      "product": "Running Shoes Pro",
      "revenue": 12500,
      "views": 2340,
      "atcRate": 0.15,
      "convRate": 0.08,
      "action": "Winner - Promote more"
    },
    {
      "product": "Budget Sneakers",
      "revenue": 3400,
      "views": 4560,
      "atcRate": 0.05,
      "convRate": 0.02,
      "action": "High traffic, low conv - Optimize page"
    }
  ]
}
```

### Use Case 4: User Lifetime Value (LTV) Analysis

**Goal**: Calculate customer lifetime value by acquisition source

**Steps**:
1. Navigate to **Entdecken** → **Nutzerleben** (User Lifetime)
2. Set metric: **Gesamtumsatz** (Total Revenue)
3. Breakdown by: **Akquisitionsquelle** (Acquisition Source)
4. Set timeframe: Last 90 days of acquisitions
5. Extract LTV by source
6. Calculate:
   - Average LTV per source
   - Cost per acquisition (from Google Ads data)
   - LTV / CPA ratio (profitability)
7. Recommend budget allocation based on LTV

**Example Output**:
```
💰 Customer Lifetime Value Analysis

Acquisition Source | Avg LTV | CPA | LTV/CPA Ratio
-------------------|---------|-----|---------------
Google Ads         | €245    | €45 | 5.4x 🟢
Organic Search     | €189    | €0  | ∞ 🟢
Direct             | €156    | €0  | ∞
Social Media       | €98     | €12 | 8.2x 🟢

Recommendation:
- Increase Google Ads spend (profitable 5.4x return)
- Test social media ads (highest LTV/CPA ratio!)
- Invest in SEO (free acquisition, good LTV)
```

### Use Case 5: Real-time Event Monitoring

**Goal**: Verify events firing correctly after GTM changes

**Steps**:
1. Navigate to **Echtzeit** (Realtime) report
2. Check **Ereignisse** (Events) section
3. Verify expected events appearing:
   - `page_view`
   - `purchase` (on thank-you page)
   - Custom events (e.g., `video_play`, `form_submit`)
4. Click into event to see parameters
5. Verify parameter values correct:
   - `transaction_id` present for purchases
   - `currency` and `value` paired
   - `items` array populated
6. If event missing:
   - Check GTM Preview Mode (see `/google-tag-manager`)
   - Verify dataLayer push timing
   - Check GA4 Configuration tag firing

**Realtime Verification**:
```javascript
// Extract realtime events
const realtimeEvents = [];
const eventElements = document.querySelectorAll('[data-test-id="realtime-event"]');

eventElements.forEach(el => {
  const eventName = el.querySelector('[data-test-id="event-name"]')?.textContent.trim();
  const count = el.querySelector('[data-test-id="event-count"]')?.textContent.trim();
  realtimeEvents.push({ event: eventName, count: parseInt(count) });
});

JSON.stringify({ timestamp: new Date().toISOString(), events: realtimeEvents }, null, 2);
```

## Best Practices

### ✅ DO

**When Analyzing**:
- **Use period comparisons**: Always compare to previous period (MoM, YoY)
- **Segment data**: Breakdown by device, traffic source, geography
- **Focus on conversions**: Traffic volume matters less than conversion quality
- **Combine with other data**: Cross-reference with Google Ads, GTM

**When Reporting**:
- **Visualize insights**: Use datatables, charts, screenshots
- **Explain "why"**: Don't just report numbers, provide context
- **Actionable recommendations**: Specific next steps for client
- **Highlight changes**: Call out significant MoM/YoY changes

**Data Quality**:
- **Check for spam traffic**: Referral spam, bot traffic
- **Verify tracking**: Realtime report after GTM changes
- **Monitor data consistency**: Large fluctuations may indicate tracking issues

### ❌ DON'T

**Common Mistakes**:
- **Don't compare GA4 to UA**: Different models, not 1:1 comparison
- **Don't ignore mobile**: 50%+ of traffic is mobile
- **Don't trust unverified data**: Always verify tracking after changes
- **Don't over-complicate**: Start with standard reports before explorations

**Analysis Errors**:
- **Don't confuse users with sessions**: Users = unique visitors, Sessions = visits
- **Don't ignore engagement rate**: Replaces bounce rate in GA4
- **Don't forget attribution windows**: Conversions may be delayed
- **Don't ignore data sampling**: Large date ranges may use sampled data

## Troubleshooting

### Events Not Appearing

**Symptoms**: Expected events not showing in reports (after 24hrs)

**Fixes**:
1. **Check Realtime first**: Events should appear within seconds
2. **Verify event name**: Exact spelling, case-sensitive
3. **Check data stream**: Correct Measurement ID in GTM
4. **Review DebugView**: Enable debug mode for detailed view
5. **Check filters**: Ad blocker, consent mode may block events

### Conversion Count Mismatch (GA4 vs. Google Ads)

**Symptoms**: GA4 shows 100 conversions, Google Ads shows 80

**Causes**:
- **Different attribution models**: GA4 data-driven, Ads last-click
- **Attribution windows**: GA4 default 30-day click, Ads may be 7-day
- **Conversion import delay**: Can take 24hrs to sync
- **Conversion deduplication**: Different `transaction_id` handling

**Fixes**:
1. Align attribution models (both use data-driven)
2. Match attribution windows in GA4 and Ads
3. Wait 24-48hrs for data to stabilize
4. Verify conversion import settings in GA4 Admin

### Funnel Shows No Data

**Symptoms**: Funnel exploration returns empty results

**Fixes**:
1. **Check event names**: Must match exactly (e.g., `purchase` not `Purchase`)
2. **Widen date range**: May not have enough data in selected period
3. **Remove strict filters**: Too many filters may exclude all users
4. **Check event firing**: Verify events in Realtime/Events report first

### Demographics Not Available

**Symptoms**: Demographics reports show "(not set)"

**Causes**:
- Google Signals not enabled
- Insufficient data (privacy thresholds)
- Users opted out of ads personalization

**Fixes**:
1. **Enable Google Signals**: Admin → Data Settings → Google Signals
2. **Wait for data threshold**: Need minimum users for privacy
3. **Accept limitation**: Some data will always be "(not set)"

## Integration with Other Skills

### /google-tag-manager
- **Event verification**: Check GTM tags firing correctly
- **DataLayer debugging**: Verify parameter structure
- **Conversion tracking**: Ensure tags send events to GA4

### /google-ads-manager
- **Conversion import**: GA4 events used in Google Ads bidding
- **Audience sync**: GA4 audiences pushed to Ads for remarketing
- **Cross-platform attribution**: See full customer journey

## Reference Documentation

**Knowledge Base**:
`C:\Users\alexa\.craft-agent\workspaces\my-workspace\sessions\260222-amber-coyote\data\google-analytics-knowledge-base.md`

**Official Google Resources**:
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Events Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Analytics Help Center](https://support.google.com/analytics)

---

**Next Steps**:
1. Run monthly traffic analysis
2. Set up conversion funnel monitoring
3. Create automated weekly reports
4. Consider API integration for advanced analysis (future MCP source)
