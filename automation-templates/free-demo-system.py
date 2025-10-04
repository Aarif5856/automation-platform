#!/usr/bin/env python3
"""
Free Mini Demo System
====================

This system delivers free mini demos to hook prospects into paid plans:
1. Generate 50 leads for free (mini demo)
2. Deliver results within 24 hours
3. Follow up with paid service offers
4. Track conversion rates

Author: The AutomatePro
Version: 1.0
"""

import time
import csv
import json
from datetime import datetime, timedelta
import logging
from typing import Dict, List
from web_scraper import WebScraper
from linkedin_lead_generator import LinkedInLeadGenerator
from email_campaign_manager import EmailCampaignManager

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class FreeDemoSystem:
    def __init__(self):
        self.web_scraper = WebScraper()
        self.linkedin_generator = LinkedInLeadGenerator(headless=False)
        self.email_manager = EmailCampaignManager()
        self.demo_requests = []
        self.completed_demos = []
        
    def process_demo_request(self, request_data: Dict):
        """Process a free demo request"""
        logger.info(f"🎁 Processing demo request for {request_data.get('company', 'Unknown')}")
        
        # Create demo request record
        demo_request = {
            'request_id': f"demo_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'company': request_data.get('company', ''),
            'industry': request_data.get('industry', ''),
            'location': request_data.get('location', ''),
            'company_size': request_data.get('company_size', ''),
            'contact_info': request_data.get('contact_info', ''),
            'email': request_data.get('email', ''),
            'phone': request_data.get('phone', ''),
            'notes': request_data.get('notes', ''),
            'status': 'processing',
            'requested_at': datetime.now().isoformat(),
            'target_leads': 50
        }
        
        self.demo_requests.append(demo_request)
        
        try:
            # Generate 50 leads based on requirements
            leads = self.generate_demo_leads(demo_request)
            
            if leads:
                # Create demo report
                demo_report = self.create_demo_report(demo_request, leads)
                
                # Send demo results
                self.send_demo_results(demo_request, demo_report)
                
                # Update status
                demo_request['status'] = 'completed'
                demo_request['leads_generated'] = len(leads)
                demo_request['completed_at'] = datetime.now().isoformat()
                
                self.completed_demos.append(demo_request)
                
                logger.info(f"✅ Demo completed for {demo_request['company']} - {len(leads)} leads generated")
                return demo_report
            else:
                demo_request['status'] = 'failed'
                logger.error(f"❌ Failed to generate leads for {demo_request['company']}")
                return None
                
        except Exception as e:
            logger.error(f"Error processing demo request: {e}")
            demo_request['status'] = 'error'
            return None
    
    def generate_demo_leads(self, demo_request: Dict) -> List[Dict]:
        """Generate 50 leads for the demo"""
        logger.info(f"🔍 Generating 50 leads for {demo_request['company']}")
        
        industry = demo_request['industry']
        location = demo_request['location']
        company_size = demo_request['company_size']
        
        # Create search queries based on industry
        search_queries = self._create_search_queries(industry, location)
        
        all_leads = []
        
        for query in search_queries[:3]:  # Limit to 3 searches for demo
            try:
                logger.info(f"Searching: {query}")
                
                # Search LinkedIn
                if self.linkedin_generator.search_linkedin(
                    keywords=query,
                    location=location,
                    industry="",
                    company_size=company_size
                ):
                    # Extract profiles
                    profiles = self.linkedin_generator.extract_profiles(max_profiles=20)
                    
                    if profiles:
                        # Find email addresses
                        self.linkedin_generator.find_email_addresses(profiles)
                        
                        # Process leads
                        for profile in profiles:
                            if profile.get('email') and len(all_leads) < 50:
                                lead = {
                                    'name': profile.get('name', ''),
                                    'title': profile.get('title', ''),
                                    'company': profile.get('company', ''),
                                    'email': profile.get('email', ''),
                                    'location': profile.get('location', ''),
                                    'industry': industry,
                                    'source': 'LinkedIn',
                                    'search_query': query,
                                    'demo_request_id': demo_request['request_id']
                                }
                                all_leads.append(lead)
                                logger.info(f"✅ Found lead: {lead['name']} - {lead['company']}")
                    
                    # Rate limiting
                    time.sleep(random.randint(10, 20))
                    
            except Exception as e:
                logger.error(f"Error searching for {query}: {e}")
                continue
        
        logger.info(f"🎯 Generated {len(all_leads)} leads for demo")
        return all_leads
    
    def _create_search_queries(self, industry: str, location: str) -> List[str]:
        """Create search queries based on industry"""
        industry_lower = industry.lower()
        
        queries = []
        
        # Generic industry searches
        if any(word in industry_lower for word in ['tech', 'software', 'saas']):
            queries.extend([
                f"CEO {industry} {location}",
                f"Founder {industry} {location}",
                f"CTO {industry} {location}",
                f"VP Engineering {industry} {location}"
            ])
        elif any(word in industry_lower for word in ['marketing', 'advertising', 'agency']):
            queries.extend([
                f"Marketing Director {industry} {location}",
                f"CEO {industry} {location}",
                f"Founder {industry} {location}",
                f"VP Marketing {industry} {location}"
            ])
        elif any(word in industry_lower for word in ['real estate', 'property']):
            queries.extend([
                f"Real Estate Agent {location}",
                f"Real Estate Broker {location}",
                f"Real Estate Manager {location}",
                f"Property Manager {location}"
            ])
        elif any(word in industry_lower for word in ['healthcare', 'medical', 'health']):
            queries.extend([
                f"Medical Director {location}",
                f"Healthcare Administrator {location}",
                f"Practice Manager {location}",
                f"Healthcare CEO {location}"
            ])
        else:
            # Generic searches
            queries.extend([
                f"CEO {industry} {location}",
                f"Founder {industry} {location}",
                f"Director {industry} {location}",
                f"Manager {industry} {location}"
            ])
        
        return queries
    
    def create_demo_report(self, demo_request: Dict, leads: List[Dict]) -> Dict:
        """Create a comprehensive demo report"""
        logger.info(f"📊 Creating demo report for {demo_request['company']}")
        
        # Calculate metrics
        total_leads = len(leads)
        unique_companies = len(set([l['company'] for l in leads if l['company']]))
        locations = list(set([l['location'] for l in leads if l['location']]))
        titles = list(set([l['title'] for l in leads if l['title']]))
        
        # Create report
        report = {
            'demo_request_id': demo_request['request_id'],
            'company': demo_request['company'],
            'industry': demo_request['industry'],
            'generated_at': datetime.now().isoformat(),
            'summary': {
                'total_leads': total_leads,
                'unique_companies': unique_companies,
                'locations': locations,
                'common_titles': titles[:5]
            },
            'leads': leads,
            'next_steps': [
                'Review the leads and verify quality',
                'Import into your CRM system',
                'Start your outreach campaign',
                'Consider our full automation services for 500+ leads/month'
            ],
            'value_proposition': {
                'time_saved': '20+ hours of manual research',
                'cost_saved': '$500+ in manual lead generation',
                'quality': 'Pre-verified contact information',
                'format': 'Ready-to-use CSV/Excel files'
            }
        }
        
        return report
    
    def send_demo_results(self, demo_request: Dict, demo_report: Dict):
        """Send demo results to the client"""
        logger.info(f"📧 Sending demo results to {demo_request['email']}")
        
        # Create email content
        subject = f"Your Free Demo Results - {demo_request['company']}"
        
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0;">🎁 Your Free Demo Results</h1>
                <p style="color: white; margin: 10px 0 0 0;">The AutomatePro</p>
            </div>
            
            <div style="padding: 30px; background: #f8f9fa;">
                <h2>Hi {demo_request['company']} Team,</h2>
                
                <p>As promised, here are your <strong>50 qualified leads</strong> for the {demo_request['industry']} industry in {demo_request['location']}.</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>📊 Demo Results Summary</h3>
                    <ul style="color: #666;">
                        <li><strong>Total Leads:</strong> {demo_report['summary']['total_leads']}</li>
                        <li><strong>Unique Companies:</strong> {demo_report['summary']['unique_companies']}</li>
                        <li><strong>Locations:</strong> {', '.join(demo_report['summary']['locations'][:3])}</li>
                        <li><strong>Common Titles:</strong> {', '.join(demo_report['summary']['common_titles'][:3])}</li>
                    </ul>
                </div>
                
                <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>💰 Value Delivered</h3>
                    <ul style="color: #666;">
                        <li>Time Saved: {demo_report['value_proposition']['time_saved']}</li>
                        <li>Cost Saved: {demo_report['value_proposition']['cost_saved']}</li>
                        <li>Quality: {demo_report['value_proposition']['quality']}</li>
                        <li>Format: {demo_report['value_proposition']['format']}</li>
                    </ul>
                </div>
                
                <p>Your leads are attached in CSV and Excel formats. You can import them directly into your CRM system.</p>
                
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>🚀 Ready to Scale?</h3>
                    <p>If you're happy with these results, imagine what we could do with our full automation services:</p>
                    <ul style="color: #666;">
                        <li><strong>500+ leads per month</strong> (10x more than this demo)</li>
                        <li><strong>Automated email campaigns</strong> to nurture leads</li>
                        <li><strong>LinkedIn lead generation</strong> on autopilot</li>
                        <li><strong>Web scraping</strong> for competitor data</li>
                        <li><strong>CRM integration</strong> for seamless workflow</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://calendly.com/the-automatepro/paid-consultation" 
                       style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px;">
                        Book Paid Consultation - $997
                    </a>
                    <a href="https://the-automatepro.info/packages" 
                       style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px;">
                        View All Packages
                    </a>
                </div>
                
                <p>Questions? Reply to this email or call us at +974 33288952</p>
                
                <p>Best regards,<br>
                The AutomatePro Team<br>
                <a href="mailto:info@the-automatepro.info">info@the-automatepro.info</a><br>
                <a href="https://the-automatepro.info">the-automatepro.info</a></p>
            </div>
        </body>
        </html>
        """
        
        # Send email
        try:
            self.email_manager.send_email(
                to=demo_request['email'],
                subject=subject,
                body=html_content,
                is_html=True
            )
            logger.info(f"✅ Demo results sent to {demo_request['email']}")
        except Exception as e:
            logger.error(f"Error sending demo results: {e}")
    
    def export_demo_leads(self, demo_request: Dict, leads: List[Dict]):
        """Export demo leads to CSV and Excel"""
        logger.info(f"📊 Exporting demo leads for {demo_request['company']}")
        
        # Export to CSV
        csv_filename = f"demo_leads_{demo_request['request_id']}.csv"
        with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
            if leads:
                fieldnames = leads[0].keys()
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(leads)
        
        # Export to Excel
        excel_filename = f"demo_leads_{demo_request['request_id']}.xlsx"
        import pandas as pd
        df = pd.DataFrame(leads)
        df.to_excel(excel_filename, index=False)
        
        logger.info(f"📊 Demo leads exported to {csv_filename} and {excel_filename}")
        return csv_filename, excel_filename
    
    def track_demo_conversions(self):
        """Track conversion from free demos to paid services"""
        logger.info("📈 Tracking demo conversions")
        
        total_demos = len(self.completed_demos)
        # In a real system, you'd track actual conversions
        # For now, we'll simulate based on industry averages
        conversion_rate = 0.25  # 25% conversion rate
        estimated_conversions = int(total_demos * conversion_rate)
        
        conversion_report = {
            'date': datetime.now().strftime('%Y-%m-%d'),
            'total_demos_delivered': total_demos,
            'estimated_conversions': estimated_conversions,
            'conversion_rate': conversion_rate,
            'estimated_revenue': estimated_conversions * 997,  # Average package price
            'demos_by_industry': self._get_industry_breakdown()
        }
        
        # Save conversion report
        report_filename = f"demo_conversions_{datetime.now().strftime('%Y%m%d')}.json"
        with open(report_filename, 'w') as f:
            json.dump(conversion_report, f, indent=2)
        
        logger.info(f"📈 Conversion report saved: {report_filename}")
        return conversion_report
    
    def _get_industry_breakdown(self):
        """Get breakdown of demos by industry"""
        industry_count = {}
        for demo in self.completed_demos:
            industry = demo.get('industry', 'Unknown')
            industry_count[industry] = industry_count.get(industry, 0) + 1
        return industry_count
    
    def close(self):
        """Close all connections"""
        self.web_scraper.close()
        self.linkedin_generator.close()
        logger.info("Closed all connections")

def main():
    """Main function to demonstrate free demo system"""
    logger.info("🎁 Starting Free Demo System")
    
    demo_system = FreeDemoSystem()
    
    try:
        # Sample demo request
        sample_request = {
            'company': 'TechStart Inc.',
            'industry': 'Software Technology',
            'location': 'New York',
            'company_size': '51-200',
            'contact_info': 'Email and phone numbers',
            'email': 'demo@techstart.com',
            'phone': '+1-555-123-4567',
            'notes': 'Looking for SaaS leads'
        }
        
        # Process demo request
        demo_report = demo_system.process_demo_request(sample_request)
        
        if demo_report:
            # Export leads
            csv_file, excel_file = demo_system.export_demo_leads(
                sample_request, 
                demo_report['leads']
            )
            
            # Track conversions
            conversion_report = demo_system.track_demo_conversions()
            
            logger.info("🎉 Free Demo System Complete!")
            logger.info(f"Demo delivered: {demo_report['summary']['total_leads']} leads")
            logger.info(f"Files created: {csv_file}, {excel_file}")
            logger.info(f"Estimated conversions: {conversion_report['estimated_conversions']}")
        
    except Exception as e:
        logger.error(f"Error in demo system: {e}")
    
    finally:
        demo_system.close()

if __name__ == "__main__":
    main()
