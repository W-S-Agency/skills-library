---
name: "Customer Support"
description: "Ticket triage, draft responses, escalations, knowledge base — для клиентов 2Penguins, WS Agency, Topholz24"
---

# Customer Support Skill

AI-powered customer support для управления тикетами, автоматизации ответов, и построения knowledge base. Предназначен для бизнес-экосистемы Alexander Wirt.

## Команды

### `/support:triage`
Автоматическая сортировка и приоритизация тикетов:

```bash
/support:triage
```

**Анализирует новые тикеты и классифицирует:**

```markdown
## Ticket Triage Results

### 🔴 P0 - Critical (1 ticket)
**#4521** - Сайт недоступен (webseite-wartung.de клиент)
- Customer: MEGA Mietpark
- Issue: 500 error на главной
- Impact: Revenue loss, 2,000+ users/day
- **Action**: Escalate to DevOps immediately
- Assigned: @alexander
- SLA: 1 hour

### 🟠 P1 - High (3 tickets)
**#4522** - Digital signage не показывает контент
- Customer: Retail Shop München
- Issue: Blank screen на 5 displays
- Impact: Customer experience degradation
- **Action**: Remote troubleshooting
- Assigned: @team-2penguins
- SLA: 4 hours

### 🟡 P2 - Medium (7 tickets)
**#4523** - Вопрос по настройке Google Ads
- Customer: WS Agency client
- Issue: Conversion tracking не работает
- **Action**: Schedule call, send documentation
- Assigned: @marketing-team
- SLA: 24 hours

### 🟢 P3 - Low (12 tickets)
- Feature requests
- General inquiries
- Documentation questions
```

**Приоритизация:**
- **P0 (Critical)**: Downtime, security breach, revenue impact
- **P1 (High)**: Functionality broken, significant UX degradation
- **P2 (Medium)**: Non-blocking issues, configuration questions
- **P3 (Low)**: Feature requests, documentation, general inquiries

### `/support:draft-response`
Генерирует draft ответ на тикет:

```bash
/support:draft-response #4523
```

**Анализирует:**
- Ticket history
- Customer context (past tickets, plan, industry)
- Knowledge base articles
- Similar resolved tickets

**Output:**
```markdown
## Draft Response for Ticket #4523

**To**: max.mueller@example.de
**Subject**: Re: Google Ads Conversion Tracking Issue

---

Hallo Max,

vielen Dank für Ihre Nachricht bezüglich des Conversion Trackings.

Ich habe Ihr Konto überprüft und festgestellt, dass der Google Ads Conversion Tag nicht korrekt implementiert ist.

**Das Problem:**
Der Tag fehlt auf der Danke-Seite nach dem Checkout (`/danke`). Ohne diesen Tag können Conversions nicht getrackt werden.

**Die Lösung:**
1. Implementieren Sie den folgenden Code auf `/danke`:
   ```html
   <!-- Google Ads Conversion Tag -->
   <script>
     gtag('event', 'conversion', {
       'send_to': 'AW-123456789/AbC-D_efG-h12_34-567',
       'value': 1.0,
       'currency': 'EUR'
     });
   </script>
   ```

2. Testen Sie den Tag mit Google Tag Assistant

**Alternative:**
Falls Sie den Code nicht selbst implementieren möchten, kann unser Team das für Sie übernehmen (Setup-Gebühr: €99 einmalig).

Lassen Sie mich wissen, wie Sie vorgehen möchten!

Mit freundlichen Grüßen,
WS Agency Team

---

**Internal Notes:**
- Customer ist auf Professional Plan (€299/mo)
- Hat bereits 3 Kampagnen aktiv
- Tech-savvy (hat GTM selbst eingerichtet)
- Upsell opportunity: Conversion Rate Optimization Service (€499/mo)

**Suggested KB Article**: "Google Ads Conversion Tracking einrichten"
**Estimated Response Time**: 2 min (template + customization)
```

**Tone adaptation:**
- **B2B (WS Agency)**: Professionell, lösungsorientiert
- **B2C (Topholz24)**: Freundlich, einfache Sprache
- **Technical (2Penguins)**: Detailliert, mit code examples

### `/support:escalate`
Готовит escalation package для сложных тикетов:

```bash
/support:escalate #4521
```

