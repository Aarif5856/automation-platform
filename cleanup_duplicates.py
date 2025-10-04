#!/usr/bin/env python3
"""
Cleanup Duplicate Files Script
Removes old duplicate files and keeps only the most recent versions
"""

import os
import re
from datetime import datetime
from collections import defaultdict

def cleanup_duplicates():
    """Clean up duplicate files with timestamps"""
    
    print("🧹 CLEANUP DUPLICATE FILES")
    print("=" * 50)
    
    # Get all files in current directory
    files = [f for f in os.listdir('.') if os.path.isfile(f)]
    
    # Group files by base name (without timestamp)
    file_groups = defaultdict(list)
    
    for file in files:
        # Pattern to match files with timestamps like _20250922_001239
        timestamp_pattern = r'_(\d{8}_\d{6})'
        match = re.search(timestamp_pattern, file)
        
        if match:
            # Extract base name without timestamp
            base_name = re.sub(timestamp_pattern, '', file)
            file_groups[base_name].append(file)
        else:
            # Files without timestamps - keep them
            file_groups[file].append(file)
    
    deleted_count = 0
    kept_count = 0
    
    for base_name, file_list in file_groups.items():
        if len(file_list) > 1:
            print(f"\n📁 Group: {base_name}")
            print(f"   Found {len(file_list)} files:")
            
            # Sort by timestamp (newest first)
            file_list.sort(reverse=True)
            
            # Keep the newest file, delete the rest
            newest_file = file_list[0]
            old_files = file_list[1:]
            
            print(f"   ✅ Keeping: {newest_file}")
            kept_count += 1
            
            for old_file in old_files:
                try:
                    os.remove(old_file)
                    print(f"   🗑️  Deleted: {old_file}")
                    deleted_count += 1
                except Exception as e:
                    print(f"   ❌ Error deleting {old_file}: {e}")
        else:
            # Single file - keep it
            kept_count += 1
    
    print(f"\n📊 CLEANUP SUMMARY")
    print("=" * 30)
    print(f"✅ Files kept: {kept_count}")
    print(f"🗑️  Files deleted: {deleted_count}")
    print(f"💾 Space saved: {deleted_count} duplicate files removed")
    
    # Clean up specific duplicate patterns
    cleanup_specific_duplicates()
    
    print("\n🎉 Cleanup complete! Your project is now organized.")

def cleanup_specific_duplicates():
    """Clean up specific known duplicate patterns"""
    
    print("\n🔍 CLEANING SPECIFIC DUPLICATES")
    print("-" * 40)
    
    # Remove old demo data files (keep only the latest)
    patterns_to_clean = [
        # Demo data files - keep only latest
        r'demo_linkedin_leads_20250917.*',
        r'demo_linkedin_leads_20250921.*',
        r'demo_scraped_products_20250917.*',
        r'demo_scraped_products_20250921.*',
        r'demo_scraped_products_20250922_000738.*',
        
        # Case studies - keep only latest
        r'case_study_.*_20250921\.md',
        
        # Demo scripts - keep only latest
        r'demo_script_.*_20250921\.md',
        
        # Social posts - keep only latest
        r'social_posts_.*_20250921\.json',
        
        # Content calendars - keep only latest
        r'content_calendar_20250921\.json',
    ]
    
    files_to_delete = []
    
    for pattern in patterns_to_clean:
        for file in os.listdir('.'):
            if re.match(pattern, file):
                files_to_delete.append(file)
    
    for file in files_to_delete:
        try:
            os.remove(file)
            print(f"🗑️  Deleted old file: {file}")
        except Exception as e:
            print(f"❌ Error deleting {file}: {e}")

def organize_remaining_files():
    """Organize remaining files into logical groups"""
    
    print("\n📁 ORGANIZING REMAINING FILES")
    print("-" * 40)
    
    # Create directories for organization
    directories = {
        'demo_data': 'Latest demo data files',
        'sales_materials': 'Sales and marketing materials',
        'documentation': 'Project documentation',
        'scripts': 'Automation scripts',
        'generated_content': 'Generated content and case studies'
    }
    
    for dir_name, description in directories.items():
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
            print(f"📁 Created directory: {dir_name} ({description})")
    
    # Move files to appropriate directories
    file_moves = {
        'demo_data': [
            'demo_linkedin_leads_20250922_001239.csv',
            'demo_linkedin_leads_20250922_001239.json',
            'demo_scraped_products_20250922_001239.csv',
            'demo_scraped_products_20250922_001239.json',
            'demo_automation_summary.json',
            'demo_email_campaigns.db'
        ],
        'sales_materials': [
            'AUTOMATION_BUSINESS_PITCH_DECK.pdf',
            'SALES_PACKAGE_COMPLETE.md',
            'SALES_PACKAGE_SUMMARY.md',
            'HOW_TO_SELL_GUIDE.md',
            'QUICK_START_SELLING.md',
            'MARKETPLACE_SETUP_GUIDE.md',
            'EARNINGS_POTENTIAL_GUIDE.md',
            'SUPPORT_PLAN.md',
            'PITCH_DECK_ONE_PAGE.html'
        ],
        'documentation': [
            'README.md',
            'DEMO_VIDEO_SETUP_GUIDE.md',
            'FINAL_DEMO_GUIDE.md',
            'TERMINAL_COMMANDS_GUIDE.md',
            'QUICK_START_MANUAL.md',
            'TECHNICAL_SETUP_COMPLETE.md',
            'MANUAL_OPERATION_GUIDE.md'
        ],
        'scripts': [
            'run_demo_tools.bat',
            'run_demo_tools.ps1',
            'cleanup-project.py',
            'create_demo_video.py',
            'create_pdf_manual.py',
            'create_pitch_deck_pdf.py',
            'setup-automation-tools.py',
            'verify-setup.py'
        ],
        'generated_content': [
            'case_study_e-commerce_plus_20250922.md',
            'case_study_growthco_agency_20250922.md',
            'case_study_techstart_inc._20250922.md',
            'demo_script_email_campaign_manager_20250922.md',
            'demo_script_linkedin_lead_generator_20250922.md',
            'demo_script_web_scraper_20250922.md',
            'social_posts_linkedin_20250922.json',
            'social_posts_twitter_20250922.json',
            'social_posts_tiktok_20250922.json',
            'content_calendar_20250922.json'
        ]
    }
    
    for target_dir, files in file_moves.items():
        for file in files:
            if os.path.exists(file):
                try:
                    os.rename(file, os.path.join(target_dir, file))
                    print(f"📁 Moved {file} to {target_dir}/")
                except Exception as e:
                    print(f"❌ Error moving {file}: {e}")

if __name__ == "__main__":
    cleanup_duplicates()
    organize_remaining_files()
    
    print("\n🎯 FINAL PROJECT STRUCTURE")
    print("=" * 40)
    print("📁 automation/")
    print("├── 📁 demo_data/ (Latest demo files)")
    print("├── 📁 sales_materials/ (Sales packages)")
    print("├── 📁 documentation/ (Guides and docs)")
    print("├── 📁 scripts/ (Automation scripts)")
    print("├── 📁 generated_content/ (Case studies)")
    print("├── 📁 automation-templates/ (Core tools)")
    print("├── 📁 client/ (Frontend)")
    print("├── 📁 routes/ (Backend)")
    print("└── 📄 Core project files")
    
    print("\n✅ Your automation project is now clean and organized!")
    print("🚀 Ready for demo video recording and sales!")

