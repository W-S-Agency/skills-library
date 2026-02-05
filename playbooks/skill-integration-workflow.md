# 🔧 Skill Integration Workflow

**How to integrate and use skills in Craft Agent**

---

## Quick Start (3 steps)

### Step 1: Find your skill
→ See SKILLS-MATRIX.md for decision matrix

### Step 2: Read the skill documentation
→ Go to `skills/L*/[skill-name]/README.md`

### Step 3: Use the skill in Craft Agent
→ Use the Skill tool with your parameters

---

## Using Skills in Craft Agent

### Via Craft Agent UI
```
In Craft Agent, click the skill name
→ Opens skill parameters dialog
→ Fill in inputs
→ Click Execute
```

### Via Code / API
```python
# Python example
skill = craft_agent.skill("ln-200-scope-decomposer")
result = skill.run({
    "scope": "Build payment system",
    "context": {...}
})
```

### Via Bash (if available)
```bash
craft-skill ln-200-scope-decomposer \
  --scope "Build payment system" \
  --context "file:///path/to/context"
```

---

## Skill Parameters

### Standard Input Format
All skills accept:
```json
{
  "context": "Current project context",
  "scope": "What you're working on",
  "parameters": {
    "key": "value"
  }
}
```

### Output Format
All skills return:
```json
{
  "status": "success|error|partial",
  "result": {
    "data": {...},
    "insights": [...],
    "recommendations": [...]
  },
  "metadata": {
    "execution_time": "2.5s",
    "skill_version": "1.0"
  }
}
```

---

## Workflow Examples

### Workflow 1: Complete Feature Development

```
User: "Build user authentication"
│
├─ Call ln-200 (Scope Decomposer)
│  Input: scope="User authentication"
│  Output: epics, stories, acceptance criteria
│
├─ Call ln-220 (Story Coordinator)
│  Input: epic="Authentication"
│  Output: 5-8 detailed stories
│
├─ Call ln-230 (Story Prioritizer)
│  Input: stories=[...]
│  Output: prioritized backlog
│
├─ Call ln-300 (Task Coordinator)
│  Input: story="Implement login"
│  Output: implementation tasks
│
├─ Call ln-400 (Story Executor)
│  Input: tasks=[...]
│  Output: implemented code
│
├─ Call ln-510 (Test Planner)
│  Input: story="Implement login"
│  Output: test plan
│
├─ Call ln-404 (Test Executor)
│  Input: test_plan=[...]
│  Output: test results
│
└─ Call ln-500 (Quality Gate)
   Input: code, tests, docs
   Output: PASS/FAIL verdict
```

### Workflow 2: Code Quality Review

```
User: "Review code quality"
│
├─ Call ln-620 (Codebase Auditor)
│  Input: codebase_path="./src"
│  Output: 9 audit reports (security, build, etc.)
│
├─ Call ln-630 (Test Auditor)
│  Input: tests_path="./tests"
│  Output: test quality report
│
├─ Call ln-640 (Pattern Evolution Auditor)
│  Input: codebase="./src"
│  Output: architecture audit
│
├─ Call ln-650 (Performance Auditor)
│  Input: codebase="./src"
│  Output: performance issues
│
└─ Call ln-500 (Quality Gate)
   Input: all audit reports
   Output: overall quality verdict
```

### Workflow 3: Project Bootstrap

```
User: "Set up new project"
│
└─ Call ln-700 (Bootstrap)
   Input: project_type="React + .NET", framework="Clean Arch"
   Output:
     ├─ Dependencies upgraded
     ├─ Structure generated
     ├─ Docker configured
     ├─ CI/CD configured
     ├─ Linters configured
     ├─ Security scans configured
     ├─ Logging configured
     └─ Verification passed

   (Internally calls ln-710 → ln-783 in sequence)
```

---

## Error Handling

### When a Skill Fails

```
Try Again Checklist:
1. ✅ Check inputs match expected format
2. ✅ Verify context is complete
3. ✅ Check skill version compatibility
4. ✅ Review error message details
5. ✅ Try with simpler input (less data)
6. ✅ Check for missing dependencies
7. ✅ Run skill again (transient error?)
```

### Skill Dependency Graph

```
ln-400 (Story Execution)
  requires: ln-300 (Task Coordinator)
  uses: ln-401, ln-402, ln-403, ln-404

ln-500 (Quality Gate)
  requires: ln-501, ln-502, ln-510
  uses: ln-620, ln-630, ln-640, ln-650

ln-700 (Bootstrap)
  requires: nothing
  uses: ln-710 → ln-783

ln-620 (Code Audit)
  requires: codebase
  uses: ln-621 → ln-629
```

