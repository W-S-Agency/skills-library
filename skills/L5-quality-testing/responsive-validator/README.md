# 🚀 Responsive Validator

Comprehensive responsive testing tool for all client websites. Multi-browser testing (WebKit/Safari, Chromium/Chrome, Firefox) with WCAG accessibility checks, layout verification, and CI/CD integration.

## Features

- ✅ **Multi-Browser Testing**: WebKit (Safari), Chromium (Chrome), Firefox
- 📱 **16 Standard Breakpoints**: 375px to 2560px (mobile, tablet, desktop)
- ♿ **WCAG Accessibility**: Automated WCAG 2.1 Level A/AA compliance checks (57% coverage via axe-core)
- 🎨 **Visual Regression**: AI-powered semantic diffing (not pixel-by-pixel)
- 📐 **Layout Verification**: Overlap detection, gap measurement, positioning validation
- ⚡ **Performance Testing**: Core Web Vitals (LCP, CLS, FID)
- 📊 **Interactive HTML Reports**: Filtering, sorting, visual comparisons
- 🔄 **GitHub Actions CI/CD**: Ready-to-use workflow with matrix strategy and sharding

## Installation

```bash
cd ~/.ws-workspace/workspaces/my-workspace/skills/responsive-validator
npm install
npm run install-browsers
```

## Usage

### Basic Usage

```bash
# Test with all browsers and breakpoints (~15 min)
/responsive-validator https://example.com

# Quick test (webkit only, 3 resolutions, ~3 min)
/responsive-validator https://example.com --quick

# Specific browsers
/responsive-validator https://example.com --browsers webkit,chromium

# Specific checks only
/responsive-validator https://example.com --checks layout,accessibility
```

### Advanced Options

```bash
# Custom output directory
/responsive-validator https://example.com -o ./my-reports

# CI mode (JSON output, exit codes)
/responsive-validator https://example.com --ci

# WCAG level AAA
/responsive-validator https://example.com --wcag AAA

# Update visual regression baselines
/responsive-validator https://example.com --update-baselines

# Verbose logging
/responsive-validator https://example.com --verbose
```

### Configuration File

Create `responsive.config.js`:

```bash
/responsive-validator --init-config
```

Then run with config:

```bash
/responsive-validator --config responsive.config.js
```

## GitHub Actions CI/CD

Generate GitHub Actions workflow:

```bash
/responsive-validator --init-ci
```

This creates `.github/workflows/responsive-validator.yml` with:
- ✅ Matrix strategy (3 browsers × 4 shards = 12 parallel jobs)
- ✅ Scheduled daily runs (3 AM UTC)
- ✅ PR comments with test results
- ✅ Artifact uploads (reports + screenshots)

**Setup:**
1. Add `TEST_URL` secret in GitHub repository settings
2. Commit and push workflow file
3. Check Actions tab

## Report Output

Reports are saved to: `~/.ws-workspace/reports/responsive-validator/`

Each report includes:
- 📊 Summary statistics (passed/failed/warnings)
- 🐛 Filterable issues table (by severity, type, browser)
- 🖼️ Browser matrix with all combinations
- 📸 Screenshots for all test runs
- 🔍 Interactive filtering and sorting

## Browser Market Share

Tests prioritize browsers by usage:
- **Chromium**: 65.42% (Chrome, Edge, Brave, Opera)
- **WebKit**: 19.44% (Safari, iOS Safari)
- **Firefox**: 3.09%

## Checks Performed

### Visual Testing
- Screenshot capture with animation stabilization
- Visual regression detection (AI-powered diffing)
- Horizontal scroll detection (layout overflow)
- Invisible text detection (contrast issues)

### Layout Verification
- Element overlap detection
- Gap measurement (header logo-to-nav spacing)
- Offscreen element detection
- Hidden content validation

### Accessibility (WCAG)
- 57% automated coverage of WCAG 2.1 Level A/AA
- Keyboard navigation checks
- Color contrast validation
- ARIA attribute verification
- Semantic HTML structure

### Performance
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay)
- Page size and request count

## Examples

### Test production site
```bash
/responsive-validator https://autohaus-maletzki.de
```

### Quick smoke test before deployment
```bash
/responsive-validator https://staging.example.com --quick
```

### Accessibility audit only
```bash
/responsive-validator https://example.com --checks accessibility --wcag AA
```

### Update baselines after design changes
```bash
/responsive-validator https://example.com --update-baselines
```

## Troubleshooting

### Cache Detection
The tool automatically detects and warns about:
- WP Rocket
- W3 Total Cache
- LiteSpeed Cache
- Cloudflare

**Solution**: Clear cache before testing or use `?nocache=timestamp` URL parameter.

### Playwright Browsers Not Installed
```bash
npm run install-browsers
```

### Permission Denied on Reports Folder
```bash
mkdir -p ~/.ws-workspace/reports/responsive-validator
chmod 755 ~/.ws-workspace/reports/responsive-validator
```

## Architecture

```
responsive-validator/
├── src/
│   ├── core/
│   │   ├── test-runner.js       # Main orchestrator
│   │   └── browser-manager.js   # Playwright lifecycle
│   ├── checks/
│   │   ├── visual-tester.js     # Screenshot + diffing
│   │   ├── layout-verifier.js   # Overlap + gap detection
│   │   ├── accessibility.js     # WCAG via axe-core
│   │   └── performance.js       # Core Web Vitals
│   └── reporters/
│       └── html-reporter.js     # Interactive reports
├── templates/
│   └── github-actions.yml       # CI/CD workflow
├── run.js                       # CLI entry point
├── package.json
└── README.md
```

## Performance

- **Full test** (3 browsers × 16 breakpoints = 48 combinations): ~15 minutes
- **Quick test** (1 browser × 3 breakpoints = 3 combinations): ~3 minutes
- **Parallel execution**: 4 workers by default
- **CI/CD**: 12 parallel jobs (3 browsers × 4 shards)

## License

MIT

## Author

WS Workspace

---

Generated by WS Workspace - AI-powered workflow automation
