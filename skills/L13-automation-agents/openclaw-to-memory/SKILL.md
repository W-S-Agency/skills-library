---
name: "OpenClaw to Memory"
description: "Автоматическое сохранение результатов OpenClaw задач в Agency Memory с умным определением типа заметки"
alwaysAllow: ["Read", "Write", "Bash"]
---

# OpenClaw to Memory - Automation Bridge

Автоматически сохраняет результаты выполненных OpenClaw задач в долгосрочную память (Agency Memory).

---

## 🎯 Назначение

**Проблема:**
- OpenClaw выполняет задачи, но результаты теряются после завершения
- Session logs временные и недоступны для долгосрочного анализа
- Нет автоматического сохранения insights в knowledge base

**Решение:**
- Автоматически создает заметки в agency-memory из результатов OpenClaw
- Умное определение типа заметки (insight, decision, best-practice)
- Связывает OpenClaw task_id с agency-memory заметкой
- Синхронизирует с GitHub для shared knowledge

---

## 🔄 Процесс автоматизации

### Шаг 1: Получить результат задачи OpenClaw

**Входные данные:**
- `task_id` - ID выполненной задачи в OpenClaw
- `session_id` (optional) - ID сеанса для context

**Получение данных:**

```javascript
// Через MCP tools OpenClaw
const taskInfo = await mcp__openclaw__task_list({
  task_id: task_id
});

const logs = await mcp__openclaw__logs_read({
  task_id: task_id,
  lines: 100  // последние 100 строк
});

const sessionHistory = await mcp__openclaw__session_history({
  session_id: session_id
});
```

**Что извлекается:**
- Описание задачи
- Результаты выполнения
- Логи и метрики
- Timestamp и status

---

### Шаг 2: Анализировать результат

**Определить тип заметки:**

| Если результат содержит... | Тип заметки | Пример |
|----------------------------|-------------|--------|
| Решение проблемы, fix, workaround | **insight** | "Нашел способ оптимизировать SQL запрос" |
| Выбор между вариантами, comparison | **decision** | "Выбрали PostgreSQL вместо MongoDB" |
| Проверенный процесс, SOP, метрики | **best-practice** | "Процесс code review с checklist" |
| Пошаговая инструкция, процедура | **playbook** | "Как развернуть проект на Vercel" |

**Умное определение (AI-powered):**

```typescript
function determineNoteType(taskResult: string): NoteType {
  const keywords = {
    insight: ['решил', 'нашел', 'fix', 'workaround', 'оптимизация'],
    decision: ['выбрал', 'решили использовать', 'comparison', 'vs'],
    best_practice: ['процесс', 'checklist', 'метрики', 'результаты'],
    playbook: ['шаги', 'инструкция', 'как сделать', 'guide']
  };

  // Count keyword matches
  let scores = {
    insight: 0,
    decision: 0,
    best_practice: 0,
    playbook: 0
  };

  for (const [type, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (taskResult.toLowerCase().includes(word)) {
        scores[type]++;
      }
    }
  }

  // Return type with highest score (default: insight)
  return Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  ) || 'insight';
}
```

---

### Шаг 3: Извлечь метаданные

**Из описания задачи:**
- **Project** - определить из контекста (2penguins, ws-agency, etc.)
- **Tags** - извлечь ключевые слова (seo, performance, api, etc.)
- **Title** - сократить описание до 2-10 слов

**Из результатов:**
- **Metrics** - извлечь числовые метрики ("было X → стало Y")
- **Tools** - упомянутые технологии (React, Docker, Semrush)
- **Impact** - оценка влияния (high/medium/low)

**Пример:**

```yaml
# OpenClaw Task:
description: "Провести SEO аудит site.com через Semrush и найти top 10 проблем"
result: "Найдено 15 критических проблем. Top 3: broken links (45), slow load (3.2s), missing meta (23)"

# Извлеченные метаданные:
project: ws-agency
tags: [seo, audit, semrush, performance]
title: "SEO audit findings for site.com"
type: insight
```

---

### Шаг 4: Создать заметку в Agency Memory

**Используя memory-write skill:**

```bash
/memory-write insight \
  "SEO audit findings for site.com" \
  --project=ws-agency \
  --tags=seo,audit,semrush,performance \
  --automated=true \
  --openclaw-task-id=123
```

