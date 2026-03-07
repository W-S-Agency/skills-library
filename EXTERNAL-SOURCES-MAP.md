# External Sources Map

**Date:** 2026-03-07
**Total Skills:** 249
**External Sources Found:** 2 major repositories
**Internal/Custom Skills:** ~120-140 skills

---

## 📊 Summary

| Category | Total Skills | External Source | Count | % of Total |
|----------|-------------|-----------------|-------|-----------|
| **L1-L6 (ln-series)** | ~105 | [levnikolaevich/claude-code-skills](https://github.com/levnikolaevich/claude-code-skills) | 105 | 42% |
| **L8-marketing** | ~70-80 | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | 70-80 | 28-32% |
| **Internal/Custom** | ~64-74 | WS Agency (авторские) | 64-74 | 26-30% |

**Total External:** ~175-185 skills (70-74%)
**Total Internal:** ~64-74 skills (26-30%)

---

## 🎯 External Source #1: levnikolaevich/claude-code-skills

**Repository:** https://github.com/levnikolaevich/claude-code-skills
**Description:** Production-ready skills covering full delivery workflow
**Skills Count:** 105 skills (ln-series)

### Architecture

```
L1 Top Orchestrators → L2 Coordinators → L3 Workers
```

### Categories Covered

#### L1: Documentation (13 skills)
- **ln-001-standards-researcher** - Research standards via MCP Ref
- **ln-002-best-practices-researcher** - Best practices research
- **ln-100-documents-pipeline** - Complete doc system orchestrator
- **ln-110-project-docs-coordinator** - Project docs coordinator
- **ln-111-root-docs-creator** - Root documentation creator
- **ln-112-project-core-creator** - Core project docs
- **ln-113-backend-docs-creator** - Backend documentation
- **ln-114-frontend-docs-creator** - Frontend documentation
- **ln-115-devops-docs-creator** - DevOps documentation
- **ln-120-reference-docs-creator** - Reference docs
- **ln-130-tasks-docs-creator** - Tasks documentation
- **ln-140-test-docs-creator** - Test documentation
- **ln-150-presentation-creator** - HTML presentations

#### L2: Scope Decomposition (7 skills)
- **ln-200-scope-decomposer** - Scope decomposition orchestrator
- **ln-201-opportunity-discoverer** - Opportunity discovery
- **ln-210-epic-coordinator** - Epic coordination
- **ln-220-story-coordinator** - Story coordination
- **ln-221-story-creator** - Story creation
- **ln-222-story-replanner** - Story replanning
- **ln-230-story-prioritizer** - Story prioritization

#### L3: Task Management (4 skills)
- **ln-300-task-coordinator** - Task coordination
- **ln-301-task-creator** - Task creation
- **ln-302-task-replanner** - Task replanning
- **ln-310-story-validator** - Story validation

#### L4: Story Execution (4-5 skills)
- **ln-400-story-executor** - Story execution orchestrator
- **ln-401-task-executor** - Task execution
- **ln-402-task-reviewer** - Task review
- **ln-403-task-rework** - Task rework
- **ln-404-test-executor** - Test execution

#### L5: Quality & Testing (35 skills)
- **ln-500-story-quality-gate** - Quality gate orchestrator
- **ln-501-code-quality-checker** - Code quality
- **ln-502-regression-checker** - Regression testing
- **ln-510-test-planner** - Test planning
- **ln-511-test-researcher** - Test research
- **ln-512-manual-tester** - Manual testing
- **ln-513-auto-test-planner** - Automated test planning
- **ln-600-docs-auditor** - Documentation audit
- **ln-601-semantic-content-auditor** - Content audit
- **ln-610-code-comments-auditor** - Code comments
- **ln-620-codebase-auditor** - Codebase audit
- **ln-621-security-auditor** - Security audit
- **ln-622-build-auditor** - Build audit
- **ln-623-code-principles-auditor** - Code principles
- **ln-624-code-quality-auditor** - Code quality
- **ln-625-dependencies-auditor** - Dependencies audit
- **ln-626-dead-code-auditor** - Dead code detection
- **ln-627-observability-auditor** - Observability audit
- **ln-628-concurrency-auditor** - Concurrency audit
- **ln-629-lifecycle-auditor** - Lifecycle audit
- **ln-630-test-auditor** - Test audit
- **ln-631-test-business-logic-auditor** - Business logic tests
- **ln-632-test-e2e-priority-auditor** - E2E priority audit
- **ln-633-test-value-auditor** - Test value audit
- **ln-634-test-coverage-auditor** - Coverage audit
- **ln-635-test-isolation-auditor** - Test isolation
- **ln-640-pattern-evolution-auditor** - Pattern evolution
- **ln-641-pattern-analyzer** - Pattern analysis
- **ln-642-layer-boundary-auditor** - Layer boundaries
- **ln-643-api-contract-auditor** - API contracts
- **ln-650-persistence-performance-auditor** - DB performance
- **ln-651-query-efficiency-auditor** - Query efficiency
- **ln-652-transaction-correctness-auditor** - Transaction audit
- **ln-653-runtime-performance-auditor** - Runtime performance

#### L6: DevOps Bootstrap (32 skills)
- **ln-700-project-bootstrap** - Project bootstrap orchestrator
- **ln-710-dependency-upgrader** - Dependency management
- **ln-711-npm-upgrader** - npm upgrades
- **ln-712-nuget-upgrader** - NuGet upgrades
- **ln-713-pip-upgrader** - pip upgrades
- **ln-720-structure-migrator** - Structure migration
- **ln-721-frontend-restructure** - Frontend restructure
- **ln-722-backend-generator** - Backend generator
- **ln-723-mockdata-migrator** - Mock data migration
- **ln-724-replit-cleaner** - Replit cleanup
- **ln-730-devops-setup** - DevOps setup orchestrator
- **ln-731-docker-generator** - Docker setup
- **ln-732-cicd-generator** - CI/CD pipelines
- **ln-733-env-configurator** - Environment config
- **ln-741-linter-configurator** - Linter setup
- **ln-742-precommit-setup** - Pre-commit hooks
- **ln-743-test-infrastructure** - Test infrastructure
- **ln-750-commands-generator** - Commands generator
- **ln-751-command-templates** - Command templates
- **ln-760-security-setup** - Security setup
- **ln-761-secret-scanner** - Secret scanning
- **ln-770-crosscutting-setup** - Cross-cutting concerns
- **ln-771-logging-configurator** - Logging setup
- **ln-772-error-handler-setup** - Error handling
- **ln-773-cors-configurator** - CORS configuration
- **ln-774-healthcheck-setup** - Health checks
- **ln-775-api-docs-generator** - API documentation (Swagger)
- **ln-780-bootstrap-verifier** - Bootstrap verification
- **ln-781-build-verifier** - Build verification
- **ln-782-test-runner** - Test runner
- **ln-783-container-launcher** - Container launcher

#### L10: Document Automation (10 skills)
- **ln-800-document-automation** - Document automation orchestrator
- **ln-810-docx-generator** - Word documents
- **ln-820-xlsx-reporter** - Excel reports
- **ln-830-pptx-builder** - PowerPoint presentations
- **ln-840-pdf-extractor** - PDF extraction
- **ln-850-integration-helpers** - Integration helpers
- **ln-851-sheets-sync** - Google Sheets sync
- **ln-852-email-automation** - Email automation
- **ln-853-calendar-booking** - Calendar booking
- **ln-854-notification-hub** - Notifications

### Workflow

```
ln-700 (bootstrap) → ln-100 (docs) → ln-200 (scope) → ln-400 (execute) → ln-500 (quality)
```

---

## 🎯 External Source #2: coreyhaines31/marketingskills

**Repository:** https://github.com/coreyhaines31/marketingskills
**Alternative Fork:** https://github.com/syntax-syndicate/marketing-skills
**Description:** Marketing skills for Claude Code - CRO, SEO, copywriting, analytics
**Skills Count:** ~70-80 skills (marketing bundle)

### Categories Covered

#### L8-marketing / L8-marketing-growth

**Strategy Skills (~5)**
- **content-strategy** - Content planning
- **pricing-strategy** - Pricing strategy
- **product-marketing-context** - Product marketing context
- **launch-strategy** - Launch strategy
- **free-tool-strategy** - Free tool strategy

**Funnel Skills (~4)**
- **signup-flow-cro** - Signup flow optimization
- **onboarding-cro** - Onboarding optimization
- **referral-program** - Referral programs
- **paywall-upgrade-cro** - Paywall optimization

**Content Skills (~6)**
- **seo-audit** - SEO auditing
- **programmatic-seo** - Programmatic SEO
- **programmatic-seo-generator** - SEO generator
- **schema-markup** - Structured data
- **copywriting** - Copywriting
- **copy-editing** - Copy editing
- **social-content** - Social media content

**Performance Ads & CRO (~8)**
- **page-cro** - Page optimization
- **form-cro** - Form optimization
- **popup-cro** - Popup optimization
- **ab-test-setup** - A/B testing
- **paid-ads** - Paid advertising
- **google-ads-manager** - Google Ads
- **google-ads-analysis** - Ads analysis
- **competitor-alternatives** - Competitor analysis
- **marketing-psychology** - Psychology patterns

**Analytics & Reporting (~4)**
- **analytics-tracking** - Analytics tracking
- **marketing-ideas** - Marketing ideation
- **marketing-analytics** - Analytics
- **google-analytics** - Google Analytics
- **google-tag-manager** - GTM setup

---

## 🏠 Internal/Custom Skills (WS Agency)

**Total:** ~64-74 skills (авторские разработки)

### Categories

#### L5: Quality Assurance (3 skills)
- **kritik** - Universal document critic (Devil's Advocate)
- **site-audit** - Website technical audit
- **responsive-validator** - Responsive design validation

#### L7: Research (3-6 skills)
- **semrush-report** - SEMrush reporting
- **research** - Research assistant
- **examples** - Examples collection

#### L8: Soft Skills (15 skills)
- **finance** - Financial analysis
- **legal** - Legal documentation
- **meeting-insights-analyzer** - Meeting analysis
- **memory-searcher** - Memory search
- **persistent-memory-keeper** - Memory keeper

#### L8: Website Strategy (2 skills)
- **cold-email-campaigns** - Cold email campaigns

#### L9: Platform (9 skills)
- **wp-builder** - WordPress builder
- **ws** - WS Agency helper

#### L9: Project Management (5 skills)
- **safety-net** - Safety checks
- **skill-advisor** - Skill advisor
- **pcm** - Project context management

#### L11: Dev Tools (9 skills)
- **code-simplifier** - Code simplification
- **deploy-vercel** - Vercel deployment
- **figma-handoff** - Figma to code (pixel-perfect)
- **frontend-design** - Frontend design
- **github-workflow** - GitHub workflows
- **linux-admin** - Linux administration
- **ralph-loop** - Ralph development loop
- **security-guidance** - Security guidance
- **superpowers** - Developer superpowers

#### L12: Memory & Knowledge (6 skills)
- **data** - Data management
- **enterprise-search** - Unified enterprise search (Slack/Notion/GitHub/Gmail/Drive/Bitrix24)
- **memory-export** - Memory export
- **memory-search** - Memory search
- **memory-sync** - Memory synchronization
- **memory-write** - Memory writing

#### L13: Automation Agents (5 skills)
- **firecrawl** - Web scraping & crawling
- **openclaw-manager** - OpenClaw manager
- **openclaw-ops** - OpenClaw operations
- **openclaw-to-memory** - OpenClaw to memory sync
- **usage-monitor** - Usage monitoring

#### L99: Custom (авторские)
- **wartung** - WordPress maintenance (MainWP integration)

---

## 📈 Statistics

### By Origin

| Origin | Skills | Percentage |
|--------|--------|------------|
| External (levnikolaevich) | 105 | 42.2% |
| External (coreyhaines31) | 70-80 | 28-32% |
| **Total External** | **175-185** | **70-74%** |
| Internal (WS Agency) | 64-74 | 26-30% |
| **Total** | **249** | **100%** |

### By Category

| Category | Skills | Primary Source |
|----------|--------|----------------|
| L1: Documentation | 13 | levnikolaevich |
| L2: Scope Decomposition | 7 | levnikolaevich |
| L3: Task Management | 4 | levnikolaevich |
| L4: Story Execution | 8 | levnikolaevich |
| L5: Quality & Testing | 38 | levnikolaevich + WS |
| L6: DevOps Bootstrap | 32 | levnikolaevich |
| L7: Research | 6 | WS Agency |
| L8: Marketing | 89 | coreyhaines31 + WS |
| L9: Platform & PM | 14 | WS Agency |
| L10: Document Automation | 10 | levnikolaevich |
| L11: Dev Tools | 9 | WS Agency |
| L12: Memory & Knowledge | 6 | WS Agency |
| L13: Automation Agents | 5 | WS Agency |

---

## 🔄 Maintenance Strategy

### External Skills (175-185)

**Upstream Repositories:**
1. [levnikolaevich/claude-code-skills](https://github.com/levnikolaevich/claude-code-skills)
2. [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)

**Sync Strategy:**
- **Monthly check:** 1st of month
- **Method:** Compare commit history, check for updates
- **Process:** Manual review → selective merge (avoid conflicts with customizations)

### Internal Skills (64-74)

**Maintenance:**
- Full control, no upstream dependencies
- Can be modified freely for WS Agency needs
- Should be documented in CONTRIBUTING.md

---

## 🎯 Key Insights

### Confirmed User Statement

User was correct: **"подавляющее число всех скиллов заимствованы с Гитхаба"**

- **70-74% external** (175-185 skills from 2 GitHub repos)
- **26-30% internal** (64-74 custom WS Agency skills)

### Original Skills (примерно 5-6 как сказал пользователь)

Действительно авторские (полностью разработанные для WS Agency):
1. **kritik** - Universal document critic
2. **site-audit** - Website audit
3. **wartung** - WordPress maintenance
4. **enterprise-search** - Enterprise unified search
5. **firecrawl** - Web scraping wrapper
6. **openclaw-\*** series - OpenClaw integration (3 skills)

Остальные "internal" скиллы могут быть адаптациями или комбинациями внешних идей.

---

## 📝 Next Steps

1. ✅ **Identified external sources** (levnikolaevich, coreyhaines31)
2. ⏭️ **Update UPSTREAM-SOURCES.md** with proper tracking
3. ⏭️ **Set up monthly sync workflow**
4. ⏭️ **Document customizations** to avoid conflicts during updates
5. ⏭️ **Create visual map** (L1-L13 with source attribution)

---

**Generated:** 2026-03-07
**Analyst:** WS Workspace
**Method:** Deep content analysis + web search + manual verification
