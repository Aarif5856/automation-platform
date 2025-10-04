#!/usr/bin/env python3
"""
LinkedIn Lead Generator Configuration
====================================

This file contains the configuration for LinkedIn lead generation.
Updated on: 2025-01-27 10:30:00

IMPORTANT: Replace the placeholder credentials below with your actual LinkedIn account details.
Use a dedicated LinkedIn account for automation to avoid any issues with your personal account.
"""

# LinkedIn Credentials
# ⚠️ REPLACE THESE WITH YOUR ACTUAL LINKEDIN CREDENTIALS ⚠️
LINKEDIN_EMAIL = "5856music@gmail.com"  # Replace with your LinkedIn email
LINKEDIN_PASSWORD = "893353100v"        # Replace with your LinkedIn password

# LinkedIn Search Configuration
SEARCH_CONFIG = {
    'keywords': 'CEO OR Founder OR Owner OR Director',
    'location': 'United States',
    'industry': 'Technology',
    'company_size': '51-200',
    'max_profiles': 100,
    'headless': False  # Set to True for production (runs without browser window)
}

# Proxy Configuration (Optional)
PROXY_LIST = [
    # Add your proxy servers here if needed
    # "http://proxy1:port",
    # "http://proxy2:port"
]

# User Agents (Optional)
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
]

# Delay Configuration
DELAY_RANGE = (2, 5)  # Random delay between actions (min, max) seconds
PAGE_LOAD_DELAY = 3   # Delay after page load
ACTION_DELAY = 1      # Delay between individual actions

# Output Configuration
OUTPUT_FORMATS = ['csv', 'json', 'excel']
OUTPUT_FILENAME = 'linkedin_leads'

# Email Finding Configuration
EMAIL_PATTERNS = [
    "{first_name}.{last_name}@{company}.com",
    "{first_name}@{company}.com",
    "{first_name}{last_name}@{company}.com",
    "{first_name[0]}.{last_name}@{company}.com"
]

# Verification Settings
VERIFY_EMAILS = True
USE_EXTERNAL_EMAIL_FINDER = False  # Set to True if you have Hunter.io or similar API

# External Email Finder API (Optional)
EMAIL_FINDER_API_KEY = "your-api-key-here"
EMAIL_FINDER_SERVICE = "hunter"  # Options: hunter, findthatemail, etc.

# Rate Limiting (Important for avoiding account suspension)
RATE_LIMITS = {
    'profiles_per_hour': 50,      # Maximum profiles to scrape per hour
    'searches_per_hour': 20,      # Maximum searches per hour
    'connections_per_day': 100,   # Maximum connection requests per day
    'messages_per_day': 50        # Maximum messages per day
}

# Safety Settings
SAFETY_CONFIG = {
    'respect_rate_limits': True,
    'random_delays': True,
    'human_like_behavior': True,
    'avoid_suspicious_patterns': True,
    'max_session_duration': 3600  # Maximum session duration in seconds (1 hour)
}

# Logging Configuration
LOGGING_CONFIG = {
    'log_level': 'INFO',
    'log_file': 'linkedin_scraper.log',
    'log_rotation': True,
    'max_log_size': '10MB'
}