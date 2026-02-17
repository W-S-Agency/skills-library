# 🎯 Skills Library - W&S Agency

**Version:** 2.0
**Last Updated:** 2026-02-17
**Total Skills:** 209

---

## 📚 What is Skills Library?

Comprehensive catalog of **all 209 WS Workspace skills** organized by functional categories (L1-L13). Each skill includes:
- ✅ **Purpose**: What the skill does
- ✅ **When to use**: Real-world scenarios
- ✅ **Inputs/Outputs**: Data flow
- ✅ **Examples**: Practical usage
- ✅ **Related Skills**: Dependencies and chains
- ✅ **Implementation Details**: How it works

---

## 🗂️ Organization (L1-L13 Framework)

### Development Pipeline
| Level | Category | Count | Purpose |
|-------|----------|-------|---------|
| **L1** | Documentation | 13 | Auto-generate project documentation |
| **L2** | Scope & Decomposition | 7 | Break down requirements into stories |
| **L3** | Task Management | 4 | Create implementation tasks |
| **L4** | Story Execution | 5 | Execute tasks end-to-end |
| **L5** | Quality & Testing | 34 | Quality gates & audits |
| **L6** | DevOps & Bootstrap | 32 | Setup, CI/CD, security, infrastructure |
| **L7** | Research & Discovery | 5 | SEO & project analysis |
| **L8** | Marketing, Growth & Soft Skills | 76 | Marketing, content, analytics, soft skills |
| **L9** | Platform & Project Management | 8 | GitHub, Vercel, IDE, project management |
| **L10** | Document Automation | 10 | Document generation & templates |
| **L11** | Dev Tools | 8 | Developer tooling & utilities |
| **L12** | Memory & Knowledge | 4 | Knowledge management & memory |
| **L13** | Automation Agents | 3 | OpenClaw, usage monitoring |

---

## 📂 Repository Structure

```
skills-library/
├── README.md (this file)
├── SKILLS-INDEX.md → Full index of all 209 skills
├── SKILLS-MATRIX.md → Decision matrix (when to use which)
│
├── skills/
│   ├── L1-documentation/ (13 skills)
│   ├── L2-scope-decomposition/ (7 skills)
│   ├── L3-task-management/ (4 skills)
│   ├── L4-story-execution/ (5 skills)
│   ├── L5-quality-testing/ (34 skills)
│   ├── L6-devops-bootstrap/ (32 skills)
│   ├── L7-research/ (2 skills)
│   ├── L7-research-discovery/ (3 skills)
│   ├── L8-marketing/ (30 skills)
│   ├── L8-marketing-growth/ (34 skills)
│   ├── L8-soft-skills/ (12 skills)
│   ├── L8-website-strategy/
│   ├── L9-platform/ (5 skills)
│   ├── L9-project-management/ (3 skills)
│   ├── L10-document-automation/ (10 skills)
│   ├── L11-dev-tools/ (8 skills)
│   ├── L12-memory-knowledge/ (4 skills)
│   └── L13-automation-agents/ (3 skills)
│
├── playbooks/
│   ├── skill-selection-guide.md
│   ├── skill-chaining.md
│   └── skill-integration-workflow.md
│
├── .github/
│   ├── CODEOWNERS
│   ├── pull_request_template.md
│   └── workflows/
│       └── validate-skill-pr.yml
│
├── CONTRIBUTING.md
└── sync-log.md
```

---

## 🚀 Quick Start

### 1. Find the Right Skill
**→ Read [SKILLS-MATRIX.md](SKILLS-MATRIX.md)** for decision matrix (when to use which)

### 2. Understand How to Use It
**→ Go to `skills/L*/[skill-name]/`** for:
- SKILL.md (purpose, when to use, examples)
- README.md (quick start, if available)

### 3. Chain Multiple Skills
**→ Read [playbooks/skill-chaining.md](playbooks/skill-chaining.md)** to combine skills

### 4. Integrate with WS Workspace
**→ Read [playbooks/skill-integration-workflow.md](playbooks/skill-integration-workflow.md)**

---

## 📖 Documentation Standards

