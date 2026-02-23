/**
 * Performance Tester - Core Web Vitals measurement
 * Measures LCP, FID, CLS and other performance metrics
 */

export class PerformanceTester {
  constructor(config) {
    this.config = config;
  }

  async check(context) {
    const { page } = context;

    try {
      const issues = [];

      // Collect Core Web Vitals
      const metrics = await this.collectMetrics(page);

      // Check LCP (Largest Contentful Paint)
      if (metrics.lcp > 2500) {
        issues.push({
          type: 'performance-lcp',
          severity: metrics.lcp > 4000 ? 'critical' : 'warning',
          message: `LCP too slow: ${metrics.lcp}ms (should be < 2.5s)`,
          value: metrics.lcp,
          metric: 'LCP'
        });
      }

      // Check CLS (Cumulative Layout Shift)
      if (metrics.cls > 0.1) {
        issues.push({
          type: 'performance-cls',
          severity: metrics.cls > 0.25 ? 'critical' : 'warning',
          message: `CLS too high: ${metrics.cls.toFixed(3)} (should be < 0.1)`,
          value: metrics.cls,
          metric: 'CLS'
        });
      }

      // Check total page size
      if (metrics.totalSize > 3 * 1024 * 1024) { // > 3MB
        issues.push({
          type: 'performance-size',
          severity: 'warning',
          message: `Page size too large: ${(metrics.totalSize / 1024 / 1024).toFixed(2)}MB`,
          value: metrics.totalSize,
          metric: 'Page Size'
        });
      }

      // Check number of requests
      if (metrics.requestCount > 100) {
        issues.push({
          type: 'performance-requests',
          severity: 'warning',
          message: `Too many requests: ${metrics.requestCount}`,
          value: metrics.requestCount,
          metric: 'Request Count'
        });
      }

      return {
        type: 'performance',
        passed: issues.filter(i => i.severity === 'critical').length === 0,
        metrics,
        issues
      };

    } catch (error) {
      return {
        type: 'performance',
        passed: false,
        issues: [{
          type: 'performance-error',
          severity: 'critical',
          message: `Performance check failed: ${error.message}`
        }]
      };
    }
  }

  async collectMetrics(page) {
    // Collect performance metrics from the browser
    const metrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');

      // Get LCP (Largest Contentful Paint)
      let lcp = 0;
      const lcpObserver = performance.getEntriesByType('largest-contentful-paint');
      if (lcpObserver.length > 0) {
        lcp = lcpObserver[lcpObserver.length - 1].renderTime ||
              lcpObserver[lcpObserver.length - 1].loadTime;
      }

      // Get CLS (Cumulative Layout Shift)
      let cls = 0;
      const clsEntries = performance.getEntriesByType('layout-shift');
      clsEntries.forEach(entry => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });

      // Calculate total transfer size
      const totalSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

      // Get FCP (First Contentful Paint)
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

      return {
        lcp: Math.round(lcp),
        cls: parseFloat(cls.toFixed(3)),
        fcp: Math.round(fcp),
        domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd) : 0,
        loadComplete: navigation ? Math.round(navigation.loadEventEnd) : 0,
        totalSize,
        requestCount: resources.length
      };
    });

    return metrics;
  }
}
