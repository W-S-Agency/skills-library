---
name: site-audit
version: 3.0.0
description: Полный профессиональный аудит клиентских веб-сайтов — показать что НЕ ТАК, ВОЗМОЖНОСТИ для роста, конкретные рекомендации. Technical SEO, Performance, WCAG 2.1 AA, BITV 2.0/BFSG, Core Web Vitals 2026, Google Consent Mode V2, Schema.org, AI Search (AEO), Analytics, UX. Автономная работа через browser-agent, responsive-validator, seo-audit, SEMrush.
icon: 🔍
---

# Site Audit v3.0 — Complete Professional Website Audit

**Orchestrator Skill** — использует existing skills и sources, НЕ дублирует функциональность.

## 🎯 **ЦЕЛЬ АУДИТА:**

1. ✅ Показать клиенту **ЧТО НЕ ТАК** (проблемы, ошибки)
2. ✅ Показать **ВОЗМОЖНОСТИ** для улучшения (точки роста)
3. ✅ Дать **КОНКРЕТНЫЕ РЕКОМЕНДАЦИИ** (что делать)
4. ✅ Показать **КОМПЕТЕНТНОСТЬ** (expertise, authority)
5. ✅ Создать основание для дальнейшей работы (переделка/новый сайт)

## 🚨 **КРИТИЧЕСКИЕ ПРАВИЛА:**

### ✅ **ОБЯЗАТЕЛЬНЫЕ PREREQUISITES:**
- ⚠️ **browser-agent ДОЛЖЕН быть подключен!**
- ⚠️ **БЕЗ browser-agent → STOP! НЕ продолжать!**
- ⚠️ **Fallback на WebFetch/Bash = НЕКАЧЕСТВЕННЫЙ результат!**
- ⚠️ **Пользователь хочет ПРОФЕССИОНАЛЬНЫЙ аудит!**

### ✅ **Автономная работа:**
- Выполнять ВСЕ модули подряд БЕЗ остановок (если prerequisites OK!)
- НЕ спрашивать разрешения между этапами
- Если browser-agent команда не работает → зафиксировать limitation, но продолжать
- Если browser-agent совсем НЕ подключен → STOP EXECUTION

### ⚠️ **Browser-Agent Best Practices:**
- **SEQUENTIAL CALLS ONLY** — НЕ делать параллельные вызовы!
- Один failed call убивает все sibling calls
- Всегда ждать результата перед следующим вызовом
- `browser_extract` >> `browser_execute_js` (более надежен!)
- `browser_screenshot` optional — если fails, продолжать

### ✅ **Фокус ТОЛЬКО на сайте клиента:**
- НЕ делать глубокий анализ конкурентов (есть отдельный skill)
- Из SEMrush брать только список конкурентов (minimal)
- Все данные — про ЭТОТ сайт

### ✅ **Использовать existing skills:**
- `responsive-validator` для адаптивности и WCAG
- `seo-audit` для technical SEO
- НЕ дублировать их функциональность!

---

## 📊 **СТРУКТУРА АУДИТА (9 МОДУЛЕЙ)**

### **MODULE 1: TECHNICAL FOUNDATION**
### **MODULE 2: PERFORMANCE DEEP DIVE**
### **MODULE 3: SEO ANALYSIS**
### **MODULE 4: STRUCTURED DATA & AI SEARCH**
### **MODULE 5: ANALYTICS & TRACKING**
### **MODULE 6: UX & CONVERSION**
### **MODULE 7: CONTENT AUDIT (БАЗОВЫЙ)**
### **MODULE 8: COMPLIANCE 2026**
### **MODULE 9: MASTER REPORT**

---

## 🔧 **ИНСТРУМЕНТЫ:**

### **Existing Skills:**
- `responsive-validator` → адаптивность, multi-browser, WCAG
- `seo-audit` → technical SEO, on-page

### **Sources:**
- `browser-agent` → live-проверки, SEMrush access, screenshots

### **External Services:**
- SEMrush (через browser-agent)
- PageSpeed Insights
- Google Rich Results Test
- Schema.org Validator
- Google Tag Manager Debug
- Lighthouse

---

# ⚠️ ОБЯЗАТЕЛЬНЫЕ PREREQUISITES — ПРОВЕРИТЬ ПЕРЕД НАЧАЛОМ!

## 🚨 КРИТИЧНО: Browser Agent ОБЯЗАТЕЛЕН!

**BEFORE STARTING MODULE 1:**

### Step 1: Check browser-agent connection

**Попробовать:**
```javascript
browser_list_tabs()
```

**Если НЕ РАБОТАЕТ (ошибка "not connected" или "source not available"):**

```markdown
🛑 STOP EXECUTION!

❌ Browser Agent не подключен!
❌ Качественный аудит НЕВОЗМОЖЕН без browser-agent!

📋 ТРЕБУЕТСЯ ОТ ПОЛЬЗОВАТЕЛЯ:

1. Включить browser-agent source:
   - Открыть настройки WS Workspace
   - Sources → browser-agent → Activate

2. Убедиться что Chrome/Comet запущен с профилем

3. Перезапустить skill после подключения

⚠️ НЕ ПРОДОЛЖАТЬ с WebFetch/Bash fallback!
⚠️ Это даст НЕКАЧЕСТВЕННЫЙ результат!

Пользователь хочет ПРОФЕССИОНАЛЬНЫЙ аудит, не "абы как"!
```

**ОСТАНОВИТЬ ВЫПОЛНЕНИЕ.** Не продолжать дальше.

---

### Step 2: Verify browser-agent works

**Test navigation:**
```javascript
browser_navigate({ url: "https://example.com" })
```

**Expected result:**
- Status: "loaded" ✅
- No errors ✅

**Если работает:**
```
✅ Browser Agent подключен!
✅ Можно начинать КАЧЕСТВЕННЫЙ аудит!
```

**Продолжать к MODULE 1.**

---

# MODULE 1: TECHNICAL FOUNDATION

## 1.1 Site Overview & Setup (5 min)

**Actions through browser-agent:**
1. `browser_navigate({ url: "https://domain.com" })`
2. Проверить через DevTools и визуально:
   - ✔ URL structure
   - ✔ HTTPS certificate (browser lock)
   - ✔ Определить CMS (посмотреть HTML, meta tags, known patterns)
   - ✔ Language detected
   - ✔ Charset (UTF-8?)
   - ✔ Mobile viewport meta tag
3. Проверить доступность через browser-agent:
   - ✔ `browser_navigate({ url: "https://domain.com/robots.txt" })`
   - ✔ `browser_navigate({ url: "https://domain.com/sitemap.xml" })`
4. (Optional) `browser_screenshot({ fullPage: false })`
   - ⚠️ Если fails с "image readback failed" → пропустить, продолжать
   - ⚠️ Screenshots не критичны для качественного аудита

**Output:**
```
SITE OVERVIEW:
- URL: [domain]
- CMS: [WordPress/Shopify/Custom/Unknown]
- HTTPS: Yes/No (cert valid until: [date])
- Language: [DE/EN/etc]
- Charset: UTF-8/Other
- Mobile Viewport: Yes/No
- robots.txt: accessible/missing + [URL]
- sitemap.xml: accessible/missing + [URL]
```

---

## 1.2 Navigation Structure (8 min)

**Actions:**
1. Через browser-agent записать:
   - Main menu items (слева направо)
   - Footer links
   - Breadcrumb navigation (если есть)
2. Проверить:
   - ✔ Hierarchy (1-2-3 уровни)
   - ✔ CTA visibility (кнопки действия видны?)
   - ✔ Mobile menu (hamburger работает?)

**Output:**
```
NAVIGATION:
Main Menu:
- [Item 1] → [URL]
- [Item 2] → [URL]
...

Footer Links:
- [Link 1] → [URL]
...

Assessment:
- Navigation clarity: [Good/Average/Poor]
- CTA visibility: [Good/Average/Poor]
- Mobile menu: [Working/Not working]
```

---

## 1.3 Responsive & Multi-Browser Testing (15 min)

**КРИТИЧНО:** Использовать **responsive-validator** skill!

