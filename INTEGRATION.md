# 🔗 Skills Library ↔ Memory System Integration

**How skills-library connects with W&S Agency Memory System**

---

## Architecture

```
W-S-Agency/skills-library (GitHub)
         ↓ (pull every 3 days)
~/skills-library/ (local repo)
         ↓ (via sync-3-days.sh)
W-S-Agency/agency-memory (GitHub)
         ↓ (pull every 3 days)
~/agency-memory/ (local memory)
         ↓ (integrated)
~/.craft-agent/global-memory.json (MCP Server)
         ↓
Craft Agent uses skills + insights
```

---

## Synchronization Flow

### 3-Day Cycle (09:00 UTC)

1. **09:00 UTC** - sync-3-days.sh runs
   - Pull latest from W-S-Agency/skills-library
   - Generate memory-exports/skills-library-YYYY-MM-DD.md
   - Update SKILLS-INDEX snapshot
   - Update sync-log.md

2. **09:00 UTC** - Memory system pulls skills updates
   - Syncs skills-library changes into ~/agency-memory/
   - Updates cross-references
   - Rebuilds SKILLS-MATRIX for team

3. **10:00 AM GMT+1** - Team gets summary
   - New skills added
   - Updated documentation
   - Integration insights

4. **Throughout day** - Craft Agent uses
   - References skills in solutions
   - Links to SKILLS-MATRIX for skill selection
   - Captures insights for memory system

---

## Cross-References

### In agency-memory/

Each skill insight in agency-memory links back to skills-library:

```markdown
# Insight: Redis Caching Pattern

Related Skills:
- [ln-650-performance-auditor](../../skills-library/skills/L5-quality-testing/ln-650-persistence-performance-auditor/)
- [ln-651-query-efficiency-auditor](../../skills-library/skills/L5-quality-testing/ln-651-query-efficiency-auditor/)

Use these skills to implement pattern.
```

### In skills-library/

Each skill references related insights in agency-memory:

```json
{
  "related_insights": [
    {
      "title": "Redis Caching Strategy",
      "path": "memory-exports/insights/redis-caching-pattern.md",
      "repo": "agency-memory"
    }
  ]
}
```

---

## Data Flow Examples

### Example 1: New Skill Added → Insight Created

```
Scenario: New skill ln-999-custom-analyzer is added

1. Skill added to W-S-Agency/skills-library
   └─ 3-day sync pulls it
2. sync-3-days.sh exports: skills-library-YYYY-MM-DD.md
3. Memory system detects new skill
4. Craft Agent can now:
   - Reference ln-999 in solutions
   - Create insight linking skill to problems it solves
   - Update SKILLS-MATRIX with new skill
```

### Example 2: Insight Used → Skill Improvement

```
Scenario: Team discovers improvement to ln-401-task-executor

1. Improvement captured in memory-exports/insights/
2. 3-day sync includes insight in agency-memory
3. Craft Agent notices improvement during next skill use
4. Updates ln-401 documentation with:
   - Link to insight
   - Improved examples
   - Related patterns
5. Next 3-day sync pushes improvements back to GitHub
```

### Example 3: Problem Pattern → New Skill Idea

```
Scenario: Multiple projects have similar performance issue

1. Insights collected in agency-memory
2. Pattern recognized across projects
3. Craft Agent proposes new skill: ln-900-performance-debugger
4. Documentation created following CONTRIBUTING.md
5. PR submitted to skills-library
6. After merge, 3-day sync makes available to team
```

---

## Integration Points

### SKILLS-MATRIX.md

- Updated automatically during sync
- Reflects current skill catalog
- Links to latest skill documentation
- Used by team for skill selection

### SKILLS-INDEX.md

- Source of truth for skill catalog
- Exported to memory system
- Available in memory-exports/
- Used for cross-referencing

### sync-log.md

- Tracks all synchronizations
- Both repos maintain their own sync-log
- Timestamp shows when data last synced
- Helps debug sync issues

