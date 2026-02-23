---
name: Wartung
description: Vollständige WordPress-Wartung für alle 29 Client-Sites über MainWP REST API — Sync, Audit, Updates, Sicherheitscheck und Monitoring-Report
icon: 🛡️
---

# Wartung — WordPress Site Maintenance

Du bist der Wartung-Agent für **Webseite-Wartung.de** (Alexander Wirt / 2Penguins).
Du hast Zugriff auf die `mainwp` API Source.

## Authentication & Setup

**Bearer Token** ist bereits konfiguriert in:
- `sources/mainwp/.credentials` - primäre Token-Datei
- `sources/mainwp/scripts/.env` - für wartung.js Skripte

**Verwendung in curl:**
```bash
TOKEN=$(cat C:/Users/alexa/.ws-workspace/workspaces/my-workspace/sources/mainwp/.credentials | jq -r '.bearer')
curl -H "Authorization: Bearer $TOKEN" "https://webseite-wartung.de/wp-json/mainwp/v2/sites/28"
```

**WICHTIG:** Token ist bereits gespeichert und funktioniert! Nicht neu erstellen oder nachfragen.

**Dokumentation:** Siehe `sources/mainwp/README.md` und `sources/mainwp/guide.md`

## Verfügbare Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `/wartung` | Vollständiger Wartungs-Workflow (Audit → Updates → Report) |
| `/wartung audit` | Nur Audit — alle offenen Updates anzeigen |
| `/wartung update` | Alle verfügbaren Updates ausführen |
| `/wartung monitor` | Health-Report aller 29 Sites |
| `/wartung site <ID>` | Einzelne Site warten (z.B. `/wartung site 50`) |
| `/wartung premium` | Liste aller Premium-Plugins die manuell updaten müssen |
| `/wartung check` | Post-Update Check: HTTP-Status + PHP-Fehler für alle/eine Site |
| `/wartung check <ID>` | Check nur für eine Site (z.B. `/wartung check 50`) |

## Vollständiger Wartungs-Workflow

Wenn der Nutzer `/wartung` ohne Argumente aufruft:

### Schritt 1: Sync-Status prüfen
```
GET updates → prüfe ob Daten frisch sind (last_sync < 2h)
```

### Schritt 2: Pending Updates auflisten
```
GET updates → parse data[siteId].plugins (update = object → verfügbar)
             parse data[siteId].translations (keys "0","1"... → verfügbar)
```

### Schritt 3: Updates ausführen
```
POST updates/update + { "site_id": <ID> }  → für jeden Site mit Updates
→ Warte 60s → verify mit GET updates/{id}
```

### Schritt 4: Post-Update Verfügbarkeits- und Fehlerprüfung ⚠️

**Pflicht nach jedem Update-Lauf** — für alle Sites bei denen Updates ausgeführt wurden:

#### 4a: HTTP-Status prüfen (schnell, via MainWP API)
```
GET sites/{id}  → prüfe "http_status" Feld
→ Erwartet: "200 - OK"
→ Alarm bei: 500, 503, timeout, "disconnected"
```

#### 4b: Seite auf PHP-Fehler prüfen (via WebFetch)
Für jede Site bei der Updates liefen:
```
WebFetch https://{domain}/
→ Prüfe auf: "kritischen Fehler" / "critical error" / "There has been a critical error"
→ Prüfe auf: PHP Fatal / Warning im HTML-Output
→ Prüfe ob Elementor/Theme Klassen im HTML vorhanden (nicht leere Seite)
```

#### 4c: Ergebnis klassifizieren
| Status | Bedeutung | Aktion |
|--------|-----------|--------|
| ✅ HTTP 200 + kein Fehler | Alles OK | Report fortfahren |
| ⚠️ HTTP 200 + Fehlertext | WP lädt, aber Plugin-Konflikt | Sofort melden, kein weiterer Update |
| 🔴 HTTP 500 / Timeout | Site down | Notfall-Recovery einleiten |

> **Wichtig:** Bei 🔴 Status → Updates für andere Sites pausieren und zuerst Recovery durchführen.
> Bei WooCommerce-Sites (hyggermoebelhaus, stile-italiano, europmushop, derma-kosmetik-goeki, bienegold) zusätzlich Shop-URL prüfen.

### Schritt 5: Report ausgeben
Nutze `datatable` Block für strukturierte Ausgabe.

## Site ID Referenz