**Command through Bash (QUICK MODE recommended):**
```bash
cd ~/.ws-workspace/workspaces/my-workspace/skills/responsive-validator && node run.js https://[URL] --quick --browsers webkit --checks accessibility,performance
```

**Quick Mode Benefits:**
- ⚡ 3-5 минут (вместо 9+ минут full mode)
- ✅ 3 breakpoints (вместо 16) - достаточно для audit
- ✅ 1 browser (WebKit) - достаточно для WCAG
- ✅ WCAG 2.1 accessibility check (57% coverage)
- ✅ Core Web Vitals (LCP, INP, CLS)

**Full Mode (optional - если есть время):**
```bash
node run.js https://[URL] --browsers webkit,chromium,firefox --checks visual,layout,accessibility
# = 16 breakpoints, 3 browsers, 33 test combinations
# = 9+ минут
```

**Что получим:**
- ✅ WCAG 2.1 accessibility violations
- ✅ Core Web Vitals metrics
- ✅ Layout verification
- ✅ HTML report с результатами

**НЕ дублировать** — responsive-validator УЖЕ делает все!

**Output:**
```
RESPONSIVE TESTING:
- Report: [path to HTML report]
- WCAG Issues: [count]
- Layout Issues: [count]
- Core Web Vitals: PASS/FAIL
- Browser compatibility: [summary]
```

---

## 1.4 SSL & Security Audit (10 min)

**Actions:**
1. SSL Check:
   - ✔ Certificate valid?
   - ✔ Expiry date
   - ✔ HTTP → HTTPS redirect?
   - ✔ Mixed content? (DevTools Console)
   - ✔ HSTS header? (Network tab)

2. Security Headers (через browser-agent DevTools):
   - ✔ Content-Security-Policy
   - ✔ X-Frame-Options
   - ✔ X-Content-Type-Options
   - ✔ Referrer-Policy

3. OWASP Top 10 2025 Check (basic):
   - ✔ Broken Access Control indicators
   - ✔ Injection vulnerabilities (SQL, XSS в forms)
   - ✔ Authentication issues (weak password requirements)
   - ✔ Outdated components (check meta tags, scripts)

**Output:**
```
SECURITY AUDIT:
SSL:
- Certificate: Valid/Invalid (expires: [date])
- HTTPS Redirect: Yes/No
- Mixed Content: Found/None
- HSTS: Enabled/Disabled

Security Headers:
- CSP: Present/Missing
- X-Frame-Options: Present/Missing
- X-Content-Type-Options: Present/Missing

OWASP Check (Basic):
- Critical vulnerabilities: [count]
- Warnings: [count]
```

---

## 1.5 Speed Baseline (5 min)

**Actions:**
1. Chrome DevTools Performance:
   - Open DevTools (F12) через browser-agent
   - Performance tab → Record 3-5 sec page load
   - Note: LCP, INP, CLS

**Output:**
```
SPEED BASELINE:
- LCP: __ ms (target: <2500ms)
- INP: __ ms (target: <200ms) ⚡ CRITICAL 2026!
- CLS: __ (target: <0.1)
```

---

# MODULE 2: PERFORMANCE DEEP DIVE

## 2.1 PageSpeed Insights (10 min)

**Actions:**
1. Открыть через browser-agent: `https://pagespeed.web.dev/`
2. Enter URL
3. Screenshot:
   - Mobile Performance Score
   - Mobile Accessibility
   - Mobile Best Practices
   - Mobile SEO
   - Desktop Performance Score
4. Записать Top 3 Opportunities с impact (ms)

**Output:**
```
PAGESPEED INSIGHTS:
Mobile:
- Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

Desktop:
- Performance: __/100

Top Opportunities:
1. [Opportunity]: -__ ms
2. [Opportunity]: -__ ms
3. [Opportunity]: -__ ms
```

---

## 2.2 Core Web Vitals 2026 Deep Dive (10 min)

**Actions:**
1. Analyze Core Web Vitals:
   - LCP (Largest Contentful Paint) < 2.5s
   - **INP (Interaction to Next Paint) < 200ms** ⚡ CRITICAL!
   - CLS (Cumulative Layout Shift) < 0.1

2. Identify issues:
   - What's causing slow LCP? (images, fonts, server)
   - What's blocking INP? (JavaScript execution)
   - What's causing layout shifts? (ads, images без dimensions)

**Output:**
```
CORE WEB VITALS 2026:
- LCP: __ ms (PASS/FAIL)
  Issue: [причина если FAIL]
- INP: __ ms (PASS/FAIL) ⚡
  Issue: [причина если FAIL]
- CLS: __ (PASS/FAIL)
  Issue: [причина если FAIL]
```

---

## 2.3 Third-Party Scripts Analysis (10 min)

**Actions через browser-agent DevTools:**
1. Network tab → Filter: JS
2. Identify all third-party scripts:
   - Analytics (GA4, GTM)
   - Marketing (Facebook Pixel, Google Ads)
   - Chat widgets
   - Social media embeds
   - CDN resources
3. Check:
   - How many scripts?
   - Total size (KB)?
   - Render-blocking?
   - async/defer used?

**Output:**
```
THIRD-PARTY SCRIPTS:
Total Scripts: __
Total Size: __ KB
Render-blocking: __ scripts

Categories:
- Analytics: [list]
- Marketing: [list]
- Widgets: [list]
- Other: [list]

Recommendations:
- [script] → add async/defer
- [script] → lazy load
```

---

## 2.4 JavaScript Rendering Check (10 min)

**Actions:**
1. Check rendering type:
   - View page source (Ctrl+U) через browser-agent
   - Is content in HTML? → Server-Side Rendering (SSR)
   - Empty HTML + JS bundles? → Client-Side Rendering (CSR)

2. Googlebot rendering test:
   - Use Google Rich Results Test
   - Compare rendered vs source HTML

3. Hydration issues (если React/Vue/Angular):
   - Check for console errors
   - Check for layout shifts during hydration

**Output:**
```
JAVASCRIPT RENDERING:
- Rendering Type: SSR/CSR/Hybrid
- Googlebot Rendering: PASS/FAIL
- Hydration Issues: Found/None
- SEO Impact: [assessment]
```

---

## 2.5 Image & Video Optimization (10 min)

**Actions:**
1. Image Analysis:
   - ✔ Modern formats used? (WebP/AVIF)
   - ✔ Images compressed?
   - ✔ Lazy loading implemented?
   - ✔ Responsive images (srcset)?
   - ✔ Alt tags present?
   - ✔ Descriptive file names (not IMG_1234.jpg)?

2. Video Analysis (если есть):
   - ✔ Video schema markup?
   - ✔ Lazy loading?
   - ✔ Thumbnail optimization?

**Output:**
```
IMAGE OPTIMIZATION:
- Total images: __
- Modern formats (WebP/AVIF): __% usage
- Lazy loading: Enabled/Disabled
- Responsive images: Yes/No
- Alt tags missing: __ images

VIDEO OPTIMIZATION (если есть):
- Videos found: __
- Schema markup: Yes/No
- Lazy loading: Yes/No
```

---

## 2.6 CDN & Hosting Performance (5 min)

**Actions:**
1. Check server location:
   - Use PageSpeed Insights → TTFB (Time to First Byte)
   - Identify hosting provider (через IP lookup если возможно)

2. CDN usage:
   - Check Network tab → CDN domains (cloudflare, akamai, etc)?

**Output:**
```
HOSTING & CDN:
- TTFB: __ ms
- CDN Usage: Yes/No ([provider])
- Server Location: [country/region]
```

---

# MODULE 3: SEO ANALYSIS

## 3.1 On-Page SEO Audit (15 min)

**КРИТИЧНО:** Использовать **seo-audit** skill!

**Command:**
```
[skill:seo-audit] для полного on-page SEO анализа
```

**Что получим:**
- ✅ Title tags analysis (length, keywords, uniqueness)
- ✅ Meta descriptions analysis
- ✅ H1-H6 structure validation
- ✅ Content optimization check
- ✅ Internal linking analysis
- ✅ Image alt tags check
- ✅ URL structure assessment
- ✅ Technical SEO issues

