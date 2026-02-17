#!/usr/bin/env python3
"""
Quality Checker for Programmatic SEO Generator
Validates generated pages against SEO best practices
"""

import sys
import argparse
import json
from pathlib import Path
from typing import List, Dict, Any
from bs4 import BeautifulSoup
import re


class QualityChecker:
    """Check generated pages for SEO quality issues."""

    # Quality thresholds
    MIN_WORD_COUNT = 300
    MIN_INTERNAL_LINKS = 3
    MIN_UNIQUENESS = 70  # percentage
    META_TITLE_MIN = 50
    META_TITLE_MAX = 60
    META_DESC_MIN = 150
    META_DESC_MAX = 160

    def __init__(self, pages_dir: str):
        """
        Initialize quality checker.

        Args:
            pages_dir: Directory containing generated HTML pages
        """
        self.pages_dir = Path(pages_dir)
        self.pages: List[Path] = []
        self.results: List[Dict[str, Any]] = []

        # Load pages
        self._load_pages()

    def _load_pages(self):
        """Load all HTML pages from directory."""
        if not self.pages_dir.exists():
            raise FileNotFoundError(f"Pages directory not found: {self.pages_dir}")

        self.pages = list(self.pages_dir.glob('*.html'))

        if not self.pages:
            raise ValueError(f"No HTML pages found in: {self.pages_dir}")

    def check_page(self, page_path: Path) -> Dict[str, Any]:
        """
        Check single page quality.

        Returns:
            Quality report with score (1-10) and issues
        """
        with open(page_path, 'r', encoding='utf-8') as f:
            html = f.read()

        soup = BeautifulSoup(html, 'html.parser')

        issues = []
        warnings = []
        score = 10.0  # Start with perfect score, deduct for issues

        # 1. Word count check
        text = soup.get_text()
        words = re.findall(r'\b\w+\b', text)
        word_count = len(words)

        if word_count < self.MIN_WORD_COUNT:
            issues.append(f"Low word count: {word_count} (min {self.MIN_WORD_COUNT})")
            score -= 2.0

        # 2. H1 tag check
        h1_tags = soup.find_all('h1')

        if len(h1_tags) == 0:
            issues.append("Missing H1 tag")
            score -= 1.5
        elif len(h1_tags) > 1:
            warnings.append(f"Multiple H1 tags found ({len(h1_tags)})")
            score -= 0.5

        # 3. Meta title check
        meta_title = soup.find('title')

        if not meta_title:
            issues.append("Missing <title> tag")
            score -= 1.5
        else:
            title_length = len(meta_title.get_text())
            if title_length < self.META_TITLE_MIN:
                warnings.append(f"Meta title too short: {title_length} chars (recommended {self.META_TITLE_MIN}-{self.META_TITLE_MAX})")
                score -= 0.5
            elif title_length > self.META_TITLE_MAX:
                warnings.append(f"Meta title too long: {title_length} chars (recommended {self.META_TITLE_MIN}-{self.META_TITLE_MAX})")
                score -= 0.5

        # 4. Meta description check
        meta_desc = soup.find('meta', attrs={'name': 'description'})

        if not meta_desc:
            issues.append("Missing meta description")
            score -= 1.5
        else:
            desc_content = meta_desc.get('content', '')
            desc_length = len(desc_content)
            if desc_length < self.META_DESC_MIN:
                warnings.append(f"Meta description too short: {desc_length} chars (recommended {self.META_DESC_MIN}-{self.META_DESC_MAX})")
                score -= 0.5
            elif desc_length > self.META_DESC_MAX:
                warnings.append(f"Meta description too long: {desc_length} chars (recommended {self.META_DESC_MIN}-{self.META_DESC_MAX})")
                score -= 0.5

        # 5. Internal links check
        internal_links = soup.find_all('a', href=True)
        internal_link_count = len([
            link for link in internal_links
            if not link['href'].startswith(('http://', 'https://', 'mailto:', 'tel:'))
        ])

        if internal_link_count < self.MIN_INTERNAL_LINKS:
            issues.append(f"Few internal links: {internal_link_count} (min {self.MIN_INTERNAL_LINKS})")
            score -= 1.0

        # 6. Image alt tags check
        images = soup.find_all('img')
        images_without_alt = [img for img in images if not img.get('alt')]

        if images_without_alt:
            issues.append(f"Images missing alt tags: {len(images_without_alt)}/{len(images)}")
            score -= 1.0

        # 7. Schema markup check
        schema_script = soup.find('script', attrs={'type': 'application/ld+json'})

        if not schema_script:
            warnings.append("Missing schema markup (JSON-LD)")
            score -= 0.5

        # Normalize score to 1-10 range
        score = max(1.0, min(10.0, score))

        # Determine pass/fail
        passed = score >= 7.0 and len(issues) == 0

        return {
            'page': page_path.name,
            'score': round(score, 1),
            'passed': passed,
            'word_count': word_count,
            'internal_links': internal_link_count,
            'h1_count': len(h1_tags),
            'has_meta_title': meta_title is not None,
            'has_meta_description': meta_desc is not None,
            'has_schema': schema_script is not None,
            'images_total': len(images),
            'images_with_alt': len(images) - len(images_without_alt),
            'issues': issues,
            'warnings': warnings
        }

    def check_all(self) -> Dict[str, Any]:
        """
        Check all pages in directory.

        Returns:
            Quality report for all pages
        """
        print(f"Checking {len(self.pages)} pages...")

        self.results = []

        for i, page_path in enumerate(self.pages, 1):
            result = self.check_page(page_path)
            self.results.append(result)

            # Progress indicator
            if i % 10 == 0 or i == len(self.pages):
                print(f"  {i}/{len(self.pages)} pages checked...", end='\r')

        print(f"\n✅ Quality check complete!")

        # Calculate summary stats
        passed_count = sum(1 for r in self.results if r['passed'])
        failed_count = len(self.results) - passed_count
        avg_score = sum(r['score'] for r in self.results) / len(self.results)

        # Find pages with issues
        pages_with_issues = [r for r in self.results if r['issues']]

        return {
            'total_pages': len(self.results),
            'passed': passed_count,
            'failed': failed_count,
            'pass_rate': round((passed_count / len(self.results)) * 100, 1),
            'average_score': round(avg_score, 1),
            'pages_with_issues': pages_with_issues,
            'results': self.results
        }


