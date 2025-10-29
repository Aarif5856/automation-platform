// Analytics and Tracking System
class Analytics {
  constructor() {
    this.isInitialized = false;
    this.events = [];
    this.userProperties = {};
  }

  // Initialize analytics (Google Analytics, Hotjar, etc.)
  init() {
    if (this.isInitialized) return;

    // Google Analytics 4
    this.initGoogleAnalytics();
    
    // Hotjar
    this.initHotjar();
    
    // Custom event tracking
    this.setupEventListeners();
    
    this.isInitialized = true;
    console.log('📊 Analytics initialized');
  }

  initGoogleAnalytics() {
    // Replace with your actual GA4 measurement ID from Google Analytics
    // For demo/sale purposes, this shows the structure - buyer should add their own GA4 ID
    const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    window.gtag = gtag;
  }

  initHotjar() {
    // Replace with your actual Hotjar site ID
    const HOTJAR_SITE_ID = 'YOUR_HOTJAR_SITE_ID';
    
    if (HOTJAR_SITE_ID === 'YOUR_HOTJAR_SITE_ID') return;

    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:HOTJAR_SITE_ID,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }

  setupEventListeners() {
    // Track page views
    this.trackPageView();
    
    // Track button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, a, [role="button"]')) {
        this.trackEvent('click', {
          element: e.target.tagName,
          text: e.target.textContent?.trim(),
          href: e.target.href,
          className: e.target.className
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      this.trackEvent('form_submit', {
        form_id: e.target.id,
        form_class: e.target.className,
        form_action: e.target.action
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.trackEvent('scroll_depth', {
          percentage: scrollPercent
        });
      }
    });
  }

  // Track page views
  trackPageView(page = null) {
    const pageData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    if (window.gtag) {
      window.gtag('event', 'page_view', pageData);
    }

    this.events.push({
      type: 'page_view',
      data: pageData,
      timestamp: new Date().toISOString()
    });

    console.log('📄 Page view tracked:', pageData);
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    const eventData = {
      event_name: eventName,
      ...parameters,
      timestamp: new Date().toISOString(),
      user_id: this.getUserId(),
      session_id: this.getSessionId()
    };

    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    this.events.push({
      type: 'custom_event',
      data: eventData,
      timestamp: new Date().toISOString()
    });

    console.log('🎯 Event tracked:', eventData);
  }

  // Track user properties
  setUserProperties(properties) {
    this.userProperties = { ...this.userProperties, ...properties };
    
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        user_properties: this.userProperties
      });
    }

    console.log('👤 User properties set:', properties);
  }

  // Track conversions
  trackConversion(conversionType, value = null, currency = 'USD') {
    const conversionData = {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      timestamp: new Date().toISOString()
    };

    if (window.gtag) {
      window.gtag('event', 'conversion', conversionData);
    }

    this.events.push({
      type: 'conversion',
      data: conversionData,
      timestamp: new Date().toISOString()
    });

    console.log('💰 Conversion tracked:', conversionData);
  }

  // Track e-commerce events
  trackPurchase(transactionId, value, currency = 'USD', items = []) {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
      });
    }

    this.trackConversion('purchase', value, currency);
  }

  // Track lead generation
  trackLead(leadSource, leadValue = null) {
    this.trackEvent('generate_lead', {
      lead_source: leadSource,
      lead_value: leadValue
    });

    this.trackConversion('lead', leadValue);
  }

  // Get user ID (from localStorage or generate)
  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  // Get session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Get analytics data
  getAnalyticsData() {
    return {
      events: this.events,
      userProperties: this.userProperties,
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    };
  }

  // Export data for analysis
  exportData() {
    const data = this.getAnalyticsData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Create singleton instance
const analytics = new Analytics();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => analytics.init());
} else {
  analytics.init();
}

export default analytics;

// Convenience functions
export const trackEvent = (eventName, parameters) => analytics.trackEvent(eventName, parameters);
export const trackPageView = (page) => analytics.trackPageView(page);
export const trackConversion = (type, value, currency) => analytics.trackConversion(type, value, currency);
export const trackLead = (source, value) => analytics.trackLead(source, value);
export const trackPurchase = (id, value, currency, items) => analytics.trackPurchase(id, value, currency, items);
export const setUserProperties = (properties) => analytics.setUserProperties(properties);
