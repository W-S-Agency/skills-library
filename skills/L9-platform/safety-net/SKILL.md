---
name: "Safety Net"
description: "Защита от деструктивных команд — catches git force-push, rm -rf, file overwrites before execution"
---

# Safety Net Skill

Автоматическая защита от деструктивных git и filesystem команд. Перехватывает опасные операции и запрашивает подтверждение перед выполнением.

**Ключевая фича**: Ловит destructive commands ПЕРЕД execution, давая возможность cancel или modify.

## Команды

### `/safety-net:enable`
Включает safety net (по умолчанию включён):

```bash
/safety-net:enable
```

**Защищает от:**
- ❌ `git push --force` (без --force-with-lease)
- ❌ `git reset --hard`
- ❌ `git clean -fd`
- ❌ `rm -rf`
- ❌ Overwriting files без backup
- ❌ Dropping database tables
- ❌ `npm/yarn/pnpm` uninstall critical packages

### `/safety-net:disable`
Отключает safety net (не рекомендуется):

```bash
/safety-net:disable
```

⚠️ **Warning**: Отключение safety net убирает все защиты. Используй только если абсолютно уверен.

### `/safety-net:config`
Настройка safety net:

```bash
/safety-net:config
```

**Опции:**
- `--mode` — `strict` (default), `permissive`, `off`
- `--whitelist` — команды, которые всегда разрешены
- `--require-confirmation` — всегда спрашивать подтверждение

## Защищённые Операции

### 🔴 Git - Critical

#### `git push --force`
**Опасность**: Перезаписывает remote history, может потерять commits других разработчиков.

**Safety Net Action:**
```markdown
⚠️ DESTRUCTIVE COMMAND DETECTED

Command: git push --force origin main

🔴 RISK: Force push to main branch
- Overwrites remote history
- May delete commits from other developers
- Cannot be undone

📋 Affected:
- Branch: main
- Remote: origin
- Commits at risk: 3 commits (from collaborators)

✅ SAFER ALTERNATIVE:
git push --force-with-lease origin main

--force-with-lease checks remote state before force-pushing,
preventing accidental overwrites.

❓ Options:
  [1] Use --force-with-lease (RECOMMENDED)
  [2] Proceed with --force (DANGEROUS)
  [3] Cancel
```

#### `git reset --hard`
**Опасность**: Удаляет uncommitted changes, cannot be undone.

**Safety Net Action:**
```markdown
⚠️ DESTRUCTIVE COMMAND DETECTED

Command: git reset --hard HEAD~3

🔴 RISK: Hard reset will delete:
- 3 commits (abc123, def456, ghi789)
- All uncommitted changes
- All staged changes

💾 Affected Files (uncommitted):
- src/auth/oauth.ts (modified)
- src/models/user.ts (modified)
- tests/auth.test.ts (new file)

✅ SAFER ALTERNATIVES:
1. Soft reset (keeps changes):
   git reset --soft HEAD~3

2. Stash changes first:
   git stash
   git reset --hard HEAD~3

3. Create backup branch:
   git branch backup-$(date +%Y%m%d-%H%M%S)
   git reset --hard HEAD~3

❓ Options:
  [1] Soft reset (keep changes)
  [2] Stash + hard reset
  [3] Create backup branch + hard reset
  [4] Proceed anyway (DANGEROUS)
  [5] Cancel
```

#### `git clean -fd`
**Опасность**: Удаляет untracked files и directories permanently.

**Safety Net Action:**
```markdown
⚠️ DESTRUCTIVE COMMAND DETECTED

Command: git clean -fd

🔴 RISK: Will permanently delete untracked files:

📁 Directories (3):
- node_modules/ (12,450 files) — can be restored via npm install
- .cache/ (234 files)
- temp/ (5 files)

📄 Files (8):
- config.local.json
- debug.log
- test-data.sql
- notes.txt
- .env.backup
- screenshot.png
- draft-email.txt ⚠️ (may contain important content)
- ideas.md ⚠️ (may contain important content)

⚠️ Files that may contain important data are marked

✅ SAFER ALTERNATIVE:
git clean -fdn (dry run - shows what would be deleted)

❓ Options:
  [1] Dry run first (show what will be deleted)
  [2] Exclude *.txt, *.md files
  [3] Proceed (DANGEROUS)
  [4] Cancel
```

