---
name: "Skill Advisor"
description: "Умный роутер скиллов — анализирует задачу и предлагает 3-5 подходящих скиллов с объяснением"
---

# Skill Advisor

Автоматический анализатор задач и роутер к правильным скиллам. Избавляет от необходимости знать все 140+ скиллов наизусть.

**Ключевая фича**: Natural language → Recommended Skills с объяснением "почему именно эти".

## Команды

### `/skill-advisor`
Анализирует задачу и предлагает подходящие скиллы:

```bash
/skill-advisor "Нужно проанализировать конкурентов и создать отчет"
```

**Output:**
```markdown
## 🎯 Skill Recommendations

**Твоя задача**: Проанализировать конкурентов и создать отчет

**Анализ контекста:**
- Domain: Market Research / Competitive Analysis
- Output: Report/Document
- Data Sources: Web, competitors' websites
- Complexity: Medium

---

### 🥇 **Recommended Skills** (ranked by relevance)

#### 1. **research** (Relevance: 95%)
**Command**: `/research:competitors "HubSpot, Pipedrive, Salesforce"`

**Почему:**
- Специализирован на competitive analysis
- Анализирует позиционирование, pricing, features, strengths/weaknesses
- Генерирует structured report с Gap Analysis
- Источники: G2, Capterra, websites, reviews

**Что получишь:**
- Competitive matrix (features, pricing, ratings)
- Strengths & Weaknesses каждого конкурента
- Opportunity gaps (что делают они, но не мы)
- Differentiation recommendations

**Пример output:**
```markdown
## Competitive Analysis

### HubSpot
**Positioning**: All-in-one marketing + CRM
**Pricing**: Free - $1,200/mo
**Strengths**: Strong free tier, marketing automation
**Weaknesses**: Expensive at scale, limited customization
**Rating**: 4.4/5 (G2)

### Opportunity Gap
None offer AI-powered deal scoring + DACH compliance
```

---

#### 2. **semrush-report** (Relevance: 85%)
**Command**: `/semrush-report "competitor.com"`

**Почему:**
- Специализирован на SEO competitive intelligence
- Анализирует traffic, keywords, backlinks
- Показывает content strategy конкурентов
- Идеален для digital/marketing анализа

**Что получишь:**
- Organic keywords (top 20 с volume, difficulty, SERP features)
- Traffic estimates
- Top pages по traffic
- Backlink profile
- Content gaps

**Когда использовать:**
✅ Конкуренты — digital/SaaS компании с websites
✅ Нужен SEO/content strategy анализ
❌ Конкуренты — offline businesses

---

#### 3. **firecrawl** (Relevance: 75%)
**Command**: `/firecrawl:crawl "https://competitor.com" --match "/blog/*"`

**Почему:**
- Извлекает весь контент с website конкурента
- Конвертирует в clean markdown (LLM-ready)
- Позволяет deep analysis всех blog posts, docs, product pages
- Полезен для content strategy анализа

**Что получишь:**
- Все страницы конкурента в markdown
- Topic analysis (какие темы покрывают)
- Content structure analysis
- Keyword density

**Когда использовать:**
✅ Нужен deep dive в контент конкурента
✅ Анализ всех blog posts/documentation
❌ Нужны только high-level insights (используй research)

---

#### 4. **ln-810-docx-generator** (Relevance: 60%)
**Command**: После анализа используй для создания Word отчета

**Почему:**
- Создаёт professional Word document из данных
- Форматирование, таблицы, charts
- Готово для презентации клиенту/команде

**Что получишь:**
- Formatted Word report (.docx)
- Executive Summary
- Competitive Matrix (таблица)
- Recommendations section

**Когда использовать:**
✅ Результаты нужны в Word формате
✅ Для клиентской презентации
❌ Достаточно markdown/internal use

---

### 📋 **Recommended Workflow**

**Option A: Quick Analysis (15-20 min)**
1. `/research:competitors "Competitor1, Competitor2, Competitor3"`
2. Review results
3. Done ✅

**Option B: Deep Analysis (30-45 min)**
1. `/research:competitors "Competitor1, Competitor2, Competitor3"`
2. `/semrush-report "competitor1.com"` (for SEO insights)
3. `/firecrawl:crawl "https://competitor1.com/blog" --max-pages 20` (for content strategy)
4. Synthesize все данные
5. `/ln-810-docx-generator` для Word report (если нужен)

**Option C: Lightning Fast (5 min)**
1. `/firecrawl:search "top CRM software 2026 reviews"`
2. Scrapes top 10 review sites
3. Quick summary
4. Done ✅

---

### ❓ **Which Option?**

**Recommendation**: Start with **Option A** (Quick Analysis)

**Reasoning**:
- `research:competitors` даёт 80% нужных insights
- Быстро (15-20 min)
- Можешь всегда добавить Option B steps позже

**Choose Option B if:**
- Конкуренты — digital companies с strong web presence
- Нужен SEO/content strategy deep dive

**Choose Option C if:**
- Нужны insights прямо сейчас
- Для первичного research

---

### 🚀 **Ready to Execute?**

Type:
- `1` → Execute Option A (Quick Analysis)
- `2` → Execute Option B (Deep Analysis)
- `3` → Execute Option C (Lightning Fast)
- `custom` → Хочу сам выбрать команды
```

