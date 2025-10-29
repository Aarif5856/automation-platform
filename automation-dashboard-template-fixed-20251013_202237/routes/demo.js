/**
 * Demo API Routes for Automation Business Suite
 * ============================================
 * 
 * This file contains all demo-specific API endpoints
 * that simulate real functionality with sample data.
 */

const express = require('express');
const router = express.Router();
const { DEMO_CONFIG, DEMO_RESPONSES, DEMO_ERRORS, DEMO_UTILS } = require('../demo-config');

// Middleware to check demo mode
const checkDemoMode = (req, res, next) => {
  if (!DEMO_UTILS.isDemoMode()) {
    return res.status(404).json({ error: 'Demo mode not enabled' });
  }
  next();
};

// Apply demo mode check to all routes
router.use(checkDemoMode);

// Demo authentication endpoints
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find demo user
    const user = DEMO_CONFIG.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Simulate login delay
    await DEMO_UTILS.simulateDelay(500);
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      user: userData,
      token: 'demo-token-' + Date.now()
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Demo login failed' });
  }
});

// Demo LinkedIn automation endpoints
router.post('/linkedin/search', async (req, res) => {
  try {
    const { keywords, location, industry, company_size } = req.body;
    
    // Simulate search delay
    await DEMO_UTILS.simulateDelay(2000);
    
    // Return demo response
    res.json(DEMO_RESPONSES.linkedinSearch);
    
  } catch (error) {
    res.status(500).json({ error: 'LinkedIn search failed' });
  }
});

router.get('/linkedin/leads', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(800);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.sampleLeads,
      total: DEMO_CONFIG.sampleLeads.length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

router.post('/linkedin/export', async (req, res) => {
  try {
    const { format = 'csv' } = req.body;
    
    // Simulate export delay
    await DEMO_UTILS.simulateDelay(1500);
    
    res.json({
      success: true,
      message: `Leads exported to ${format.toUpperCase()} successfully`,
      filename: `linkedin_leads_${Date.now()}.${format}`,
      count: DEMO_CONFIG.sampleLeads.length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// Demo email campaign endpoints
router.get('/email/templates', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(600);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.emailTemplates,
      total: DEMO_CONFIG.emailTemplates.length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

router.get('/email/campaigns', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(800);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.campaigns,
      total: DEMO_CONFIG.campaigns.length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

router.post('/email/campaigns', async (req, res) => {
  try {
    const { name, subject, template_id, contact_list } = req.body;
    
    // Simulate campaign creation delay
    await DEMO_UTILS.simulateDelay(1000);
    
    const newCampaign = {
      id: 'campaign_' + Date.now(),
      name,
      subject,
      template_id,
      status: 'draft',
      sent_count: 0,
      open_count: 0,
      click_count: 0,
      reply_count: 0,
      created_at: new Date().toISOString(),
      scheduled_time: null,
      completed_at: null
    };
    
    res.json({
      success: true,
      message: 'Campaign created successfully',
      data: newCampaign
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

router.post('/email/campaigns/:id/send', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Simulate sending delay
    await DEMO_UTILS.simulateDelay(3000);
    
    // Return demo campaign results
    res.json(DEMO_RESPONSES.emailCampaign);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to send campaign' });
  }
});

// Demo web scraping endpoints
router.post('/scraping/start', async (req, res) => {
  try {
    const { url, selectors, format = 'excel' } = req.body;
    
    // Simulate scraping delay
    await DEMO_UTILS.simulateDelay(2500);
    
    // Return demo scraping results
    res.json(DEMO_RESPONSES.webScraping);
    
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

router.get('/scraping/results', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(800);
    
    // Return sample scraped data
    const sampleData = [
      {
        id: 1,
        name: 'Product A',
        price: '$29.99',
        description: 'High-quality product A',
        category: 'Electronics',
        url: 'https://example.com/product-a'
      },
      {
        id: 2,
        name: 'Product B',
        price: '$49.99',
        description: 'Premium product B',
        category: 'Electronics',
        url: 'https://example.com/product-b'
      },
      {
        id: 3,
        name: 'Product C',
        price: '$19.99',
        description: 'Budget product C',
        category: 'Accessories',
        url: 'https://example.com/product-c'
      }
    ];
    
    res.json({
      success: true,
      data: sampleData,
      total: sampleData.length,
      last_updated: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scraping results' });
  }
});

// Demo analytics endpoints
router.get('/analytics/overview', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(1000);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.analytics
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

router.get('/analytics/revenue', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(800);
    
    // Generate sample revenue data for the last 30 days
    const revenueData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      revenueData.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 2000) + 500,
        leads: Math.floor(Math.random() * 50) + 10,
        emails: Math.floor(Math.random() * 200) + 50
      });
    }
    
    res.json({
      success: true,
      data: revenueData
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
});

router.get('/analytics/campaigns', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(800);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.campaigns.map(campaign => ({
        ...campaign,
        open_rate: campaign.open_count / campaign.sent_count * 100,
        click_rate: campaign.click_count / campaign.sent_count * 100,
        reply_rate: campaign.reply_count / campaign.sent_count * 100
      }))
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign analytics' });
  }
});

// Demo notifications endpoint
router.get('/notifications', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(500);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.notifications,
      unread_count: DEMO_CONFIG.notifications.filter(n => !n.read).length
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Demo testimonials endpoint
router.get('/testimonials', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(600);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.testimonials
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Demo pricing endpoint
router.get('/pricing', async (req, res) => {
  try {
    // Simulate API delay
    await DEMO_UTILS.simulateDelay(400);
    
    res.json({
      success: true,
      data: DEMO_CONFIG.pricing
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pricing' });
  }
});

// Demo status endpoint
router.get('/status', async (req, res) => {
  try {
    res.json({
      success: true,
      demo_mode: true,
      features: DEMO_CONFIG.features,
      limits: DEMO_CONFIG.limits,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to get demo status' });
  }
});

// Demo error simulation endpoints (for testing error handling)
router.post('/demo/error/:type', async (req, res) => {
  try {
    const { type } = req.params;
    
    // Simulate delay
    await DEMO_UTILS.simulateDelay(500);
    
    // Return appropriate error
    switch (type) {
      case 'linkedin-limit':
        return res.status(429).json(DEMO_ERRORS.linkedinLimit);
      case 'email-limit':
        return res.status(429).json(DEMO_ERRORS.emailLimit);
      case 'scraping-limit':
        return res.status(429).json(DEMO_ERRORS.scrapingLimit);
      default:
        return res.status(400).json({ error: 'Unknown error type' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to simulate error' });
  }
});

module.exports = router;



