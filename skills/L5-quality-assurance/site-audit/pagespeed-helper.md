# PageSpeed Insights API Integration

## Quick Reference

### API Call (No API Key Needed for Basic Use)

```bash
# Get PageSpeed data for mobile
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo"

# Get PageSpeed data for desktop
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&strategy=desktop"
```

### Parse Core Web Vitals

```bash
#!/bin/bash
URL="$1"

# Fetch data
DATA=$(curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&strategy=mobile")

# Extract scores
PERFORMANCE=$(echo "$DATA" | jq -r '.lighthouseResult.categories.performance.score * 100')
ACCESSIBILITY=$(echo "$DATA" | jq -r '.lighthouseResult.categories.accessibility.score * 100')
BEST_PRACTICES=$(echo "$DATA" | jq -r '.lighthouseResult.categories["best-practices"].score * 100')
SEO=$(echo "$DATA" | jq -r '.lighthouseResult.categories.seo.score * 100')

# Extract Core Web Vitals
LCP=$(echo "$DATA" | jq -r '.lighthouseResult.audits["largest-contentful-paint"].displayValue')
CLS=$(echo "$DATA" | jq -r '.lighthouseResult.audits["cumulative-layout-shift"].displayValue')
INP=$(echo "$DATA" | jq -r '.lighthouseResult.audits["interaction-to-next-paint"].displayValue // "N/A"')

# Output
echo "PAGESPEED INSIGHTS (Mobile):"
echo "- Performance: ${PERFORMANCE}/100"
echo "- Accessibility: ${ACCESSIBILITY}/100"
echo "- Best Practices: ${BEST_PRACTICES}/100"
echo "- SEO: ${SEO}/100"
echo ""
echo "CORE WEB VITALS:"
echo "- LCP: ${LCP}"
echo "- INP: ${INP}"
echo "- CLS: ${CLS}"
```

### Top Opportunities

```bash
# Extract top 3 opportunities with savings
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${URL}&strategy=mobile" | \
  jq -r '.lighthouseResult.audits | to_entries[] | select(.value.details.type == "opportunity") |
  {
    title: .value.title,
    savings: .value.details.overallSavingsMs
  } |
  "\(.title): -\(.savings)ms"' | \
  head -3
```

## Integration into site-audit SKILL.md

Add to **MODULE 2: PERFORMANCE DEEP DIVE** → **2.1 PageSpeed Insights**

```markdown
**Actions through Bash:**

1. Run PageSpeed Insights API:
```bash
PAGESPEED_DATA=$(curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://[TARGET_URL]&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo")
```

2. Extract scores:
```bash
PERF_MOBILE=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.categories.performance.score * 100')
ACC_MOBILE=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.categories.accessibility.score * 100')
BP_MOBILE=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.categories["best-practices"].score * 100')
SEO_MOBILE=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.categories.seo.score * 100')
```

3. Extract Core Web Vitals:
```bash
LCP=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.audits["largest-contentful-paint"].numericValue')
CLS=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.audits["cumulative-layout-shift"].numericValue')
INP=$(echo "$PAGESPEED_DATA" | jq -r '.lighthouseResult.audits["interaction-to-next-paint"].numericValue // "N/A"')
```

4. Get top 3 opportunities:
```bash
TOP_OPPORTUNITIES=$(echo "$PAGESPEED_DATA" | jq -r '
  .lighthouseResult.audits |
  to_entries[] |
  select(.value.details.type == "opportunity") |
  {title: .value.title, savings: .value.details.overallSavingsMs} |
  "\(.title): -\(.savings)ms"
' | head -3)
```
```

## Usage Example

```bash
# Full PageSpeed check
./pagespeed-check.sh https://baumit-ag.de
```

**Output:**
```
PAGESPEED INSIGHTS (Mobile):
- Performance: 67/100
- Accessibility: 89/100
- Best Practices: 83/100
- SEO: 92/100

CORE WEB VITALS:
- LCP: 2.8s
- INP: 245ms
- CLS: 0.15

TOP OPPORTUNITIES:
1. Eliminate render-blocking resources: -1,230ms
2. Properly size images: -890ms
3. Enable text compression: -450ms
```

## API Limits

- **No API Key:** 25 queries/day (per IP)
- **With API Key:** 25,000 queries/day (free tier)

Get API key: https://console.cloud.google.com/apis/credentials

## References

- [PageSpeed Insights API Documentation](https://developers.google.com/speed/docs/insights/v5/get-started)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [Core Web Vitals Thresholds](https://web.dev/vitals/)
