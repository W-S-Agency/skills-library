---
name: "Firecrawl"
description: "Web scraping, crawling, search, sitemap generation — превращает websites в clean LLM-ready data"
---

# Firecrawl Skill

Мощный web scraping и crawling agent на базе Firecrawl. Извлекает данные с websites и конвертирует в clean, LLM-ready markdown/JSON.

**Ключевая фича**: Не просто scraping HTML — интеллектуальная экстракция контента с удалением ads, navigation, footers.

## Команды

### `/firecrawl:scrape`
Scrape одной страницы:

```bash
/firecrawl:scrape "https://example.com/article"
```

**Извлекает:**
- 📄 Clean markdown content (без ads, navigation)
- 🖼️ Images (URLs)
- 🔗 Links (internal/external)
- 📊 Metadata (title, description, author, publish date)

**Output:**
```markdown
## Scraped: How to Build a CRM System

**URL**: https://example.com/article/how-to-build-crm
**Title**: How to Build a CRM System from Scratch
**Author**: John Doe
**Published**: 2026-02-15
**Word Count**: 2,340

---

# How to Build a CRM System from Scratch

Building a Customer Relationship Management (CRM) system requires careful planning...

[clean article content in markdown]

## Key Takeaways
- Start with a clear data model
- Prioritize user experience
- Integrate with existing tools

---

**Images**:
- https://example.com/images/crm-dashboard.png (Dashboard screenshot)
- https://example.com/images/data-model.png (Database schema diagram)

**Links** (15 total):
- [Related: CRM Best Practices](https://example.com/best-practices)
- [Tool: HubSpot](https://hubspot.com)
- [Documentation: Salesforce API](https://developer.salesforce.com)

**Metadata**:
- Category: Software Development
- Tags: CRM, SaaS, Database Design
- Reading Time: 12 minutes
```

**Saved to:**
- `data/scraped/example-com-article-how-to-build-crm.md`

### `/firecrawl:crawl`
Crawl всего website (несколько страниц):

```bash
/firecrawl:crawl "https://example.com" --max-pages 50 --match "/blog/*"
```

**Параметры:**
- `--max-pages` — максимум страниц для crawl (default: 100)
- `--match` — URL pattern для включения (e.g., `/blog/*`, `/docs/*`)
- `--exclude` — URL pattern для исключения (e.g., `/admin/*`, `/login`)
- `--depth` — глубина crawling (default: 3)

**Workflow:**
1. 🔍 Discovers all URLs на сайте
2. 🎯 Фильтрует по match/exclude patterns
3. 📄 Scrapes каждую страницу (до max-pages limit)
4. 📊 Генерирует index всех страниц

**Output:**
```markdown
## Crawl Complete: example.com/blog

**Base URL**: https://example.com
**Pages Crawled**: 42/50
**Total Links Found**: 856
**Duration**: 2m 34s

---

### Pages by Category

#### Blog Posts (28 pages)
1. [How to Build a CRM](./example-com-blog-how-to-build-crm.md) — 2,340 words
2. [Top 10 CRM Features](./example-com-blog-top-10-crm-features.md) — 1,820 words
3. [CRM Integration Guide](./example-com-blog-crm-integration-guide.md) — 3,100 words
... (25 more)

#### Documentation (12 pages)
1. [API Overview](./example-com-docs-api-overview.md) — 890 words
2. [Authentication](./example-com-docs-authentication.md) — 1,240 words
... (10 more)

#### Product Pages (2 pages)
1. [Pricing](./example-com-pricing.md) — 450 words
2. [Features](./example-com-features.md) — 670 words

---

### Content Analysis

**Total Words**: 58,920 words
**Avg Words/Page**: 1,403 words
**Longest Page**: CRM Integration Guide (3,100 words)
**Shortest Page**: Pricing (450 words)

**Topics Detected** (via keyword extraction):
- CRM (mentioned 234 times across 28 pages)
- Integration (mentioned 89 times across 15 pages)
- API (mentioned 67 times across 12 pages)
- Automation (mentioned 45 times across 10 pages)

**Images**: 124 total
**External Links**: 234 (87 unique domains)

---

### Use Cases

**1. Knowledge Base Indexing**
All content saved to `data/scraped/example-com/` — ready for RAG/semantic search.

**2. Competitive Analysis**
Analyze competitor content strategy, topics, depth.

**3. Content Migration**
Migrate content from old site to new CMS.

**4. SEO Analysis**
Analyze content structure, internal linking, keyword usage.
```

