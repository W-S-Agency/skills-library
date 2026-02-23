# Semrush Report Skill - Quick Start

## 🚀 Быстрый старт

### Использование

```bash
/semrush-report <keyword>
```

**Примеры:**
```bash
/semrush-report Leuchtreklame berlin
/semrush-report iPhone 15 Pro
/semrush-report beste CRM software
```

## 📦 Что получите

1. **Ключевые метрики**
   - Search Volume (месячный объем)
   - Keyword Difficulty (сложность 1-100)
   - CPC (цена клика)
   - Search Intent (коммерческий/информационный)
   - Competition Density

2. **TOP-10 SERP анализ**
   - Позиция
   - Домен
   - Authority Score
   - Backlinks
   - Estimated Traffic
   - SERP Features

3. **Keyword Variations**
   - Связанные запросы
   - Общий search volume
   - Keyword clusters

4. **SEO Recommendations**
   - Оценка сложности входа
   - Профиль победителей
   - Action plan
   - ROI прогноз

5. **Визуализация**
   - Mermaid диаграммы
   - Скриншоты из Semrush
   - Таблицы с метриками

## 🔧 Технические детали

### Credentials
Хранятся в: `~/.craft-agent/workspaces/my-workspace/config/semrush-credentials.json`

**⚠️ Readonly режим:**
- ✅ Чтение SERP данных
- ❌ Изменение тарифа
- ❌ Покупки

### Автоматизация
- **Tool:** Playwright (Node.js)
- **Browser:** Chromium (visible mode)
- **Process:**
  1. Auto-login в Semrush
  2. Navigate to Keyword Overview
  3. Extract metrics + SERP data
  4. Generate comprehensive report

### Output Files
- `semrush-data.json` - Raw extracted data
- `semrush-results.png` - Full page screenshot
- Markdown report - Отформатированный анализ

## 📊 Пример результата

**Keyword:** "Leuchtreklame berlin"

```
Search Volume: 110/месяц (Germany)
Keyword Difficulty: 29% (🟢 Легко)
CPC: €4.11 (💰 Высокий)
Intent: Commercial 100%
Organic Value: €5,424/год

TOP-3 Конкуренты:
1. altay-werbung.de (AS: 8, Backlinks: 133)
2. grafikhane.de (AS: 20, Backlinks: 212)
3. behrendt-werbetechnik.de (AS: 21, Backlinks: 366)

Рекомендация: ✅ ЗЕЛЕНЫЙ СВЕТ
- Низкая конкуренция
- Высокая коммерческая ценность
- Возможность войти в TOP-5 за 2-3 месяца
```

## 🎯 Use Cases

### 1. Niche Research
Найти прибыльные low-competition ключевые слова

**Фильтры:**
- KD < 40 (легко ранкиться)
- CPC > €2 (коммерческая ценность)
- Volume > 50 (достаточный спрос)

### 2. Competitor Analysis
Понять профиль победителей в SERP

**Анализ:**
- Средний Authority Score TOP-10
- Backlink профиль
- SERP Features (Sitelinks, Images)
- Traffic распределение

### 3. Content Strategy
Создать data-driven контент-план

**Output:**
- Keyword clusters
- Search intent распределение
- Related keywords для внутренней перелинковки

### 4. SEO Opportunity Score
Оценить быстрые победы

**Формула:**
```
Score = (High CPC + Low KD) / Competition
```

## 🔄 Workflow Integration

```mermaid
graph LR
    A[Keyword Research] --> B[/semrush-report]
    B --> C[Detailed Analysis]
    C --> D{Decision}
    D -->|Go| E[Create Content]
    D -->|No-Go| A
    E --> F[Build Backlinks]
    F --> G[Monitor Positions]
```

## 📚 Related Skills

- **content-creator** - Создать SEO-оптимизированный контент на основе insights
- **backlink-finder** - Найти возможности для линкбилдинга
- **competitor-analyzer** - Глубокий анализ конкретного конкурента

## 🐛 Troubleshooting

### Browser не открывается
```bash
cd scripts
npm install playwright
npx playwright install chromium
```

### Login failed
- Браузер откроется на 45 секунд
- Залогиньтесь вручную
- Скрипт продолжит автоматически

### Metrics not extracted
- Откройте `semrush-results.png`
- Проверьте, загрузились ли данные
- Возможно, Semrush изменил HTML структуру

## 📖 Документация

Полная документация: [SKILL.md](./SKILL.md)

---

**Version:** 1.0
**Last Updated:** 2026-02-05
