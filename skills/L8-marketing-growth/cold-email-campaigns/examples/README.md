# Cold Email Campaigns - Examples

Quick start guide for testing cold email campaigns.

## Quick Test

### 1. Preview Campaign

```bash
cd C:\Users\alexa\.craft-agent\workspaces\my-workspace\skills\cold-email-campaigns

python scripts/campaign_builder.py \
    --template templates/b2b_saas_sequence.txt \
    --leads examples/sample_leads.csv \
    --mode preview
```

**Expected Output:**
```
✅ Loaded 4 leads
✅ Loaded 5 email templates in sequence

==================================================
CAMPAIGN PREVIEW
==================================================

📧 Lead: John Doe (john.doe@techstartup.io)
   Company: TechStartup GmbH

   Email #1:
   Subject: Quick question about TechStartup GmbH's [specific challenge]
   Body preview: Hi John,

I came across TechStartup GmbH while researching companies in the SaaS space.

Quick qu...
```

### 2. Generate Schedule (Warm-up Mode)

```bash
python scripts/campaign_builder.py \
    --template templates/b2b_saas_sequence.txt \
    --leads examples/sample_leads.csv \
    --mode schedule \
    --start-date 2026-02-17 \
    --warmup
```

**Expected Output:**
```
==================================================
CAMPAIGN SCHEDULE
==================================================

Start Date: 2026-02-17
Warm-up: Enabled
Total Leads: 4

Sending Schedule:
  Day 1: 10 emails (2026-02-17)
  Day 2: 15 emails (2026-02-18)
  Day 3: 25 emails (2026-02-19)
  Day 5: 50 emails (2026-02-21)
  Day 7: 100 emails (2026-02-23)
  Day 10: 200 emails (2026-02-26)

📊 Schedule saved to: campaign_schedule.json
```

## Email Sequence Templates

### B2B SaaS (`b2b_saas_sequence.txt`)
- 5-email sequence over 14 days
- Focus: Product demo, case studies, ROI
- Best for: Software/SaaS companies
- Expected results: 8% reply rate

### Agency Outreach (`agency_outreach.txt`)
- 3-email sequence over 7 days
- Focus: Portfolio showcase, quick wins, urgency
- Best for: Marketing/design agencies
- Expected results: 5% reply rate

### E-commerce Wholesale (`ecommerce_wholesale.txt`)
- 4-email sequence over 10 days
- Focus: Pricing, samples, limited stock
- Best for: B2B wholesale partnerships
- Expected results: 6% reply rate

## Leads CSV Format

**Required fields:**
- `email` - Recipient email address
- `first_name` - First name for personalization

**Recommended fields:**
- `company` - Company name
- `industry` - Industry/vertical
- `job_title` - Job title
- `location` - City/country

## Customizing Templates

Edit template files to match your offer:

1. **Replace placeholders:**
   - `[Your Product]` → Your actual product name
   - `[Competitor]` → Real competitor or customer name
   - `[Specific outcome]` → Actual result (e.g., "reduce costs by 30%")

2. **Add your CTA:**
   - Replace `[Calendly Link]` with your actual booking link
   - Update pricing ranges
   - Add your signature

3. **Test personalization:**
   ```bash
   python scripts/campaign_builder.py --template YOUR_TEMPLATE.txt --leads sample_leads.csv --mode preview
   ```

## Integration with ln-852-email-automation

To actually send emails, this skill integrates with `ln-852-email-automation`:

```python
# Pseudo-code (implementation TODO)
from ln_852_email_automation import send_email

for lead in leads:
    personalized_email = personalize_email(template, lead)
    send_email(
        to=lead['email'],
        subject=personalized_email['subject'],
        body=personalized_email['body']
    )
```

## Next Steps

1. **Customize templates** for your business
2. **Prepare real leads list** (min 50 leads for pilot)
3. **Test with small batch** (10-20 emails)
4. **Monitor results** (open rate, reply rate)
5. **Optimize and scale** based on performance

---

**Need help?** Check the main SKILL.md documentation.
