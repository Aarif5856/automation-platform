/**
 * Demo Configuration for Automation Business Suite
 * ===============================================
 * 
 * This file contains all demo-specific configurations,
 * sample data, and feature flags for the demo environment.
 */

const DEMO_CONFIG = {
  // Demo mode flag
  demo: true,
  
  // Feature flags
  features: {
    linkedin: true,
    email: true,
    scraping: true,
    analytics: true,
    payments: true,
    client_management: true
  },
  
  // Demo limitations
  limits: {
    linkedin_searches: 5,
    emails_per_day: 10,
    scraping_requests: 20,
    max_leads: 100,
    max_campaigns: 3
  },
  
  // Demo branding
  branding: {
    company_name: 'Automation Business Suite',
    logo: '/images/logo.png',
    primary_color: '#667eea',
    secondary_color: '#764ba2',
    accent_color: '#ff6b6b'
  },
  
  // Demo users
  users: [
    {
      email: 'demo@automation-suite.com',
      password: 'demo123',
      role: 'admin',
      name: 'Demo Admin',
      company: 'Automation Business Suite',
      permissions: ['all']
    },
    {
      email: 'client@demo.com',
      password: 'client123',
      role: 'client',
      name: 'Demo Client',
      company: 'Demo Company Inc.',
      permissions: ['leads', 'emails', 'analytics']
    },
    {
      email: 'viewer@demo.com',
      password: 'viewer123',
      role: 'viewer',
      name: 'Demo Viewer',
      company: 'Viewer Corp',
      permissions: ['view_only']
    }
  ],
  
  // Sample leads data
  sampleLeads: [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'CEO & Founder',
      company: 'TechStart Inc.',
      location: 'San Francisco, CA',
      email: 'sarah.johnson@techstart.com',
      phone: '+1-555-0123',
      industry: 'Technology',
      company_size: '51-200',
      linkedin_url: 'https://linkedin.com/in/sarah-johnson-demo',
      status: 'qualified',
      source: 'LinkedIn',
      score: 95,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      name: 'Mike Chen',
      title: 'Marketing Director',
      company: 'GrowthCo Agency',
      location: 'New York, NY',
      email: 'mike.chen@growthco.com',
      phone: '+1-555-0124',
      industry: 'Marketing',
      company_size: '11-50',
      linkedin_url: 'https://linkedin.com/in/mike-chen-demo',
      status: 'contacted',
      source: 'LinkedIn',
      score: 88,
      created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      title: 'VP of Sales',
      company: 'SalesPro Solutions',
      location: 'Chicago, IL',
      email: 'lisa.rodriguez@salespro.com',
      phone: '+1-555-0125',
      industry: 'Sales',
      company_size: '201-500',
      linkedin_url: 'https://linkedin.com/in/lisa-rodriguez-demo',
      status: 'interested',
      source: 'LinkedIn',
      score: 92,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Business Owner',
      company: 'Thompson Consulting',
      location: 'Miami, FL',
      email: 'david.thompson@thompsonconsulting.com',
      phone: '+1-555-0126',
      industry: 'Consulting',
      company_size: '1-10',
      linkedin_url: 'https://linkedin.com/in/david-thompson-demo',
      status: 'qualified',
      source: 'LinkedIn',
      score: 85,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      name: 'Jennifer Lee',
      title: 'Operations Manager',
      company: 'E-commerce Plus',
      location: 'Seattle, WA',
      email: 'jennifer.lee@ecommerceplus.com',
      phone: '+1-555-0127',
      industry: 'E-commerce',
      company_size: '51-200',
      linkedin_url: 'https://linkedin.com/in/jennifer-lee-demo',
      status: 'contacted',
      source: 'LinkedIn',
      score: 90,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  
  // Sample email templates
  emailTemplates: [
    {
      id: 'welcome_email',
      name: 'Welcome Email',
      subject: 'Welcome to {{company}}, {{first_name}}!',
      category: 'welcome',
      created_at: new Date().toISOString()
    },
    {
      id: 'follow_up_email',
      name: 'Follow-up Email',
      subject: 'Following up on our conversation, {{first_name}}',
      category: 'follow_up',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo_invitation',
      name: 'Demo Invitation',
      subject: 'Exclusive Demo: See How {{company}} Can 10x Your Results',
      category: 'demo',
      created_at: new Date().toISOString()
    }
  ],
  
  // Sample campaigns
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
      conversion_rate: 16,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
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
      conversion_rate: 12,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
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
      conversion_rate: 0,
      created_at: new Date().toISOString(),
      scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      completed_at: null
    }
  ],
  
  // Sample analytics data
  analytics: {
    revenue: {
      total: 125000,
      monthly: 25000,
      weekly: 6250,
      daily: 892
    },
    leads: {
      total: 1250,
      this_month: 250,
      this_week: 62,
      today: 8
    },
    emails: {
      sent: 5000,
      opened: 3500,
      clicked: 1200,
      replied: 400,
      open_rate: 70,
      click_rate: 24,
      reply_rate: 8
    },
    conversions: {
      total: 125,
      rate: 10,
      value: 125000
    }
  },
  
  // Demo notifications
  notifications: [
    {
      id: 1,
      type: 'success',
      title: 'Campaign Completed',
      message: 'Welcome Campaign has been completed successfully. 35 opens, 12 clicks.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Leads Generated',
      message: 'LinkedIn automation generated 8 new qualified leads.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Email Limit Reached',
      message: 'Daily email limit reached. Upgrade to send more emails.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ],
  
  // Demo testimonials
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'CEO',
      rating: 5,
      text: 'This automation suite increased our lead generation by 300%. Best investment we\'ve made!',
      avatar: '/images/testimonials/sarah.jpg',
      verified: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'GrowthCo Agency',
      role: 'Marketing Director',
      rating: 5,
      text: 'We saved 20 hours per week on manual tasks. ROI was 500% in the first month.',
      avatar: '/images/testimonials/mike.jpg',
      verified: true
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      company: 'SalesPro Solutions',
      role: 'VP of Sales',
      rating: 5,
      text: 'Professional system with amazing results. Our sales team loves it!',
      avatar: '/images/testimonials/lisa.jpg',
      verified: true
    }
  ],
  
  // Demo pricing packages
  pricing: [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 297,
      period: 'one-time',
      features: [
        'Complete source code',
        'Basic documentation',
        'Installation guide',
        'Email support (7 days)'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: 597,
      period: 'one-time',
      features: [
        'Everything in Basic',
        'Detailed documentation',
        'Video tutorials',
        'Setup assistance',
        'Email support (30 days)'
      ],
      popular: true
    },
    {
      id: 'business',
      name: 'Business Package',
      price: 997,
      period: 'one-time',
      features: [
        'Everything in Professional',
        'Custom branding removal',
        'Revenue optimization guide',
        '1-hour setup call',
        'Email support (90 days)'
      ],
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: 1997,
      period: 'one-time',
      features: [
        'Everything in Business',
        'White-label rights',
        'Reseller license',
        'Custom modifications',
        '6 months support',
        'Priority updates'
      ],
      popular: false
    }
  ]
};

