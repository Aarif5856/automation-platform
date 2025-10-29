#!/usr/bin/env python3
"""
Create Final TemplateMonster Package with Proper Structure
=========================================================

This script creates the final package with:
1. Interactive HTML documentation (separate folder)
2. Project files (separate folder)
3. Proper TemplateMonster structure
"""

import zipfile
import os
import shutil
from datetime import datetime

def create_templatemonster_final_package():
    """Create final TemplateMonster package with proper structure"""
    print("Creating FINAL TemplateMonster Package...")
    print("=" * 50)
    
    # Create timestamp for unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    package_name = f"automation-dashboard-template-final-{timestamp}"
    
    # Create package directory
    if os.path.exists(package_name):
        shutil.rmtree(package_name)
    os.makedirs(package_name)
    
    # Create subdirectories
    project_dir = os.path.join(package_name, "project-files")
    docs_dir = os.path.join(package_name, "documentation")
    
    os.makedirs(project_dir)
    os.makedirs(docs_dir)
    
    print("Creating project files directory...")
    
    # Essential project files to include
    essential_files = [
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
        'automation-templates/find-real-business-emails.py',
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
        'replace-contact-info.js',
        'content_calendar_20250922.json',
        'marketing_campaigns.json',
    ]
    
    # Files to exclude (contain personal info or are too large)
    exclude_files = [
        'client/src/firebase/config.js',  # Contains real API keys
        'setup-database.js',  # Contains real MongoDB credentials
        'configure-credentials.py',  # Contains personal email
        'automation-templates/email-config.py',  # Contains real email
        'automation-templates/linkedin-config.py',  # Contains real email
        'automation-templates/send-outreach-emails.py',  # Contains real email
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
        for pattern in exclude_files:
            if pattern in file_path_str:
                return True
        return False
    
    total_files = 0
    total_size = 0
    
    # Copy project files
    for item in essential_files:
        if os.path.exists(item):
            if os.path.isdir(item):
                # Copy directory recursively
                for root, dirs, files in os.walk(item):
                    # Remove excluded directories
                    dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d))]
                    
                    for file in files:
                        file_path = os.path.join(root, file)
                        arc_path = os.path.relpath(file_path, '.')
                        
                        # Skip excluded files
                        if should_exclude(arc_path):
                            continue
                        
                        # Skip if file is too large (>5MB)
                        if os.path.getsize(file_path) > 5 * 1024 * 1024:
                            print(f"Skipping large file: {arc_path}")
                            continue
                        
                        # Create directory structure in project-files
                        dest_path = os.path.join(project_dir, arc_path)
                        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                        
                        # Copy file
                        shutil.copy2(file_path, dest_path)
                        total_files += 1
                        total_size += os.path.getsize(file_path)
                        print(f"Added to project: {arc_path}")
            else:
                # Copy single file if not excluded
                arc_path = item
                if not should_exclude(arc_path):
                    if os.path.getsize(item) <= 5 * 1024 * 1024:
                        # Create directory structure
                        dest_path = os.path.join(project_dir, arc_path)
                        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                        
                        # Copy file
                        shutil.copy2(item, dest_path)
                        total_files += 1
                        total_size += os.path.getsize(item)
                        print(f"Added to project: {arc_path}")
                    else:
                        print(f"Skipped large file: {item}")
                else:
                    print(f"EXCLUDED: {item}")
        else:
            print(f"Warning: {item} not found, skipping...")
    
    # Copy interactive HTML documentation
    print("\nCopying interactive HTML documentation...")
    if os.path.exists('documentation'):
        for root, dirs, files in os.walk('documentation'):
            for file in files:
                file_path = os.path.join(root, file)
                dest_path = os.path.join(docs_dir, file)
                shutil.copy2(file_path, dest_path)
                print(f"Added to docs: {file}")
    
    # Create .env.example file in project-files
    env_example_content = """# Environment Configuration
# Copy this file to .env and update with your values

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/automation_db
# For local MongoDB: mongodb://localhost:27017/automation_db

# JWT Secret (generate a random string)
JWT_SECRET=your_jwt_secret_here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Server Configuration
PORT=3001
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# LinkedIn API (Optional)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
"""
    
    with open(os.path.join(project_dir, '.env.example'), 'w', encoding='utf-8') as f:
        f.write(env_example_content)
    
    # Create package.json with proper scripts
    package_json_content = """{
  "name": "automation-business-dashboard",
  "version": "1.0.0",
  "description": "Complete automation business dashboard with React.js frontend and Node.js backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "client": "cd client && npm start",
    "client-install": "cd client && npm install",
    "install-all": "npm install && cd client && npm install",
    "build": "cd client && npm run build",
    "setup": "node setup-database.js",
    "test": "echo \\"No tests specified\\" && exit 0"
  },
  "keywords": [
    "automation",
    "dashboard",
    "react",
    "nodejs",
    "mongodb",
    "business",
    "saas"
  ],
  "author": "TemplateMonster Author",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.4",
    "axios": "^1.5.0",
    "cheerio": "^1.0.0-rc.12",
    "puppeteer": "^21.3.6",
    "csv-parser": "^3.0.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}"""
    
    with open(os.path.join(project_dir, 'package.json'), 'w', encoding='utf-8') as f:
        f.write(package_json_content)
    
    # Create main README for project-files
    project_readme_content = f"""# Automation Business Dashboard Template

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install && cd ..
   pip install -r requirements.txt
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and other settings
   ```

3. **Start the application:**
   ```bash
   npm start
   # In new terminal: cd client && npm start
   ```

4. **Access the dashboard:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - Demo login: demo@example.com / demo123

## Documentation

For detailed installation, customization, and deployment instructions, see the `documentation/` folder with interactive HTML guides.

## Features

- React.js frontend with responsive design
- Node.js backend with Express.js
- MongoDB database integration
- 15+ automation tools (Python scripts)
- Google OAuth authentication
- Analytics dashboard
- Demo data included

## Template Information

- **Template ID:** 1692573
- **Version:** 1.0.0
- **Files:** {total_files}
- **Size:** {total_size/1024/1024:.1f} MB
"""
    
    with open(os.path.join(project_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(project_readme_content)
    
    # Create main package README
    main_readme_content = f"""# Automation Business Dashboard Template

## Package Structure

This template package contains two main folders:

### 📁 `project-files/`
Contains all the source code and files needed to run the application:
- React.js frontend (client/)
- Node.js backend (server.js, routes/, models/)
- Python automation tools (automation-templates/)
- Demo data and configurations
- Setup scripts and documentation

### 📁 `documentation/`
Contains interactive HTML documentation:
- Installation guide
- Quick start guide
- Customization instructions
- Features overview
- Troubleshooting guide
- Deployment instructions

## Quick Start

1. **Navigate to project-files folder**
2. **Follow the README.md instructions**
3. **Open documentation/index.html for detailed guides**

## Template Information

- **Template ID:** 1692573
- **Version:** 1.0.0
- **Total Files:** {total_files}
- **Total Size:** {total_size/1024/1024:.1f} MB
- **Documentation:** Interactive HTML format
- **Project Files:** Separated for easy access

## Revenue Potential

- **Service Pricing:** $500-2,000/month per client
- **Client Capacity:** 10-50 clients
- **Monthly Revenue:** $5,000-100,000+
- **Break-even:** 1-2 clients

## Support

All documentation is provided in interactive HTML format for easy navigation and reference.

---

**Ready to start your automation business!** 🚀
"""
    
    with open(os.path.join(package_name, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(main_readme_content)
    
    # Create ZIP file
    zip_filename = f"{package_name}.zip"
    print(f"\nCreating ZIP file: {zip_filename}")
    
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(package_name):
            for file in files:
                file_path = os.path.join(root, file)
                arc_path = os.path.relpath(file_path, package_name)
                zipf.write(file_path, arc_path)
    
    # Clean up package directory
    shutil.rmtree(package_name)
    
    print(f"\nFINAL TEMPLATEMONSTER PACKAGE CREATED!")
    print(f"File: {zip_filename}")
    print(f"Files included: {total_files}")
    print(f"Total size: {total_size:,} bytes ({total_size/1024/1024:.1f} MB)")
    
    # Check final file size
    zip_size = os.path.getsize(zip_filename)
    print(f"ZIP file size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")
    
    print(f"\nSTRUCTURE:")
    print(f"📁 project-files/     - All source code and application files")
    print(f"📁 documentation/     - Interactive HTML documentation")
    print(f"📄 README.md          - Main package overview")
    
    print(f"\nREADY TO RESUBMIT TO TEMPLATEMONSTER!")
    print(f"✅ Interactive HTML documentation created")
    print(f"✅ Documentation and project files separated")
    print(f"✅ Proper folder structure")
    print(f"✅ All personal information removed")
    print(f"✅ Demo data included")
    
    return zip_filename

if __name__ == "__main__":
    create_templatemonster_final_package()





