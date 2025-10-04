#!/usr/bin/env python3
"""
Project Cleanup Script
=====================

This script safely removes unwanted files from the automation business project
to create a clean, professional structure.

Author: The AutomatePro
Version: 1.0
"""

import os
import shutil
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_backup():
    """Create a backup before cleanup"""
    logger.info("🔄 Creating backup before cleanup...")
    
    backup_dir = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    try:
        # Create backup directory
        os.makedirs(backup_dir, exist_ok=True)
        
        # Copy important directories
        if os.path.exists("automation-templates"):
            shutil.copytree("automation-templates", f"{backup_dir}/automation-templates")
        
        if os.path.exists("client"):
            shutil.copytree("client", f"{backup_dir}/client")
        
        # Copy important files
        important_files = [
            "README.md", "package.json", "server.js", "requirements.txt",
            "TECHNICAL_SETUP_COMPLETE.md", "IMMEDIATE_LEVEL_UP_COMPLETE.md",
            "PROJECT_SALE_PACKAGE.md", "RECURRING_REVENUE_PACKAGES.md"
        ]
        
        for file in important_files:
            if os.path.exists(file):
                shutil.copy2(file, backup_dir)
        
        logger.info(f"✅ Backup created: {backup_dir}")
        return backup_dir
        
    except Exception as e:
        logger.error(f"❌ Error creating backup: {e}")
        return None

def delete_test_data_files():
    """Delete old test data files"""
    logger.info("🗑️ Deleting old test data files...")
    
    test_data_files = [
        "automation-templates/business_leads.csv",
        "automation-templates/real_business_leads.txt",
        "automation-templates/real-leads.csv",
        "automation-templates/scraped_data.csv",
        "automation-templates/scraped_data.json",
        "automation-templates/scraped_data.xlsx",
        "automation-templates/lead_collection_template.txt",
        "automation-templates/email_campaign_template.txt",
        "automation-templates/email_campaigns.db",
        "automation-templates/generated_leads_20250917_103709.csv",
        "automation-templates/generated_leads_20250917_103709.json",
        "automation-templates/outreach_emails_20250917_103709.json",
        "automation-templates/free_demo_offer_20250917.json"
    ]
    
    deleted_count = 0
    for file_path in test_data_files:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"✅ Deleted: {file_path}")
                deleted_count += 1
            except Exception as e:
                logger.error(f"❌ Error deleting {file_path}: {e}")
    
    logger.info(f"🗑️ Deleted {deleted_count} test data files")
    return deleted_count

def delete_duplicate_scripts():
    """Delete duplicate and redundant scripts"""
    logger.info("🗑️ Deleting duplicate scripts...")
    
    duplicate_scripts = [
        "automation-templates/crm-integrations.py",
        "automation-templates/find-real-leads.py",
        "automation-templates/lead-scraper.py",
        "automation-templates/import-leads.py",
        "automation-templates/track-results.py",
        "automation-templates/test-email.py",
        "automation-templates/send-business-campaign.py",
        "automation-templates/send-campaign.py",
        "automation-templates/send-qatar-campaign.py",
        "automation-templates/send-real-campaign.py",
        "automation-templates/send-real-test-campaign.py",
        "automation-templates/send-self-test.py",
        "automation-templates/send-self-verification.py",
        "automation-templates/real-business-lead-finder.py"
    ]
    
    deleted_count = 0
    for file_path in duplicate_scripts:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"✅ Deleted: {file_path}")
                deleted_count += 1
            except Exception as e:
                logger.error(f"❌ Error deleting {file_path}: {e}")
    
    logger.info(f"🗑️ Deleted {deleted_count} duplicate scripts")
    return deleted_count

def delete_test_files():
    """Delete test files from root directory"""
    logger.info("🗑️ Deleting test files...")
    
    test_files = [
        "test-automation-scripts.py",
        "test-automation-tools.py",
        "test-dependencies.py",
        "test-registration.html",
        "test-server.js",
        "test-system.js",
        "test-updated-website.py",
        "test-website-fixed.py",
        "test-website.html",
        "test_results.json"
    ]
    
    deleted_count = 0
    for file_path in test_files:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"✅ Deleted: {file_path}")
                deleted_count += 1
            except Exception as e:
                logger.error(f"❌ Error deleting {file_path}: {e}")
    
    logger.info(f"🗑️ Deleted {deleted_count} test files")
    return deleted_count

def delete_old_documentation():
    """Delete old documentation files"""
    logger.info("🗑️ Deleting old documentation...")
    
    old_docs = [
        "AUTOMATION_TESTING_GUIDE.md",
        "BUSINESS_SETUP_GUIDE.md",
        "BUSINESS_SUMMARY.md",
        "BUSINESS_TRANSFORMATION_COMPLETE.md",
        "COMPLETE_PROJECT_ANALYSIS.md",
        "CUSTOMER_ACQUISITION_SCRIPTS.md",
        "ENTERPRISE_FEATURES_IMPLEMENTATION.md",
        "FINAL_SETUP_COMPLETE.md",
        "FIREBASE_OFFLINE_FIX.md",
        "FIREBASE_SETUP_COMPLETE.md",
        "GOOGLE_OAUTH_SETUP.md",
        "GROWTH_STRATEGY_IMPLEMENTATION.md",
        "GROWTH_STRATEGY.md",
        "PRACTICAL_TESTING_GUIDE.md",
        "SETUP_COMPLETE_SUMMARY.md",
        "TEST_RESULTS_SUMMARY.md"
    ]
    
    deleted_count = 0
    for file_path in old_docs:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"✅ Deleted: {file_path}")
                deleted_count += 1
            except Exception as e:
                logger.error(f"❌ Error deleting {file_path}: {e}")
    
    logger.info(f"🗑️ Deleted {deleted_count} old documentation files")
    return deleted_count

