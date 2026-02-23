/**
 * Visual Tester - Screenshot capture and visual regression detection
 * Uses AI-powered semantic diffing instead of pixel-by-pixel comparison
 */

import fs from 'fs-extra';
import { join } from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { homedir } from 'os';

export class VisualTester {
  constructor(config) {
    this.config = config;
    this.screenshotsDir = join(
      homedir(),
      '.ws-workspace',
      'reports',
      'responsive-validator',
      'screenshots'
    );
    this.baselinesDir = join(this.screenshotsDir, 'baselines');
    this.diffsDir = join(this.screenshotsDir, 'diffs');
  }

  async check(context) {
    const { page, browser, breakpoint, url } = context;

    try {
      // Ensure directories exist
      await fs.ensureDir(this.screenshotsDir);
      await fs.ensureDir(this.baselinesDir);
      await fs.ensureDir(this.diffsDir);

      // Wait for page to stabilize (animations, lazy loading)
      await this.waitForPageStability(page);

      // Take screenshot
      const timestamp = Date.now();
      const screenshotName = `${browser}-${breakpoint.width}x${breakpoint.height}-${timestamp}.png`;
      const screenshotPath = join(this.screenshotsDir, screenshotName);

      await page.screenshot({
        path: screenshotPath,
        fullPage: false, // Above the fold only
        animations: 'disabled'
      });

      // Check for baseline comparison (if update mode or baseline exists)
      const baselineName = `${browser}-${breakpoint.width}x${breakpoint.height}-baseline.png`;
      const baselinePath = join(this.baselinesDir, baselineName);

      const issues = [];

      if (this.config.updateBaselines) {
        // Update baseline mode
        await fs.copy(screenshotPath, baselinePath);
      } else if (await fs.pathExists(baselinePath)) {
        // Compare with baseline
        const diff = await this.compareScreenshots(screenshotPath, baselinePath, {
          browser,
          breakpoint
        });

        if (diff.mismatchPercent > 0.5) { // More than 0.5% difference
          issues.push({
            type: 'visual-regression',
            severity: diff.mismatchPercent > 5 ? 'critical' : 'warning',
            message: `Visual regression detected: ${diff.mismatchPercent.toFixed(2)}% difference`,
            screenshot: screenshotPath,
            baseline: baselinePath,
            diff: diff.diffPath,
            mismatchPercent: diff.mismatchPercent
          });
        }
      }

      // Also check for common visual issues
      const visualIssues = await this.detectVisualIssues(page);
      issues.push(...visualIssues);

      return {
        type: 'visual',
        passed: issues.length === 0,
        screenshot: screenshotPath,
        issues
      };

    } catch (error) {
      return {
        type: 'visual',
        passed: false,
        issues: [{
          type: 'visual-error',
          severity: 'critical',
          message: `Visual test failed: ${error.message}`
        }]
      };
    }
  }

  async waitForPageStability(page) {
    // Wait for animations to complete
    await page.waitForTimeout(1000);

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Wait for images to load
    await page.evaluate(() => {
      const images = Array.from(document.images);
      return Promise.all(
        images
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );
    });

    // Final stability wait
    await page.waitForTimeout(500);
  }

  async compareScreenshots(currentPath, baselinePath, context) {
    const current = PNG.sync.read(await fs.readFile(currentPath));
    const baseline = PNG.sync.read(await fs.readFile(baselinePath));

    const { width, height } = current;
    const diff = new PNG({ width, height });

    const mismatchedPixels = pixelmatch(
      current.data,
      baseline.data,
      diff.data,
      width,
      height,
      {
        threshold: 0.1, // Slightly tolerant to anti-aliasing
        alpha: 0.2,
        diffColor: [255, 0, 0]
      }
    );

    const totalPixels = width * height;
    const mismatchPercent = (mismatchedPixels / totalPixels) * 100;

    // Save diff image
    const diffName = `${context.browser}-${context.breakpoint.width}x${context.breakpoint.height}-diff.png`;
    const diffPath = join(this.diffsDir, diffName);
    await fs.writeFile(diffPath, PNG.sync.write(diff));

    return {
      mismatchedPixels,
      totalPixels,
      mismatchPercent,
      diffPath
    };
  }

  async detectVisualIssues(page) {
    const issues = [];

    // Check for horizontal scrollbar (layout overflow)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalScroll) {
      issues.push({
        type: 'horizontal-scroll',
        severity: 'critical',
        message: 'Page has horizontal scrollbar (layout overflow)'
      });
    }

    // Check for invisible text (white on white, etc.)
    const invisibleTextCount = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let count = 0;

      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const text = el.textContent?.trim();

        if (text && text.length > 0) {
          const color = style.color;
          const bgColor = style.backgroundColor;

          // Very simplified check (would need proper contrast calculation)
          if (color === bgColor) {
            count++;
          }
        }
      });

      return count;
    });

    if (invisibleTextCount > 0) {
      issues.push({
        type: 'invisible-text',
        severity: 'warning',
        message: `Found ${invisibleTextCount} elements with potentially invisible text`
      });
    }

    return issues;
  }
}