**НЕ дублировать** — seo-audit УЖЕ делает все!

**Output:**
```
ON-PAGE SEO:
- Report: [от seo-audit skill]
- Critical Issues: [count]
- Warnings: [count]
- Quick Wins: [list]
```

---

## 3.2 SEMrush Integration (30 min) ⚡ КРИТИЧНО!

**ВАЖНО:** Использовать через `browser-agent`!

### Step 1: Открыть SEMrush

**Actions:**
1. Через browser-agent открыть: `https://www.semrush.com/`
2. Войти в аккаунт (credentials сохранены)
3. Enter domain в поиск

---

### Step 2: Domain Overview

**Actions:**
1. Перейти: Domain Overview
2. Screenshot полной страницы
3. Записать:
   - Authority Score
   - Organic Traffic (monthly)
   - Organic Keywords (total)
   - Backlinks (total)
   - Referring Domains
   - Top 5 Keywords с позициями

**Output:**
```
SEMRUSH DOMAIN OVERVIEW:
- Authority Score: __
- Organic Traffic: __ (trend: ↑/↓/→)
- Organic Keywords: __
- Backlinks: __
- Referring Domains: __

Top Keywords:
1. [keyword] - Position [#] - Volume [__]
2. [keyword] - Position [#] - Volume [__]
...
```

---

### Step 3: Site Audit (Health Score)

**Actions:**
1. Перейти: Site Audit
2. Screenshot Site Health Score
3. Записать:
   - Health Score (/100)
   - Errors (count)
   - Warnings (count)
   - Notices (count)
   - Top 10 Issues

**Output:**
```
SEMRUSH SITE AUDIT:
- Site Health: __/100 (trend: ↑/↓/→)
- Errors: __
- Warnings: __
- Notices: __

Top Issues:
1. [Issue] - [Count] pages affected
2. [Issue] - [Count] pages affected
...
```

---

### Step 4: Backlink Analytics (ДЕТАЛЬНО!)

**Actions:**
1. Перейти: Backlink Analytics
2. Screenshot Backlink Overview
3. Записать:
   - Total Backlinks
   - Referring Domains
   - New vs Lost (last 30 days)
   - Follow vs Nofollow ratio
   - Top 10 Referring Domains (с DA score)
   - Anchor Text Distribution (top 10)
   - Geographic Distribution (top 5 countries)

4. **Toxic Links Check:**
   - Toxic Score
   - Toxic links count
   - Recommendation для disavow file

**Output:**
```
BACKLINK ANALYTICS:
Total:
- Backlinks: __
- Referring Domains: __
- New (30d): + __
- Lost (30d): - __

Quality:
- Follow: __%
- Nofollow: __%
- Toxic Score: __
- Toxic Links: __

Top Referring Domains:
1. [domain] - DA [__] - [__] backlinks
2. [domain] - DA [__] - [__] backlinks
...

Anchor Text Distribution:
1. [anchor] - __%
2. [anchor] - __%
...

Recommendations:
- Disavow needed: Yes/No
- Link building opportunities: [assessment]
```

---

### Step 5: Keyword Rankings

**Actions:**
1. Перейти: Organic Research → Positions
2. Screenshot Top 20 keywords
3. Записать:
   - Total ranking keywords
   - Top 3 positions: count
   - Top 10 positions: count
   - Position distribution
   - Keyword opportunities (position 11-20)

**Output:**
```
KEYWORD RANKINGS:
- Total Keywords: __
- Top 3: __ keywords
- Top 10: __ keywords
- Position 11-20: __ keywords (opportunities!)

Top 20 Keywords:
[Keyword] | Position | Volume | Trend
...

Opportunities (position 11-20):
- [keyword] - #__ - Volume [__] - можно в Top 10!
```

---

### Step 6: Top Pages

**Actions:**
1. Перейти: Organic Research → Pages
2. Screenshot Top 10 pages
3. Записать для каждой:
   - URL
   - Traffic %
   - Keywords
   - Top keyword

**Output:**
```
TOP PAGES:
1. [URL] - Traffic: __%  - Keywords: __ - Top: [keyword]
2. [URL] - Traffic: __%  - Keywords: __ - Top: [keyword]
...
```

---

### Step 7: Competitors List (MINIMAL!)

**Actions:**
1. Перейти: Competitors
2. Записать ТОП-5 конкурентов:
   - Domain
   - Competition Level
   - Common Keywords
   - Authority Score

**НЕ делать глубокий анализ** — только список!

**Output:**
```
COMPETITORS (от SEMrush):
1. [domain] - Competition: High/Medium/Low - Common KW: __ - AS: __
2. [domain] - Competition: High/Medium/Low - Common KW: __ - AS: __
...

NOTE: Глубокий competitor analysis — отдельный skill!
```

---

## 3.3 Local SEO (20 min)

**Actions:**

### Step 1: Google Business Profile

1. Через browser-agent search: "[business name] [city]" в Google
2. Check:
   - ✔ Google Business Profile found?
   - ✔ Name, address, phone (NAP)
   - ✔ Rating (stars)
   - ✔ Reviews count
   - ✔ Photos count
   - ✔ Opening hours listed
   - ✔ Website link correct
   - ✔ Categories correct

### Step 2: Bing Places & Apple Maps

1. Search business в Bing Maps
2. Search business в Apple Maps (если доступно)
3. Check NAP consistency

### Step 3: Local Citations

Search для: "[business name] [city]" на:
- GelbeSeiten.de
- Yelp
- ProvenExpert
- KennstDuEinen
- Andere Verzeichnisse

Записать найденные citations с NAP.

**Output:**
```
LOCAL SEO:

Google Business Profile:
- Found: Yes/No
- Name: [name]
- Address: [address]
- Phone: [phone]
- Rating: [__/5] - Reviews: [__]
- Photos: [__]
- Status: [verified/not verified]

Bing Places:
- Found: Yes/No
- NAP consistent: Yes/No

Apple Maps:
- Found: Yes/No

Local Citations Found:
1. GelbeSeiten: [Yes/No] - NAP: [consistent/inconsistent]
2. Yelp: [Yes/No] - NAP: [consistent/inconsistent]
3. ProvenExpert: [Yes/No] - NAP: [consistent/inconsistent]
...

NAP Consistency: PASS/FAIL
Issues: [если inconsistent]
```

---

# MODULE 4: STRUCTURED DATA & AI SEARCH

## 4.1 Schema.org Validation (20 min) ⚡ ВСЕ ТИПЫ!

**Actions:**

### Step 1: Google Rich Results Test

1. Через browser-agent открыть: `https://search.google.com/test/rich-results`
2. Enter URL (homepage + 3-5 key pages)
3. Screenshot results для каждой страницы
4. Записать найденные schema types

### Step 2: Schema.org Validator

1. Открыть: `https://validator.schema.org/`
2. Enter URL
3. Validate schema markup

### Step 3: Check ALL Schema Types

Проверить presence следующих типов (где применимо):

**Organization & Person:**
- [ ] Organization (company info)
- [ ] Person (authors, team members)
- [ ] sameAs links (Wikipedia, Wikidata, LinkedIn)

**Content Types:**
- [ ] Article / BlogPosting
- [ ] WebPage
- [ ] BreadcrumbList

**Business:**
- [ ] LocalBusiness (если local business)
- [ ] Service (если service business)

**E-commerce:**
- [ ] Product (если e-commerce)
- [ ] Review / AggregateRating
- [ ] Offer

**Engagement:**
- [ ] FAQ
- [ ] HowTo
- [ ] Event (если events)

**Other:**
- [ ] JobPosting (если вакансии)
- [ ] Course (если образование)
- [ ] Recipe (если кулинария)
- [ ] VideoObject (если videos)

**Output:**
```
SCHEMA.ORG VALIDATION:

Found Schema Types:
✅ [Type] - [Page URL] - Valid/Invalid
✅ [Type] - [Page URL] - Valid/Invalid
...

Missing Schema (Recommendations):
❌ Organization schema - Homepage
❌ Person schema - Team page
❌ FAQ schema - Service pages
...

Errors:
- [Error description] - [Page]

Opportunities:
- Add [schema type] to [page] → [benefit]
```

