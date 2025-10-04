"""
AUTOMATION BUSINESS - SALE PACKAGE PREPARATION SCRIPT (Simplified)
This script prepares all files for sale delivery without emoji characters
"""

import os
import shutil
import zipfile
from datetime import datetime

# Files and folders to EXCLUDE from sale package
EXCLUDE_FILES = [
    'node_modules',
    'client/node_modules',
    '__pycache__',
    '*.pyc',
    '.git',
    '.gitignore',
    '.env',
    '.DS_Store',
    'backup_20250917_112929',
    'codester-files',
    'main-files-zip.zip',
    'demo_automation.db',
    'demo_email_campaigns.db',
    'demo_linkedin_leads_*.csv',
    'demo_linkedin_leads_*.json',
    'demo_scraped_products_*.csv',
    'demo_scraped_products_*.json',
    'demo_automation_summary.json',
    'automation_analytics.db',
    'email_campaigns.db',
    'client/build',
    'cleanup_duplicates.py',
    'create_main_files_zip.py',
    'create_minimal_zip.py',
    'create_optimized_zip.py',
    'prepare_sale_package.py',
    'prepare_package_simple.py',
    'MARKETPLACE_LISTINGS.md',
    'FAST_SALE_STRATEGY.md',
    'IMMEDIATE_ACTION_PLAN.md',
    'PROJECT_CLEANUP_PLAN.md',
    'PROJECT_CLEANUP_COMPLETE.md',
    'CLEANUP_SUMMARY.md',
    'FILE_LOCATIONS_GUIDE.md',
    'FIXES_APPLIED.md',
    'ONLINE_DEMO_SETUP_GUIDE.md',
]

