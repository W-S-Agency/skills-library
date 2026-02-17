#!/usr/bin/env python3
"""
SEO Validator for Programmatic SEO Generator
Validates SEO elements and generates sitemap.xml
"""

import sys
import argparse
import json
from pathlib import Path
from typing import List, Dict, Any
from bs4 import BeautifulSoup
from datetime import datetime
import xml.etree.ElementTree as ET


class SEOValidator:
    """Validate SEO elements and generate sitemap."""

    def __init__(self, pages_dir: str, base_url: str = 'https://example.com'):
        """
        Initialize SEO validator.

        Args:
            pages_dir: Directory containing generated HTML pages
            base_url: Base URL for sitemap generation
        """
        self.pages_dir = Path(pages_dir)
        self.base_url = base_url.rstrip('/')
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

    def validate_page(self, page_path: Path) -> Dict[str, Any]:
        """
        Validate SEO elements for single page.

        Returns:
            Validation result with SEO elements check
        """
        with open(page_path, 'r', encoding='utf-8') as f:
            html = f.read()

        soup = BeautifulSoup(html, 'html.parser')

        issues = []
        seo_elements = {}

        # 1. Meta title
        title = soup.find('title')
        seo_elements['meta_title'] = title.get_text() if title else None
        if not title:
            issues.append("Missing <title> tag")

        # 2. Meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        seo_elements['meta_description'] = meta_desc.get('content') if meta_desc else None
        if not meta_desc:
            issues.append("Missing meta description")

        # 3. Meta keywords (optional but good to have)
        meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
        seo_elements['meta_keywords'] = meta_keywords.get('content') if meta_keywords else None

        # 4. Canonical tag
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        seo_elements['canonical'] = canonical.get('href') if canonical else None
        if not canonical:
            issues.append("Missing canonical tag (prevents duplicate content)")

        # 5. Open Graph tags (social media)
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        og_image = soup.find('meta', attrs={'property': 'og:image'})

        seo_elements['og_title'] = og_title.get('content') if og_title else None
        seo_elements['og_description'] = og_desc.get('content') if og_desc else None
        seo_elements['og_image'] = og_image.get('content') if og_image else None

        # 6. Schema.org markup (JSON-LD)
        schema_script = soup.find('script', attrs={'type': 'application/ld+json'})
        seo_elements['has_schema'] = schema_script is not None

        if schema_script:
            try:
                schema_data = json.loads(schema_script.string)
                seo_elements['schema_type'] = schema_data.get('@type')
            except json.JSONDecodeError:
                issues.append("Invalid JSON-LD schema markup")
                seo_elements['schema_type'] = None
        else:
            issues.append("Missing schema.org markup (JSON-LD)")

        # 7. H1 tag
        h1 = soup.find('h1')
        seo_elements['h1'] = h1.get_text() if h1 else None
        if not h1:
            issues.append("Missing H1 tag")

        # 8. Robots meta tag
        robots = soup.find('meta', attrs={'name': 'robots'})
        seo_elements['robots'] = robots.get('content') if robots else 'index,follow'

        # 9. URL slug (from filename)
        url_slug = page_path.stem  # filename without extension
        seo_elements['url_slug'] = url_slug

        # Check URL slug format
        if '_' in url_slug or ' ' in url_slug:
            issues.append(f"URL slug not SEO-friendly: '{url_slug}' (use hyphens, not underscores/spaces)")

        return {
            'page': page_path.name,
            'url': f"{self.base_url}/{url_slug}",
            'seo_elements': seo_elements,
            'issues': issues,
            'valid': len(issues) == 0
        }

    def validate_all(self) -> Dict[str, Any]:
        """
        Validate all pages.

        Returns:
            Validation report for all pages
        """
        print(f"Validating {len(self.pages)} pages...")

        self.results = []

        for i, page_path in enumerate(self.pages, 1):
            result = self.validate_page(page_path)
            self.results.append(result)

            # Progress indicator
            if i % 10 == 0 or i == len(self.pages):
                print(f"  {i}/{len(self.pages)} pages validated...", end='\r')

        print(f"\n✅ Validation complete!")

        # Calculate summary
        valid_count = sum(1 for r in self.results if r['valid'])
        invalid_count = len(self.results) - valid_count

        pages_with_issues = [r for r in self.results if r['issues']]

        return {
            'total_pages': len(self.results),
            'valid': valid_count,
            'invalid': invalid_count,
            'pages_with_issues': pages_with_issues,
            'results': self.results
        }

    def generate_sitemap(self, output_path: str = None) -> str:
        """
        Generate sitemap.xml for all pages.

        Args:
            output_path: Path to save sitemap.xml (default: pages_dir/sitemap.xml)

        Returns:
            Path to generated sitemap
        """
        if not self.results:
            raise ValueError("Run validate_all() first before generating sitemap")

        # Create XML structure
        urlset = ET.Element('urlset')
        urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

        # Current date for lastmod
        today = datetime.now().strftime('%Y-%m-%d')

        for result in self.results:
            url_element = ET.SubElement(urlset, 'url')

            # loc (required)
            loc = ET.SubElement(url_element, 'loc')
            loc.text = result['url']

            # lastmod (recommended)
            lastmod = ET.SubElement(url_element, 'lastmod')
            lastmod.text = today

            # changefreq (optional)
            changefreq = ET.SubElement(url_element, 'changefreq')
            changefreq.text = 'weekly'

            # priority (optional)
            priority = ET.SubElement(url_element, 'priority')
            priority.text = '0.8'

        # Generate XML string
        tree = ET.ElementTree(urlset)
        ET.indent(tree, space='  ')  # Pretty print

        # Save to file
        output_path = output_path or self.pages_dir / 'sitemap.xml'
        tree.write(output_path, encoding='utf-8', xml_declaration=True)

        print(f"✅ Sitemap generated: {output_path}")
        print(f"   {len(self.results)} URLs included")

        return str(output_path)


def main():
    """CLI interface for SEO validator."""
    parser = argparse.ArgumentParser(description='Validate SEO elements and generate sitemap')
    parser.add_argument('--input', required=True, help='Directory with generated pages')
    parser.add_argument('--domain', required=True, help='Base URL (e.g. https://topholz24.de)')
    parser.add_argument('--generate-sitemap', action='store_true', help='Generate sitemap.xml')
    parser.add_argument('--output', help='Output path for validation report JSON')

    args = parser.parse_args()

    try:
        validator = SEOValidator(args.input, args.domain)
        report = validator.validate_all()

        # Print summary
        print(f"\n{'='*50}")
        print(f"SEO VALIDATION REPORT")
        print(f"{'='*50}")
        print(f"Total Pages: {report['total_pages']}")
        print(f"✅ Valid: {report['valid']}")
        print(f"❌ Invalid: {report['invalid']}")

        if report['pages_with_issues']:
            print(f"\n⚠️  Pages with SEO issues ({len(report['pages_with_issues'])}):")
            for page in report['pages_with_issues'][:10]:  # Show first 10
                print(f"\n  📄 {page['page']}")
                for issue in page['issues']:
                    print(f"     ❌ {issue}")

        # Save validation report
        output_path = args.output or Path(args.input) / 'seo_validation_report.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n📊 Full report saved to: {output_path}")

        # Generate sitemap if requested
        if args.generate_sitemap:
            print(f"\nGenerating sitemap...")
            sitemap_path = validator.generate_sitemap()
            print(f"\n📍 Next steps:")
            print(f"   1. Upload sitemap to: {args.domain}/sitemap.xml")
            print(f"   2. Submit to Google Search Console")
            print(f"   3. Submit to Bing Webmaster Tools")

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