---

## Integration Patterns

### Pattern 1: Sequential (One after Another)
```
Skill A → Skill B → Skill C
  ↓         ↓         ↓
Output A  Input=A   Input=B
         Output B  Output C
```

**Use when:** Output of A directly feeds into B

**Example:** ln-200 → ln-210 → ln-220

### Pattern 2: Parallel (Independent Skills)
```
Skill A ─┐
Skill B ─┤→ Combine results
Skill C ─┘
```

**Use when:** Skills are independent

**Example:** ln-620, ln-630, ln-640 (all run independently, results combined)

### Pattern 3: Conditional (Based on Results)
```
Skill A
  ├─ If result="problem"
  │  └─ Skill B (fix)
  │
  └─ If result="ok"
     └─ Continue
```

**Use when:** Next skill depends on A's result

**Example:** Audit → if issues found → run fix skills

### Pattern 4: Nested (Orchestrators)
```
Skill A (Orchestrator)
  ├─ Skill B (Worker)
  ├─ Skill C (Worker)
  └─ Skill D (Worker)
    Output: Coordinated results
```

**Use when:** Orchestrator manages workflow

**Example:** ln-700 (calls ln-710 → ln-783)

---

## Configuration & Customization

### Skill Configuration
Each skill has optional config file:
```
skills/L*/[skill-name]/config.json
```

Example:
```json
{
  "version": "1.0",
  "inputs": [
    {
      "name": "scope",
      "type": "string",
      "required": true,
      "example": "Build authentication"
    }
  ],
  "outputs": [...],
  "dependencies": [...],
  "performance": {
    "avg_duration": "30s",
    "max_duration": "2m"
  }
}
```

### Environment Variables
Some skills use env vars:
```bash
# Set before calling skill
export SKILL_LOG_LEVEL=debug
export SKILL_TIMEOUT=120
```

---

## Monitoring & Logging

### View Skill Execution Logs
```bash
# All skills log to ~/.craft-agent/logs/
tail -f ~/.craft-agent/logs/skill-execution.log
```

### Common Log Patterns
```
[INFO] ln-200 started with scope="..."
[DEBUG] ln-200 decomposing into epics...
[INFO] ln-200 generated 4 epics
[INFO] ln-200 completed successfully (2.3s)
```

---

## Performance Optimization

### Skill Performance Tips

1. **Reuse outputs** - don't re-run skills unnecessarily
2. **Cache results** - save successful skill outputs
3. **Batch operations** - chain skills for efficiency
4. **Use orchestrators** - they optimize execution order
5. **Profile long-running skills** - understand bottlenecks

### Performance by Skill Category

| Category | Typical Duration |
|----------|-----------------|
| L1 Documentation | 5-30s |
| L2 Decomposition | 10-40s |
| L3 Tasks | 5-20s |
| L4 Execution | 10-120s (depends on code) |
| L5 Quality | 30s-5m (depends on codebase size) |
| L6 DevOps | 1-10m (infrastructure setup) |
| L7 Research | 10-60s |
| L8 Marketing | 5-30s |
| L9 Platform | 5-20s |

---

## Best Practices

✅ **Do:**
- Read skill README before using
- Check inputs match expected format
- Use orchestrators for complex workflows
- Cache skill outputs when possible
- Check skill dependencies
- Monitor execution time
- Test with sample data first

❌ **Don't:**
- Use wrong inputs (read spec first)
- Skip required parameters
- Chain incompatible skills
- Ignore error messages
- Use outdated skill versions
- Run skills in wrong order manually

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Skill not found" | Check skill name in SKILLS-INDEX.md |
| "Invalid inputs" | Read skill README for exact format |
| "Timeout" | Skill taking too long - check logs |
| "Dependency missing" | Install/configure required skill first |
| "Empty output" | Skill completed but no results - check inputs |
| "Execution failed" | Check error message - see error handling |

---

## Support & Documentation

- **Find skill** → SKILLS-MATRIX.md
- **Understand skill** → skills/L*/[skill-name]/README.md
- **Chain skills** → playbooks/skill-chaining.md
- **Full catalog** → SKILLS-INDEX.md

---

**Ready to use skills? Pick one from SKILLS-MATRIX.md!**