### `/skill-advisor:auto`
Включает автоматический режим — я сам буду предлагать скиллы без явного вызова:

```bash
/skill-advisor:auto on
```

**После активации:**
Каждый раз, когда ты описываешь задачу, я буду:
1. ✅ Анализировать контекст
2. 💡 Предлагать подходящие скиллы
3. 🚀 Спрашивать подтверждение перед execution

**Пример:**
```
User: "Проанализируй рынок CRM в Германии"

WS Workspace: 💡 Detected: Market Research task

Recommended Skills:
- /research:market "CRM software DACH region"
- /semrush-report (for SEO competitive data)

Execute Option 1? [Y/n]
```

### `/skill-advisor:map`
Показывает карту всех скиллов с категориями:

```bash
/skill-advisor:map
```

**Output:**
```markdown
## 📊 Skills Map (140+ total)

### 🔷 Development Pipeline (L8 Framework) — 100+ skills

#### **Documentation** (ln-100 → ln-150)
- ln-100: Full docs orchestrator
- ln-110: Project docs (CLAUDE.md, README, etc.)
- ln-120: Reference docs (API, schemas)
- ln-130: Task management docs
- ln-140: Testing docs
- ln-150: Presentation builder (HTML interactive)

#### **Scope & Planning** (ln-200 → ln-230)
- ln-200: Scope → Epics → Stories orchestrator
- ln-210: Epic coordinator (3-7 Epics)
- ln-220: Story coordinator (5-10 Stories per Epic)
- ln-230: RICE prioritization

#### **Execution** (ln-400 → ln-404)
- ln-400: Story executor (orchestrates tasks)
- ln-401: Task executor (implementation)
- ln-402: Task reviewer (code review)
- ln-403: Task rework (fixes)
- ln-404: Test executor (Story finalizer)

#### **Quality** (ln-500 → ln-653)
- ln-500: Story quality gate (4-level)
- ln-600: Docs auditor (8 categories)
- ln-610: Code comments auditor
- ln-620: Codebase auditor (9 specialized workers)
- ln-630: Test auditor (5 workers)
- ln-640: Pattern evolution auditor
- ln-650: Persistence performance auditor

#### **Project Bootstrap** (ln-700 → ln-783)
- ln-700: Full bootstrap orchestrator
- ln-710: Dependency upgrader (npm, nuget, pip)
- ln-720: Structure migrator (Clean Architecture)
- ln-730: DevOps setup (Docker, CI/CD)
- ln-740: Quality setup (linters, pre-commit)
- ln-750: Commands generator (.claude/commands)
- ln-760: Security setup (secret scanner)
- ln-770: Cross-cutting setup (logging, errors, CORS)
- ln-780: Bootstrap verifier (build, test, containers)

#### **Document Automation** (ln-800 → ln-854)
- ln-810: Word generator (proposals, contracts)
- ln-820: Excel reporter (analytics, financials)
- ln-830: PowerPoint builder (pitch decks)
- ln-840: PDF extractor (data extraction)
- ln-850: Integration helpers (Sheets, email, calendar)

---

### 🔶 Business Operations (Cowork) — 10 skills

#### **Marketing & Sales**
- marketing: Content, campaigns, SEO для WS Agency/2Penguins/Topholz24
- sales: B2B prospect research, outreach sequences, pipeline
- **NEW** research: Market research, competitive analysis, trends
- semrush-report: Automated SEO analysis via Semrush
- programmatic-seo-generator: Mass page generation for SEO

#### **Product & Support**
- pm: PRD/specs, roadmap, user research для CRM AI Cockpit
- productivity: Daily brief, приоритеты, цели, task management
- **NEW** customer-support: Ticket triage, draft responses, KB creation

#### **Finance & Legal**
- **NEW** finance: Journal entries, reconciliation, statements для 4 бизнесов
- **NEW** legal: Contract review, NDA triage, GDPR compliance

#### **Data & Search**
- **NEW** data: SQL queries, data analysis, dashboards
- **NEW** enterprise-search: Unified search Slack/Notion/GitHub/Gmail/Drive

---

### 🔵 Code Quality & Development — 6 skills

#### **Code Review & Development**
- **NEW** code-review: Automated PR review (4 agents, confidence scoring)
- **NEW** feature-dev: 7-phase guided feature development
- **NEW** commit-commands: Git workflow automation, AI commit messages
- code-simplifier: Упрощение кода после изменений (DRY, KISS)
- superpowers: Meta-agent для brainstorming, debugging, TDD
- ralph-loop: Autonomous dev cycles с авто-повтором

---

### 🟢 WordPress & Client Management — 2 skills

- wartung: WordPress-Wartung для 29 клиентских сайтов (MainWP)
- wp-builder: Управление WordPress через Bricks Builder

---

### 🟣 Utilities & Automation — 10 skills

#### **Visibility & Safety**
- **NEW** claude-hud: Real-time context/tools/agents monitoring
- **NEW** safety-net: Protection от git push --force, rm -rf
- usage-monitor: Claude Max usage limits с progress bar

#### **Memory & Context**
- memory-write: Создание заметок в agency-memory
- memory-search: Поиск по заметкам
- memory-export: Еженедельный экспорт в сводный документ
- memory-sync: GitHub sync для agency-memory
- pcm: Project Context Manager (Auto-Bootstrap, Sync, Validation)

#### **Agent Management**
- openclaw-manager: Управление OpenClaw агентами
- openclaw-ops: DevOps для OpenClaw VPS
- openclaw-to-memory: Сохранение OpenClaw результатов в memory

#### **Voice & Communication**
- voice-input: Whisper voice-to-text сервер
- voice-output: ElevenLabs TTS озвучка

---

### 🟡 Specialized Tools — 8 skills

#### **Design & Deploy**
- frontend-design: Production-grade UI с distinctive design
- figma-handoff: Pixel-perfect implementation from Figma
- deploy-vercel: Vercel deployment management
- github-workflow: GitHub repos, issues, PRs automation

#### **Analytics & Marketing**
- google-ads-analysis: YoY campaign analysis
- **NEW** firecrawl: Web scraping, crawling, LLM-ready data

#### **Analysis & Strategy**
- analyze-project: Comprehensive crm-ai-cockpit analysis
- ws: Website strategy research & planning (MODE1-4)

---

### 📊 **Total Breakdown**

| Category | Skills | % |
|----------|--------|---|
| Development Pipeline (L8) | 100+ | 71% |
| Business Operations | 10 | 7% |
| Code Quality & Dev | 6 | 4% |
| WordPress & Clients | 2 | 1% |
| Utilities & Automation | 10 | 7% |
| Specialized Tools | 8 | 6% |
| **Meta** (skill-advisor) | 1 | 1% |
| **TOTAL** | **~140** | **100%** |

---

### 🎯 **Quick Filters**

**Show only:**
- `/skill-advisor:map --category business` (Business Operations только)
- `/skill-advisor:map --category dev` (Development Pipeline только)
- `/skill-advisor:map --new` (Только NEW скиллы)
```

