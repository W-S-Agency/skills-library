#!/usr/bin/env python3
"""
Data Loader for Programmatic SEO Generator
Supports CSV, JSON, Google Sheets, and Airtable
"""

import csv
import json
import sys
from pathlib import Path
from typing import List, Dict, Any, Optional
import pandas as pd


class DataLoader:
    """Load and validate data from multiple sources."""

    def __init__(self, source_path: str, source_type: Optional[str] = None):
        """
        Initialize data loader.

        Args:
            source_path: Path to data file or URL
            source_type: Force source type (csv, json, sheets, airtable)
        """
        self.source_path = source_path
        self.source_type = source_type or self._detect_type(source_path)
        self.data: List[Dict[str, Any]] = []
        self.required_fields = ['id', 'title', 'description']

    def _detect_type(self, path: str) -> str:
        """Auto-detect source type from file extension or URL."""
        path_lower = path.lower()

        if path_lower.endswith('.csv'):
            return 'csv'
        elif path_lower.endswith('.json'):
            return 'json'
        elif 'docs.google.com/spreadsheets' in path_lower:
            return 'sheets'
        elif 'airtable.com' in path_lower or 'api.airtable.com' in path_lower:
            return 'airtable'
        else:
            raise ValueError(f"Cannot detect source type for: {path}")

    def load(self) -> List[Dict[str, Any]]:
        """Load data from source."""
        if self.source_type == 'csv':
            self.data = self._load_csv()
        elif self.source_type == 'json':
            self.data = self._load_json()
        elif self.source_type == 'sheets':
            self.data = self._load_google_sheets()
        elif self.source_type == 'airtable':
            self.data = self._load_airtable()
        else:
            raise ValueError(f"Unsupported source type: {self.source_type}")

        return self.data

    def _load_csv(self) -> List[Dict[str, Any]]:
        """Load data from CSV file."""
        try:
            df = pd.read_csv(self.source_path)
            return df.to_dict('records')
        except FileNotFoundError:
            raise FileNotFoundError(f"CSV file not found: {self.source_path}")
        except Exception as e:
            raise Exception(f"Error loading CSV: {e}")

    def _load_json(self) -> List[Dict[str, Any]]:
        """Load data from JSON file."""
        try:
            with open(self.source_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Handle both array and object with array property
            if isinstance(data, list):
                return data
            elif isinstance(data, dict):
                # Try common keys
                for key in ['items', 'data', 'records', 'products']:
                    if key in data and isinstance(data[key], list):
                        return data[key]
                raise ValueError("JSON must be array or object with 'items'/'data' key")
            else:
                raise ValueError("JSON must be array or object")

        except FileNotFoundError:
            raise FileNotFoundError(f"JSON file not found: {self.source_path}")
        except json.JSONDecodeError as e:
            raise Exception(f"Invalid JSON format: {e}")

    def _load_google_sheets(self) -> List[Dict[str, Any]]:
        """Load data from Google Sheets via google-workspace source."""
        # TODO: Implement Google Sheets integration
        # Requires: google-workspace source to be active
        # For now, print instructions
        raise NotImplementedError(
            "Google Sheets integration requires google-workspace source.\n"
            "1. Activate source: google-workspace\n"
            "2. Export sheet to CSV\n"
            "3. Use CSV loader instead"
        )

    def _load_airtable(self) -> List[Dict[str, Any]]:
        """Load data from Airtable API."""
        # TODO: Implement Airtable integration
        # Requires: Airtable API key
        raise NotImplementedError(
            "Airtable integration requires API key.\n"
            "1. Get API key from https://airtable.com/account\n"
            "2. Export base to CSV\n"
            "3. Use CSV loader instead"
        )

    def validate(self) -> Dict[str, Any]:
        """
        Validate loaded data.

        Returns:
            Validation result with errors and warnings
        """
        errors = []
        warnings = []

        if not self.data:
            errors.append("No data loaded")
            return {'valid': False, 'errors': errors, 'warnings': warnings}

        # Check required fields
        first_row = self.data[0]
        missing_fields = [f for f in self.required_fields if f not in first_row]

        if missing_fields:
            errors.append(f"Missing required fields: {', '.join(missing_fields)}")

        # Check for empty values in required fields
        for i, row in enumerate(self.data):
            for field in self.required_fields:
                if field in row and not str(row[field]).strip():
                    warnings.append(f"Row {i+1}: Empty value for '{field}'")

        # Check for duplicate IDs
        ids = [row.get('id') for row in self.data if 'id' in row]
        duplicate_ids = [id for id in ids if ids.count(id) > 1]

        if duplicate_ids:
            errors.append(f"Duplicate IDs found: {set(duplicate_ids)}")

        # Recommendations
        recommended_fields = ['meta_title', 'meta_description', 'keywords', 'image_url']
        missing_recommended = [f for f in recommended_fields if f not in first_row]

        if missing_recommended:
            warnings.append(
                f"Missing recommended fields for SEO: {', '.join(missing_recommended)}"
            )

        return {
            'valid': len(errors) == 0,
            'errors': errors,
            'warnings': warnings,
            'row_count': len(self.data),
            'fields': list(first_row.keys())
        }

    def normalize(self) -> List[Dict[str, Any]]:
        """
        Normalize data for template rendering.

        - Convert empty strings to None
        - Strip whitespace
        - Generate missing SEO fields from existing data
        """
        normalized = []

        for row in self.data:
            normalized_row = {}

            for key, value in row.items():
                # Strip whitespace
                if isinstance(value, str):
                    value = value.strip()
                    # Convert empty to None
                    if not value:
                        value = None

                normalized_row[key] = value

            # Generate meta_title if missing
            if 'meta_title' not in normalized_row or not normalized_row['meta_title']:
                normalized_row['meta_title'] = normalized_row.get('title', 'Untitled')

            # Generate meta_description if missing
            if 'meta_description' not in normalized_row or not normalized_row['meta_description']:
                desc = normalized_row.get('description', '')
                # Truncate to 160 chars
                normalized_row['meta_description'] = desc[:160] if desc else 'No description'

            # Generate keywords if missing
            if 'keywords' not in normalized_row or not normalized_row['keywords']:
                title = normalized_row.get('title', '')
                category = normalized_row.get('category', '')
                normalized_row['keywords'] = f"{title} {category}".strip()

            normalized.append(normalized_row)

        return normalized


def main():
    """CLI interface for data loader."""
    if len(sys.argv) < 2:
        print("Usage: python data_loader.py <data_source> [--validate]")
        print("\nExamples:")
        print("  python data_loader.py data/products.csv")
        print("  python data_loader.py data/products.json --validate")
        sys.exit(1)

    source_path = sys.argv[1]
    validate_only = '--validate' in sys.argv

    try:
        loader = DataLoader(source_path)
        print(f"Loading data from: {source_path} (type: {loader.source_type})")

        data = loader.load()
        print(f"✅ Loaded {len(data)} rows")

        # Validate
        validation = loader.validate()

        if validation['valid']:
            print(f"✅ Validation passed")
            print(f"   Fields: {', '.join(validation['fields'])}")
        else:
            print(f"❌ Validation failed")
            for error in validation['errors']:
                print(f"   ERROR: {error}")

        if validation['warnings']:
            print(f"⚠️  Warnings:")
            for warning in validation['warnings']:
                print(f"   {warning}")

        if not validate_only:
            # Normalize
            normalized = loader.normalize()
            print(f"\n✅ Data normalized ({len(normalized)} rows)")

            # Output sample
            print(f"\nSample row (first):")
            print(json.dumps(normalized[0], indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
