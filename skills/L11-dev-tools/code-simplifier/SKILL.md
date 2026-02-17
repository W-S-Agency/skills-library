---
name: "Code Simplifier"
description: "Упрощает код после изменений — убирает complexity, дублирование, сохраняет функциональность"
---

# Code Simplifier Skill

Запускается после реализации фичи или рефакторинга. Анализирует только что изменённый код и предлагает упрощения.

## Когда использовать

- После завершения task/story implementation
- Когда код работает, но выглядит overcomplicated
- Перед code review

## Процесс упрощения

### Шаг 1: Диагностика
Перед упрощением — проанализируй:
- Цикломатическая сложность (> 10 = тревожно)
- Глубина вложенности (> 3 уровней = упростить)
- Длина функций (> 30 строк = разбить)
- Дублирование кода (> 3 повторений = абстракция)

### Шаг 2: KISS — Keep It Simple, Stupid

```typescript
// ❌ OVERCOMPLICATED
function processData(items: Item[]) {
  const result = [];
  for (let i = 0; i < items.length; i++) {
    if (items[i] !== null && items[i] !== undefined) {
      if (items[i].isActive === true) {
        if (items[i].value > 0) {
          result.push({
            id: items[i].id,
            value: items[i].value,
            name: items[i].name
          });
        }
      }
    }
  }
  return result;
}

// ✅ SIMPLIFIED
function processData(items: Item[]) {
  return items
    .filter(item => item?.isActive && item.value > 0)
    .map(({ id, value, name }) => ({ id, value, name }));
}
```

### Шаг 3: DRY — Don't Repeat Yourself

```typescript
// ❌ DUPLICATED
const formatUserName = (user: User) => `${user.firstName} ${user.lastName}`;
const displayUserName = (user: User) => `${user.firstName} ${user.lastName}`;
const showUserName = (user: User) => `${user.firstName} ${user.lastName}`;

// ✅ DRY
const getUserFullName = ({ firstName, lastName }: User) =>
  `${firstName} ${lastName}`;
```

### Шаг 4: Eliminate Dead Code

- Удаляй закомментированный код (git history для этого)
- Удаляй неиспользуемые imports
- Удаляй unused variables и функции
- Удаляй TODO/FIXME старше 2 недель (или фикси их)

### Шаг 5: Early Returns (Guard Clauses)

```typescript
// ❌ DEEP NESTING
function processOrder(order: Order) {
  if (order) {
    if (order.isValid) {
      if (order.items.length > 0) {
        // actual logic
      }
    }
  }
}

// ✅ EARLY RETURNS
function processOrder(order: Order) {
  if (!order) return;
  if (!order.isValid) return;
  if (order.items.length === 0) return;

  // actual logic — now at root level
}
```

## Упрощение для .NET

```csharp
// ❌ OVERCOMPLICATED
public async Task<ActionResult<UserDto>> GetUser(int id)
{
    User user = null;
    try
    {
        user = await _userRepository.GetByIdAsync(id);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error getting user");
        return StatusCode(500);
    }
    if (user == null)
    {
        return NotFound();
    }
    var dto = new UserDto { Id = user.Id, Name = user.Name };
    return Ok(dto);
}

// ✅ SIMPLIFIED — с Result pattern
public async Task<ActionResult<UserDto>> GetUser(int id)
{
    var user = await _userRepository.GetByIdAsync(id);
    return user is null ? NotFound() : Ok(user.ToDto());
}
```

## Что НЕ упрощать

- Код, связанный с безопасностью — явность важнее краткости
- Complex business logic — иногда сложность оправдана
- Не абстрагируй то, что используется только один раз
- YAGNI — не упрощай "на будущее"

## Вывод

После анализа — предоставь:
1. **Список найденных проблем** с priority (High/Medium/Low)
2. **Конкретные рефакторинги** с before/after кодом
3. **Метрики улучшения** (сколько строк убрано, complexity score)
4. **Что не трогал** и почему
