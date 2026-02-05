# 🎯 Skills Matrix - When to Use Which Skill

**Decision guide for selecting the right skill for your task**

---

## 📋 Table of Contents

1. [Project Start](#-project-start)
2. [Documentation](#-documentation)
3. [Planning & Decomposition](#-planning--decomposition)
4. [Implementation](#-implementation)
5. [Quality & Testing](#-quality--testing)
6. [Deployment & Infrastructure](#-deployment--infrastructure)
7. [Marketing & Growth](#-marketing--growth)
8. [Analysis & Research](#-analysis--research)
9. [Integration & Tools](#-integration--tools)

---

## 🚀 Project Start

**"I need to start a new project"**

| Task | Skill | Why |
|------|-------|-----|
| Complete project bootstrap from scratch | **ln-700** | Orchestrator for full setup (deps, structure, DevOps, quality, security) |
| Research project type standards | **ln-001** | Understand best practices for your tech stack |
| Generate complete documentation | **ln-100** | Full documentation pipeline (root + core + specialized docs) |

**Workflow:** ln-001 → ln-700 → ln-100

---

## 📚 Documentation

**"I need to create/update documentation"**

| Task | Skill | Why |
|------|-------|------|
| Create all project docs from scratch | **ln-100** | Orchestrator for complete documentation pipeline |
| Create root docs (CLAUDE.md, README, standards) | **ln-111** | Root documentation creator |
| Create core docs (requirements, architecture, tech stack) | **ln-112** | Core project documentation |
| Create backend docs (API specs, database schema) | **ln-113** | Backend-specific documentation |
| Create frontend docs (design guidelines) | **ln-114** | Frontend design documentation |
| Create DevOps docs (runbooks) | **ln-115** | Infrastructure documentation |
| Create reference docs (ADRs, guides, manuals) | **ln-120** | Smart reference documentation |
| Create task management docs | **ln-130** | Task & kanban documentation |
| Create testing docs & strategy | **ln-140** | Testing documentation & strategy |
| Create interactive presentation | **ln-150** | 6-tab HTML presentation for stakeholders |
| Audit documentation quality | **ln-600** | Check 8 doc quality categories |
| Audit content alignment with scope | **ln-601** | Verify docs match actual scope |
| Audit code comments quality | **ln-610** | Check docstring & comment quality |

**Quick Pick:**
- Starting new: ln-100
- Single doc type: ln-111 through ln-120
- Checking quality: ln-600 through ln-610

---

## 📊 Planning & Decomposition

**"I need to break down scope/requirements"**

| Task | Skill | Why |
|------|-------|-----|
| Full scope decomposition (scope → epics → stories) | **ln-200** | Orchestrator for complete decomposition |
| Discover opportunities from traffic channels | **ln-201** | Find high-impact opportunities by demand |
| Create/replan epics from scope | **ln-210** | Break scope into 3-7 epics |
| Create/replan stories from epic | **ln-220** | Break epic into 5-10 stories with estimates |
| Create stories from ideal plan | **ln-221** | Worker for story creation |
| Replan stories when requirements change | **ln-222** | Worker for story updates |
| Prioritize stories with RICE framework | **ln-230** | Market-researched prioritization per story |

**Quick Pick:**
- Full decomposition: ln-200
- Just epics: ln-210
- Just stories: ln-220
- Need prioritization: ln-230

---

## 💻 Implementation

**"I need to implement a feature/story"**

| Task | Skill | Why |
|------|-------|-----|
| Create implementation tasks from story | **ln-300** | Orchestrator for task creation & planning |
| Create new implementation tasks | **ln-301** | Generate tasks (1-6 per story) |
| Update existing tasks | **ln-302** | Replan tasks when approach changes |
| Validate story & task readiness | **ln-310** | GO/NO-GO verdict + readiness score |
| Execute story tasks (code → review → rework) | **ln-400** | Orchestrator for story execution |
| Execute implementation task | **ln-401** | Code task from Todo → To Review |
| Review implemented code | **ln-402** | Quality check for code |
| Rework task based on review feedback | **ln-403** | Fix task issues from review |
| Run finalization tests | **ln-404** | Test execution & sign-off |

**Workflow for Story:** ln-300 → ln-400 (ln-401 → ln-402 → ln-403) → ln-404

---

## ✅ Quality & Testing

**"I need to ensure quality"**

| Task | Skill | Why |
|---|-------|-----|
| Full story quality gate (4-level verdict) | **ln-500** | PASS/CONCERNS/FAIL/WAIVED with quality score |
| Check code quality (DRY/KISS/YAGNI) | **ln-501** | Quantitative code quality metrics |
| Check for regressions | **ln-502** | Run existing tests to catch breaks |
| Plan full test strategy | **ln-510** | Research → manual → auto tests |
| Research real-world test scenarios | **ln-511** | Customer problems & competitor solutions |
| Execute manual tests | **ln-512** | Bash scripts for manual QA |
| Plan automated tests | **ln-513** | Risk-based testing (E2E/Integration/Unit) |
| **Full Code Audit:** | **ln-620** | 9 audit types (see below) |
| Audit security (secrets, injection, XSS) | **ln-621** | Security vulnerabilities scan |
| Audit build health | **ln-622** | Compiler/linter/deprecation errors |
| Audit code principles (DRY, KISS, YAGNI, TODOs) | **ln-623** | Code standard violations |
| Audit code quality (complexity, nesting, method size) | **ln-624** | Cyclomatic complexity & metrics |
| Audit dependencies (outdated, unused, reinvented) | **ln-625** | Dependency hygiene |
| Audit dead code | **ln-626** | Unreachable code, unused imports |
| Audit observability (logging, health checks, metrics) | **ln-627** | Monitoring & debugging capabilities |
| Audit concurrency (race conditions, async issues) | **ln-628** | Thread safety & async correctness |
| Audit lifecycle (initialization, graceful shutdown) | **ln-629** | App startup & cleanup |
| **Full Test Audit:** | **ln-630** | 5 audit types (see below) |
| Audit test business logic focus | **ln-631** | Avoid testing framework behavior |
| Audit E2E critical path coverage | **ln-632** | Critical user journeys tested |
| Audit test risk-based value | **ln-633** | High-impact tests prioritized |
| Audit test coverage gaps | **ln-634** | Missing tests for critical code |
| Audit test isolation & anti-patterns | **ln-635** | Test independence & flakiness |
| **Full Documentation Audit:** | **ln-600** | 8 quality categories |
| Audit semantic content alignment | **ln-601** | Docs match actual scope |
| **Pattern & Architecture Audit:** | **ln-640** | 2 audit types |
| Audit pattern evolution vs best practices | **ln-640** | Architecture pattern quality |
| Audit layer boundaries | **ln-642** | Layer isolation violations |
| Audit API contracts | **ln-643** | Layer leakage in signatures |
| **Performance & Persistence Audit:** | **ln-650** | 3 audit types |
| Audit query efficiency | **ln-651** | N+1 problems, redundant fetches |
| Audit transaction correctness | **ln-652** | Missing commits, isolation issues |
| Audit runtime performance | **ln-653** | Blocking IO, unnecessary allocations |

**Quick Pick by Concern:**
- Overall quality: ln-500
- Code issues: ln-620 (9 audits) or ln-623 for code principles
- Test quality: ln-630 (5 audits) or ln-510 for planning
- Performance: ln-650 (3 audits)

---

## 🚀 Deployment & Infrastructure

**"I need to set up infrastructure/DevOps"**

| Task | Skill | Why |
|---|-------|-----|
| Full project bootstrap | **ln-700** | Complete setup (deps, structure, DevOps, quality, security) |
| Upgrade all dependencies | **ln-710** | Coordinate npm/NuGet/pip upgrades |
| Upgrade npm/yarn/pnpm packages | **ln-711** | JavaScript dependency upgrades |
| Upgrade NuGet (.NET) packages | **ln-712** | .NET dependency upgrades |
| Upgrade Python pip/poetry/pipenv | **ln-713** | Python dependency upgrades |
| Migrate structure to Clean Architecture | **ln-720** | Full structure refactoring |
| Restructure frontend (React) | **ln-721** | Component-based architecture |
| Generate backend structure (.NET) | **ln-722** | Clean Architecture backend |
| Migrate mock data to C# classes | **ln-723** | Data migration |
| Remove Replit artifacts | **ln-724** | Clean up exported projects |
| Set up Docker & CI/CD | **ln-730** | Full DevOps setup |
| Generate Docker configuration | **ln-731** | Dockerfile & docker-compose |
| Generate GitHub Actions CI | **ln-732** | CI pipeline |
| Configure environment variables | **ln-733** | Env setup & secrets |
| Set up linters & tests | **ln-740** | Quality & test infrastructure |
| Configure linters | **ln-741** | ESLint, Prettier, Ruff, .NET analyzers |
| Set up pre-commit hooks | **ln-742** | Husky, lint-staged, commitlint |
| Set up test infrastructure | **ln-743** | Vitest, xUnit, pytest |
| Generate project commands | **ln-750** | .claude/commands setup |
| Set up security scanning | **ln-760** | Secrets & dependency scanning |
| Scan for hardcoded secrets | **ln-761** | Secret detection |
| Set up logging & error handling | **ln-770** | Crosscutting concerns (6 items) |
| Configure logging | **ln-771** | Serilog/structlog setup |
| Set up error handling middleware | **ln-772** | Global exception handling |
| Configure CORS | **ln-773** | CORS policy setup |
| Set up health checks | **ln-774** | Kubernetes-ready health endpoints |
| Generate API documentation | **ln-775** | Swagger/OpenAPI setup |
| Final verification (build, test, containers) | **ln-780** | Complete verification |
| Verify build success | **ln-781** | Compilation check |
| Run all tests | **ln-782** | Test suite execution |
| Launch containers with health checks | **ln-783** | Container health verification |

**Workflow for New Project:** ln-700 (which calls ln-710 → ln-720 → ln-730 → ln-740 → ln-760 → ln-770 → ln-780)

---

## 📈 Marketing & Growth

**"I need to create marketing strategy/campaigns"**

| Task | Skill | Why |
|---|-------|-----|
| **Strategy (5 skills)** |
| Develop positioning & pricing strategy | **strategy-positioning-pricing** | Market positioning & price strategy |
| Develop launch strategy | **strategy-launch** | Launch planning & timeline |
| Select marketing channels | **strategy-channel** | Channel selection by audience |
| Develop growth strategy | **strategy-growth** | Growth goals & tactics |
| Research market & competitors | **strategy-market-research** | Competitive analysis & market research |
| **Content (5 skills)** |
| Write marketing content | **content-writer** | Blog posts, copy, email |
| Use content templates | **content-templates** | Template library for quick creation |
| Create email campaigns | **content-email** | Email marketing strategy & execution |
| Create landing pages | **content-landing-pages** | High-converting landing pages |
| Create video content | **content-video** | Video marketing & production |
| **Analytics (5 skills)** |
| Analyze traffic & optimization | **analytics-traffic** | Traffic sources & optimization |
| Track & optimize conversion | **analytics-conversion** | Conversion rate analysis |
| Analyze audience segments | **analytics-audience** | Audience analysis & segmentation |
| Create performance dashboard | **analytics-performance** | KPI dashboard creation |
| Calculate ROI | **analytics-roi** | ROI & revenue attribution |
| **Paid Ads (5 skills)** |
| Manage Google Ads campaigns | **ads-google** | PPC & search ads |
| Manage Facebook Ads | **ads-facebook** | Social ads on Facebook |
| Manage LinkedIn Ads | **ads-linkedin** | B2B advertising on LinkedIn |
| Manage display network | **ads-display** | Display banner advertising |
| Run retargeting campaigns | **ads-retargeting** | Retargeting to interested users |
| **Social & Engagement (5 skills)** |
| Develop social media strategy | **social-strategy** | Social channel strategy |
| Community management | **social-community** | Community engagement & moderation |
| Influencer outreach | **social-influencers** | Influencer partnerships |
| Optimize engagement | **social-engagement** | Engagement rate improvement |
| Define brand voice | **social-brand-voice** | Brand messaging & tone |

**Workflow for Campaign:** strategy → content → analytics or ads

---

## 🔍 Analysis & Research

**"I need to research/analyze something"**

| Task | Skill | Why |
|---|-------|-----|
| Quick SERP/SEO analysis | **sr** | Quick Semrush SERP snapshot |
| Full SEO analysis report | **semrush-report** | Comprehensive SEO analysis via Semrush |
| Analyze project structure & quality | **analyze-project** | Full project analysis & metrics |
| Research technical standards | **ln-001** | Standards & patterns research |
| Research best practices | **ln-002** | Best practices for your tech |

---

## 🔌 Integration & Tools

**"I need to integrate with external tools"**

| Task | Skill | Why |
|---|-------|-----|
| GitHub automation & workflows | **github-workflow** | GitHub Actions, webhooks, automation |
| Vercel deployment | **deploy-vercel** | Deploy to Vercel, manage environments |
| IDE keyboard shortcuts | **keybindings-help** | Customize IDE keybindings |

---

## 🎯 Decision Trees

### "I have a new feature to build"

```
Feature → ln-200 (decompose to epics/stories)
        → ln-300 (create tasks)
        → ln-400 (execute tasks)
        → ln-500 (quality gate)
        → ln-404 (test & finalize)
```

### "I found a code quality issue"

```
Issue type?
├─ Security          → ln-621
├─ Build/Compilation → ln-622
├─ Code principles   → ln-623
├─ Performance       → ln-624 or ln-650
├─ Dependencies      → ln-625
├─ Dead code         → ln-626
├─ Observability     → ln-627
├─ Concurrency       → ln-628
└─ Lifecycle         → ln-629
```

### "I need to improve documentation"

```
Doc type?
├─ Root docs (CLAUDE.md, README)        → ln-111
├─ Core project docs                     → ln-112
├─ Backend docs (API, DB)                → ln-113
├─ Frontend docs (design)                → ln-114
├─ DevOps docs (runbooks)                → ln-115
├─ Reference docs (ADRs, guides)         → ln-120
├─ Task docs                             → ln-130
├─ Test docs                             → ln-140
└─ Need interactive presentation         → ln-150
```

### "I'm starting a new project"

```
1. Research standards             → ln-001
2. Full bootstrap                 → ln-700
3. Generate documentation         → ln-100
4. Plan scope/epics/stories       → ln-200
5. Ready for first feature!
```

---

## 💡 Tips

1. **Orchestrators** (ln-100, ln-200, ln-300, ln-400, ln-500, ln-620, ln-700, etc.) often call multiple workers
2. **Workers** do specialized tasks (ln-401, ln-621, ln-711, etc.)
3. **Use decision trees** above to find right skill
4. **Chain skills** together (see playbooks/skill-chaining.md)
5. **Start with orchestrators** - they coordinate the details

---

**Last Updated:** 2026-02-06 00:30 GMT+1
