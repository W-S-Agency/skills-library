---
name: "Google Tag Manager Audit & Management"
description: "Comprehensive GTM audit, debugging, and tag management through browser automation"
alwaysAllow: ["mcp__browser-agent__browser_navigate", "mcp__browser-agent__browser_click", "mcp__browser-agent__browser_execute_js", "mcp__browser-agent__browser_screenshot", "mcp__browser-agent__browser_get_text"]
requiredSources:
  - browser-agent
---

# Google Tag Manager Audit & Management Skill

Audit, debug, and manage Google Tag Manager configurations through browser automation. Verify tag firing, check dataLayer implementation, analyze triggers, and ensure correct GTM setup.

## Core Capabilities

### 1. GTM Container Audit
- Check all tags, triggers, and variables in container
- Verify tags are published and firing correctly
- Identify unused tags and stale configurations
- Check for duplicate tags (same tracking code twice)

### 2. Tag Firing Verification
- Use GTM Preview Mode to verify tag execution
- Check which tags fire on specific pages/events
- Validate trigger conditions match expectations
- Debug tags that should fire but don't

### 3. DataLayer Implementation Check
- Inspect dataLayer structure and values
- Verify e-commerce tracking implementation
- Check custom event pushes
- Validate parameter formatting (snake_case, value limits)

### 4. Conversion Tracking Audit
- Verify Google Ads conversion tags
- Check Google Analytics 4 events
- Validate e-commerce purchase tracking
- Confirm conversion triggers on thank-you pages

### 5. Cross-Domain Tracking Verification
- Check linker parameter (_gl) in cross-domain URLs
- Verify GTM containers on all tracked domains
- Test session continuity across domains

## Prerequisites

**Browser Profile**: Select appropriate browser profile with GTM access
- **Recommended**: Use profile where client GTM accounts are authenticated
- **Auto-detect**: Skill will list available profiles at runtime
- **Typical profiles**: Schmidt, AlexanderWirt, or client-specific profiles

**Knowledge Base**: Read before first use:
`C:\Users\alexa\.craft-agent\workspaces\my-workspace\sessions\260222-amber-coyote\data\google-tag-manager-knowledge-base.md`

## Core Workflow

### Step 1: Navigate to GTM

**Step 1.1: List Available Profiles**
```javascript
// First, get list of available browser profiles
browser_list_profiles()
```

**Step 1.2: Navigate to GTM**
```javascript
// Use selected profile (ask user or use active profile)
profileId: "<selected-profile-id>"  // From list_profiles result
url: "https://tagmanager.google.com"
```

**Expected State**:
- Account selector visible
- List of client GTM accounts displayed

### Step 2: Select Container

**Method A - UI Click**:
1. Click on account name
2. Click on container name (Web, iOS, Android)
3. Wait for workspace to load

**Method B - Direct URL** (faster):
```
https://tagmanager.google.com/#/container/accounts/{accountId}/containers/{containerId}/workspaces/{workspaceId}
```

**Extract Account/Container IDs**:
Use `browser_execute_js` to get IDs from URL after manual selection:
```javascript
const match = window.location.href.match(/accounts\/(\d+)\/containers\/(\d+)\/workspaces\/(\d+)/);
const result = {
  accountId: match[1],
  containerId: match[2],
  workspaceId: match[3]
};
JSON.stringify(result);
```

### Step 3: Audit Tags

**Navigate to Tags**:
- Click **Tags** in left sidebar
- Or direct URL: `/workspaces/{workspaceId}/tags`

**Extract Tag List**:
```javascript
const tags = [];
const rows = document.querySelectorAll('table tbody tr');

rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length >= 4) {
    tags.push({
      name: cells[0]?.textContent.trim(),
      type: cells[1]?.textContent.trim(),
      firingTriggers: cells[2]?.textContent.trim(),
      status: cells[3]?.textContent.trim()  // "Published", "Modified", "Paused"
    });
  }
});

JSON.stringify({
  total: tags.length,
  published: tags.filter(t => t.status === 'Published').length,
  modified: tags.filter(t => t.status === 'Modified').length,
  paused: tags.filter(t => t.status === 'Paused').length,
  tags: tags
}, null, 2);
```

**Identify Issues**:
- **Paused tags**: Check if intentionally paused or misconfigured
- **Modified unpublished**: Changes not live yet
- **Duplicate tags**: Same tag type + trigger (GA4 Config appearing twice)

### Step 4: Audit Triggers

**Navigate to Triggers**:
- Click **Triggers** in left sidebar

