#!/usr/bin/env python3
"""
Campaign Builder for Cold Email Campaigns
Manages multi-step email sequences with conditional logic
"""

import sys
import argparse
import json
import csv
from pathlib import Path
from typing import List, Dict, Any
from datetime import datetime, timedelta
from jinja2 import Template


class CampaignBuilder:
    """Build and execute cold email campaigns."""

    def __init__(self, template_path: str, leads_path: str):
        """
        Initialize campaign builder.

        Args:
            template_path: Path to email sequence template
            leads_path: Path to leads CSV
        """
        self.template_path = Path(template_path)
        self.leads_path = Path(leads_path)
        self.leads: List[Dict[str, Any]] = []
        self.sequence: List[Dict[str, str]] = []

        # Load data
        self._load_leads()
        self._load_sequence()

    def _load_leads(self):
        """Load leads from CSV."""
        required_fields = ['email', 'first_name']

        with open(self.leads_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            self.leads = list(reader)

        if not self.leads:
            raise ValueError("No leads found in CSV")

        # Validate required fields
        first_lead = self.leads[0]
        missing_fields = [f for f in required_fields if f not in first_lead]

        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")

        print(f"✅ Loaded {len(self.leads)} leads")

    def _load_sequence(self):
        """Load email sequence from template file."""
        with open(self.template_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse sequence (simple format: --- separators)
        emails = content.split('---')

        for i, email_text in enumerate(emails, 1):
            if not email_text.strip():
                continue

            # Extract subject line (first line starting with "Subject:")
            lines = email_text.strip().split('\n')
            subject = ''
            body_lines = []

            for line in lines:
                if line.startswith('Subject:'):
                    subject = line.replace('Subject:', '').strip()
                else:
                    body_lines.append(line)

            body = '\n'.join(body_lines).strip()

            self.sequence.append({
                'email_number': i,
                'subject': subject,
                'body': body
            })

        print(f"✅ Loaded {len(self.sequence)} email templates in sequence")

    def personalize_email(self, email_template: Dict[str, str], lead: Dict[str, Any]) -> Dict[str, str]:
        """
        Personalize email with lead data.

        Args:
            email_template: Template with subject and body
            lead: Lead data dictionary

        Returns:
            Personalized email
        """
        # Create Jinja2 template for subject and body
        subject_tmpl = Template(email_template['subject'])
        body_tmpl = Template(email_template['body'])

        # Add fallback values
        lead_with_defaults = {
            'first_name': lead.get('first_name', 'there'),
            'last_name': lead.get('last_name', ''),
            'company': lead.get('company', 'your company'),
            'industry': lead.get('industry', 'your industry'),
            'job_title': lead.get('job_title', ''),
            'location': lead.get('location', ''),
            'email': lead.get('email', '')
        }

        # Render
        personalized_subject = subject_tmpl.render(**lead_with_defaults)
        personalized_body = body_tmpl.render(**lead_with_defaults)

        return {
            'email_number': email_template['email_number'],
            'subject': personalized_subject,
            'body': personalized_body,
            'to': lead['email']
        }

    def preview_campaign(self, sample_count: int = 3) -> List[Dict[str, Any]]:
        """
        Preview personalized emails for sample leads.

        Args:
            sample_count: Number of sample leads to preview

        Returns:
            List of personalized emails
        """
        previews = []

        sample_leads = self.leads[:sample_count]

        for lead in sample_leads:
            lead_previews = []

            for email_template in self.sequence:
                personalized = self.personalize_email(email_template, lead)
                lead_previews.append(personalized)

            previews.append({
                'lead': lead,
                'emails': lead_previews
            })

        return previews

    def generate_campaign_schedule(self, start_date: str, warmup: bool = True) -> Dict[str, Any]:
        """
        Generate sending schedule for campaign.

        Args:
            start_date: Campaign start date (YYYY-MM-DD)
            warmup: Use warm-up mode (gradual volume increase)

        Returns:
            Schedule with send dates and volumes
        """
        start = datetime.strptime(start_date, '%Y-%m-%d')

        if warmup:
            # Warm-up schedule
            schedule = [
                {'day': 1, 'volume': 10, 'date': start},
                {'day': 2, 'volume': 15, 'date': start + timedelta(days=1)},
                {'day': 3, 'volume': 25, 'date': start + timedelta(days=2)},
                {'day': 5, 'volume': 50, 'date': start + timedelta(days=4)},
                {'day': 7, 'volume': 100, 'date': start + timedelta(days=6)},
                {'day': 10, 'volume': 200, 'date': start + timedelta(days=9)},
            ]
        else:
            # Full volume immediately
            schedule = [
                {'day': 1, 'volume': len(self.leads), 'date': start}
            ]

        return {
            'start_date': start_date,
            'warmup_enabled': warmup,
            'total_leads': len(self.leads),
            'schedule': schedule
        }


def main():
    """CLI interface for campaign builder."""
    parser = argparse.ArgumentParser(description='Build cold email campaign')
    parser.add_argument('--template', required=True, help='Path to email sequence template')
    parser.add_argument('--leads', required=True, help='Path to leads CSV')
    parser.add_argument('--mode', choices=['preview', 'schedule', 'test'], default='preview',
                        help='Mode: preview, schedule, or test')
    parser.add_argument('--start-date', help='Start date (YYYY-MM-DD) for schedule mode')
    parser.add_argument('--warmup', action='store_true', help='Use warm-up mode')
    parser.add_argument('--output', help='Output path for report')

    args = parser.parse_args()

    try:
        builder = CampaignBuilder(args.template, args.leads)

        if args.mode == 'preview':
            # Preview campaign
            print("\n" + "="*50)
            print("CAMPAIGN PREVIEW")
            print("="*50)

            previews = builder.preview_campaign(sample_count=2)

            for preview in previews:
                lead = preview['lead']
                print(f"\n📧 Lead: {lead['first_name']} {lead.get('last_name', '')} ({lead['email']})")
                print(f"   Company: {lead.get('company', 'N/A')}")

                for email in preview['emails']:
                    print(f"\n   Email #{email['email_number']}:")
                    print(f"   Subject: {email['subject']}")
                    print(f"   Body preview: {email['body'][:100]}...")

        elif args.mode == 'schedule':
            # Generate schedule
            if not args.start_date:
                print("❌ Error: --start-date required for schedule mode")
                sys.exit(1)

            print("\n" + "="*50)
            print("CAMPAIGN SCHEDULE")
            print("="*50)

            schedule = builder.generate_campaign_schedule(args.start_date, warmup=args.warmup)

            print(f"\nStart Date: {schedule['start_date']}")
            print(f"Warm-up: {'Enabled' if schedule['warmup_enabled'] else 'Disabled'}")
            print(f"Total Leads: {schedule['total_leads']}")

            print(f"\nSending Schedule:")
            for day in schedule['schedule']:
                print(f"  Day {day['day']}: {day['volume']} emails ({day['date'].strftime('%Y-%m-%d')})")

            # Save to JSON
            output_path = args.output or 'campaign_schedule.json'
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(schedule, f, indent=2, default=str)

            print(f"\n📊 Schedule saved to: {output_path}")

        elif args.mode == 'test':
            # Test mode (integration with ln-852-email-automation would go here)
            print("\n⚠️  Test mode requires integration with ln-852-email-automation skill")
            print("This would send test emails to your inbox for review")

    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
