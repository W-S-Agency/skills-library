---
name: "Research"
description: "Market research, competitive analysis, industry insights — для WS Agency, 2Penguins, Topholz24"
---

# Research Skill

Специализированный research agent для глубокого анализа рынка, конкурентов и индустрии. Предназначен для бизнес-экосистемы Alexander Wirt.

## Команды

### `/research:market`
Исследование рынка и целевой аудитории:

```bash
/research:market "CRM software for SMB in Germany"
```

**Анализирует:**
- 📊 Размер рынка и growth rate
- 🎯 Сегменты целевой аудитории
- 💰 Ценовая модель и willingness to pay
- 📈 Тренды и прогнозы
- 🚧 Входные барьеры и регуляции
- 🌍 Географические особенности (DACH market)

**Output:**
```markdown
## Market Research: CRM Software for SMB (Germany)

### Market Size
- TAM: €2.4B (2026, DACH region)
- Growth: 12% YoY
- SMB segment: €680M (28% of total)

### Target Segments
1. **Digital Agencies** (15K companies, Germany)
   - Pain: Fragmented tools, no unified client view
   - Budget: €50-200/month

2. **E-commerce** (38K companies)
   - Pain: Manual order tracking, no automation
   - Budget: €100-500/month

### Trends
- AI-first CRM demand +45% YoY
- Integration-first approach (API-first platforms)
- GDPR compliance — critical for DACH

### Competitive Intensity
🟢 Low-Medium | Several generic players, niche gap for AI-first SMB CRM

### Recommendations
✅ Focus on Digital Agencies segment first (smaller, higher ARPU)
✅ Emphasize GDPR compliance + German hosting
✅ AI-powered insights as key differentiator
```

### `/research:competitors`
Конкурентный анализ:

```bash
/research:competitors "Pipedrive, HubSpot, Bitrix24"
```

**Анализирует каждого конкурента:**
- 🏢 Позиционирование и USP
- 💵 Pricing model
- ✨ Ключевые фичи
- 📣 Marketing channels
- ⭐ G2/Capterra ratings
- 🎯 Target audience
- 💪 Strengths
- 🔻 Weaknesses

**Output:**
```markdown
## Competitive Analysis

### Pipedrive
**Positioning**: Sales-focused CRM for small teams
**Pricing**: €14-99/user/month
**Key Features**: Visual pipeline, email integration, mobile app
**Target**: Sales teams 5-50 people
**Strengths**: Simple UX, fast onboarding, affordable
**Weaknesses**: Limited marketing features, no AI, weak reporting
**Rating**: 4.2/5 (G2, 2,100 reviews)

### Opportunity Gap
None of the competitors offer:
- AI-powered deal scoring
- DACH-specific compliance features
- Integrated digital signage workflows (2Penguins use case)
```

### `/research:trends`
Индустриальные тренды и инсайты:

```bash
/research:trends "Digital signage industry 2026"
```

**Источники:**
- Industry reports (Gartner, Forrester)
- News и публикации
- Social media sentiment
- Patent filings
- Venture funding activity

**Output:**
```markdown
## Trends: Digital Signage (2026)

### Emerging Trends
1. **AI-Powered Content Personalization** 📈
   - Dynamic content based on audience demographics
   - Real-time analytics + optimization
   - Market adoption: Early majority (35%)

2. **Cloud-Based Management** ☁️
   - SaaS platforms replacing on-prem
   - Remote content updates, multi-location
   - Market adoption: Mainstream (62%)

3. **Interactive Touchscreens** 👆
   - Wayfinding, product catalogs, self-service
   - Integration with mobile apps
   - Market adoption: Early adopters (18%)

### Declining Trends
- ❌ Static displays
- ❌ Local storage/manual updates

### Investment Activity
- €420M funding in Q1 2026 (EMEA)
- Key investors: Signal Ventures, Scala Partners

### Recommendations
✅ Focus on AI personalization (emerging, low competition)
✅ Offer hybrid cloud + on-prem (German market preference)
```

### `/research:customer-insights`
Качественные customer insights:

```bash
/research:customer-insights "E-commerce owners using CRM"
```

**Методология:**
- Review mining (Trustpilot, G2, Reddit)
- Forum analysis (Reddit, Quora, niche communities)
- Social listening (Twitter, LinkedIn)
- Support ticket patterns (if accessible)

**Output:**
```markdown
## Customer Insights: E-commerce + CRM

### Jobs to Be Done
1. "Track customer lifetime value across channels" (32% mentions)
2. "Automate post-purchase follow-ups" (28%)
3. "Segment customers for targeted campaigns" (24%)

### Pain Points
- "Too many tools, data is fragmented" ⭐⭐⭐⭐⭐ (highest)
- "CRM doesn't integrate with Shopify/WooCommerce" ⭐⭐⭐⭐
- "Expensive for small shops" ⭐⭐⭐

### Desired Outcomes
- Unified customer view (all touchpoints)
- Automation without complexity
- Affordable pricing (< €100/month)

### Quotes
> "I need a CRM that understands e-commerce, not a generic sales tool"
> "Integrations are nice but they never work properly"

### Recommendations
✅ E-commerce-first positioning
✅ Pre-built Shopify/WooCommerce integrations
✅ Tiered pricing starting < €50/month
```