**Extract Trigger List**:
```javascript
const triggers = [];
const rows = document.querySelectorAll('table tbody tr');

rows.forEach(row => {
  const cells = row.querySelectorAll('td');
  if (cells.length >= 3) {
    triggers.push({
      name: cells[0]?.textContent.trim(),
      type: cells[1]?.textContent.trim(),
      status: cells[2]?.textContent.trim()
    });
  }
});

JSON.stringify({
  total: triggers.length,
  types: {
    pageView: triggers.filter(t => t.type.includes('Page View')).length,
    customEvent: triggers.filter(t => t.type.includes('Custom Event')).length,
    click: triggers.filter(t => t.type.includes('Click')).length,
    formSubmission: triggers.filter(t => t.type.includes('Form')).length
  },
  triggers: triggers
}, null, 2);
```

**Check for Common Patterns**:
- **All Pages trigger exists**: Should be present for GA4 Config
- **Custom Event triggers**: Match dataLayer event names
- **Unused triggers**: No tags assigned

### Step 5: Preview Mode Testing

**Enter Preview Mode**:
1. Click **Preview** button (top right)
2. Enter website URL when prompted
3. New window opens with Tag Assistant connected

**In Tag Assistant Tab**:
```javascript
// Get summary of tags fired
const summary = {
  url: window.location.href,
  tagsTotal: document.querySelectorAll('[data-test-id="tag-name"]').length,
  tagsFired: document.querySelectorAll('[data-test-id="tag-status"][data-status="success"]').length,
  tagsNotFired: document.querySelectorAll('[data-test-id="tag-status"][data-status="not-fired"]').length,
  events: []
};

// Extract events
const eventElements = document.querySelectorAll('[data-test-id="event-item"]');
eventElements.forEach(el => {
  summary.events.push({
    name: el.querySelector('[data-test-id="event-name"]')?.textContent,
    tagsFired: el.querySelectorAll('[data-status="success"]').length
  });
});

JSON.stringify(summary, null, 2);
```

**Debug Specific Tag**:
1. Click on event (e.g., "Page View", "purchase")
2. Click on tag name
3. Inspect **Tag** tab: Configuration details
4. Inspect **Variables** tab: Resolved values
5. Check **Errors** tab: Any JavaScript errors

**Common Issues to Check**:
- **Tags not firing**: Check trigger conditions
- **Variables undefined**: dataLayer not pushed before GTM loads
- **Errors**: JavaScript errors in Custom HTML tags

### Step 6: DataLayer Inspection

**Check DataLayer Structure** (on actual website, not GTM interface):
```javascript
// Execute on website tab (while in Preview Mode)
const dataLayerSnapshot = window.dataLayer || [];
const result = {
  total: dataLayerSnapshot.length,
  recent: dataLayerSnapshot.slice(-10),  // Last 10 events
  events: dataLayerSnapshot.filter(item => item.event).map(item => item.event),
  ecommerceEvents: dataLayerSnapshot.filter(item => item.ecommerce).length
};

JSON.stringify(result, null, 2);
```

**Validate E-commerce Events**:
```javascript
// Check for proper ecommerce structure
const ecommerceEvents = window.dataLayer.filter(item => item.ecommerce);
const validation = {
  total: ecommerceEvents.length,
  issues: []
};

ecommerceEvents.forEach((event, idx) => {
  // Check currency when value is present
  if (event.ecommerce.value && !event.ecommerce.currency) {
    validation.issues.push(`Event ${idx}: 'currency' missing when 'value' is set`);
  }

  // Check items array
  if (event.ecommerce.items) {
    event.ecommerce.items.forEach((item, itemIdx) => {
      if (!item.item_id && !item.item_name) {
        validation.issues.push(`Event ${idx}, Item ${itemIdx}: Missing both 'item_id' and 'item_name'`);
      }
    });
  }
});

JSON.stringify(validation, null, 2);
```

### Step 7: Generate Audit Report

**Structure Report with DataTable**:

Use `datatable` block for GTM audit results:

