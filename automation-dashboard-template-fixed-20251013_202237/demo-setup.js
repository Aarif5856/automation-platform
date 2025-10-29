#!/usr/bin/env node
/**
 * Demo Setup Script for Automation Business Suite
 * ==============================================
 * 
 * This script sets up a demo environment with:
 * - Demo user accounts
 * - Sample data
 * - Demo configurations
 * - Test campaigns and results
 */

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Demo Configuration
const DEMO_CONFIG = {
  users: [
    {
      email: 'demo@automation-suite.com',
      password: 'demo123',
      role: 'admin',
      name: 'Demo Admin',
      company: 'Automation Business Suite'
    },
    {
      email: 'client@demo.com',
      password: 'client123',
      role: 'client',
      name: 'Demo Client',
      company: 'Demo Company Inc.'
    },
    {
      email: 'viewer@demo.com',
      password: 'viewer123',
      role: 'viewer',
      name: 'Demo Viewer',
      company: 'Viewer Corp'
    }
  ],
  leads: [
    {
      name: 'Sarah Johnson',
      title: 'CEO & Founder',
      company: 'TechStart Inc.',
      location: 'San Francisco, CA',
      email: 'sarah.johnson@techstart.com',
      phone: '+1-555-0123',
      industry: 'Technology',
      company_size: '51-200',
      linkedin_url: '#',
      status: 'qualified',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Mike Chen',
      title: 'Marketing Director',
      company: 'GrowthCo Agency',
      location: 'New York, NY',
      email: 'mike.chen@growthco.com',
      phone: '+1-555-0124',
      industry: 'Marketing',
      company_size: '11-50',
      linkedin_url: '#',
      status: 'contacted',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Lisa Rodriguez',
      title: 'VP of Sales',
      company: 'SalesPro Solutions',
      location: 'Chicago, IL',
      email: 'lisa.rodriguez@salespro.com',
      phone: '+1-555-0125',
      industry: 'Sales',
      company_size: '201-500',
      linkedin_url: '#',
      status: 'interested',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'David Thompson',
      title: 'Business Owner',
      company: 'Thompson Consulting',
      location: 'Miami, FL',
      email: 'david.thompson@thompsonconsulting.com',
      phone: '+1-555-0126',
      industry: 'Consulting',
      company_size: '1-10',
      linkedin_url: '#',
      status: 'qualified',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Jennifer Lee',
      title: 'Operations Manager',
      company: 'E-commerce Plus',
      location: 'Seattle, WA',
      email: 'jennifer.lee@ecommerceplus.com',
      phone: '+1-555-0127',
      industry: 'E-commerce',
      company_size: '51-200',
      linkedin_url: '#',
      status: 'contacted',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Robert Wilson',
      title: 'CTO',
      company: 'InnovateTech Solutions',
      location: 'Austin, TX',
      email: 'robert.wilson@innovatetech.com',
      phone: '+1-555-0128',
      industry: 'Technology',
      company_size: '201-500',
      linkedin_url: '#',
      status: 'qualified',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Maria Garcia',
      title: 'Head of Marketing',
      company: 'Digital Marketing Pro',
      location: 'Los Angeles, CA',
      email: 'maria.garcia@digitalmarketingpro.com',
      phone: '+1-555-0129',
      industry: 'Marketing',
      company_size: '11-50',
      linkedin_url: '#',
      status: 'interested',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'James Anderson',
      title: 'Sales Manager',
      company: 'Revenue Boost Inc.',
      location: 'Denver, CO',
      email: 'james.anderson@revenueboost.com',
      phone: '+1-555-0130',
      industry: 'Sales',
      company_size: '51-200',
      linkedin_url: '#',
      status: 'contacted',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Amanda Taylor',
      title: 'Business Development Director',
      company: 'Growth Partners LLC',
      location: 'Boston, MA',
      email: 'amanda.taylor@growthpartners.com',
      phone: '+1-555-0131',
      industry: 'Business Development',
      company_size: '11-50',
      linkedin_url: '#',
      status: 'qualified',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    },
    {
      name: 'Kevin Brown',
      title: 'Founder & CEO',
      company: 'Startup Success Co.',
      location: 'Portland, OR',
      email: 'kevin.brown@startupsuccess.com',
      phone: '+1-555-0132',
      industry: 'Startups',
      company_size: '1-10',
      linkedin_url: '#',
      status: 'interested',
      source: 'LinkedIn',
      created_at: new Date().toISOString()
    }
  ],
  emailTemplates: [
    {
      id: 'welcome_email',
      name: 'Welcome Email',
      subject: 'Welcome to {{company}}, {{first_name}}!',
      html_content: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Welcome to {{company}}!</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Hi {{first_name}},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for joining {{company}}. We're excited to have you on board and help you achieve your business goals!
            </p>
            <p style="color: #666; line-height: 1.6;">
              Here's what you can expect from our automation services:
            </p>
            <ul style="color: #666; line-height: 1.8;">
              <li>🎯 <strong>LinkedIn Lead Generation</strong> - 500+ qualified leads per day</li>
              <li>📧 <strong>Email Marketing Automation</strong> - Personalized campaigns that convert</li>
              <li>🕷️ <strong>Web Scraping Services</strong> - Extract data from any website</li>
              <li>📊 <strong>Analytics Dashboard</strong> - Track performance and ROI</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Get Started Now
              </a>
            </div>
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>The {{company}} Team</strong>
            </p>
          </div>
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>© 2024 {{company}}. All rights reserved.</p>
            <p><a href="#" style="color: #667eea;">Unsubscribe</a> | <a href="#" style="color: #667eea;">Privacy Policy</a></p>
          </div>
        </body>
        </html>
      `,
      text_content: `
        Welcome to {{company}}, {{first_name}}!
        
        Thank you for joining {{company}}. We're excited to have you on board and help you achieve your business goals!
        
        Here's what you can expect from our automation services:
        
        🎯 LinkedIn Lead Generation - 500+ qualified leads per day
        📧 Email Marketing Automation - Personalized campaigns that convert
        🕷️ Web Scraping Services - Extract data from any website
        📊 Analytics Dashboard - Track performance and ROI
        
        Get Started Now: [LINK]
        
        Best regards,
        The {{company}} Team
        
        ---
        © 2024 {{company}}. All rights reserved.
        Unsubscribe: [LINK] | Privacy Policy: [LINK]
      `,
      created_at: new Date().toISOString(),
      variables: ['first_name', 'company']
    },
    {
      id: 'follow_up_email',
      name: 'Follow-up Email',
      subject: 'Following up on our conversation, {{first_name}}',
      html_content: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Following Up</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Hi {{first_name}},</h2>
            <p style="color: #666; line-height: 1.6;">
              I wanted to follow up on our conversation about {{company}}'s automation needs.
            </p>
            <p style="color: #666; line-height: 1.6;">
              Based on what you mentioned about your current challenges, I believe our automation suite could help you:
            </p>
            <ul style="color: #666; line-height: 1.8;">
              <li>⚡ Save 20+ hours per week on manual tasks</li>
              <li>📈 Increase lead generation by 300%</li>
              <li>💰 Generate $10,000+ additional monthly revenue</li>
              <li>🎯 Improve conversion rates by 150%</li>
            </ul>
            <p style="color: #666; line-height: 1.6;">
              Would you be interested in a brief 15-minute call this week to discuss how we can help {{company}} achieve these results?
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Schedule a Call
              </a>
            </div>
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>Your Name</strong><br>
              <em>Automation Specialist</em>
            </p>
          </div>
        </body>
        </html>
      `,
      text_content: `
        Hi {{first_name}},
        
        I wanted to follow up on our conversation about {{company}}'s automation needs.
        
        Based on what you mentioned about your current challenges, I believe our automation suite could help you:
        
        ⚡ Save 20+ hours per week on manual tasks
        📈 Increase lead generation by 300%
        💰 Generate $10,000+ additional monthly revenue
        🎯 Improve conversion rates by 150%
        
        Would you be interested in a brief 15-minute call this week to discuss how we can help {{company}} achieve these results?
        
        Schedule a Call: [LINK]
        
        Best regards,
        Your Name
        Automation Specialist
      `,
      created_at: new Date().toISOString(),
      variables: ['first_name', 'company']
    },
    {
      id: 'demo_invitation',
      name: 'Demo Invitation',
      subject: 'Exclusive Demo: See How {{company}} Can 10x Your Results',
      html_content: `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">🎯 Exclusive Demo Invitation</h1>
          </div>
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333;">Hi {{first_name}},</h2>
            <p style="color: #666; line-height: 1.6;">
              I have something exciting to show you that could transform {{company}}'s business.
            </p>
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #ff6b6b;">
              <h3 style="color: #333; margin-top: 0;">What You'll See in This Demo:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>🚀 Live LinkedIn lead generation (500+ leads in 10 minutes)</li>
                <li>📧 Automated email campaigns with 40%+ open rates</li>
                <li>🕷️ Web scraping that extracts 1000+ records per hour</li>
                <li>📊 Real-time analytics showing $50,000+ revenue potential</li>
              </ul>
            </div>
            <p style="color: #666; line-height: 1.6;">
              This is the same system that has generated over $2 million in revenue for our clients.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Watch Demo Now
              </a>
            </div>
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              <strong>Limited Time:</strong> This demo is only available for the next 48 hours.
            </p>
          </div>
        </body>
        </html>
      `,
      text_content: `
        🎯 Exclusive Demo Invitation
        
        Hi {{first_name}},
        
        I have something exciting to show you that could transform {{company}}'s business.
        
        What You'll See in This Demo:
        🚀 Live LinkedIn lead generation (500+ leads in 10 minutes)
        📧 Automated email campaigns with 40%+ open rates
        🕷️ Web scraping that extracts 1000+ records per hour
        📊 Real-time analytics showing $50,000+ revenue potential
        
        This is the same system that has generated over $2 million in revenue for our clients.
        
        Watch Demo Now: [LINK]
        
        Limited Time: This demo is only available for the next 48 hours.
      `,
      created_at: new Date().toISOString(),
      variables: ['first_name', 'company']
    }
  ],
  campaigns: [
    {
      id: 'welcome_campaign_001',
      name: 'Welcome Campaign',
      subject: 'Welcome to AutoBiz, {{first_name}}!',
      template_id: 'welcome_email',
      status: 'completed',
      sent_count: 50,
      open_count: 35,
      click_count: 12,
      reply_count: 8,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      completed_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
      id: 'follow_up_campaign_001',
      name: 'Follow-up Campaign',
      subject: 'Following up on our conversation, {{first_name}}',
      template_id: 'follow_up_email',
      status: 'running',
      sent_count: 25,
      open_count: 18,
      click_count: 7,
      reply_count: 3,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      completed_at: null
    },
    {
      id: 'demo_campaign_001',
      name: 'Demo Invitation Campaign',
      subject: 'Exclusive Demo: See How {{company}} Can 10x Your Results',
      template_id: 'demo_invitation',
      status: 'scheduled',
      sent_count: 0,
      open_count: 0,
      click_count: 0,
      reply_count: 0,
      created_at: new Date().toISOString(),
      scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      completed_at: null
    }
  ]
};

