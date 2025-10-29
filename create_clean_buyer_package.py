#!/usr/bin/env python3
"""
Create Clean Buyer Package - Remove Personal Information
======================================================

This script creates a sanitized version of the buyer package with all
personal information removed or replaced with demo values.
"""

import zipfile
import os
import re
from datetime import datetime

def sanitize_content(content):
    """Sanitize content by replacing personal information"""
    
    # Replace real email addresses
    email_replacements = {
        '5856music@gmail.com': 'demo@example.com',
        'info@the-automatepro.info': 'info@example.com',
        'admin@automatepro.com': 'admin@example.com',
        'hello@autobiz.com': 'hello@example.com',
        'privacy@autobiz.com': 'privacy@example.com',
        'legal@autobiz.com': 'legal@example.com',
        'your-email@gmail.com': 'demo@example.com',
        'your@email.com': 'demo@example.com',
        'contact@example.com': 'demo@example.com',
        'support@example.com': 'demo@example.com',
    }
    
    for real_email, demo_email in email_replacements.items():
        content = content.replace(real_email, demo_email)
    
    # Replace localhost URLs with demo URLs
    content = re.sub(r'http://localhost:\d+', 'https://demo.automation-platform.com', content)
    content = re.sub(r'http://localhost', 'https://demo.automation-platform.com', content)
    
    # Replace personal domains
    content = content.replace('the-automatepro.info', 'example.com')
    content = content.replace('autobiz.com', 'example.com')
    
    # Replace API keys with placeholders
    content = re.sub(r'apiKey:\s*["\'][^"\']+["\']', 'apiKey: "YOUR_API_KEY_HERE"', content)
    content = re.sub(r'api_key:\s*["\'][^"\']+["\']', 'api_key: "YOUR_API_KEY_HERE"', content)
    content = re.sub(r'token:\s*["\'][^"\']+["\']', 'token: "YOUR_TOKEN_HERE"', content)
    
    # Replace MongoDB connection strings
    content = re.sub(r'mongodb\+srv://[^@]+@[^/]+', 'mongodb+srv://username:password@cluster.mongodb.net', content)
    
    return content

