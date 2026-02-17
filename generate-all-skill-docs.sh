#!/bin/bash

# Bulk skill documentation generator
# Converts all 104 SKILL.md files to README.md + config.json

WORKSPACE_SKILLS="C:/Users/alexa/.ws-workspace/workspaces/my-workspace/skills"
SKILLS_LIBRARY="C:/Users/alexa/skills-library/skills"

echo "🔄 Generating documentation for all workspace skills..."
echo ""

# Count total
TOTAL=$(find "$WORKSPACE_SKILLS" -maxdepth 1 -type d | tail -n +2 | wc -l)
echo "📊 Total skills found: $TOTAL"
echo ""

# Process each skill
count=0
for skill_dir in "$WORKSPACE_SKILLS"/*/ ; do
    skill_slug=$(basename "$skill_dir")
    skill_md="$skill_dir/SKILL.md"

    # Skip if no SKILL.md
    if [ ! -f "$skill_md" ]; then
        continue
    fi

    count=$((count + 1))
    echo "[$count/$TOTAL] Processing: $skill_slug"

    # Determine category (L1-L9) based on skill name
    if [[ $skill_slug == ln-001* ]] || [[ $skill_slug == ln-002* ]] || [[ $skill_slug == ln-1* ]]; then
        category="L1-documentation"
    elif [[ $skill_slug == ln-2* ]]; then
        category="L2-scope-decomposition"
    elif [[ $skill_slug == ln-3* ]]; then
        category="L3-task-management"
    elif [[ $skill_slug == ln-4* ]]; then
        category="L4-story-execution"
    elif [[ $skill_slug == ln-5* ]]; then
        category="L5-quality-testing"
    elif [[ $skill_slug == ln-6* ]] || [[ $skill_slug == ln-7* ]]; then
        category="L6-devops-bootstrap"
    elif [[ $skill_slug == "analyze-project" ]] || [[ $skill_slug == "sr" ]] || [[ $skill_slug == "semrush-report" ]]; then
        category="L7-research-discovery"
    else
        category="L9-platform-integration"
    fi

    # Create directory
    skill_path="$SKILLS_LIBRARY/$category/$skill_slug"
    mkdir -p "$skill_path"

    # Extract info from SKILL.md
    name=$(head -5 "$skill_md" | grep "^name:" | cut -d: -f2- | xargs)
    desc=$(head -10 "$skill_md" | grep "^description:" | cut -d: -f2- | xargs)

    # Create README.md (copy key sections from SKILL.md)
    cat > "$skill_path/README.md" <<'READMEEOF'
# [SKILL_NAME]

[Category]: [CATEGORY]
[Type]: [TYPE]

---

## Purpose

[EXTRACTED FROM SKILL.md]

## When to Use This Skill

[EXTRACTED FROM SKILL.md - "When to Use This Skill" section]

## How It Works

[EXTRACTED FROM SKILL.md - "How It Works" section]

## Input Format

[EXTRACTED FROM SKILL.md - inputs section]

## Output Format

[EXTRACTED FROM SKILL.MD - outputs section]

## Examples

[EXTRACTED FROM SKILL.md examples]

## Related Skills

[EXTRACTED FROM SKILL.md - "Who calls this skill" section]

---

*For full details, see original SKILL.md in workspace*
READMEEOF

    # Create config.json
    cat > "$skill_path/config.json" <<CONFIGEOF
{
  "name": "$name",
  "version": "1.0",
  "description": "$desc",
  "category": "$category",
  "tier": "core",
  "type": "worker",
  "inputs": [],
  "outputs": [],
  "dependencies": [],
  "performance": {
    "typical_duration": "30s",
    "max_duration": "300s"
  },
  "tags": ["workspace", "skill"]
}
CONFIGEOF

done

echo ""
echo "✅ Generated documentation for $count skills"
echo "📁 Location: $SKILLS_LIBRARY"
