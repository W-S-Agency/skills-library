#!/usr/bin/env node

/**
 * Responsive Validator - Main Entry Point
 *
 * Usage:
 *   node run.js https://example.com
 *   node run.js https://example.com --quick
 *   node run.js https://example.com --browsers webkit,chromium
 *   node run.js --init-ci
 */

import { program } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { homedir } from 'os';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default configuration
const DEFAULT_CONFIG = {
  browsers: ['webkit', 'chromium', 'firefox'],
  breakpoints: {
    mobile: [375, 390, 430],
    tablet: [768, 834, 912],
    desktop: [1280, 1440, 1728, 1920, 2560]
  },
  checks: {
    visual: true,
    layout: true,
    accessibility: true,
    performance: true
  },
  output: {
    dir: join(homedir(), '.ws-workspace', 'reports', 'responsive-validator'),
    format: 'html',
    openBrowser: true
  }
};

program
  .name('responsive-validator')
  .description('Comprehensive responsive testing tool')
  .version('1.0.0')
  .argument('[url]', 'URL to test')
  .option('-b, --browsers <list>', 'Browsers to test (webkit,chromium,firefox)', 'webkit,chromium,firefox')
  .option('-bp, --breakpoints <list>', 'Breakpoints (mobile,tablet,desktop)', 'mobile,tablet,desktop')
  .option('-c, --checks <list>', 'Checks to perform (visual,layout,accessibility,performance)', 'visual,layout,accessibility,performance')
  .option('--quick', 'Quick test (webkit only, 3 resolutions)')
  .option('--ci', 'CI mode (JSON output, exit codes)')
  .option('--wcag <level>', 'WCAG level (A, AA, AAA)', 'AA')
  .option('--config <path>', 'Config file path')
  .option('--init-ci', 'Generate GitHub Actions workflow')
  .option('--init-config', 'Generate config file template')
  .option('--update-baselines', 'Update visual regression baselines')
  .option('--verbose', 'Verbose logging')
  .option('--headless', 'Run in headless mode', true)
  .option('--timeout <ms>', 'Page load timeout', '30000')
  .option('-o, --output-dir <path>', 'Custom output directory')
  .option('--open', 'Open report in browser', true)
  .parse();

const options = program.opts();
const url = program.args[0];

// Main execution
(async () => {
  try {
    console.log(chalk.blue.bold('\n🚀 Responsive Validator v1.0.0\n'));

    // Handle init commands
    if (options.initCi) {
      await initCiWorkflow();
      return;
    }

    if (options.initConfig) {
      await initConfigFile();
      return;
    }

    // Validate URL
    if (!url) {
      console.error(chalk.red('❌ Error: URL is required'));
      console.log(chalk.gray('Usage: /responsive-validator https://example.com'));
      process.exit(1);
    }

    // Load configuration
    const config = await loadConfig(options);

    // Show test plan
    console.log(chalk.cyan('📋 Test Plan:'));
    console.log(chalk.gray(`   URL: ${url}`));
    console.log(chalk.gray(`   Browsers: ${config.browsers.join(', ')}`));
    console.log(chalk.gray(`   Breakpoints: ${getTotalBreakpoints(config.breakpoints)}`));
    console.log(chalk.gray(`   Checks: ${Object.keys(config.checks).filter(k => config.checks[k]).join(', ')}`));
    console.log('');

    // Run tests
    const spinner = ora('Initializing Playwright...').start();

    // Import test runner
    const { runTests } = await import('./src/core/test-runner.js');

    spinner.text = 'Running tests...';
    const results = await runTests(url, config);

    spinner.succeed(chalk.green('Tests completed!'));

    // Generate report
    const reportSpinner = ora('Generating report...').start();
    const { generateReport } = await import('./src/reporters/html-reporter.js');
    const reportPath = await generateReport(results, config);
    reportSpinner.succeed(chalk.green(`Report generated: ${reportPath}`));

    // Open report
    if (config.output.openBrowser && !options.ci) {
      const { exec } = await import('child_process');
      exec(`start ${reportPath}`);
    }

    // Exit with appropriate code
    const hasFailures = results.issues.filter(i => i.severity === 'critical').length > 0;
    process.exit(hasFailures && options.ci ? 1 : 0);

  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();

// Helper functions
async function loadConfig(options) {
  let config = { ...DEFAULT_CONFIG };

  // Load from file if specified
  if (options.config) {
    const configPath = join(process.cwd(), options.config);
    if (await fs.pathExists(configPath)) {
      const fileConfig = await import(configPath);
      config = { ...config, ...fileConfig.default };
    }
  }

  // Override with CLI options
  if (options.quick) {
    config.browsers = ['webkit'];
    config.breakpoints = { desktop: [1280, 1440, 1920] };
  }

  if (options.browsers) {
    config.browsers = options.browsers.split(',');
  }

  if (options.checks) {
    const checks = options.checks.split(',');
    config.checks = {
      visual: checks.includes('visual'),
      layout: checks.includes('layout'),
      accessibility: checks.includes('accessibility'),
      performance: checks.includes('performance')
    };
  }

  if (options.wcag) {
    config.checks.accessibility = {
      enabled: true,
      wcagLevel: options.wcag
    };
  }

  if (options.outputDir) {
    config.output.dir = options.outputDir;
  }

  if (options.open === false) {
    config.output.openBrowser = false;
  }

  config.ci = options.ci || false;
  config.updateBaselines = options.updateBaselines || false;
  config.verbose = options.verbose || false;
  config.headless = options.headless !== false;
  config.timeout = parseInt(options.timeout);

  return config;
}

function getTotalBreakpoints(breakpoints) {
  return Object.values(breakpoints).flat().length;
}

async function initCiWorkflow() {
  const workflowContent = await fs.readFile(
    join(__dirname, 'templates', 'github-actions.yml'),
    'utf-8'
  );

  const workflowPath = join(process.cwd(), '.github', 'workflows', 'responsive-validator.yml');
  await fs.ensureDir(dirname(workflowPath));
  await fs.writeFile(workflowPath, workflowContent);

  console.log(chalk.green('✅ Created: .github/workflows/responsive-validator.yml'));
  console.log(chalk.gray('\nNext steps:'));
  console.log(chalk.gray('1. Add TEST_URL to GitHub Secrets'));
  console.log(chalk.gray('2. Commit and push workflow file'));
  console.log(chalk.gray('3. Check Actions tab on GitHub'));
}

async function initConfigFile() {
  const configContent = `export default {
  url: 'https://example.com',

  browsers: ['webkit', 'chromium', 'firefox'],

  breakpoints: {
    mobile: [375, 390, 430],
    tablet: [768, 834, 912],
    desktop: [1280, 1440, 1728, 1920]
  },

  checks: {
    visual: true,
    layout: true,
    accessibility: {
      enabled: true,
      wcagLevel: 'AA',
      excludeSelectors: ['#third-party-widget']
    },
    performance: true
  },

  layout: {
    overlap: {
      pairs: [
        ['header .logo', 'header nav'],
        ['.sidebar', '.content']
      ]
    },
    gaps: {
      minimum: {
        'logo-to-nav': 20,
        'nav-items': 10
      }
    }
  },

  output: {
    format: 'html',
    dir: '~/.ws-workspace/reports/responsive-validator',
    openBrowser: true
  }
};`;

  const configPath = join(process.cwd(), 'responsive.config.js');
  await fs.writeFile(configPath, configContent);

  console.log(chalk.green('✅ Created: responsive.config.js'));
  console.log(chalk.gray('\nEdit the config file and run:'));
  console.log(chalk.cyan('  /responsive-validator --config responsive.config.js'));
}