---

## 4.2 Knowledge Graph Entities (15 min)

**Actions:**

### Step 1: E-E-A-T Entity Signals

Check для:
- [ ] Author bylines present?
- [ ] Author pages exist?
- [ ] Author credentials displayed?
- [ ] About Us / Team page quality?
- [ ] Trust signals (certifications, awards)?

### Step 2: Entity Markup

Check schema для:
- **Person schema** with:
  - jobTitle
  - alumniOf
  - knowsAbout
  - honorificPrefix
  - sameAs links

- **Organization schema** with:
  - name
  - logo
  - sameAs links (social media, Wikipedia)
  - contactPoint
  - address

### Step 3: sameAs Links

Check presence of:
- [ ] Wikipedia article
- [ ] Wikidata entry
- [ ] LinkedIn profile
- [ ] Social media profiles (Facebook, Twitter, Instagram)

**Output:**
```
KNOWLEDGE GRAPH ENTITIES:

E-E-A-T Signals:
- Author bylines: Present/Missing on [__] articles
- Author pages: [__] authors with pages
- Credentials displayed: Yes/No
- About Us quality: Good/Average/Poor

Person Schema:
- Found: [__] person schemas
- Properties: [list present properties]
- sameAs links: [count]

Organization Schema:
- Present: Yes/No
- Logo: Yes/No
- sameAs: [count] links
- Quality: Complete/Partial/Missing

sameAs Links:
✅ Wikipedia: [Yes/No] - [URL]
✅ Wikidata: [Yes/No] - [URL]
✅ LinkedIn: [Yes/No] - [URL]
✅ Social profiles: [count]

Recommendations:
- Create [entity type] for [purpose]
```

---

## 4.3 AI Search Optimization (AEO) (15 min)

**Actions:**

### Step 1: ChatGPT Citation Check

1. Test query: "information about [business/topic]" в ChatGPT
2. Check: Is this website cited?
3. Screenshot response

### Step 2: Perplexity Visibility

1. Test query в Perplexity.ai
2. Check: Is website in sources?
3. Screenshot

### Step 3: Google SGE (Search Generative Experience)

1. Search в Google (если SGE доступен в регионе)
2. Check: Does AI overview include this site?

### Step 4: llms.txt File

Check: `https://domain.com/llms.txt`
- [ ] File exists?
- [ ] Proper format?
- [ ] Key info included?

### Step 5: Content Structure для AI

Check:
- [ ] Clear headings (H1-H6)
- [ ] Structured answers (FAQ format)
- [ ] Concise paragraphs (AI-friendly)
- [ ] Lists and tables (easy to parse)
- [ ] Schema markup present

**Output:**
```
AI SEARCH OPTIMIZATION (AEO):

ChatGPT Citation:
- Cited: Yes/No
- Context: [если cited]

Perplexity Visibility:
- Listed in sources: Yes/No
- Ranking: [position если listed]

Google SGE:
- Included: Yes/No

llms.txt:
- Present: Yes/No
- Quality: Good/Needs improvement

Content Structure:
- AI-friendly headings: ✅/❌
- FAQ sections: [count]
- Structured answers: ✅/❌
- Lists/tables: [count]

AI Visibility Score: __/100

Recommendations:
- Create llms.txt with [key info]
- Add FAQ schema to [pages]
- Restructure [content type] for AI parsing
```

---

# MODULE 5: ANALYTICS & TRACKING

## 5.1 GA4 Setup Validation (15 min)

**Actions через browser-agent DevTools:**

1. **GA4 Detection:**
   - Network tab → Filter: "google-analytics"
   - Check for: gtag.js, config with G-XXXXXXX

2. **Configuration Check:**
   - Measurement ID present?
   - Page views tracked?
   - Enhanced measurement enabled?
   - Custom events configured?

3. **Data Layer Check (если GTM):**
   - Console: `dataLayer`
   - Check pushed events

**Output:**
```
GA4 SETUP:
- GA4 Detected: Yes/No
- Measurement ID: G-XXXXXXX
- Implementation: gtag.js / GTM
- Page views tracking: ✅/❌
- Enhanced measurement: ✅/❌
- Custom events: [count]
- Data layer: Present/Missing

Issues:
- [issue if found]
```

---

## 5.2 GTM Container Review (15 min) ⚡ КРИТИЧНО!

**Actions:**

1. **GTM Detection:**
   - Check for: GTM-XXXXXXX in HTML
   - Network tab → Filter: "googletagmanager"

2. **GTM Debug Mode** (если возможно):
   - Add `?gtm_debug=1` to URL
   - Open GTM Preview
   - Screenshot tag firing

3. **Tags Extraction:**
   - View page source
   - Find all GTM tags firing
   - Categorize:
     - Analytics (GA4, GA Universal)
     - Marketing (Facebook Pixel, Google Ads, TikTok)
     - Third-party (Hotjar, etc)

**Output:**
```
GTM CONTAINER:
- GTM ID: GTM-XXXXXXX
- Tags found: [count]

Tags by Category:
Analytics:
- GA4: ✅/❌
- Universal Analytics: ✅/❌ (deprecated!)

Marketing:
- Facebook Pixel: ✅/❌ (ID: [__])
- Google Ads Conversion: ✅/❌
- Google Ads Remarketing: ✅/❌
- TikTok Pixel: ✅/❌

Other:
- [tool]: ✅/❌

Issues:
- Universal Analytics still present (deprecated 2023!)
- [other issues]
```

---

## 5.3 Conversion Tracking Check (10 min)

**Actions:**

1. **Identify Conversion Points:**
   - Forms (contact, newsletter)
   - Phone clicks
   - Email clicks
   - Button clicks (CTA)
   - E-commerce purchases (если e-commerce)

2. **Check Tracking:**
   - Are events configured для each conversion?
   - GTM triggers present?
   - GA4 events firing?

3. **Test Conversion:**
   - Click CTA button
   - Check Network tab → event fired?
   - Check GA4 DebugView (если доступен)

**Output:**
```
CONVERSION TRACKING:

Conversion Points:
1. Contact Form - Tracking: ✅/❌
2. Newsletter Signup - Tracking: ✅/❌
3. Phone Click - Tracking: ✅/❌
4. Email Click - Tracking: ✅/❌
5. CTA Buttons - Tracking: ✅/❌

E-commerce (если applicable):
- Purchase tracking: ✅/❌
- Add to cart: ✅/❌

Issues:
- [conversion point] not tracked!
```

---

## 5.4 All Tracking Codes Extraction (15 min) ⚡

**Actions через browser-agent:**

1. **View Page Source** (Ctrl+U)
2. **Extract ALL tracking codes:**

   Search для:
   - `gtag` → Google Analytics/Ads
   - `fbq` → Facebook Pixel
   - `ttq` → TikTok Pixel
   - `gtm` → Google Tag Manager
   - `_hjid` → Hotjar
   - `clarityId` → Microsoft Clarity
   - `mixpanel` → Mixpanel
   - `_ga` → Google Analytics (legacy)
   - Custom tracking scripts

3. **Network Tab:**
   - Filter: JS
   - Find all tracking/analytics requests
   - List domains contacted

**Output:**
```
ALL TRACKING CODES:

Google:
- GA4: G-XXXXXXX
- Google Ads: AW-XXXXXXX
- GTM: GTM-XXXXXXX
- Google Ads Remarketing: ✅/❌

Meta/Facebook:
- Facebook Pixel: [ID]
- Instagram Pixel: ✅/❌

Other Platforms:
- TikTok Pixel: [ID]
- Hotjar: [ID]
- Microsoft Clarity: [ID]
- [Other]: [ID]

Third-Party Domains Contacted:
- google-analytics.com
- facebook.com
- tiktok.com
...

Total Tracking Codes: [__]
```

---

## 5.5 UTM Parameters Usage (5 min)

**Actions:**