class DemoSetup {
  constructor() {
    this.dbPath = 'demo_automation.db';
  }

  async setupDatabase() {
    console.log('🔧 Setting up demo database...');
    
    const db = new sqlite3.Database(this.dbPath);
    
    // Create tables
    await this.createTables(db);
    
    // Insert demo data
    await this.insertDemoData(db);
    
    db.close();
    console.log('✅ Demo database setup complete!');
  }

  async createTables(db) {
    return new Promise((resolve, reject) => {
      const tables = [
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          company TEXT,
          role TEXT DEFAULT 'client',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_login DATETIME,
          status TEXT DEFAULT 'active'
        )`,
        `CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          title TEXT,
          company TEXT,
          location TEXT,
          email TEXT,
          phone TEXT,
          industry TEXT,
          company_size TEXT,
          linkedin_url TEXT,
          status TEXT DEFAULT 'new',
          source TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS email_templates (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          subject TEXT NOT NULL,
          html_content TEXT,
          text_content TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          variables TEXT
        )`,
        `CREATE TABLE IF NOT EXISTS campaigns (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          subject TEXT NOT NULL,
          template_id TEXT,
          status TEXT DEFAULT 'draft',
          sent_count INTEGER DEFAULT 0,
          open_count INTEGER DEFAULT 0,
          click_count INTEGER DEFAULT 0,
          reply_count INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          scheduled_time DATETIME,
          completed_at DATETIME
        )`,
        `CREATE TABLE IF NOT EXISTS email_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          campaign_id TEXT,
          contact_email TEXT,
          event_type TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          data TEXT
        )`,
        `CREATE TABLE IF NOT EXISTS analytics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          metric_name TEXT NOT NULL,
          metric_value REAL NOT NULL,
          metric_date DATE DEFAULT CURRENT_DATE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      ];

      let completed = 0;
      tables.forEach((table, index) => {
        db.run(table, (err) => {
          if (err) {
            console.error(`Error creating table ${index + 1}:`, err);
            reject(err);
          } else {
            completed++;
            if (completed === tables.length) {
              resolve();
            }
          }
        });
      });
    });
  }

  async insertDemoData(db) {
    console.log('📊 Inserting demo data...');
    
    // Insert users
    for (const user of DEMO_CONFIG.users) {
      await this.insertUser(db, user);
    }
    
    // Insert leads
    for (const lead of DEMO_CONFIG.leads) {
      await this.insertLead(db, lead);
    }
    
    // Insert email templates
    for (const template of DEMO_CONFIG.emailTemplates) {
      await this.insertEmailTemplate(db, template);
    }
    
    // Insert campaigns
    for (const campaign of DEMO_CONFIG.campaigns) {
      await this.insertCampaign(db, campaign);
    }
    
    // Insert analytics data
    await this.insertAnalyticsData(db);
    
    console.log('✅ Demo data inserted successfully!');
  }

  async insertUser(db, user) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO users (email, password, name, company, role, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        user.email,
        user.password,
        user.name,
        user.company,
        user.role,
        new Date().toISOString()
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
      
      stmt.finalize();
    });
  }

  async insertLead(db, lead) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO leads (name, title, company, location, email, phone, industry, company_size, linkedin_url, status, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        lead.name,
        lead.title,
        lead.company,
        lead.location,
        lead.email,
        lead.phone,
        lead.industry,
        lead.company_size,
        lead.linkedin_url,
        lead.status,
        lead.source,
        lead.created_at
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
      
      stmt.finalize();
    });
  }

  async insertEmailTemplate(db, template) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO email_templates (id, name, subject, html_content, text_content, created_at, variables)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        template.id,
        template.name,
        template.subject,
        template.html_content,
        template.text_content,
        template.created_at,
        JSON.stringify(template.variables)
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
      
      stmt.finalize();
    });
  }

  async insertCampaign(db, campaign) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO campaigns (id, name, subject, template_id, status, sent_count, open_count, click_count, reply_count, created_at, scheduled_time, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run([
        campaign.id,
        campaign.name,
        campaign.subject,
        campaign.template_id,
        campaign.status,
        campaign.sent_count,
        campaign.open_count,
        campaign.click_count,
        campaign.reply_count,
        campaign.created_at,
        campaign.scheduled_time,
        campaign.completed_at
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
      
      stmt.finalize();
    });
  }

  async insertAnalyticsData(db) {
    console.log('📈 Generating analytics data...');
    
    const analytics = [
      { metric_name: 'total_leads', metric_value: 1250, metric_date: '2024-01-01' },
      { metric_name: 'total_leads', metric_value: 1380, metric_date: '2024-01-02' },
      { metric_name: 'total_leads', metric_value: 1520, metric_date: '2024-01-03' },
      { metric_name: 'total_leads', metric_value: 1670, metric_date: '2024-01-04' },
      { metric_name: 'total_leads', metric_value: 1820, metric_date: '2024-01-05' },
      { metric_name: 'emails_sent', metric_value: 450, metric_date: '2024-01-01' },
      { metric_name: 'emails_sent', metric_value: 520, metric_date: '2024-01-02' },
      { metric_name: 'emails_sent', metric_value: 480, metric_date: '2024-01-03' },
      { metric_name: 'emails_sent', metric_value: 610, metric_date: '2024-01-04' },
      { metric_name: 'emails_sent', metric_value: 590, metric_date: '2024-01-05' },
      { metric_name: 'revenue', metric_value: 12500, metric_date: '2024-01-01' },
      { metric_name: 'revenue', metric_value: 13800, metric_date: '2024-01-02' },
      { metric_name: 'revenue', metric_value: 15200, metric_date: '2024-01-03' },
      { metric_name: 'revenue', metric_value: 16700, metric_date: '2024-01-04' },
      { metric_name: 'revenue', metric_value: 18200, metric_date: '2024-01-05' }
    ];

    for (const metric of analytics) {
      await new Promise((resolve, reject) => {
        const stmt = db.prepare(`
          INSERT INTO analytics (metric_name, metric_value, metric_date, created_at)
          VALUES (?, ?, ?, ?)
        `);
        
        stmt.run([
          metric.metric_name,
          metric.metric_value,
          metric.metric_date,
          new Date().toISOString()
        ], (err) => {
          if (err) reject(err);
          else resolve();
        });
        
        stmt.finalize();
      });
    }
  }

  async createDemoFiles() {
    console.log('📁 Creating demo files...');
    
    // Create demo configuration file
    const demoConfig = {
      demo: true,
      limits: {
        linkedin_searches: 5,
        emails_per_day: 10,
        scraping_requests: 20
      },
      features: {
        linkedin: true,
        email: true,
        scraping: true,
        analytics: true
      },
      branding: {
        company_name: 'Automation Business Suite',
        logo: '/images/logo.png',
        primary_color: '#667eea',
        secondary_color: '#764ba2'
      }
    };

    fs.writeFileSync('demo-config.json', JSON.stringify(demoConfig, null, 2));
    
    // Create demo README
    const demoReadme = `# 🚀 Automation Business Suite - Demo Environment

## Demo Access

### Demo Accounts:
- **Admin:** demo@automation-suite.com / demo123
- **Client:** client@demo.com / client123
- **Viewer:** viewer@demo.com / viewer123

### Demo Features:
- ✅ LinkedIn Lead Generator (with sample data)
- ✅ Email Campaign Manager (test campaigns)
- ✅ Web Scraping Tools (demo extractions)
- ✅ Analytics Dashboard (sample metrics)
- ✅ Client Management System

### Demo Data:
- 📊 10+ Sample leads
- 📧 3 Email templates
- 📈 3 Campaign examples
- 📊 15 Analytics data points

## Getting Started

1. Start the server: \`npm start\`
2. Visit: http://localhost:3000
3. Login with demo credentials
4. Explore all features

## Demo Limitations

- Limited to 5 LinkedIn searches
- Maximum 10 emails per day
- 20 scraping requests maximum
- Demo data only (no real automation)

---

*This is a demonstration environment. For production use, configure your own credentials and remove demo limitations.*
`;

    fs.writeFileSync('DEMO_README.md', demoReadme);
    
    console.log('✅ Demo files created successfully!');
  }

  async run() {
    console.log('🚀 Starting Demo Setup for Automation Business Suite...\n');
    
    try {
      await this.setupDatabase();
      await this.createDemoFiles();
      
      console.log('\n🎉 Demo setup completed successfully!');
      console.log('\n📋 Demo Information:');
      console.log('├── Database: demo_automation.db');
      console.log('├── Config: demo-config.json');
      console.log('├── README: DEMO_README.md');
      console.log('└── Accounts: 3 demo users created');
      
      console.log('\n🔑 Demo Login Credentials:');
      DEMO_CONFIG.users.forEach(user => {
        console.log(`├── ${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
      });
      
      console.log('\n🚀 Next Steps:');
      console.log('1. Run: npm start');
      console.log('2. Visit: http://localhost:3000');
      console.log('3. Login with demo credentials');
      console.log('4. Explore all features');
      console.log('5. Record demo video');
      console.log('6. Deploy to hosting platform');
      
    } catch (error) {
      console.error('❌ Error setting up demo:', error);
      process.exit(1);
    }
  }
}

// Run the setup
if (require.main === module) {
  const setup = new DemoSetup();
  setup.run();
}

module.exports = DemoSetup;



