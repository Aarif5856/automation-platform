#!/usr/bin/env python3
"""
Security & Scalability Manager
==============================

This module handles security, scalability, and performance optimization
for the automation business platform.
"""

import hashlib
import hmac
import secrets
import time
import json
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
import logging
from dataclasses import dataclass
import jwt
import bcrypt
from functools import wraps
import redis
import asyncio
from concurrent.futures import ThreadPoolExecutor
import psutil
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class SecurityConfig:
    jwt_secret: str
    encryption_key: str
    rate_limit_requests: int = 100
    rate_limit_window: int = 3600  # 1 hour
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    session_timeout: int = 3600  # 1 hour
    password_min_length: int = 8
    require_2fa: bool = False

@dataclass
class User:
    id: str
    email: str
    password_hash: str
    role: str
    permissions: List[str]
    created_at: datetime
    last_login: Optional[datetime] = None
    is_active: bool = True
    failed_login_attempts: int = 0
    locked_until: Optional[datetime] = None

class SecurityManager:
    def __init__(self, config: SecurityConfig):
        self.config = config
        self.redis_client = self._setup_redis()
        self.rate_limits = {}
        self.audit_log = []
        
    def _setup_redis(self) -> Optional[redis.Redis]:
        """Setup Redis connection for caching and rate limiting"""
        try:
            return redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        except:
            logger.warning("Redis not available, using in-memory storage")
            return None
    
    def hash_password(self, password: str) -> str:
        """Hash password using bcrypt"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def verify_password(self, password: str, password_hash: str) -> bool:
        """Verify password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
    def generate_jwt_token(self, user_id: str, role: str, expires_in: int = 3600) -> str:
        """Generate JWT token"""
        payload = {
            'user_id': user_id,
            'role': role,
            'exp': datetime.utcnow().timestamp() + expires_in,
            'iat': datetime.utcnow().timestamp()
        }
        return jwt.encode(payload, self.config.jwt_secret, algorithm='HS256')
    
    def verify_jwt_token(self, token: str) -> Optional[Dict]:
        """Verify JWT token"""
        try:
            payload = jwt.decode(token, self.config.jwt_secret, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def check_rate_limit(self, identifier: str, endpoint: str) -> Tuple[bool, Dict]:
        """Check rate limit for identifier and endpoint"""
        key = f"rate_limit:{identifier}:{endpoint}"
        current_time = time.time()
        
        if self.redis_client:
            # Use Redis for distributed rate limiting
            pipe = self.redis_client.pipeline()
            pipe.incr(key)
            pipe.expire(key, self.config.rate_limit_window)
            results = pipe.execute()
            
            current_count = results[0]
        else:
            # Use in-memory rate limiting
            if key not in self.rate_limits:
                self.rate_limits[key] = {'count': 0, 'window_start': current_time}
            
            rate_data = self.rate_limits[key]
            
            # Reset window if expired
            if current_time - rate_data['window_start'] > self.config.rate_limit_window:
                rate_data['count'] = 0
                rate_data['window_start'] = current_time
            
            rate_data['count'] += 1
            current_count = rate_data['count']
        
        is_allowed = current_count <= self.config.rate_limit_requests
        
        return is_allowed, {
            'limit': self.config.rate_limit_requests,
            'remaining': max(0, self.config.rate_limit_requests - current_count),
            'reset_time': current_time + self.config.rate_limit_window
        }
    
    def log_security_event(self, event_type: str, user_id: str, details: Dict):
        """Log security event"""
        event = {
            'timestamp': datetime.now().isoformat(),
            'event_type': event_type,
            'user_id': user_id,
            'details': details,
            'ip_address': details.get('ip_address'),
            'user_agent': details.get('user_agent')
        }
        
        self.audit_log.append(event)
        
        # Store in database
        self._store_audit_event(event)
        
        # Alert on critical events
        if event_type in ['failed_login', 'suspicious_activity', 'data_breach']:
            self._send_security_alert(event)
    
    def _store_audit_event(self, event: Dict):
        """Store audit event in database"""
        conn = sqlite3.connect('security_audit.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS audit_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TIMESTAMP,
                event_type TEXT,
                user_id TEXT,
                details TEXT,
                ip_address TEXT,
                user_agent TEXT
            )
        ''')
        
        cursor.execute('''
            INSERT INTO audit_events 
            (timestamp, event_type, user_id, details, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            event['timestamp'],
            event['event_type'],
            event['user_id'],
            json.dumps(event['details']),
            event.get('ip_address'),
            event.get('user_agent')
        ))
        
        conn.commit()
        conn.close()
    
    def _send_security_alert(self, event: Dict):
        """Send security alert"""
        logger.warning(f"SECURITY ALERT: {event['event_type']} - {event['details']}")
        # In production, send to monitoring system or email
    
    def validate_input(self, data: Dict, schema: Dict) -> Tuple[bool, List[str]]:
        """Validate input data against schema"""
        errors = []
        
        for field, rules in schema.items():
            value = data.get(field)
            
            if 'required' in rules and rules['required'] and not value:
                errors.append(f"{field} is required")
                continue
            
            if value and 'type' in rules:
                if rules['type'] == 'email' and '@' not in str(value):
                    errors.append(f"{field} must be a valid email")
                elif rules['type'] == 'phone' and not self._is_valid_phone(str(value)):
                    errors.append(f"{field} must be a valid phone number")
                elif rules['type'] == 'url' and not self._is_valid_url(str(value)):
                    errors.append(f"{field} must be a valid URL")
            
            if value and 'min_length' in rules and len(str(value)) < rules['min_length']:
                errors.append(f"{field} must be at least {rules['min_length']} characters")
            
            if value and 'max_length' in rules and len(str(value)) > rules['max_length']:
                errors.append(f"{field} must be no more than {rules['max_length']} characters")
        
        return len(errors) == 0, errors
    
    def _is_valid_phone(self, phone: str) -> bool:
        """Validate phone number format"""
        import re
        pattern = r'^\+?[1-9]\d{1,14}$'
        return bool(re.match(pattern, phone.replace(' ', '').replace('-', '')))
    
    def _is_valid_url(self, url: str) -> bool:
        """Validate URL format"""
        import re
        pattern = r'^https?://(?:[-\w.])+(?:[:\d]+)?(?:/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?)?$'
        return bool(re.match(pattern, url))
    
    def encrypt_sensitive_data(self, data: str) -> str:
        """Encrypt sensitive data"""
        from cryptography.fernet import Fernet
        key = self.config.encryption_key.encode()
        f = Fernet(key)
        return f.encrypt(data.encode()).decode()
    
    def decrypt_sensitive_data(self, encrypted_data: str) -> str:
        """Decrypt sensitive data"""
        from cryptography.fernet import Fernet
        key = self.config.encryption_key.encode()
        f = Fernet(key)
        return f.decrypt(encrypted_data.encode()).decode()
    
    def check_permissions(self, user: User, required_permission: str) -> bool:
        """Check if user has required permission"""
        return required_permission in user.permissions or user.role == 'admin'
    
    def require_permission(self, permission: str):
        """Decorator to require specific permission"""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                # In a real implementation, get user from request context
                user = kwargs.get('user')
                if not user or not self.check_permissions(user, permission):
                    raise PermissionError(f"Permission '{permission}' required")
                return func(*args, **kwargs)
            return wrapper
        return decorator
    
    def sanitize_input(self, data: str) -> str:
        """Sanitize user input to prevent XSS"""
        import html
        return html.escape(data)
    
    def generate_secure_filename(self, original_filename: str) -> str:
        """Generate secure filename"""
        import uuid
        import os
        
        # Get file extension
        _, ext = os.path.splitext(original_filename)
        
        # Generate secure filename
        secure_name = str(uuid.uuid4()) + ext
        
        return secure_name

