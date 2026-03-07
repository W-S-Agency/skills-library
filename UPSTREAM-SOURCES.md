# 🔄 Upstream Sources — External Skills Tracking

**Purpose:** Track skills sourced from external repositories to maintain up-to-date versions

**Owner:** AW (Alexander Wirt)
**Review Frequency:** Weekly (Every Monday at 09:00)
**Last Reviewed:** 2026-03-07

---

## 📋 External Sources Registry

| Source Repository | Skills Count | Categories | Status | Last Checked | Last Synced | License |
|-------------------|--------------|------------|--------|--------------|-------------|---------|
| [levnikolaevich/claude-code-skills](https://github.com/levnikolaevich/claude-code-skills) | **105** | L1-L6, L10 (ln-series) | ✅ Active | 2026-03-07 | Never (baseline) | MIT |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | **70-80** | L8-marketing | ✅ Active | 2026-03-07 | Never (baseline) | MIT |
| **Total External** | **175-185** | — | — | — | — | — |
| **Internal (WS Agency)** | **64-74** | L5, L7, L9, L11-L13 | — | — | — | Proprietary |

### 🔍 Last Full Audit

**Date:** 2026-03-07
**Method:** Deep content analysis + web search + manual verification
**Results:** 249 skills analyzed, **2 major external sources identified**
**External:** 175-185 skills (70-74%)
**Internal:** 64-74 skills (26-30%)
**Detailed Report:** [EXTERNAL-SOURCES-MAP.md](EXTERNAL-SOURCES-MAP.md)

---

## 🎯 Known Authoritative Sources

### Recommended External Repositories (for future additions)

| Source | URL | Focus | Trustworthiness | Review Status |
|--------|-----|-------|----------------|---------------|
| **Anthropic Prompt Library** | https://github.com/anthropics/anthropic-cookbook | Claude prompts, best practices | ⭐⭐⭐⭐⭐ Official | ✅ Vetted |
| **LangChain Skills** | https://github.com/langchain-ai/langchain | AI workflows, chains | ⭐⭐⭐⭐ Community | ⏳ To review |
| **Vercel AI SDK** | https://github.com/vercel/ai | AI integrations, Next.js | ⭐⭐⭐⭐⭐ Official | ⏳ To review |
| **OpenAI Cookbook** | https://github.com/openai/openai-cookbook | GPT best practices | ⭐⭐⭐⭐⭐ Official | ⏳ To review |

---

## 🔍 Identification Process

### How to Mark a Skill as "External"

When adding a skill from external source:

1. **Add YAML frontmatter to SKILL.md:**
   ```yaml
   ---
   name: Skill Name
   author: Original Author / Organization
   source: https://github.com/org/repo
   source_license: MIT / Apache 2.0 / etc.
   adapted: true/false
   last_upstream_sync: 2026-03-07
   ---
   ```

2. **Document in this file:**
   - Add row to "External Sources Registry" table
   - Include original URL, license, and sync date

3. **Add LICENSE file to skill folder:**
   ```
   skills/LX-category/skill-name/
   ├── SKILL.md
   ├── LICENSE (from upstream)
   └── UPSTREAM.md (link to original, changes made)
   ```

---

## 🔄 Synchronization Workflow

### Weekly Review Process (Every Monday 09:00)

**Step 1: Check for Updates**
```bash
# For each external skill:
cd /tmp
git clone <upstream-url> upstream-check
cd upstream-check
git log --since="7 days ago" --oneline

# If commits found → proceed to Step 2
```

**Step 2: Compare Changes**
```bash
# Compare our version with upstream
diff -r skills/LX-category/skill-name/ /tmp/upstream-check/path/to/skill/
```

**Step 3: Decision**
- **If no changes:** Update "Last Checked" date
- **If minor changes:** Update "Last Checked", add to review list
- **If major changes:** Create issue for review → manual merge

**Step 4: Update Registry**
```bash
# Update this file (UPSTREAM-SOURCES.md)
# Update "Last Checked" column
git commit -m "chore: monthly upstream check (2026-XX-XX)"
```

---

## 📖 Adding New External Skills

### Vetting Process

Before adding a skill from external source:

**1. Trust Assessment**
- [ ] Source is authoritative (official org, recognized expert)
- [ ] Active maintenance (commits in last 3 months)
- [ ] Clear license (MIT, Apache 2.0, or compatible)
- [ ] Good documentation
- [ ] No security issues

**2. Relevance Check**
- [ ] Aligns with W-S-Agency workflow
- [ ] Fills gap in our library
- [ ] Better than creating our own
- [ ] Can be maintained long-term

**3. Adaptation Decision**
- **Use as-is:** Keep original, sync regularly
- **Adapt:** Modify for our needs, credit original
- **Inspired-by:** Create our own, reference original

**4. Documentation**
```markdown
### Example: ln-XXX-skill-name

**Original:** https://github.com/org/repo/path/to/skill
**Author:** Original Author Name
**License:** MIT
**Adaptation:** Modified for W-S-Agency workflows (list changes)
**Rationale:** Why we added this skill vs. creating our own
```

---

## 🚨 Conflict Resolution

### When Upstream Changes Conflict with Our Modifications

**Priority Rules:**
1. **Security fixes:** Always merge immediately
2. **Bug fixes:** Merge if compatible with our changes
3. **Breaking changes:** Review carefully, may reject
4. **New features:** Evaluate case-by-case

**Process:**
1. Create branch: `update/skill-name-upstream-YYYY-MM-DD`
2. Merge upstream changes
3. Test compatibility
4. PR review → merge or reject with documentation

---

## 📊 Sync Schedule

| Frequency | Action | Trigger |
|-----------|--------|---------|
| **Weekly** | Check all upstream sources for updates | Every Monday, 09:00 CET |
| **Monthly** | Dependencies audit | 1st of month, 10:00 CET |
| **Quarterly** | Review trustworthiness of sources | 1st of Jan, Apr, Jul, Oct |
| **Ad-hoc** | Security advisories | GitHub notifications |
| **Yearly** | Evaluate: keep, deprecate, or replace | January |

---

## 🛠️ Tools & Automation

### GitHub Actions (Future)

```yaml
# .github/workflows/check-upstream.yml
name: Check Upstream Sources
on:
  schedule:
    - cron: '0 9 * * 1'  # Weekly, Monday at 9am UTC
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check upstream repos
        run: |
          # Script to check each upstream source (last 7 days)
          # Create issue if updates found
```

### Manual Check Script

```bash
#!/bin/bash
# scripts/check-upstream.sh

echo "Checking upstream sources..."
while IFS='|' read -r skill category url; do
  echo "Checking $skill from $url"
  # Clone, check commits, report
done < UPSTREAM-SOURCES.md
```

---

## 📝 Current Status

### Summary

- **Total Skills:** 249 (as of 2026-03-07)
- **External Skills:** 175-185 (70-74%) from 2 major repositories
- **Internal Skills:** 64-74 (26-30%) developed by WS Agency
- **Last Full Audit:** 2026-03-07
- **Last Upstream Check:** Never (baseline established)
- **Next Upstream Check:** 2026-03-10 (Monday)

### Audit Results

✅ **Full library audit completed** — deep content analysis of all 249 SKILL.md files:

**External Source #1: levnikolaevich/claude-code-skills**
- **Count:** 105 skills (42% of total)
- **Series:** ln-* (L1-L6, L10)
- **Coverage:** Full delivery workflow (docs → scope → tasks → execution → quality → devops)
- **Architecture:** L1 Orchestrators → L2 Coordinators → L3 Workers

**External Source #2: coreyhaines31/marketingskills**
- **Count:** 70-80 skills (28-32% of total)
- **Categories:** L8-marketing, L8-marketing-growth
- **Coverage:** CRO, SEO, copywriting, analytics, performance ads

**Internal (WS Agency):**
- **Count:** 64-74 skills (26-30% of total)
- **Categories:** L5 (quality), L7 (research), L9 (platform/PM), L11-L13 (dev-tools, memory, automation)
- **Notable:** kritik, site-audit, wartung, enterprise-search, firecrawl, openclaw-* series

### Next Actions

1. ✅ Create UPSTREAM-SOURCES.md (done)
2. ✅ Automated audit of all skills (done — 249 analyzed, 2 external sources identified)
3. ✅ Deep content analysis (done — GitHub URLs, source mentions)
4. ✅ Create EXTERNAL-SOURCES-MAP.md (done — detailed breakdown)
5. ✅ Set up weekly check workflow (Every Monday) - see RECURRING-TASKS.md
6. ✅ Document customizations system - see CUSTOMIZATIONS.md
7. ⏳ Add YAML frontmatter to external skills (source attribution)
8. ⏳ Create GitHub Action for automation (Phase 2)
9. ⏳ Set up automated reminders (Google Calendar / Notion)

---

## 🔗 References

- [Skills Library README](README.md)
- [CONTRIBUTING Guide](CONTRIBUTING.md)
- [License Compatibility Guide](https://choosealicense.com/appendix/)

---

**Questions?** Contact AW (Alexander Wirt)

**Last Updated:** 2026-03-07 by WS Workspace
