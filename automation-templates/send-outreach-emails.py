#!/usr/bin/env python3
"""
Send Outreach Emails
====================

This script sends the outreach emails to your generated leads.
Uses your configured email settings.

Author: The AutomatePro
Version: 1.0
"""

import smtplib
import json
import time
import random
from datetime import datetime
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_email_config():
    """Load email configuration"""
    try:
        with open('email-config.py', 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract SMTP config from the file
            import re
            email_match = re.search(r"'email':\s*'([^']+)'", content)
            password_match = re.search(r"'password':\s*'([^']+)'", content)
            
            if email_match and password_match:
                return {
                    'server': 'smtp.gmail.com',
                    'port': 587,
                    'email': email_match.group(1),
                    'password': password_match.group(1)
                }
    except Exception as e:
        logger.error(f"Error loading email config: {e}")
    
    # Fallback to hardcoded config for demo
    return {
        'server': 'smtp.gmail.com',
        'port': 587,
        'email': '5856music@gmail.com',
        'password': 'hkwgbcarmrbdnqpu'
    }

def send_email(to_email, subject, body, smtp_config):
    """Send a single email"""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_config['email']
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add body
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to server
        server = smtplib.SMTP(smtp_config['server'], smtp_config['port'])
        server.starttls()
        server.login(smtp_config['email'], smtp_config['password'])
        
        # Send email
        text = msg.as_string()
        server.sendmail(smtp_config['email'], to_email, text)
        server.quit()
        
        return True
    except Exception as e:
        logger.error(f"Error sending email to {to_email}: {e}")
        return False

def send_outreach_emails(max_emails=10):
    """Send outreach emails to generated leads"""
    logger.info("📧 Starting outreach email campaign")
    
    # Load email configuration
    smtp_config = load_email_config()
    if not smtp_config:
        logger.error("❌ Email configuration not found. Please run configure-credentials.py first.")
        return
    
    # Load outreach emails
    try:
        with open('outreach_emails_20250917_103709.json', 'r') as f:
            outreach_emails = json.load(f)
    except FileNotFoundError:
        logger.error("❌ Outreach emails file not found. Please run quick-lead-generation.py first.")
        return
    
    # Filter high priority leads first
    high_priority_emails = [e for e in outreach_emails if e.get('priority') == 'High']
    other_emails = [e for e in outreach_emails if e.get('priority') != 'High']
    
    # Combine with high priority first
    emails_to_send = high_priority_emails + other_emails
    emails_to_send = emails_to_send[:max_emails]  # Limit to max_emails
    
    logger.info(f"📧 Sending {len(emails_to_send)} outreach emails")
    
    sent_count = 0
    failed_count = 0
    
    for i, email_data in enumerate(emails_to_send, 1):
        try:
            logger.info(f"📧 Sending email {i}/{len(emails_to_send)} to {email_data['lead_name']} ({email_data['company']})")
            
            success = send_email(
                to_email=email_data['to'],
                subject=email_data['subject'],
                body=email_data['body'],
                smtp_config=smtp_config
            )
            
            if success:
                sent_count += 1
                logger.info(f"✅ Email sent successfully to {email_data['lead_name']}")
            else:
                failed_count += 1
                logger.error(f"❌ Failed to send email to {email_data['lead_name']}")
            
            # Rate limiting - wait between emails
            if i < len(emails_to_send):  # Don't wait after the last email
                wait_time = random.randint(30, 60)
                logger.info(f"⏳ Waiting {wait_time} seconds before next email...")
                time.sleep(wait_time)
                
        except Exception as e:
            logger.error(f"Error processing email {i}: {e}")
            failed_count += 1
            continue
    
    # Summary
    logger.info("🎉 Outreach email campaign complete!")
    logger.info(f"✅ Emails sent successfully: {sent_count}")
    logger.info(f"❌ Emails failed: {failed_count}")
    logger.info(f"📊 Success rate: {(sent_count / len(emails_to_send)) * 100:.1f}%")
    
    return {
        'sent': sent_count,
        'failed': failed_count,
        'total': len(emails_to_send)
    }

def main():
    """Main function"""
    logger.info("🚀 Starting Outreach Email Campaign")
    
    # Send emails (limited to 10 for demo)
    results = send_outreach_emails(max_emails=10)
    
    if results:
        logger.info("\n📋 Next Steps:")
        logger.info("1. Monitor email responses and book demo calls")
        logger.info("2. Follow up with prospects who don't respond")
        logger.info("3. Set up your free demo offer on your website")
        logger.info("4. Track conversion rates and optimize")

if __name__ == "__main__":
    main()