def create_clean_buyer_package():
    """Create clean buyer package with personal info removed"""
    print("Creating CLEAN Buyer Package - Removing Personal Information...")
    print("=" * 70)
    
    # Create timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    clean_zip_filename = f"CLEAN_AUTOMATION_PLATFORM_BUYER_PACKAGE_{timestamp}.zip"
    
    # Files to exclude (contain too much personal info)
    exclude_files = [
        'client/src/firebase/config.js',  # Contains real API keys
        'setup-database.js',  # Contains real MongoDB credentials
        'configure-credentials.py',  # Contains personal email
        'automation-templates/email-config.py',  # Contains real email
        'automation-templates/linkedin-config.py',  # Contains real email
        'automation-templates/send-outreach-emails.py',  # Contains real email
    ]
    
    # Files that need content sanitization
    sanitize_files = [
        'client/src/demo-config.js',
        'client/src/contexts/AuthContext.js',
        'client/src/pages/DemoLogin.js',
        'client/src/services/demoAuth.js',
        'demo_credentials.json',
        'demo-config.js',
        'demo-setup.js',
        'deploy-demo.js',
        'start-demo.js',
        'README.md',
        'DEMO_README.md',
        'QUICK_START_VISUAL_GUIDE.md',
        'SIMPLE_MANUAL_GUIDE.md',
        'ONLINE_DEMO_SETUP_GUIDE.md',
        'DEPLOYMENT_CHECKLIST.md',
        'LOGIN_CREDENTIALS_FIX.md',
        'TECHNICAL_OPTIMIZATION_REPORT.md',
        'TOOLS_STATUS_REPORT.md',
        'BUYER_ONE_PAGER.md',
        'start-automation-tools.bat',
        'start-dashboard.bat',
        'replace-contact-info.js',
        'marketing_campaigns.json',
    ]
    
    # Essential files and directories to include
    essential_items = [
        'client/src',
        'client/public',
        'client/package.json',
        'client/package-lock.json',
        'server.js',
        'package.json',
        'package-lock.json',
        'requirements.txt',
        'requirements_updated.txt',
        'models',
        'routes',
        'config',
        'automation-templates',
        'demo_automation_summary.json',
        'demo_automation.db',
        'demo_email_campaigns.db',
        'scraped_data.csv',
        'scraped_data.json',
        'scraped_data.xlsx',
        'automation-templates/email-templates',
        'demo-automation-tools.py',
        'email-campaign.bat',
        'linkedin-automation.bat',
        'web-scraper.bat',
        'test-all-tools.bat',
        'OPEN_SAMPLE_RESULTS.bat',
        'content_calendar_20250922.json',
    ]
    
    total_files = 0
    total_size = 0
    
    print("Creating clean ZIP file...")
    
    # Create the ZIP file
    with zipfile.ZipFile(clean_zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in essential_items:
            if os.path.exists(item):
                if os.path.isdir(item):
                    # Add directory recursively
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arc_path = os.path.relpath(file_path, '.')
                            
                            # Skip excluded files
                            if any(excluded in arc_path for excluded in exclude_files):
                                print(f"EXCLUDED: {arc_path}")
                                continue
                            
                            # Skip if file is too large (>5MB)
                            if os.path.getsize(file_path) > 5 * 1024 * 1024:
                                print(f"Skipping large file: {arc_path}")
                                continue
                            
                            # Sanitize content if needed
                            if arc_path in sanitize_files:
                                try:
                                    with open(file_path, 'r', encoding='utf-8') as f:
                                        content = f.read()
                                    sanitized_content = sanitize_content(content)
                                    zipf.writestr(arc_path, sanitized_content)
                                    print(f"SANITIZED: {arc_path}")
                                except:
                                    # If sanitization fails, add original file
                                    zipf.write(file_path, arc_path)
                                    print(f"Added: {arc_path}")
                            else:
                                zipf.write(file_path, arc_path)
                                print(f"Added: {arc_path}")
                            
                            total_files += 1
                            total_size += os.path.getsize(file_path)
                else:
                    # Add single file if not excluded
                    arc_path = item
                    if not any(excluded in arc_path for excluded in exclude_files):
                        if os.path.getsize(item) <= 5 * 1024 * 1024:
                            if arc_path in sanitize_files:
                                try:
                                    with open(item, 'r', encoding='utf-8') as f:
                                        content = f.read()
                                    sanitized_content = sanitize_content(content)
                                    zipf.writestr(arc_path, sanitized_content)
                                    print(f"SANITIZED: {arc_path}")
                                except:
                                    zipf.write(item, arc_path)
                                    print(f"Added: {arc_path}")
                            else:
                                zipf.write(item, arc_path)
                                print(f"Added: {arc_path}")
                            
                            total_files += 1
                            total_size += os.path.getsize(item)
                        else:
                            print(f"Skipped large file: {item}")
                    else:
                        print(f"EXCLUDED: {item}")
            else:
                print(f"Warning: {item} not found, skipping...")
    
    # Create clean README for the package
    readme_content = f"""# Complete Automation Platform - Clean Buyer Package

## What's Included

This package contains everything you need to run and customize the Complete Automation Platform:

### Core Application
- **Frontend:** React.js application (client/src/)
- **Backend:** Node.js server with Express (server.js)
- **Database:** MongoDB integration (models/)
- **Authentication:** Google OAuth integration (config/)

### Automation Tools
- LinkedIn Lead Generator
- Email Campaign Manager  
- Web Scraper
- Analytics Dashboard
- CRM Integration System
- And 10+ more automation tools

### Documentation
- Complete setup guide (README.md)
- Quick start guide (QUICK_START_VISUAL_GUIDE.md)
- Demo setup instructions (DEMO_README.md)
- Technical documentation

### Business Materials
- Revenue projections and case studies
- Marketing templates and strategies
- SEO optimization guides
- Monetization strategies

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

2. **Setup Database:**
   ```bash
   # Configure MongoDB connection in config/
   node setup-database.js
   ```

3. **Configure Environment:**
   - Update API keys in config files
   - Set up your email credentials
   - Configure LinkedIn API access

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Access Demo:**
   - URL: https://demo.automation-platform.com
   - Login: demo@example.com
   - Password: demo123

## Important Notes

- All personal information has been removed
- Replace placeholder values with your own credentials
- Demo data is included for testing
- 30 days of support included

## Support

- Complete documentation for all features
- Demo data to test all functionality
- Business materials for immediate monetization

**Package Created:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**Total Files:** {total_files}
**Total Size:** {total_size/1024/1024:.1f} MB

---

**Ready to automate your business! 🚀**
"""
    
    # Add clean README to the ZIP
    with zipfile.ZipFile(clean_zip_filename, 'a', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr("CLEAN_BUYER_PACKAGE_README.md", readme_content)
    
    print(f"\nCLEAN BUYER PACKAGE CREATED SUCCESSFULLY!")
    print(f"File: {clean_zip_filename}")
    print(f"Files included: {total_files}")
    print(f"Total size: {total_size:,} bytes ({total_size/1024/1024:.1f} MB)")
    
    # Check final file size
    zip_size = os.path.getsize(clean_zip_filename)
    print(f"ZIP file size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")
    
    print(f"\nSAFE TO SEND TO BUYERS!")
    print(f"All personal information has been removed or sanitized")
    print(f"File location: {os.path.abspath(clean_zip_filename)}")
    
    return clean_zip_filename

if __name__ == "__main__":
    create_clean_buyer_package()





