"""
AUTOMATION BUSINESS - SALE PACKAGE PREPARATION SCRIPT
This script prepares all files for sale delivery
"""

import os
import shutil
import zipfile
from datetime import datetime

# Files and folders to EXCLUDE from sale package
EXCLUDE_FILES = [
    # Development files
    'node_modules',
    'client/node_modules',
    '__pycache__',
    '*.pyc',
    '.git',
    '.gitignore',
    '.env',
    '.DS_Store',
    
    # Backup and old files
    'backup_20250917_112929',
    'codester-files',
    'main-files-zip.zip',
    
    # Demo and test data (buyer will generate their own)
    'demo_automation.db',
    'demo_email_campaigns.db',
    'demo_linkedin_leads_*.csv',
    'demo_linkedin_leads_*.json',
    'demo_scraped_products_*.csv',
    'demo_scraped_products_*.json',
    'demo_automation_summary.json',
    'automation_analytics.db',
    'email_campaigns.db',
    
    # Build files (buyer will build)
    'client/build',
    
    # Cleanup scripts (not needed by buyer)
    'cleanup_duplicates.py',
    'create_main_files_zip.py',
    'create_minimal_zip.py',
    'create_optimized_zip.py',
    'prepare_sale_package.py',
    
    # Marketing materials (for your use)
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

# Files and folders to INCLUDE in sale package
INCLUDE_STRUCTURE = {
    'CORE_APPLICATION': [
        'server.js',
        'package.json',
        'package-lock.json',
        'requirements.txt',
        'setup-database.js',
    ],
    
    'BACKEND': [
        'routes/',
        'models/',
        'config/',
    ],
    
    'FRONTEND': [
        'client/src/',
        'client/public/',
        'client/package.json',
        'client/package-lock.json',
    ],
    
    'AUTOMATION_TOOLS': [
        'automation-templates/',
        'scripts/',
        'demo-automation-tools.py',
        'configure-credentials.py',
    ],
    
    'BATCH_FILES': [
        'start-dashboard.bat',
        'start-automation-tools.bat',
        'run_demo_tools.bat',
        'linkedin-automation.bat',
        'email-campaign.bat',
        'web-scraper.bat',
    ],
    
    'DOCUMENTATION': [
        'documentation/',
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
    ],
    
    'BUSINESS_MATERIALS': [
        'sales_materials/',
        'case_study_*.md',
        'generated_content/',
        'marketing_campaigns.json',
        'content_calendar_20250922.json',
    ],
    
    'DEMO_SETUP': [
        'demo_video/',
        'demo-config.json',
        'demo-config.js',
        'demo-setup.js',
        'deploy-demo.js',
        'start-demo.js',
        'demo_data/',
        'pdf_manual/',
    ],
}

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
    
    # Copy files by category
    total_files = 0
    for category, files in INCLUDE_STRUCTURE.items():
        print(f"📦 Processing: {category}")
        category_dir = os.path.join(package_dir, category)
        os.makedirs(category_dir, exist_ok=True)
        
        for file_pattern in files:
            if file_pattern.endswith('/'):
                # It's a directory
                src_dir = file_pattern.rstrip('/')
                if os.path.exists(src_dir):
                    dest_dir = os.path.join(category_dir, os.path.basename(src_dir))
                    
                    # Special handling for client folder
                    if src_dir.startswith('client/'):
                        # Copy to main package directory for proper structure
                        dest_dir = os.path.join(package_dir, src_dir)
                        os.makedirs(os.path.dirname(dest_dir), exist_ok=True)
                    
                    # Copy directory, excluding node_modules and build
                    if os.path.exists(src_dir):
                        shutil.copytree(
                            src_dir, 
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
                        files_count = sum([len(files) for _, _, files in os.walk(dest_dir)])
                        total_files += files_count
                        print(f"  ✅ Copied {src_dir} ({files_count} files)")
            else:
                # It's a file or pattern
                import glob
                matches = glob.glob(file_pattern)
                if not matches and os.path.exists(file_pattern):
                    matches = [file_pattern]
                
                for src_file in matches:
                    if os.path.exists(src_file):
                        dest_file = os.path.join(category_dir, os.path.basename(src_file))
                        
                        # Core application files go to root
                        if category == 'CORE_APPLICATION':
                            dest_file = os.path.join(package_dir, os.path.basename(src_file))
                        
                        shutil.copy2(src_file, dest_file)
                        total_files += 1
                        print(f"  ✅ Copied {src_file}")
        
        print()
    
    # Create README for the package
    create_package_readme(package_dir)
    
    # Create .env.example file
    create_env_example(package_dir)
    
    # Create setup instructions
    create_setup_instructions(package_dir)
    
    print("=" * 60)
    print(f"✅ PACKAGE PREPARATION COMPLETE!")
    print(f"📦 Total files: {total_files}")
    print(f"📁 Package location: {package_dir}")
    print("=" * 60)
    print()
    
    return package_dir

def create_package_readme(package_dir):
    """Create main README for the sale package"""
    
    readme_content = """# 🚀 AUTOMATION BUSINESS - COMPLETE SAAS PLATFORM

## 📦 PACKAGE CONTENTS

This package contains the complete Automation Business SaaS Platform - a professional, revenue-ready system.

### ✅ What's Included:

**CORE APPLICATION:**
- Complete React.js frontend application
- Node.js/Express backend server
- MongoDB database integration
- User authentication and management
- Payment integration (Stripe & PayPal)

**AUTOMATION TOOLS:**
- LinkedIn Lead Generator (500+ leads/day)
- Email Campaign Manager with automation
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

## 🚀 QUICK START

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

## 📚 DOCUMENTATION

Detailed documentation is available in the `DOCUMENTATION` folder:

- **DEMO_README.md** - Quick start guide
- **TECHNICAL_SETUP_COMPLETE.md** - Technical setup
- **MANUAL_OPERATION_GUIDE.md** - User manual
- **TERMINAL_COMMANDS_GUIDE.md** - Command reference

---

## 💰 REVENUE POTENTIAL

**Expected Annual Revenue:** $30,000 - $100,000+

**Revenue Streams:**
1. Monthly subscriptions ($97-$997/month)
2. One-time automation projects
3. White-label licensing
4. Consulting and training services

---

## 🎯 TARGET CUSTOMERS

- Marketing agencies
- Real estate professionals
- Insurance brokers
- E-commerce businesses
- Consultants and coaches
- Service providers

---

## 🛠️ TECHNICAL STACK

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

## 📞 SUPPORT

For technical support or questions about this package, please refer to:
- Documentation folder
- Setup instructions
- Technical guides

---

## 📄 LICENSE

This software is provided as-is with full ownership transferred upon purchase.
You have the right to use, modify, and resell this software.

---

**© 2025 Automation Business Suite - All Rights Reserved**

*Complete SaaS Platform - Ready for Immediate Revenue Generation*
"""
    
    readme_path = os.path.join(package_dir, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("✅ Created package README.md")

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
    
    print("✅ Created .env.example file")

def create_setup_instructions(package_dir):
    """Create detailed setup instructions"""
    
    setup_content = """# 🚀 SETUP INSTRUCTIONS - AUTOMATION BUSINESS PLATFORM

## 📋 PREREQUISITES

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher) - https://nodejs.org/
2. **Python** (v3.8 or higher) - https://www.python.org/
3. **MongoDB** - https://www.mongodb.com/try/download/community
   - OR MongoDB Atlas account (free tier available)
4. **Git** (optional, for version control)

---

## ⚡ STEP-BY-STEP SETUP

### STEP 1: Install Backend Dependencies

```bash
# Navigate to project root
cd automation_business_sale_package

# Install Node.js dependencies
npm install

# This will install:
# - Express.js (server)
# - Mongoose (database)
# - Stripe & PayPal SDKs
# - Authentication libraries
# - And all other backend dependencies
```

### STEP 2: Install Frontend Dependencies

```bash
# Navigate to client folder
cd client

# Install React dependencies
npm install

# This will install:
# - React.js and React Router
# - Chakra UI (design system)
# - Chart.js (analytics)
# - Payment integrations
# - And all other frontend dependencies

# Return to root
cd ..
```

### STEP 3: Install Python Dependencies

```bash
# Install Python automation tools
pip install -r requirements.txt

# This will install:
# - Selenium (web automation)
# - BeautifulSoup (web scraping)
# - Pandas (data processing)
# - And all other Python tools
```

### STEP 4: Configure Environment Variables

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your credentials:
# - MongoDB connection string
# - Stripe API keys
# - PayPal credentials
# - Email SMTP settings
# - JWT secret
```

**IMPORTANT:** Get your API keys from:
- **Stripe:** https://dashboard.stripe.com/apikeys
- **PayPal:** https://developer.paypal.com/dashboard/
- **MongoDB Atlas:** https://cloud.mongodb.com/

### STEP 5: Setup Database

```bash
# Start MongoDB locally (if using local install)
# Windows:
net start MongoDB

# Mac/Linux:
sudo systemctl start mongodb

# Initialize database
node setup-database.js
```

### STEP 6: Start the Application

**Option A: Development Mode (Recommended for testing)**

```bash
# Terminal 1 - Start backend server
npm start

# Terminal 2 - Start frontend development server
cd client
npm start
```

**Option B: Production Mode**

```bash
# Build frontend for production
cd client
npm run build
cd ..

# Start backend server (serves built frontend)
npm start
```

### STEP 7: Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3001/admin

**Default Admin Credentials:**
- Email: admin@automatepro.info
- Password: (will be created on first run)

---

## 🔧 CONFIGURATION

### 1. Payment Integration

**Stripe Setup:**
1. Create account at https://stripe.com
2. Get API keys from dashboard
3. Add to `.env` file
4. Test with test cards

**PayPal Setup:**
1. Create account at https://developer.paypal.com
2. Create app to get credentials
3. Add to `.env` file
4. Use sandbox mode for testing

### 2. Email Configuration

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Gmail Setup:**
1. Enable 2-factor authentication
2. Generate app password
3. Use app password in `.env`

### 3. Database Configuration

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/automation_business
```

**MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/automation_business
```

---

## 🚀 RUNNING AUTOMATION TOOLS

### LinkedIn Lead Generator

```bash
# Windows
linkedin-automation.bat

# Or directly with Python
python automation-templates/linkedin-lead-generator.py
```

### Email Campaign Manager

```bash
# Windows
email-campaign.bat

# Or directly with Python
python automation-templates/email-campaign-manager.py
```

### Web Scraper

```bash
# Windows
web-scraper.bat

# Or directly with Python
python automation-templates/web-scraper.py
```

---

## 📊 DEMO MODE

To run the system in demo mode (for testing or presentations):

```bash
# Setup demo environment
node demo-setup.js

# Start demo mode
node start-demo.js
```

---

## 🔍 TROUBLESHOOTING

### Common Issues:

**1. "Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity for Atlas

**2. "Module not found" errors**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node.js version (should be v16+)

**3. "Port already in use"**
- Change PORT in `.env` file
- Kill process using the port
- Use different port numbers

**4. Python tools not working**
- Ensure Python 3.8+ is installed
- Run `pip install -r requirements.txt` again
- Check PATH environment variable

**5. Payment integration errors**
- Verify API keys are correct
- Check if using test/live mode correctly
- Review Stripe/PayPal dashboard logs

---

## 📞 NEXT STEPS

After successful setup:

1. **Test all features** - Ensure everything works
2. **Customize branding** - Update logos, colors, content
3. **Configure pricing** - Set your subscription tiers
4. **Create demo account** - Test user experience
5. **Deploy to production** - Use Heroku, DigitalOcean, AWS, etc.

---

## 📚 ADDITIONAL RESOURCES

- **Documentation:** See `DOCUMENTATION` folder
- **Video Tutorials:** See `DEMO_VIDEO_SCRIPTS.md`
- **Business Strategy:** See `RECURRING_REVENUE_PACKAGES.md`
- **Marketing Materials:** See `sales_materials` folder

---

## ✅ CHECKLIST

- [ ] Node.js installed
- [ ] Python installed
- [ ] MongoDB setup (local or Atlas)
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Python dependencies installed
- [ ] `.env` file configured
- [ ] Database initialized
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Admin account created
- [ ] Payment integration tested
- [ ] Email system tested
- [ ] Automation tools tested

---

**🎉 CONGRATULATIONS!**

Your Automation Business Platform is now ready to generate revenue!

**Estimated Setup Time:** 30-60 minutes
**Difficulty Level:** Intermediate
**Support:** Refer to documentation folder

---

**© 2025 Automation Business Suite**
*Complete SaaS Platform - Ready for Immediate Revenue Generation*
"""
    
    setup_path = os.path.join(package_dir, 'SETUP_INSTRUCTIONS.md')
    with open(setup_path, 'w', encoding='utf-8') as f:
        f.write(setup_content)
    
    print("✅ Created SETUP_INSTRUCTIONS.md")

def create_zip_packages(package_dir):
    """Create organized ZIP files for delivery"""
    
    print()
    print("=" * 60)
    print("CREATING ZIP PACKAGES FOR DELIVERY")
    print("=" * 60)
    print()
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Create main complete package ZIP
    complete_zip = f"COMPLETE_AUTOMATION_BUSINESS_{timestamp}.zip"
    
    print(f"📦 Creating complete package: {complete_zip}")
    
    with zipfile.ZipFile(complete_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(package_dir):
            # Skip node_modules and other large folders
            dirs[:] = [d for d in dirs if d not in ['node_modules', '__pycache__', '.git']]
            
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.path.dirname(package_dir))
                zipf.write(file_path, arcname)
                print(f"  ✅ Added: {arcname}")
    
    file_size = os.path.getsize(complete_zip) / (1024 * 1024)  # Convert to MB
    
    print()
    print("=" * 60)
    print(f"✅ ZIP PACKAGE CREATED!")
    print(f"📦 File: {complete_zip}")
    print(f"📊 Size: {file_size:.2f} MB")
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
    zip_file = create_zip_packages(package_dir)
    
    print()
    print("=" * 60)
    print("🎉 SALE PACKAGE PREPARATION COMPLETE!")
    print("=" * 60)
    print()
    print(f"📁 Package folder: {package_dir}")
    print(f"📦 ZIP file: {zip_file}")
    print()
    print("✅ Ready to deliver to buyer!")
    print()
    print("NEXT STEPS:")
    print("1. Test the package by extracting the ZIP")
    print("2. Verify all files are included")
    print("3. Send the ZIP file to the buyer")
    print("4. Provide the SETUP_INSTRUCTIONS.md to the buyer")
    print()
    print("=" * 60)