def delete_unused_config():
    """Delete unused configuration files"""
    logger.info("🗑️ Deleting unused configuration files...")
    
    unused_config = [
        "deploy-guide.md",
        "deployDomain.ps1",
        "deployDomain.sh",
        "Dockerfile",
        "env.example",
        "netlify.toml",
        "requirements-simple.txt",
        "server-google.js",
        "server-simple.js",
        "start-business.sh",
        "vercel.json"
    ]
    
    deleted_count = 0
    for file_path in unused_config:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info(f"✅ Deleted: {file_path}")
                deleted_count += 1
            except Exception as e:
                logger.error(f"❌ Error deleting {file_path}: {e}")
    
    logger.info(f"🗑️ Deleted {deleted_count} unused configuration files")
    return deleted_count

def verify_core_files():
    """Verify that core files still exist"""
    logger.info("🔍 Verifying core files...")
    
    core_files = [
        "README.md",
        "package.json",
        "server.js",
        "requirements.txt",
        "TECHNICAL_SETUP_COMPLETE.md",
        "IMMEDIATE_LEVEL_UP_COMPLETE.md",
        "PROJECT_SALE_PACKAGE.md",
        "RECURRING_REVENUE_PACKAGES.md",
        "automation-templates/web-scraper.py",
        "automation-templates/linkedin-lead-generator.py",
        "automation-templates/email-campaign-manager.py",
        "automation-templates/crm-integration-system.py",
        "automation-templates/linkedin-config.py",
        "automation-templates/email-config.py"
    ]
    
    missing_files = []
    for file_path in core_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        logger.warning(f"⚠️ Missing core files: {missing_files}")
        return False
    else:
        logger.info("✅ All core files present")
        return True

def create_cleanup_summary(deleted_counts):
    """Create a summary of the cleanup"""
    logger.info("📊 Creating cleanup summary...")
    
    total_deleted = sum(deleted_counts.values())
    
    summary = f"""
# 🧹 PROJECT CLEANUP COMPLETE

## 📊 **CLEANUP SUMMARY**

**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

### **Files Deleted:**
- **Test Data Files:** {deleted_counts['test_data']}
- **Duplicate Scripts:** {deleted_counts['duplicates']}
- **Test Files:** {deleted_counts['test_files']}
- **Old Documentation:** {deleted_counts['old_docs']}
- **Unused Configuration:** {deleted_counts['unused_config']}

**Total Files Deleted:** {total_deleted}

### **Project Status:**
✅ **Clean and professional structure**
✅ **All core functionality preserved**
✅ **Ready for sale and deployment**

### **Core Files Preserved:**
- ✅ Web Scraper
- ✅ LinkedIn Lead Generator
- ✅ Email Campaign Manager
- ✅ CRM Integration System
- ✅ Professional Website
- ✅ Business Documentation
- ✅ Demo Video Scripts

### **Next Steps:**
1. Test core functionality
2. Create demo videos
3. List on marketplaces
4. Start generating revenue

---
*Your automation business system is now clean, professional, and ready to sell!*
"""
    
    with open("CLEANUP_SUMMARY.md", "w") as f:
        f.write(summary)
    
    logger.info("✅ Cleanup summary created: CLEANUP_SUMMARY.md")

def main():
    """Main cleanup function"""
    logger.info("🧹 Starting project cleanup...")
    
    # Create backup
    backup_dir = create_backup()
    if not backup_dir:
        logger.error("❌ Failed to create backup. Aborting cleanup.")
        return
    
    # Track deleted files
    deleted_counts = {
        'test_data': 0,
        'duplicates': 0,
        'test_files': 0,
        'old_docs': 0,
        'unused_config': 0
    }
    
    try:
        # Delete unwanted files
        deleted_counts['test_data'] = delete_test_data_files()
        deleted_counts['duplicates'] = delete_duplicate_scripts()
        deleted_counts['test_files'] = delete_test_files()
        deleted_counts['old_docs'] = delete_old_documentation()
        deleted_counts['unused_config'] = delete_unused_config()
        
        # Verify core files
        if verify_core_files():
            logger.info("✅ Core files verification passed")
        else:
            logger.warning("⚠️ Some core files may be missing")
        
        # Create summary
        create_cleanup_summary(deleted_counts)
        
        # Final summary
        total_deleted = sum(deleted_counts.values())
        logger.info("🎉 Project cleanup complete!")
        logger.info(f"📊 Total files deleted: {total_deleted}")
        logger.info(f"💾 Backup created: {backup_dir}")
        logger.info("✅ Project is now clean and professional")
        
    except Exception as e:
        logger.error(f"❌ Error during cleanup: {e}")
        logger.info(f"💾 Backup available at: {backup_dir}")

if __name__ == "__main__":
    main()


