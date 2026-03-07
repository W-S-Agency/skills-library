---
name: "Project Context Manager"
description: "Универсальное управление контекстом проекта: Auto-Bootstrap, MainDoc, ContextCard, T-last — для любого типа проекта"
alwaysAllow: ["Write", "Read", "Edit", "Bash"]
---

# Project Context Manager (PCM)

Универсальная система управления контекстом проекта. Работает для ЛЮБОГО типа: разработка, маркетинг, брендинг, аналитика, стратегия сайта.

## Принципы

- **80/20** — минимум документов, максимум пользы
- **Single Source of Truth** — docs/MainDoc.md = главный документ
- **Context > Motivation** — быстрое вхождение за ≤5 минут через T-last
- **Три аудитории** — Team (Markdown), AI agents (JSON), Clients (branded .docx/.pdf)

## Команды

| Аргумент | Действие |
|----------|----------|
| `init` | Auto-Bootstrap: создать docs/ + .ai/ + client/ структуру |
| `update "описание"` | Обновить ContextCard + T-last после сессии |
| `snapshot` | Создать еженедельный снапшот в ContextCard |
| `status` | Показать текущий статус проекта |
| `client "тип"` | Сгенерировать брендированный документ для клиента |

Примеры вызова: `/pcm init`, `/pcm update "добавил авторизацию"`, `/pcm client "blueprint"`

---

## init — Auto-Bootstrap

При вызове `/pcm init`:

**1. Спроси у пользователя:**
- Название проекта
- Тип (`website-strategy` / `development` / `marketing` / `branding` / `analytics` / `other`)
- Цель проекта (1 предложение)
- Владелец (Owner)

**2. Проверь рабочую директорию.** Если есть существующие файлы — прочитай их и используй для заполнения контекста.

**3. Создай CORE структуру:**

```
PROJECT_ROOT/
├── docs/                         # Team Layer (Markdown)
│   ├── MainDoc.md               # Source of truth
│   ├── ContextCard.md           # T-last + snapshots
│   └── PSP.md                   # Project System Prompt
│
├── .ai/                          # AI Layer (Structured)
│   ├── AGENTS.md                # Инструкции для AI агентов
│   ├── context.json             # Метаданные проекта (machine-readable)
│   └── t-last.json              # Текущий T-last (machine-readable)
│
├── client/                       # Client Layer (branded docs only)
│
└── materials/                    # Исходные материалы, брифы
```

**4. Заполни файлы по шаблонам ниже**, подставив данные от пользователя.

---

## Шаблоны

### docs/MainDoc.md

```markdown
# {PROJECT_NAME} — MainDoc

> Source of Truth. Последнее обновление: {DATE}

## 1. Context Reference
→ Быстрый вход: [ContextCard.md](ContextCard.md)

## 2. Definition of Success
- **Цель:** {goal}
- **KPI:** {kpi_list}
- **Критерии готовности:** {done_criteria}

## 3. Scope
### In Scope
- {items}

### Out of Scope
- {items}

### MVP
- {items}

## 4. Requirements
- {functional_requirements}

## 5. Client Materials
- {links_to_materials_folder}

## 6. Roles & Responsibility (RACI)
| Роль | Кто | Ответственность |
|------|-----|-----------------|
| Owner | {name} | Решения, приоритеты |
| Executor | WS Workspace | Реализация |
| Context Keeper | PCM | Актуальность документов |

## 7. Processes & Communication
- {communication_channels}

## 8. Risks → Mitigation
| Риск | Вероятность | Влияние | Митигация |
|------|------------|---------|-----------|

## 9. Acceptance & Testing
- {acceptance_criteria}

## 10. Releases / Versions
| Версия | Дата | Изменения |
|--------|------|-----------|

## 11. Appendices
### Decision Log
| Дата | Решение | Контекст |
|------|---------|----------|

### Links
- {relevant_links}
```

### docs/ContextCard.md

```markdown
# {PROJECT_NAME} — ContextCard

> Быстрый вход в проект. Читай это ПЕРВЫМ.

## Top Layer
- **Цель:** {one_line_goal}
- **Стадия:** {current_stage}
- **Точка входа:** {entry_file}:{section}
- **Главный риск:** {risk}
- **Первый шаг:** {next_action} (≤15 мин)

## Weekly Snapshot ({DATE})
- **Статус:** {on_track / at_risk / blocked}
- **Фокус:** {current_focus_areas}
- **Риск → Решение:** {risk_mitigation}

---

## T-last (обновлено: {TIMESTAMP})

### 1. Где остановились
**Файл:** `{file_path}`
**Секция:** {section_name}
**Описание:** {what_was_being_done}

### 2. Следующий микро-шаг
**Действие:** {concrete_action}
**Длительность:** ≤15 минут
**Файл:** `{file_path}`

### 3. Отложено и почему
- {item}: {reason}

### 4. Почему это важно
{one_line_why}

### 5. Риск задержки
{one_line_delay_risk}

### 6. If-Then триггер
**Если:** {datetime_or_condition}
**Тогда:** {action}
**Результат:** {expected_outcome}
```

### docs/PSP.md