### `/research:keyword`
SEO keyword research для контента:

```bash
/research:keyword "CRM software Germany"
```

**Анализирует:**
- Search volume
- Keyword difficulty
- SERP features
- Related keywords
- Content gaps

**Output:**
```markdown
## Keyword Research: CRM Software Germany

### Primary Keyword
**CRM Software Deutschland**
- Volume: 1,900/month
- Difficulty: 42 (Medium)
- CPC: €8.20
- Intent: Commercial Investigation

### SERP Analysis
1. HubSpot — Ultimate Guide (2,400 words)
2. Capterra — Best CRM List
3. Bitrix24 — Product page

**Opportunity**: No AI-focused CRM guides in top 10

### Related Keywords
- "CRM für kleine Unternehmen" (880/mo, KD 38)
- "kostenlose CRM Software" (720/mo, KD 35)
- "CRM Vergleich" (590/mo, KD 45)

### Content Recommendations
✅ Create "CRM Software Deutschland: KI-gestützte Lösungen 2026"
✅ Target 2,000-2,500 words
✅ Include comparison table + pricing
✅ Emphasize GDPR/German hosting
```

### `/research:pricing`
Pricing research для product positioning:

```bash
/research:pricing "B2B SaaS CRM"
```

**Анализирует:**
- Competitor pricing models
- Value metrics (per user, per contact, per feature)
- Price anchoring
- Freemium vs. paid tiers
- Add-on revenue

**Output:**
```markdown
## Pricing Research: B2B SaaS CRM

### Competitor Pricing Models

| Product | Model | Entry Price | Mid Tier | Enterprise |
|---------|-------|-------------|----------|------------|
| HubSpot | Per user | Free | €45/u | €1,200/mo |
| Pipedrive | Per user | €14/u | €34/u | €99/u |
| Bitrix24 | Flat rate | €49/mo | €99/mo | €199/mo |

### Value Metric Trends
- **Per user**: Most common (62%)
- **Per contact**: Growing (23%, e.g., ActiveCampaign)
- **Flat rate**: Declining (15%)

### Optimal Pricing Strategy
**Per user with contact limits**
- Starter: €19/user (up to 1K contacts)
- Professional: €49/user (up to 10K contacts)
- Enterprise: €99/user (unlimited)

**Add-ons:**
- AI Insights: +€29/mo
- Advanced integrations: +€19/mo

### Psychological Pricing
✅ Use €49 instead of €50 (charm pricing)
✅ Anchor with Enterprise tier (€99) to make Pro (€49) look reasonable
✅ Free trial 14 days (no credit card)
```

## Интеграции

### Web Search
- Real-time industry data
- News и публикации
- Competitor websites

### Semrush (via browser-agent)
- Keyword research
- SERP analysis
- Competitor traffic

### Apify
- Review scraping (G2, Trustpilot)
- Competitor website scraping
- SERP scraping

### Google Workspace
- Sheets для data compilation
- Docs для research reports

### Notion
- Knowledge base для research findings
- Competitive intelligence database

## Принципы

- **Data-driven**: Все выводы подкреплены данными
- **Actionable insights**: Каждый research report содержит recommendations
- **DACH-focus**: Учитывай специфику немецкого рынка (GDPR, культура, язык)
- **Competitive edge**: Фокус на gaps и opportunities
- **Continuous monitoring**: Research — не разовая акция, а ongoing процесс

## Best Practices

### 1. **Начни с market research**
Понимание рынка → правильное позиционирование.

### 2. **Используй multiple sources**
Не полагайся на один источник. Триангуляция данных.

### 3. **Track trends continuously**
Индустрия меняется. Monthly trend monitoring.

### 4. **Документируй findings**
Research report → Notion → доступен всей команде.

### 5. **Translate insights to action**
Research без action items — waste of time.

## Примеры

### Для WS Agency
```bash
/research:market "SEO services DACH region"
/research:competitors "Searchmetrics, Ryte, Sistrix"
/research:trends "AI in SEO 2026"
```

### Для 2Penguins
```bash
/research:market "Digital signage Germany"
/research:customer-insights "Retail digital signage"
/research:pricing "Digital signage SaaS"
```

### Для Topholz24
```bash
/research:keyword "Terrassendielen kaufen"
/research:competitors "HolzLand, Holzhandel-Deutschland"
/research:trends "E-commerce Holz"
```

## Метрики

Research Skill отслеживает:
- **Research requests per month**
- **Actionable insights generated** (insights → implemented changes)
- **Competitive advantage identified** (gaps found → exploited)
- **Market accuracy** (predicted trends vs. reality)

Используй `/research:stats` для аналитики.