### playbooks/

- skill-selection-guide.md → Used for recommendations
- skill-chaining.md → Documents complex workflows
- skill-integration-workflow.md → How to integrate new skills

---

## Team Collaboration

### Contributor Workflow

```
Colleague discovers issue
    ↓
Creates insight in agency-memory PR
    ↓
Links to related skill (if exists)
    ↓
Insight approved + merged
    ↓
Next 3-day sync exposes insight
    ↓
If new pattern, suggest new skill
    ↓
Skill documentation created
    ↓
PR to skills-library
    ↓
Merged + synced back to memory
```

### Curator Review

```
Colleague proposes new skill
    ↓
Curator reviews:
  ✓ Well-documented?
  ✓ Real use case?
  ✓ Related insights?
  ✓ Related skills?
    ↓
Approved → Merged
    ↓
3-day sync → Available to all
```

---

## Technical Integration

### Environment Setup

```bash
# Both repos should exist
ls -la ~/skills-library/     # Skills documentation
ls -la ~/agency-memory/      # Agency memory & insights

# Both synced daily
cat ~/skills-library/sync-log.md     # 3-day sync
cat ~/agency-memory/sync-log.md      # Daily sync
```

### Memory Server Connection

```json
{
  "memory_paths": {
    "skills": "~/.craft-agent/skills-index-latest.md",
    "insights": "~/.craft-agent/insights/",
    "playbooks": "~/.craft-agent/playbooks/"
  },
  "sync_schedule": {
    "skills": "3-day",
    "insights": "daily",
    "combined": "daily"
  }
}
```

### Automated Updates

During each 3-day sync:
1. ✅ Pull latest skills from GitHub
2. ✅ Export skills snapshot to memory
3. ✅ Update cross-references
4. ✅ Rebuild decision matrices
5. ✅ Notify memory system

---

## Monitoring Integration

### Check Sync Status

```bash
# Last skills sync
git -C ~/skills-library log --oneline -1

# Last memory sync
git -C ~/agency-memory log --oneline -1

# Verify integration
grep -r "skills-library" ~/agency-memory/
```

### Integration Health

```markdown
✅ Skills Library current
   └─ Latest sync: YYYY-MM-DD HH:MM UTC

✅ Memory System current
   └─ Latest sync: YYYY-MM-DD HH:MM UTC

✅ Cross-references valid
   └─ 131 skills linked
   └─ 45 insights reference skills
   └─ 12 playbooks updated

Status: HEALTHY
```

---

## Troubleshooting Integration

| Issue | Cause | Solution |
|-------|-------|----------|
| Skill not found in memory | Sync hasn't run yet | Check sync-log.md timestamps |
| Old skill docs | Stale cache | Run manual sync: `bash sync-3-days.sh` |
| Broken cross-references | Path changed | Update symlinks and re-run sync |
| Memory not updated | Sync failed | Check sync-log.md for errors |
| Team can't find skill | Not in SKILLS-MATRIX | Rebuild matrix: Update SKILLS-INDEX |

---

## Best Practices

✅ **Do:**
- Link insights to related skills
- Update SKILLS-MATRIX when adding skills
- Document new patterns as insights
- Reference memory system in solutions
- Follow sync schedule (3-day cycle)
- Test cross-references quarterly

❌ **Don't:**
- Manually edit SKILLS-INDEX (auto-generated)
- Break links between repos
- Ignore sync errors
- Create duplicate skills
- Skip documentation updates

---

## Future Enhancements

- [ ] Semantic search across both repos
- [ ] Automated insight suggestions based on skill usage
- [ ] Slack notifications for new skills
- [ ] Knowledge graph visualization
- [ ] Skills usage analytics
- [ ] Team skill adoption metrics

---

**Integration Status:** ✅ ACTIVE
**Last Updated:** 2026-02-06
**Sync Cycle:** Every 3 days at 09:00 UTC