1. Check links на сайте:
   - CTA buttons
   - Newsletter links
   - Social media links
   - Email links

2. Look для UTM parameters:
   - utm_source
   - utm_medium
   - utm_campaign
   - utm_content
   - utm_term

**Output:**
```
UTM PARAMETERS:
- Used: Yes/No
- Consistent naming: Yes/No
- Links with UTM: [count]

Examples:
- [link] → [UTM params]

Recommendations:
- Add UTM to [link type]
```

---

# MODULE 6: UX & CONVERSION

## 6.1 Nielsen's 10 Usability Heuristics (15 min)

**Evaluate по каждой heuristic:**

1. **Visibility of System Status**
   - [ ] Loading indicators present?
   - [ ] Progress bars для forms?
   - [ ] Feedback после actions?

2. **Match Between System and Real World**
   - [ ] Language понятен для target audience?
   - [ ] Icons интуитивны?
   - [ ] Terminology соответствует отрасли?

3. **User Control and Freedom**
   - [ ] Undo/cancel options?
   - [ ] Easy navigation back?
   - [ ] Exit paths clear?

4. **Consistency and Standards**
   - [ ] UI consistent across pages?
   - [ ] Button styles consistent?
   - [ ] Navigation consistent?

5. **Error Prevention**
   - [ ] Form validation before submit?
   - [ ] Confirmation для important actions?
   - [ ] Clear constraints (password requirements)?

6. **Recognition Rather Than Recall**
   - [ ] Options visible (не скрыты)?
   - [ ] Instructions accessible?
   - [ ] Previously entered data remembered?

7. **Flexibility and Efficiency of Use**
   - [ ] Shortcuts для experienced users?
   - [ ] Search function?
   - [ ] Filters/sorting options?

8. **Aesthetic and Minimalist Design**
   - [ ] No clutter?
   - [ ] Clear visual hierarchy?
   - [ ] White space used well?

9. **Help Users Recognize, Diagnose, and Recover from Errors**
   - [ ] Error messages clear?
   - [ ] Solutions suggested?
   - [ ] Error messages in plain language?

10. **Help and Documentation**
    - [ ] FAQ available?
    - [ ] Contact info easy to find?
    - [ ] Help contextual?

**Output:**
```
NIELSEN'S HEURISTICS:

1. Visibility: PASS/FAIL - [note]
2. Match Real World: PASS/FAIL - [note]
3. User Control: PASS/FAIL - [note]
4. Consistency: PASS/FAIL - [note]
5. Error Prevention: PASS/FAIL - [note]
6. Recognition: PASS/FAIL - [note]
7. Flexibility: PASS/FAIL - [note]
8. Aesthetic: PASS/FAIL - [note]
9. Error Recovery: PASS/FAIL - [note]
10. Help/Docs: PASS/FAIL - [note]

Overall UX Score: __/10
Critical Issues: [list]
```

---

## 6.2 Forms Analysis (10 min)

**Actions для каждой формы:**

1. **Contact Forms:**
   - [ ] How many fields? (fewer = better)
   - [ ] Required fields marked?
   - [ ] Validation present?
   - [ ] Error messages clear?
   - [ ] Success message shown?
   - [ ] Placeholder text helpful?
   - [ ] Labels associated with inputs?

2. **Newsletter Signup:**
   - [ ] Above the fold?
   - [ ] Value proposition clear?
   - [ ] Email validation?
   - [ ] DSGVO consent checkbox?

3. **Other Forms:**
   - List all forms found
   - Assess usability

**Output:**
```
FORMS ANALYSIS:

Contact Form:
- Fields: [__] (recommendation: max 5)
- Required fields marked: ✅/❌
- Validation: ✅/❌
- Error messages: Clear/Unclear
- Success message: ✅/❌
- DSGVO consent: ✅/❌

Newsletter:
- Position: Above fold/Below fold
- Value prop: Clear/Unclear
- Validation: ✅/❌
- Consent: ✅/❌

Issues:
- Too many fields ([__] fields)
- No validation on [field]
- [other issues]
```

---

## 6.3 Trust Signals Audit (10 min)

**Actions:**

Check presence of:

1. **Social Proof:**
   - [ ] Customer testimonials
   - [ ] Reviews/ratings
   - [ ] Case studies
   - [ ] Client logos
   - [ ] Number of customers (if displayed)

2. **Certifications & Badges:**
   - [ ] Industry certifications
   - [ ] Security badges (SSL, payment)
   - [ ] Trust seals
   - [ ] Awards/recognition

3. **Legal & DSGVO** (через browser-agent):

   **Check each legal page:**
   - [ ] Privacy Policy (Datenschutz):
     - `browser_get_text({ selector: "footer a[href*='datenschutz'], footer a[href*='privacy']" })`
     - If found: `browser_click({ selector: "footer a[href*='datenschutz']" })` + `browser_screenshot()`

   - [ ] Terms of Service (AGB):
     - `browser_get_text({ selector: "footer a[href*='agb'], footer a[href*='terms']" })`
     - If found: `browser_click({ selector: "footer a[href*='agb']" })` + `browser_screenshot()`

   - [ ] Impressum ⚡ ОБЯЗАТЕЛЬНО для Германии!:
     - `browser_get_text({ selector: "footer a[href*='impressum'], footer a[href*='imprint']" })`
     - If found: `browser_click({ selector: "footer a[href*='impressum']" })` + `browser_screenshot()`

   - [ ] Cookie Policy:
     - `browser_get_text({ selector: "footer a[href*='cookie']" })`
     - If found: `browser_click({ selector: "footer a[href*='cookie']" })` + `browser_screenshot()`

   - [ ] Widerrufsbelehrung (если e-commerce):
     - `browser_get_text({ selector: "footer a[href*='widerruf'], footer a[href*='revocation']" })`
     - If found: `browser_click({ selector: "footer a[href*='widerruf']" })` + `browser_screenshot()`

4. **Contact & Transparency:**
   - [ ] Contact info visible
   - [ ] Phone number clickable (tel:)
   - [ ] Email address (не только form)
   - [ ] Physical address
   - [ ] About Us page quality
   - [ ] Team photos

**Output:**
```
TRUST SIGNALS:

Social Proof:
- Testimonials: [count]
- Reviews: [source] - [rating]
- Case studies: [count]
- Client logos: [count]

Certifications:
- [list found badges/certifications]

Legal (DSGVO):
✅ Privacy Policy: [URL]
✅ Terms of Service: [URL]
✅ Impressum: [URL] ⚡ REQUIRED!
✅ Cookie Policy: [URL]
✅ Widerrufsbelehrung: [URL] (если e-commerce)

Contact:
- Phone: [visible/hidden]
- Email: [visible/hidden]
- Address: [visible/hidden]
- About Us: [quality assessment]

Issues:
- Missing Impressum! ⚡ CRITICAL для Германии!
- [other issues]
```

---

## 6.4 Mobile-Specific Checks (10 min)

**Actions через responsive-validator results:**

1. **Mobile-First Indexing:**
   - [ ] Same content mobile vs desktop?
   - [ ] No hidden content on mobile?
   - [ ] Structured data same?

2. **Touch Targets:**
   - [ ] Buttons минимум 44x44px?
   - [ ] Links spacing adequate?
   - [ ] No tiny tap targets?

3. **PWA Capabilities:**
   - [ ] manifest.json present?
   - [ ] Service Worker registered?
   - [ ] Offline mode?
   - [ ] Install prompt?

4. **Mobile UX:**
   - [ ] Hamburger menu works?
   - [ ] No horizontal scroll?
   - [ ] Text readable (not too small)?
   - [ ] Forms mobile-friendly?

**Output:**
```
MOBILE-SPECIFIC:

Mobile-First Indexing:
- Content parity: ✅/❌
- Structured data: Same/Different

Touch Targets:
- All targets > 44px: ✅/❌
- Issues: [list small targets]

PWA:
- manifest.json: ✅/❌
- Service Worker: ✅/❌
- Offline capable: ✅/❌

Mobile UX:
- Navigation: ✅/❌
- Scroll: ✅/❌
- Text size: ✅/❌
- Forms: ✅/❌
```

