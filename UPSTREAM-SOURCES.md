# 🔄 Upstream Sources — External Skills Tracking

**Purpose:** Track skills sourced from external repositories to maintain up-to-date versions

**Owner:** AW (Alexander Wirt)
**Review Frequency:** Monthly (1st of each month)
**Last Reviewed:** 2026-03-07

---

## 📋 External Sources Registry

| Skill Name | Category | Original Source | Status | Last Checked | Last Synced | Notes |
|------------|----------|----------------|--------|--------------|-------------|-------|
| *(none yet)* | — | — | — | — | — | All current skills are internal |

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

### Monthly Review Process (1st of month)

**Step 1: Check for Updates**
```bash
# For each external skill:
cd /tmp
git clone <upstream-url> upstream-check
cd upstream-check
git log --since="30 days ago" --oneline

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
| **Monthly** | Check all upstream sources for updates | 1st of month, 09:00 UTC |
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
    - cron: '0 9 1 * *'  # Monthly, 1st at 9am UTC
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check upstream repos
        run: |
          # Script to check each upstream source
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

- **Total Skills:** 209+ (as of 2026-03-07)
- **External Skills:** 0
- **Internal Skills:** 209+
- **Pending Review:** 0
- **Last Upstream Check:** Never (no external skills yet)

### Next Actions

1. ✅ Create UPSTREAM-SOURCES.md (done)
2. ⏳ Review Anthropic Cookbook for potential skills
3. ⏳ Review LangChain for workflow patterns
4. ⏳ Set up monthly check reminder
5. ⏳ Create GitHub Action for automation (Phase 2)

---

## 🔗 References

- [Skills Library README](README.md)
- [CONTRIBUTING Guide](CONTRIBUTING.md)
- [License Compatibility Guide](https://choosealicense.com/appendix/)

---

**Questions?** Contact AW (Alexander Wirt)

**Last Updated:** 2026-03-07 by WS Workspace