**Структура заметки:**

```markdown
---
title: "SEO audit findings for site.com"
type: insight
status: active
date: 2026-02-15
author: craft-agents
automated: true
openclaw_task_id: "123"
project: ws-agency
tags: [seo, audit, semrush, performance]
---

# SEO audit findings for site.com

> 🤖 Автоматически создано из OpenClaw Task #123

## OpenClaw Task

**Задача:** Провести SEO аудит site.com через Semrush и найти top 10 проблем
**Выполнено:** 2026-02-15 17:22 GMT+1
**Status:** Completed ✅

## Результаты

### Найденные проблемы (15 критических)

**Top 3 по приоритету:**

1. **Broken Links** — 45 битых ссылок
   - Критично для SEO
   - Снижает crawlability на 30%
   - Fix: проверить и удалить/исправить

2. **Page Load Time** — 3.2s (target: <2s)
   - Метрика: было 3.2s → target 2s (-37%)
   - Главная причина: нет image optimization
   - Fix: WebP конвертация + lazy loading

3. **Missing Meta Descriptions** — 23 страницы
   - Страницы без мета-описаний
   - CTR снижен на 15-20%
   - Fix: добавить уникальные описания

### Метрики

| Категория | Score | Status |
|-----------|-------|--------|
| Technical SEO | 75/100 | ⚠️ Needs work |
| Content | 82/100 | ✅ Good |
| Backlinks | 45/100 | ❌ Poor |
| Performance | 68/100 | ⚠️ Needs work |

## Рекомендации

### Immediate Actions (Priority 1)
1. Fix 45 broken links (impact: high)
2. Optimize images → WebP (impact: high)
3. Add meta descriptions для 23 страниц (impact: medium)

### Short-term (1-2 weeks)
1. Implement lazy loading для images
2. Minify CSS/JS (current: 450KB → target: 200KB)
3. Add structured data markup (JSON-LD)

### Long-term (1 month+)
1. Build backlink campaign (target: +50 quality backlinks)
2. Content refresh для low-performing pages
3. Implement CDN (Cloudflare)

## Tools Used

- **Semrush API** - Site audit
- **Playwright** - Page load testing
- **Lighthouse** - Performance metrics

## Related

- [Best Practice: SEO Optimization](../best-practices/best-practice-seo-optimization.md)
- [Decision: Semrush vs Ahrefs](../decisions/decision-semrush-vs-ahrefs.md)

---

**Created by:** OpenClaw (BoAs)
**Task ID:** 123
**Duration:** 5 minutes
**Status:** ✅ Completed
```

---

### Шаг 5: Синхронизировать с GitHub

**Автоматический sync после создания:**

```bash
cd D:\Claude\agency-memory
git add memory-exports/insights/insight-seo-audit-findings.md
git commit -m "feat(insight): add SEO audit findings from OpenClaw

Automated insight from OpenClaw Task #123.
Found 15 critical SEO issues with actionable recommendations.

OpenClaw-Task-ID: 123
Co-Authored-By: WS Workspace <noreply@wsagency.dev>"
git push origin master
```

---

## 🎯 Режимы работы

### Режим 1: Manual (по требованию)

```bash
# Пользователь вручную инициирует сохранение
/openclaw-to-memory --task-id=123
```

**Workflow:**
1. Получить результат задачи #123
2. Спросить пользователя тип заметки (или auto-detect)
3. Создать заметку
4. Sync с GitHub
5. Показать результат

---

### Режим 2: Auto (триггер на завершение задачи)

**Настройка webhook в OpenClaw:**

```javascript
// OpenClaw webhook config
{
  "event": "task.completed",
  "action": "call_skill",
  "skill": "openclaw-to-memory",
  "params": {
    "task_id": "${task.id}",
    "auto_sync": true
  }
}
```

**Что происходит:**
1. OpenClaw завершает задачу → trigger webhook
2. WS Workspace вызывает `/openclaw-to-memory` автоматически
3. Заметка создается без участия пользователя
4. Auto-sync с GitHub
5. Notification в Slack (optional)

---

### Режим 3: Batch (массовое сохранение)

```bash
# Сохранить все completed задачи за последние 7 дней
/openclaw-to-memory --batch --days=7
```

