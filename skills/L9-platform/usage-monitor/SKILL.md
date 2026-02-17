---
name: Usage Monitor
description: Monitor Claude Max usage limits with visual progress indicators and warnings
alwaysAllow: ["Read", "Write", "Edit"]
---

# Usage Monitor Skill

Monitor your Claude Max usage with beautiful visual reports directly in the chat.

## Commands

- `/usage` - Show current usage report
- `/usage-update` - Update usage data (limit, current, tier)
- `/usage-reset` - Reset to default values
- `/usage-export` - Export usage history to CSV

## Data Storage

Usage data is stored locally in:
```
~/.ws-workspace/workspaces/my-workspace/skills/usage-monitor/usage-data.json
```

### Data Structure

```json
{
  "tier": "Professional",
  "limit": 1000,
  "current": 247,
  "periodStart": "2026-02-01",
  "periodEnd": "2026-02-28",
  "lastUpdated": "2026-02-06T00:31:00Z",
  "history": [
    {"date": "2026-02-05", "count": 12},
    {"date": "2026-02-04", "count": 15}
  ]
}
```

## Visual Report Format

When displaying usage, use this format:

```
╔═══════════════════════════════════════╗
║   📊 Claude Usage Monitor             ║
╠═══════════════════════════════════════╣
║ Tier: {tier}                          ║
║ Period: {start} - {end}               ║
╠═══════════════════════════════════════╣
║ {emoji} Messages: {current} / {limit} ({percent}%)  ║
║ [{progress_bar}] {status}             ║
║                                       ║
║ ⏰ Resets in: {days_remaining} days   ║
║ 📈 Daily average: {avg} messages      ║
║ 🎯 Projected usage: {projected} (~{proj_percent}%)  ║
╠═══════════════════════════════════════╣
║ {warning_message}                     ║
╚═══════════════════════════════════════╝
```

### Color Indicators

Use emoji indicators based on usage percentage:

- **🟢 0-50%**: "Low usage" - Green zone, safe
- **🟡 50-75%**: "Moderate usage" - Yellow zone, watch carefully
- **🟠 75-90%**: "High usage" - Orange zone, be cautious
- **🔴 90-100%**: "Critical usage" - Red zone, limit approaching

### Progress Bar

Create a 10-character progress bar using filled (▓) and empty (░) blocks:

- Example for 24%: `[▓▓░░░░░░░░]`
- Example for 57%: `[▓▓▓▓▓▓░░░░]`
- Example for 92%: `[▓▓▓▓▓▓▓▓▓░]`

### Warning Messages

Display warnings based on usage:

- **75-89%**: `⚠️  Warning: Approaching usage limit`
- **90-99%**: `🚨 Critical: Near usage limit - Consider reducing usage`
- **100%**: `🛑 Limit Reached: No more messages available this period`
- **<75%**: `✅ Usage is healthy`

## Calculations

### Daily Average
```
daily_average = current / days_elapsed_in_period
```

### Projected Usage
```
projected = (daily_average * total_days_in_period)
projected_percent = (projected / limit) * 100
```

### Days Remaining
```
days_remaining = days_until_period_end
```

## Command Handlers

### `/usage` Command

1. Read `usage-data.json`
2. Calculate current metrics (percent, daily average, projected)
3. Determine color indicator and warning level
4. Generate progress bar
5. Display formatted visual report

### `/usage-update` Command

**Usage:**
```
/usage-update limit=1000 current=247 tier="Professional"
```

**Parameters:**
- `limit` (number) - Maximum messages for period
- `current` (number) - Current messages used
- `tier` (string) - Claude Max tier name
- `periodStart` (date, optional) - Period start date (YYYY-MM-DD)
- `periodEnd` (date, optional) - Period end date (YYYY-MM-DD)

**Process:**
1. Parse command parameters
2. Update `usage-data.json` with new values
3. Update `lastUpdated` timestamp
4. Append current usage to history array
5. Automatically show updated report

### `/usage-reset` Command

