/**
 * Test Runner - Main test orchestrator
 * Coordinates browser testing across multiple devices and checks
 */

import { BrowserManager } from './browser-manager.js';
import { VisualTester } from '../checks/visual-tester.js';
import { LayoutVerifier } from '../checks/layout-verifier.js';
import { AccessibilityChecker } from '../checks/accessibility.js';
import { PerformanceTester } from '../checks/performance.js';
import chalk from 'chalk';

export async function runTests(url, config) {
  const startTime = Date.now();
  const results = {
    url,
    timestamp: new Date().toISOString(),
    config,
    browsers: [],
    issues: [],
    summary: {
      total: 0,
      passed: 0,
      failed: 0,
      warnings: 0
    }
  };

  const browserManager = new BrowserManager(config);

  try {
    // Initialize browsers
    await browserManager.launch();

    // Get all test combinations (browser + breakpoint)
    const testMatrix = buildTestMatrix(config);
    console.log(chalk.gray(`   Running ${testMatrix.length} test combinations...\n`));

    // Run tests in parallel (4 workers)
    const workers = 4;
    const chunks = chunkArray(testMatrix, Math.ceil(testMatrix.length / workers));

    const workerPromises = chunks.map((chunk, index) =>
      runWorker(chunk, index, browserManager, url, config, results)
    );

    await Promise.all(workerPromises);

    // Calculate summary
    results.summary.total = results.issues.length;
    results.summary.failed = results.issues.filter(i => i.severity === 'critical').length;
    results.summary.warnings = results.issues.filter(i => i.severity === 'warning').length;
    results.summary.passed = results.summary.total - results.summary.failed - results.summary.warnings;

    results.duration = Date.now() - startTime;

    return results;

  } finally {
    await browserManager.close();
  }
}

async function runWorker(testCases, workerId, browserManager, url, config, results) {
  for (const testCase of testCases) {
    const { browser, breakpoint, category } = testCase;

    try {
      const page = await browserManager.getPage(browser, breakpoint.width, breakpoint.height);

      // Navigate to URL
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: config.timeout || 30000
      });

      // Wait for page to stabilize
      await page.waitForTimeout(2000);

      // Create test context
      const context = {
        page,
        url,
        browser,
        breakpoint,
        category
      };

      // Run enabled checks
      const checkResults = [];

      if (config.checks.visual) {
        const visualTester = new VisualTester(config);
        const visualResult = await visualTester.check(context);
        checkResults.push(visualResult);
      }

      if (config.checks.layout) {
        const layoutVerifier = new LayoutVerifier(config);
        const layoutResult = await layoutVerifier.check(context);
        checkResults.push(layoutResult);
      }

      if (config.checks.accessibility) {
        const accessibilityChecker = new AccessibilityChecker(config);
        const accessibilityResult = await accessibilityChecker.check(context);
        checkResults.push(accessibilityResult);
      }

      if (config.checks.performance) {
        const performanceTester = new PerformanceTester(config);
        const performanceResult = await performanceTester.check(context);
        checkResults.push(performanceResult);
      }

      // Collect issues from all checks
      checkResults.forEach(result => {
        if (result.issues && result.issues.length > 0) {
          results.issues.push(...result.issues.map(issue => ({
            ...issue,
            browser,
            breakpoint: `${breakpoint.width}x${breakpoint.height}`,
            category
          })));
        }
      });

      // Store browser result
      const browserResult = {
        browser,
        breakpoint: `${breakpoint.width}x${breakpoint.height}`,
        category,
        checks: checkResults,
        passed: checkResults.every(r => r.passed)
      };

      results.browsers.push(browserResult);

      // Progress indicator
      const status = browserResult.passed ? chalk.green('✓') : chalk.red('✗');
      console.log(chalk.gray(`   [Worker ${workerId}] ${status} ${browser} @ ${breakpoint.width}px`));

    } catch (error) {
      console.error(chalk.red(`   [Worker ${workerId}] ✗ ${browser} @ ${breakpoint.width}px - ${error.message}`));

      results.issues.push({
        type: 'test-error',
        severity: 'critical',
        message: `Test failed: ${error.message}`,
        browser,
        breakpoint: `${breakpoint.width}x${breakpoint.height}`,
        category
      });
    }
  }
}

function buildTestMatrix(config) {
  const matrix = [];

  // Flatten breakpoints into array with categories
  const breakpoints = [];
  Object.entries(config.breakpoints).forEach(([category, widths]) => {
    widths.forEach(width => {
      // Calculate height based on standard aspect ratios
      const height = category === 'mobile' ? Math.round(width * 1.8) :
                     category === 'tablet' ? Math.round(width * 1.3) :
                     Math.round(width * 0.625);

      breakpoints.push({ width, height, category });
    });
  });

  // Create test combinations
  config.browsers.forEach(browser => {
    breakpoints.forEach(breakpoint => {
      matrix.push({ browser, breakpoint, category: breakpoint.category });
    });
  });

  return matrix;
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