## Routing Logic

Skill Advisor использует следующую логику для routing:

### **1. Keyword Detection**

| Keywords | Recommended Skills |
|----------|-------------------|
| "рынок", "market", "конкуренты", "competitors" | research, semrush-report, firecrawl |
| "документация", "docs", "CLAUDE.md" | ln-100, ln-110, ln-111 |
| "scope", "Epic", "Story", "задачи" | ln-200, ln-210, ln-220 |
| "review", "PR", "код", "quality" | code-review, ln-500, ln-620 |
| "тесты", "tests", "testing" | ln-510, ln-630 |
| "bootstrap", "новый проект", "setup" | ln-700 |
| "финансы", "finance", "бухгалтерия" | finance |
| "контракт", "contract", "NDA", "legal" | legal |
| "клиенты", "support", "tickets" | customer-support |
| "WordPress", "wartung", "maintenance" | wartung, wp-builder |
| "SQL", "query", "data", "dashboard" | data |
| "commit", "git", "push" | commit-commands |
| "фича", "feature", "разработка" | feature-dev |

### **2. Context Analysis**

**Development context** (если есть git repo, код):
- Приоритет: ln-pipeline, code-review, feature-dev

**Business context** (если упоминаются клиенты, продажи):
- Приоритет: marketing, sales, pm, research

