#!/usr/bin/env python3
"""
Analytics & Reporting Dashboard
===============================

This module provides comprehensive analytics and reporting for
automation campaigns and business performance.
"""

import json
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import logging
from dataclasses import dataclass
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class CampaignMetrics:
    campaign_id: str
    total_sent: int
    total_opened: int
    total_clicked: int
    total_replied: int
    total_bounced: int
    total_unsubscribed: int
    revenue_generated: float
    cost_per_lead: float
    conversion_rate: float
    open_rate: float
    click_rate: float
    reply_rate: float

class AnalyticsDashboard:
    def __init__(self, db_path: str = "automation_analytics.db"):
        self.db_path = db_path
        self.setup_database()
        
    def setup_database(self):
        """Setup analytics database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Campaigns table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS campaigns (
                id TEXT PRIMARY KEY,
                name TEXT,
                type TEXT,
                created_at TIMESTAMP,
                status TEXT,
                total_sent INTEGER DEFAULT 0,
                total_opened INTEGER DEFAULT 0,
                total_clicked INTEGER DEFAULT 0,
                total_replied INTEGER DEFAULT 0,
                total_bounced INTEGER DEFAULT 0,
                total_unsubscribed INTEGER DEFAULT 0,
                revenue_generated REAL DEFAULT 0,
                cost_per_lead REAL DEFAULT 0
            )
        ''')
        
        # Events table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                campaign_id TEXT,
                event_type TEXT,
                contact_id TEXT,
                timestamp TIMESTAMP,
                data TEXT,
                FOREIGN KEY (campaign_id) REFERENCES campaigns (id)
            )
        ''')
        
        # Leads table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS leads (
                id TEXT PRIMARY KEY,
                source TEXT,
                first_name TEXT,
                last_name TEXT,
                email TEXT,
                company TEXT,
                title TEXT,
                phone TEXT,
                country TEXT,
                created_at TIMESTAMP,
                status TEXT,
                value REAL DEFAULT 0
            )
        ''')
        
        # Revenue table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS revenue (
                id TEXT PRIMARY KEY,
                campaign_id TEXT,
                lead_id TEXT,
                amount REAL,
                currency TEXT,
                created_at TIMESTAMP,
                status TEXT,
                FOREIGN KEY (campaign_id) REFERENCES campaigns (id),
                FOREIGN KEY (lead_id) REFERENCES leads (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def track_event(self, campaign_id: str, event_type: str, contact_id: str, data: Dict = None):
        """Track an event"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO events (campaign_id, event_type, contact_id, timestamp, data)
            VALUES (?, ?, ?, ?, ?)
        ''', (campaign_id, event_type, contact_id, datetime.now().isoformat(), json.dumps(data or {})))
        
        conn.commit()
        conn.close()
    
    def get_campaign_metrics(self, campaign_id: str) -> CampaignMetrics:
        """Get comprehensive campaign metrics"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get campaign data
        cursor.execute('SELECT * FROM campaigns WHERE id = ?', (campaign_id,))
        campaign = cursor.fetchone()
        
        if not campaign:
            return None
        
        # Get event counts
        cursor.execute('''
            SELECT event_type, COUNT(*) 
            FROM events 
            WHERE campaign_id = ? 
            GROUP BY event_type
        ''', (campaign_id,))
        
        events = dict(cursor.fetchall())
        
        # Get revenue data
        cursor.execute('''
            SELECT SUM(amount) 
            FROM revenue 
            WHERE campaign_id = ? AND status = 'completed'
        ''', (campaign_id,))
        
        revenue = cursor.fetchone()[0] or 0
        
        conn.close()
        
        # Calculate metrics
        total_sent = events.get('sent', 0)
        total_opened = events.get('opened', 0)
        total_clicked = events.get('clicked', 0)
        total_replied = events.get('replied', 0)
        total_bounced = events.get('bounced', 0)
        total_unsubscribed = events.get('unsubscribed', 0)
        
        # Calculate rates
        open_rate = (total_opened / total_sent * 100) if total_sent > 0 else 0
        click_rate = (total_clicked / total_sent * 100) if total_sent > 0 else 0
        reply_rate = (total_replied / total_sent * 100) if total_sent > 0 else 0
        conversion_rate = (total_replied / total_opened * 100) if total_opened > 0 else 0
        
        # Calculate cost per lead
        cost_per_lead = (campaign[12] / total_sent) if total_sent > 0 else 0
        
        return CampaignMetrics(
            campaign_id=campaign_id,
            total_sent=total_sent,
            total_opened=total_opened,
            total_clicked=total_clicked,
            total_replied=total_replied,
            total_bounced=total_bounced,
            total_unsubscribed=total_unsubscribed,
            revenue_generated=revenue,
            cost_per_lead=cost_per_lead,
            conversion_rate=conversion_rate,
            open_rate=open_rate,
            click_rate=click_rate,
            reply_rate=reply_rate
        )
    
    def get_business_overview(self, days: int = 30) -> Dict:
        """Get business overview metrics"""
        conn = sqlite3.connect(self.db_path)
        
        # Get date range
        start_date = (datetime.now() - timedelta(days=days)).isoformat()
        
        # Total campaigns
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM campaigns WHERE created_at >= ?', (start_date,))
        total_campaigns = cursor.fetchone()[0]
        
        # Total leads
        cursor.execute('SELECT COUNT(*) FROM leads WHERE created_at >= ?', (start_date,))
        total_leads = cursor.fetchone()[0]
        
        # Total revenue
        cursor.execute('SELECT SUM(amount) FROM revenue WHERE created_at >= ? AND status = "completed"', (start_date,))
        total_revenue = cursor.fetchone()[0] or 0
        
        # Average conversion rate
        cursor.execute('''
            SELECT AVG(
                CASE 
                    WHEN total_sent > 0 THEN (total_replied * 100.0 / total_sent)
                    ELSE 0 
                END
            ) FROM campaigns WHERE created_at >= ?
        ''', (start_date,))
        avg_conversion_rate = cursor.fetchone()[0] or 0
        
        # Top performing campaign
        cursor.execute('''
            SELECT name, (total_replied * 100.0 / total_sent) as conversion_rate
            FROM campaigns 
            WHERE created_at >= ? AND total_sent > 0
            ORDER BY conversion_rate DESC
            LIMIT 1
        ''', (start_date,))
        top_campaign = cursor.fetchone()
        
        conn.close()
        
        return {
            'total_campaigns': total_campaigns,
            'total_leads': total_leads,
            'total_revenue': total_revenue,
            'avg_conversion_rate': round(avg_conversion_rate, 2),
            'top_campaign': top_campaign[0] if top_campaign else 'N/A',
            'top_campaign_rate': round(top_campaign[1], 2) if top_campaign else 0,
            'period_days': days
        }
    
    def generate_funnel_analysis(self, campaign_id: str) -> Dict:
        """Generate funnel analysis for a campaign"""
        metrics = self.get_campaign_metrics(campaign_id)
        
        if not metrics:
            return {}
        
        funnel_data = {
            'sent': metrics.total_sent,
            'opened': metrics.total_opened,
            'clicked': metrics.total_clicked,
            'replied': metrics.total_replied,
            'converted': metrics.total_replied  # Assuming replied = converted
        }
        
        # Calculate conversion rates at each stage
        conversion_rates = {
            'sent_to_opened': (metrics.total_opened / metrics.total_sent * 100) if metrics.total_sent > 0 else 0,
            'opened_to_clicked': (metrics.total_clicked / metrics.total_opened * 100) if metrics.total_opened > 0 else 0,
            'clicked_to_replied': (metrics.total_replied / metrics.total_clicked * 100) if metrics.total_clicked > 0 else 0,
            'overall_conversion': (metrics.total_replied / metrics.total_sent * 100) if metrics.total_sent > 0 else 0
        }
        
        return {
            'funnel_data': funnel_data,
            'conversion_rates': conversion_rates,
            'bottlenecks': self._identify_bottlenecks(conversion_rates)
        }
    
    def _identify_bottlenecks(self, conversion_rates: Dict) -> List[str]:
        """Identify bottlenecks in the funnel"""
        bottlenecks = []
        
        if conversion_rates['sent_to_opened'] < 20:
            bottlenecks.append("Low open rate - improve subject lines and sender reputation")
        
        if conversion_rates['opened_to_clicked'] < 5:
            bottlenecks.append("Low click rate - improve email content and CTAs")
        
        if conversion_rates['clicked_to_replied'] < 10:
            bottlenecks.append("Low reply rate - improve landing page and follow-up process")
        
        return bottlenecks
    
    def generate_revenue_report(self, days: int = 30) -> Dict:
        """Generate revenue report"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        start_date = (datetime.now() - timedelta(days=days)).isoformat()
        
        # Revenue by campaign
        cursor.execute('''
            SELECT c.name, SUM(r.amount) as revenue, COUNT(r.id) as transactions
            FROM campaigns c
            LEFT JOIN revenue r ON c.id = r.campaign_id
            WHERE r.created_at >= ? AND r.status = 'completed'
            GROUP BY c.id, c.name
            ORDER BY revenue DESC
        ''', (start_date,))
        
        revenue_by_campaign = cursor.fetchall()
        
        # Revenue by day
        cursor.execute('''
            SELECT DATE(created_at) as date, SUM(amount) as daily_revenue
            FROM revenue
            WHERE created_at >= ? AND status = 'completed'
            GROUP BY DATE(created_at)
            ORDER BY date
        ''', (start_date,))
        
        daily_revenue = cursor.fetchall()
        
        # Revenue by source
        cursor.execute('''
            SELECT l.source, SUM(r.amount) as revenue
            FROM leads l
            JOIN revenue r ON l.id = r.lead_id
            WHERE r.created_at >= ? AND r.status = 'completed'
            GROUP BY l.source
            ORDER BY revenue DESC
        ''', (start_date,))
        
        revenue_by_source = cursor.fetchall()
        
        conn.close()
        
        return {
            'revenue_by_campaign': revenue_by_campaign,
            'daily_revenue': daily_revenue,
            'revenue_by_source': revenue_by_source,
            'total_revenue': sum(row[1] for row in daily_revenue),
            'avg_daily_revenue': sum(row[1] for row in daily_revenue) / len(daily_revenue) if daily_revenue else 0
        }
    
    def create_visualizations(self, campaign_id: str, output_dir: str = "analytics_charts"):
        """Create visualization charts"""
        import os
        os.makedirs(output_dir, exist_ok=True)
        
        # Get campaign metrics
        metrics = self.get_campaign_metrics(campaign_id)
        if not metrics:
            return
        
        # 1. Funnel Chart
        fig = go.Figure(go.Funnel(
            y=["Sent", "Opened", "Clicked", "Replied"],
            x=[metrics.total_sent, metrics.total_opened, metrics.total_clicked, metrics.total_replied],
            textinfo="value+percent initial",
            marker={"color": ["deepskyblue", "lightsalmon", "lightgreen", "gold"]}
        ))
        
        fig.update_layout(
            title="Campaign Funnel Analysis",
            font_size=12,
            height=500
        )
        
        fig.write_html(f"{output_dir}/funnel_{campaign_id}.html")
        
        # 2. Performance Metrics Chart
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Open Rate', 'Click Rate', 'Reply Rate', 'Conversion Rate'),
            specs=[[{"type": "indicator"}, {"type": "indicator"}],
                   [{"type": "indicator"}, {"type": "indicator"}]]
        )
        
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=metrics.open_rate,
            title={'text': "Open Rate (%)"},
            gauge={'axis': {'range': [None, 100]},
                   'bar': {'color': "darkblue"},
                   'steps': [{'range': [0, 20], 'color': "lightgray"},
                            {'range': [20, 50], 'color': "gray"}],
                   'threshold': {'line': {'color': "red", 'width': 4},
                               'thickness': 0.75, 'value': 90}}
        ), row=1, col=1)
        
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=metrics.click_rate,
            title={'text': "Click Rate (%)"},
            gauge={'axis': {'range': [None, 100]},
                   'bar': {'color': "darkgreen"},
                   'steps': [{'range': [0, 5], 'color': "lightgray"},
                            {'range': [5, 15], 'color': "gray"}],
                   'threshold': {'line': {'color': "red", 'width': 4},
                               'thickness': 0.75, 'value': 90}}
        ), row=1, col=2)
        
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=metrics.reply_rate,
            title={'text': "Reply Rate (%)"},
            gauge={'axis': {'range': [None, 100]},
                   'bar': {'color': "darkorange"},
                   'steps': [{'range': [0, 10], 'color': "lightgray"},
                            {'range': [10, 25], 'color': "gray"}],
                   'threshold': {'line': {'color': "red", 'width': 4},
                               'thickness': 0.75, 'value': 90}}
        ), row=2, col=1)
        
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=metrics.conversion_rate,
            title={'text': "Conversion Rate (%)"},
            gauge={'axis': {'range': [None, 100]},
                   'bar': {'color': "darkred"},
                   'steps': [{'range': [0, 5], 'color': "lightgray"},
                            {'range': [5, 15], 'color': "gray"}],
                   'threshold': {'line': {'color': "red", 'width': 4},
                               'thickness': 0.75, 'value': 90}}
        ), row=2, col=2)
        
        fig.update_layout(height=600, showlegend=False)
        fig.write_html(f"{output_dir}/metrics_{campaign_id}.html")
    
    def generate_executive_summary(self, days: int = 30) -> Dict:
        """Generate executive summary report"""
        overview = self.get_business_overview(days)
        revenue_report = self.generate_revenue_report(days)
        
        # Calculate growth metrics
        previous_period_start = (datetime.now() - timedelta(days=days*2)).isoformat()
        previous_period_end = (datetime.now() - timedelta(days=days)).isoformat()
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('SELECT SUM(amount) FROM revenue WHERE created_at >= ? AND created_at < ? AND status = "completed"', 
                      (previous_period_start, previous_period_end))
        previous_revenue = cursor.fetchone()[0] or 0
        
        conn.close()
        
        revenue_growth = ((overview['total_revenue'] - previous_revenue) / previous_revenue * 100) if previous_revenue > 0 else 0
        
        return {
            'period': f"Last {days} days",
            'total_revenue': overview['total_revenue'],
            'revenue_growth': round(revenue_growth, 2),
            'total_campaigns': overview['total_campaigns'],
            'total_leads': overview['total_leads'],
            'avg_conversion_rate': overview['avg_conversion_rate'],
            'top_campaign': overview['top_campaign'],
            'top_campaign_rate': overview['top_campaign_rate'],
            'avg_daily_revenue': round(revenue_report['avg_daily_revenue'], 2),
            'recommendations': self._generate_recommendations(overview)
        }
    
    def _generate_recommendations(self, overview: Dict) -> List[str]:
        """Generate business recommendations"""
        recommendations = []
        
        if overview['avg_conversion_rate'] < 5:
            recommendations.append("Focus on improving email content and targeting to increase conversion rates")
        
        if overview['total_campaigns'] < 5:
            recommendations.append("Increase campaign frequency to generate more leads")
        
        if overview['total_revenue'] < 1000:
            recommendations.append("Consider increasing pricing or targeting higher-value prospects")
        
        return recommendations

def main():
    """Test the analytics dashboard"""
    dashboard = AnalyticsDashboard()
    
    # Generate sample data
    sample_campaigns = [
        ('campaign_1', 'LinkedIn Lead Gen', 'lead_generation', '2024-01-01', 'active', 1000, 200, 50, 10, 20, 5, 5000, 5),
        ('campaign_2', 'Email Marketing', 'email', '2024-01-02', 'active', 500, 150, 30, 8, 10, 3, 3000, 6),
    ]
    
    conn = sqlite3.connect(dashboard.db_path)
    cursor = conn.cursor()
    
    for campaign in sample_campaigns:
        cursor.execute('''
            INSERT OR REPLACE INTO campaigns 
            (id, name, type, created_at, status, total_sent, total_opened, total_clicked, total_replied, total_bounced, total_unsubscribed, revenue_generated, cost_per_lead)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', campaign)
    
    conn.commit()
    conn.close()
    
    # Test analytics
    print("Business Overview:")
    overview = dashboard.get_business_overview(30)
    for key, value in overview.items():
        print(f"  {key}: {value}")
    
    print("\nCampaign Metrics:")
    metrics = dashboard.get_campaign_metrics('campaign_1')
    if metrics:
        print(f"  Open Rate: {metrics.open_rate:.2f}%")
        print(f"  Click Rate: {metrics.click_rate:.2f}%")
        print(f"  Reply Rate: {metrics.reply_rate:.2f}%")
        print(f"  Conversion Rate: {metrics.conversion_rate:.2f}%")
    
    print("\nExecutive Summary:")
    summary = dashboard.generate_executive_summary(30)
    for key, value in summary.items():
        if key != 'recommendations':
            print(f"  {key}: {value}")
    
    if summary['recommendations']:
        print("  Recommendations:")
        for rec in summary['recommendations']:
            print(f"    - {rec}")

if __name__ == "__main__":
    main()
