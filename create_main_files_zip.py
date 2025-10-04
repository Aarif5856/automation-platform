#!/usr/bin/env python3
"""
Create main-files.zip for ThemeForest
====================================

This script creates the main-files.zip containing all source code
for the ThemeForest upload.
"""

import zipfile
import os
from pathlib import Path

def create_main_files_zip():
    """Create main-files.zip with all source code"""
    print("Creating main-files.zip for ThemeForest...")
    
    # Files and directories to include
    items_to_include = [
        'client',
        'server.js',
        'package.json',
        'package-lock.json',
        'models',
        'routes',
        'requirements.txt',
        'automation-templates',
        'config',
        'setup-database.js'
    ]
    
    # Create the ZIP file
    with zipfile.ZipFile('automation-templates/main-files.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in items_to_include:
            if os.path.exists(item):
                if os.path.isdir(item):
                    # Add directory recursively
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arc_path = os.path.relpath(file_path, '.')
                            zipf.write(file_path, arc_path)
                            print(f"Added: {arc_path}")
                else:
                    # Add single file
                    zipf.write(item, item)
                    print(f"Added: {item}")
            else:
                print(f"Warning: {item} not found, skipping...")
    
    print("✅ main-files.zip created successfully!")
    
    # Check file size
    zip_size = os.path.getsize('automation-templates/main-files.zip')
    print(f"📦 File size: {zip_size:,} bytes ({zip_size/1024/1024:.1f} MB)")

if __name__ == "__main__":
    create_main_files_zip()
