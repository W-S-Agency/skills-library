# 🤝 Contributing to Skills Library

**Guidelines for adding and updating skills (Phase 2 & beyond)**

---

## Overview

Skills Library is a collaborative knowledge base for W&S Agency. These guidelines ensure quality and consistency.

**Current Status:**
- **Phase 1:** Craft Agent documents all 131 skills
- **Phase 2+:** Team members can contribute via PR

---

## When is Phase 2?

Phase 2 starts when:
- ✅ All 131 skills are documented (Phase 2)
- ✅ Team has read playbooks & examples
- ✅ First colleagues are trained

**Until Phase 2, PRs are not accepted.**

---

## What Can You Contribute? (Phase 2+)

### ✅ YES - These are Welcome

1. **New Skill Documentation**
   - New tools/workflows discovered
   - Patterns that worked well
   - Best practices from experience

2. **Skill Updates**
   - Fixes to existing docs
   - New examples
   - Improved clarity
   - Updated dependencies

3. **Playbook Enhancements**
   - New skill chains discovered
   - Better workflows
   - Real-world examples

4. **Examples & Case Studies**
   - Real projects using skills
   - Lessons learned
   - Before/after results

### ❌ NO - Not Accepted

- ❌ Partial/incomplete skill docs
- ❌ Duplicates of existing skills
- ❌ Skills without real use case
- ❌ Hardcoded secrets or credentials
- ❌ Large binary files
- ❌ Breaking changes to existing skills

---

## How to Contribute (Phase 2+)

### Step 1: Check if skill already exists
```bash
grep -r "your-skill-name" skills/
# If found: suggest update not new skill
```

### Step 2: Create your branch
```bash
git checkout -b add/my-new-skill
# OR
git checkout -b update/existing-skill
```

### Step 3: Add/update skill documentation

#### For New Skill:
```
skills/L*/[skill-name]/
├── README.md (required)
│   ├─ Purpose
│   ├─ When to Use
│   ├─ Input Format
│   ├─ Output Format
│   ├─ Examples (2-3 real examples)
│   ├─ Related Skills
│   └─ Limitations
├── config.json (required)
│   ├─ name
│   ├─ version
│   ├─ inputs[]
│   ├─ outputs[]
│   └─ performance
└── implementation-notes.md (optional)
    ├─ Technical architecture
    ├─ Key algorithms
    └─ Performance considerations
```

#### For Updating Existing Skill:
- Update relevant sections
- Keep version number
- Document what changed

### Step 4: Test your documentation
```bash
# Ensure markdown is valid
mdl skills/L*/[skill-name]/*.md

# Check JSON is valid
jq . skills/L*/[skill-name]/config.json
```

### Step 5: Create Pull Request

**PR Title Format:**
```
add: [skill-name] - [brief description]
# OR
update: [skill-name] - [what changed]
```

**PR Description (use template below):**

```markdown
## What
[Brief description of skill/change]

## Why
[Why is this skill important/what problem does it solve?]

## Example Usage
[Quick example of how to use the skill]

## Related Skills
- [ln-xxx] (why related)
- [ln-yyy] (why related)

## Testing
- [ ] Tested with real project
- [ ] Examples work as documented
- [ ] Related skills still work
- [ ] No breaking changes

## Checklist
- [ ] README.md complete
- [ ] config.json valid
- [ ] No hardcoded secrets
- [ ] No large files (>10MB)
- [ ] Markdown is valid
- [ ] Examples are real-world
```

---

## Documentation Standards

### README.md Template

```markdown
# [ln-XXX]: [Skill Name]

## Purpose
[1-2 sentences: what does this skill do?]

## When to Use
[3-5 scenarios where you'd use this skill]

## Input Format
[JSON/required fields example]

## Output Format
[JSON/example output]

## Examples

### Example 1: [Real Scenario]
```
Input:
{...}

Output:
{...}
```

### Example 2: [Another Scenario]
[...]

## Related Skills
- **[ln-XXX]**: [Why related - depends/feeds into]
- **[ln-YYY]**: [Why related - alternative to]

## Limitations
- [Constraint 1]
- [Constraint 2]
- [When NOT to use this]

## Version History
- 1.0: Initial release
- 1.1: [What changed]
```