---

## 6.5 Social Media Integration (5 min)

**Actions:**

1. **Open Graph Tags:**
   - [ ] og:title
   - [ ] og:description
   - [ ] og:image
   - [ ] og:url
   - [ ] og:type

2. **Twitter Cards:**
   - [ ] twitter:card
   - [ ] twitter:title
   - [ ] twitter:description
   - [ ] twitter:image

3. **Social Sharing:**
   - [ ] Share buttons present?
   - [ ] Which platforms?

4. **Social Links:**
   - [ ] Links to social profiles?
   - [ ] Where placed? (header/footer)

**Output:**
```
SOCIAL MEDIA:

Open Graph:
- Present: ✅/❌
- Complete: ✅/❌
- Image optimized: ✅/❌

Twitter Cards:
- Present: ✅/❌
- Type: [summary/summary_large_image]

Social Sharing:
- Buttons: ✅/❌
- Platforms: [list]

Social Links:
- [platform] → [URL]
```

---

# MODULE 7: CONTENT AUDIT (БАЗОВЫЙ)

## 7.1 Content Inventory (15 min)

**Actions:**

1. **List All Pages:**
   - Homepage
   - About Us
   - Services/Products (list all)
   - Blog/Resources (если есть)
   - Contact
   - Legal pages
   - Other

2. **For Each Page Type:**
   - URL
   - Title
   - Approx word count
   - Last updated (если visible)

**Output:**
```
CONTENT INVENTORY:

Total Pages: [__]

Page Types:
- Homepage: 1
- Service pages: [__]
- Product pages: [__]
- Blog posts: [__]
- Legal: [__]
- Other: [__]

Key Pages:
[Type] | [URL] | Words | Updated
...
```

---

## 7.2 Content Quality Assessment (БАЗОВЫЙ) (10 min)

**НЕ углубляться!** Только базовая оценка.

**Check для key pages:**

1. **Homepage:**
   - [ ] Clear value proposition?
   - [ ] CTAs present?
   - [ ] Content > 300 words?
   - [ ] Engaging?

2. **Service/Product Pages:**
   - [ ] Detailed descriptions?
   - [ ] Benefits clear?
   - [ ] CTAs present?
   - [ ] Content > 500 words?

3. **About Us:**
   - [ ] Team info?
   - [ ] Company story?
   - [ ] Trust signals?

4. **Blog (если есть):**
   - [ ] Recent posts?
   - [ ] Update frequency?
   - [ ] Quality assessment

**НЕ делать:**
- ❌ Readability scores
- ❌ Duplicate content detection
- ❌ Deep content analysis

**Output:**
```
CONTENT QUALITY (БАЗОВЫЙ):

Homepage:
- Value prop: Clear/Unclear
- CTAs: [count]
- Word count: [__]
- Quality: Good/Average/Poor

Service Pages:
- Avg word count: [__]
- Quality: Good/Average/Poor
- Issues: [brief list]

Blog (если есть):
- Posts: [__]
- Last update: [date]
- Frequency: Regular/Irregular

Overall Assessment: Good/Average/Poor
```

---

## 7.3 Content Gaps Identification (10 min)

**Check for missing content:**

1. **Essential Pages:**
   - [ ] FAQ section?
   - [ ] Blog/Resources?
   - [ ] Case Studies?
   - [ ] Pricing page?
   - [ ] How It Works page?

2. **Service Coverage:**
   - Are all services documented?
   - Missing service pages?

3. **User Questions:**
   - Common questions answered?
   - How-to guides?

**Output:**
```
CONTENT GAPS:

Missing Pages:
- FAQ section
- Pricing page
- [other]

Missing Service Pages:
- [service not documented]

Content Opportunities:
1. Create FAQ for [topic]
2. Add [content type] for [purpose]
3. [other recommendations]
```

---

# MODULE 8: COMPLIANCE 2026

## 8.1 BITV 2.0 / BFSG Compliance (20 min) ⚡

**КРИТИЧНО для немецких клиентов! Штрафы до €100,000!**

### Background:
- BITV 2.0: публичный сектор (с мая 2019)
- BFSG: частный сектор (с 28 июня 2025)
- Требование: **WCAG 2.1 Level AA** (через EN 301 549)

---

### Step 1: WCAG 2.1 AA Compliance (используем responsive-validator results!)

**responsive-validator УЖЕ проверил WCAG!** Использовать его отчет.

Дополнительно проверить:

1. **Perceivable (Воспринимаемость):**
   - [ ] Все изображения имеют alt-текст?
   - [ ] Контраст текста 4.5:1 (обычный), 3:1 (крупный)?
   - [ ] Контент доступен без CSS?

2. **Operable (Управляемость):**
   - [ ] Вся функциональность доступна с клавиатуры?
   - [ ] Нет keyboard traps?
   - [ ] Skip links присутствуют?
   - [ ] Focus indicators видны?

3. **Understandable (Понятность):**
   - [ ] Язык страницы указан (lang="de")?
   - [ ] Навигация консистентна?
   - [ ] Labels для форм?

4. **Robust (Надежность):**
   - [ ] Валидный HTML?
   - [ ] ARIA используется корректно?

---

### Step 2: Gebärdensprache & Leichte Sprache ⚡ ОБЯЗАТЕЛЬНО!

**КРИТИЧНАЯ ПРОВЕРКА:**

1. Check homepage для:
   - [ ] Ссылка на "Gebärdensprache" (немецкий язык жестов)?
   - [ ] Ссылка на "Leichte Sprache" (упрощенный язык)?

2. Если НЕТ → **КРИТИЧЕСКОЕ нарушение BITV 2.0!**
   - Штраф до €100,000
   - Обязательно для публичного И частного секторов

---

### Step 3: WCAG Violations Count

От responsive-validator:
- Level A violations: [count]
- Level AA violations: [count]
- Best Practices issues: [count]

**Output:**
```
BITV 2.0 / BFSG COMPLIANCE:

WCAG 2.1 AA:
- Level A violations: [__]
- Level AA violations: [__]
- Details: [от responsive-validator report]

Deutsche Gebärdensprache:
- Present: ✅/❌ ⚠️
- URL: [if present]

Leichte Sprache:
- Present: ✅/❌ ⚠️
- URL: [if present]

Overall Compliance: PASS / FAIL

⚠️ RISK LEVEL:
- Gebärdensprache missing → CRITICAL RISK (€100K fine!)
- Leichte Sprache missing → CRITICAL RISK (€100K fine!)
- WCAG AA violations → [HIGH/MEDIUM/LOW]

Legal Deadline: BFSG active since June 28, 2025!
```

---

## 8.2 Google Consent Mode V2 (15 min) ⚡

**КРИТИЧНО для EU/EEA! Без этого Google прекращает обработку данных!**

### Background:
- Обязателен с марта 2024
- Без него: Google Ads/Analytics НЕ работают в EU

---

### Step 1: Consent Mode Detection

**Actions через browser-agent DevTools Console:**

```javascript
// Check for Consent Mode
dataLayer.filter(e => e.event === 'consent')
```

Check в HTML source:
- [ ] `gtag('consent', 'default', ...)` present?
- [ ] `ad_storage`, `analytics_storage` declared?
- [ ] `ad_user_data`, `ad_personalization` declared? (V2 required!)
- [ ] Default state = 'denied'?

---

### Step 2: Cookie Banner Check

1. **Banner Presence:**
   - [ ] Cookie banner visible on first visit?
   - [ ] Banner shows BEFORE tracking scripts load?

2. **Banner Options:**
   - [ ] "Accept All" button?
   - [ ] "Reject All" button?
   - [ ] "Settings" / "Preferences" option?

3. **Consent Signals:**
   - Click "Accept All"
   - Check Network tab → consent signals fired?
   - Check dataLayer → consent updated?

---

### Step 3: Validation Tools

**Google Tag Assistant:**
1. Через browser-agent install extension (если можно)
2. Refresh page
3. Check consent signals
4. Screenshot

**Alternative: Manual Check:**
1. Network tab → filter: "google"
2. Look для: `gcs` parameter in requests
3. Check value: denied/granted