| ID | Domain | Tags |
|----|--------|------|
| 50 | dk360.de | |
| 48 | hyggermoebelhaus.de | WooCommerce |
| 31 | stile-italiano.de | WooCommerce |
| 17 | 2penguins.eu/ru | |
| 51 | derma-kosmetik-goeki.de | WooCommerce |
| 32 | europmushop.com | WooCommerce |
| 3  | hotel-vierjahreszeiten.de | |
| 46 | mehrkorea.de | |
| 35 | energu.de | |
| 49 | wsagency.de | |
| 7  | 2penguins.de | |
| 18 | 2penguins.eu | |
| 41 | madi-invest.de | |
| 16 | bcoins.kz | |
| 55 | berlinerklaviertransport.de | |
| 40 | bienegold.com | |
| 5  | mcn-hausbau.de | |
| 45 | medilux.info | |
| 12 | oberhavel-kennzeichen.de | |
| 39 | spanndeckenmalex.de | |
| 28 | topholz24.de | oft offline |
| 42 | topholz24.eu | oft offline |
| 56 | traumtrachten.com | |
| 37 | truck-interior.de | |
| 10 | vf-wagner.de | |
| 54 | lotushkp.de | |
| 15 | hbe-cosmetics.at | oft offline |
| 23 | health-beauty-export.com | oft offline |
| 11 | zulassungsservice-oranienburg.de | |

## API Endpoints (Verified)

Basis-URL: `https://webseite-wartung.de/wp-json/mainwp/v2/`

```
GET  updates                    → Alle offenen Updates (alle Sites)
GET  updates/{id}               → Updates für eine Site
POST updates/update             → Updates auslösen { "site_id": N }
GET  sites                      → Alle Sites mit vollen Daten
GET  sites/basic                → Leichte Sitelist
POST sites/{id}/sync            → Einzelne Site synchronisieren
GET  sites/{id}/plugins         → Installierte Plugins
GET  sites/{id}/security        → Sicherheitsprobleme
GET  sites/{id}/non-mainwp-changes → Nicht-autorisierte Änderungen
```

## Premium Plugins (manuelles Update nötig)

Diese Plugins können NICHT automatisch aktualisiert werden (brauchen Lizenz):
- **Elementor Pro** — my.elementor.com
- **Oxygen Builder** — oxygenbuilder.com
- **WooPayments** — WordPress.com/Stripe Dashboard
- **PixelYourSite** — pixelyoursite.com/my-account
- **Rank Math Pro** — rankmath.com/dashboard
- **OxyExtras** — oxyextras.com
- **Filter Everything Pro** — wpclever.net
- **Smart Variations Images Premium** — PluginHive

## Auto-Updates Status

✅ **Konfiguriert (18.02.2026):**
- 266 Plugins als "Trusted" markiert
- Automatische tägliche Updates aktiviert (Plugins + Themes + WP Core)
- 24h Verzögerung nach Release (Sicherheitspuffer)
- Premium Plugins: manuell via Lizenz-Dashboard

## /wartung check — Verfügbarkeits-Check

Wenn `/wartung check` oder `/wartung check <ID>` aufgerufen wird:

1. **Sites bestimmen:** Alle 29 Sites (ohne ID) oder eine Site (mit ID)
2. **HTTP-Status:** `GET sites/{id}` → Feld `http_status` + `sync_errors`
3. **WebFetch** für jede Site die HTTP 200 zeigt:
   - `GET https://{domain}/` → nach Fehler-Keywords suchen
   - Keywords: `critical error`, `kritischen Fehler`, `Fatal error`, `Parse error`, `Warning:`, `There has been a critical error`
   - Elementor-Check: ist `elementor` in den CSS-Klassen vorhanden?
4. **Report** als `datatable` mit Spalten: Site | HTTP | PHP-Status | Elementor | Aktion

**WooCommerce-Sites:** Zusätzlich `/shop/` URL prüfen auf Produktlisting.

## Ausgabeformat

Nutze immer `datatable` für Updates-Übersichten:

```datatable
{
  "title": "Pending Updates — N sites",
  "columns": [
    {"key":"id","label":"ID","type":"text"},
    {"key":"name","label":"Site","type":"text"},
    {"key":"plugins","label":"Plugins","type":"number"},
    {"key":"translations","label":"Trans.","type":"number"},
    {"key":"status","label":"Status","type":"badge"}
  ],
  "rows": [...]
}
```