```datatable
{
  "title": "GTM Container Audit - [Client Name]",
  "columns": [
    { "key": "category", "label": "Category", "type": "text" },
    { "key": "status", "label": "Status", "type": "badge" },
    { "key": "count", "label": "Count", "type": "number" },
    { "key": "issues", "label": "Issues Found", "type": "text" }
  ],
  "rows": [
    {
      "category": "Total Tags",
      "status": "Info",
      "count": 15,
      "issues": "-"
    },
    {
      "category": "Tags Firing Correctly",
      "status": "Success",
      "count": 12,
      "issues": "-"
    },
    {
      "category": "Tags Not Firing",
      "status": "Warning",
      "count": 2,
      "issues": "GA4 Event - Purchase (trigger misconfigured)"
    },
    {
      "category": "DataLayer Errors",
      "status": "Error",
      "count": 3,
      "issues": "Missing 'currency' parameter in 2 purchase events"
    },
    {
      "category": "Duplicate Tags",
      "status": "Warning",
      "count": 1,
      "issues": "GA4 Configuration tag appears twice"
    }
  ]
}
```

**Actionable Recommendations**:
1. **Fix priority issues** (Status: Error)
2. **Address warnings** (Status: Warning)
3. **Verify all tags after fixes** (Re-run Preview Mode)
4. **Publish changes** when verified

## Common Use Cases

### Use Case 1: New Client GTM Audit

**Goal**: Comprehensive audit of existing GTM setup

**Steps**:
1. Navigate to client's GTM container
2. Extract all tags, triggers, variables
3. Identify issues:
   - Paused/disabled tags
   - Duplicate tracking (same GA4 Measurement ID in multiple tags)
   - Broken triggers
   - Unused variables
4. Enter Preview Mode on client website
5. Test key conversion paths:
   - Homepage → Product Page → Add to Cart → Checkout → Purchase
6. Document all dataLayer events
7. Generate audit report with findings and recommendations
8. Present via datatable and screenshots

### Use Case 2: Conversion Tracking Verification

**Goal**: Verify Google Ads conversion tracking works correctly

**Steps**:
1. Navigate to **Tags** → Find Google Ads Conversion Tracking tag
2. Note **Conversion ID** and **Conversion Label**
3. Click tag name → **Triggering** section → Verify trigger
4. Enter **Preview Mode**
5. Navigate website to conversion page (thank-you page, form submission)
6. In Tag Assistant:
   - Check "Conversion Linker" tag fired (required)
   - Check "Google Ads Conversion Tracking" tag fired
   - Verify conversion value passed correctly
7. In Google Ads (separate browser tab):
   - Navigate to **Tools & Settings** → **Conversions**
   - Check "Last received" timestamp updates (may take 24hrs)
8. Document findings and any issues

### Use Case 3: GA4 E-commerce Tracking Audit

**Goal**: Verify GA4 e-commerce events fire correctly

**Steps**:
1. Identify GA4 tags in GTM:
   - GA4 Configuration tag
   - GA4 Event tags (view_item, add_to_cart, purchase, etc.)
2. For each e-commerce event tag:
   - Check **Event Name** matches GA4 recommended event
   - Verify **Event Parameters** mapped from dataLayer
3. Enter **Preview Mode**
4. Simulate e-commerce funnel:
   - View product → Check `view_item` fires
   - Add to cart → Check `add_to_cart` fires
   - Begin checkout → Check `begin_checkout` fires
   - Complete purchase → Check `purchase` fires
5. For each event, verify in Tag Assistant:
   - **currency** parameter present when **value** is sent
   - **items** array structured correctly
   - **transaction_id** present for `purchase` event (prevents duplicates)
6. Cross-check in GA4 Realtime (separate tab):
   - Events appear within 1-2 minutes
7. Generate report with pass/fail for each event

### Use Case 4: DataLayer Implementation Review

**Goal**: Review website's dataLayer implementation quality

**Steps**:
1. Open website in Preview Mode
2. Execute dataLayer inspection script (see Step 6)
3. Check for:
   - **Initialization timing**: dataLayer initialized before GTM snippet?
   - **Event naming**: snake_case format?
   - **Parameter naming**: No reserved prefixes (google_, ga_, firebase_)?
   - **E-commerce**: Currency + value always paired?
   - **Items array**: item_id or item_name present?
4. Identify issues:
   - **Late initialization**: dataLayer.push() before GTM loads
   - **Case errors**: PascalCase or camelCase instead of snake_case
   - **Missing parameters**: Required fields omitted
5. Provide code fixes for developers:
   ```javascript
   // BEFORE (wrong)
   dataLayer.push({
     'Event': 'Purchase',  // Wrong: PascalCase
     'TransactionValue': 99.99  // Wrong: missing currency
   });

   // AFTER (correct)
   dataLayer.push({
     'event': 'purchase',  // Correct: snake_case
     'ecommerce': {
       'transaction_id': 'T_12345',
       'value': 99.99,
       'currency': 'EUR',  // Required
       'items': [...]
     }
   });
   ```

