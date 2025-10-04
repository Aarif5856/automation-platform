#!/usr/bin/env python3
"""
Quick Credential Configuration Script
====================================

This script helps you quickly configure your LinkedIn and email credentials
for the automation tools.
"""

import os
import getpass
from datetime import datetime

def update_linkedin_config():
    """Update LinkedIn configuration with user credentials"""
    print("\n🔗 LinkedIn Lead Generator Configuration")
    print("=" * 50)
    print("IMPORTANT: Use a dedicated LinkedIn account for automation!")
    print("This helps avoid any issues with your personal account.\n")
    
    email = input("LinkedIn Email: ").strip()
    password = getpass.getpass("LinkedIn Password: ")
    
    if not email or not password:
        print("❌ Both email and password are required!")
        return False
    
    # Read the current config file
    config_path = 'automation-templates/linkedin-config.py'
    with open(config_path, 'r') as f:
        content = f.read()
    
    # Replace the placeholder credentials
    content = content.replace('LINKEDIN_EMAIL = "your-linkedin-email@example.com"', 
                             f'LINKEDIN_EMAIL = "{email}"')
    content = content.replace('LINKEDIN_PASSWORD = "your-linkedin-password"', 
                             f'LINKEDIN_PASSWORD = "{password}"')
    
    # Update the timestamp
    content = content.replace('Updated on: 2025-01-27 10:30:00', 
                             f'Updated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    
    # Write the updated config
    with open(config_path, 'w') as f:
        f.write(content)
    
    print("✅ LinkedIn credentials updated successfully!")
    return True

def update_email_config():
    """Update email configuration with user credentials"""
    print("\n📧 Email Campaign Manager Configuration")
    print("=" * 50)
    print("For Gmail: Use an App Password, not your regular password!")
    print("Get App Password: Google Account > Security > 2-Step Verification > App passwords\n")
    
    email = input("Email Address: ").strip()
    password = getpass.getpass("Email Password (or App Password): ")
    
    if not email or not password:
        print("❌ Both email and password are required!")
        return False
    
    # Read the current config file
    config_path = 'automation-templates/email-config.py'
    with open(config_path, 'r') as f:
        content = f.read()
    
    # Replace the placeholder credentials
    content = content.replace("'email': 'your-email@gmail.com',", 
                             f"'email': '{email}',")
    content = content.replace("'password': 'your-app-password',", 
                             f"'password': '{password}',")
    
    # Update the timestamp
    content = content.replace('Updated on: 2025-01-27 10:30:00', 
                             f'Updated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    
    # Write the updated config
    with open(config_path, 'w') as f:
        f.write(content)
    
    print("✅ Email credentials updated successfully!")
    return True

def test_configurations():
    """Test if the configurations are working"""
    print("\n🧪 Testing Configurations")
    print("=" * 50)
    
    # Test LinkedIn config
    try:
        import sys
        sys.path.append('automation-templates')
        from linkedin_config import LINKEDIN_EMAIL, LINKEDIN_PASSWORD
        
        if LINKEDIN_EMAIL and LINKEDIN_PASSWORD and LINKEDIN_EMAIL != "your-linkedin-email@example.com":
            print("✅ LinkedIn credentials configured")
        else:
            print("❌ LinkedIn credentials not configured")
    except Exception as e:
        print(f"❌ LinkedIn config error: {e}")
    
    # Test Email config
    try:
        from email_config import SMTP_CONFIG
        
        if (SMTP_CONFIG['email'] and SMTP_CONFIG['password'] and 
            SMTP_CONFIG['email'] != "your-email@gmail.com"):
            print("✅ Email credentials configured")
        else:
            print("❌ Email credentials not configured")
    except Exception as e:
        print(f"❌ Email config error: {e}")

def main():
    """Main configuration function"""
    print("🚀 Automation Tools Credential Configuration")
    print("=" * 60)
    print("This script will help you configure your automation tools.")
    print("You can skip any step by pressing Enter without entering anything.\n")
    
    # Ensure automation-templates directory exists
    os.makedirs('automation-templates', exist_ok=True)
    
    # Configure LinkedIn
    print("1. LinkedIn Lead Generator Setup")
    setup_linkedin = input("Configure LinkedIn credentials? (y/n): ").lower().strip()
    if setup_linkedin == 'y':
        update_linkedin_config()
    
    # Configure Email
    print("\n2. Email Campaign Manager Setup")
    setup_email = input("Configure email credentials? (y/n): ").lower().strip()
    if setup_email == 'y':
        update_email_config()
    
    # Test configurations
    test_configurations()
    
    print("\n🎉 Configuration Complete!")
    print("=" * 50)
    print("Your automation tools are now configured.")
    print("\n📋 Next Steps:")
    print("1. Test your tools: python test-automation-tools.py")
    print("2. Start using LinkedIn scraper: python automation-templates/linkedin-lead-generator.py")
    print("3. Start using email campaigns: python automation-templates/email-campaign-manager.py")
    print("\n📚 For more information, check the AUTOMATION_TESTING_GUIDE.md")

if __name__ == "__main__":
    main()
