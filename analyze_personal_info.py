#!/usr/bin/env python3
"""
Analyze Buyer Package for Personal Information
=============================================

This script analyzes the buyer package zip file to identify any personal
information that should be removed before sending to buyers.
"""

import zipfile
import os
import re

def analyze_personal_info():
    """Analyze the buyer package for personal information"""
    print("ANALYZING BUYER PACKAGE FOR PERSONAL INFORMATION...")
    print("=" * 60)
    
    zip_file = 'COMPLETE_AUTOMATION_PLATFORM_BUYER_PACKAGE_20251013_113115.zip'
    
    if not os.path.exists(zip_file):
        print(f"Error: {zip_file} not found!")
        return
    
    personal_info_found = []
    sensitive_files = []
    suspicious_content = []
    
    with zipfile.ZipFile(zip_file, 'r') as zipf:
        file_list = zipf.namelist()
        
        print(f"Total files in package: {len(file_list)}")
        print()
        
        # Check for personal information patterns
        personal_patterns = [
            'email', 'password', 'secret', 'key', 'token', 'api_key',
            'username', 'user', 'admin', 'login', 'credential',
            'personal', 'private', 'confidential', 'sensitive',
            'auth', 'oauth', 'jwt', 'session'
        ]
        
        # Check for sensitive file types
        sensitive_extensions = ['.env', '.key', '.pem', '.p12', '.pfx', '.crt', '.p8']
        
        for file_path in file_list:
            file_lower = file_path.lower()
            
            # Check if file contains personal info patterns
            for pattern in personal_patterns:
                if pattern in file_lower:
                    personal_info_found.append((file_path, pattern))
                    break
            
            # Check for sensitive file types
            if any(ext in file_lower for ext in sensitive_extensions):
                sensitive_files.append(file_path)
            
            # Check file content for suspicious patterns
            try:
                with zipf.open(file_path) as f:
                    content = f.read().decode('utf-8', errors='ignore')
                    
                    # Check for email patterns
                    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
                    emails = re.findall(email_pattern, content)
                    if emails:
                        suspicious_content.append((file_path, f"Emails found: {emails[:3]}"))
                    
                    # Check for API keys or tokens
                    api_pattern = r'(api[_-]?key|token|secret|password)\s*[:=]\s*["\']?[A-Za-z0-9+/=]{20,}["\']?'
                    api_matches = re.findall(api_pattern, content, re.IGNORECASE)
                    if api_matches:
                        suspicious_content.append((file_path, f"API keys/tokens found: {len(api_matches)} matches"))
                    
                    # Check for URLs with personal info
                    url_pattern = r'https?://[^\s]+'
                    urls = re.findall(url_pattern, content)
                    personal_urls = [url for url in urls if any(term in url.lower() for term in ['localhost', '127.0.0.1', 'your-domain', 'your-email'])]
                    if personal_urls:
                        suspicious_content.append((file_path, f"Personal URLs found: {personal_urls[:3]}"))
                        
            except:
                # Skip binary files or files that can't be read
                pass
    
    print("FILES WITH POTENTIAL PERSONAL INFORMATION:")
    print("-" * 50)
    for file_path, pattern in personal_info_found:
        print(f"WARNING: {file_path} (contains: {pattern})")
    
    print()
    print("SENSITIVE FILE TYPES FOUND:")
    print("-" * 50)
    for file_path in sensitive_files:
        print(f"SECURE: {file_path}")
    
    print()
    print("SUSPICIOUS CONTENT FOUND:")
    print("-" * 50)
    for file_path, content in suspicious_content:
        print(f"CHECK: {file_path}")
        print(f"   {content}")
        print()
    
    print("SUMMARY:")
    print(f"Files with personal info patterns: {len(personal_info_found)}")
    print(f"Sensitive file types: {len(sensitive_files)}")
    print(f"Files with suspicious content: {len(suspicious_content)}")
    
    # Recommendations
    print()
    print("RECOMMENDATIONS:")
    print("-" * 50)
    
    if personal_info_found or sensitive_files or suspicious_content:
        print("PERSONAL INFORMATION FOUND - DO NOT SEND YET!")
        print()
        print("Actions needed:")
        print("1. Remove or sanitize files with personal information")
        print("2. Replace real emails with demo@example.com")
        print("3. Replace API keys with placeholder values")
        print("4. Remove any localhost URLs")
        print("5. Create a clean version of the package")
    else:
        print("Package appears clean - safe to send to buyers!")
    
    return personal_info_found, sensitive_files, suspicious_content

if __name__ == "__main__":
    analyze_personal_info()