**Saved to:**
- `data/scraped/example-com/` (directory with all pages)
- `data/scraped/example-com/index.json` (structured index)

### `/firecrawl:search`
Поиск по интернету с scraping результатов:

```bash
/firecrawl:search "best CRM software for SMB 2026"
```

**Workflow:**
1. 🔍 Выполняет web search (Google/Bing)
2. 📄 Scrapes top 10 результатов
3. 📊 Извлекает ключевые insights
4. 🎯 Генерирует summary

**Output:**
```markdown
## Search Results: "best CRM software for SMB 2026"

**Query**: best CRM software for SMB 2026
**Results Scraped**: 10 pages
**Sources**: G2, Capterra, TechCrunch, Forbes, Software Advice

---

### Top Recommendations

#### 1. HubSpot CRM
**Mentioned**: 8/10 sources
**Avg Rating**: 4.4/5
**Price**: Free - $1,200/mo
**Key Features**:
- Free tier available
- Easy to use
- Strong email integration
- Marketing automation

**Pros** (from reviews):
- "Best free CRM" (G2)
- "Intuitive interface" (Capterra)
- "Great for startups" (TechCrunch)

**Cons**:
- "Expensive at higher tiers" (Forbes)
- "Limited customization" (Software Advice)

**Sources**:
- [G2: Best CRM 2026](./scraped/g2-best-crm-2026.md)
- [Capterra: Top 10 CRM](./scraped/capterra-top-10-crm.md)
- [TechCrunch: CRM Roundup](./scraped/techcrunch-crm-roundup.md)

---

#### 2. Pipedrive
**Mentioned**: 7/10 sources
**Avg Rating**: 4.2/5
**Price**: €14 - €99/user/mo
**Key Features**:
- Sales-focused
- Visual pipeline
- Mobile app
- Affordable

**Pros**:
- "Great for sales teams" (G2)
- "Simple and effective" (Capterra)

**Cons**:
- "Limited marketing features" (Forbes)
- "No free tier" (Software Advice)

---

### Summary

**Consensus**: HubSpot (#1) and Pipedrive (#2) are top choices for SMB in 2026.

**Key Trends**:
- Free tiers becoming standard
- AI features emerging (7/10 mentioned AI-powered insights)
- Mobile-first design critical
- Integration with existing tools (Slack, Gmail) expected

**Price Range**: €0 - €150/user/month (median: €49/user/mo)

---

### All Sources (10 pages scraped)
1. [G2: Best CRM Software 2026](./scraped/g2-best-crm-2026.md)
2. [Capterra: Top 10 CRM for SMB](./scraped/capterra-top-10-crm-smb.md)
3. [TechCrunch: CRM Market Roundup](./scraped/techcrunch-crm-roundup.md)
4. [Forbes: Enterprise Software Guide](./scraped/forbes-enterprise-software.md)
5. [Software Advice: CRM Buyer's Guide](./scraped/software-advice-crm-guide.md)
... (5 more)
```

### `/firecrawl:map`
Генерирует sitemap (список всех URLs на сайте):

```bash
/firecrawl:map "https://example.com"
```

**Output:**
```markdown
## Sitemap: example.com

**Base URL**: https://example.com
**Total URLs**: 156
**Discovery Time**: 34s

---

### URL Structure

#### / (Homepage)
- / (1 page)

#### /blog (Blog)
- /blog/ (index)
- /blog/how-to-build-crm (post)
- /blog/top-10-crm-features (post)
... (28 total)

#### /docs (Documentation)
- /docs/ (index)
- /docs/api-overview (page)
- /docs/authentication (page)
... (12 total)

#### /product (Product Pages)
- /product/pricing (page)
- /product/features (page)
- /product/integrations (page)
... (5 total)

#### /about (Company)
- /about/ (page)
- /about/team (page)
- /about/careers (page)
... (4 total)

---

### Full URL List (JSON)
```json
{
  "urls": [
    {
      "url": "https://example.com/",
      "depth": 0,
      "status": 200
    },
    {
      "url": "https://example.com/blog/",
      "depth": 1,
      "status": 200
    },
    ...
  ],
  "total": 156,
  "crawled_at": "2026-02-21T17:50:00Z"
}
```

**Saved to:**
- `data/sitemaps/example-com-sitemap.json`
```