**Workflow:**
1. Получить список всех задач (task_list с filter "completed")
2. Фильтровать по дате (last 7 days)
3. Для каждой задачи создать заметку
4. Batch commit в Git
5. Показать summary

---

## 📋 Фильтрация задач

### Какие задачи сохранять в память?

**✅ Сохранять:**
- Tasks с significant results (метрики, insights)
- Tasks с actionable recommendations
- Tasks с reusable knowledge (best practices)
- Tasks с важными decisions

**❌ НЕ сохранять:**
- Routine tasks без insights (daily backups, monitoring)
- Failed tasks (unless есть learnings)
- Duplicate tasks (повторяющиеся операции)
- Trivial tasks (<5 min execution)

**Automatic filtering:**

```typescript
function shouldSaveToMemory(task: OpenClawTask): boolean {
  // Check significance
  if (task.duration < 300) return false; // < 5 min
  if (task.status === 'failed' && !task.logs.includes('learning')) return false;
  if (task.description.includes('daily backup')) return false;

  // Check for insights
  const hasMetrics = /\d+%|было.*стало|before.*after/i.test(task.result);
  const hasRecommendations = /рекомендац|recommend|action/i.test(task.result);
  const hasDecision = /выбрал|решили|vs|comparison/i.test(task.result);

  return hasMetrics || hasRecommendations || hasDecision;
}
```

---

## 🔗 Linking OpenClaw ↔ Agency Memory

### Bidirectional linking

**From OpenClaw Task → Agency Memory:**
```yaml
# В заметке agency-memory
openclaw_task_id: "123"
openclaw_session_id: "abc-def-ghi"
```

**From Agency Memory → OpenClaw:**
```javascript
// В описании OpenClaw task
task_create({
  description: "Implement SEO fixes from insight-seo-audit-findings.md",
  context: {
    agency_memory_ref: "memory-exports/insights/insight-seo-audit-findings.md",
    source: "automated_insight"
  }
})
```

**Benefits:**
- Traceability (можно найти заметку по task_id)
- Context (можно вернуться к исходной задаче)
- Automation (новые задачи на основе старых insights)

---

## 🎨 Templates для разных типов задач

### Template 1: SEO Audit

```markdown
---
title: "SEO audit - {site}"
type: insight
automated: true
openclaw_task_id: "{task_id}"
tags: [seo, audit, {tool}]
---

# SEO audit - {site}

## Найденные проблемы
{problems}

## Метрики
{metrics_table}

## Рекомендации
{recommendations}
```

### Template 2: Performance Analysis

```markdown
---
title: "Performance analysis - {component}"
type: insight
automated: true
openclaw_task_id: "{task_id}"
tags: [performance, {framework}]
---

# Performance analysis - {component}

## Before
{before_metrics}

## After
{after_metrics}

## Improvements
{improvements_list}
```

### Template 3: Competitor Analysis

```markdown
---
title: "Competitor analysis - {competitors}"
type: decision
automated: true
openclaw_task_id: "{task_id}"
tags: [research, competitors]
---

# Competitor analysis - {competitors}

## Comparison
{comparison_table}

## Our Position
{our_position}

## Recommendations
{strategic_recommendations}
```

---

## 📊 Statistics & Monitoring

### Track automation metrics

```bash
# Сколько заметок создано из OpenClaw
grep "openclaw_task_id" memory-exports/**/*.md | wc -l

# Распределение по типам
grep "automated: true" memory-exports/**/*.md -A 2 | grep "type:" | sort | uniq -c

# Top projects с automated insights
grep "automated: true" memory-exports/**/*.md -A 5 | grep "project:" | sort | uniq -c
```

**Example output:**
```
Total automated notes: 47
  - insights: 32
  - decisions: 8
  - best-practices: 7

Top projects:
  - ws-agency: 18
  - 2penguins: 15
  - wk-connect: 14
```

---

## 🚨 Error Handling

### Scenario 1: OpenClaw task не найдена

```
❌ OpenClaw Task #123 не найдена

Проверьте:
- Task ID правильный?
- Задача завершена? (status: completed)
- Доступ к OpenClaw active?

Попробуйте:
/openclaw-to-memory --task-id=123 --force
```

### Scenario 2: Не удалось определить тип заметки

```
⚠️ Автоматическое определение типа неуверенно (scores: insight=2, decision=2)

Выберите тип вручную:
[1] insight
[2] decision
[3] best-practice
[4] playbook
```

