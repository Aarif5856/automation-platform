#!/usr/bin/env python3
"""
Email Campaign Manager Configuration
===================================

This file contains the configuration for email marketing campaigns.
Updated on: 2025-01-27 10:30:00

IMPORTANT: Replace the placeholder credentials below with your actual email account details.
For Gmail, use an App Password instead of your regular password.
"""

# SMTP Configuration
# ⚠️ REPLACE THESE WITH YOUR ACTUAL EMAIL CREDENTIALS ⚠️
SMTP_CONFIG = {
    'server': 'smtp.gmail.com',           # Gmail SMTP server
    'port': 587,                          # Gmail SMTP port
    'email': '5856music@gmail.com',      # Replace with your Gmail address
    'password': 'hkwgbcarmrbdnqpu',      # Replace with your Gmail App Password
    'use_tls': True
}

# Alternative SMTP Providers
SMTP_PROVIDERS = {
    'gmail': {
        'server': 'smtp.gmail.com',
        'port': 587,
        'use_tls': True
    },
    'outlook': {
        'server': 'smtp-mail.outlook.com',
        'port': 587,
        'use_tls': True
    },
    'yahoo': {
        'server': 'smtp.mail.yahoo.com',
        'port': 587,
        'use_tls': True
    },
    'custom': {
        'server': 'your-smtp-server.com',
        'port': 587,
        'use_tls': True
    }
}

# Email Campaign Settings
CAMPAIGN_CONFIG = {
    'delay_between_emails': 1,  # Seconds between sending emails
    'max_emails_per_hour': 100,  # Rate limiting
    'retry_failed_emails': True,
    'max_retries': 3,
    'track_opens': True,
    'track_clicks': True
}

# Email Templates Directory
TEMPLATES_DIR = 'email_templates'

# Database Configuration
DATABASE_CONFIG = {
    'path': 'email_campaigns.db',
    'backup_enabled': True,
    'backup_interval': 24  # Hours
}

# Unsubscribe Configuration
UNSUBSCRIBE_CONFIG = {
    'enabled': True,
    'unsubscribe_url': 'https://the-automatepro.info/unsubscribe',
    'token_length': 32
}

# Email Validation
EMAIL_VALIDATION = {
    'enabled': True,
    'check_syntax': True,
    'check_domain': True,
    'check_mx_record': True
}

# Bounce Handling
BOUNCE_HANDLING = {
    'enabled': True,
    'soft_bounce_retry': 3,
    'hard_bounce_remove': True,
    'bounce_threshold': 5  # Remove after 5 bounces
}

# Analytics Configuration
ANALYTICS_CONFIG = {
    'track_opens': True,
    'track_clicks': True,
    'track_replies': True,
    'track_bounces': True,
    'google_analytics_id': 'GA-XXXXXXXXX'  # Optional
}

# Compliance Settings
COMPLIANCE_CONFIG = {
    'include_unsubscribe': True,
    'include_physical_address': True,
    'physical_address': '820 street 33 zone 29 building, Al Markhiya, Doha, Qatar',
    'company_name': 'The AutomatePro',
    'comply_with_can_spam': True,
    'comply_with_gdpr': True
}

# Testing Configuration
TESTING_CONFIG = {
    'test_mode': False,  # Set to True for testing
    'test_email': 'test@example.com',
    'dry_run': False  # Set to True to simulate sending
}

# Rate Limiting (Important for avoiding account suspension)
RATE_LIMITS = {
    'emails_per_hour': 100,      # Maximum emails per hour
    'emails_per_day': 500,       # Maximum emails per day
    'campaigns_per_day': 10,     # Maximum campaigns per day
    'contacts_per_campaign': 1000  # Maximum contacts per campaign
}

# Safety Settings
SAFETY_CONFIG = {
    'respect_rate_limits': True,
    'warm_up_mode': True,        # Gradually increase sending volume
    'monitor_bounce_rate': True,
    'auto_pause_on_high_bounces': True,
    'bounce_rate_threshold': 5   # Pause if bounce rate exceeds 5%
}

# Logging Configuration
LOGGING_CONFIG = {
    'log_level': 'INFO',
    'log_file': 'email_campaigns.log',
    'log_rotation': True,
    'max_log_size': '10MB'
}