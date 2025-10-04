#!/usr/bin/env python3
"""
Compliance Manager - Legal & Data Quality
=========================================

This module ensures all automation activities comply with legal requirements
and maintain high data quality standards.
"""

import re
import hashlib
import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ComplianceRule:
    name: str
    description: str
    check_function: callable
    severity: str  # 'critical', 'warning', 'info'
    auto_fix: bool = False

class ComplianceManager:
    def __init__(self):
        self.rules = self._initialize_rules()
        self.audit_log = []
        self.data_quality_score = 0
        
    def _initialize_rules(self) -> List[ComplianceRule]:
        """Initialize compliance rules"""
        return [
            # Data Quality Rules
            ComplianceRule(
                name="email_validation",
                description="Validate email format and deliverability",
                check_function=self._check_email_quality,
                severity="critical",
                auto_fix=True
            ),
            ComplianceRule(
                name="phone_validation", 
                description="Validate phone number format",
                check_function=self._check_phone_quality,
                severity="warning",
                auto_fix=True
            ),
            ComplianceRule(
                name="name_validation",
                description="Validate and clean name data",
                check_function=self._check_name_quality,
                severity="warning",
                auto_fix=True
            ),
            
            # Legal Compliance Rules
            ComplianceRule(
                name="gdpr_compliance",
                description="Ensure GDPR compliance for EU data",
                check_function=self._check_gdpr_compliance,
                severity="critical",
                auto_fix=False
            ),
            ComplianceRule(
                name="can_spam_compliance",
                description="Ensure CAN-SPAM Act compliance",
                check_function=self._check_can_spam_compliance,
                severity="critical",
                auto_fix=False
            ),
            ComplianceRule(
                name="linkedin_tos_compliance",
                description="Check LinkedIn Terms of Service compliance",
                check_function=self._check_linkedin_tos,
                severity="critical",
                auto_fix=False
            ),
            
            # Rate Limiting Rules
            ComplianceRule(
                name="rate_limiting",
                description="Enforce rate limiting to prevent account suspension",
                check_function=self._check_rate_limiting,
                severity="critical",
                auto_fix=True
            ),
            ComplianceRule(
                name="data_retention",
                description="Check data retention policies",
                check_function=self._check_data_retention,
                severity="warning",
                auto_fix=True
            )
        ]
    
    def _check_email_quality(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check email quality and deliverability"""
        email = data.get('email', '')
        
        if not email:
            return False, "Email is required", {}
        
        # Basic format validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, email):
            return False, "Invalid email format", {}
        
        # Check for common disposable email domains
        disposable_domains = [
            '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
            'mailinator.com', 'throwaway.email'
        ]
        
        domain = email.split('@')[1].lower()
        if domain in disposable_domains:
            return False, "Disposable email detected", {}
        
        # Check for role-based emails
        role_emails = ['admin', 'info', 'support', 'sales', 'marketing', 'noreply']
        local_part = email.split('@')[0].lower()
        if local_part in role_emails:
            return False, "Role-based email detected", {}
        
        return True, "Email quality check passed", {'email': email}
    
    def _check_phone_quality(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check phone number quality"""
        phone = data.get('phone', '')
        
        if not phone:
            return True, "No phone number provided", {}
        
        # Clean phone number
        cleaned_phone = re.sub(r'[^\d+]', '', phone)
        
        # Check if it's a valid international format
        if not re.match(r'^\+?[1-9]\d{1,14}$', cleaned_phone):
            return False, "Invalid phone number format", {}
        
        return True, "Phone quality check passed", {'phone': cleaned_phone}
    
    def _check_name_quality(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check and clean name data"""
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        
        # Clean names
        first_name = re.sub(r'[^a-zA-Z\s]', '', first_name).title()
        last_name = re.sub(r'[^a-zA-Z\s]', '', last_name).title()
        
        if not first_name or not last_name:
            return False, "Both first and last names are required", {}
        
        if len(first_name) < 2 or len(last_name) < 2:
            return False, "Names must be at least 2 characters", {}
        
        return True, "Name quality check passed", {
            'first_name': first_name,
            'last_name': last_name
        }
    
    def _check_gdpr_compliance(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check GDPR compliance for EU data"""
        # Check if data contains EU identifiers
        country = data.get('country', '').lower()
        eu_countries = [
            'austria', 'belgium', 'bulgaria', 'croatia', 'cyprus', 'czech republic',
            'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary',
            'ireland', 'italy', 'latvia', 'lithuania', 'luxembourg', 'malta',
            'netherlands', 'poland', 'portugal', 'romania', 'slovakia', 'slovenia',
            'spain', 'sweden', 'united kingdom', 'uk'
        ]
        
        if country in eu_countries:
            # Check for required GDPR fields
            required_fields = ['consent_date', 'consent_method', 'data_processing_purpose']
            missing_fields = [field for field in required_fields if not data.get(field)]
            
            if missing_fields:
                return False, f"GDPR compliance missing: {', '.join(missing_fields)}", {}
        
        return True, "GDPR compliance check passed", {}
    
    def _check_can_spam_compliance(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check CAN-SPAM Act compliance"""
        # Check for required CAN-SPAM elements
        required_elements = [
            'unsubscribe_link',
            'physical_address',
            'sender_identification',
            'subject_accuracy'
        ]
        
        missing_elements = [elem for elem in required_elements if not data.get(elem)]
        
        if missing_elements:
            return False, f"CAN-SPAM compliance missing: {', '.join(missing_elements)}", {}
        
        return True, "CAN-SPAM compliance check passed", {}
    
    def _check_linkedin_tos(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check LinkedIn Terms of Service compliance"""
        # Check for LinkedIn-specific compliance
        if data.get('source') == 'linkedin':
            # Ensure we're not scraping private data
            private_fields = ['phone', 'email', 'address']
            has_private_data = any(data.get(field) for field in private_fields)
            
            if has_private_data:
                return False, "LinkedIn TOS: Private data scraping not allowed", {}
        
        return True, "LinkedIn TOS compliance check passed", {}
    
    def _check_rate_limiting(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check rate limiting compliance"""
        # Implement rate limiting logic
        current_time = datetime.now()
        user_id = data.get('user_id', 'default')
        
        # Check if user has exceeded rate limits
        if self._is_rate_limited(user_id, current_time):
            return False, "Rate limit exceeded", {}
        
        return True, "Rate limiting check passed", {}
    
    def _check_data_retention(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Check data retention policies"""
        created_date = data.get('created_at')
        if created_date:
            if isinstance(created_date, str):
                created_date = datetime.fromisoformat(created_date)
            
            # Check if data is older than retention period (2 years)
            retention_period = timedelta(days=730)
            if current_time - created_date > retention_period:
                return False, "Data exceeds retention period", {}
        
        return True, "Data retention check passed", {}
    
    def _is_rate_limited(self, user_id: str, current_time: datetime) -> bool:
        """Check if user is rate limited"""
        # Simple rate limiting implementation
        # In production, use Redis or similar
        return False  # Placeholder
    
    def validate_data(self, data: Dict) -> Dict:
        """Validate data against all compliance rules"""
        results = {
            'valid': True,
            'errors': [],
            'warnings': [],
            'fixed_data': data.copy(),
            'compliance_score': 0
        }
        
        total_checks = len(self.rules)
        passed_checks = 0
        
        for rule in self.rules:
            try:
                is_valid, message, fixed_data = rule.check_function(data)
                
                if is_valid:
                    passed_checks += 1
                    if fixed_data:
                        results['fixed_data'].update(fixed_data)
                else:
                    results['valid'] = False
                    if rule.severity == 'critical':
                        results['errors'].append(f"{rule.name}: {message}")
                    else:
                        results['warnings'].append(f"{rule.name}: {message}")
                
                # Log the check
                self.audit_log.append({
                    'timestamp': datetime.now().isoformat(),
                    'rule': rule.name,
                    'passed': is_valid,
                    'message': message,
                    'data_hash': hashlib.md5(str(data).encode()).hexdigest()[:8]
                })
                
            except Exception as e:
                logger.error(f"Error in rule {rule.name}: {e}")
                results['errors'].append(f"{rule.name}: Check failed - {str(e)}")
        
        results['compliance_score'] = (passed_checks / total_checks) * 100
        return results
    
    def generate_compliance_report(self) -> Dict:
        """Generate compliance report"""
        return {
            'total_checks': len(self.audit_log),
            'passed_checks': sum(1 for log in self.audit_log if log['passed']),
            'failed_checks': sum(1 for log in self.audit_log if not log['passed']),
            'compliance_score': self.data_quality_score,
            'audit_log': self.audit_log[-100:],  # Last 100 entries
            'generated_at': datetime.now().isoformat()
        }

def main():
    """Test the compliance manager"""
    manager = ComplianceManager()
    
    # Test data
    test_data = {
        'email': 'test@example.com',
        'phone': '+1234567890',
        'first_name': 'John',
        'last_name': 'Doe',
        'country': 'United States',
        'source': 'linkedin',
        'created_at': datetime.now().isoformat()
    }
    
    # Validate data
    results = manager.validate_data(test_data)
    
    print("Compliance Check Results:")
    print(f"Valid: {results['valid']}")
    print(f"Compliance Score: {results['compliance_score']:.1f}%")
    print(f"Errors: {len(results['errors'])}")
    print(f"Warnings: {len(results['warnings'])}")
    
    if results['errors']:
        print("\nErrors:")
        for error in results['errors']:
            print(f"  - {error}")
    
    if results['warnings']:
        print("\nWarnings:")
        for warning in results['warnings']:
            print(f"  - {warning}")

if __name__ == "__main__":
    main()