Each skill folder follows this structure:
```
skills/L*/[skill-name]/
├── SKILL.md (main skill definition)
│   ├─ Purpose (what it does)
│   ├─ When to Use (scenarios)
│   ├─ Input Format
│   ├─ Output Format
│   ├─ Examples (real-world usage)
│   ├─ Related Skills
│   └─ Limitations
├── README.md (quick start, if available)
├── references/ (additional docs, if any)
└── scripts/ (automation scripts, if any)
```

---

## 🎯 Skills by Category

### L1: Documentation (13 skills)
Research standards, create project docs, build presentations
- ln-001, ln-002, ln-100, ln-110 → ln-150

### L2: Scope & Decomposition (7 skills)
Break requirements into epics, stories, priorities
- ln-200, ln-201, ln-210, ln-220, ln-221, ln-222, ln-230

### L3: Task Management (4 skills)
Create implementation tasks from stories
- ln-300, ln-301, ln-302, ln-310

### L4: Story Execution (5 skills)
Execute tasks: code → review → rework → done
- ln-400, ln-401, ln-402, ln-403, ln-404

### L5: Quality & Testing (56 skills)
Quality gates, code audits, test planning & execution
- Quality Gates: ln-500, ln-501, ln-502
- Code Audits: ln-620 → ln-653 (34 skills)
- Test Audits: ln-630 → ln-635 (6 skills)
- Docs Audit: ln-600, ln-601
- Comments Audit: ln-610

### L6: DevOps & Bootstrap (43 skills)
Project setup, Docker, CI/CD, security, infrastructure
- Bootstrap: ln-700, ln-701
- Dependencies: ln-710 → ln-713
- Structure: ln-720 → ln-724
- DevOps: ln-730 → ln-733
- Quality Setup: ln-740 → ln-743
- Commands: ln-750, ln-751
- Security: ln-760, ln-761
- Crosscutting: ln-770 → ln-775
- Verification: ln-780 → ln-783

### L7: Research & Discovery (3 skills)
SEO analysis, standards research, project analysis
- sr, semrush-report, analyze-project

### L8: Marketing & Growth (25 skills)
Strategy, content, analytics, paid ads, social engagement
- **Strategy** (5): Positioning, pricing, launch, channel, growth
- **Content** (5): Writing, templates, email, landing pages, video
- **Analytics** (5): Traffic, conversion, audience, performance, ROI
- **Paid Ads** (5): Google, Facebook, LinkedIn, display, retargeting
- **Social** (5): Social strategy, community, influencers, engagement, brand voice

### L9: Platform Integration (3 skills)
GitHub automation, Vercel deployment, IDE config
- github-workflow, deploy-vercel, keybindings-help

---

## 🔄 Synchronization

**Frequency:** Every 3 days at 09:00 UTC

Skills library syncs with local MCP Memory Server:
- ✅ New skill documentation pulled from GitHub
- ✅ Updates added to local memory
- ✅ Cross-references with agency-memory repo maintained

Check [sync-log.md](sync-log.md) for sync history.

---

## 📋 Key Resources

| Resource | Purpose |
|----------|---------|
| [SKILLS-INDEX.md](SKILLS-INDEX.md) | Full index of all 209 skills |
| [SKILLS-MATRIX.md](SKILLS-MATRIX.md) | Decision matrix (when to use which) |
| [playbooks/skill-selection-guide.md](playbooks/skill-selection-guide.md) | How to pick right skill |
| [playbooks/skill-chaining.md](playbooks/skill-chaining.md) | How to combine skills |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guidelines for team (Phase 2) |

---

## 👥 Team & Curation

**Curator:** You (W&S Agency leadership)
- ✅ Approve new skill PRs
- ✅ Maintain skill quality standards
- ✅ Update playbooks based on real usage

**Skill Providers:**
- Phase 1: WS Workspace (auto-documents)
- Phase 2: Team members (via PR workflow)

---

## 🚀 Status

| Phase | Status | Timeline |
|-------|--------|----------|
| Phase 1: Create repo & structure | ✅ DONE | |
| Phase 2: Document 209 skills | ✅ DONE | |
| Phase 3: Synchronization & integration | ✅ DONE | |
| Phase 4: L8-L13 expansion | ✅ DONE | |

---

## 📞 Questions?

- **How do I find a skill?** → See SKILLS-MATRIX.md
- **How do I use a skill?** → Go to skills/L*/[skill-name]/README.md
- **How do I add a new skill?** → See CONTRIBUTING.md (Phase 2)
- **How does sync work?** → See sync-log.md
