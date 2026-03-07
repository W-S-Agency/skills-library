# Skills Governance Scripts

Automation scripts for skills library governance and quality management.

## Overview

These scripts support the skills governance process defined in [SKILLS-GOVERNANCE.md](../SKILLS-GOVERNANCE.md).

## Scripts

### check-duplicates.js
**Status:** Coming in Q2 2026 (v0.3.0)
**Schedule:** Weekly (Every Monday at 09:00)

Detects duplicate and similar skills based on:
- Identical names
- Similar descriptions (semantic similarity)
- Identical functionality

**Usage:**
```bash
node scripts/check-duplicates.js
node scripts/check-duplicates.js --skill="new-skill-name"
```

---

### track-usage.js
**Status:** Coming in Q3 2026 (v0.5.0)
**Schedule:** Monthly (1st of month at 10:00)

Tracks skill usage across sessions:
- Analyzes sessions/ folder for skill invocations
- Tracks usage frequency and last usage date
- Generates usage reports
- Identifies unused skills (0 usage in last 3 months)

**Usage:**
```bash
node scripts/track-usage.js
node scripts/track-usage.js --period="Q1-2026"
node scripts/track-usage.js --period="last-3-months"
```

**Output:** `reports/usage-YYYY-MM-DD.json`

---

### validate-skill.js
**Status:** Coming in Q2 2026 (v0.3.0)
**Schedule:** On-demand (before adding new skill)

Validates skill quality and completeness:
- ✅ YAML frontmatter (name, description, author)
- ✅ Description length (>10 chars)
- ✅ Examples present
- ✅ Correct category (L1-L13)
- ✅ No TODOs/FIXMEs

**Usage:**
```bash
node scripts/validate-skill.js skills/LX-category/skill-name
node scripts/validate-all-skills.js
```

---

## Roadmap

| Script | Milestone | Deadline | Status |
|--------|-----------|----------|--------|
| check-duplicates.js | v0.3.0 | 2026-04-30 | Planned |
| validate-skill.js | v0.3.0 | 2026-04-30 | Planned |
| track-usage.js | v0.5.0 | 2026-07-31 | Planned |

See [ws-workspace-product/ROADMAP.md](../../ws-workspace-product/ROADMAP.md) for full roadmap.

---

## Integration

These scripts integrate with:
- **SKILLS-GOVERNANCE.md** - Governance process definition
- **UPSTREAM-SOURCES.md** - External sources tracking
- **CUSTOMIZATIONS.md** - Customizations tracking
- **ws-workspace-product** - Product development roadmap

---

**Maintained by:** AW (Alexander Wirt) + W&S Agency Team
**Last update:** 2026-03-07
