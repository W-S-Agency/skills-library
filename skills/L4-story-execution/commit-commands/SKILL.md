---
name: "Commit Commands"
description: "Git workflow automation — smart commits, push, PR creation с AI-generated commit messages"
---

# Commit Commands Skill

Автоматизация git workflow с AI-powered commit messages, intelligent staging, и PR creation.

**Ключевая фича**: Claude анализирует изменения и генерирует semantic commit messages по conventional commits стандарту.

## Команды

### `/commit`
Умный commit с AI-generated message:

```bash
/commit
```

**Workflow:**
1. 📊 Анализирует `git diff` (staged + unstaged)
2. 🎯 Определяет тип изменений (feat/fix/refactor/docs/etc.)
3. ✍️ Генерирует commit message по conventional commits
4. 🔍 Показывает preview
5. ✅ Создаёт commit

**Пример output:**
```
Changes detected:
  - Added OAuth authentication flow (src/auth/)
  - Updated user model with OAuth fields (src/models/user.ts)
  - Added migration for OAuth columns (migrations/...)

Proposed commit message:
───────────────────────────────
feat(auth): add Google OAuth authentication

- Implement OAuth 2.0 flow with Passport.js
- Add OAuth provider fields to User model
- Create migration for oauth_provider and oauth_id columns

Co-Authored-By: WS Workspace <noreply@wsagency.dev>
───────────────────────────────

Proceed? [Y/n]
```

### `/commit:amend`
Amend последнего commit:

```bash
/commit:amend
```

Анализирует новые изменения и обновляет commit message если нужно.

### `/commit:fix`
Создаёт fixup commit для конкретного коммита:

```bash
/commit:fix abc123
```

Создаст `fixup! Original commit message` для последующего `git rebase --autosquash`.

### `/push`
Push с pre-push проверками:

```bash
/push
```

**Pre-push checks:**
- ✅ All tests pass (если настроено)
- ✅ No linting errors
- ✅ Build successful
- ✅ No uncommitted changes (опционально)

**С принудительным push:**
```bash
/push --force-with-lease
```

⚠️ Безопаснее чем `--force`, проверяет remote state.

### `/pr`
Создаёт pull request с AI-generated описанием:

```bash
/pr
```

**Workflow:**
1. 📊 Анализирует все commits в branch
2. 📝 Генерирует PR title и description
3. 🏷️ Предлагает labels
4. 👥 Предлагает reviewers (based on CODEOWNERS)
5. 🚀 Создаёт PR через `gh pr create`

**Пример PR description:**
```markdown
## Summary
Implements Google OAuth authentication flow using Passport.js strategy.

## Changes
- ✨ New OAuth 2.0 authentication flow
- 🗄️ Database schema updates for OAuth fields
- 🔒 Secure state management with CSRF protection
- 📝 Documentation for OAuth setup

## Testing
- [x] Unit tests for OAuth strategy
- [x] Integration tests for OAuth callback
- [x] Manual testing with Google OAuth

## Checklist
- [x] Code follows project conventions (CLAUDE.md)
- [x] Tests pass
- [x] Documentation updated
- [x] No breaking changes

## Related
Closes #123

🤖 Generated with [WS Workspace](https://wsagency.dev)
```

### `/pr:draft`
Создаёт draft PR:

```bash
/pr:draft
```

### `/pr:update`
Обновляет описание существующего PR:

```bash
/pr:update #456
```

Регенерирует description based on новых commits.

## Conventional Commits

