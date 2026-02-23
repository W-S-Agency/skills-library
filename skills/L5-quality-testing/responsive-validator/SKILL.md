---
name: responsive-validator
description: Comprehensive responsive testing - multi-browser, WCAG accessibility, layout verification, and CI/CD integration
---

# Responsive Validator

**Version:** 1.0.0
**Author:** WS Workspace
**Created:** 2026-02-23

Comprehensive responsive testing tool for cross-browser, cross-device validation with WCAG accessibility checks, layout verification, and CI/CD integration.

---

## 🎯 Purpose

Automated testing solution for:
- ✅ Multi-browser compatibility (WebKit/Safari, Chromium/Chrome, Firefox)
- ✅ Responsive design validation (mobile, tablet, desktop, foldables)
- ✅ Layout verification (overlaps, gaps, positioning)
- ✅ WCAG 2.1 accessibility compliance (Level A/AA)
- ✅ Visual regression testing with AI-powered diffing
- ✅ Performance metrics (Core Web Vitals)
- ✅ Cache detection (WP Rocket, W3 Total Cache, Cloudflare)
- ✅ CI/CD integration (GitHub Actions)

---

## 🚀 Quick Start

### Basic Usage

```bash
# Test website with all browsers and standard breakpoints
/responsive-validator https://example.com

# Quick test (WebKit only, 3 resolutions)
/responsive-validator https://example.com --quick

# CI mode (JSON output, exit on failures)
/responsive-validator https://example.com --ci
```

### With Configuration

```bash
# Use config file
/responsive-validator --config responsive.config.js

# Specific browsers
/responsive-validator https://example.com --browsers webkit,chromium

# Specific checks
/responsive-validator https://example.com --checks visual,layout,accessibility
```

---

## 📊 Features

### 1. Multi-Browser Testing
Tests across Playwright-native browsers (WebKit 19.4%, Chromium 65%, Firefox 3%)

### 2. Responsive Breakpoints (2026 Standard)
16 standard breakpoints from mobile (375px) to desktop 2K (2560px)

### 3. Layout Verification
- Overlap detection (reports pixel distance)
- Gap measurement (spacing validation)
- Positioning validation (center/left/right alignment)

### 4. WCAG Accessibility (57% coverage)
- Level A (Critical), AA (Serious), Best Practices
- 4 categories: Perceivable, Operable, Understandable, Robust

### 5. Visual Regression Testing
- AI-powered semantic diffing
- Animation handling
- Baseline management with git

### 6. Performance Metrics
- Core Web Vitals (LCP, FID, CLS)
- Load time, TTI, Network requests

### 7. Cache Detection
Auto-detects WP Rocket, W3TC, LiteSpeed, Cloudflare

---

## 🛠️ Configuration

Create `responsive.config.js`:

```javascript
export default {
  url: 'https://example.com',
  browsers: ['webkit', 'chromium', 'firefox'],
  breakpoints: {
    mobile: ['iPhone 13'],
    tablet: ['iPad Pro 11'],
    desktop: [1280, 1440, 1920]
  },
  checks: {
    visual: true,
    layout: true,
    accessibility: { enabled: true, wcagLevel: 'AA' },
    performance: true
  },
  output: {
    dir: '~/.ws-workspace/reports/responsive-validator',
    openBrowser: true
  }
};
```

---

## 📁 Output

Reports saved to: `~/.ws-workspace/reports/responsive-validator/`

```
2026-02-23-example-com-210045/
├── report.html              # Interactive report
├── results.json             # Machine-readable
├── screenshots/
│   ├── webkit-1440x900.png
│   └── ...
└── traces/                  # Debug traces
```

---

## 📊 HTML Report Sections

1. **Summary Dashboard** - Stats, matrix, severity
2. **Visual Gallery** - Screenshots with comparison
3. **Layout Issues** - Overlaps, gaps, positioning
4. **Accessibility** - WCAG violations with fixes
5. **Performance** - Core Web Vitals
6. **Cache Detection** - Plugin warnings
7. **Recommendations** - Priority fixes

---

## 🔄 CI/CD Integration

Generate GitHub Actions workflow:

```bash
/responsive-validator --init-ci
```

Features:
- Parallel execution across browsers
- Sharded tests (4 workers)
- 30-day artifact retention
- PR comments with results
- Slack notifications

---

## 🧪 Examples

### Full Audit
```bash
/responsive-validator https://autohaus-maletzki.de \
  --browsers webkit,chromium \
  --checks all \
  --wcag AA
```

### Quick Safari Check
```bash
/responsive-validator https://example.com --quick
```

### CI Pipeline
```bash
/responsive-validator $STAGING_URL --ci --fail-on critical
```

---

## 🔧 Advanced Options

```bash
--browsers <list>          # webkit,chromium,firefox
--breakpoints <list>       # mobile,tablet,desktop
--checks <list>            # visual,layout,accessibility,performance
--quick                    # Fast test (2 min)
--ci                       # CI mode (JSON + exit codes)
--update-baselines         # Update visual baselines
--wcag <level>             # A, AA, AAA
--verbose                  # Detailed logging
--timeout <ms>             # Page load timeout
```

---

## 📚 Technical Details

**Dependencies:**
- playwright ^1.58.0
- @axe-core/playwright ^4.10.0
- lighthouse ^12.0.0

**Performance:**
- Parallel: 4 workers
- Quick mode: ~2 min
- Full test: ~15 min

**Storage:**
- Screenshots: PNG
- Traces: ZIP
- Retention: 30 days

---

## 🐛 Troubleshooting

**Different screenshots locally vs CI?**
→ Use Docker container for consistency

**WCAG false positives?**
→ Exclude third-party widgets

**Flaky visual tests?**
→ Disable animations, wait for fonts

---

## 📖 Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [axe-core GitHub](https://github.com/dequelabs/axe-core-npm)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Visual Testing Best Practices](https://bug0.com/knowledge-base/visual-regression-testing)

---

## 📝 Changelog

### v1.0.0 (2026-02-23)
- Initial release with full feature set
- Multi-browser, WCAG, visual regression, CI/CD

---

**Made with ❤️ by WS Workspace**
**Powered by Playwright + axe-core + Lighthouse**
