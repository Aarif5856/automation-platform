#!/usr/bin/env python3
"""
Email Campaign Manager - Professional Automation Script
======================================================

This script automates email marketing campaigns by:
1. Managing contact lists and segmentation
2. Creating and sending personalized emails
3. Tracking opens, clicks, and responses
4. Managing follow-up sequences
5. A/B testing email content

Author: AutoBiz
Version: 1.0
License: Commercial Use Allowed
"""

import smtplib
import time
import json
import csv
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime, timedelta
import pandas as pd
import sqlite3
from typing import List, Dict, Optional
import logging
from dataclasses import dataclass
from enum import Enum
import hashlib
import base64

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class CampaignStatus(Enum):
    DRAFT = "draft"
    SCHEDULED = "scheduled"
    RUNNING = "running"
    PAUSED = "paused"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

@dataclass
class Contact:
    email: str
    first_name: str
    last_name: str
    company: str
    title: str
    phone: str
    tags: List[str]
    created_at: datetime
    last_contacted: Optional[datetime] = None
    status: str = "active"
    unsubscribe_token: str = ""

@dataclass
class EmailTemplate:
    id: str
    name: str
    subject: str
    html_content: str
    text_content: str
    created_at: datetime
    variables: List[str]

@dataclass
class Campaign:
    id: str
    name: str
    subject: str
    template_id: str
    contact_list: List[str]
    status: CampaignStatus
    scheduled_time: Optional[datetime]
    created_at: datetime
    sent_count: int = 0
    open_count: int = 0
    click_count: int = 0
    reply_count: int = 0

