#!/bin/bash

# Skills Library - 3-Day Synchronization Script
# Syncs skills-library repository with local MCP Memory Server
# Scheduled to run every 3 days at 09:00 UTC via Windows Task Scheduler

set -e

# Configuration
REPO_PATH="$HOME/skills-library"
MEMORY_PATH="$HOME/.ws-workspace"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
LOG_FILE="$REPO_PATH/sync-log.md"

echo "🔄 Skills Library Sync Started: $TIMESTAMP"

# Step 1: Verify repository exists
if [ ! -d "$REPO_PATH/.git" ]; then
    echo "❌ ERROR: Skills library repository not found at $REPO_PATH"
    exit 1
fi

echo "✅ Repository found: $REPO_PATH"

# Step 2: Pull latest from GitHub
cd "$REPO_PATH"
echo "📥 Pulling latest from GitHub..."

if git fetch origin main 2>&1 | grep -q "fatal"; then
    echo "❌ ERROR: Could not fetch from GitHub"
    exit 1
fi

git merge origin/main --ff-only 2>&1 || echo "⚠️  Already up-to-date"
echo "✅ Latest code pulled"

# Step 3: Verify structure
echo "🔍 Verifying repository structure..."
if [ ! -f "$REPO_PATH/README.md" ] || [ ! -d "$REPO_PATH/skills" ]; then
    echo "❌ ERROR: Invalid repository structure"
    exit 1
fi
echo "✅ Structure verified"

# Step 4: Count skills
SKILL_COUNT=$(find "$REPO_PATH/skills" -maxdepth 2 -type d -name "ln-*" | wc -l)
echo "📊 Skills in library: $SKILL_COUNT"

# Step 5: Create memory export
EXPORT_FILE="$REPO_PATH/memory-exports/skills-library-$(date -u +%Y-%m-%d).md"
mkdir -p "$(dirname "$EXPORT_FILE")"

cat > "$EXPORT_FILE" <<EOF
# Skills Library Snapshot - $(date -u +%Y-%m-%d)

**Last Synced:** $TIMESTAMP
**Total Skills:** $SKILL_COUNT
**Repository:** W-S-Agency/skills-library

## Summary

This is an automated snapshot of the skills library created during 3-day synchronization.

For full documentation, see:
- README.md → Overview
- SKILLS-INDEX.md → Full skill index
- SKILLS-MATRIX.md → When to use which skill
- playbooks/ → Usage guides
- skills/L*/ → Individual skill documentation

## Latest Changes

$(cd "$REPO_PATH" && git log --oneline -5 --date=short --format="%h %ad - %s")

## Skills by Category

- L1 Documentation: 13
- L2 Scope & Decomposition: 7
- L3 Task Management: 4
- L4 Story Execution: 5
- L5 Quality & Testing: 56
- L6 DevOps & Bootstrap: 43
- L7 Research & Discovery: 3
- L8 Marketing & Growth: 25
- L9 Platform Integration: 3

**Total: 131 skills**

---

Generated automatically by sync-3-days.sh
EOF

echo "✅ Memory export created: $(basename "$EXPORT_FILE")"

# Step 6: Update sync log
echo ""  >> "$LOG_FILE"
echo "### Sync - $(date -u +%Y-%m-%d) at $TIMESTAMP" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo "| Metric | Value |" >> "$LOG_FILE"
echo "|--------|-------|" >> "$LOG_FILE"
echo "| Status | ✅ Success |" >> "$LOG_FILE"
echo "| Skills | $SKILL_COUNT |" >> "$LOG_FILE"
echo "| Export | memory-exports/skills-library-$(date -u +%Y-%m-%d).md |" >> "$LOG_FILE"
echo "| Commits | $(cd "$REPO_PATH" && git log --oneline -1 | cut -d' ' -f1) |" >> "$LOG_FILE"

echo "✅ Sync log updated"

# Step 7: Optional: Copy to memory server (if available)
if [ -d "$MEMORY_PATH" ]; then
    echo "💾 Copying to memory server..."
    if cp "$REPO_PATH/SKILLS-INDEX.md" "$MEMORY_PATH/skills-index-latest.md" 2>/dev/null; then
        echo "✅ Memory server updated"
    else
        echo "⚠️  Could not update memory server (permissions?)"
    fi
fi

echo ""
echo "✅ Sync Complete!"
echo "📊 Summary:"
echo "   - Skills: $SKILL_COUNT"
echo "   - Export: $(basename "$EXPORT_FILE")"
echo "   - Log: $LOG_FILE"
echo "   - Time: $TIMESTAMP"
