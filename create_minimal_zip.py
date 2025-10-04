#!/usr/bin/env python3
"""
Create Minimal main-files.zip for ThemeForest
============================================

This script creates a very small main-files.zip with only
the essential source code files, excluding all large files.
"""

import zipfile
import os

def create_minimal_zip():
    """Create minimal main-files.zip with only essential files"""
    print("Creating minimal main-files.zip for ThemeForest...")
    print("Including only essential source code files...")
    
    # Only include essential source files
    essential_files = [
        # Client source code only
        'client/src/App.js',
        'client/src/index.js',
        'client/src/index.css',
        'client/package.json',
        'client/public/index.html',
        'client/public/favicon.svg',
        
        # Server files
        'server.js',
        'package.json',
        'requirements.txt',
        
        # Models
        'models/Automation.js',
        'models/Order.js',
        'models/User.js',
        
        # Routes
        'routes/auth.js',
        'routes/automation.js',
        'routes/leads.js',
        'routes/analytics.js',
        'routes/payments.js',
        'routes/orders.js',
        'routes/users.js',
        
        # Config
        'config/google-auth.js',
        'setup-database.js',
        
        # Essential automation templates (only Python files)
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
        'automation-templates/create_themeforest_images.py',
        'automation-templates/create_optimized_zip.py',
        'automation-templates/create_minimal_zip.py',
        'automation-templates/create_main_files_zip.py',
        
        # Demo data files
        'automation-templates/demo_clients.json',
        'automation-templates/demo_email_templates.json',
        'automation-templates/demo_environment_summary.json',
        'automation-templates/demo_leads_linkedin.csv',
        'automation-templates/demo_metrics.json',
        'automation-templates/demo_products_scraped.csv',
        'automation-templates/demo_scripts.json',
        'automation-templates/scraped_data.csv',
        'automation-templates/scraped_data.json',
        'automation-templates/scraped_data.xlsx',
        
        # Email templates
        'automation-templates/email-templates/success_story_template.html',
        'automation-templates/email-templates/welcome_email_template.html'
    ]
    
    total_files = 0
    total_size = 0
    
    # Create the ZIP file
    with zipfile.ZipFile('automation-templates/main-files-minimal.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file_path in essential_files:
            if os.path.exists(file_path):
                # Get relative path for ZIP
                arc_path = file_path.replace('\\', '/')
                
                # Add file to ZIP
                zipf.write(file_path, arc_path)
                total_files += 1
                file_size = os.path.getsize(file_path)
                total_size += file_size
                print(f"Added: {arc_path} ({file_size:,} bytes)")
            else:
                print(f"Warning: {file_path} not found, skipping...")
    
    print(f"\n✅ Minimal main-files.zip created successfully!")
    print(f"📊 Files added: {total_files}")
    print(f"📦 Total size: {total_size:,} bytes ({total_size/1024/1024:.1f} MB)")
    
    # Check final file size
    zip_size = os.path.getsize('automation-templates/main-files-minimal.zip')
    print(f"📦 ZIP file size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")
    
    if zip_size > 200 * 1024 * 1024:  # 200 MB
        print("⚠️  Warning: File is still larger than 200 MB")
    else:
        print("✅ File size is under 200 MB limit!")
        print("🎯 Ready for ThemeForest upload!")

if __name__ == "__main__":
    create_minimal_zip()















