/**
 * Accessibility Checker - WCAG compliance using axe-core
 * Provides 57% automated coverage of WCAG 2.1 Level A/AA
 */

import { injectAxe, getViolations, configureAxe } from '@axe-core/playwright';

export class AccessibilityChecker {
  constructor(config) {
    this.config = config;
    this.wcagLevel = config.checks.accessibility?.wcagLevel || 'AA';
  }

  async check(context) {
    const { page } = context;

    try {
      // Inject axe-core
      await injectAxe(page);

      // Configure axe based on WCAG level
      await configureAxe(page, {
        rules: this.getRulesForWcagLevel()
      });

      // Run accessibility scan
      const violations = await getViolations(page);

      // Transform violations to our issue format
      const issues = violations.map(violation => ({
        type: 'accessibility',
        severity: this.mapSeverity(violation.impact),
        message: violation.description,
        wcagCriteria: violation.tags.filter(tag => tag.startsWith('wcag')),
        impact: violation.impact,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map(node => ({
          html: node.html,
          target: node.target,
          failureSummary: node.failureSummary
        }))
      }));

      // Add summary statistics
      const summary = {
        total: issues.length,
        critical: issues.filter(i => i.severity === 'critical').length,
        serious: issues.filter(i => i.impact === 'serious').length,
        moderate: issues.filter(i => i.impact === 'moderate').length,
        minor: issues.filter(i => i.impact === 'minor').length
      };

      return {
        type: 'accessibility',
        passed: summary.critical === 0 && summary.serious === 0,
        wcagLevel: this.wcagLevel,
        summary,
        issues
      };

    } catch (error) {
      return {
        type: 'accessibility',
        passed: false,
        issues: [{
          type: 'accessibility-error',
          severity: 'critical',
          message: `Accessibility check failed: ${error.message}`
        }]
      };
    }
  }

  getRulesForWcagLevel() {
    // Define which WCAG rules to enable based on level
    const levels = {
      'A': ['wcag2a'],
      'AA': ['wcag2a', 'wcag2aa'],
      'AAA': ['wcag2a', 'wcag2aa', 'wcag2aaa']
    };

    return levels[this.wcagLevel] || levels['AA'];
  }

  mapSeverity(axeImpact) {
    // Map axe-core impact levels to our severity levels
    const mapping = {
      'critical': 'critical',
      'serious': 'critical',
      'moderate': 'warning',
      'minor': 'warning'
    };

    return mapping[axeImpact] || 'warning';
  }
}
