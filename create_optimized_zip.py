#!/usr/bin/env python3
"""
Create Optimized main-files.zip for ThemeForest
==============================================

This script creates a smaller main-files.zip by excluding
large unnecessary files like node_modules, build artifacts, etc.
"""

import zipfile
import os
from pathlib import Path

def should_exclude(file_path):
    """Check if file should be excluded from ZIP"""
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
        '.env.local',
        '.env.production',
        '*.db',
        '*.sqlite',
        '*.sqlite3',
        'automation_analytics.db',
        'email_campaigns.db',
        'demo_email_campaigns.db',
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
        '*.md',
        '*.json',
        '*.csv',
        '*.xlsx',
        '*.html',
        '*.png',
        '*.jpg',
        '*.jpeg',
        '*.gif',
        '*.svg',
        '*.ico',
        '*.zip',
        '*.rar',
        '*.7z'
    ]
    
    file_path_str = str(file_path).replace('\\', '/')
    
    for pattern in exclude_patterns:
        if pattern in file_path_str:
            return True
    
    return False

def create_optimized_zip():
    """Create optimized main-files.zip"""
    print("Creating optimized main-files.zip for ThemeForest...")
    print("Excluding large files and unnecessary content...")
    
    # Essential files and directories to include
    essential_items = [
        'client/src',  # Only source code, not build
        'client/public',
        'client/package.json',
        'client/package-lock.json',
        'server.js',
        'package.json',
        'package-lock.json',
        'models',
        'routes',
        'requirements.txt',
        'automation-templates',  # But exclude large files
        'config',
        'setup-database.js'
    ]
    
    total_files = 0
    total_size = 0
    
    # Create the ZIP file
    with zipfile.ZipFile('automation-templates/main-files-optimized.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in essential_items:
            if os.path.exists(item):
                if os.path.isdir(item):
                    # Add directory recursively, excluding large files
                    for root, dirs, files in os.walk(item):
                        # Remove excluded directories from dirs list
                        dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d))]
                        
                        for file in files:
                            file_path = os.path.join(root, file)
                            
                            # Skip if file should be excluded
                            if should_exclude(file_path):
                                continue
                                
                            # Skip if file is too large (>1MB)
                            if os.path.getsize(file_path) > 1024 * 1024:
                                print(f"Skipping large file: {file_path}")
                                continue
                            
                            arc_path = os.path.relpath(file_path, '.')
                            zipf.write(file_path, arc_path)
                            total_files += 1
                            total_size += os.path.getsize(file_path)
                            print(f"Added: {arc_path}")
                else:
                    # Add single file if not excluded
                    if not should_exclude(item) and os.path.getsize(item) <= 1024 * 1024:
                        zipf.write(item, item)
                        total_files += 1
                        total_size += os.path.getsize(item)
                        print(f"Added: {item}")
                    else:
                        print(f"Skipped: {item}")
            else:
                print(f"Warning: {item} not found, skipping...")
    
    print(f"\n✅ Optimized main-files.zip created successfully!")
    print(f"📊 Files added: {total_files}")
    print(f"📦 Total size: {total_size:,} bytes ({total_size/1024/1024:.1f} MB)")
    
    # Check final file size
    zip_size = os.path.getsize('automation-templates/main-files-optimized.zip')
    print(f"📦 ZIP file size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")
    
    if zip_size > 200 * 1024 * 1024:  # 200 MB
        print("⚠️  Warning: File is still larger than 200 MB")
    else:
        print("✅ File size is under 200 MB limit!")

if __name__ == "__main__":
    create_optimized_zip()