class EmailCampaignManager:
    def __init__(self, smtp_server: str, smtp_port: int, email: str, password: str):
        """
        Initialize the Email Campaign Manager
        
        Args:
            smtp_server: SMTP server address
            smtp_port: SMTP server port
            email: Sender email address
            password: Email password or app password
        """
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.email = email
        self.password = password
        self.db_path = "email_campaigns.db"
        self.setup_database()
        
    def setup_database(self):
        """Setup SQLite database for storing campaign data"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contacts (
                email TEXT PRIMARY KEY,
                first_name TEXT,
                last_name TEXT,
                company TEXT,
                title TEXT,
                phone TEXT,
                tags TEXT,
                created_at TIMESTAMP,
                last_contacted TIMESTAMP,
                status TEXT DEFAULT 'active',
                unsubscribe_token TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS email_templates (
                id TEXT PRIMARY KEY,
                name TEXT,
                subject TEXT,
                html_content TEXT,
                text_content TEXT,
                created_at TIMESTAMP,
                variables TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS campaigns (
                id TEXT PRIMARY KEY,
                name TEXT,
                subject TEXT,
                template_id TEXT,
                contact_list TEXT,
                status TEXT,
                scheduled_time TIMESTAMP,
                created_at TIMESTAMP,
                sent_count INTEGER DEFAULT 0,
                open_count INTEGER DEFAULT 0,
                click_count INTEGER DEFAULT 0,
                reply_count INTEGER DEFAULT 0
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS email_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                campaign_id TEXT,
                contact_email TEXT,
                event_type TEXT,
                timestamp TIMESTAMP,
                data TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")
    
    def add_contact(self, contact: Contact) -> bool:
        """Add a new contact to the database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Generate unsubscribe token
            token = self.generate_unsubscribe_token(contact.email)
            contact.unsubscribe_token = token
            
            cursor.execute('''
                INSERT OR REPLACE INTO contacts 
                (email, first_name, last_name, company, title, phone, tags, 
                 created_at, last_contacted, status, unsubscribe_token)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                contact.email, contact.first_name, contact.last_name,
                contact.company, contact.title, contact.phone,
                json.dumps(contact.tags), contact.created_at,
                contact.last_contacted, contact.status, contact.unsubscribe_token
            ))
            
            conn.commit()
            conn.close()
            logger.info(f"Contact added: {contact.email}")
            return True
            
        except Exception as e:
            logger.error(f"Error adding contact: {e}")
            return False
    
    def import_contacts_from_csv(self, csv_file: str) -> int:
        """Import contacts from CSV file"""
        try:
            df = pd.read_csv(csv_file)
            imported_count = 0
            
            for _, row in df.iterrows():
                contact = Contact(
                    email=row.get('email', ''),
                    first_name=row.get('first_name', ''),
                    last_name=row.get('last_name', ''),
                    company=row.get('company', ''),
                    title=row.get('title', ''),
                    phone=row.get('phone', ''),
                    tags=row.get('tags', '').split(',') if row.get('tags') else [],
                    created_at=datetime.now()
                )
                
                if self.add_contact(contact):
                    imported_count += 1
            
            logger.info(f"Imported {imported_count} contacts from {csv_file}")
            return imported_count
            
        except Exception as e:
            logger.error(f"Error importing contacts: {e}")
            return 0
    
    def create_email_template(self, template: EmailTemplate) -> bool:
        """Create a new email template"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT OR REPLACE INTO email_templates 
                (id, name, subject, html_content, text_content, created_at, variables)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                template.id, template.name, template.subject,
                template.html_content, template.text_content,
                template.created_at, json.dumps(template.variables)
            ))
            
            conn.commit()
            conn.close()
            logger.info(f"Email template created: {template.name}")
            return True
            
        except Exception as e:
            logger.error(f"Error creating email template: {e}")
            return False
    
    def create_campaign(self, campaign: Campaign) -> bool:
        """Create a new email campaign"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT OR REPLACE INTO campaigns 
                (id, name, subject, template_id, contact_list, status, 
                 scheduled_time, created_at, sent_count, open_count, click_count, reply_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                campaign.id, campaign.name, campaign.subject, campaign.template_id,
                json.dumps(campaign.contact_list), campaign.status.value,
                campaign.scheduled_time, campaign.created_at,
                campaign.sent_count, campaign.open_count, campaign.click_count, campaign.reply_count
            ))
            
            conn.commit()
            conn.close()
            logger.info(f"Campaign created: {campaign.name}")
            return True
            
        except Exception as e:
            logger.error(f"Error creating campaign: {e}")
            return False
    
    def get_contacts_by_tags(self, tags: List[str]) -> List[Contact]:
        """Get contacts filtered by tags"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Build query for tag filtering
            tag_conditions = []
            params = []
            
            for tag in tags:
                tag_conditions.append("tags LIKE ?")
                params.append(f"%{tag}%")
            
            query = f"SELECT * FROM contacts WHERE status = 'active'"
            if tag_conditions:
                query += f" AND ({' OR '.join(tag_conditions)})"
            
            cursor.execute(query, params)
            rows = cursor.fetchall()
            
            contacts = []
            for row in rows:
                contact = Contact(
                    email=row[0],
                    first_name=row[1],
                    last_name=row[2],
                    company=row[3],
                    title=row[4],
                    phone=row[5],
                    tags=json.loads(row[6]) if row[6] else [],
                    created_at=datetime.fromisoformat(row[7]),
                    last_contacted=datetime.fromisoformat(row[8]) if row[8] else None,
                    status=row[9],
                    unsubscribe_token=row[10]
                )
                contacts.append(contact)
            
            conn.close()
            return contacts
            
        except Exception as e:
            logger.error(f"Error getting contacts by tags: {e}")
            return []
    
    def send_email(self, to_email: str, subject: str, html_content: str, 
                   text_content: str, campaign_id: str = None) -> bool:
        """Send a single email"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = self.email
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Add text and HTML parts
            text_part = MIMEText(text_content, 'plain')
            html_part = MIMEText(html_content, 'html')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Connect to SMTP server and send
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.email, self.password)
                server.send_message(msg)
            
            # Log email event
            if campaign_id:
                self.log_email_event(campaign_id, to_email, 'sent')
            
            logger.info(f"Email sent to: {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Error sending email to {to_email}: {e}")
            return False
    
    def send_campaign(self, campaign_id: str, delay_between_emails: int = 1) -> bool:
        """Send an email campaign"""
        try:
            # Get campaign details
            campaign = self.get_campaign(campaign_id)
            if not campaign:
                logger.error(f"Campaign not found: {campaign_id}")
                return False
            
            # Get template
            template = self.get_template(campaign.template_id)
            if not template:
                logger.error(f"Template not found: {campaign.template_id}")
                return False
            
            # Get contacts
            contacts = self.get_contacts_by_emails(campaign.contact_list)
            if not contacts:
                logger.error("No contacts found for campaign")
                return False
            
            # Update campaign status
            self.update_campaign_status(campaign_id, CampaignStatus.RUNNING)
            
            sent_count = 0
            for contact in contacts:
                try:
                    # Personalize email content
                    personalized_html = self.personalize_content(template.html_content, contact)
                    personalized_text = self.personalize_content(template.text_content, contact)
                    personalized_subject = self.personalize_content(campaign.subject, contact)
                    
                    # Send email
                    if self.send_email(contact.email, personalized_subject, 
                                     personalized_html, personalized_text, campaign_id):
                        sent_count += 1
                        
                        # Update contact's last contacted time
                        self.update_contact_last_contacted(contact.email)
                        
                        # Add delay between emails
                        time.sleep(delay_between_emails)
                    
                except Exception as e:
                    logger.error(f"Error sending email to {contact.email}: {e}")
                    continue
            
            # Update campaign statistics
            self.update_campaign_stats(campaign_id, sent_count=sent_count)
            self.update_campaign_status(campaign_id, CampaignStatus.COMPLETED)
            
            logger.info(f"Campaign {campaign_id} completed. Sent {sent_count} emails")
            return True
            
        except Exception as e:
            logger.error(f"Error sending campaign: {e}")
            return False
    
    def personalize_content(self, content: str, contact: Contact) -> str:
        """Personalize email content with contact data"""
        try:
            personalized = content
            
            # Replace common variables
            replacements = {
                '{{first_name}}': contact.first_name,
                '{{last_name}}': contact.last_name,
                '{{full_name}}': f"{contact.first_name} {contact.last_name}",
                '{{company}}': contact.company,
                '{{title}}': contact.title,
                '{{email}}': contact.email,
                '{{phone}}': contact.phone
            }
            
            for placeholder, value in replacements.items():
                personalized = personalized.replace(placeholder, str(value))
            
            return personalized
            
        except Exception as e:
            logger.error(f"Error personalizing content: {e}")
            return content
    
    def generate_unsubscribe_token(self, email: str) -> str:
        """Generate unsubscribe token for email"""
        data = f"{email}{datetime.now().isoformat()}"
        return hashlib.sha256(data.encode()).hexdigest()
    
    def log_email_event(self, campaign_id: str, contact_email: str, 
                       event_type: str, data: str = ""):
        """Log email events for tracking"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO email_events 
                (campaign_id, contact_email, event_type, timestamp, data)
                VALUES (?, ?, ?, ?, ?)
            ''', (campaign_id, contact_email, event_type, datetime.now(), data))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            logger.error(f"Error logging email event: {e}")
    
    def get_campaign_stats(self, campaign_id: str) -> Dict:
        """Get campaign statistics"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get campaign details
            cursor.execute("SELECT * FROM campaigns WHERE id = ?", (campaign_id,))
            campaign_row = cursor.fetchone()
            
            if not campaign_row:
                return {}
            
            # Get event counts
            cursor.execute('''
                SELECT event_type, COUNT(*) 
                FROM email_events 
                WHERE campaign_id = ? 
                GROUP BY event_type
            ''', (campaign_id,))
            
            events = dict(cursor.fetchall())
            
            conn.close()
            
            return {
                'campaign_id': campaign_id,
                'sent': events.get('sent', 0),
                'opened': events.get('opened', 0),
                'clicked': events.get('clicked', 0),
                'replied': events.get('replied', 0),
                'bounced': events.get('bounced', 0)
            }
            
        except Exception as e:
            logger.error(f"Error getting campaign stats: {e}")
            return {}
    
    def create_sample_templates(self):
        """Create sample email templates"""
        templates = [
            EmailTemplate(
                id="welcome_email",
                name="Welcome Email",
                subject="Welcome to {{company}}, {{first_name}}!",
                html_content="""
                <html>
                <body>
                    <h2>Welcome {{first_name}}!</h2>
                    <p>Thank you for joining {{company}}. We're excited to have you on board!</p>
                    <p>Here's what you can expect:</p>
                    <ul>
                        <li>Weekly updates on our latest features</li>
                        <li>Exclusive tips and resources</li>
                        <li>Direct access to our support team</li>
                    </ul>
                    <p>Best regards,<br>The {{company}} Team</p>
                </body>
                </html>
                """,
                text_content="""
                Welcome {{first_name}}!
                
                Thank you for joining {{company}}. We're excited to have you on board!
                
                Here's what you can expect:
                - Weekly updates on our latest features
                - Exclusive tips and resources
                - Direct access to our support team
                
                Best regards,
                The {{company}} Team
                """,
                created_at=datetime.now(),
                variables=["first_name", "company"]
            ),
            EmailTemplate(
                id="follow_up",
                name="Follow-up Email",
                subject="Following up on our conversation, {{first_name}}",
                html_content="""
                <html>
                <body>
                    <h2>Hi {{first_name}},</h2>
                    <p>I wanted to follow up on our conversation about {{company}}'s needs.</p>
                    <p>I have some ideas that could help you achieve your goals. Would you be interested in a brief call this week?</p>
                    <p>Best regards,<br>{{first_name}}</p>
                </body>
                </html>
                """,
                text_content="""
                Hi {{first_name}},
                
                I wanted to follow up on our conversation about {{company}}'s needs.
                
                I have some ideas that could help you achieve your goals. Would you be interested in a brief call this week?
                
                Best regards,
                {{first_name}}
                """,
                created_at=datetime.now(),
                variables=["first_name", "company"]
            )
        ]
        
        for template in templates:
            self.create_email_template(template)
        
        logger.info("Sample templates created successfully")

def main():
    """Main function to demonstrate the Email Campaign Manager"""
    
    # Configuration
    config = {
        'smtp_server': 'smtp.gmail.com',
        'smtp_port': 587,
        'email': 'your-email@gmail.com',
        'password': 'your-app-password'
    }
    
    # Initialize manager
    manager = EmailCampaignManager(
        smtp_server=config['smtp_server'],
        smtp_port=config['smtp_port'],
        email=config['email'],
        password=config['password']
    )
    
    try:
        # Create sample templates
        manager.create_sample_templates()
        
        # Import contacts from CSV
        manager.import_contacts_from_csv('contacts.csv')
        
        # Create a campaign
        campaign = Campaign(
            id="welcome_campaign_001",
            name="Welcome Campaign",
            subject="Welcome to AutoBiz, {{first_name}}!",
            template_id="welcome_email",
            contact_list=["contact1@example.com", "contact2@example.com"],
            status=CampaignStatus.DRAFT,
            scheduled_time=None,
            created_at=datetime.now()
        )
        
        manager.create_campaign(campaign)
        
        # Send campaign
        manager.send_campaign("welcome_campaign_001")
        
        # Get campaign stats
        stats = manager.get_campaign_stats("welcome_campaign_001")
        logger.info(f"Campaign stats: {stats}")
        
    except Exception as e:
        logger.error(f"Error in main execution: {e}")

if __name__ == "__main__":
    main()
