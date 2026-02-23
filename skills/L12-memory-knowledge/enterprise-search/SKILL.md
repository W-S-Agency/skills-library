---
name: "Enterprise Search"
description: "Unified search across Slack, Notion, GitHub, Gmail, Drive — найди anything одним запросом"
---

# Enterprise Search Skill

Универсальный поиск по всем инструментам компании: Slack, Notion, GitHub, Gmail, Google Drive, Bitrix24. Один запрос → результаты из всех источников.

**Ключевая фича**: Semantic search с AI-powered ranking — самые релевантные результаты сверху, независимо от source.

## Команды

### `/search`
Глобальный поиск по всем подключённым источникам:

```bash
/search "OAuth implementation"
```

**Ищет в:**
- 📧 **Gmail** — emails, attachments
- 📝 **Notion** — pages, databases
- 💬 **Slack** — messages, threads, files
- 🗂️ **GitHub** — code, issues, PRs, discussions
- 📁 **Google Drive** — docs, sheets, presentations
- 📊 **Bitrix24** — CRM records, tasks, calendar

**Output:**
```markdown
## Search Results: "OAuth implementation" (47 results)

### Most Relevant (AI-ranked)

#### 📝 Notion: OAuth Implementation Guide
**Source**: Notion > Engineering > Authentication
**Last Updated**: 2026-02-15
**Preview**: "Complete guide to implementing OAuth 2.0 with Passport.js. Covers authorization flow, token management, and..."
**Relevance**: 95% | **[Open →](https://notion.so/...)**

---

#### 💻 GitHub: feat(auth): add OAuth authentication (#234)
**Source**: GitHub > crm-ai-cockpit > Pull Requests
**Status**: Merged | **Date**: 2026-01-20
**Preview**: "Implements Google OAuth flow using Passport.js strategy. Includes database migration for OAuth fields..."
**Relevance**: 92% | **[View PR →](https://github.com/...)**

---

#### 💬 Slack: Discussion about OAuth security
**Source**: Slack > #engineering > Thread
**Date**: 2026-02-10 | **Participants**: @alexander, @team
**Preview**: "Alexander: Should we use PKCE for OAuth? Team: Yes, it's recommended for SPAs..."
**Relevance**: 88% | **[View Thread →](https://slack.com/...)**

---

### All Results (by Source)

#### 📝 Notion (8 results)
- OAuth Implementation Guide (95%)
- Authentication Architecture (82%)
- Security Best Practices (78%)
- [+5 more →]

#### 💻 GitHub (12 results)
- PR #234: OAuth authentication (92%)
- Issue #189: OAuth token refresh (85%)
- Code: src/auth/oauth.ts (84%)
- [+9 more →]

#### 💬 Slack (15 results)
- #engineering: OAuth discussion (88%)
- #general: OAuth setup question (75%)
- [+13 more →]

#### 📧 Gmail (4 results)
- Email: OAuth setup from John (72%)
- [+3 more →]

#### 📁 Google Drive (8 results)
- OAuth Flow Diagram (figma) (79%)
- [+7 more →]
```

**Фильтры:**
```bash
/search "budget" --source notion,gmail --from "2026-01-01"
```

### `/search:slack`
Поиск только в Slack:

```bash
/search:slack "deployment issues" --channel engineering --from @alexander
```

**Фильтры:**
- `--channel` — конкретный канал
- `--from` — от конкретного пользователя
- `--date` — date range
- `--has` — attachments, links, reactions

### `/search:notion`
Поиск только в Notion:

```bash
/search:notion "marketing strategy" --database "Projects" --tag WS-Agency
```

**Фильтры:**
- `--database` — конкретная база данных
- `--tag` — по тегам
- `--author` — кто создал
- `--type` — page, database, template

### `/search:github`
Поиск только в GitHub:

```bash
/search:github "authentication bug" --repo crm-ai-cockpit --type issues --state open
```

**Фильтры:**
- `--repo` — конкретный репозиторий
- `--type` — code, issues, prs, discussions
- `--state` — open, closed
- `--author` — кто создал

### `/search:gmail`
Поиск только в Gmail:

```bash
/search:gmail "invoice" --from client@example.com --has attachment --after 2026-02-01
```

**Фильтры:**
- `--from`, `--to` — отправитель/получатель
- `--subject` — в теме письма
- `--has` — attachment, link
- `--after`, `--before` — date range

### `/search:drive`
Поиск только в Google Drive:

```bash
/search:drive "Q1 report" --type spreadsheet --owner alexander --shared
```

**Фильтры:**
- `--type` — document, spreadsheet, presentation, pdf
- `--owner` — владелец файла
- `--shared` — только shared файлы
- `--folder` — в конкретной папке

### `/search:bitrix`
Поиск только в Bitrix24:

```bash
/search:bitrix "MEGA Mietpark" --type deal,contact --status won
```

**Фильтры:**
- `--type` — lead, deal, contact, task
- `--status` — статус объекта
- `--assigned` — кому назначено

## AI-Powered Ranking

Результаты ранжируются по relevance score (0-100%):

