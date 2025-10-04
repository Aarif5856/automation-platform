#!/usr/bin/env python3
"""
Automation Tools Setup Script
=============================

This script helps you set up LinkedIn credentials and email configuration
for your automation tools.
"""

import os
import getpass
import json
from datetime import datetime

def setup_linkedin_credentials():
    """Set up LinkedIn credentials"""
    print("\n🔗 LinkedIn Lead Generator Setup")
    print("=" * 40)
    
    print("To use the LinkedIn Lead Generator, you need to provide your LinkedIn credentials.")
    print("Note: Use a dedicated LinkedIn account for automation to avoid any issues.")
    
    email = input("LinkedIn Email: ").strip()
    password = getpass.getpass("LinkedIn Password: ")
    
    if not email or not password:
        print("❌ Email and password are required!")
        return False
    
    # Update the config file
    config_content = f'''#!/usr/bin/env python3
"""
LinkedIn Lead Generator Configuration
====================================

This file contains the configuration for LinkedIn lead generation.
Updated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""

# LinkedIn Credentials
LINKEDIN_EMAIL = "{email}"
LINKEDIN_PASSWORD = "{password}"

# LinkedIn Search Configuration
SEARCH_CONFIG = {{
    'keywords': 'CEO OR Founder OR Owner OR Director',
    'location': 'United States',
    'industry': 'Technology',
    'company_size': '51-200',
    'max_profiles': 100,
    'headless': False  # Set to True for production
}}

# Proxy Configuration (Optional)
PROXY_LIST = [
    # Add your proxy servers here if needed
    # "http://proxy1:port",
    # "http://proxy2:port"
]

# User Agents (Optional)
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
]

# Delay Configuration
DELAY_RANGE = (2, 5)  # Random delay between actions (min, max) seconds
PAGE_LOAD_DELAY = 3   # Delay after page load
ACTION_DELAY = 1      # Delay between individual actions

# Output Configuration
OUTPUT_FORMATS = ['csv', 'json', 'excel']
OUTPUT_FILENAME = 'linkedin_leads'

# Email Finding Configuration
EMAIL_PATTERNS = [
    "{{first_name}}.{{last_name}}@{{company}}.com",
    "{{first_name}}@{{company}}.com",
    "{{first_name}}{{last_name}}@{{company}}.com",
    "{{first_name[0]}}.{{last_name}}@{{company}}.com"
]

# Verification Settings
VERIFY_EMAILS = True
USE_EXTERNAL_EMAIL_FINDER = False  # Set to True if you have Hunter.io or similar API

# External Email Finder API (Optional)
EMAIL_FINDER_API_KEY = "your-api-key-here"
EMAIL_FINDER_SERVICE = "hunter"  # Options: hunter, findthatemail, etc.
'''
    
    with open('automation-templates/linkedin-config.py', 'w') as f:
        f.write(config_content)
    
    print("✅ LinkedIn configuration saved!")
    return True