## Advanced Features

### Structured Data Extraction

Извлекай structured data из страниц:

```bash
/firecrawl:scrape "https://example.com/products" --extract "products"
```

**Schema:**
```json
{
  "schema": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "name": "string",
        "price": "number",
        "description": "string",
        "image": "string",
        "rating": "number"
      }
    }
  }
}
```

**Output:**
```json
{
  "products": [
    {
      "name": "CRM Pro",
      "price": 49.99,
      "description": "Professional CRM for small teams",
      "image": "https://example.com/images/crm-pro.png",
      "rating": 4.5
    },
    {
      "name": "CRM Enterprise",
      "price": 199.99,
      "description": "Enterprise-grade CRM solution",
      "image": "https://example.com/images/crm-enterprise.png",
      "rating": 4.8
    }
  ]
}
```

### JavaScript Rendering

Для SPA (Single Page Applications):

```bash
/firecrawl:scrape "https://react-app.com" --wait-for ".content-loaded"
```

Firecrawl выполняет JavaScript и ждёт, пока контент загрузится.

### Rate Limiting & Politeness

```bash
/firecrawl:crawl "https://example.com" --delay 2000 --max-concurrent 3
```

**Параметры:**
- `--delay` — задержка между запросами (ms)
- `--max-concurrent` — максимум параллельных запросов
- `--user-agent` — custom User-Agent
- `--respect-robots-txt` — следовать robots.txt (default: true)

## Интеграции

### Apify (optional)
Если нужен advanced scraping (proxies, CAPTCHA solving):

```bash
/firecrawl:scrape "https://protected-site.com" --use-apify
```

### Data Export
Экспорт scraped data:

```bash
/firecrawl:export "data/scraped/example-com/" --format json
```

**Форматы:**
- `markdown` — clean markdown files
- `json` — structured JSON
- `csv` — tabular data (if structured extraction)

### Knowledge Base
Автоматическое добавление в knowledge base:

```bash
/firecrawl:crawl "https://docs.example.com" --save-to notion --database "Documentation"
```

## Use Cases

### 1. Competitive Analysis
```bash
/firecrawl:crawl "https://competitor.com" --match "/blog/*"
# → Analyze competitor content strategy
```

### 2. Content Migration
```bash
/firecrawl:crawl "https://old-site.com" --max-pages 500
# → Migrate content to new CMS
```

### 3. Market Research
```bash
/firecrawl:search "CRM market trends 2026"
# → Synthesize insights from top 10 sources
```

### 4. Knowledge Base Building
```bash
/firecrawl:crawl "https://docs.stripe.com" --match "/docs/*"
# → Build internal knowledge base for Stripe API
```

### 5. SEO Analysis
```bash
/firecrawl:map "https://my-site.com"
# → Analyze site structure, internal linking
```

## Принципы

- **Clean extraction**: Удаляет ads, navigation, footers — только контент
- **LLM-ready**: Markdown format, готовый для RAG/semantic search
- **Respectful crawling**: Следует robots.txt, rate limits
- **Structured output**: JSON/CSV для structured data extraction
- **Scalable**: Может crawl hundreds of pages

## Best Practices

### 1. **Start with /firecrawl:map**
Понять структуру сайта перед full crawl.

### 2. **Use match/exclude patterns**
Crawl только нужные разделы (`/docs/*`, `/blog/*`).

### 3. **Respect rate limits**
Используй `--delay` для politeness.

### 4. **Extract structured data when possible**
Если сайт имеет структуру (products, articles), используй `--extract`.

### 5. **Monitor crawl progress**
Для large sites используй `/hud --watch` для tracking progress.

## Примеры

### Scrape competitor blog
```bash
/firecrawl:crawl "https://competitor.com" --match "/blog/*" --max-pages 50
```

### Market research
```bash
/firecrawl:search "AI-powered CRM 2026 trends"
```

### Documentation scraping
```bash
/firecrawl:crawl "https://docs.openai.com" --match "/docs/*"
```

### Product data extraction
```bash
/firecrawl:scrape "https://shop.example.com/products" --extract "products"
```

## Метрики

Firecrawl отслеживает:
- **Pages scraped** (total count)
- **Data quality** (clean content vs noise ratio)
- **Crawl speed** (pages per minute)
- **Success rate** (successful scrapes vs failures)

Используй `/firecrawl:stats` для scraping metrics.
