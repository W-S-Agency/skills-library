# Skills Governance — Система управления скиллами

**Цель:** Предотвратить превращение библиотеки в бардак при росте и множественных контрибуторах

**Проблемы которые решаем:**
- ✅ Дублирование скиллов (одинаковые под разными именами)
- ✅ Лишние скиллы (никто не использует)
- ✅ Низкое качество (плохое описание, нет примеров)
- ✅ Несогласованность (разные стили, форматы)

**Owner:** AW (Alexander Wirt)
**Contributors:** Вся команда W&S Agency
**Review Frequency:** Ежеквартально (1 янв, апр, июл, окт)

---

## 🚦 Process: Добавление нового скилла

### 1. Pre-submission Check (перед добавлением)

**Checklist для контрибутора:**
- [ ] **Поиск дубликатов** - проверил SKILLS-INDEX.md, похожий скилл не существует
- [ ] **Название понятное** - описывает что делает скилл (не слишком общее, не слишком узкое)
- [ ] **Категория правильная** - скилл в нужной папке L1-L13
- [ ] **YAML frontmatter заполнен** - name, description, автор (опционально)
- [ ] **Есть примеры использования** - минимум 1 пример
- [ ] **Протестирован** - скилл работает как задумано

### 2. Submission (добавление)

**Через Pull Request (если GitHub workflow):**
```bash
# 1. Создать ветку
git checkout -b add-skill/skill-name

# 2. Добавить скилл
mkdir -p skills/LX-category/skill-name
# Создать SKILL.md

# 3. Проверить валидацию
node scripts/validate-skill.js skills/LX-category/skill-name

# 4. Коммит и PR
git add skills/LX-category/skill-name
git commit -m "feat(skills): add skill-name to LX-category"
git push origin add-skill/skill-name
gh pr create --title "Add skill: skill-name"
```

**Прямое добавление (для быстрых изменений):**
```bash
# Добавить скилл
mkdir -p skills/LX-category/skill-name
# Создать SKILL.md

# Коммит
git add skills/LX-category/skill-name
git commit -m "feat(skills): add skill-name by [NAME]"
git push
```

### 3. Review Process (проверка)

**Reviewer checklist:**
- [ ] Нет дубликатов (checked against SKILLS-INDEX.md)
- [ ] Качественное описание (понятно что делает)
- [ ] Правильная категория (L1-L13)
- [ ] YAML frontmatter корректен
- [ ] Примеры есть и работают
- [ ] Нет конфликтов с существующими скиллами

**Reviewers:**
- AW (обязательно для external skills)
- MT или другие team members (для internal skills)

### 4. Approval & Merge

**Auto-approve (без review):**
- Hotfixes (критические исправления)
- Typos (опечатки)
- Minor updates (небольшие обновления)

**Requires review:**
- Новые скиллы
- Breaking changes
- Изменения в external skills

---

## 🔍 Automatic Checks (автоматизация)

### Deduplication Check Script

**Цель:** Найти дубликаты и похожие скиллы

```javascript
// scripts/check-duplicates.js
const fs = require('fs');
const path = require('path');

// 1. Собрать все скиллы
const skills = getAllSkills('skills/');

// 2. Проверить:
//    - Одинаковые названия
//    - Похожие descriptions (semantic similarity)
//    - Одинаковая функциональность

// 3. Вывести потенциальные дубликаты
console.log('Potential duplicates:');
duplicates.forEach(pair => {
  console.log(`- ${pair.skill1} ↔ ${pair.skill2} (similarity: ${pair.score})`);
});
```

**Запуск:**
```bash
# Еженедельная проверка (каждый понедельник)
node scripts/check-duplicates.js

# Перед добавлением нового скилла
node scripts/check-duplicates.js --skill="new-skill-name"
```

### Usage Tracking Script

**Цель:** Отследить какие скиллы используются, какие нет

```javascript
// scripts/track-usage.js
const fs = require('fs');

// 1. Проанализировать sessions/ папку
//    - Какие скиллы вызывались
//    - Как часто
//    - Последний раз использовались

// 2. Создать отчет
const report = {
  totalSkills: 249,
  used: 180,
  unused: 69,
  lastUsed: { ... },
  topSkills: [ ... ]
};

// 3. Сохранить в reports/usage-YYYY-MM-DD.json
fs.writeFileSync(`reports/usage-${date}.json`, JSON.stringify(report, null, 2));
```

**Запуск:**
```bash
# Ежемесячная проверка (1-го числа)
node scripts/track-usage.js

# Генерация отчета за квартал
node scripts/track-usage.js --period="Q1-2026"
```

### Quality Validation Script

**Цель:** Проверить качество скиллов

```javascript
// scripts/validate-skill.js
const skill = readSkill(skillPath);

const checks = {
  hasYAML: checkYAMLFrontmatter(skill),
  hasDescription: skill.description && skill.description.length > 10,
  hasExamples: skill.content.includes('## Example') || skill.content.includes('## Usage'),
  correctCategory: validateCategory(skillPath),
  noTODOs: !skill.content.includes('TODO') && !skill.content.includes('FIXME')
};

if (Object.values(checks).every(v => v)) {
  console.log('✅ Skill is valid');
} else {
  console.log('❌ Skill has issues:', checks);
}
```

**Запуск:**
```bash
# Валидация одного скилла
node scripts/validate-skill.js skills/L5-quality-assurance/kritik

# Валидация всех скиллов
node scripts/validate-all-skills.js
```

---