def main():
    """CLI interface for quality checker."""
    parser = argparse.ArgumentParser(description='Check quality of generated pages')
    parser.add_argument('--input', required=True, help='Directory with generated pages')
    parser.add_argument('--output', help='Output path for quality report JSON')

    args = parser.parse_args()

    try:
        checker = QualityChecker(args.input)
        report = checker.check_all()

        # Print summary
        print(f"\n{'='*50}")
        print(f"QUALITY REPORT")
        print(f"{'='*50}")
        print(f"Total Pages: {report['total_pages']}")
        print(f"✅ Passed: {report['passed']} ({report['pass_rate']}%)")
        print(f"❌ Failed: {report['failed']}")
        print(f"Average Score: {report['average_score']}/10")

        if report['pages_with_issues']:
            print(f"\n⚠️  Pages with issues ({len(report['pages_with_issues'])}):")
            for page in report['pages_with_issues'][:10]:  # Show first 10
                print(f"\n  📄 {page['page']} (score: {page['score']}/10)")
                for issue in page['issues']:
                    print(f"     ❌ {issue}")
                for warning in page['warnings']:
                    print(f"     ⚠️  {warning}")

        # Save full report
        output_path = args.output or Path(args.input) / 'quality_report.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n📊 Full report saved to: {output_path}")

        # Exit with error if pass rate < 90%
        if report['pass_rate'] < 90:
            print(f"\n❌ Pass rate below 90% - review and fix issues before scaling")
            sys.exit(1)

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
