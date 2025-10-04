#!/usr/bin/env python3
"""
Email Deliverability Manager
===========================

This module handles email deliverability, anti-spam measures, and
compliance to ensure high inbox placement rates.
"""

import smtplib
import time
import random
import hashlib
import dns.resolver
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailDeliverabilityManager:
    def __init__(self):
        self.spam_keywords = self._load_spam_keywords()
        self.deliverability_rules = self._load_deliverability_rules()
        self.warmup_schedule = {}
        self.bounce_tracker = {}
        
    def _load_spam_keywords(self) -> List[str]:
        """Load spam trigger keywords"""
        return [
            'free', 'urgent', 'act now', 'limited time', 'click here',
            'buy now', 'special offer', 'no cost', 'guarantee',
            'congratulations', 'winner', 'cash', 'money back',
            'risk-free', 'no obligation', 'expires', 'today only'
        ]
    
    def _load_deliverability_rules(self) -> Dict:
        """Load email deliverability rules"""
        return {
            'max_subject_length': 50,
            'max_body_length': 10000,
            'min_body_length': 50,
            'max_links': 3,
            'max_images': 2,
            'required_elements': ['unsubscribe', 'physical_address'],
            'spam_score_threshold': 5.0
        }
    
    def check_deliverability(self, email_data: Dict) -> Dict:
        """Check email deliverability score"""
        score = 0
        issues = []
        recommendations = []
        
        # Check subject line
        subject = email_data.get('subject', '')
        if len(subject) > self.deliverability_rules['max_subject_length']:
            score += 2
            issues.append("Subject line too long")
            recommendations.append("Keep subject under 50 characters")
        
        # Check for spam keywords
        spam_count = sum(1 for keyword in self.spam_keywords 
                        if keyword.lower() in subject.lower())
        if spam_count > 0:
            score += spam_count * 2
            issues.append(f"Contains {spam_count} spam keywords")
            recommendations.append("Remove spam trigger words")
        
        # Check body content
        body = email_data.get('body', '')
        if len(body) < self.deliverability_rules['min_body_length']:
            score += 3
            issues.append("Email body too short")
            recommendations.append("Add more meaningful content")
        
        # Check for required elements
        for element in self.deliverability_rules['required_elements']:
            if element not in body.lower():
                score += 2
                issues.append(f"Missing required element: {element}")
                recommendations.append(f"Add {element} to comply with regulations")
        
        # Check link count
        link_count = body.count('http')
        if link_count > self.deliverability_rules['max_links']:
            score += 1
            issues.append("Too many links")
            recommendations.append("Reduce number of links")
        
        # Check domain reputation
        domain_reputation = self._check_domain_reputation(email_data.get('from_domain', ''))
        if domain_reputation < 0.7:
            score += 3
            issues.append("Poor domain reputation")
            recommendations.append("Improve domain reputation or use different domain")
        
        # Calculate final score
        deliverability_score = max(0, 10 - score)
        
        return {
            'deliverability_score': deliverability_score,
            'spam_score': score,
            'issues': issues,
            'recommendations': recommendations,
            'status': 'good' if deliverability_score >= 7 else 'needs_improvement'
        }
    
    def _check_domain_reputation(self, domain: str) -> float:
        """Check domain reputation (simplified)"""
        if not domain:
            return 0.5
        
        # Check SPF record
        try:
            spf_record = dns.resolver.resolve(domain, 'TXT')
            has_spf = any('v=spf1' in str(record) for record in spf_record)
        except:
            has_spf = False
        
        # Check DKIM record
        try:
            dkim_record = dns.resolver.resolve(f'default._domainkey.{domain}', 'TXT')
            has_dkim = any('v=DKIM1' in str(record) for record in dkim_record)
        except:
            has_dkim = False
        
        # Check DMARC record
        try:
            dmarc_record = dns.resolver.resolve(f'_dmarc.{domain}', 'TXT')
            has_dmarc = any('v=DMARC1' in str(record) for record in dmarc_record)
        except:
            has_dmarc = False
        
        # Calculate reputation score
        reputation = 0.3  # Base score
        if has_spf:
            reputation += 0.2
        if has_dkim:
            reputation += 0.3
        if has_dmarc:
            reputation += 0.2
        
        return min(1.0, reputation)
    
    def optimize_email(self, email_data: Dict) -> Dict:
        """Optimize email for better deliverability"""
        optimized = email_data.copy()
        
        # Optimize subject line
        subject = optimized.get('subject', '')
        if len(subject) > self.deliverability_rules['max_subject_length']:
            optimized['subject'] = subject[:47] + '...'
        
        # Remove spam keywords
        for keyword in self.spam_keywords:
            optimized['subject'] = optimized['subject'].replace(keyword, '')
            optimized['body'] = optimized['body'].replace(keyword, '')
        
        # Ensure required elements
        body = optimized.get('body', '')
        if 'unsubscribe' not in body.lower():
            body += '\n\nUnsubscribe: [UNSUBSCRIBE_LINK]'
        if 'physical_address' not in body.lower():
            body += '\n\nPhysical Address: 820 street 33 zone 29 building, Al Markhiya, Doha, Qatar'
        
        optimized['body'] = body
        
        # Add tracking pixel (optional)
        if 'tracking_pixel' not in body:
            tracking_pixel = f'<img src="https://the-automatepro.info/track/{hashlib.md5(email_data.get("to", "").encode()).hexdigest()}" width="1" height="1" style="display:none;">'
            optimized['body'] = body.replace('</body>', f'{tracking_pixel}</body>')
        
        return optimized
    
    def setup_warmup_sequence(self, email: str, duration_days: int = 30) -> Dict:
        """Set up email warmup sequence"""
        warmup_plan = {
            'email': email,
            'start_date': datetime.now().isoformat(),
            'duration_days': duration_days,
            'daily_limits': [],
            'total_emails': 0
        }
        
        # Calculate daily sending limits
        for day in range(duration_days):
            if day < 7:  # Week 1: Very conservative
                daily_limit = random.randint(5, 15)
            elif day < 14:  # Week 2: Gradual increase
                daily_limit = random.randint(15, 30)
            elif day < 21:  # Week 3: More aggressive
                daily_limit = random.randint(30, 50)
            else:  # Week 4+: Full capacity
                daily_limit = random.randint(50, 100)
            
            warmup_plan['daily_limits'].append({
                'day': day + 1,
                'limit': daily_limit,
                'sent': 0
            })
            warmup_plan['total_emails'] += daily_limit
        
        self.warmup_schedule[email] = warmup_plan
        return warmup_plan
    
    def check_warmup_status(self, email: str) -> Dict:
        """Check warmup status for an email"""
        if email not in self.warmup_schedule:
            return {'status': 'not_started', 'message': 'No warmup sequence found'}
        
        plan = self.warmup_schedule[email]
        current_day = (datetime.now() - datetime.fromisoformat(plan['start_date'])).days + 1
        
        if current_day > plan['duration_days']:
            return {'status': 'completed', 'message': 'Warmup sequence completed'}
        
        daily_limit = plan['daily_limits'][current_day - 1]['limit']
        sent_today = plan['daily_limits'][current_day - 1]['sent']
        
        return {
            'status': 'in_progress',
            'current_day': current_day,
            'total_days': plan['duration_days'],
            'daily_limit': daily_limit,
            'sent_today': sent_today,
            'remaining_today': max(0, daily_limit - sent_today)
        }
    
    def handle_bounce(self, email: str, bounce_type: str, bounce_reason: str) -> Dict:
        """Handle email bounces"""
        if email not in self.bounce_tracker:
            self.bounce_tracker[email] = {
                'total_bounces': 0,
                'hard_bounces': 0,
                'soft_bounces': 0,
                'last_bounce': None,
                'status': 'active'
            }
        
        tracker = self.bounce_tracker[email]
        tracker['total_bounces'] += 1
        tracker['last_bounce'] = datetime.now().isoformat()
        
        if bounce_type == 'hard':
            tracker['hard_bounces'] += 1
            if tracker['hard_bounces'] >= 3:
                tracker['status'] = 'blocked'
                return {'action': 'remove_from_list', 'reason': 'Too many hard bounces'}
        else:
            tracker['soft_bounces'] += 1
            if tracker['soft_bounces'] >= 5:
                tracker['status'] = 'suspended'
                return {'action': 'suspend_temporarily', 'reason': 'Too many soft bounces'}
        
        return {'action': 'continue', 'reason': 'Bounce handled'}
    
    def generate_deliverability_report(self, email_data: Dict) -> Dict:
        """Generate comprehensive deliverability report"""
        deliverability = self.check_deliverability(email_data)
        optimized = self.optimize_email(email_data)
        
        return {
            'original_score': deliverability['deliverability_score'],
            'optimized_score': self.check_deliverability(optimized)['deliverability_score'],
            'improvements': deliverability['recommendations'],
            'optimized_email': optimized,
            'domain_reputation': self._check_domain_reputation(email_data.get('from_domain', '')),
            'compliance_status': 'compliant' if deliverability['deliverability_score'] >= 7 else 'needs_improvement',
            'generated_at': datetime.now().isoformat()
        }

def main():
    """Test the deliverability manager"""
    manager = EmailDeliverabilityManager()
    
    # Test email data
    test_email = {
        'subject': 'Free Money! Act Now! Limited Time Offer!',
        'body': 'Click here to get free money! No cost! Guaranteed!',
        'from_domain': 'example.com',
        'to': 'test@example.com'
    }
    
    # Check deliverability
    report = manager.generate_deliverability_report(test_email)
    
    print("Email Deliverability Report:")
    print(f"Original Score: {report['original_score']}/10")
    print(f"Optimized Score: {report['optimized_score']}/10")
    print(f"Domain Reputation: {report['domain_reputation']:.2f}")
    print(f"Compliance Status: {report['compliance_status']}")
    
    print("\nOptimizations Applied:")
    for improvement in report['improvements']:
        print(f"  - {improvement}")

if __name__ == "__main__":
    main()
