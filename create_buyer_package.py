#!/usr/bin/env python3
"""
Create Complete Buyer Package for Flippa Sale
=============================================

This script creates a comprehensive buyer package with all necessary files
for the automation platform sale on Flippa.
"""

import zipfile
import os
from datetime import datetime

def create_buyer_package():
    """Create complete buyer package zip file"""
    print("Creating Complete Buyer Package for Flippa Sale...")
    print("=" * 60)
    
    # Create timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_filename = f"COMPLETE_AUTOMATION_PLATFORM_BUYER_PACKAGE_{timestamp}.zip"
    
    # Essential files and directories to include
    essential_items = [
        # Core application files
        'client/src',
        'client/public',
        'client/package.json',
        'client/package-lock.json',
        'server.js',
        'package.json',
        'package-lock.json',
        'requirements.txt',
        'requirements_updated.txt',
        
        # Backend structure
        'models',
        'routes',
        'config',
        'setup-database.js',
        
        # Automation templates (core files only)
        'automation-templates/linkedin-lead-generator.py',
        'automation-templates/email-campaign-manager.py',
        'automation-templates/web-scraper.py',
        'automation-templates/marketing-automation-suite.py',
        'automation-templates/quick-lead-generation.py',
        'automation-templates/immediate-lead-generation.py',
        'automation-templates/free-demo-system.py',
        'automation-templates/analytics-dashboard.py',
        'automation-templates/crm-integration-system.py',
        'automation-templates/authority-content-creator.py',
        'automation-templates/compliance-manager.py',
        'automation-templates/security-manager.py',
        'automation-templates/social-proof-generator.py',
        'automation-templates/proof-generation-system.py',
        'automation-templates/email-deliverability.py',
        'automation-templates/email-config.py',
        'automation-templates/linkedin-config.py',
        'automation-templates/find-real-business-emails.py',
        'automation-templates/send-outreach-emails.py',
        'automation-templates/generate-own-leads.py',
        'automation-templates/prepare-demo-environment.py',
        'automation-templates/demo-automation-tools.py',
        'automation-templates/visual_demo_script.py',
        
        # Demo data and configurations
        'demo_automation_summary.json',
        'demo_credentials.json',
        'demo-config.js',
        'demo-config.json',
        'demo-setup.js',
        'deploy-demo.js',
        'start-demo.js',
        
        # Documentation files
        'README.md',
        'DEMO_README.md',
        'QUICK_START_VISUAL_GUIDE.md',
        'SIMPLE_MANUAL_GUIDE.md',
        'ONLINE_DEMO_SETUP_GUIDE.md',
        'DEPLOYMENT_CHECKLIST.md',
        'DEPLOYMENT_SUCCESS.md',
        'DEMO_MODE_FINAL_FIX.md',
        'LOGIN_CREDENTIALS_FIX.md',
        'FIX_VENV_ISSUE.md',
        'TECHNICAL_OPTIMIZATION_REPORT.md',
        'TOOLS_STATUS_REPORT.md',
        'TEST_RESULTS_SUMMARY.txt',
        
        # Business and sales materials
        'BUYER_DELIVERY_SUMMARY.md',
        'BUYER_ONE_PAGER.md',
        'BUYER_QUICK_START.md',
        'COMPLETE_PACKAGE_OVERVIEW.md',
        'AUTOMATION_FEATURES_HIGHLIGHT.md',
        'AUTOMATION_DEMO_RESULTS.md',
        'WHY_BUYERS_SHOULD_CHOOSE_YOU.md',
        'RECURRING_REVENUE_PACKAGES.md',
        'SEO_MONETIZATION_GUIDE.md',
        'ZAPIER_AFFILIATE_GUIDE.md',
        'GOOGLE_ANALYTICS_SETUP.md',
        
        # Case studies
        'case_study_e-commerce_plus_20250922.md',
        'case_study_growthco_agency_20250922.md',
        'case_study_techstart_inc._20250922.md',
        
        # Demo data files
        'demo_linkedin_leads_20251011_113324.csv',
        'demo_linkedin_leads_20251011_113324.json',
        'demo_scraped_products_20251011_113324.csv',
        'demo_scraped_products_20251011_113324.json',
        'scraped_data.csv',
        'scraped_data.json',
        'scraped_data.xlsx',
        
        # Email templates
        'automation-templates/email-templates',
        
        # Demo scripts and automation
        'demo-automation-tools.py',
        'start-automation-tools.bat',
        'start-dashboard.bat',
        'email-campaign.bat',
        'linkedin-automation.bat',
        'web-scraper.bat',
        'test-all-tools.bat',
        'OPEN_SAMPLE_RESULTS.bat',
        
        # Configuration files
        'configure-credentials.py',
        'replace-contact-info.js',
        'content_calendar_20250922.json',
        'marketing_campaigns.json',
    ]
    
    # Files to exclude (large or unnecessary)
    exclude_patterns = [
        'node_modules',
        '.git',
        '__pycache__',
        '.pytest_cache',
        '*.pyc',
        '*.pyo',
        '*.log',
        '.DS_Store',
        'Thumbs.db',
        'build',
        'dist',
        '.env',
        '*.db',
        'backup_',
        'codester-files',
        'demo_data',
        'demo_video',
        'generated_content',
        'pdf_manual',
        'sales_materials',
        'scripts',
        'documentation',
        '*.bat',
        '*.ps1',
        '*.png',
        '*.jpg',
        '*.jpeg',
        '*.gif',
        '*.svg',
        '*.ico',
        '*.zip',
        '*.rar',
        '*.7z',
        'templatemonster-package-',
        'automation_business_sale_package_',
        'automation-business-dashboard-template-',
        'main-files-zip.zip',
        'COMPLETE_AUTOMATION_BUSINESS_',
        'automation-templates/create_',
        'automation-templates/demo_',
        'automation-templates/scraped_data.',
        'automation-templates/demo_automation_summary.json',
        'automation-templates/demo_credentials.json',
        'automation-templates/demo_clients.json',
        'automation-templates/demo_email_templates.json',
        'automation-templates/demo_environment_summary.json',
        'automation-templates/demo_leads_linkedin.csv',
        'automation-templates/demo_metrics.json',
        'automation-templates/demo_products_scraped.csv',
        'automation-templates/demo_scripts.json',
    ]
    
    def should_exclude(file_path):
        """Check if file should be excluded"""
        file_path_str = str(file_path).replace('\\', '/')
        for pattern in exclude_patterns:
            if pattern in file_path_str:
                return True
        return False
    
    total_files = 0
    total_size = 0
    
    print("Creating ZIP file...")
    
    # Create the ZIP file
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in essential_items:
            if os.path.exists(item):
                if os.path.isdir(item):
                    # Add directory recursively
                    for root, dirs, files in os.walk(item):
                        # Remove excluded directories
                        dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d))]
                        
                        for file in files:
                            file_path = os.path.join(root, file)
                            
                            # Skip if file should be excluded
                            if should_exclude(file_path):
                                continue
                                
                            # Skip if file is too large (>5MB)
                            if os.path.getsize(file_path) > 5 * 1024 * 1024:
                                print(f"Skipping large file: {file_path}")
                                continue
                            
                            arc_path = os.path.relpath(file_path, '.')
                            zipf.write(file_path, arc_path)
                            total_files += 1
                            total_size += os.path.getsize(file_path)
                            print(f"Added: {arc_path}")
                else:
                    # Add single file if not excluded
                    if not should_exclude(item) and os.path.getsize(item) <= 5 * 1024 * 1024:
                        zipf.write(item, item)
                        total_files += 1
                        total_size += os.path.getsize(item)
                        print(f"Added: {item}")
                    else:
                        print(f"Skipped: {item}")
            else:
                print(f"Warning: {item} not found, skipping...")
    
    # Create README for the package
    readme_content = f"""# 🚀 Complete Automation Platform - Buyer Package

## 📦 What's Included

This package contains everything you need to run and customize the Complete Automation Platform:

### 🎯 Core Application
- **Frontend:** React.js application (client/src/)
- **Backend:** Node.js server with Express (server.js)
- **Database:** MongoDB integration (models/, setup-database.js)
- **Authentication:** Google OAuth integration (config/)

### 🤖 Automation Tools
- LinkedIn Lead Generator
- Email Campaign Manager  
- Web Scraper
- Analytics Dashboard
- CRM Integration System
- And 10+ more automation tools

### 📚 Documentation
- Complete setup guide (README.md)
- Quick start guide (QUICK_START_VISUAL_GUIDE.md)
- Demo setup instructions (DEMO_README.md)
- Technical documentation (TECHNICAL_OPTIMIZATION_REPORT.md)

### 💼 Business Materials
- Revenue projections and case studies
- Marketing templates and strategies
- SEO optimization guides
- Monetization strategies

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

2. **Setup Database:**
   ```bash
   node setup-database.js
   ```

3. **Configure Environment:**
   - Copy demo-config.json to your config
   - Update API keys and credentials

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Access Demo:**
   - URL: http://localhost:3000
   - Login: demo@automation-suite.com
   - Password: demo123

## 📞 Support

- **30 days included support** via email
- **Complete documentation** for all features
- **Demo data** to test all functionality
- **Business materials** for immediate monetization

## 💰 Value Breakdown

- **Development Cost:** $30,000+
- **Your Investment:** $500-1,999
- **ROI:** Break even with first 1-2 clients
- **Monthly Potential:** $5,000-25,000+

## 🎯 Next Steps

1. Review the documentation
2. Set up the demo environment
3. Test all automation tools
4. Customize for your business
5. Start acquiring clients

**Package Created:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
**Total Files:** {total_files}
**Total Size:** {total_size/1024/1024:.1f} MB

---

**Ready to automate your business? Let's get started! 🚀**
"""
    
    # Add README to the ZIP
    with zipfile.ZipFile(zip_filename, 'a', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr("BUYER_PACKAGE_README.md", readme_content)
    
    print(f"\nBUYER PACKAGE CREATED SUCCESSFULLY!")
    print(f"File: {zip_filename}")
    print(f"Files included: {total_files}")
    print(f"Total size: {total_size:,} bytes ({total_size/1024/1024:.1f} MB)")
    
    # Check final file size
    zip_size = os.path.getsize(zip_filename)
    print(f"ZIP file size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")
    
    if zip_size > 100 * 1024 * 1024:  # 100 MB
        print("Warning: File is larger than 100 MB")
    else:
        print("File size is reasonable for email delivery!")
    
    print(f"\nREADY TO SEND TO BUYERS!")
    print(f"Attach this file to your Flippa messages")
    print(f"File location: {os.path.abspath(zip_filename)}")
    
    return zip_filename

if __name__ == "__main__":
    create_buyer_package()
