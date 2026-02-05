# 🔗 Skill Chaining Guide

**How to combine multiple skills for complex workflows**

---

## What is Skill Chaining?

Skill chaining means using the **output of one skill as input to another** to accomplish complex multi-step goals.

---

## Core Patterns

### Pattern 1: Full Feature Development
```
ln-200 (Decompose scope)
  ↓ outputs: epics & stories
ln-210 (Create epics)
  ↓ outputs: 3-7 epics
ln-220 (Create stories)
  ↓ outputs: 5-10 stories per epic
ln-230 (Prioritize stories)
  ↓ outputs: prioritized backlog
ln-300 (Create tasks)
  ↓ outputs: implementation tasks
ln-400 (Execute story)
  ↓ outputs: implemented feature
ln-510 (Plan tests)
  ↓ outputs: test plan
ln-512 (Manual tests)
  ↓ outputs: test results
ln-500 (Quality gate)
  ↓ outputs: PASS/FAIL verdict
→ Ready for deployment
```

### Pattern 2: Full Project Bootstrap
```
ln-700 (Bootstrap Orchestrator)
  ├─ ln-710 (Upgrade dependencies)
  ├─ ln-720 (Structure migration)
  ├─ ln-730 (Docker & CI/CD)
  ├─ ln-740 (Linters & tests)
  ├─ ln-760 (Security setup)
  ├─ ln-770 (Crosscutting setup)
  └─ ln-780 (Final verification)
→ Production-ready project
```

### Pattern 3: Code Quality Review
```
ln-620 (Codebase Audit Orchestrator)
  ├─ ln-621 (Security audit)
  ├─ ln-622 (Build audit)
  ├─ ln-623 (Principles audit)
  ├─ ln-624 (Quality audit)
  ├─ ln-625 (Dependencies audit)
  ├─ ln-626 (Dead code audit)
  ├─ ln-627 (Observability audit)
  ├─ ln-628 (Concurrency audit)
  └─ ln-629 (Lifecycle audit)
+ ln-630 (Test Suite Audit)
+ ln-640 (Pattern Evolution Audit)
+ ln-650 (Performance & Persistence Audit)
→ Comprehensive quality report
```

### Pattern 4: Complete Documentation
```
ln-100 (Docs Pipeline Orchestrator)
  ├─ ln-110 (Detect project type)
  ├─ ln-111 (Root docs: CLAUDE.md, README)
  ├─ ln-112 (Core docs: requirements, architecture)
  ├─ ln-113 (Backend docs: API, database)
  ├─ ln-114 (Frontend docs: design)
  ├─ ln-115 (DevOps docs: runbooks)
  ├─ ln-120 (Reference docs: ADRs)
  ├─ ln-130 (Task docs: kanban)
  └─ ln-140 (Test docs: strategy)
+ ln-150 (Interactive presentation)
→ Complete documentation set
```

---

## Manual Chaining Examples

### Example 1: Marketing Campaign
```
strategy-market-research
  ↓ outputs: market insights
strategy-positioning-pricing
  ↓ outputs: positioning & pricing
strategy-launch
  ↓ outputs: launch plan
content-writer
  ↓ outputs: campaign content
ads-google or ads-facebook
  ↓ outputs: running ads
analytics-conversion
  ↓ outputs: conversion metrics
analytics-roi
  ↓ outputs: ROI report
```

### Example 2: Performance Optimization
```
ln-650 (Performance Audit)
  ├─ ln-651 (Query efficiency)
  ├─ ln-652 (Transaction correctness)
  └─ ln-653 (Runtime performance)
  ↓ outputs: optimization targets
ln-401 (Implement optimization tasks)
  ↓ outputs: optimized code
ln-402 (Code review)
  ↓ outputs: approved optimization
ln-404 (Test execution)
  ↓ outputs: verified performance gains
```

### Example 3: Project Migration to Clean Architecture
```
ln-720 (Structure Migrator)
  ├─ ln-721 (Frontend restructure: React)
  ├─ ln-722 (Backend generator: .NET)
  └─ ln-723 (Mock data migrator)
  ↓ outputs: new clean architecture
ln-700 (Bootstrap - verify new structure)
  ├─ ln-781 (Build verifier)
  ├─ ln-782 (Test runner)
  └─ ln-783 (Container launcher)
  ↓ outputs: working migrated project
```