### config.json Template

```json
{
  "name": "ln-xxx-skill-name",
  "version": "1.0",
  "description": "Short description",
  "category": "L1",
  "inputs": [
    {
      "name": "parameter_name",
      "type": "string|object|array",
      "required": true,
      "description": "What is this?",
      "example": "example value"
    }
  ],
  "outputs": [
    {
      "name": "result_field",
      "type": "string|object|array",
      "description": "What is this output?"
    }
  ],
  "dependencies": ["ln-xxx", "ln-yyy"],
  "performance": {
    "typical_duration": "30s",
    "max_duration": "5m"
  },
  "tags": ["feature", "development", "automation"]
}
```

---

## Quality Standards

### Documentation Quality
- ✅ Clear purpose statement
- ✅ Real-world examples (not generic)
- ✅ Input/output formats specified
- ✅ Related skills documented
- ✅ Limitations clearly stated

### Code/Implementation Quality
- ✅ No secrets or credentials
- ✅ No large binary files
- ✅ Links to implementation working
- ✅ Dependencies documented

### Testing Requirements
- ✅ Tested with real project
- ✅ Examples actually work
- ✅ Related skills verified
- ✅ No breaking changes

---

## Review Process

### Curator Review (Your Team Lead)
1. **Correctness**: Does the skill do what it claims?
2. **Quality**: Are docs clear and complete?
3. **Completeness**: All required fields present?
4. **Fit**: Does it belong in this library?
5. **Non-Breaking**: No changes to existing skills?

### GitHub Actions Checks
- ✅ Markdown validation
- ✅ JSON schema validation
- ✅ No hardcoded secrets
- ✅ File size limits (<10MB)
- ✅ No large binaries

### Once Approved
- PR is merged
- Skill becomes available in next sync (3-day cycle)
- New skill appears in SKILLS-INDEX.md
- Available for all team members to use

---

## Workflow for New Skills

### Skill Lifecycle

```
Idea
  ↓
Documentation (you write)
  ↓
PR submitted (GitHub)
  ↓
Actions check (automated)
  ↓
Curator review (team lead)
  ↓
Approved & merged
  ↓
3-day sync (available to team)
  ↓
Used in projects
  ↓
Feedback & improvements
```

---

## Common Mistakes (Avoid These)

❌ **Don't:**
- Submit incomplete documentation
- Duplicate existing skills
- Add skills without real use case
- Commit secrets or credentials
- Make breaking changes to existing skills
- Submit enormous files
- Write unclear examples
- Skip the testing checklist

✅ **Do:**
- Read similar skills first (examples)
- Check if skill already exists
- Write from real experience
- Include 2-3 real examples
- Test before submitting
- Complete all checklist items
- Ask for feedback early

---

## Tips for Great Contributions

1. **Read existing skills first**
   - See `skills/L1-documentation/` for style
   - Follow same format & structure

2. **Use real examples**
   - Not hypothetical
   - From actual projects
   - Show before & after

3. **Be specific about when to use**
   - "I used this for..." > "Could be used for..."
   - Scenarios with details
   - What problem it solved

4. **Document limitations honestly**
   - "Works well when..."
   - "Not suitable for..."
   - Edge cases & constraints

5. **Link to related skills**
   - Creates knowledge graph
   - Helps users find alternatives
   - Shows workflow connections

6. **Ask for feedback early**
   - Create draft PR
   - Ask curator for input
   - Iterate before final submission

---

## Questions?

- **How do I submit?** → Create PR to main branch
- **When is Phase 2?** → Ask your team lead
- **Is my skill right?** → Check SKILLS-MATRIX.md for similar skills
- **Need help?** → Ask curator before submitting

---

## Code of Conduct

- ✅ Be respectful and helpful
- ✅ Assume good intentions
- ✅ Provide constructive feedback
- ✅ Share knowledge freely
- ✅ Celebrate others' contributions

---

**Remember:** This library grows with team contributions. Quality > Quantity. Great documentation helps everyone! 🚀
