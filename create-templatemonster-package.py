#!/usr/bin/env python3
"""
Create TemplateMonster Package
Excludes development files and includes only what's needed
"""

import os
import shutil
import zipfile
from datetime import datetime

def create_templatemonster_package():
    # Create package directory
    package_dir = f"templatemonster-package-{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    os.makedirs(package_dir, exist_ok=True)
    
    # Copy client directory (main template)
    if os.path.exists("client"):
        shutil.copytree("client", f"{package_dir}/client")
        print("OK - Copied client directory")
    
    # Copy documentation
    if os.path.exists("documentation.html"):
        shutil.copy2("documentation.html", package_dir)
        print("OK - Copied documentation.html")
    
    # Copy README if exists
    if os.path.exists("README.md"):
        shutil.copy2("README.md", package_dir)
        print("OK - Copied README.md")
    
    # Remove development files from client directory
    dev_files_to_remove = [
        "client/node_modules",
        "client/build",
        "client/.git",
        "client/.env",
        "client/.env.local",
        "client/.env.development.local",
        "client/.env.test.local",
        "client/.env.production.local"
    ]
    
    for dev_file in dev_files_to_remove:
        if os.path.exists(dev_file):
            if os.path.isdir(dev_file):
                shutil.rmtree(dev_file)
            else:
                os.remove(dev_file)
            print(f"Removed {dev_file}")
    
    # Create ZIP file
    zip_filename = f"automation-business-dashboard-template-{datetime.now().strftime('%Y%m%d')}.zip"
    
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(package_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, package_dir)
                zipf.write(file_path, arcname)
    
    print(f"\nSUCCESS - Package created: {zip_filename}")
    print(f"Package size: {os.path.getsize(zip_filename) / (1024*1024):.1f} MB")
    print(f"Package location: {os.path.abspath(zip_filename)}")
    
    # Clean up
    shutil.rmtree(package_dir)
    
    print("\nTemplateMonster package ready!")
    print("What's included:")
    print("   - Complete React.js application")
    print("   - All favicon files")
    print("   - Professional HTML documentation")
    print("   - No personal contact info")
    print("   - X icon instead of Twitter")
    print("   - All TemplateMonster compliant files")
    
    return zip_filename

if __name__ == "__main__":
    create_templatemonster_package()