---

## Orchestrator vs Manual Chaining

### When to Use Orchestrators (Auto-Chaining)
✅ **Use orchestrators when:**
- You want full pipeline automation
- Orchestrator knows the right order
- Workers depend on each other

**Examples:**
- ln-700 (handles ln-710 → ln-783)
- ln-100 (handles ln-110 → ln-150)
- ln-400 (handles ln-401 → ln-404)
- ln-500 (handles ln-501 → ln-513)
- ln-620 (handles ln-621 → ln-629)

### When to Do Manual Chaining
✅ **Manual chain when:**
- Orchestrator doesn't exist
- You want selective workflow
- Skills are independent

**Examples:**
- Marketing workflow (strategy → content → ads)
- Performance optimization (audit → fix → test)
- Project migration (migrate structure → bootstrap → verify)

---

## Advanced Chaining: Conditional Workflows

### Based on Audit Results
```
ln-620 (Code audit)
  ├─ If Security issues found
  │  └─ ln-760 (Security setup) + ln-621 (Security audit)
  │
  ├─ If Performance issues
  │  └─ ln-650 (Performance audit) + ln-401 (Fix)
  │
  ├─ If Test coverage low
  │  └─ ln-630 (Test audit) + ln-510 (Test planning)
  │
  └─ If All good
     └─ Deploy
```

### Based on Story Type
```
ln-220 (Create stories)
  ├─ If Feature story
  │  └─ ln-300 (Task creation) → ln-400 (Execute)
  │
  ├─ If Bug story
  │  └─ ln-511 (Test researcher) → ln-401 (Fix)
  │
  ├─ If Refactor story
  │  └─ ln-501 (Code quality) → ln-401 (Fix)
  │
  └─ If Documentation story
     └─ ln-100 (Docs pipeline)
```

---

## Skill Input/Output Matching

**When chaining, ensure outputs match inputs:**

```
Skill A outputs: stories with acceptance criteria
                ↓
                Must match
                ↓
Skill B inputs: stories with acceptance criteria ✅

Skill A outputs: optimization targets
                ↓
                Must match
                ↓
Skill B inputs: optimization tasks ✅

Skill A outputs: code quality issues
                ↓
                Should match
                ↓
Skill B inputs: code for fixing ✅
```

---

## Common Chains (Ready-Made)

| Use Case | Chain |
|----------|-------|
| Build feature | ln-200 → ln-300 → ln-400 → ln-500 |
| Setup project | ln-700 (auto-chains ln-710→783) |
| Audit code | ln-620 → ln-630 → ln-640 → ln-650 |
| Document project | ln-100 (auto-chains ln-110→150) |
| Optimize perf | ln-650 → ln-401 → ln-402 → ln-404 |
| Market campaign | strategy → content → ads → analytics |
| Migrate structure | ln-720 → ln-700 → ln-780 |

---

## Tips for Effective Chaining

1. **Read output formats** of first skill
2. **Match inputs** of next skill
3. **Use orchestrators** when available (they handle ordering)
4. **Test intermediate outputs** when manual chaining
5. **Document your chain** in CLAUDE.md for team reference
6. **Reuse successful chains** as templates

---

## Troubleshooting Chains

| Problem | Solution |
|---------|----------|
| Skill B doesn't recognize output from A | Check output format matches input spec |
| Skills run in wrong order | Use orchestrator instead of manual chain |
| Intermediate output is incomplete | Rerun Skill A with different parameters |
| One skill fails, blocks chain | Handle error, rerun from that point |

---

## Chain Performance

- **Auto-chains (orchestrators)**: Optimized, tested order
- **Manual chains**: Flexible, requires care with ordering
- **Conditional chains**: Smart routing based on results
- **Hybrid chains**: Orchestrators + manual for custom workflow

**Recommendation:** Start with orchestrators for simplicity, use manual chaining for custom workflows.

---

**See also:**
- playbooks/skill-integration-workflow.md
- SKILLS-MATRIX.md (decision trees)
- README.md (full skill catalog)
