#!/usr/bin/env python3
"""
Prepare Demo Environment
========================

This script prepares the automation system for demo recording by:
1. Setting up sample data
2. Configuring demo accounts
3. Preparing test scenarios
4. Creating demo files

Author: The AutomatePro
Version: 1.0
"""

import os
import json
import csv
import random
from datetime import datetime, timedelta
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_demo_leads():
    """Create realistic demo leads for LinkedIn demonstration"""
    logger.info("🎯 Creating demo leads for LinkedIn demonstration")
    
    # Realistic company names and industries
    companies = [
        "TechStart Inc.", "GrowthCo Agency", "E-commerce Plus", "SalesPro Solutions",
        "InnovateCorp", "Real Estate Masters", "HealthTech Solutions", "StartupHub",
        "LogisticsPro", "Digital Marketing Co", "FinanceFirst", "EduTech Solutions",
        "RetailMax", "ManufacturingPro", "ConsultingGroup", "AgencyPartners"
    ]
    
    industries = [
        "Software Technology", "Marketing Agency", "E-commerce", "Sales Technology",
        "Technology", "Real Estate", "Healthcare Technology", "Startup Incubator",
        "Logistics", "Digital Marketing", "Financial Services", "Education Technology",
        "Retail", "Manufacturing", "Consulting", "Marketing Services"
    ]
    
    titles = [
        "CEO", "Founder", "Marketing Director", "VP Sales", "Business Development Manager",
        "Owner", "Marketing Manager", "Director of Operations", "VP Marketing",
        "Chief Revenue Officer", "Head of Marketing", "Sales Director"
    ]
    
    locations = [
        "New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX",
        "Seattle, WA", "Miami, FL", "Boston, MA", "Denver, CO",
        "Los Angeles, CA", "Dallas, TX", "Phoenix, AZ", "Philadelphia, PA"
    ]
    
    # Generate 50 demo leads
    demo_leads = []
    for i in range(50):
        company = random.choice(companies)
        industry = random.choice(industries)
        title = random.choice(titles)
        location = random.choice(locations)
        
        # Create realistic names
        first_names = ["Sarah", "Mike", "Emily", "David", "Lisa", "Robert", "Jennifer", "Michael", "Amanda", "Chris"]
        last_names = ["Mitchell", "Chen", "Rodriguez", "Johnson", "Wang", "Smith", "Brown", "Davis", "Wilson", "Taylor"]
        
        first_name = random.choice(first_names)
        last_name = random.choice(last_names)
        
        # Generate realistic email
        email_domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com"]
        email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(email_domains)}"
        
        # Determine priority
        if title in ["CEO", "Founder", "Owner"]:
            priority = "High"
            service_interest = "Full Suite"
        elif "Marketing" in title:
            priority = "High"
            service_interest = "Marketing Automation"
        elif "Sales" in title:
            priority = "High"
            service_interest = "Lead Generation"
        else:
            priority = "Medium"
            service_interest = "Web Scraping"
        
        lead = {
            "name": f"{first_name} {last_name}",
            "title": title,
            "company": company,
            "email": email,
            "location": location,
            "industry": industry,
            "company_size": random.choice(["11-50", "51-200", "201-500"]),
            "priority": priority,
            "service_interest": service_interest,
            "source": "LinkedIn Demo",
            "date_found": datetime.now().strftime('%Y-%m-%d'),
            "status": "new"
        }
        
        demo_leads.append(lead)
    
    # Save demo leads
    demo_filename = "demo_leads_linkedin.csv"
    with open(demo_filename, 'w', newline='', encoding='utf-8') as csvfile:
        if demo_leads:
            fieldnames = demo_leads[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(demo_leads)
    
    logger.info(f"✅ Created {len(demo_leads)} demo leads in {demo_filename}")
    return demo_leads

def create_demo_email_campaign():
    """Create demo email campaign for demonstration"""
    logger.info("📧 Creating demo email campaign")
    
    # Email templates for different scenarios
    email_templates = {
        "high_priority": {
            "subject": "Quick question about {company} lead generation",
            "body": """Hi {first_name},

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
info@the-automatepro.info"""
        },
        "medium_priority": {
            "subject": "Automation services for {company}",
            "body": """Hi {first_name},

I help {company} and similar businesses automate their lead generation and marketing processes.

Our automation tools can:
• Generate 500+ leads per month
• Automate email campaigns
• Extract competitor data
• Save 20+ hours weekly

Interested in a free demo? I'll show you how to generate 50 leads in 5 minutes.

Book a call: https://calendly.com/the-automatepro/free-demo

Best,
The AutomatePro Team"""
        }
    }
    
    # Save email templates
    templates_filename = "demo_email_templates.json"
    with open(templates_filename, 'w', encoding='utf-8') as f:
        json.dump(email_templates, f, indent=2)
    
    logger.info(f"✅ Created email templates in {templates_filename}")
    return email_templates

def create_demo_web_scraping_data():
    """Create demo web scraping data for demonstration"""
    logger.info("🕷️ Creating demo web scraping data")
    
    # Sample e-commerce product data
    products = [
        {"name": "Wireless Bluetooth Headphones", "price": "$99.99", "category": "Electronics", "rating": "4.5"},
        {"name": "Smart Fitness Watch", "price": "$199.99", "category": "Wearables", "rating": "4.3"},
        {"name": "Portable Phone Charger", "price": "$29.99", "category": "Accessories", "rating": "4.7"},
        {"name": "Bluetooth Speaker", "price": "$79.99", "category": "Audio", "rating": "4.4"},
        {"name": "USB-C Cable", "price": "$12.99", "category": "Cables", "rating": "4.6"},
        {"name": "Wireless Mouse", "price": "$39.99", "category": "Computer", "rating": "4.2"},
        {"name": "Mechanical Keyboard", "price": "$149.99", "category": "Computer", "rating": "4.8"},
        {"name": "Gaming Headset", "price": "$89.99", "category": "Gaming", "rating": "4.5"},
        {"name": "Tablet Stand", "price": "$24.99", "category": "Accessories", "rating": "4.1"},
        {"name": "Screen Protector", "price": "$9.99", "category": "Accessories", "rating": "4.3"}
    ]
    
    # Generate 100 products for demo
    demo_products = []
    for i in range(100):
        base_product = random.choice(products)
        product = {
            "id": f"PROD_{i+1:03d}",
            "name": f"{base_product['name']} {i+1}",
            "price": base_product['price'],
            "category": base_product['category'],
            "rating": base_product['rating'],
            "description": f"High-quality {base_product['name'].lower()} with excellent features",
            "availability": random.choice(["In Stock", "Limited Stock", "Out of Stock"]),
            "brand": random.choice(["TechBrand", "SmartGear", "ProTech", "EliteGadgets"]),
            "scraped_at": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        demo_products.append(product)
    
    # Save demo products
    products_filename = "demo_products_scraped.csv"
    with open(products_filename, 'w', newline='', encoding='utf-8') as csvfile:
        if demo_products:
            fieldnames = demo_products[0].keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(demo_products)
    
    logger.info(f"✅ Created {len(demo_products)} demo products in {products_filename}")
    return demo_products

def create_demo_metrics():
    """Create demo metrics and analytics for dashboard"""
    logger.info("📊 Creating demo metrics and analytics")
    
    # Generate realistic metrics
    metrics = {
        "lead_generation": {
            "total_leads": 500,
            "leads_this_month": 150,
            "conversion_rate": 15.2,
            "cost_per_lead": 2.50,
            "leads_by_source": {
                "LinkedIn": 300,
                "Email": 100,
                "Web Scraping": 100
            }
        },
        "email_campaigns": {
            "total_sent": 2500,
            "delivery_rate": 95.5,
            "open_rate": 45.2,
            "click_rate": 12.8,
            "conversion_rate": 8.5,
            "unsubscribe_rate": 1.2
        },
        "web_scraping": {
            "total_records": 10000,
            "records_this_month": 2500,
            "success_rate": 98.5,
            "average_time": "2.5 minutes",
            "data_quality": 94.2
        },
        "revenue": {
            "total_revenue": 25000,
            "revenue_this_month": 8500,
            "average_deal_size": 1250,
            "clients_active": 25,
            "retention_rate": 92.0
        }
    }
    
    # Save metrics
    metrics_filename = "demo_metrics.json"
    with open(metrics_filename, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2)
    
    logger.info(f"✅ Created demo metrics in {metrics_filename}")
    return metrics

def create_demo_client_accounts():
    """Create demo client accounts for dashboard demonstration"""
    logger.info("👥 Creating demo client accounts")
    
    # Sample client accounts
    clients = [
        {
            "id": "CLIENT_001",
            "name": "TechStart Inc.",
            "email": "sarah@techstart.com",
            "plan": "Growth Package",
            "monthly_fee": 997,
            "status": "Active",
            "signup_date": "2024-01-15",
            "last_login": "2024-09-17",
            "projects_completed": 12,
            "total_spent": 11964
        },
        {
            "id": "CLIENT_002",
            "name": "GrowthCo Agency",
            "email": "mike@growthco.com",
            "plan": "Enterprise Package",
            "monthly_fee": 1997,
            "status": "Active",
            "signup_date": "2024-02-20",
            "last_login": "2024-09-16",
            "projects_completed": 8,
            "total_spent": 15976
        },
        {
            "id": "CLIENT_003",
            "name": "E-commerce Plus",
            "email": "emily@ecommerceplus.com",
            "plan": "Starter Package",
            "monthly_fee": 497,
            "status": "Active",
            "signup_date": "2024-03-10",
            "last_login": "2024-09-15",
            "projects_completed": 15,
            "total_spent": 7455
        }
    ]
    
    # Save client accounts
    clients_filename = "demo_clients.json"
    with open(clients_filename, 'w', encoding='utf-8') as f:
        json.dump(clients, f, indent=2)
    
    logger.info(f"✅ Created {len(clients)} demo client accounts in {clients_filename}")
    return clients

def create_demo_scripts():
    """Create demo scripts for recording"""
    logger.info("📝 Creating demo scripts for recording")
    
    scripts = {
        "linkedin_demo": {
            "title": "LinkedIn Lead Generator Demo",
            "duration": "2-3 minutes",
            "steps": [
                "Open LinkedIn in browser",
                "Navigate to search page",
                "Enter search criteria: 'CEO technology companies'",
                "Show automation tool running",
                "Display results in real-time",
                "Export to CSV and show file",
                "Highlight key metrics (500+ leads, 30 minutes)"
            ],
            "key_points": [
                "500+ qualified leads generated",
                "30 minutes total time",
                "Automated contact extraction",
                "CSV export ready for CRM"
            ]
        },
        "email_demo": {
            "title": "Email Campaign Manager Demo",
            "duration": "2-3 minutes",
            "steps": [
                "Open email dashboard",
                "Import lead list from CSV",
                "Create email template with personalization",
                "Set up campaign parameters",
                "Send test email to yourself",
                "Show campaign dashboard with metrics",
                "Display results (open rates, clicks, etc.)"
            ],
            "key_points": [
                "45% open rate achieved",
                "12% click rate",
                "Personalized emails",
                "Real-time tracking"
            ]
        },
        "scraping_demo": {
            "title": "Web Scraper Demo",
            "duration": "2-3 minutes",
            "steps": [
                "Open target website (e-commerce site)",
                "Start scraper tool",
                "Configure data points to extract",
                "Run scraping process (show progress)",
                "Display results in real-time",
                "Export to Excel and show file",
                "Highlight data quality and completeness"
            ],
            "key_points": [
                "1000+ products scraped",
                "5 minutes total time",
                "Clean, structured data",
                "Excel export ready"
            ]
        }
    }
    
    # Save demo scripts
    scripts_filename = "demo_scripts.json"
    with open(scripts_filename, 'w', encoding='utf-8') as f:
        json.dump(scripts, f, indent=2)
    
    logger.info(f"✅ Created demo scripts in {scripts_filename}")
    return scripts

def main():
    """Main function to prepare demo environment"""
    logger.info("🎬 Preparing demo environment for video recording")
    
    try:
        # Create demo data
        demo_leads = create_demo_leads()
        email_templates = create_demo_email_campaign()
        demo_products = create_demo_web_scraping_data()
        metrics = create_demo_metrics()
        clients = create_demo_client_accounts()
        scripts = create_demo_scripts()
        
        # Create demo summary
        demo_summary = {
            "prepared_at": datetime.now().isoformat(),
            "demo_leads": len(demo_leads),
            "demo_products": len(demo_products),
            "email_templates": len(email_templates),
            "client_accounts": len(clients),
            "demo_scripts": len(scripts),
            "files_created": [
                "demo_leads_linkedin.csv",
                "demo_email_templates.json",
                "demo_products_scraped.csv",
                "demo_metrics.json",
                "demo_clients.json",
                "demo_scripts.json"
            ]
        }
        
        # Save demo summary
        summary_filename = "demo_environment_summary.json"
        with open(summary_filename, 'w', encoding='utf-8') as f:
            json.dump(demo_summary, f, indent=2)
        
        logger.info("🎉 Demo environment preparation complete!")
        logger.info(f"📊 Summary:")
        logger.info(f"  - Demo leads: {len(demo_leads)}")
        logger.info(f"  - Demo products: {len(demo_products)}")
        logger.info(f"  - Email templates: {len(email_templates)}")
        logger.info(f"  - Client accounts: {len(clients)}")
        logger.info(f"  - Demo scripts: {len(scripts)}")
        
        logger.info("\n📋 Next Steps:")
        logger.info("1. Review the demo data files")
        logger.info("2. Practice the demo scripts")
        logger.info("3. Set up screen recording software")
        logger.info("4. Start recording your demo videos")
        
    except Exception as e:
        logger.error(f"Error preparing demo environment: {e}")

if __name__ == "__main__":
    main()