### Scenario 3: Заметка уже существует

```
⚠️ Заметка для Task #123 уже существует:
memory-exports/insights/insight-seo-audit-findings.md

Действия:
[1] Обновить существующую (append новые данные)
[2] Создать новую версию (insight-seo-audit-findings-v2.md)
[3] Пропустить
```

---

## 🎯 Best Practices

### 1. Регулярный batch save

**Еженедельно сохранять все completed задачи:**

```bash
# Каждое воскресенье в 20:00
cron: 0 20 * * 0
command: /openclaw-to-memory --batch --days=7 --auto-sync
```

### 2. Quality filtering

**Сохранять только significant tasks:**
- Duration > 5 min
- Has metrics или recommendations
- Has actionable insights

### 3. Tagging conventions

**Автоматически добавлять теги:**
- `automated` - всегда для OpenClaw заметок
- `openclaw` - источник данных
- Tool name - используемый инструмент (semrush, playwright, apify)

### 4. Git commit conventions

**Формат commit message:**
```
feat(insight): add {title} from OpenClaw

Automated insight from OpenClaw Task #{task_id}.
{brief_summary}

OpenClaw-Task-ID: {task_id}
Co-Authored-By: WS Workspace <noreply@wsagency.dev>
```

---

## 🔧 Configuration

### Skill config (опционально)

```yaml
# C:\Users\alexa\.craft-agent\workspaces\my-workspace\skills\openclaw-to-memory\config.yml

auto_sync: true           # Auto-sync с GitHub после создания
auto_detect_type: true    # Автоматическое определение типа заметки
min_duration: 300         # Minimum task duration (seconds) для сохранения
batch_size: 10            # Максимум задач в batch mode
default_project: null     # Default project (null = auto-detect)
notification: slack       # Уведомления (slack/email/none)

templates:
  seo_audit: "templates/openclaw/seo-audit.md"
  performance: "templates/openclaw/performance-analysis.md"
  competitor: "templates/openclaw/competitor-analysis.md"
```

---

## 📚 Examples

### Example 1: Manual save

```bash
# После выполнения OpenClaw task
/openclaw-to-memory --task-id=123

# Output:
🔍 Получаю результат OpenClaw Task #123...
📊 Анализирую результаты...
🎯 Определен тип: insight
✍️ Создаю заметку: insight-seo-audit-findings.md
🔄 Синхронизирую с GitHub...
✅ Готово!

Заметка: memory-exports/insights/insight-seo-audit-findings.md
GitHub: https://github.com/team588/agency-memory/commit/abc123
```

### Example 2: Batch save

```bash
/openclaw-to-memory --batch --days=7

# Output:
📋 Получаю список completed задач за последние 7 дней...
Найдено: 15 задач

Фильтрация по significance...
✅ Significant: 8 задач
❌ Skipped: 7 задач (routine/trivial)

Создание заметок:
[1/8] ✅ insight-seo-audit-findings.md
[2/8] ✅ decision-cloudflare-vs-fastly.md
[3/8] ✅ best-practice-email-automation.md
...
[8/8] ✅ insight-performance-optimization.md

🔄 Batch commit в GitHub...
✅ Все заметки сохранены!

GitHub: https://github.com/team588/agency-memory/commit/def456
```

---

## 🎓 Advanced Usage

### Используй с другими skills

**Комбинация с ln-100-documents-pipeline:**

```bash
# 1. OpenClaw выполняет задачу
# 2. Автоматически сохраняет в agency-memory
# 3. Запускается ln-100 для создания documentation
/openclaw-to-memory --task-id=123 --then=/ln-100-documents-pipeline
```

**Комбинация с memory-export:**

```bash
# Batch save + weekly export
/openclaw-to-memory --batch --days=7 && /memory-export --auto
```

---

## ✅ Checklist

**После создания skill:**

- [ ] Skill файл создан
- [ ] Permissions настроены (alwaysAllow: Read, Write, Bash)
- [ ] Протестировать manual mode
- [ ] Протестировать batch mode
- [ ] Настроить webhook в OpenClaw (optional)
- [ ] Настроить cron для weekly batch (optional)
- [ ] Добавить в README.md agency-memory

---

**Created:** 2026-02-15
**Author:** WS Workspace
**Status:** ✅ Ready to use
