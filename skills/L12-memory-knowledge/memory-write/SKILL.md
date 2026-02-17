---
name: "Memory Write"
description: "Быстрое создание заметок в agency-memory с правильным YAML frontmatter и структурой"
alwaysAllow: ["Write", "Read", "Bash"]
---

# Memory Write - Создание заметок в Agency Memory

Этот Skill помогает быстро создавать заметки в долгосрочной памяти с правильным форматом.

## Важно: Обязательно читать формат перед созданием

**КРИТИЧЕСКИ ВАЖНО:** Перед созданием заметки ВСЕГДА читай:
```
C:\Users\alexa\.craft-agent\workspaces\my-workspace\AGENCY-MEMORY-FORMAT.md
```

Это обеспечивает:
- Правильный YAML frontmatter с `author: craft-agents`
- Корректное именование файлов
- Соответствие типам и структуре

## Интерактивный процесс создания

### Шаг 1: Определить тип заметки

Спроси пользователя (если не указал явно):

```
Какой тип заметки создать?

[1] insight      - Решение проблемы, урок, находка
[2] decision     - Выбор технологии, архитектуры, подхода
[3] best-practice - Проверенная практика с метриками
[4] playbook     - Пошаговый процесс
[5] template     - Шаблон для повторного использования

Введи номер или название:
```

### Шаг 2: Собрать метаданные

Запроси у пользователя (интерактивно):

1. **Заголовок** (обязательно):
   ```
   Краткий заголовок заметки:
   ```

2. **Проект** (опционально):
   ```
   Проект (Enter для пропуска):
   [1] 2penguins  [2] wk-connect  [3] ws-agency  [4] topholz24
   ```

3. **Теги** (опционально):
   ```
   Теги через запятую (Enter для пропуска):
   Примеры: frontend, react, performance, security
   ```

### Шаг 3: Определить путь к файлу

На основе типа определи папку:

| Тип | Папка |
|-----|-------|
| insight | `D:\Claude\agency-memory\memory-exports\insights\` |
| decision | `D:\Claude\agency-memory\memory-exports\decisions\` |
| best-practice | `D:\Claude\agency-memory\memory-exports\best-practices\` |
| playbook | `D:\Claude\agency-memory\playbooks\` |
| template | `D:\Claude\agency-memory\templates\` |

**Именование файла:**
```
{тип}-{описание-через-дефисы}.md

Примеры:
  insight-playwright-test-healing.md
  decision-sanity-over-strapi.md
  best-practice-git-commit-messages.md
```

### Шаг 4: Создать файл с правильным frontmatter

Используй шаблоны из `AGENCY-MEMORY-FORMAT.md`:

**Для insight:**
```yaml
---
title: "Название"
type: insight
status: active
date: 2026-02-15
author: craft-agents
project: project-name
tags: [tag1, tag2]
---

# Название

## Проблема
Что было неправильно? 2-3 предложения.

## Решение
1. Шаг 1
2. Шаг 2

## Результаты
- Метрика: было X → стало Y (+Z%)

## Когда применять
Контекст.

## Когда НЕ применять
Ограничения.
```

**Для decision:**
```yaml
---
title: "Название решения"
type: decision
status: active
date: 2026-02-15
author: craft-agents
project: project-name
tags: [tag1, tag2]
---

# Название решения

## Контекст
Почему нужно было принять решение?

## Варианты
| Вариант | Плюсы | Минусы |
|---------|-------|--------|
| A | ... | ... |
| B | ... | ... |

## Решение
Выбран вариант X, потому что...

## Последствия
Что это означает.
```

**Для других типов** используй соответствующие шаблоны из `AGENCY-MEMORY-FORMAT.md`.

### Шаг 5: Подтвердить создание

После создания файла:

1. Выведи пользователю:
   ```
   ✅ Заметка создана:
   [Путь к файлу](D:\Claude\agency-memory/...)

   Тип: insight
   Файл: insight-название.md

   Файл готов к заполнению. Открыть в редакторе?
   ```

2. Если пользователь согласен, открой файл:
   ```bash
   code "D:\Claude\agency-memory/memory-exports/insights/insight-название.md"
   ```

## Проверки перед созданием

- ✅ Файл с таким именем НЕ существует
- ✅ Папка назначения существует
- ✅ YAML frontmatter валидный
- ✅ `author: craft-agents` установлен
- ✅ Дата в формате YYYY-MM-DD

## Быстрый режим

Если пользователь предоставил все данные сразу:
```
/memory-write insight "Название" --project=2penguins --tags=frontend,react
```

Создай заметку без дополнительных вопросов.

## Автоматическое определение типа

Если пользователь описывает:
- "Мы решили использовать..." → **decision**
- "Я нашел решение для..." → **insight**
- "Вот как мы всегда делаем..." → **best-practice**
- "Пошаговый процесс для..." → **playbook**

Предложи соответствующий тип автоматически.

## Что НЕ делать

❌ НЕ создавай файлы без YAML frontmatter
❌ НЕ используй `author: claude-code` (только `craft-agents`)
❌ НЕ создавай файлы с русскими буквами в имени
❌ НЕ пропускай обязательные поля (title, type, status, date, author)

## После создания

Предложи пользователю:
1. Открыть файл в редакторе (VS Code)
2. Сразу синхронизировать с GitHub (`/memory-sync`)
3. Создать еще одну заметку