**Maintenance context** (если упоминаются existing sites):
- Приоритет: wartung, wp-builder

**Analysis context** (если нужны insights, reports):
- Приоритет: research, data, semrush-report

### **3. Complexity Scoring**

**Simple tasks** (1 skill достаточно):
- Quick research, single command execution

**Medium tasks** (2-3 skills):
- Research + report generation
- Code review + fixes

**Complex tasks** (3-5 skills, orchestration):
- Full project bootstrap (ln-700)
- Comprehensive competitive analysis (research + semrush + firecrawl)
- Complete documentation (ln-100)

## Best Practices

### 1. **Начинай с /skill-advisor**
Если не знаешь, какой скилл использовать — спроси advisor.

### 2. **Включи auto mode**
`/skill-advisor:auto on` → я буду предлагать скиллы автоматически.

### 3. **Trust the recommendations**
Advisor учитывает:
- Твой контекст (working dir, git status, project type)
- Прошлые задачи (patterns)
- Optimal workflow (минимум шагов, максимум результата)

### 4. **Review карту периодически**
`/skill-advisor:map` → explore new skills, refresh памяти.

### 5. **Combine skills**
Advisor часто предлагает workflows (несколько скиллов в sequence).

## Интеграции

### PCM (Project Context Manager)
Skill Advisor интегрируется с PCM:
- Читает project context (CLAUDE.md, project type)
- Предлагает скиллы based on project architecture

### Memory
Запоминает твои предпочтения:
- Какие скиллы используешь чаще
- Какие workflows предпочитаешь
- Adjusts recommendations accordingly

### Claude HUD
Показывает в HUD:
- Recently used skills
- Most frequent skills
- Suggested skills для current context

## Примеры

### Research задача
```
User: "Изучи рынок CRM в Германии"

Advisor: 💡 Market Research detected

Recommended:
1. /research:market "CRM software DACH region" (Primary)
2. /semrush-report (SEO competitive data)
3. /firecrawl:search "CRM Germany reviews" (Quick alternative)

Execute Option 1? [Y/n]
```

### Development задача
```
User: "Добавь OAuth authentication в CRM"

Advisor: 💡 Feature Development detected

Recommended:
1. /feature-dev "Add OAuth authentication" (7-phase workflow)
2. /ln-200 (если нужен full scope decomposition)
3. /code-review (after implementation)

Execute Option 1? [Y/n]
```

### Business задача
```
User: "Нужен отчет по продажам Q1"

Advisor: 💡 Business Reporting detected

Recommended:
1. /data:query "Show revenue by customer Q1 2026" (SQL)
2. /data:dashboard "Sales performance Q1" (Visual)
3. /ln-820-xlsx-reporter (Excel export)

Execute Option 1? [Y/n]
```

## Metrics

Skill Advisor отслеживает:
- **Recommendation accuracy** (% accepted suggestions)
- **Skills coverage** (какие скиллы используются, какие забыты)
- **User satisfaction** (feedback on recommendations)
- **Workflow efficiency** (time saved vs manual selection)

Используй `/skill-advisor:stats` для analytics.