def setup_email_credentials():
    """Set up email credentials"""
    print("\n📧 Email Campaign Manager Setup")
    print("=" * 40)
    
    print("Choose your email provider:")
    print("1. Gmail (Recommended)")
    print("2. Outlook")
    print("3. Yahoo")
    print("4. Custom SMTP")
    
    choice = input("Enter your choice (1-4): ").strip()
    
    providers = {
        '1': 'gmail',
        '2': 'outlook', 
        '3': 'yahoo',
        '4': 'custom'
    }
    
    provider = providers.get(choice, 'gmail')
    
    email = input("Email Address: ").strip()
    password = getpass.getpass("Email Password (or App Password): ")
    
    if not email or not password:
        print("❌ Email and password are required!")
        return False
    
    # Get SMTP settings based on provider
    if provider == 'gmail':
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        print("\n📝 Note: For Gmail, use an App Password instead of your regular password.")
        print("   Go to: Google Account > Security > 2-Step Verification > App passwords")
    elif provider == 'outlook':
        smtp_server = 'smtp-mail.outlook.com'
        smtp_port = 587
    elif provider == 'yahoo':
        smtp_server = 'smtp.mail.yahoo.com'
        smtp_port = 587
    else:
        smtp_server = input("SMTP Server: ").strip()
        smtp_port = int(input("SMTP Port: ").strip() or "587")
    
    # Update the config file
    config_content = f'''#!/usr/bin/env python3
"""
Email Campaign Manager Configuration
===================================

This file contains the configuration for email marketing campaigns.
Updated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""

# SMTP Configuration
SMTP_CONFIG = {{
    'server': '{smtp_server}',
    'port': {smtp_port},
    'email': '{email}',
    'password': '{password}',
    'use_tls': True
}}

# Alternative SMTP Providers
SMTP_PROVIDERS = {{
    'gmail': {{
        'server': 'smtp.gmail.com',
        'port': 587,
        'use_tls': True
    }},
    'outlook': {{
        'server': 'smtp-mail.outlook.com',
        'port': 587,
        'use_tls': True
    }},
    'yahoo': {{
        'server': 'smtp.mail.yahoo.com',
        'port': 587,
        'use_tls': True
    }},
    'custom': {{
        'server': 'your-smtp-server.com',
        'port': 587,
        'use_tls': True
    }}
}}

# Email Campaign Settings
CAMPAIGN_CONFIG = {{
    'delay_between_emails': 1,  # Seconds between sending emails
    'max_emails_per_hour': 100,  # Rate limiting
    'retry_failed_emails': True,
    'max_retries': 3,
    'track_opens': True,
    'track_clicks': True
}}

# Email Templates Directory
TEMPLATES_DIR = 'email_templates'

# Database Configuration
DATABASE_CONFIG = {{
    'path': 'email_campaigns.db',
    'backup_enabled': True,
    'backup_interval': 24  # Hours
}}

# Unsubscribe Configuration
UNSUBSCRIBE_CONFIG = {{
    'enabled': True,
    'unsubscribe_url': 'https://the-automatepro.info/unsubscribe',
    'token_length': 32
}}

# Email Validation
EMAIL_VALIDATION = {{
    'enabled': True,
    'check_syntax': True,
    'check_domain': True,
    'check_mx_record': True
}}

# Bounce Handling
BOUNCE_HANDLING = {{
    'enabled': True,
    'soft_bounce_retry': 3,
    'hard_bounce_remove': True,
    'bounce_threshold': 5  # Remove after 5 bounces
}}

# Analytics Configuration
ANALYTICS_CONFIG = {{
    'track_opens': True,
    'track_clicks': True,
    'track_replies': True,
    'track_bounces': True,
    'google_analytics_id': 'GA-XXXXXXXXX'  # Optional
}}

# Compliance Settings
COMPLIANCE_CONFIG = {{
    'include_unsubscribe': True,
    'include_physical_address': True,
    'physical_address': '820 street 33 zone 29 building, Al Markhiya, Doha, Qatar',
    'company_name': 'The AutomatePro',
    'comply_with_can_spam': True,
    'comply_with_gdpr': True
}}

# Testing Configuration
TESTING_CONFIG = {{
    'test_mode': False,  # Set to True for testing
    'test_email': 'test@example.com',
    'dry_run': False  # Set to True to simulate sending
}}
'''
    
    with open('automation-templates/email-config.py', 'w') as f:
        f.write(config_content)
    
    print("✅ Email configuration saved!")
    return True

def test_configurations():
    """Test the configured credentials"""
    print("\n🧪 Testing Configurations")
    print("=" * 40)
    
    # Test LinkedIn configuration
    try:
        from automation_templates.linkedin_config import LINKEDIN_EMAIL, LINKEDIN_PASSWORD
        if LINKEDIN_EMAIL and LINKEDIN_PASSWORD:
            print("✅ LinkedIn credentials loaded successfully")
        else:
            print("❌ LinkedIn credentials not found")
    except ImportError:
        print("❌ LinkedIn config file not found")
    
    # Test Email configuration
    try:
        from automation_templates.email_config import SMTP_CONFIG
        if SMTP_CONFIG['email'] and SMTP_CONFIG['password']:
            print("✅ Email credentials loaded successfully")
        else:
            print("❌ Email credentials not found")
    except ImportError:
        print("❌ Email config file not found")

def main():
    """Main setup function"""
    print("🚀 Automation Tools Setup")
    print("=" * 50)
    print("This script will help you configure your automation tools.")
    print("You can skip any step by pressing Enter without entering anything.")
    
    # Create automation-templates directory if it doesn't exist
    os.makedirs('automation-templates', exist_ok=True)
    
    # Setup LinkedIn
    setup_linkedin = input("\nSet up LinkedIn Lead Generator? (y/n): ").lower().strip()
    if setup_linkedin == 'y':
        setup_linkedin_credentials()
    
    # Setup Email
    setup_email = input("\nSet up Email Campaign Manager? (y/n): ").lower().strip()
    if setup_email == 'y':
        setup_email_credentials()
    
    # Test configurations
    test_configurations()
    
    print("\n🎉 Setup Complete!")
    print("=" * 50)
    print("Your automation tools are now configured.")
    print("You can start using them with the following commands:")
    print("\n📋 Available Commands:")
    print("  python automation-templates/web-scraper.py")
    print("  python automation-templates/linkedin-lead-generator.py")
    print("  python automation-templates/email-campaign-manager.py")
    print("\n📚 For more information, check the AUTOMATION_TESTING_GUIDE.md")

if __name__ == "__main__":
    main()
