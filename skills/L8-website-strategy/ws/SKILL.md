---
name: "Website Strategist"
description: "Website strategy research & planning — MODE1-4 pipeline с прямым вызовом Apify, browser-agent, Semrush"
alwaysAllow: ["Write", "Read", "Edit", "Bash"]
requiredSources:
  - apify
  - browser-agent
---

# Website Strategist v2.0

Адаптация CustomGPT Website Strategist v1.8.5 для WS Workspace. Все внешние инструменты вызываются напрямую через MCP sources вместо генерации JSON-задач для ручного копирования.

## Ключевое изменение

| v1.8.5 (ChatGPT) | v2.0 (WS Workspace) |
|---|---|
| JSON → ручное копирование в Manus/Apify | Прямые API вызовы через MCP sources |
| Ручной сбор результатов | Авто-сохранение в data/ проекта |
| Контекст в ChatGPT Project | Контекст через `/pcm` |

## Prerequisite

Перед использованием `/ws` выполни `/pcm init` — проект должен иметь структуру docs/ + .ai/.

## Команды

| Аргумент | Действие |
|----------|----------|
| `init` | Project Init Gate: настройки + парсинг Kundenbrief |
| `mode1` | MODE 1: Competitive Research (6 STEPs) |
| `mode2` | MODE 2: Fact Pack Composer |
| `mode3` | MODE 3: Strategic Blueprint (клиентский) |
| `mode4` | MODE 4: Internal Spec (технический) |
| `status` | Текущий прогресс MODE/STEP |

Примеры: `/ws init`, `/ws mode1`, `/ws mode3`, `/ws status`

---

## Orchestration Protocol

### MODE State Machine
```
MODE-INIT → MODE-EXECUTION → MODE-EXIT
```
- Каждый MODE имеет статус: `DRAFT` / `READY` / `FAIL`
- Предыдущий MODE должен быть READY перед следующим
- Pipeline строго последовательный: 1 → 2 → 3 → 4

### Global Naming
Все файлы: `{project_slug}_MODE{n}_{ARTIFACT_NAME}.{ext}`

### Anti-bloat лимиты
- Конкуренты: max 15 доменов
- Ключевые слова/кластеры: max 30
- Контент-краул: max 50 страниц (Tier-1), max 100 (Tier-2)
- Trust audit: max 10 сайтов
- **Только факты из исследований — никаких придуманных данных**

### Структура вывода
```
PROJECT_ROOT/data/
├── mode1/    # Competitive Research
├── mode2/    # Fact Pack
├── mode3/    # Strategic Blueprint
└── mode4/    # Internal Spec
```

---

## /ws init — Project Init Gate

1. Найди Kundenbrief в `materials/` папке
2. Извлеки: client_name, project_type, primary_service, geo_focus, target_audience, seed_keywords
3. Обнови `.ai/context.json` с настройками проекта
4. Спроси язык для MODE 3-4: DE (немецкий) или RU (русский). По умолчанию: DE
5. Покажи настройки и подтверди перед продолжением

---

## /ws mode1 — Competitive Research

6 последовательных STEPs. Каждый STEP завершается до начала следующего.

### STEP 1: Competitor Discovery

**Tool:** browser-agent (fallback: WebSearch)
**Input:** seed_keywords + geo_focus из `.ai/context.json`

**Действия:**
1. Поиск Google по каждому seed keyword (топ-20 результатов)
2. Извлечь: домены конкурентов, лексикон услуг, кластеры ключевых слов
3. Категоризация: direct_competitors (тот же сервис+гео), indirect, aggregators
4. Определить key_urls (главные страницы конкурентов)

**Output:** `data/mode1/{project}_MODE1_COMPETITOR_FIRST.json`
**Quality Gate:** min 5 конкурентов, min 10 ключевых слов, min 3 кластера

### STEP 2A: Google Maps Data

**Tool:** apify source → `compass/crawler-google-places`
**Input:** seed_keywords + geo_focus

**Действия:**
1. Конфиг Apify актора:
   - searchStringsArray: seed_keywords (max 10)
   - locationQuery: geo_focus
   - maxCrawledPlacesPerSearch: 20
   - language: "de" (или язык проекта)
2. Запуск актора через Apify MCP source
3. Извлечь: бизнесы, рейтинги, кол-во отзывов, категории, адреса

**Output:** `data/mode1/{project}_MODE1_APIFY_MAPS_SUPPLY.json`
**Quality Gate:** min 10 бизнесов найдено

### STEP 2B: Content Crawl

**Tool:** apify source → `apify/website-content-crawler`

**Tier-1 (Deep) — Top 5 конкурентов:**
- crawlerType: `playwright:adaptive`
- maxCrawlPages: 10 per domain (50 total max)
- Извлечь: заголовки, метаданные, структура контента

**Tier-2 (Shallow) — Next 10 конкурентов:**
- crawlerType: `cheerio`
- maxCrawlPages: 5 per domain (50 total max)
- Извлечь: заголовки, URL, базовая структура

**Output Tier-1:** `data/mode1/{project}_MODE1_APIFY_CONTENT_FULL_TOP.json`
**Output Tier-2:** `data/mode1/{project}_MODE1_APIFY_CONTENT_SHALLOW.json`
**Quality Gate:** min 3 домена успешно просканированы

### STEP 2C: Semrush Analysis

**Tool:** `/sr` skill (semrush-report)
**Input:** домены конкурентов + seed_keywords

**Действия:**
1. Вызвать `/sr` с топ доменами и ключевыми словами
2. Извлечь: органические ключевые слова, трафик, сложность, SERP features

**Output:** `data/mode1/{project}_MODE1_SEMRUSH_DATA.json`
**Quality Gate:** данные получены для min 3 доменов

### STEP 3: Trust Audit