Skill следует [Conventional Commits](https://www.conventionalcommits.org/) стандарту:

### Типы коммитов

| Тип | Описание | Пример |
|-----|----------|--------|
| `feat` | Новая фича | `feat(auth): add OAuth login` |
| `fix` | Исправление бага | `fix(api): handle null user` |
| `refactor` | Рефакторинг без изменения функциональности | `refactor(auth): extract OAuth logic` |
| `perf` | Оптимизация производительности | `perf(db): add index on user_id` |
| `docs` | Документация | `docs(api): update OAuth guide` |
| `style` | Форматирование (не меняет логику) | `style: fix indentation` |
| `test` | Добавление/изменение тестов | `test(auth): add OAuth unit tests` |
| `chore` | Maintenance tasks | `chore(deps): update packages` |
| `ci` | CI/CD изменения | `ci: add code review workflow` |
| `build` | Build system | `build: update webpack config` |

### Scope
Указывает область изменений: `feat(auth)`, `fix(api)`, `docs(readme)`

### Breaking Changes
```
feat(auth)!: remove session-based auth

BREAKING CHANGE: JWT is now the only supported auth method
```

## Smart Staging

### `/stage:smart`
Интеллектуальный staging по логическим группам:

```bash
/stage:smart
```

**Анализирует изменения и группирует:**
- Related files (imports, dependencies)
- Logical units (feature files)
- Предлагает multiple commits для разных групп

**Пример:**
```
Detected 3 logical groups:

Group 1: OAuth feature (7 files)
  ✓ src/auth/oauth.ts
  ✓ src/auth/strategies/google.ts
  ✓ src/models/user.ts
  ✓ migrations/add_oauth.sql

Group 2: Testing (3 files)
  ✓ tests/auth/oauth.test.ts
  ✓ tests/fixtures/oauth.ts

Group 3: Documentation (2 files)
  ✓ docs/auth/oauth.md
  ✓ README.md

Commit separately? [Y/n]
```

### `/stage:interactive`
Interactive staging с preview:

```bash
/stage:interactive
```

Показывает diff для каждого файла, спрашивает stage or skip.

## Co-Authors

Автоматически добавляет co-author trailer:

```
feat(auth): add OAuth

Co-Authored-By: WS Workspace <noreply@wsagency.dev>
```

Для добавления других co-authors:
```bash
/commit --co-author "John Doe <john@example.com>"
```

## Интеграции

### GitHub CLI (`gh`)
- `gh pr create` — создание PR
- `gh pr view` — просмотр PR
- `gh api` — GitHub API operations

### Pre-commit Hooks
Skill интегрируется с Husky/pre-commit:
```json
{
  "husky": {
    "hooks": {
      "prepare-commit-msg": "claude /commit:generate-message"
    }
  }
}
```

### GitHub Actions
Auto-PR creation после push:
```yaml
- name: Create PR
  run: claude /pr --auto
```

## Принципы

- **Semantic commits**: Conventional commits для автоматизации changelogs
- **Atomic commits**: Один commit = одна логическая единица
- **Descriptive messages**: Claude генерирует понятные описания
- **Safe force push**: `--force-with-lease` вместо `--force`
- **Pre-push validation**: Проверки перед push

## Best Practices

### 1. **Review перед commit**
Всегда читай generated message. Claude может ошибиться.

### 2. **Используй scopes**
`feat(auth)` лучше чем просто `feat`.

### 3. **Atomic commits**
Один commit — одна фича/фикс. Используй `/stage:smart` для группировки.

### 4. **Meaningful descriptions**
Описывай **why**, не только **what**.

### 5. **Co-authors**
Указывай pair programming partners через `--co-author`.

## Примеры

### Feature commit
```bash
# After implementing OAuth feature
/commit
# → feat(auth): add Google OAuth authentication
#   - Implement OAuth 2.0 flow with Passport.js
#   - Add OAuth provider fields to User model
```

### Bug fix
```bash
# After fixing null pointer bug
/commit
# → fix(api): handle null user in /profile endpoint
#   Prevents 500 error when user is not authenticated
```

### Refactoring
```bash
# After extracting reusable logic
/commit
# → refactor(auth): extract OAuth logic to separate module
#   Improves testability and reusability
```

### Documentation
```bash
# After updating README
/commit
# → docs(readme): add OAuth setup instructions
#   Includes environment variables and callback URL configuration
```

### PR creation
```bash
# After implementing complete feature
/pr
# Creates PR with:
# - Title: feat(auth): Google OAuth authentication
# - Summary: Implements OAuth flow...
# - Reviewers: based on CODEOWNERS
# - Labels: enhancement, authentication
```

## Конфигурация

### Custom commit template
`.ws-workspace/workspaces/my-workspace/skills/commit-commands/template.txt`:
```
{type}({scope}): {subject}

{body}

{footer}

Co-Authored-By: WS Workspace <noreply@wsagency.dev>
```

### Skip checks
```bash
/push --no-verify
```

⚠️ Используй осторожно. Пропускает pre-push hooks.

### Auto-PR after push
```bash
/push --create-pr
```

Push + PR creation одной командой.
