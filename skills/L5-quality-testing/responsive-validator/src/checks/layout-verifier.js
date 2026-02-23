/**
 * Layout Verifier - Detects overlapping elements, gap issues, and positioning problems
 */

export class LayoutVerifier {
  constructor(config) {
    this.config = config;
  }

  async check(context) {
    const { page } = context;

    try {
      const issues = [];

      // Check for overlapping elements
      const overlaps = await this.checkOverlaps(page);
      issues.push(...overlaps);

      // Check for negative gaps (elements too close)
      const gaps = await this.checkGaps(page);
      issues.push(...gaps);

      // Check for elements outside viewport
      const offscreen = await this.checkOffscreenElements(page);
      issues.push(...offscreen);

      // Check for hidden content
      const hidden = await this.checkHiddenContent(page);
      issues.push(...hidden);

      return {
        type: 'layout',
        passed: issues.filter(i => i.severity === 'critical').length === 0,
        issues
      };

    } catch (error) {
      return {
        type: 'layout',
        passed: false,
        issues: [{
          type: 'layout-error',
          severity: 'critical',
          message: `Layout verification failed: ${error.message}`
        }]
      };
    }
  }

  async checkOverlaps(page) {
    return await page.evaluate(() => {
      const issues = [];

      // Get all positioned elements (likely to overlap)
      const elements = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'absolute' || style.position === 'fixed' ||
               style.float !== 'none' || style.display === 'flex';
      });

      // Check for overlaps between important elements
      const important = elements.filter(el => {
        const tag = el.tagName.toLowerCase();
        return tag === 'header' || tag === 'nav' || tag === 'main' ||
               el.querySelector('img') || el.querySelector('a');
      });

      for (let i = 0; i < important.length; i++) {
        for (let j = i + 1; j < important.length; j++) {
          const rect1 = important[i].getBoundingClientRect();
          const rect2 = important[j].getBoundingClientRect();

          // Check if rectangles overlap
          if (!(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)) {

            // Calculate overlap area
            const overlapWidth = Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left);
            const overlapHeight = Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top);
            const overlapArea = overlapWidth * overlapHeight;

            // Only report significant overlaps (>100px²)
            if (overlapArea > 100) {
              issues.push({
                type: 'element-overlap',
                severity: 'critical',
                message: `Elements overlap: ${important[i].tagName} and ${important[j].tagName}`,
                element1: important[i].tagName + (important[i].className ? '.' + important[i].className.split(' ')[0] : ''),
                element2: important[j].tagName + (important[j].className ? '.' + important[j].className.split(' ')[0] : ''),
                overlapArea: Math.round(overlapArea)
              });
            }
          }
        }
      }

      return issues;
    });
  }

  async checkGaps(page) {
    return await page.evaluate(() => {
      const issues = [];

      // Check header spacing (logo to nav gap)
      const header = document.querySelector('header');
      if (header) {
        const logo = header.querySelector('img, a[class*="logo"]');
        const nav = header.querySelector('nav, ul');

        if (logo && nav) {
          const logoRect = logo.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          const gap = navRect.left - logoRect.right;

          if (gap < 10) {
            issues.push({
              type: 'insufficient-gap',
              severity: gap < 0 ? 'critical' : 'warning',
              message: `Header gap too small: ${Math.round(gap)}px between logo and navigation`,
              gap: Math.round(gap)
            });
          }
        }
      }

      return issues;
    });
  }

  async checkOffscreenElements(page) {
    return await page.evaluate(() => {
      const issues = [];
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Check important elements
      const important = document.querySelectorAll('header, nav, main, footer, [role="main"], [role="navigation"]');

      important.forEach(el => {
        const rect = el.getBoundingClientRect();

        // Check if element is partially off-screen (horizontally)
        if (rect.right < 0 || rect.left > viewportWidth) {
          issues.push({
            type: 'offscreen-element',
            severity: 'critical',
            message: `Element completely off-screen: ${el.tagName}`,
            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : '')
          });
        } else if (rect.right > viewportWidth + 10) {
          issues.push({
            type: 'partial-offscreen',
            severity: 'warning',
            message: `Element extends beyond viewport: ${el.tagName}`,
            element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
            overflow: Math.round(rect.right - viewportWidth)
          });
        }
      });

      return issues;
    });
  }

  async checkHiddenContent(page) {
    return await page.evaluate(() => {
      const issues = [];

      // Check for elements with zero dimensions (but with content)
      const elements = document.querySelectorAll('*');
      let hiddenWithContent = 0;

      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const hasContent = el.textContent?.trim().length > 0 || el.querySelector('img');

        if (hasContent && (rect.width === 0 || rect.height === 0)) {
          const style = window.getComputedStyle(el);
          if (style.display !== 'none' && style.visibility !== 'hidden') {
            hiddenWithContent++;
          }
        }
      });

      if (hiddenWithContent > 5) {
        issues.push({
          type: 'hidden-content',
          severity: 'warning',
          message: `Found ${hiddenWithContent} elements with content but zero dimensions`,
          count: hiddenWithContent
        });
      }

      return issues;
    });
  }
}
