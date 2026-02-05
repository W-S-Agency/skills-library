# 🎯 Skill Selection Guide

**How to pick the right skill for your task**

---

## The 3-Question Method

### Question 1: What's your high-level goal?

```
Project Start?              → Use ln-700 (bootstrap)
Documentation?             → Use ln-100 (docs pipeline)
Planning & Decomposition?  → Use ln-200 (scope → epics → stories)
Implementation?            → Use ln-300 or ln-400 (tasks/execution)
Quality & Testing?         → Use ln-500 (quality gate)
Marketing?                 → Use L8 skills (25 marketing skills)
Research?                  → Use L7 skills (sr, semrush, analyze)
Infrastructure/DevOps?     → Use L6 skills (ln-700 → ln-783)
```

### Question 2: Do you need an Orchestrator or Worker?

**Orchestrators** coordinate multiple workers:
- ln-100 (docs) - calls ln-110 → ln-150
- ln-200 (scope) - calls ln-210 → ln-230
- ln-400 (story execution) - calls ln-401 → ln-404
- ln-500 (quality gate) - calls ln-501, ln-502, ln-510
- ln-620 (code audit) - calls ln-621 → ln-629
- ln-700 (bootstrap) - calls ln-710 → ln-783

**Workers** do specialized tasks:
- ln-401 (implement task)
- ln-621 (security audit)
- ln-711 (npm upgrade)

**Rule of thumb:**
- Start with **Orchestrator** for complex workflows
- Use **Worker** for specific, isolated tasks

### Question 3: What specific sub-task do you have?

Once you've picked the orchestrator/worker category, narrow down:

**Example for Code Quality Issues:**
- Secrets hardcoded? → ln-621
- Build errors? → ln-622
- DRY/KISS violations? → ln-623
- Complexity too high? → ln-624
- Outdated deps? → ln-625
- Unused code? → ln-626
- No logging? → ln-627
- Race conditions? → ln-628
- Bad startup/shutdown? → ln-629

---

## Quick Reference Flowcharts

### For Feature Development
```
START: "I have a feature to build"
│
├─ Decompose?
│  └─ Yes → ln-200 (Scope Decomposer)
│
├─ Create tasks?
│  └─ Yes → ln-300 (Task Coordinator)
│
├─ Implement?
│  └─ Yes → ln-400 (Story Executor)
│           ├─ Code task        → ln-401
│           ├─ Review code      → ln-402
│           ├─ Rework feedback  → ln-403
│           └─ Run tests        → ln-404
│
└─ Quality gate?
   └─ Yes → ln-500 (Quality Gate)
```

### For Quality Issues
```
START: "I found a quality issue"
│
├─ Docs problem?          → ln-600 (Docs Auditor)
├─ Comments problem?      → ln-610 (Comments Auditor)
├─ Code problem?          → ln-620 (Code Auditor)
│                             ├─ Security   → ln-621
│                             ├─ Build      → ln-622
│                             ├─ Principles → ln-623
│                             ├─ Quality    → ln-624
│                             ├─ Dependencies → ln-625
│                             ├─ Dead code  → ln-626
│                             ├─ Observability → ln-627
│                             ├─ Concurrency → ln-628
│                             └─ Lifecycle  → ln-629
├─ Test problem?          → ln-630 (Test Auditor)
├─ Architecture problem?  → ln-640 (Pattern Auditor)
└─ Performance problem?   → ln-650 (Performance Auditor)
```

### For DevOps/Infrastructure
```
START: "I need to set up infrastructure"
│
├─ Full project?
│  └─ Yes → ln-700 (Bootstrap)
│          [calls all ln-710 → ln-783 automatically]
│
├─ Dependencies only?
│  └─ Yes → ln-710 (Dependency Upgrader)
│
├─ Docker/CI-CD only?
│  └─ Yes → ln-730 (DevOps Setup)
│
├─ Linters/Tests only?
│  └─ Yes → ln-740 (Quality Setup)
│
└─ Security only?
   └─ Yes → ln-760 (Security Setup)
```

---