## Best Practices

### ✅ DO

**During Audit**:
- **Take screenshots** at each step for client documentation
- **Use Preview Mode** extensively (shows real-time tag firing)
- **Test on multiple browsers/devices** if issues suspected
- **Document all findings** in structured format (datatable)
- **Provide specific fixes** (not just "fix dataLayer")

**When Reporting**:
- **Prioritize issues**: Critical (revenue impact) → High → Medium → Low
- **Explain business impact**: "Purchase tag not firing = lost conversion data"
- **Show before/after**: Screenshots of broken vs. fixed state
- **Include implementation code** for developers

### ❌ DON'T

**During Audit**:
- **Don't make changes in production** without client approval
- **Don't publish containers** during audit (testing only)
- **Don't assume issues**: Verify in Preview Mode before flagging
- **Don't skip cross-domain testing** if applicable

**When Reporting**:
- **Don't use jargon**: Explain "Custom HTML tag" not "type: html"
- **Don't report false positives**: Verify issue exists before documenting
- **Don't batch all issues together**: Separate by severity and category

## Troubleshooting

### Preview Mode Not Connecting

**Symptoms**: "Waiting for Tag Assistant" message persists

**Fixes**:
1. **Allow pop-ups** from tagmanager.google.com
2. **Clear browser cache** and retry
3. **Check browser extensions**: Disable ad blockers
4. **Use Incognito/Private mode**: Avoid extension interference
5. **Try direct URL**: Copy Preview Mode URL and open manually

### Tags Not Appearing in Preview

**Symptoms**: Tags exist in GTM but don't show in Tag Assistant

**Fixes**:
1. **Check tag status**: Is tag Published?
2. **Verify trigger**: Does trigger condition match current page?
3. **Refresh Preview Mode**: Exit and re-enter Preview
4. **Check workspace**: Are you in correct workspace (Default vs. other)?

### DataLayer Undefined

**Symptoms**: `window.dataLayer` returns `undefined` in console

**Fixes**:
1. **Check initialization**: dataLayer should be initialized BEFORE GTM snippet
   ```html
   <script>
     window.dataLayer = window.dataLayer || [];
   </script>
   <!-- THEN GTM snippet -->
   ```
2. **Check page source**: Verify initialization code is present
3. **Check timing**: Events pushed after GTM load may not register

### Variable Not Resolving

**Symptoms**: Variable shows "undefined" in Tag Assistant

**Fixes**:
1. **Check dataLayer structure**: Does key exist?
   ```javascript
   // Wrong
   dataLayer.push({ transactionId: "123" });

   // Correct (if variable is "ecommerce.transaction_id")
   dataLayer.push({
     ecommerce: { transaction_id: "123" }
   });
   ```
2. **Check variable type**: Data Layer Variable vs. JavaScript Variable
3. **Set default value**: Configure fallback value in variable settings
4. **Check timing**: Variable must be pushed before tag fires

## Integration with Other Tools

### Google Analytics 4
- Verify GA4 Configuration tag fires on all pages
- Check GA4 Event tags for custom events
- Cross-reference with GA4 Realtime report

### Google Ads
- Verify Conversion Linker tag (required for conversion tracking)
- Check Conversion Tracking tags fire on conversion pages
- Verify Remarketing tag for audience building

### Facebook Pixel / Third-Party Tags
- Check Custom HTML tags for pixel code
- Verify triggers match Facebook events (PageView, Purchase, etc.)
- Use browser Network tab to confirm pixel fires (fb.com/tr requests)

## Reference Documentation

**Knowledge Base**:
`C:\Users\alexa\.craft-agent\workspaces\my-workspace\sessions\260222-amber-coyote\data\google-tag-manager-knowledge-base.md`

**Official Google Resources**:
- [GTM Developer Guide](https://developers.google.com/tag-platform/tag-manager/api/v2/devguide)
- [GTM Web Implementation](https://developers.google.com/tag-platform/tag-manager/web)
- [GTM Help Center](https://support.google.com/tagmanager)

**Related Skills**:
- `/google-ads-analysis` - Analyze Google Ads campaigns (uses GTM conversion tracking)
- `/google-analytics` - GA4 analysis (uses GTM for event implementation)

---

**Next Steps After Audit**:
1. Present findings to client with prioritized action items
2. Provide implementation code for developers
3. Schedule follow-up audit after fixes implemented
4. Consider MCP source for GTM API (automated monitoring)
