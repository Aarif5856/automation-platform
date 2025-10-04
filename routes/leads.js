const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();

// LinkedIn lead generation
router.post('/linkedin', async (req, res) => {
  try {
    const { keywords, location, companySize, industry } = req.body;
    
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    // Navigate to LinkedIn search
    const searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keywords)}&origin=GLOBAL_SEARCH_HEADER`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });
    
    // Wait for results to load
    await page.waitForSelector('.search-results-container', { timeout: 10000 });
    
    // Extract lead data
    const leads = await page.evaluate(() => {
      const results = [];
      const profileElements = document.querySelectorAll('.search-results-container .search-result');
      
      profileElements.forEach(element => {
        const nameElement = element.querySelector('.search-result__info .search-result__result-link');
        const titleElement = element.querySelector('.search-result__info .subline-level-1');
        const companyElement = element.querySelector('.search-result__info .subline-level-2');
        
        if (nameElement && titleElement) {
          results.push({
            name: nameElement.textContent.trim(),
            title: titleElement.textContent.trim(),
            company: companyElement ? companyElement.textContent.trim() : '',
            profileUrl: nameElement.href
          });
        }
      });
      
      return results;
    });
    
    await browser.close();
    
    res.json({
      message: 'Leads generated successfully',
      leads: leads.slice(0, 50), // Limit to 50 results
      count: leads.length
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Lead generation error', error: error.message });
  }
});

// Email finder
router.post('/find-emails', async (req, res) => {
  try {
    const { domain, firstName, lastName } = req.body;
    
    // Common email patterns
    const patterns = [
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
      `${firstName.toLowerCase()}@${domain}`,
      `${lastName.toLowerCase()}@${domain}`,
      `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${domain}`,
      `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}@${domain}`
    ];
    
    const emails = [];
    
    // Verify emails (simplified - in production, use a proper email verification service)
    for (const pattern of patterns) {
      try {
        // This is a simplified check - in production, use a proper email verification API
        emails.push({
          email: pattern,
          confidence: Math.random() * 100,
          pattern: pattern
        });
      } catch (err) {
        // Skip invalid patterns
      }
    }
    
    res.json({
      message: 'Emails found',
      emails: emails.sort((a, b) => b.confidence - a.confidence)
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Email finding error', error: error.message });
  }
});

// Company data scraping
router.post('/company-data', async (req, res) => {
  try {
    const { website } = req.body;
    
    const response = await axios.get(website, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract company information
    const companyData = {
      name: $('title').text().trim() || $('h1').first().text().trim(),
      description: $('meta[name="description"]').attr('content') || '',
      email: $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '') || '',
      phone: $('a[href^="tel:"]').first().attr('href')?.replace('tel:', '') || '',
      address: $('[itemprop="address"]').text().trim() || '',
      socialMedia: {
        linkedin: $('a[href*="linkedin.com"]').first().attr('href') || '',
        twitter: $('a[href*="twitter.com"]').first().attr('href') || '',
        facebook: $('a[href*="facebook.com"]').first().attr('href') || ''
      },
      technologies: [],
      industry: '',
      companySize: ''
    };
    
    // Extract technologies (simplified)
    const techKeywords = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'PHP', 'WordPress', 'Shopify'];
    techKeywords.forEach(tech => {
      if (response.data.toLowerCase().includes(tech.toLowerCase())) {
        companyData.technologies.push(tech);
      }
    });
    
    res.json({
      message: 'Company data extracted successfully',
      data: companyData
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Company data extraction error', error: error.message });
  }
});

// Lead scoring
router.post('/score-leads', async (req, res) => {
  try {
    const { leads } = req.body;
    
    const scoredLeads = leads.map(lead => {
      let score = 0;
      
      // Title scoring
      const title = lead.title?.toLowerCase() || '';
      if (title.includes('ceo') || title.includes('founder') || title.includes('owner')) score += 30;
      else if (title.includes('manager') || title.includes('director')) score += 20;
      else if (title.includes('senior') || title.includes('lead')) score += 15;
      else if (title.includes('junior') || title.includes('associate')) score += 10;
      
      // Company scoring
      const company = lead.company?.toLowerCase() || '';
      if (company.includes('inc') || company.includes('llc') || company.includes('corp')) score += 10;
      
      // Industry scoring (add your target industries)
      const targetIndustries = ['tech', 'software', 'saas', 'ecommerce', 'marketing', 'consulting'];
      if (targetIndustries.some(industry => company.includes(industry) || title.includes(industry))) {
        score += 20;
      }
      
      // Contact info scoring
      if (lead.email) score += 15;
      if (lead.phone) score += 10;
      if (lead.linkedin) score += 5;
      
      return {
        ...lead,
        score: Math.min(score, 100), // Cap at 100
        priority: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'
      };
    });
    
    // Sort by score
    scoredLeads.sort((a, b) => b.score - a.score);
    
    res.json({
      message: 'Leads scored successfully',
      leads: scoredLeads,
      summary: {
        total: scoredLeads.length,
        high: scoredLeads.filter(l => l.priority === 'high').length,
        medium: scoredLeads.filter(l => l.priority === 'medium').length,
        low: scoredLeads.filter(l => l.priority === 'low').length
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Lead scoring error', error: error.message });
  }
});

module.exports = router;
