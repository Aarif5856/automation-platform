#!/usr/bin/env python3
"""
Immediate Lead Generation System
===============================

This script implements the complete client acquisition funnel:
1. Generate 500+ targeted leads using your own tools
2. Send automated outreach emails with Calendly link
3. Offer free "mini demo" to hook prospects into paid plans
4. Track and manage the entire funnel

Author: The AutomatePro
Version: 1.0
"""

import time
import random
import csv
import json
from datetime import datetime, timedelta
import logging
from typing import List, Dict
import requests
from linkedin-lead-generator import LinkedInLeadGenerator
from email-campaign-manager import EmailCampaignManager

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ImmediateLeadGeneration:
    def __init__(self):
        self.linkedin_generator = LinkedInLeadGenerator(headless=False)
        self.email_manager = EmailCampaignManager()
        self.leads = []
        self.outreach_emails = []
        
    def generate_targeted_leads(self, target_count=500):
        """Generate 500+ targeted leads for automation services"""
        logger.info(f"🎯 Generating {target_count} targeted leads for automation services")
        
        # High-value target searches
        search_queries = [
            # CEOs and Founders
            "CEO automation services",
            "Founder lead generation",
            "Owner small business",
            "CEO digital marketing",
            "Founder startup",
            "CEO e-commerce",
            "Owner consulting",
            "CEO real estate",
            
            # Marketing Professionals
            "Marketing Director automation",
            "Growth Manager lead generation",
            "Marketing Manager digital",
            "VP Marketing automation",
            "Head of Marketing",
            "Marketing Coordinator",
            "Digital Marketing Manager",
            "Growth Hacker",
            
            # Business Development
            "Business Development Manager",
            "Sales Director automation",
            "VP Sales lead generation",
            "Sales Manager digital",
            "Business Development Director",
            "Sales Operations Manager",
            "Revenue Operations Manager",
            "Chief Revenue Officer",
            
            # Agency Owners
            "Agency Owner marketing",
            "Marketing Agency CEO",
            "Digital Agency Founder",
            "Consulting Agency Owner",
            "Marketing Consultant",
            "Business Consultant",
            "Growth Consultant",
            "Automation Consultant"
        ]
        
        all_leads = []
        leads_per_search = max(1, target_count // len(search_queries))
        
        for i, query in enumerate(search_queries):
            if len(all_leads) >= target_count:
                break
                
            logger.info(f"Searching {i+1}/{len(search_queries)}: {query}")
            
            try:
                # Search LinkedIn
                if self.linkedin_generator.search_linkedin(
                    keywords=query,
                    location="",  # Global search
                    industry="",
                    company_size="10-500"  # Small to medium businesses
                ):
                    # Extract profiles
                    profiles = self.linkedin_generator.extract_profiles(max_profiles=leads_per_search)
                    
                    if profiles:
                        # Find email addresses
                        self.linkedin_generator.find_email_addresses(profiles)
                        
                        # Process and add leads
                        for profile in profiles:
                            if profile.get('email') and profile.get('name'):
                                lead = {
                                    'name': profile.get('name', ''),
                                    'title': profile.get('title', ''),
                                    'company': profile.get('company', ''),
                                    'email': profile.get('email', ''),
                                    'location': profile.get('location', ''),
                                    'source': 'LinkedIn',
                                    'search_query': query,
                                    'date_found': datetime.now().strftime('%Y-%m-%d'),
                                    'status': 'new',
                                    'service_interest': self._determine_service_interest(profile),
                                    'priority': self._calculate_priority(profile),
                                    'notes': f"Found via: {query}"
                                }
                                all_leads.append(lead)
                                logger.info(f"✅ Found lead: {lead['name']} - {lead['company']} ({lead['priority']} priority)")
                    
                    # Random delay between searches
                    delay = random.randint(30, 60)
                    logger.info(f"Waiting {delay} seconds before next search...")
                    time.sleep(delay)
                    
            except Exception as e:
                logger.error(f"Error searching for {query}: {e}")
                continue
        
        self.leads = all_leads
        logger.info(f"🎉 Generated {len(self.leads)} targeted leads!")
        return all_leads
    
    def _determine_service_interest(self, profile):
        """Determine which service the lead might be interested in"""
        title = profile.get('title', '').lower()
        company = profile.get('company', '').lower()
        
        if any(word in title for word in ['ceo', 'founder', 'owner', 'president']):
            return 'Full Suite'
        elif any(word in title for word in ['marketing', 'growth', 'digital']):
            return 'Marketing Automation'
        elif any(word in title for word in ['sales', 'business development', 'revenue']):
            return 'Lead Generation'
        elif any(word in company for word in ['agency', 'consulting', 'marketing']):
            return 'White-Label'
        else:
            return 'Web Scraping'
    
    def _calculate_priority(self, profile):
        """Calculate lead priority based on title and company"""
        title = profile.get('title', '').lower()
        company = profile.get('company', '').lower()
        
        score = 0
        
        # High-value titles
        if any(word in title for word in ['ceo', 'founder', 'owner', 'president']):
            score += 10
        elif any(word in title for word in ['director', 'vp', 'head of']):
            score += 8
        elif any(word in title for word in ['manager', 'lead']):
            score += 6
        
        # High-value companies
        if any(word in company for word in ['agency', 'consulting', 'marketing']):
            score += 5
        elif any(word in company for word in ['tech', 'software', 'saas']):
            score += 4
        
        if score >= 15:
            return 'High'
        elif score >= 10:
            return 'Medium'
        else:
            return 'Low'
    
    def create_outreach_campaign(self):
        """Create automated outreach campaign with Calendly link"""
        logger.info("📧 Creating outreach campaign with Calendly integration")
        
        # Create email templates
        templates = {
            'high_priority': {
                'subject': 'Quick question about {company} lead generation',
                'template': '''
Hi {first_name},

I noticed you're {title} at {company} and thought you might be interested in our automation services.

We help businesses like yours:
• Generate 500+ qualified leads per month
• Automate email marketing campaigns  
• Extract data from any website
• Save 20+ hours per week on manual tasks

Our clients typically see 300% increase in lead generation within 30 days.

Would you like a free mini demo? I can scrape 50 leads for your industry in the next 24 hours - no strings attached.

Book a quick 15-minute call: https://calendly.com/the-automatepro/free-demo

Best regards,
The AutomatePro Team
info@the-automatepro.info
                '''
            },
            'medium_priority': {
                'subject': 'Automation services for {company}',
                'template': '''
Hi {first_name},

I help {company} and similar businesses automate their lead generation and marketing processes.

Our automation tools can:
• Generate 500+ leads per month
• Automate email campaigns
• Extract competitor data
• Save 20+ hours weekly

Interested in a free demo? I'll show you how to generate 50 leads in 5 minutes.

Book a call: https://calendly.com/the-automatepro/free-demo

Best,
The AutomatePro Team
                '''
            },
            'low_priority': {
                'subject': 'Lead generation automation for {company}',
                'template': '''
Hi {first_name},

Quick question - are you looking to generate more qualified leads for {company}?

Our automation tools help businesses:
• Generate 500+ leads per month
• Automate marketing processes
• Extract data from websites
• Save time on manual tasks

Free demo available: https://calendly.com/the-automatepro/free-demo

Thanks,
The AutomatePro Team
                '''
            }
        }
        
        # Create campaign
        campaign_id = f"outreach_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        for priority, template in templates.items():
            template_id = f"outreach_{priority}_{campaign_id}"
            
            # Create template
            self.email_manager.create_template(
                template_id=template_id,
                name=f"Outreach {priority.title()} Priority",
                subject=template['subject'],
                html_content=template['template']
            )
            
            logger.info(f"Created {priority} priority template: {template_id}")
        
        return campaign_id
    
    def send_outreach_emails(self, max_emails_per_day=50):
        """Send outreach emails with rate limiting"""
        logger.info(f"📤 Sending outreach emails (max {max_emails_per_day} per day)")
        
        # Filter leads by priority
        high_priority_leads = [l for l in self.leads if l['priority'] == 'High']
        medium_priority_leads = [l for l in self.leads if l['priority'] == 'Medium']
        low_priority_leads = [l for l in self.leads if l['priority'] == 'Low']
        
        # Send emails in priority order
        emails_sent = 0
        all_leads = high_priority_leads + medium_priority_leads + low_priority_leads
        
        for lead in all_leads:
            if emails_sent >= max_emails_per_day:
                logger.info(f"Reached daily limit of {max_emails_per_day} emails")
                break
            
            try:
                # Determine template based on priority
                template_priority = lead['priority'].lower()
                
                # Personalize email
                first_name = lead['name'].split(' ')[0] if lead['name'] else 'there'
                
                email_data = {
                    'to': lead['email'],
                    'subject': f"Quick question about {lead['company']} lead generation",
                    'body': f'''
Hi {first_name},

I noticed you're {lead['title']} at {lead['company']} and thought you might be interested in our automation services.

We help businesses like yours:
• Generate 500+ qualified leads per month
• Automate email marketing campaigns  
• Extract data from any website
• Save 20+ hours per week on manual tasks

Our clients typically see 300% increase in lead generation within 30 days.

Would you like a free mini demo? I can scrape 50 leads for your industry in the next 24 hours - no strings attached.

Book a quick 15-minute call: https://calendly.com/the-automatepro/free-demo

Best regards,
The AutomatePro Team
info@the-automatepro.info
                    '''
                }
                
                # Send email
                self.email_manager.send_email(
                    to=email_data['to'],
                    subject=email_data['subject'],
                    body=email_data['body']
                )
                
                # Update lead status
                lead['status'] = 'emailed'
                lead['email_sent_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                
                emails_sent += 1
                logger.info(f"📧 Sent email to {lead['name']} ({lead['company']}) - {emails_sent}/{max_emails_per_day}")
                
                # Rate limiting
                time.sleep(random.randint(30, 60))
                
            except Exception as e:
                logger.error(f"Error sending email to {lead['email']}: {e}")
                lead['status'] = 'email_failed'
                continue
        
        logger.info(f"📤 Sent {emails_sent} outreach emails")
        return emails_sent
    
    def create_free_demo_offer(self):
        """Create free mini demo offer system"""
        logger.info("🎁 Creating free mini demo offer system")
        
        # Create demo request tracking
        demo_requests = []
        
        # Demo offer details
        demo_offer = {
            'name': 'Free Mini Demo',
            'description': '50 qualified leads for your industry',
            'value': '$297',
            'delivery_time': '24 hours',
            'requirements': [
                'Target industry/niche',
                'Geographic location',
                'Company size preference',
                'Contact information needed'
            ],
            'process': [
                'Client provides requirements',
                'We generate 50 leads using our tools',
                'Deliver leads in CSV/Excel format',
                'Follow up with paid service offer'
            ]
        }
        
        # Create demo request form
        demo_form = {
            'form_id': 'free_demo_request',
            'fields': [
                {'name': 'company', 'label': 'Company Name', 'required': True},
                {'name': 'industry', 'label': 'Industry/Niche', 'required': True},
                {'name': 'location', 'label': 'Target Location', 'required': True},
                {'name': 'company_size', 'label': 'Company Size', 'required': True},
                {'name': 'contact_info', 'label': 'Contact Information Needed', 'required': True},
                {'name': 'email', 'label': 'Email Address', 'required': True},
                {'name': 'phone', 'label': 'Phone Number', 'required': False},
                {'name': 'notes', 'label': 'Additional Notes', 'required': False}
            ]
        }
        
        logger.info("✅ Free demo offer system created")
        return demo_offer, demo_form
    
    def track_funnel_performance(self):
        """Track the entire funnel performance"""
        logger.info("📊 Tracking funnel performance")
        
        # Calculate metrics
        total_leads = len(self.leads)
        high_priority = len([l for l in self.leads if l['priority'] == 'High'])
        medium_priority = len([l for l in self.leads if l['priority'] == 'Medium'])
        low_priority = len([l for l in self.leads if l['priority'] == 'Low'])
        
        emailed_leads = len([l for l in self.leads if l['status'] == 'emailed'])
        failed_emails = len([l for l in self.leads if l['status'] == 'email_failed'])
        
        # Service interest breakdown
        service_interest = {}
        for lead in self.leads:
            service = lead['service_interest']
            service_interest[service] = service_interest.get(service, 0) + 1
        
        # Performance report
        performance = {
            'date': datetime.now().strftime('%Y-%m-%d'),
            'total_leads': total_leads,
            'priority_breakdown': {
                'high': high_priority,
                'medium': medium_priority,
                'low': low_priority
            },
            'email_performance': {
                'emails_sent': emailed_leads,
                'emails_failed': failed_emails,
                'success_rate': round((emailed_leads / max(total_leads, 1)) * 100, 2)
            },
            'service_interest': service_interest,
            'top_companies': list(set([l['company'] for l in self.leads if l['company']]))[:10],
            'top_titles': list(set([l['title'] for l in self.leads if l['title']]))[:10]
        }
        
        # Save performance report
        report_filename = f"funnel_performance_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_filename, 'w') as f:
            json.dump(performance, f, indent=2)
        
        logger.info(f"📊 Performance report saved: {report_filename}")
        return performance
    
    def export_leads(self):
        """Export leads to CSV and JSON"""
        logger.info("📊 Exporting leads")
        
        # Export to CSV
        csv_filename = f"immediate_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
            if self.leads:
                fieldnames = self.leads[0].keys()
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(self.leads)
        
        # Export to JSON
        json_filename = f"immediate_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(json_filename, 'w', encoding='utf-8') as jsonfile:
            json.dump(self.leads, jsonfile, indent=2, ensure_ascii=False)
        
        logger.info(f"📊 Exported {len(self.leads)} leads to {csv_filename} and {json_filename}")
        return csv_filename, json_filename
    
    def close(self):
        """Close all connections"""
        self.linkedin_generator.close()
        logger.info("Closed all connections")

def main():
    """Main function to run immediate lead generation"""
    logger.info("🚀 Starting Immediate Lead Generation System")
    
    generator = ImmediateLeadGeneration()
    
    try:
        # Step 1: Generate targeted leads
        leads = generator.generate_targeted_leads(target_count=500)
        
        # Step 2: Create outreach campaign
        campaign_id = generator.create_outreach_campaign()
        
        # Step 3: Create free demo offer
        demo_offer, demo_form = generator.create_free_demo_offer()
        
        # Step 4: Send outreach emails (limited for demo)
        emails_sent = generator.send_outreach_emails(max_emails_per_day=10)
        
        # Step 5: Track performance
        performance = generator.track_funnel_performance()
        
        # Step 6: Export leads
        csv_file, json_file = generator.export_leads()
        
        # Summary
        logger.info("🎉 Immediate Lead Generation Complete!")
        logger.info(f"Total leads generated: {len(leads)}")
        logger.info(f"Emails sent: {emails_sent}")
        logger.info(f"High priority leads: {performance['priority_breakdown']['high']}")
        logger.info(f"Email success rate: {performance['email_performance']['success_rate']}%")
        logger.info(f"Files exported: {csv_file}, {json_file}")
        
        # Next steps
        logger.info("\n📋 Next Steps:")
        logger.info("1. Monitor email responses and book demo calls")
        logger.info("2. Deliver free mini demos to interested prospects")
        logger.info("3. Follow up with paid service offers")
        logger.info("4. Track conversion rates and optimize")
        
    except Exception as e:
        logger.error(f"Error in lead generation: {e}")
    
    finally:
        generator.close()

if __name__ == "__main__":
    main()