---

### Step 4: Implementation Mode

- **Basic Mode:** Tags load only after consent
- **Advanced Mode:** Cookieless pings before consent

Which mode detected: [Basic/Advanced/NOT IMPLEMENTED]

---

**Output:**
```
GOOGLE CONSENT MODE V2:

Detection:
- Consent Mode: ✅ Detected / ❌ NOT FOUND
- Implementation: Basic / Advanced / NONE

V2 Parameters:
✅ ad_storage: Yes/No
✅ analytics_storage: Yes/No
✅ ad_user_data: Yes/No ⚠️ V2 REQUIRED!
✅ ad_personalization: Yes/No ⚠️ V2 REQUIRED!

Default Consent:
- State: denied / granted (should be denied!)

Cookie Banner:
- Visible: Yes/No
- Load timing: Before/After scripts (should be BEFORE!)
- Options: Accept/Reject/Settings

Consent Signals:
- Working: ✅/❌
- Update on action: ✅/❌

Overall Status: PASS / FAIL

⚠️ RISK LEVEL:
- Consent Mode V2 missing → CRITICAL
  Impact: Google Ads/Analytics data loss!
- V2 parameters missing → HIGH
- Banner issues → MEDIUM

Deadline: Required since March 2024!
```

---

## 8.3 Privacy Policy / DSGVO (5 min)

**Quick Check through browser-agent:**

1. **Legal Pages Present:**

   Navigate to homepage first: `browser_navigate({ url: "https://domain.com" })`

   Check each page:
   - [ ] Datenschutz (Privacy Policy):
     - Find link: `browser_get_text({ selector: "footer a[href*='datenschutz'], footer a[href*='privacy']" })`
     - Navigate: `browser_click({ selector: "footer a[href*='datenschutz']" })`
     - Screenshot: `browser_screenshot()`

   - [ ] Impressum ⚡ REQUIRED!:
     - Find link: `browser_get_text({ selector: "footer a[href*='impressum']" })`
     - Navigate: `browser_click({ selector: "footer a[href*='impressum']" })`
     - Screenshot: `browser_screenshot()`

   - [ ] AGB (Terms):
     - Find link: `browser_get_text({ selector: "footer a[href*='agb'], footer a[href*='terms']" })`
     - Navigate: `browser_click({ selector: "footer a[href*='agb']" })`
     - Screenshot: `browser_screenshot()`

   - [ ] Cookie Policy:
     - Find link: `browser_get_text({ selector: "footer a[href*='cookie']" })`
     - Navigate if found

   - [ ] Widerruf (если e-commerce):
     - Find link: `browser_get_text({ selector: "footer a[href*='widerruf']" })`
     - Navigate if found

2. **Privacy Policy Content** (when on Datenschutz page):
   - [ ] Data collection described? → `browser_get_text({ selector: "main, article, .content" })`
   - [ ] User rights listed?
   - [ ] Data retention periods?
   - [ ] Contact for data requests?

**Output:**
```
DSGVO COMPLIANCE:

Legal Pages:
✅ Datenschutz: [URL]
✅ Impressum: [URL] ⚠️ REQUIRED!
✅ AGB: [URL]
✅ Cookie Policy: [URL]
✅ Widerrufsbelehrung: [URL]

Privacy Policy Quality:
- Data collection: Described/Not described
- User rights: Listed/Missing
- Contact: Present/Missing

Issues:
- [если missing critical elements]
```

---

# MODULE 9: MASTER REPORT & RECOMMENDATIONS

## 9.1 Executive Summary (10 min)

**Create concise summary:**

```
EXECUTIVE SUMMARY

Website: [domain]
Audit Date: [date]
Auditor: WS Workspace

OVERALL ASSESSMENT:
[2-3 sentences describing overall site health]

CRITICAL ISSUES (Must fix immediately):
1. [Issue] - Impact: [HIGH/CRITICAL]
2. [Issue] - Impact: [HIGH/CRITICAL]
3. [Issue] - Impact: [HIGH/CRITICAL]

KEY OPPORTUNITIES:
1. [Opportunity] - Potential: [HIGH/MEDIUM]
2. [Opportunity] - Potential: [HIGH/MEDIUM]
3. [Opportunity] - Potential: [HIGH/MEDIUM]

COMPLIANCE STATUS:
- BITV 2.0 / BFSG: PASS/FAIL ⚠️
- Google Consent Mode V2: PASS/FAIL ⚠️
- DSGVO: PASS/FAIL

SCORES:
- Technical Health: __/100
- SEO Health: __/100
- Performance: __/100
- UX: __/100
- Compliance: __/100

OVERALL: __/100
```

---

## 9.2 Detailed Findings by Module

**For each module, summarize:**

### MODULE 1: TECHNICAL FOUNDATION
**Status:** [Good/Needs Improvement/Critical]

**Issues:**
- [Issue 1] - Severity: [HIGH/MEDIUM/LOW]
- [Issue 2] - Severity: [HIGH/MEDIUM/LOW]

**Recommendations:**
1. [Action] - Priority: [1-5]
2. [Action] - Priority: [1-5]

---

### MODULE 2: PERFORMANCE
**Status:** [Good/Needs Improvement/Critical]

**Core Web Vitals:**
- LCP: [value] - [PASS/FAIL]
- INP: [value] - [PASS/FAIL] ⚡
- CLS: [value] - [PASS/FAIL]

**Issues:**
- [Issue] causing slow INP
- [Issue] causing layout shifts

**Recommendations:**
1. [Action] - Impact: -[__]ms
2. [Action] - Impact: -[__]ms

---

### MODULE 3: SEO ANALYSIS
**Status:** [Good/Needs Improvement/Critical]

**SEMrush Metrics:**
- Authority Score: [__]
- Organic Traffic: [__]
- Backlinks: [__]
- Site Health: [__]/100

**Issues:**
- [Issue from seo-audit]
- [Issue from SEMrush]

**Recommendations:**
1. [Action] - Potential traffic: +[__%]
2. [Action] - Potential rankings: +[__ positions]

---

### MODULE 4: STRUCTURED DATA & AI SEARCH
**Status:** [Good/Needs Improvement/Critical]

**Schema Found:**
- [count] types implemented
- [count] missing

**AI Visibility:**
- ChatGPT: [cited/not cited]
- Perplexity: [visible/not visible]

**Recommendations:**
1. Add [schema type] → [benefit]
2. Create llms.txt → AI citation +[__%]

---

### MODULE 5: ANALYTICS & TRACKING
**Status:** [Good/Needs Improvement/Critical]

**Tracking Codes:**
- [count] codes found
- GA4: [status]
- GTM: [status]

**Issues:**
- [tracking issue]

**Recommendations:**
1. [action]

---

### MODULE 6: UX & CONVERSION
**Status:** [Good/Needs Improvement/Critical]

**Nielsen Score:** [__]/10

**Issues:**
- [UX issue]

**Recommendations:**
1. [action] - Potential conversion: +[__%]

---

### MODULE 7: CONTENT
**Status:** [Good/Needs Improvement/Critical]

**Content Gaps:**
- Missing: [list]

**Recommendations:**
1. Create [content type]

---

### MODULE 8: COMPLIANCE
**Status:** [PASS/FAIL] ⚠️

**BITV/BFSG:**
- Gebärdensprache: [present/MISSING] ⚠️
- Leichte Sprache: [present/MISSING] ⚠️
- WCAG AA: [violations count]

**Consent Mode V2:**
- Status: [WORKING/BROKEN] ⚠️

**Recommendations:**
1. Add Gebärdensprache → LEGAL REQUIREMENT! (€100K fine!)
2. Fix Consent Mode V2 → Google Ads/Analytics working!

---

## 9.3 Prioritized Action Plan (20 min)

**Organize recommendations by priority:**

### PHASE 1: CRITICAL (Immediate - Week 1) ⚠️

**LEGAL COMPLIANCE:**
1. ✅ Add Gebärdensprache link (BITV requirement)
   - Impact: Avoid €100K fine
   - Effort: 2 hours
   - Owner: Content team