### 🔴 Filesystem - Critical

#### `rm -rf`
**Опасность**: Рекурсивное удаление без возможности восстановления.

**Safety Net Action:**
```markdown
⚠️ DESTRUCTIVE COMMAND DETECTED

Command: rm -rf node_modules dist

🔴 RISK: Recursive delete of:

📁 node_modules/ (12,450 files, 450 MB)
  - Can be restored: ✅ npm install

📁 dist/ (234 files, 12 MB)
  - Can be restored: ✅ npm run build
  - ⚠️ May contain uncommitted changes

💾 Backup recommended for: dist/

✅ SAFER ALTERNATIVES:
1. Trash instead of delete (macOS/Linux):
   trash node_modules dist

2. Backup first:
   tar -czf backup-$(date +%Y%m%d).tar.gz dist
   rm -rf node_modules dist

3. Use package manager:
   npm clean-install (removes & reinstalls node_modules)

❓ Options:
  [1] Move to trash
  [2] Backup + delete
  [3] Proceed (DANGEROUS)
  [4] Cancel
```

#### Overwriting files
**Опасность**: Перезапись file без backup.

**Safety Net Action:**
```markdown
⚠️ FILE OVERWRITE DETECTED

Action: Write to existing file
File: src/config/database.ts

🔴 RISK: File will be overwritten
- Current file: 145 lines, last modified 2 days ago
- Current content will be lost (no git commit)
- File contains uncommitted changes

📊 Diff Preview:
  Lines added: 67
  Lines removed: 23
  Net change: +44 lines

⚠️ File has uncommitted changes since last commit

✅ SAFER ALTERNATIVES:
1. Commit current version first:
   git add src/config/database.ts
   git commit -m "Backup before overwrite"

2. Create backup:
   cp src/config/database.ts src/config/database.ts.backup

3. Use Edit tool (preserves history)

❓ Options:
  [1] Commit current version first (RECOMMENDED)
  [2] Create backup file
  [3] Proceed (will lose current content)
  [4] Cancel
```

### 🟠 Database - High Risk

#### `DROP TABLE`
**Опасность**: Удаление database table с данными.

**Safety Net Action:**
```markdown
⚠️ DESTRUCTIVE SQL DETECTED

Command: DROP TABLE users;

🔴 RISK: Table will be permanently deleted
- Table: users
- Rows: ~1,245 records
- Dependencies: 3 foreign keys (deals, contacts, activities)
- Last backup: 12 hours ago

⚠️ Dropping this table will break:
- deals table (foreign key: user_id)
- contacts table (foreign key: owner_id)
- activities table (foreign key: assigned_to)

✅ SAFER ALTERNATIVES:
1. Backup first:
   pg_dump -t users > users_backup.sql
   DROP TABLE users;

2. Soft delete (add deleted_at column)

3. Archive to separate table:
   CREATE TABLE users_archive AS SELECT * FROM users;
   DROP TABLE users;

❓ Options:
  [1] Backup + drop
  [2] Archive + drop
  [3] Proceed (DANGEROUS)
  [4] Cancel
```

### 🟡 Package Management - Medium Risk

#### Uninstalling critical packages
**Опасность**: Удаление package, который используется в коде.

**Safety Net Action:**
```markdown
⚠️ PACKAGE REMOVAL DETECTED

Command: npm uninstall react

🟠 RISK: Package is used in codebase
- Package: react (v18.2.0)
- Imported in: 45 files
- Direct dependency: Yes
- Dependents: 12 other packages depend on react

📦 Files that import react:
- src/App.tsx
- src/components/*.tsx (42 files)
- src/index.tsx
- (and 2 more)

⚠️ Removing react will break the build

✅ SAFER ALTERNATIVES:
1. Check if actually unused:
   npx depcheck

2. Remove unused imports first:
   npx eslint --fix

3. Downgrade instead:
   npm install react@17.0.0

❓ Options:
  [1] Run depcheck first
  [2] Proceed (will break build)
  [3] Cancel
```