**Факторы:**
- 🎯 **Semantic similarity** (40%) — насколько близок контекст
- 📅 **Recency** (25%) — свежие результаты выше
- 👤 **Authority** (20%) — от кого (CEO vs intern)
- 🔗 **Connections** (15%) — связи между результатами

**Пример:**
```
Query: "OAuth security best practices"

Result 1: Notion page "OAuth Security" (95%)
- Semantic: 98% (exact topic match)
- Recency: 95% (updated yesterday)
- Authority: 90% (written by CTO)
- Connections: 95% (linked from 5 other docs)

Result 2: Slack message "OAuth question" (72%)
- Semantic: 85% (related but not exact)
- Recency: 60% (3 weeks old)
- Authority: 70% (from junior dev)
- Connections: 50% (no links)
```

## Semantic Search

Enterprise Search использует embeddings для понимания контекста:

**Традиционный keyword search:**
```
Query: "user authentication"
Finds: exact matches of "user" AND "authentication"
Misses: "login system", "OAuth", "SSO" (related but different keywords)
```

**Semantic search:**
```
Query: "user authentication"
Finds: "login system", "OAuth 2.0", "SSO integration", "password reset"
Reason: Semantically similar concepts
```

**Примеры:**

| Query | Semantic Matches |
|-------|------------------|
| "deployment failed" | "build error", "CI/CD issue", "pipeline broken" |
| "customer unhappy" | "negative feedback", "churn risk", "complaint" |
| "budget exceeded" | "overspent", "cost overrun", "over budget" |

## Cross-Source Insights

Enterprise Search находит связи между источниками:

**Пример:**
```bash
/search "CRM redesign project"
```

**Результаты:**
```markdown
## Cross-Source Timeline

### Planning (Notion)
- [2025-12-01] Project Brief: CRM Redesign
- [2025-12-15] Design Specs v1

### Discussion (Slack)
- [2025-12-20] #product: Redesign priorities
- [2026-01-05] #design: UI mockups feedback

### Implementation (GitHub)
- [2026-01-10] Issue #245: Redesign tracking issue
- [2026-01-15] PR #250: New dashboard layout
- [2026-02-01] PR #267: Mobile responsive updates

### Communication (Gmail)
- [2026-01-12] Client approval for mockups
- [2026-02-05] Stakeholder update: 80% complete

### Assets (Google Drive)
- [2025-12-18] CRM Redesign Mockups (Figma export)
- [2026-01-22] User Testing Results (Sheets)

## Key Insight
Project started in Notion (2025-12-01), discussed in Slack, implemented in GitHub,
communicated via Gmail, assets in Drive. Full lifecycle visible in one search.
```

## Интеграции

### Required Sources
- ✅ **Slack** (source active)
- ✅ **Notion** (source active/inactive)
- ✅ **GitHub** (source inactive)
- ✅ **Google Workspace** (Gmail, Drive - source inactive)
- ✅ **Bitrix24** (source active)

### Optional Sources
- **Figma** (design files search)
- **Microsoft Clarity** (analytics search)
- **Vercel** (deployment logs search)

## Принципы

- **Unified interface**: Один запрос → все источники
- **AI ranking**: Самые релевантные результаты сверху
- **Semantic understanding**: Понимает контекст, не только keywords
- **Privacy-aware**: Уважает permissions (видишь только то, к чему есть доступ)
- **Fast**: Results в течение 2-3 секунд

## Best Practices

### 1. **Начни с global search**
```bash
/search "keyword"
```
Если результатов много, фильтруй по source.

### 2. **Используй date filters**
```bash
/search "budget" --after 2026-01-01
```
Исключает outdated информацию.

### 3. **Combine semantic + keyword**
```bash
/search "OAuth implementation" --exact "Passport.js"
```
Semantic для контекста, exact для specificity.

### 4. **Save frequent searches**
Создай shortcuts для often-used queries.

### 5. **Review cross-source insights**
Связи между источниками часто раскрывают полную картину.

## Примеры

### Найти все про конкретный проект
```bash
/search "CRM AI Cockpit" --from 2026-01-01
```

### Найти обсуждения по теме
```bash
/search "performance optimization" --source slack,github --type discussion
```

### Найти документацию
```bash
/search "API documentation" --source notion,github,drive --type doc,md
```

### Найти decisions и context
```bash
/search "why did we choose PostgreSQL" --source slack,notion,gmail
```

## Advanced: Custom Ranking

Можно настроить ranking weights:

```bash
/search "OAuth" --rank-by recency
```

**Ranking strategies:**
- `default` — balanced (semantic 40%, recency 25%, authority 20%, connections 15%)
- `recency` — newest first (recency 60%, semantic 30%, others 10%)
- `authority` — from senior people (authority 50%, semantic 30%, others 20%)
- `connections` — highly linked content (connections 50%, semantic 30%, others 20%)

## Метрики

Enterprise Search отслеживает:
- **Search latency** (target: < 3s)
- **Result relevance** (user clicks on top 3 results)
- **Coverage** (% of sources indexed)
- **Query success rate** (% searches with results)

Используй `/search:stats` для analytics.