## Skill Maturity Levels

### Level 1: Essential (8 skills)
Use these for most projects:
- ln-001 (standards research)
- ln-100 (documentation pipeline)
- ln-200 (scope decomposition)
- ln-300 (task creation)
- ln-400 (story execution)
- ln-500 (quality gate)
- ln-620 (code audit)
- ln-700 (bootstrap)

### Level 2: Important (20 skills)
Use for specific scenarios:
- ln-110 through ln-150 (doc types)
- ln-210 through ln-230 (epics/stories)
- ln-510 through ln-513 (test planning)
- ln-730 through ln-740 (DevOps setup)
- ln-770 through ln-775 (crosscutting)

### Level 3: Specialized (103 skills)
Use when you need specific work:
- ln-621 through ln-653 (specialized audits)
- ln-710 through ln-724 (migrations)
- L8 Marketing skills (25 skills)
- L7 Research skills (3 skills)
- L9 Platform skills (3 skills)

---

## Common Patterns

### Pattern 1: "Document Everything"
```
ln-100 → ln-111/112/113/114/115/120/130/140 → ln-150
(Orchestrator calls all doc workers, generates presentation)
```

### Pattern 2: "Build a Feature"
```
ln-200 → ln-210 → ln-220 → ln-230
→ ln-300 → ln-301
→ ln-400 → ln-401 → ln-402 → ln-403
→ ln-510 → ln-512/513
→ ln-500 (quality gate)
```

### Pattern 3: "Code Quality Pass"
```
ln-620 (calls all ln-621 → ln-629)
ln-630 (calls all ln-631 → ln-635)
ln-640 (calls ln-641 → ln-643)
ln-650 (calls ln-651 → ln-653)
→ ln-500 (quality gate summary)
```

### Pattern 4: "DevOps Setup"
```
ln-700 (calls all):
  → ln-710 (deps)
  → ln-720 (structure)
  → ln-730 (docker/ci)
  → ln-740 (linters)
  → ln-760 (security)
  → ln-770 (crosscutting)
  → ln-780 (verify)
```

---

## Anti-Patterns (Don't Do This)

❌ **Don't:**
- Use ln-621 (security audit) without understanding your code's security model
- Use ln-710 (dependency upgrades) if you don't test after
- Skip ln-500 (quality gate) and go straight to production
- Use ln-700 (bootstrap) for existing projects (use ln-720 for migration instead)
- Try to do ln-400 (execution) without ln-300 (tasks)

✅ **Do:**
- Use orchestrators for complex workflows
- Read related skills before using
- Check SKILLS-MATRIX.md for decision trees
- Follow playbooks for multi-step workflows
- Run quality gates before deployment

---

## Skill Dependencies

Some skills require others to work properly:

```
ln-400 (Story Execution)
  ├─ Requires: ln-300 (Task Creation)
  └─ Calls: ln-401, ln-402, ln-403, ln-404

ln-500 (Quality Gate)
  ├─ Requires: ln-501, ln-502, ln-510
  └─ Calls: ln-620, ln-630, ln-640, ln-650

ln-700 (Bootstrap)
  ├─ Requires: Nothing
  └─ Calls: ln-710 → ln-783

ln-620 (Code Audit)
  ├─ Requires: Codebase
  └─ Calls: ln-621 → ln-629
```

---

## Tips & Tricks

1. **Read the skill README first** before using it
   - Understand what it expects (inputs)
   - Know what it produces (outputs)

2. **Use orchestrators for workflows**
   - They handle coordination
   - They know the right order

3. **Review decision matrices first**
   - SKILLS-MATRIX.md has trees for common tasks
   - Search by use case

4. **Check examples in skill docs**
   - See real-world usage patterns
   - Learn best practices

5. **Chain skills when needed**
   - Use playbooks/skill-chaining.md
   - Orchestrators handle this automatically

---

**Still not sure? Check:**
- README.md for quick navigation
- SKILLS-MATRIX.md for decision trees
- SKILLS-INDEX.md for full skill list
- playbooks/skill-chaining.md for combining skills