## Configuration

### Strict Mode (default)
Блокирует все destructive commands, требует confirmation.

```bash
/safety-net:config --mode strict
```

### Permissive Mode
Показывает warning, но не блокирует.

```bash
/safety-net:config --mode permissive
```

### Custom Whitelist
Разрешить определённые команды без confirmation:

```bash
/safety-net:config --whitelist "git clean -fdn,rm -rf node_modules"
```

### Protected Branches
Дополнительная защита для критичных branches:

```bash
/safety-net:config --protected-branches "main,master,production"
```

## Интеграции

### Git Hooks
Safety Net интегрируется с git hooks:

**.git/hooks/pre-push**:
```bash
#!/bin/bash
# Safety Net: Prevent force push to main
if [[ $(git rev-parse --abbrev-ref HEAD) == "main" ]]; then
  if [[ "$@" == *"--force"* ]] && [[ "$@" != *"--force-with-lease"* ]]; then
    echo "❌ Force push to main blocked by Safety Net"
    echo "Use --force-with-lease instead"
    exit 1
  fi
fi
```

### Pre-commit Hooks
Интеграция с Husky:

```json
{
  "husky": {
    "hooks": {
      "pre-push": "claude /safety-net:check-push"
    }
  }
}
```

## Принципы

- **Prevention > Recovery**: Лучше предотвратить, чем восстанавливать
- **Contextual warnings**: Показывает ЧТО будет удалено/перезаписано
- **Safer alternatives**: Всегда предлагает безопасную альтернативу
- **Non-blocking**: Можно proceed, но с полным пониманием risks
- **Audit trail**: Логирует все blocked commands

## Best Practices

### 1. **Оставь safety net enabled**
По умолчанию — всегда enabled.

### 2. **Read warnings carefully**
Safety Net показывает ЧТО именно будет потеряно.

### 3. **Use safer alternatives**
Если Safety Net предлагает alternative, используй его.

### 4. **Whitelist repetitive safe commands**
Если часто запускаешь `rm -rf node_modules`, добавь в whitelist.

### 5. **Review audit log**
Периодически смотри, какие команды были blocked.

## Примеры

### Prevented force push
```bash
git push --force origin main
# → Safety Net blocks, suggests --force-with-lease
```

### Prevented hard reset
```bash
git reset --hard HEAD~5
# → Safety Net shows what will be lost, offers backup
```

### Prevented file overwrite
```bash
# Claude tries to Write to existing file with uncommitted changes
# → Safety Net suggests git commit first
```

### Whitelisted command
```bash
/safety-net:config --whitelist "rm -rf node_modules"
rm -rf node_modules
# → Executes without warning (whitelisted)
```

## Audit Log

Safety Net ведёт audit log всех blocked commands:

```bash
/safety-net:audit-log
```

**Output:**
```markdown
## Safety Net Audit Log

### 2026-02-21
- **17:30** - Blocked `git push --force origin main` → User chose --force-with-lease ✅
- **15:45** - Blocked `git reset --hard HEAD~3` → User canceled ✅
- **14:20** - Blocked `rm -rf dist` → User chose backup + delete ✅

### 2026-02-20
- **16:10** - Blocked `DROP TABLE users` → User chose backup + drop ✅
- **11:30** - Blocked `git clean -fd` → User chose dry run first ✅

### Statistics (Last 7 Days)
- Commands blocked: 12
- User canceled: 5 (42%)
- User chose safer alternative: 6 (50%)
- User proceeded anyway: 1 (8%)

### Most Blocked Commands
1. git push --force (5 times)
2. git reset --hard (3 times)
3. rm -rf (2 times)
4. git clean -fd (2 times)
```

## Metrics

Safety Net отслеживает:
- **Commands blocked** (total count)
- **Prevented data loss** (estimated lines/files saved)
- **User choices** (cancel vs proceed vs alternative)
- **False positive rate** (blocks that were unnecessary)

Используй `/safety-net:stats` для safety metrics.
