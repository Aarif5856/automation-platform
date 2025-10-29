#!/usr/bin/env python3
"""
Generate Your Own Leads - Use Your Own Tools
============================================

This script uses your own automation tools to generate leads for your business.
It's a perfect example of "eating your own dog food" - using your tools to grow your business.

Author: The AutomatePro
Version: 1.0
"""

import time
import random
import csv
import json
from datetime import datetime
import logging
from linkedin_lead_generator import LinkedInLeadGenerator
from email_campaign_manager import EmailCampaignManager

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class OwnLeadGenerator:
    def __init__(self):
        self.linkedin_generator = LinkedInLeadGenerator(headless=False)
        self.email_manager = EmailCampaignManager()
        self.leads = []
        
    def generate_qatar_business_leads(self):
        """Generate leads specifically for Qatar market"""
        logger.info("🇶🇦 Generating Qatar Business Leads")
        
        # Qatar-specific search strategies
        search_queries = [
            "CEO Qatar Construction",
            "Founder Qatar Real Estate", 
            "Owner Qatar Hospitality",
            "Director Qatar Technology",
            "Manager Qatar Healthcare",
            "CEO Qatar E-commerce",
            "Founder Qatar Consulting",
            "Owner Qatar Manufacturing"
        ]
        
        all_leads = []
        
        for query in search_queries:
            logger.info(f"Searching for: {query}")
            
            try:
                # Search LinkedIn
                if self.linkedin_generator.search_linkedin(
                    keywords=query,
                    location="Qatar",
                    industry="",
                    company_size=""
                ):
                    # Extract profiles
                    profiles = self.linkedin_generator.extract_profiles(max_profiles=20)
                    
                    if profiles:
                        # Find email addresses
                        self.linkedin_generator.find_email_addresses(profiles)
                        
                        # Add to our leads
                        for profile in profiles:
                            if profile.get('email'):
                                lead = {
                                    'name': profile.get('name', ''),
                                    'title': profile.get('title', ''),
                                    'company': profile.get('company', ''),
                                    'email': profile.get('email', ''),
                                    'location': 'Qatar',
                                    'source': 'LinkedIn',
                                    'search_query': query,
                                    'date_found': datetime.now().strftime('%Y-%m-%d'),
                                    'status': 'new'
                                }
                                all_leads.append(lead)
                                logger.info(f"Found lead: {lead['name']} - {lead['company']}")
                    
                    # Random delay between searches
                    time.sleep(random.randint(30, 60))
                    
            except Exception as e:
                logger.error(f"Error searching for {query}: {e}")
                continue
        
        self.leads = all_leads
        logger.info(f"Generated {len(self.leads)} Qatar business leads")
        return all_leads
    
    def generate_global_automation_leads(self):
        """Generate leads for automation services globally"""
        logger.info("🌍 Generating Global Automation Leads")
        
        # Global search strategies
        search_queries = [
            "CEO automation services",
            "Founder marketing agency",
            "Owner small business",
            "Director e-commerce",
            "Manager lead generation",
            "CEO digital marketing",
            "Founder startup",
            "Owner consulting"
        ]
        
        all_leads = []
        
        for query in search_queries:
            logger.info(f"Searching for: {query}")
            
            try:
                # Search LinkedIn
                if self.linkedin_generator.search_linkedin(
                    keywords=query,
                    location="",
                    industry="",
                    company_size="10-200"
                ):
                    # Extract profiles
                    profiles = self.linkedin_generator.extract_profiles(max_profiles=15)
                    
                    if profiles:
                        # Find email addresses
                        self.linkedin_generator.find_email_addresses(profiles)
                        
                        # Add to our leads
                        for profile in profiles:
                            if profile.get('email'):
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
                                    'service_interest': self._determine_service_interest(profile)
                                }
                                all_leads.append(lead)
                                logger.info(f"Found lead: {lead['name']} - {lead['company']}")
                    
                    # Random delay between searches
                    time.sleep(random.randint(45, 90))
                    
            except Exception as e:
                logger.error(f"Error searching for {query}: {e}")
                continue
        
        self.leads.extend(all_leads)
        logger.info(f"Generated {len(all_leads)} global automation leads")
        return all_leads
    
    def _determine_service_interest(self, profile):
        """Determine which service the lead might be interested in"""
        title = profile.get('title', '').lower()
        company = profile.get('company', '').lower()
        
        if any(word in title for word in ['marketing', 'growth', 'sales']):
            return 'Email Marketing'
        elif any(word in title for word in ['ceo', 'founder', 'owner']):
            return 'Full Suite'
        elif any(word in company for word in ['ecommerce', 'retail', 'store']):
            return 'Web Scraping'
        else:
            return 'LinkedIn Leads'
    
    def create_email_campaign(self):
        """Create an email campaign for the generated leads"""
        logger.info("📧 Creating Email Campaign for Generated Leads")
        
        # Create campaign
        campaign_id = f"own_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Email template
        email_template = """
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">⚡ The AutomatePro</h1>
                <p style="color: white; margin: 10px 0 0 0;">Professional Automation Services</p>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
                <h2 style="color: #333; margin-top: 0;">Hi {first_name},</h2>
                
                <p>I noticed you're {title} at {company} and thought you might be interested in our automation services.</p>
                
                <p>We help businesses like yours:</p>
                <ul style="color: #666;">
                    <li>Generate 500+ qualified leads per month</li>
                    <li>Automate email marketing campaigns</li>
                    <li>Extract data from any website</li>
                    <li>Save 20+ hours per week on manual tasks</li>
                </ul>
                
                <p>Our clients typically see:</p>
                <ul style="color: #666;">
                    <li>300% increase in lead generation</li>
                    <li>80% reduction in manual work</li>
                    <li>$10K+ additional monthly revenue</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://the-automatepro.info" 
                       style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        See Our Services
                    </a>
                </div>
                
                <p>Would you like a free consultation to see how we can help your business?</p>
                
                <p>Best regards,<br>
                The AutomatePro Team<br>
                <a href="mailto:info@the-automatepro.info">info@the-automatepro.info</a><br>
                <a href="https://the-automatepro.info">the-automatepro.info</a></p>
            </div>
        </body>
        </html>
        """
        
        # Create template
        self.email_manager.create_template(
            template_id=f"own_leads_template_{campaign_id}",
            name="Own Leads Campaign",
            subject="Automation Services for {company}",
            html_content=email_template
        )
        
        # Create campaign
        self.email_manager.create_campaign(
            campaign_id=campaign_id,
            name="Own Leads Campaign",
            template_id=f"own_leads_template_{campaign_id}",
            contact_list="own_leads"
        )
        
        logger.info(f"Created email campaign: {campaign_id}")
        return campaign_id
    
    def export_leads(self):
        """Export leads to CSV and JSON"""
        logger.info("📊 Exporting Leads")
        
        # Export to CSV
        csv_filename = f"own_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
            if self.leads:
                fieldnames = self.leads[0].keys()
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(self.leads)
        
        # Export to JSON
        json_filename = f"own_leads_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(json_filename, 'w', encoding='utf-8') as jsonfile:
            json.dump(self.leads, jsonfile, indent=2, ensure_ascii=False)
        
        logger.info(f"Exported {len(self.leads)} leads to {csv_filename} and {json_filename}")
        return csv_filename, json_filename
    
    def close(self):
        """Close all connections"""
        self.linkedin_generator.close()
        logger.info("Closed all connections")

def main():
    """Main function to generate own leads"""
    logger.info("🚀 Starting Own Lead Generation")
    
    generator = OwnLeadGenerator()
    
    try:
        # Generate Qatar business leads
        qatar_leads = generator.generate_qatar_business_leads()
        
        # Generate global automation leads
        global_leads = generator.generate_global_automation_leads()
        
        # Create email campaign
        campaign_id = generator.create_email_campaign()
        
        # Export leads
        csv_file, json_file = generator.export_leads()
        
        # Summary
        logger.info("🎉 Lead Generation Complete!")
        logger.info(f"Total leads generated: {len(generator.leads)}")
        logger.info(f"Qatar leads: {len(qatar_leads)}")
        logger.info(f"Global leads: {len(global_leads)}")
        logger.info(f"Email campaign created: {campaign_id}")
        logger.info(f"Files exported: {csv_file}, {json_file}")
        
    except Exception as e:
        logger.error(f"Error in lead generation: {e}")
    
    finally:
        generator.close()

if __name__ == "__main__":
    main()