def create_sale_package():
    """Create organized sale package with all necessary files"""
    
    print("=" * 60)
    print("AUTOMATION BUSINESS - SALE PACKAGE PREPARATION")
    print("=" * 60)
    print()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    package_name = f"automation_business_sale_package_{timestamp}"
    
    # Create main package directory
    package_dir = os.path.join(os.getcwd(), package_name)
    os.makedirs(package_dir, exist_ok=True)
    
    print(f"Created package directory: {package_name}")
    print()
    
    # Copy core files
    core_files = [
        'server.js',
        'package.json',
        'package-lock.json',
        'requirements.txt',
        'setup-database.js',
    ]
    
    for file in core_files:
        if os.path.exists(file):
            shutil.copy2(file, os.path.join(package_dir, file))
            print(f"  Copied: {file}")
    
    # Copy directories
    directories_to_copy = [
        'routes',
        'models',
        'config',
        'automation-templates',
        'scripts',
        'documentation',
        'sales_materials',
        'generated_content',
        'demo_video',
        'pdf_manual',
        'demo_data'
    ]
    
    for dir_name in directories_to_copy:
        if os.path.exists(dir_name):
            dest_dir = os.path.join(package_dir, dir_name)
            shutil.copytree(
                dir_name, 
                dest_dir, 
                ignore=shutil.ignore_patterns(
                    'node_modules', 
                    '__pycache__', 
                    '*.pyc', 
                    'build',
                    '.git'
                ),
                dirs_exist_ok=True
            )
            print(f"  Copied directory: {dir_name}")
    
    # Copy client folder (excluding node_modules and build)
    if os.path.exists('client'):
        client_dest = os.path.join(package_dir, 'client')
        shutil.copytree(
            'client', 
            client_dest, 
            ignore=shutil.ignore_patterns(
                'node_modules', 
                'build',
                '__pycache__', 
                '*.pyc'
            ),
            dirs_exist_ok=True
        )
        print(f"  Copied directory: client")
    
    # Copy batch files
    batch_files = [
        'start-dashboard.bat',
        'start-automation-tools.bat',
        'run_demo_tools.bat',
        'linkedin-automation.bat',
        'email-campaign.bat',
        'web-scraper.bat',
    ]
    
    for file in batch_files:
        if os.path.exists(file):
            shutil.copy2(file, os.path.join(package_dir, file))
            print(f"  Copied: {file}")
    
    # Copy documentation files
    doc_files = [
        'DEMO_README.md',
        'PROJECT_SALE_PACKAGE.md',
        'RECURRING_REVENUE_PACKAGES.md',
        'AUTOMATION_FEATURES_HIGHLIGHT.md',
        'AUTOMATION_DEMO_RESULTS.md',
        'DEMO_VIDEO_MASTER_SCRIPT.md',
        'DEMO_VIDEO_SCRIPT.md',
        'DEMO_VIDEO_SCRIPTS.md',
        'SCREEN_RECORDING_GUIDE.md',
        'SILENT_DEMO_GUIDE.md',
        'SILENT_DEMO_SCRIPT.md',
        'SIMPLE_MANUAL_GUIDE.md',
        'QUICK_START_VISUAL_GUIDE.md',
        'IMMEDIATE_LEVEL_UP_COMPLETE.md',
        'marketing_campaigns.json',
        'content_calendar_20250922.json',
    ]
    
    for file in doc_files:
        if os.path.exists(file):
            shutil.copy2(file, os.path.join(package_dir, file))
            print(f"  Copied: {file}")
    
    # Copy demo setup files
    demo_files = [
        'demo-config.json',
        'demo-config.js',
        'demo-setup.js',
        'deploy-demo.js',
        'start-demo.js',
        'demo-automation-tools.py',
        'configure-credentials.py',
    ]
    
    for file in demo_files:
        if os.path.exists(file):
            shutil.copy2(file, os.path.join(package_dir, file))
            print(f"  Copied: {file}")
    
    # Copy case studies
    import glob
    case_studies = glob.glob('case_study_*.md')
    for file in case_studies:
        shutil.copy2(file, os.path.join(package_dir, file))
        print(f"  Copied: {file}")
    
    # Create README for the package
    create_package_readme(package_dir)
    
    # Create .env.example file
    create_env_example(package_dir)
    
    # Create setup instructions
    create_setup_instructions(package_dir)
    
    print("=" * 60)
    print("PACKAGE PREPARATION COMPLETE!")
    print(f"Package location: {package_dir}")
    print("=" * 60)
    print()
    
    return package_dir