Reset to default values:
```json
{
  "tier": "Free",
  "limit": 100,
  "current": 0,
  "periodStart": "{current_month_start}",
  "periodEnd": "{current_month_end}",
  "lastUpdated": "{current_timestamp}",
  "history": []
}
```

### `/usage-export` Command

Export history to CSV format:
```
Date,Count,Cumulative
2026-02-01,12,12
2026-02-02,15,27
2026-02-03,18,45
```

Save to: `C:\Users\alexa\.ws-workspace\workspaces\my-workspace\skills\usage-monitor\usage-history-export.csv`

## First Time Setup

If `usage-data.json` doesn't exist, create it with default values and prompt user:

```
🎉 Welcome to Usage Monitor!

I've created a default configuration. Please update your settings:

/usage-update limit=YOUR_LIMIT current=YOUR_CURRENT tier="YOUR_TIER"

Example for Professional plan:
/usage-update limit=1000 current=0 tier="Professional"
```

## Best Practices

1. **Update regularly** - Run `/usage-update` daily or after heavy usage
2. **Check before big tasks** - Run `/usage` before starting large projects
3. **Monitor trends** - Watch daily average and projected usage
4. **React to warnings** - Take action when warnings appear
5. **Keep history** - Don't delete history for trend analysis

## Error Handling

- If data file is corrupted, recreate with defaults
- If dates are invalid, use current month
- If numbers are invalid, default to 0
- Always validate JSON before writing

## Examples

### Example 1: Healthy Usage
```
/usage

╔═══════════════════════════════════════╗
║   📊 Claude Usage Monitor             ║
╠═══════════════════════════════════════╣
║ Tier: Professional                    ║
║ Period: Feb 1-28, 2026               ║
╠═══════════════════════════════════════╣
║ 🟢 Messages: 247 / 1,000 (24.7%)     ║
║ [▓▓░░░░░░░░] Low usage                ║
║                                       ║
║ ⏰ Resets in: 22 days                 ║
║ 📈 Daily average: 11.2 messages       ║
║ 🎯 Projected usage: 313 (~31%)        ║
╠═══════════════════════════════════════╣
║ ✅ Usage is healthy                   ║
╚═══════════════════════════════════════╝
```

### Example 2: Warning State
```
/usage

╔═══════════════════════════════════════╗
║   📊 Claude Usage Monitor             ║
╠═══════════════════════════════════════╣
║ Tier: Professional                    ║
║ Period: Feb 1-28, 2026               ║
╠═══════════════════════════════════════╣
║ 🟠 Messages: 847 / 1,000 (84.7%)     ║
║ [▓▓▓▓▓▓▓▓░░] High usage               ║
║                                       ║
║ ⏰ Resets in: 14 days                 ║
║ 📈 Daily average: 60.5 messages       ║
║ 🎯 Projected usage: 1,694 (~169%)     ║
╠═══════════════════════════════════════╣
║ ⚠️  Warning: Approaching usage limit  ║
╚═══════════════════════════════════════╝
```

### Example 3: Update Command
```
/usage-update limit=1000 current=450 tier="Professional"

✅ Usage data updated successfully!

╔═══════════════════════════════════════╗
║   📊 Claude Usage Monitor             ║
╠═══════════════════════════════════════╣
║ Tier: Professional                    ║
║ Period: Feb 1-28, 2026               ║
╠═══════════════════════════════════════╣
║ 🟡 Messages: 450 / 1,000 (45.0%)     ║
║ [▓▓▓▓░░░░░░] Moderate usage           ║
║                                       ║
║ ⏰ Resets in: 22 days                 ║
║ 📈 Daily average: 20.5 messages       ║
║ 🎯 Projected usage: 574 (~57%)        ║
╠═══════════════════════════════════════╣
║ ✅ Usage is healthy                   ║
╚═══════════════════════════════════════╝
```

## Notes

- All calculations are approximate and based on current usage patterns
- Projected usage assumes consistent daily usage rate
- History is stored for trend analysis (last 30 days)
- Data persists across sessions
- Manual updates required (no automatic API integration)

---

**Quick Start:**
1. Run `/usage` to see current status
2. Run `/usage-update` to set your actual limits
3. Check regularly to avoid surprises!