**Tool:** browser-agent
**Input:** топ 10 доменов из STEP 1

**Действия:**
1. Посетить homepage + about + service page каждого конкурента
2. Аудит trust-элементов:
   - Сертификаты/бейджи (TUV, ISO и т.д.)
   - Отзывы (количество, с фото/именами?)
   - Кейсы (количество, детальность)
   - Команда (реальные фото?)
   - Гарантии
   - Полнота контактов
   - Социальные доказательства (лого партнёров, упоминания в прессе)
3. Оценка каждого конкурента: trust_score 1-10

**Output:** `data/mode1/{project}_MODE1_TRUST_AUDIT.json`
**Quality Gate:** min 5 конкурентов проверено

### MODE 1 Summary

После завершения всех STEPs:
1. Сгенерировать `data/mode1/{project}_MODE1_SUMMARY.md`:
   - Обзор рынка (1 параграф)
   - Таблица топ-5 конкурентов (домен, сильные/слабые стороны, trust_score)
   - Кластеры ключевых слов
   - Ключевые находки (5-7 пунктов)
   - Gaps и возможности (3-5 пунктов)
2. Выполнить `/pcm update "MODE 1 Competitive Research completed"`
3. Установить MODE 1 → READY

---

## /ws mode2 — Fact Pack Composer

**Input:** ВСЕ выходные файлы MODE 1 + materials/Kundenbrief
**Output:**
- `data/mode2/{project}_FACT_PACK.json` (FACT_PACK_V3 schema)
- `data/mode2/{project}_FACT_PACK.md` (человекочитаемая версия)
- `data/mode2/{project}_MODE2_SUMMARY.md`

### FACT_PACK_V3 Schema

```json
{
  "meta": { "project", "date", "version", "sources_used" },
  "market_map": { "competitors", "market_size", "trends" },
  "semrush": { "clusters", "keyword_data" },
  "competitor_content": { "patterns", "content_types", "gaps" },
  "trust_signals": { "by_competitor", "best_practices" },
  "serp_snapshot": { "top_results", "serp_features" },
  "geo_ki_seo": { "local_signals", "geo_keywords" },
  "positioning_gaps": { "underserved_topics", "content_opportunities" },
  "content_blueprint": { "recommended_pages", "priority_topics" }
}
```

### Правила
- ТОЛЬКО данные из MODE 1 — никакого дополнительного browsing
- Перекрёстные ссылки между источниками
- Явная маркировка проблем качества данных
- Ссылка на источник для каждого утверждения

После завершения → `/pcm update "MODE 2 Fact Pack completed"` → MODE 2 = READY

---

## /ws mode3 — Strategic Blueprint

**Input:** FACT_PACK + Kundenbrief
**Output:**
- `data/mode3/{project}_Strategic_Blueprint_MODE3.md`
- `data/mode3/{project}_MODE3_SUMMARY.md`

**Язык:** определяется при `/ws init` (DE или RU)

### 11 обязательных секций
1. Executive Summary (max 1 страница)
2. Market Analysis (из FACT_PACK.market_map)
3. Competitor Landscape (топ 5 профилей)
4. Target Audience & Personas
5. Positioning Strategy (USP, отличия)
6. Keyword Strategy (кластеры, приоритеты)
7. Content Strategy (типы страниц, темы, форматы)
8. Technical SEO Recommendations
9. Trust & Conversion Optimization
10. Implementation Roadmap (фазы, приоритеты)
11. Draft Text Blocks (заголовок + вступление для ключевых страниц)

### Правила
- **Клиентский документ** — без перегрузки техническим жаргоном
- Каждая секция: проблема → инсайт → рекомендация → ожидаемый эффект
- Все утверждения подкреплены данными из FACT_PACK

После завершения → предложить `/pcm client "blueprint"` для генерации брендированного .docx

---

## /ws mode4 — Internal Spec

**Input:** FACT_PACK + Strategic Blueprint
**Output:**
- `data/mode4/{project}_MODE4_INTERNAL_SPEC.md`
- `data/mode4/{project}_MODE4_SUMMARY.md`

### 11 обязательных секций
1. Summary & Scope
2. Information Architecture (карта сайта, навигация)
3. Page Templates & Components
4. SEO Implementation Details (технические спецификации)
5. Content Production Plan (copy briefs per page)
6. Design Direction (настроение, референсы, UX паттерны)
7. Technical Requirements (стек, производительность, интеграции)
8. Analytics & Tracking Setup
9. Launch Checklist
10. Maintenance & Growth Plan
11. Deliverables Checklist (с ответственными)

**Целевая аудитория:** Design, Copy, SEO, Dev, PM — глубокая техническая спецификация.

После завершения → `/pcm update "MODE 4 Internal Spec completed"` → Pipeline DONE

---

## /ws status

Показать текущий прогресс:
- Текущий MODE (1-4) и STEP (если MODE 1)
- Статус каждого MODE (DRAFT / READY / FAIL)
- Следующее действие
- Сгенерированные файлы

---

## Reference Files

Для работы скилла нужны следующие материалы (поместить в `materials/` папку проекта):
- `Kundenbrief.md` / `Kundenbrief.docx` — Бриф клиента (название, услуги, гео, целевая аудитория)
- `FACT_PACK_V3_SCHEMA.json` — JSON схема для MODE 2 (опционально — схема встроена выше)
- `APIFY_REFERENCE.md` — Конфиги Apify акторов (опционально)

## Prerequisites

Необходимые MCP sources в WS Workspace:
- `apify` — Apify API для `compass/crawler-google-places` и `apify/website-content-crawler`
- `browser-agent` — Браузерная автоматизация для конкурентного анализа

Необходимые скиллы:
- `/pcm` — Project Context Manager (должен быть инициализирован до `/ws`)