2. ✅ Add Leichte Sprache link (BITV requirement)
   - Impact: Avoid €100K fine
   - Effort: 2 hours
   - Owner: Content team

3. ✅ Fix Google Consent Mode V2 (EU requirement)
   - Impact: Google Ads/Analytics data working
   - Effort: 4 hours
   - Owner: Developer

4. ✅ Fix WCAG Level A violations (if any)
   - Impact: Legal compliance
   - Effort: [estimate]
   - Owner: Developer

**SECURITY:**
5. ✅ Fix critical security vulnerabilities (if found)
   - Impact: Site security
   - Effort: [estimate]
   - Owner: Developer

---

### PHASE 2: QUICK WINS (Week 1-2)

**High Impact, Low Effort:**

1. ✅ Add missing alt tags ([count] images)
   - Impact: SEO + Accessibility
   - Effort: 2 hours
   - Owner: Content team

2. ✅ Fix missing meta descriptions ([count] pages)
   - Impact: CTR +5-10%
   - Effort: 3 hours
   - Owner: SEO

3. ✅ Add Schema.org markup ([types])
   - Impact: Rich snippets, AI citations +20%
   - Effort: 4 hours
   - Owner: Developer

4. ✅ Optimize images (WebP conversion)
   - Impact: LCP -[__]ms
   - Effort: 3 hours
   - Owner: Developer

5. ✅ Fix broken links (if found)
   - Impact: UX + SEO
   - Effort: 1 hour
   - Owner: Content

---

### PHASE 3: MEDIUM-TERM (Month 1-3)

**Medium Impact, Medium Effort:**

1. ✅ Create FAQ pages with schema
   - Impact: AI visibility +30%, featured snippets
   - Effort: 8 hours
   - Owner: Content + Developer

2. ✅ Improve INP score to <200ms
   - Impact: Ranking boost (hard factor 2026!)
   - Effort: 16 hours
   - Owner: Developer

3. ✅ Add Person/Organization schemas
   - Impact: Knowledge Graph, E-E-A-T
   - Effort: 6 hours
   - Owner: Developer + Content

4. ✅ Optimize third-party scripts
   - Impact: Performance +[__] points
   - Effort: 8 hours
   - Owner: Developer

5. ✅ Create missing content (gaps identified)
   - Impact: SEO coverage, user answers
   - Effort: 20 hours
   - Owner: Content

6. ✅ Improve forms UX
   - Impact: Conversion +[__%]
   - Effort: 8 hours
   - Owner: Designer + Developer

---

### PHASE 4: LONG-TERM (Month 3-12)

**Strategic Improvements:**

1. ✅ Build quality backlinks ([count] opportunities)
   - Impact: Authority Score +[__], traffic +[__%]
   - Effort: Ongoing
   - Owner: SEO

2. ✅ Implement PWA capabilities
   - Impact: Mobile UX, engagement
   - Effort: 40 hours
   - Owner: Developer

3. ✅ Create comprehensive content library
   - Impact: Organic traffic +[__%]
   - Effort: 80 hours
   - Owner: Content

4. ✅ A/B test conversion funnel
   - Impact: Conversion rate +[__%]
   - Effort: 20 hours
   - Owner: Marketing

---

## 9.4 ROI Impact Forecast (10 min)

**Estimate impact of recommendations:**

### Traffic Impact:
```
CURRENT: [__] organic visitors/month (от SEMrush)

AFTER PHASE 2:
+ Schema markup → +20% visibility → +[__] visitors
+ Meta descriptions → +10% CTR → +[__] visitors
+ Alt tags → +5% image search → +[__] visitors
= Total: +[__%] traffic

AFTER PHASE 3:
+ FAQ content → +30% AI citations → +[__] visitors
+ INP optimization → ranking boost → +[__] visitors
+ E-E-A-T entities → authority → +[__%] traffic
= Total: +[__%] cumulative

AFTER PHASE 4:
+ Backlinks → domain authority → +[__%] traffic
+ Content library → long-tail keywords → +[__%] traffic
= Total: +[__%] cumulative

TOTAL POTENTIAL: +[__%] organic traffic over 12 months
```

---

### Conversion Impact:
```
CURRENT: [estimate] conversions/month

AFTER IMPROVEMENTS:
+ Forms UX → +15% form completion → +[__] conversions
+ Trust signals → +10% confidence → +[__] conversions
+ Mobile UX → +20% mobile conversions → +[__] conversions
+ A/B testing → +25% overall → +[__] conversions

TOTAL POTENTIAL: +[__%] conversions over 12 months
```

---

### Revenue Impact (если applicable):
```
CURRENT: €[__]/month (estimate)

POTENTIAL AFTER 12 MONTHS:
+ Traffic increase → €[__]/month
+ Conversion increase → €[__]/month
= Total: +€[__]/month (+[__%])
```

---

## 9.5 Final Report Output

**Create Google Doc with:**

```
TITLE: Website Audit Report - [domain] - [date]

TABLE OF CONTENTS:
1. Executive Summary
2. Methodology
3. Detailed Findings
   3.1 Technical Foundation
   3.2 Performance
   3.3 SEO Analysis
   3.4 Structured Data & AI Search
   3.5 Analytics & Tracking
   3.6 UX & Conversion
   3.7 Content
   3.8 Compliance
4. Prioritized Action Plan
   4.1 Phase 1: Critical
   4.2 Phase 2: Quick Wins
   4.3 Phase 3: Medium-term
   4.4 Phase 4: Long-term
5. ROI Impact Forecast
6. Appendices
   6.1 SEMrush Screenshots
   6.2 PageSpeed Reports
   6.3 Responsive Validator Report
   6.4 Schema Validation Screenshots
```

**Visual Elements:**
- Screenshots (all key findings)
- Charts (scores, trends)
- Tables (action plan)
- Color-coded priorities (Red/Orange/Yellow/Green)

**Export:**
- Share Google Doc link
- Export to PDF
- Note path for client delivery

---

## 🎯 COMPLETION CHECKLIST

Before delivering report:

- [ ] All 9 modules completed
- [ ] No "TODO" or "unavailable" without reason
- [ ] Screenshots included (min 20)
- [ ] SEMrush data collected
- [ ] responsive-validator report included
- [ ] seo-audit report included
- [ ] Action plan prioritized
- [ ] ROI estimated
- [ ] Google Doc created
- [ ] PDF exported
- [ ] Client-ready formatting

---

## 📚 SOURCES & REFERENCES

**Legal & Compliance:**
- [BITV 2.0 Requirements](https://www.levelaccess.com/blog/german-accessibility-requirements/)
- [BFSG Implementation](https://www.twobirds.com/en/insights/2025/germany/germany-ready-for-the-eaa-european-accessibility-act-implementation-entering-into-force-on-28-june-2)
- [Google Consent Mode V2 Guide](https://termly.io/resources/articles/what-is-google-consent-mode-v2/)

**Core Web Vitals 2026:**
- [INP Complete Guide](https://koanthic.com/en/core-web-vitals-2026-complete-inp-guide-assessment/)
- [Official Google Documentation](https://developers.google.com/search/docs/appearance/core-web-vitals)

**Schema.org & AI Search:**
- [Schema Markup 2026](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/)
- [Structured Data AI Search](https://www.stackmatix.com/blog/structured-data-ai-search)
- [E-E-A-T Guide](https://wireinnovation.com/mastering-seo-entities/)

**Technical SEO:**
- [50-Point Checklist 2026](https://www.digitalapplied.com/blog/technical-seo-audit-2026-50-point-checklist)
- [OWASP Top 10 2025](https://owasp.org/www-project-top-ten/)

**UX:**
- [Nielsen's 10 Heuristics](https://www.eleken.co/blog-posts/a-checklist-for-ux-design-audit-based-on-jakob-nielsens-10-usability-heuristics)

---

**Made with ❤️ by WS Workspace**
**Powered by browser-agent + responsive-validator + seo-audit + SEMrush**
**Compliance: BITV 2.0, BFSG, WCAG 2.1 AA, Google Consent Mode V2**