## 🗑️ Cleanup Process (очистка)

### Quarterly Cleanup (ежеквартальный)

**Когда:** 1 января, 1 апреля, 1 июля, 1 октября
**Кто:** AW + team review session

**Процесс:**

**1. Analyze Usage (анализ использования)**
```bash
# Генерация отчета за последние 3 месяца
node scripts/track-usage.js --period="last-3-months"

# Результат: список скиллов с 0 использований
```

**2. Review Zero-Usage Skills (проверка неиспользуемых)**
```
Критерии для архивации:
- 0 использований за последние 3 месяца
- Дублирует функциональность другого скилла
- Устарел (технология больше не используется)
- Низкое качество (нет примеров, плохое описание)
```

**3. Decision Matrix**

| Критерий | Action |
|----------|--------|
| 0 usage + дубликат | Archive (переместить в archive/) |
| 0 usage + уникальный функционал | Keep (оставить) |
| Low quality + unused | Delete (удалить) |
| Low quality + used | Improve (улучшить) |

**4. Archive Process**
```bash
# Переместить в archive/
mkdir -p archive/YYYY-QX/
mv skills/LX-category/skill-name archive/YYYY-QX/

# Коммит
git add archive/ skills/
git commit -m "chore: archive unused skills (YYYY-QX cleanup)"
```

**5. Update Documentation**
```bash
# Обновить SKILLS-INDEX.md
# Удалить архивированные скиллы

# Обновить CHANGELOG
# Добавить секцию "Archived Skills"
```

---

## 📝 Templates & Standards

### Skill Template (шаблон для новых скиллов)

**Минимальный SKILL.md:**
```markdown
---
name: Skill Name
description: Short one-line description (max 100 chars)
author: Your Name (optional)
created: YYYY-MM-DD
---

# Skill Name

Brief description of what this skill does.

## When to Use

- Use case 1
- Use case 2
- Use case 3

## Usage

\`\`\`
[skill:skill-name]
Your input here
\`\`\`

## Example

**Input:**
\`\`\`
[skill:skill-name]
Example input
\`\`\`

**Output:**
\`\`\`
Expected output
\`\`\`

## Related Skills

- [related-skill-1](../related-skill-1/SKILL.md)
- [related-skill-2](../related-skill-2/SKILL.md)
```

### Naming Conventions

**Good names:**
- ✅ `seo-audit` - понятно что делает
- ✅ `figma-handoff` - понятно что делает
- ✅ `wordpress-maintenance` - понятно что делает

**Bad names:**
- ❌ `helper` - слишком общее
- ❌ `tool` - непонятно
- ❌ `my-skill` - персональное, не описательное

### Category Guidelines

| Category | When to use |
|----------|-------------|
| L1-documentation | Создание/управление документацией |
| L2-scope-decomposition | Разбивка проектов на Epic/Stories |
| L3-task-management | Управление задачами |
| L4-story-execution | Выполнение Stories/Tasks |
| L5-quality-assurance | QA, тестирование, проверка качества |
| L6-devops-bootstrap | DevOps setup, CI/CD, Docker |
| L7-research | Исследование, поиск информации |
| L8-marketing | Маркетинг, SEO, CRO, контент |
| L9-platform | Платформа-специфичные скиллы |
| L10-document-automation | Генерация документов (Word, Excel, PDF) |
| L11-dev-tools | Developer tools и utilities |
| L12-memory-knowledge | Работа с памятью и знаниями |
| L13-automation-agents | Агенты автоматизации |

---

## 🎯 Quality Metrics

### Target Metrics (цели качества)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Skills with examples | 100% | TBD | ⏳ |
| Duplicate rate | <5% | TBD | ⏳ |
| Unused skills (3mo) | <10% | TBD | ⏳ |
| YAML coverage | 100% | TBD | ⏳ |
| Validation pass rate | 100% | TBD | ⏳ |

---

## 🔄 Integration with ws-workspace-product

**Roadmap integration:**
- Q2 2026: Skills governance automation scripts
- Q3 2026: Usage tracking система
- Q4 2026: Quarterly cleanup process established

**Tools:**
- `/pcm` - Project management
- `scripts/check-duplicates.js` - Deduplication
- `scripts/track-usage.js` - Usage tracking
- `scripts/validate-skill.js` - Quality validation

---

## 📊 Reports

### Monthly Report Template

```markdown
# Skills Library Report - YYYY-MM

## Summary
- Total skills: XXX
- New skills added: XX
- Skills archived: XX
- Usage rate: XX%

## Top 10 Most Used
1. skill-name (XX uses)
2. ...

## Unused Skills (3+ months)
- skill-name (last used: YYYY-MM-DD)
- ...

## Quality Issues
- XX skills missing examples
- XX skills without YAML frontmatter
- XX potential duplicates

## Actions Taken
- [ ] Archived XX skills
- [ ] Merged XX duplicates
- [ ] Improved XX low-quality skills
```

---

## 🔗 Links

- [SKILLS-INDEX.md](C:\Users\alexa\.ws-workspace\workspaces\my-workspace\SKILLS-INDEX.md) - Full skills index
- [UPSTREAM-SOURCES.md](UPSTREAM-SOURCES.md) - External sources tracking
- [CUSTOMIZATIONS.md](CUSTOMIZATIONS.md) - Customizations documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

---

**Maintained by:** AW (Alexander Wirt)
**Last update:** 2026-03-07
**Next review:** 2026-04-01 (Q2 cleanup)