**Output:**
```markdown
## Escalation Package: Ticket #4521

### Summary
MEGA Mietpark website down (500 error) since 14:30 CET.

### Customer Impact
- **Revenue**: ~€450/hour (estimated)
- **Users affected**: 2,000+ visitors/day
- **Business criticality**: HIGH (main lead generation channel)

### Timeline
- 14:30 - Customer reported issue
- 14:35 - Ticket created (#4521)
- 14:40 - Initial troubleshooting (restarted PHP-FPM, no effect)
- 14:50 - Escalated to DevOps

### Technical Details
- **Hosting**: Shared hosting (webseite-wartung.de infrastructure)
- **Error**: 500 Internal Server Error
- **Logs**: PHP Fatal Error in wp-content/plugins/custom-booking/booking.php:245
- **Likely cause**: Plugin update broke compatibility with PHP 8.2

### Tried Solutions
- ✅ Restart PHP-FPM
- ✅ Clear cache
- ✅ Check file permissions
- ❌ Deactivate plugin (blocked by error)

### Recommended Action
1. SSH access to server
2. Manual plugin deactivation via database:
   ```sql
   UPDATE wp_options SET option_value = '' WHERE option_name = 'active_plugins';
   ```
3. Test site recovery
4. Debug plugin issue or rollback update

### Customer Communication
Draft message prepared (waiting for resolution):
> "Sehr geehrte Damen und Herren,
>
> wir haben das Problem identifiziert und arbeiten derzeit an der Lösung.
> Ihre Website sollte innerhalb der nächsten 30 Minuten wieder verfügbar sein.
>
> Wir informieren Sie umgehend, sobald alles behoben ist."

### SLA Status
⏱️ 20 minutes remaining (1-hour SLA for P0)

### Assigned
@alexander (DevOps escalation)
```

### `/support:kb-create`
Создаёт knowledge base article из resolved ticket:

```bash
/support:kb-create #4523
```

**Output:**
```markdown
## KB Article Draft

**Title**: Google Ads Conversion Tracking einrichten

**Category**: Marketing > Google Ads > Setup

**Tags**: conversion-tracking, google-ads, gtm, analytics

---

# Google Ads Conversion Tracking einrichten

Conversion Tracking ermöglicht es Ihnen, die Effektivität Ihrer Google Ads Kampagnen zu messen.

## Voraussetzungen
- ✅ Aktives Google Ads Konto
- ✅ Website mit Zugriff auf den Code (oder Google Tag Manager)
- ✅ Definierte Conversion-Ziele (z.B. Checkout, Newsletter-Anmeldung)

## Schritt-für-Schritt Anleitung

### 1. Conversion-Aktion erstellen
1. Google Ads → **Tools & Einstellungen** → **Conversions**
2. Klicken Sie auf **+ Neue Conversion-Aktion**
3. Wählen Sie **Website**
4. Wählen Sie Kategorie (z.B. "Kauf")
5. Kopieren Sie den Tag-Code

### 2. Tag implementieren
Fügen Sie den Code auf der **Danke-Seite** ein (die Seite, die nach der Conversion angezeigt wird):

```html
<!-- Google Ads Conversion Tag -->
<script>
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXX',
    'value': 1.0,
    'currency': 'EUR'
  });
</script>
```

**Wichtig**: Ersetzen Sie `AW-XXXXXXXXX/XXXXXXXXXX` mit Ihrer Conversion-ID.

### 3. Mit Google Tag Manager (empfohlen)
1. GTM → **Tags** → **Neu**
2. Tag-Typ: **Google Ads Conversion Tracking**
3. Conversion-ID eingeben
4. Trigger: **Danke-Seite** (z.B. Page URL contains `/danke`)
5. Speichern & Veröffentlichen

### 4. Testen
1. Installieren Sie [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Führen Sie eine Test-Conversion durch
3. Überprüfen Sie, ob der Tag gefeuert hat

### 5. Verifizieren
- Google Ads → **Conversions**
- Status sollte "Kürzlich aufgezeichnet" anzeigen (kann bis zu 24h dauern)

## Häufige Probleme

### Tag feuert nicht
- ✅ Überprüfen Sie, ob der Code auf der richtigen Seite ist
- ✅ Prüfen Sie mit Tag Assistant, ob Tag vorhanden ist
- ✅ Deaktivieren Sie Adblocker beim Testen

### Conversions werden nicht angezeigt
- ⏱️ Warten Sie 24-48 Stunden (Verzögerung normal)
- ✅ Prüfen Sie, ob Conversion-ID korrekt ist

## Weiterführende Links
- [Google Ads Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722022)
- [GTM Setup für Conversion Tracking](link)

---

**Verwandte Artikel**:
- Google Ads Kampagne erstellen
- Google Tag Manager einrichten
- Conversion Rate Optimization Basics

**Last Updated**: 2026-02-21
**Author**: WS Agency Support Team
```