def create_package_readme(package_dir):
    """Create main README for the sale package"""
    
    readme_content = """# AUTOMATION BUSINESS - COMPLETE SAAS PLATFORM

## PACKAGE CONTENTS

This package contains the complete Automation Business SaaS Platform - a professional, revenue-ready system.

### What's Included:

**CORE APPLICATION:**
- Complete React.js frontend application
- Node.js/Express backend server
- MongoDB database integration
- User authentication and management
- Payment integration (Stripe & PayPal)

**AUTOMATION TOOLS:**
- LinkedIn Lead Generator (500+ leads/day)
- Email Marketing Automation System
- Web Scraper for data extraction
- CRM Integration (HubSpot, Airtable, Notion)

**BUSINESS MATERIALS:**
- Complete documentation
- Sales materials and case studies
- Marketing content and social media posts
- Demo video scripts
- Business strategy guides

**REVENUE MODELS:**
- Subscription tiers: $97-$997/month
- One-time projects: $197-$997
- White-label licensing: $5,000-$25,000
- Consulting services: $150-$300/hour

---

## QUICK START

### 1. Install Dependencies:

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

**Python Tools:**
```bash
pip install -r requirements.txt
```

### 2. Configure Environment:

- Copy `.env.example` to `.env`
- Add your API keys and credentials
- Configure MongoDB connection
- Set up Stripe and PayPal keys

### 3. Start the Application:

**Backend Server:**
```bash
npm start
```

**Frontend (in new terminal):**
```bash
cd client
npm start
```

**Access:**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

---

## DOCUMENTATION

Detailed documentation is available in the `DOCUMENTATION` folder:

- **DEMO_README.md** - Quick start guide
- **TECHNICAL_SETUP_COMPLETE.md** - Technical setup
- **MANUAL_OPERATION_GUIDE.md** - User manual
- **TERMINAL_COMMANDS_GUIDE.md** - Command reference

---

## REVENUE POTENTIAL

**Expected Annual Revenue:** $30,000 - $100,000+

**Revenue Streams:**
1. Monthly subscriptions ($97-$997/month)
2. One-time automation projects
3. White-label licensing
4. Consulting and training services

---

## TARGET CUSTOMERS

- Marketing agencies
- Real estate professionals
- Insurance brokers
- E-commerce businesses
- Consultants and coaches
- Service providers

---

## TECHNICAL STACK

**Frontend:**
- React.js 18.2
- Chakra UI
- React Router
- Chart.js
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Socket.io

**Payment Processing:**
- Stripe
- PayPal

**Automation:**
- Python 3.x
- Selenium
- BeautifulSoup
- Pandas

---

## SUPPORT

For technical support or questions about this package, please refer to:
- Documentation folder
- Setup instructions
- Technical guides

---

## LICENSE

This software is provided as-is with full ownership transferred upon purchase.
You have the right to use, modify, and resell this software.

---

**© 2025 Automation Business Suite - All Rights Reserved**

*Complete SaaS Platform - Ready for Immediate Revenue Generation*
"""
    
    readme_path = os.path.join(package_dir, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("Created package README.md")

def create_env_example(package_dir):
    """Create .env.example file for buyer"""
    
    env_content = """# AUTOMATION BUSINESS - ENVIRONMENT CONFIGURATION
# Copy this file to .env and fill in your values

# ===== SERVER CONFIGURATION =====
PORT=3000
NODE_ENV=production
SESSION_SECRET=your_session_secret_here

# ===== MONGODB DATABASE =====
MONGODB_URI=mongodb://localhost:27017/automation_business
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/automation_business

# ===== JWT AUTHENTICATION =====
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d

# ===== STRIPE PAYMENT =====
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# ===== PAYPAL PAYMENT =====
PAYPAL_CLIENT_ID=your_paypal_client_id_here
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here
PAYPAL_MODE=sandbox
# Change to 'live' for production

# ===== EMAIL CONFIGURATION =====
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_FROM=noreply@yourdomain.com

# ===== FIREBASE (OPTIONAL) =====
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id_here

# ===== GOOGLE OAUTH (OPTIONAL) =====
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# ===== LINKEDIN API (OPTIONAL) =====
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here

# ===== APPLICATION URLs =====
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000

# ===== AUTOMATION SETTINGS =====
MAX_LEADS_PER_DAY=500
EMAIL_SEND_RATE=50
WEB_SCRAPER_TIMEOUT=30000

# ===== SECURITY =====
CORS_ORIGIN=http://localhost:3001
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
"""
    
    env_path = os.path.join(package_dir, '.env.example')
    with open(env_path, 'w', encoding='utf-8') as f:
        f.write(env_content)
    
    print("Created .env.example file")

def create_setup_instructions(package_dir):
    """Create detailed setup instructions"""
    
    setup_content = """# SETUP INSTRUCTIONS - AUTOMATION BUSINESS PLATFORM

## PREREQUISITES

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - https://nodejs.org/
2. **Python** (v3.8 or higher) - https://www.python.org/
3. **MongoDB** - https://www.mongodb.com/try/download/community
   - OR MongoDB Atlas account (free tier available)
4. **Git** (optional, for version control)

---

## STEP-BY-STEP SETUP

### STEP 1: Install Backend Dependencies

```bash
# Navigate to project root
cd automation_business_sale_package

# Install Node.js dependencies
npm install
```

### STEP 2: Install Frontend Dependencies

```bash
# Navigate to client folder
cd client

# Install React dependencies
npm install

# Return to root
cd ..
```

### STEP 3: Install Python Dependencies

```bash
# Install Python automation tools
pip install -r requirements.txt
```

### STEP 4: Configure Environment Variables

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your credentials
```

### STEP 5: Setup Database

```bash
# Initialize database
node setup-database.js
```

### STEP 6: Start the Application

**Backend Server:**
```bash
npm start
```

**Frontend (in new terminal):**
```bash
cd client
npm start
```

### STEP 7: Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000

---

## CONFIGURATION

### Payment Integration

**Stripe Setup:**
1. Create account at https://stripe.com
2. Get API keys from dashboard
3. Add to `.env` file

**PayPal Setup:**
1. Create account at https://developer.paypal.com
2. Create app to get credentials
3. Add to `.env` file

---

## RUNNING AUTOMATION TOOLS

### LinkedIn Lead Generator
```bash
linkedin-automation.bat
```

### Email Campaign Manager
```bash
email-campaign.bat
```

### Web Scraper
```bash
web-scraper.bat
```

---

## TROUBLESHOOTING

### Common Issues:

**1. "Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check connection string in `.env`

**2. "Module not found" errors**
- Run `npm install` again
- Check Node.js version (should be v16+)

**3. "Port already in use"**
- Change PORT in `.env` file
- Use different port numbers

---

## NEXT STEPS

After successful setup:

1. **Test all features** - Ensure everything works
2. **Customize branding** - Update logos, colors, content
3. **Configure pricing** - Set your subscription tiers
4. **Create demo account** - Test user experience
5. **Deploy to production** - Use Heroku, DigitalOcean, AWS, etc.

---

**© 2025 Automation Business Suite**
*Complete SaaS Platform - Ready for Immediate Revenue Generation*
"""
    
    setup_path = os.path.join(package_dir, 'SETUP_INSTRUCTIONS.md')
    with open(setup_path, 'w', encoding='utf-8') as f:
        f.write(setup_content)
    
    print("Created SETUP_INSTRUCTIONS.md")

def create_zip_package(package_dir):
    """Create ZIP file for delivery"""
    
    print()
    print("=" * 60)
    print("CREATING ZIP PACKAGE FOR DELIVERY")
    print("=" * 60)
    print()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    complete_zip = f"COMPLETE_AUTOMATION_BUSINESS_{timestamp}.zip"
    
    print(f"Creating complete package: {complete_zip}")
    
    with zipfile.ZipFile(complete_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(package_dir):
            # Skip large folders
            dirs[:] = [d for d in dirs if d not in ['node_modules', '__pycache__', '.git']]
            
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.path.dirname(package_dir))
                zipf.write(file_path, arcname)
                print(f"  Added: {arcname}")
    
    file_size = os.path.getsize(complete_zip) / (1024 * 1024)  # Convert to MB
    
    print()
    print("=" * 60)
    print("ZIP PACKAGE CREATED!")
    print(f"File: {complete_zip}")
    print(f"Size: {file_size:.2f} MB")
    print("=" * 60)
    print()
    
    return complete_zip

if __name__ == "__main__":
    print()
    print("Starting sale package preparation...")
    print()
    
    # Create the package
    package_dir = create_sale_package()
    
    # Create ZIP file
    zip_file = create_zip_package(package_dir)
    
    print()
    print("=" * 60)
    print("SALE PACKAGE PREPARATION COMPLETE!")
    print("=" * 60)
    print()
    print(f"Package folder: {package_dir}")
    print(f"ZIP file: {zip_file}")
    print()
    print("Ready to deliver to buyer!")
    print()
    print("NEXT STEPS:")
    print("1. Test the package by extracting the ZIP")
    print("2. Verify all files are included")
    print("3. Upload the ZIP file to Gumroad")
    print("4. Provide the SETUP_INSTRUCTIONS.md to buyers")
    print()
    print("=" * 60)