```markdown
# {PROJECT_NAME} — Project System Prompt

## Идентификация
- **Проект:** {name}
- **Тип:** {type}
- **Владелец:** {owner}

## Контекст
При работе с этим проектом:
1. Прочитай ContextCard.md → T-last секцию
2. Следуй инструкциям в "Следующий микро-шаг"
3. После завершения → `/pcm update`

## Ограничения
- {project_specific_constraints}

## Стек / Инструменты
- {tech_stack_or_tools}
```

### .ai/AGENTS.md

```markdown
# AGENTS.md — {PROJECT_NAME}

## Project
- **Name:** {name}
- **Type:** {type}
- **Stage:** {stage}

## Source of Truth
- Primary: `docs/MainDoc.md`
- Quick entry: `docs/ContextCard.md` → T-last section
- Machine context: `.ai/context.json`

## Session Protocol
1. **START:** Read `.ai/t-last.json` → understand current state
2. **WORK:** Execute the `nextStep` action
3. **END:** Update via `/pcm update "summary"`

## File Structure
- `docs/` — Human-readable documentation (Markdown)
- `.ai/` — Machine-readable context (JSON + this file)
- `client/` — Branded documents for clients only
- `materials/` — Source materials and briefs
- `data/` — Workflow artifacts (if applicable)

## Decision Authority
- **Autonomous:** File edits within scope, documentation updates
- **Ask first:** Scope changes, new integrations, client-facing outputs
```

### .ai/context.json

```json
{
  "project": {
    "name": "",
    "slug": "",
    "type": "",
    "stage": "init"
  },
  "goal": {
    "primary": "",
    "successCriteria": []
  },
  "scope": {
    "inScope": [],
    "outOfScope": []
  },
  "team": {
    "owner": "",
    "executor": "WS Workspace",
    "contextKeeper": "PCM"
  },
  "files": {
    "mainDoc": "docs/MainDoc.md",
    "contextCard": "docs/ContextCard.md",
    "psp": "docs/PSP.md",
    "materials": "materials/"
  },
  "constraints": {
    "budget": null,
    "timeline": "",
    "compliance": []
  },
  "currentFocus": {
    "priority": "",
    "blockers": [],
    "nextMilestone": ""
  }
}
```

### .ai/t-last.json

```json
{
  "timestamp": "{ISO_8601}",
  "session": "{session_summary}",
  "tlast": {
    "whereStopped": {
      "file": "",
      "section": "",
      "description": ""
    },
    "nextStep": {
      "file": "",
      "action": "",
      "duration": "≤15 min"
    },
    "deferred": [],
    "whyImportant": "",
    "delayRisk": "",
    "ifThen": {
      "condition": "",
      "action": "",
      "outcome": ""
    }
  }
}
```

---

## update — Обновление контекста после сессии

При вызове `/pcm update "описание"`:

1. Прочитай текущие `docs/ContextCard.md` и `.ai/t-last.json`
2. Проанализируй текущую сессию (все изменения, решения, результаты)
3. Сгенерируй новый T-last (6 точек):
   - **Где остановились** — последний файл/секция над которыми работали
   - **Следующий микро-шаг** — конкретное действие ≤15 мин
   - **Отложено и почему** — что решили не делать сейчас
   - **Почему важно** — 1 строка мотивации
   - **Риск задержки** — что произойдёт если откладывать
   - **If-Then** — условие → действие для следующего шага
4. Обнови `docs/ContextCard.md` → секцию T-last
5. Обнови `.ai/t-last.json` (структурированные данные)
6. Если изменились метаданные проекта → обнови `.ai/context.json`
7. Покажи diff изменений пользователю

---

## snapshot — Еженедельный снапшот

При вызове `/pcm snapshot`:

1. Прочитай `docs/MainDoc.md` и `docs/ContextCard.md`
2. Сгенерируй Weekly Snapshot:
   - Статус: `on_track` / `at_risk` / `blocked`
   - Фокус текущей недели
   - Риск → Решение
3. Добавь снапшот в `docs/ContextCard.md` (перед T-last секцией)
4. Предыдущие снапшоты сдвигаются вниз (хранить последние 4)

---

## status — Текущее состояние

При вызове `/pcm status`:

1. Прочитай `.ai/context.json` и `.ai/t-last.json`
2. Покажи компактный статус:
   - Проект, тип, стадия
   - Текущий фокус
   - T-last: где остановились + следующий шаг
   - Блокеры (если есть)

---

## client — Генерация клиентского документа

При вызове `/pcm client "тип"`:

Типы: `proposal`, `blueprint`, `report`, `contract`

1. Прочитай `docs/MainDoc.md` для данных проекта
2. Вызови скилл `/ln-810-docx-generator` с данными проекта и выбранным типом
3. Сохрани результат в `client/`
4. Покажи путь к файлу

---

## Интеграции

| Скилл | Когда |
|-------|-------|
| `/memory-write` | После update — сохранить ключевые решения |
| `/memory-search` | Поиск решений по проектам |
| `/ln-810-docx-generator` | Генерация клиентских документов |
| `/ln-111-root-docs-creator` | Для code-проектов: CLAUDE.md + dev docs |