**Automatisch:**
- Kategorisация
- SEO-friendly URL (`/kb/google-ads-conversion-tracking-einrichten`)
- Related articles (based on tags)
- Search indexing

### `/support:customer-context`
Полный контекст клиента для персонализированного ответа:

```bash
/support:customer-context "max.mueller@example.de"
```

**Output:**
```markdown
## Customer Context: Max Mueller

### Account Info
- **Company**: MegaShop GmbH
- **Industry**: E-commerce (Fashion)
- **Plan**: WS Agency Professional (€299/mo)
- **Since**: 2024-08-15 (18 months)
- **LTV**: €5,382
- **Health Score**: 🟢 85/100 (Healthy)

### Contact Details
- **Email**: max.mueller@example.de
- **Phone**: +49 89 1234567
- **Preferred**: Email (business hours)

### Past Tickets
- **Total**: 12 tickets
- **Avg Response Time**: 2.3 hours
- **CSAT**: 4.8/5 ⭐⭐⭐⭐⭐

**Recent:**
- #4320 (2 weeks ago): Google Ads budget question → Resolved
- #4105 (1 month ago): SEO audit request → Resolved
- #3891 (3 months ago): Meta Pixel setup → Resolved

### Active Services
- ✅ Google Ads Management (3 campaigns, €1,200/mo spend)
- ✅ SEO (20 keywords tracked)
- ✅ Monthly reporting

### Notes
- 💰 **Upsell opportunity**: Mentioned interest in TikTok Ads (last call 2026-01-10)
- 🎯 **Decision maker**: Yes (CEO)
- 📞 **Best contact time**: Morning (9-11 AM)
- 🗣️ **Communication style**: Direct, data-driven

### Sentiment
🟢 Positive - Last interaction: "Super Service, sehr zufrieden!"

### Recommendations
- ✅ Address quickly (high-value customer)
- ✅ Proactive: Mention TikTok Ads opportunity in response
- ✅ Tone: Professional, data-backed
```

## Интеграции

### Bitrix24
- Ticket management (CRM)
- Contact database
- Deal tracking

### Slack
- Escalation notifications
- Team collaboration

### Intercom (опционально)
- Live chat
- Customer messaging

### Notion
- Knowledge base hosting
- Internal documentation

### Google Workspace
- Gmail для email support
- Sheets для ticket analytics

## Принципы

- **Speed**: Первый ответ в течение 1 часа (P0), 4 часов (P1)
- **Personalization**: Используй customer context для relevant ответов
- **Knowledge capture**: Каждый resolved ticket → potential KB article
- **Escalation clarity**: Clear escalation criteria и процесс
- **CSAT focus**: Customer satisfaction — primary metric

## Best Practices

### 1. **Triage first thing in the morning**
Запускай `/support:triage` каждое утро для prioritization.

### 2. **Use templates, but personalize**
Draft responses — starting point, не copy-paste.

### 3. **Document everything in KB**
Recurring questions → KB articles → меньше тикетов.

### 4. **Escalate proactively**
Не жди SLA deadline. Escalate early если не уверен.

### 5. **Follow up**
После resolution, спроси "Did this solve your issue?"

## Метрики

Support Skill отслеживает:
- **First Response Time** (target: < 1 hour P0, < 4 hours P1)
- **Resolution Time** (target: < 24 hours)
- **CSAT Score** (target: > 4.5/5)
- **Ticket Volume** (trend: decreasing via KB)
- **Escalation Rate** (target: < 10%)

Используй `/support:stats` для dashboard.

## Примеры

### Для 2Penguins (Digital Signage)
```bash
/support:triage
# → P0: Display offline в Frankfurt store
/support:draft-response #1234
# → Troubleshooting steps + remote access offer
```

### Для WS Agency (Marketing)
```bash
/support:customer-context "client@example.com"
# → Account history, service usage, upsell opportunities
/support:draft-response #5678
# → Personalized marketing advice
```

### Для Topholz24 (E-commerce)
```bash
/support:triage
# → P2: Versand-Frage, P3: Product inquiry
/support:kb-create #9012
# → "Versand nach Österreich: Kosten und Lieferzeit"
```