// Demo API responses
const DEMO_RESPONSES = {
  // LinkedIn automation demo response
  linkedinSearch: {
    success: true,
    message: 'LinkedIn search completed successfully',
    data: {
      leads: DEMO_CONFIG.sampleLeads,
      total: DEMO_CONFIG.sampleLeads.length,
      duration: '5 minutes',
      exported: true
    }
  },
  
  // Email campaign demo response
  emailCampaign: {
    success: true,
    message: 'Email campaign sent successfully',
    data: {
      sent: 50,
      opened: 35,
      clicked: 12,
      replied: 8,
      open_rate: 70,
      click_rate: 24,
      reply_rate: 16
    }
  },
  
  // Web scraping demo response
  webScraping: {
    success: true,
    message: 'Web scraping completed successfully',
    data: {
      records: 100,
      duration: '2 minutes',
      format: 'Excel',
      exported: true
    }
  },
  
  // Analytics demo response
  analytics: {
    success: true,
    message: 'Analytics data retrieved successfully',
    data: DEMO_CONFIG.analytics
  }
};

// Demo error responses
const DEMO_ERRORS = {
  linkedinLimit: {
    error: 'LinkedIn search limit reached',
    message: 'You have reached the daily limit of 5 LinkedIn searches. Upgrade to Pro for unlimited searches.',
    code: 'LINKEDIN_LIMIT_REACHED'
  },
  
  emailLimit: {
    error: 'Email limit reached',
    message: 'You have reached the daily limit of 10 emails. Upgrade to Pro for unlimited emails.',
    code: 'EMAIL_LIMIT_REACHED'
  },
  
  scrapingLimit: {
    error: 'Scraping limit reached',
    message: 'You have reached the daily limit of 20 scraping requests. Upgrade to Pro for unlimited scraping.',
    code: 'SCRAPING_LIMIT_REACHED'
  }
};

// Demo utility functions
const DEMO_UTILS = {
  // Check if user is in demo mode
  isDemoMode: () => {
    return process.env.DEMO_MODE === 'true' || DEMO_CONFIG.demo;
  },
  
  // Get demo user by email
  getDemoUser: (email) => {
    return DEMO_CONFIG.users.find(user => user.email === email);
  },
  
  // Check if user has permission
  hasPermission: (userEmail, permission) => {
    const user = DEMO_UTILS.getDemoUser(userEmail);
    if (!user) return false;
    
    if (user.permissions.includes('all')) return true;
    return user.permissions.includes(permission);
  },
  
  // Get demo response with delay
  getDemoResponse: (type, delay = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DEMO_RESPONSES[type] || { success: false, message: 'Unknown demo type' });
      }, delay);
    });
  },
  
  // Simulate API delay
  simulateDelay: (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  // Generate demo data
  generateDemoData: (type, count = 10) => {
    switch (type) {
      case 'leads':
        return DEMO_CONFIG.sampleLeads.slice(0, count);
      case 'campaigns':
        return DEMO_CONFIG.campaigns.slice(0, count);
      case 'analytics':
        return DEMO_CONFIG.analytics;
      default:
        return [];
    }
  }
};

module.exports = {
  DEMO_CONFIG,
  DEMO_RESPONSES,
  DEMO_ERRORS,
  DEMO_UTILS
};