class ScalabilityManager:
    def __init__(self):
        self.performance_metrics = {}
        self.resource_limits = {
            'max_memory_usage': 80,  # 80% of available memory
            'max_cpu_usage': 80,     # 80% of available CPU
            'max_disk_usage': 90,    # 90% of available disk
            'max_connections': 1000  # Maximum concurrent connections
        }
    
    def monitor_performance(self) -> Dict:
        """Monitor system performance"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        metrics = {
            'cpu_usage': cpu_percent,
            'memory_usage': memory.percent,
            'memory_available': memory.available,
            'disk_usage': disk.percent,
            'disk_free': disk.free,
            'timestamp': datetime.now().isoformat()
        }
        
        self.performance_metrics[datetime.now().isoformat()] = metrics
        
        # Check for resource limits
        alerts = []
        if cpu_percent > self.resource_limits['max_cpu_usage']:
            alerts.append(f"High CPU usage: {cpu_percent}%")
        
        if memory.percent > self.resource_limits['max_memory_usage']:
            alerts.append(f"High memory usage: {memory.percent}%")
        
        if disk.percent > self.resource_limits['max_disk_usage']:
            alerts.append(f"High disk usage: {disk.percent}%")
        
        metrics['alerts'] = alerts
        return metrics
    
    def optimize_database(self, db_path: str) -> Dict:
        """Optimize database performance"""
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Analyze database
        cursor.execute("ANALYZE")
        
        # Get database statistics
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        optimization_results = {
            'tables_analyzed': len(tables),
            'optimization_applied': True,
            'timestamp': datetime.now().isoformat()
        }
        
        conn.close()
        return optimization_results
    
    def implement_caching(self, cache_key: str, data: Any, ttl: int = 3600) -> bool:
        """Implement caching for frequently accessed data"""
        try:
            # In production, use Redis or Memcached
            cache_data = {
                'data': data,
                'expires_at': datetime.now().timestamp() + ttl
            }
            
            # Store in memory cache (replace with Redis in production)
            self.performance_metrics[f"cache_{cache_key}"] = cache_data
            return True
        except Exception as e:
            logger.error(f"Cache implementation failed: {e}")
            return False
    
    def get_cached_data(self, cache_key: str) -> Optional[Any]:
        """Get data from cache"""
        cache_data = self.performance_metrics.get(f"cache_{cache_key}")
        
        if not cache_data:
            return None
        
        if datetime.now().timestamp() > cache_data['expires_at']:
            # Cache expired
            del self.performance_metrics[f"cache_{cache_key}"]
            return None
        
        return cache_data['data']
    
    def scale_resources(self, current_load: Dict) -> Dict:
        """Scale resources based on current load"""
        recommendations = []
        
        if current_load['cpu_usage'] > 70:
            recommendations.append("Consider scaling up CPU resources")
        
        if current_load['memory_usage'] > 70:
            recommendations.append("Consider scaling up memory resources")
        
        if current_load['disk_usage'] > 80:
            recommendations.append("Consider scaling up disk storage")
        
        return {
            'recommendations': recommendations,
            'scaling_needed': len(recommendations) > 0,
            'timestamp': datetime.now().isoformat()
        }

def main():
    """Test security and scalability managers"""
    # Test security manager
    config = SecurityConfig(
        jwt_secret="your-secret-key",
        encryption_key="your-encryption-key"
    )
    
    security = SecurityManager(config)
    
    # Test password hashing
    password = "test_password_123"
    hashed = security.hash_password(password)
    print(f"Password hashed: {hashed}")
    print(f"Password verification: {security.verify_password(password, hashed)}")
    
    # Test JWT token
    token = security.generate_jwt_token("user123", "admin")
    print(f"JWT token generated: {token[:50]}...")
    
    payload = security.verify_jwt_token(token)
    print(f"JWT verification: {payload}")
    
    # Test rate limiting
    allowed, info = security.check_rate_limit("user123", "api")
    print(f"Rate limit check: {allowed}, Info: {info}")
    
    # Test scalability manager
    scalability = ScalabilityManager()
    
    # Monitor performance
    metrics = scalability.monitor_performance()
    print(f"Performance metrics: {metrics}")
    
    # Test caching
    scalability.implement_caching("test_key", {"data": "test"}, 60)
    cached_data = scalability.get_cached_data("test_key")
    print(f"Cached data: {cached_data}")

if __name__ == "__main__":
    main()
