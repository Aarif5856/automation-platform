#!/usr/bin/env python3
"""
Setup Verification Script
========================

Verifies that all automation tools are properly configured and ready to run.

Author: The AutomatePro
Version: 1.0
"""

import os
import sys
import subprocess
import importlib.util

def check_python_version():
    """Check if Python version is compatible"""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 7:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - Compatible")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - Requires Python 3.7+")
        return False

def check_required_packages():
    """Check if required Python packages are installed"""
    print("\n📦 Checking required packages...")
    
    required_packages = [
        'selenium',
        'beautifulsoup4',
        'pandas',
        'openpyxl',
        'requests',
        'smtplib'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            if package == 'smtplib':
                import smtplib
            else:
                __import__(package)
            print(f"✅ {package} - Installed")
        except ImportError:
            print(f"❌ {package} - Missing")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n📥 Install missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
        return False
    
    return True

def check_config_files():
    """Check if configuration files exist and are properly configured"""
    print("\n⚙️ Checking configuration files...")
    
    config_files = [
        'automation-templates/linkedin-config.py',
        'automation-templates/email-config.py'
    ]
    
    all_good = True
    
    for config_file in config_files:
        if os.path.exists(config_file):
            print(f"✅ {config_file} - Exists")
            
            # Check if credentials are configured
            with open(config_file, 'r') as f:
                content = f.read()
                if 'your-email' in content or 'your-password' in content:
                    print(f"⚠️ {config_file} - Needs credential configuration")
                    all_good = False
                else:
                    print(f"✅ {config_file} - Credentials configured")
        else:
            print(f"❌ {config_file} - Missing")
            all_good = False
    
    return all_good

def check_automation_scripts():
    """Check if automation scripts exist"""
    print("\n🔧 Checking automation scripts...")
    
    scripts = [
        'automation-templates/linkedin-lead-generator.py',
        'automation-templates/email-campaign-manager.py',
        'automation-templates/web-scraper.py',
        'automation-templates/analytics-dashboard.py'
    ]
    
    all_good = True
    
    for script in scripts:
        if os.path.exists(script):
            print(f"✅ {script} - Exists")
        else:
            print(f"❌ {script} - Missing")
            all_good = False
    
    return all_good

def check_website_files():
    """Check if website files exist"""
    print("\n🌐 Checking website files...")
    
    website_files = [
        'client/package.json',
        'client/src/App.js',
        'server.js',
        'package.json'
    ]
    
    all_good = True
    
    for file in website_files:
        if os.path.exists(file):
            print(f"✅ {file} - Exists")
        else:
            print(f"❌ {file} - Missing")
            all_good = False
    
    return all_good

def check_node_js():
    """Check if Node.js is installed"""
    print("\n🟢 Checking Node.js...")
    
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"✅ Node.js {version} - Installed")
            return True
        else:
            print("❌ Node.js - Not found")
            return False
    except FileNotFoundError:
        print("❌ Node.js - Not found")
        return False

def check_chrome_browser():
    """Check if Chrome browser is installed"""
    print("\n🌐 Checking Chrome browser...")
    
    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Users\{}\AppData\Local\Google\Chrome\Application\chrome.exe".format(os.getenv('USERNAME'))
    ]
    
    for path in chrome_paths:
        if os.path.exists(path):
            print("✅ Chrome browser - Installed")
            return True
    
    print("❌ Chrome browser - Not found")
    print("📥 Download from: https://www.google.com/chrome/")
    return False

def run_quick_test():
    """Run a quick test of the automation tools"""
    print("\n🧪 Running quick tests...")
    
    # Test LinkedIn config
    try:
        sys.path.append('automation-templates')
        import linkedin_config
        print("✅ LinkedIn config - Loads successfully")
    except Exception as e:
        print(f"❌ LinkedIn config - Error: {e}")
    
    # Test Email config
    try:
        import email_config
        print("✅ Email config - Loads successfully")
    except Exception as e:
        print(f"❌ Email config - Error: {e}")
    
    # Test Web scraper
    try:
        import web_scraper
        print("✅ Web scraper - Loads successfully")
    except Exception as e:
        print(f"❌ Web scraper - Error: {e}")

def main():
    """Main verification function"""
    print("🚀 AUTOMATION BUSINESS SYSTEM - SETUP VERIFICATION")
    print("=" * 60)
    
    checks = [
        check_python_version(),
        check_required_packages(),
        check_config_files(),
        check_automation_scripts(),
        check_website_files(),
        check_node_js(),
        check_chrome_browser()
    ]
    
    print("\n" + "=" * 60)
    
    if all(checks):
        print("🎉 ALL CHECKS PASSED! Your system is ready to use.")
        print("\n🚀 Quick Start Commands:")
        print("1. LinkedIn Automation: linkedin-automation.bat")
        print("2. Email Campaign: email-campaign.bat")
        print("3. Web Scraper: web-scraper.bat")
        print("4. Client Dashboard: start-dashboard.bat")
        print("5. Start All Tools: start-automation-tools.bat")
        
        run_quick_test()
        
    else:
        print("⚠️ SOME CHECKS FAILED! Please fix the issues above.")
        print("\n📚 Setup Guides:")
        print("- MANUAL_OPERATION_GUIDE.md - Complete setup guide")
        print("- QUICK_START_VISUAL_GUIDE.md - Visual step-by-step")
        print("- TECHNICAL_SETUP_COMPLETE.md - Technical details")
    
    print("\n" + "=" * 60)
    print("Setup verification complete!")

if __name__ == "__main__":
    main()



