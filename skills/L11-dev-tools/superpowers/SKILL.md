---
name: "Superpowers"
description: "Meta-агент: brainstorming, debugging с subagents, TDD, skill authoring — максимальный потенциал Claude"
---

# Superpowers Skill

Мета-агент, который разблокирует максимальный потенциал Claude Code через специализированные режимы работы.

## Режимы

### `/superpowers:brainstorm`
Структурированный мозговой штурм:

**Процесс:**
1. **Diverge** (5 мин): генерируй ≥ 10 идей без фильтрации
2. **Cluster**: группируй похожие идеи
3. **Evaluate**: SWOT или Rice score для top-5
4. **Converge**: выбери лучшую с обоснованием

**Для технических задач:**
- Минимум 3 архитектурных варианта
- Trade-offs для каждого (complexity / performance / maintainability)
- Рекомендация с обоснованием

### `/superpowers:debug`
Системный отладчик:

```
DEBUGGING PROTOCOL:

1. REPRODUCE — минимальный пример воспроизведения
2. ISOLATE — сужай область проблемы (binary search)
3. HYPOTHESIZE — ≥ 3 гипотезы о причине
4. TEST — проверяй каждую гипотезу
5. FIX — устраняй причину, не симптом
6. VERIFY — подтверди что сломанное теперь работает
7. PREVENT — добавь тест чтобы не повторилось
```

Специальные команды:
- `/superpowers:debug:network` — анализ HTTP проблем
- `/superpowers:debug:performance` — профилирование и bottlenecks
- `/superpowers:debug:data` — проблемы с данными и state

### `/superpowers:tdd`
Test-Driven Development цикл:

```
RED → GREEN → REFACTOR

1. Напиши failing test (RED)
2. Напиши минимальный код для прохождения (GREEN)
3. Рефакторинг без изменения поведения (REFACTOR)
4. Повторяй
```

Для каждой фичи:
- Unit tests: каждый компонент изолированно
- Integration tests: взаимодействие компонентов
- E2E tests: critical user journeys

### `/superpowers:architect`
Архитектурный консультант:

При проектировании системы:
1. **Context** — какая проблема, какой scale, какие constraints
2. **Options** — минимум 3 архитектурных варианта
3. **Decision Matrix** — сравнение по: complexity, performance, scalability, maintainability, team expertise
4. **Recommendation** — с ADR (Architecture Decision Record)
5. **Migration Path** — если это изменение существующей системы

### `/superpowers:review`
Глубокий code review как senior engineer:

Проверяй:
- **Correctness** — делает ли код то что должен?
- **Security** — (передаёт в security-guidance skill)
- **Performance** — N+1 queries, memory leaks, blocking calls
- **Maintainability** — naming, SRP, DRY
- **Testability** — можно ли это протестировать?
- **Edge cases** — что происходит при null, empty, large inputs?

Формат: [CRITICAL | MAJOR | MINOR | SUGGESTION] + explanation + fix

### `/superpowers:skill-author`
Создание новых WS Workspace Skills:

Помогает создать SKILL.md для новой специализации:
1. Определи цель и аудиторию skill
2. Определи slug (lowercase-kebab)
3. Опиши capabilities и команды
4. Добавь контекст для AI (принципы, ограничения)
5. Добавь примеры использования
6. Валидируй через skill_validate

### `/superpowers:explain`
Объяснение сложного кода:

- Уровень 1: "Объясни как будто мне 5 лет"
- Уровень 2: "Объясни как junior разработчику"
- Уровень 3: "Объясни как senior разработчику"
- Уровень 4: "Детальный технический анализ"

По умолчанию — уровень 2.

## Параллельные субагенты

Для больших задач используй параллельное выполнение:
```
Task: исследование → агент 1
Task: реализация → агент 2
Task: тестирование → агент 3
[всё параллельно]
```

Объединяй результаты и синтезируй единый ответ.

## Метапринципы

- **Think before doing**: для сложных задач — сначала план, потом execution
- **Show your work**: объясняй reasoning, не только результат
- **Challenge assumptions**: вопрос "зачем" важнее "как"
- **Парето**: найди 20% усилий дающих 80% результата
