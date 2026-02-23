---
name: "Code Review"
description: "Automated PR review with 4 parallel agents and confidence-based filtering — catches CLAUDE.md violations, bugs, and context issues"
---

# Code Review Skill

Автоматизированная система code review для pull requests с использованием 4 параллельных специализированных агентов и confidence-based фильтрацией для устранения false positives.

**Ключевой механизм**: Каждый найденный issue получает confidence score (0-100), и только issues с score ≥80 попадают в финальный review.

## Команды

### `/code-review`
Выполняет полный автоматизированный code review PR:

**Workflow:**
1. ✅ **Pre-check**: Пропускает closed/draft/trivial/already-reviewed PRs
2. 📄 **Gather context**: Собирает все CLAUDE.md файлы из репозитория
3. 📊 **Summarize changes**: Анализирует diff и создаёт краткое резюме
4. 🤖 **Launch 4 parallel agents**:
   - **Agent #1**: CLAUDE.md compliance audit
   - **Agent #2**: CLAUDE.md compliance audit (redundant)
   - **Agent #3**: Bug detection в изменениях
   - **Agent #4**: Git history analysis для контекстных проблем
5. 🎯 **Score issues**: Каждый issue получает confidence score 0-100
6. 🔍 **Filter**: Отбрасываются issues с score < 80
7. 💬 **Post review**: Публикация GitHub comment с high-confidence issues

**Использование:**
```bash
/code-review
```

Или с указанием PR:
```bash
/code-review #123
```

### `/code-review:set-threshold`
Изменяет порог confidence для фильтрации issues:

```bash
/code-review:set-threshold 70
```

**Дефолт**: 80 (рекомендуется 75-85 для баланса recall/precision)

## Confidence Scoring Scale

| Score | Уровень | Значение |
|-------|---------|----------|
| 0-24  | None    | Не уверен, likely false positive |
| 25-49 | Low     | Возможно реальная проблема, но неочевидная |
| 50-74 | Medium  | Реальная, но минорная проблема |
| 75-89 | High    | Высокая уверенность, важная проблема |
| 90-100| Certain | Абсолютная уверенность, критическая проблема |

**Threshold 80** = только High и Certain issues попадают в review

## Типы проблем

### CLAUDE.md Compliance (Agents #1 & #2)
- Нарушение project guidelines
- Несоответствие coding conventions
- Пропущенные обязательные паттерны
- Нарушение архитектурных принципов

**Пример:**
```
❌ Missing error handling for OAuth callback (Confidence: 85)
CLAUDE.md says: "Always handle OAuth errors with user-friendly messages"
src/auth.ts:67-72
```

### Bug Detection (Agent #3)
- Логические ошибки в коде
- Memory leaks
- Race conditions
- Null/undefined dereference
- Неправильная обработка ошибок

**Пример:**
```
🐛 Memory leak: OAuth state not cleaned up (Confidence: 92)
Missing cleanup in finally block
src/auth.ts:88-95
```

### Historical Context Issues (Agent #4)
- Регрессии известных проблем
- Нарушение контракта API
- Изменение поведения без документации
- Inconsistency с existing code

**Пример:**
```
⚠️ Breaks API contract established in #234 (Confidence: 88)
git blame shows this pattern was intentionally avoided
src/api/users.ts:45-52
```

## Review Comment Format

```markdown
## 🤖 Automated Code Review

Found 3 high-confidence issues:

---

### 1. Missing error handling for OAuth callback
**Type**: CLAUDE.md Compliance
**Confidence**: 85 / 100
**Location**: [src/auth.ts:67-72](https://github.com/owner/repo/blob/abc123.../src/auth.ts#L67-L72)

**Issue**: CLAUDE.md explicitly states "Always handle OAuth errors with user-friendly messages", but this callback has no error handling.

**Recommendation**: Add try/catch with user-facing error message.

---

### 2. Memory leak: OAuth state not cleaned up
**Type**: Bug
**Confidence**: 92 / 100
**Location**: [src/auth.ts:88-95](https://github.com/owner/repo/blob/abc123.../src/auth.ts#L88-L95)

**Issue**: OAuth state stored in Map but never removed, causing memory leak.

**Recommendation**: Add cleanup in finally block.

---

### 3. Inconsistent naming pattern
**Type**: CLAUDE.md Compliance
**Confidence**: 81 / 100
**Location**: [src/utils.ts:23-28](https://github.com/owner/repo/blob/abc123.../src/utils.ts#L23-L28)

**Issue**: Function uses snake_case, but CLAUDE.md conventions require camelCase.

**Recommendation**: Rename `process_data` → `processData`.
```

## Интеграции

### GitHub CLI (`gh`)
- `gh pr view` — получение PR details
- `gh pr diff` — анализ изменений
- `gh api` — git blame, history
- `gh pr comment` — публикация review

### GitHub Source
Если активен `github` source (MCP):
- Прямой доступ к PR API
- Webhooks для auto-review
- Review status tracking

## Принципы

- **Parallel processing**: 4 агента работают одновременно → скорость
- **Confidence-based filtering**: Минимизирует false positives → trust
- **CLAUDE.md-first**: Проектные guidelines — первостепенны
- **Context-aware**: Git history даёт контекст для лучших решений
- **Actionable feedback**: Каждый issue содержит конкретную рекомендацию

## Best Practices

1. **Добавь CLAUDE.md в проект**: Чем детальнее guidelines, тем точнее review
2. **Настрой threshold**: 80 — баланс, но для mature проектов можно 85-90
3. **Review before merge**: Запускай `/code-review` перед каждым merge
4. **Ignore trivial PRs**: Система автоматически пропустит PRs < 10 LOC
5. **Trust but verify**: High-confidence issues обычно real, но всегда проверяй контекст

## Конфигурация

**Auto-review**: Добавь в `.github/workflows/code-review.yml`:
```yaml
name: Automated Code Review
on: pull_request
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Claude Code Review
        run: claude /code-review
```

**Threshold override**: Для конкретного PR можно указать threshold напрямую:
```bash
/code-review --threshold 70
```
