#!/usr/bin/env python3
"""
Template Engine for Programmatic SEO Generator
Renders Jinja2 templates with data from data_loader
"""

import sys
import argparse
from pathlib import Path
from typing import List, Dict, Any, Optional
from jinja2 import Environment, FileSystemLoader, Template, TemplateError
import json
from data_loader import DataLoader


class TemplateEngine:
    """Render Jinja2 templates with structured data."""

    def __init__(self, template_path: str, output_dir: str):
        """
        Initialize template engine.

        Args:
            template_path: Path to Jinja2 template file
            output_dir: Directory to write generated pages
        """
        self.template_path = Path(template_path)
        self.output_dir = Path(output_dir)
        self.template: Optional[Template] = None

        # Create output directory
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Load template
        self._load_template()

    def _load_template(self):
        """Load Jinja2 template from file."""
        if not self.template_path.exists():
            raise FileNotFoundError(f"Template not found: {self.template_path}")

        try:
            # Setup Jinja2 environment
            template_dir = self.template_path.parent
            env = Environment(
                loader=FileSystemLoader(str(template_dir)),
                autoescape=True,  # Security: escape HTML by default
                trim_blocks=True,
                lstrip_blocks=True
            )

            # Load template
            self.template = env.get_template(self.template_path.name)

        except TemplateError as e:
            raise Exception(f"Template error: {e}")

    def render_page(self, data: Dict[str, Any]) -> str:
        """
        Render single page with data.

        Args:
            data: Dictionary with template variables

        Returns:
            Rendered HTML as string
        """
        try:
            return self.template.render(**data)
        except TemplateError as e:
            raise Exception(f"Render error for ID {data.get('id', 'unknown')}: {e}")

    def generate_pages(
        self,
        data: List[Dict[str, Any]],
        limit: Optional[int] = None,
        url_field: str = 'id'
    ) -> Dict[str, Any]:
        """
        Generate multiple pages from data list.

        Args:
            data: List of data dictionaries
            limit: Maximum pages to generate (for pilot mode)
            url_field: Field to use for URL slug (default: 'id')

        Returns:
            Generation report with stats
        """
        generated = []
        errors = []

        # Limit for pilot mode
        data_subset = data[:limit] if limit else data

        print(f"Generating {len(data_subset)} pages...")

        for i, row in enumerate(data_subset, 1):
            try:
                # Render page
                html = self.render_page(row)

                # Generate filename from URL field
                url_slug = self._sanitize_slug(str(row.get(url_field, i)))
                filename = f"{url_slug}.html"
                filepath = self.output_dir / filename

                # Write to file
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(html)

                generated.append({
                    'id': row.get('id'),
                    'url_slug': url_slug,
                    'filepath': str(filepath),
                    'title': row.get('title', 'Untitled')
                })

                # Progress indicator
                if i % 10 == 0 or i == len(data_subset):
                    print(f"  {i}/{len(data_subset)} pages generated...", end='\r')

            except Exception as e:
                errors.append({
                    'id': row.get('id'),
                    'error': str(e)
                })

        print(f"\n✅ Generation complete!")

        return {
            'generated_count': len(generated),
            'error_count': len(errors),
            'generated': generated,
            'errors': errors,
            'output_dir': str(self.output_dir)
        }

    def _sanitize_slug(self, text: str) -> str:
        """
        Convert text to URL-safe slug.

        Examples:
            "Oak Desk" -> "oak-desk"
            "Product #123" -> "product-123"
        """
        import re

        # Lowercase
        slug = text.lower()

        # Replace spaces and special chars with hyphens
        slug = re.sub(r'[^\w\s-]', '', slug)
        slug = re.sub(r'[\s_]+', '-', slug)

        # Remove leading/trailing hyphens
        slug = slug.strip('-')

        return slug or 'page'


def main():
    """CLI interface for template engine."""
    parser = argparse.ArgumentParser(description='Generate pages from template + data')
    parser.add_argument('--data', required=True, help='Path to data source (CSV/JSON)')
    parser.add_argument('--template', required=True, help='Path to Jinja2 template')
    parser.add_argument('--output', required=True, help='Output directory')
    parser.add_argument('--limit', type=int, help='Limit pages (pilot mode)')
    parser.add_argument('--url-field', default='id', help='Field for URL slug (default: id)')

    args = parser.parse_args()

    try:
        # Load data
        print(f"Loading data from: {args.data}")
        loader = DataLoader(args.data)
        data = loader.load()

        # Validate
        validation = loader.validate()
        if not validation['valid']:
            print("❌ Data validation failed:")
            for error in validation['errors']:
                print(f"   {error}")
            sys.exit(1)

        # Normalize
        normalized = loader.normalize()
        print(f"✅ Loaded and normalized {len(normalized)} rows")

        # Render pages
        print(f"\nRendering template: {args.template}")
        engine = TemplateEngine(args.template, args.output)

        # Generate
        report = engine.generate_pages(
            normalized,
            limit=args.limit,
            url_field=args.url_field
        )

        # Print report
        print(f"\n{'='*50}")
        print(f"GENERATION REPORT")
        print(f"{'='*50}")
        print(f"✅ Generated: {report['generated_count']} pages")
        print(f"❌ Errors: {report['error_count']} pages")
        print(f"📁 Output: {report['output_dir']}")

        if report['errors']:
            print(f"\nErrors:")
            for error in report['errors']:
                print(f"  ID {error['id']}: {error['error']}")

        # Write report to JSON
        report_path = Path(args.output) / 'generation_report.json'
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        print(f"\n📊 Full report saved to: {report_path}")

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
