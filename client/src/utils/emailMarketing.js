// Email Marketing Integration System
class EmailMarketing {
  constructor() {
    this.apiKey = process.env.REACT_APP_MAILCHIMP_API_KEY || 'your-mailchimp-api-key';
    this.listId = process.env.REACT_APP_MAILCHIMP_LIST_ID || 'your-list-id';
    this.serverPrefix = this.apiKey.split('-')[1]; // Extract server prefix from API key
    this.baseUrl = `https://${this.serverPrefix}.api.mailchimp.com/3.0`;
  }

  // Subscribe user to newsletter
  async subscribe(email, firstName = '', lastName = '', tags = []) {
    try {
      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
          tags: tags,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Email subscribed successfully:', data);
        
        // Track conversion
        if (window.analytics) {
          window.analytics.trackLead('newsletter_signup', 0);
        }
        
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('❌ Email subscription failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Email subscription error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, firstName = '') {
    try {
      const response = await fetch(`${this.baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'regular',
          recipients: {
            list_id: this.listId,
            segment_opts: {
              match: 'all',
              conditions: [
                {
                  condition_type: 'EmailAddress',
                  field: 'EMAIL',
                  op: 'is',
                  value: email
                }
              ]
            }
          },
          settings: {
            subject_line: `Welcome to AutomatePro, ${firstName}! 🚀`,
            from_name: 'AutomatePro Team',
            reply_to: 'hello@autobiz.com',
            to_name: firstName || 'Valued Customer',
          },
          content_type: 'template',
          template: {
            id: 'welcome-template-id', // Replace with your template ID
            sections: {
              main_content: `
                <h1>Welcome to AutomatePro! 🎉</h1>
                <p>Hi ${firstName || 'there'},</p>
                <p>Thank you for joining our community of successful entrepreneurs!</p>
                <p>Here's what you can expect:</p>
                <ul>
                  <li>📧 Weekly automation tips and strategies</li>
                  <li>🎯 Exclusive deals and early access to new features</li>
                  <li>💡 Case studies from successful customers</li>
                  <li>🛠️ Free tools and resources</li>
                </ul>
                <p>Ready to start automating? <a href="${window.location.origin}/pricing">Check out our plans</a></p>
                <p>Best regards,<br>The AutomatePro Team</p>
              `
            }
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Welcome email sent:', data);
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('❌ Welcome email failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Welcome email error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send abandoned cart email
  async sendAbandonedCartEmail(email, cartItems, discountCode = null) {
    try {
      const response = await fetch(`${this.baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'regular',
          recipients: {
            list_id: this.listId,
            segment_opts: {
              match: 'all',
              conditions: [
                {
                  condition_type: 'EmailAddress',
                  field: 'EMAIL',
                  op: 'is',
                  value: email
                }
              ]
            }
          },
          settings: {
            subject_line: 'Don\'t miss out! Complete your AutomatePro purchase 🛒',
            from_name: 'AutomatePro Team',
            reply_to: 'hello@autobiz.com',
          },
          content_type: 'template',
          template: {
            id: 'abandoned-cart-template-id', // Replace with your template ID
            sections: {
              main_content: `
                <h1>Your cart is waiting! 🛒</h1>
                <p>We noticed you didn't complete your purchase. Here's what you left behind:</p>
                <ul>
                  ${cartItems.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
                </ul>
                ${discountCode ? `<p><strong>Use code ${discountCode} for 10% off!</strong></p>` : ''}
                <p><a href="${window.location.origin}/checkout" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Complete Purchase</a></p>
                <p>Questions? Reply to this email and we'll help!</p>
                <p>Best regards,<br>The AutomatePro Team</p>
              `
            }
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Abandoned cart email sent:', data);
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('❌ Abandoned cart email failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Abandoned cart email error:', error);
      return { success: false, error: error.message };
    }
  }

  // Send upsell email
  async sendUpsellEmail(email, currentPlan, upsellPlan) {
    try {
      const response = await fetch(`${this.baseUrl}/campaigns`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'regular',
          recipients: {
            list_id: this.listId,
            segment_opts: {
              match: 'all',
              conditions: [
                {
                  condition_type: 'EmailAddress',
                  field: 'EMAIL',
                  op: 'is',
                  value: email
                }
              ]
            }
          },
          settings: {
            subject_line: `Upgrade to ${upsellPlan.name} and unlock more features! 🚀`,
            from_name: 'AutomatePro Team',
            reply_to: 'hello@autobiz.com',
          },
          content_type: 'template',
          template: {
            id: 'upsell-template-id', // Replace with your template ID
            sections: {
              main_content: `
                <h1>Ready to level up? 🚀</h1>
                <p>You're currently on the ${currentPlan.name} plan, but we think you'd love the ${upsellPlan.name} plan!</p>
                <h3>What you'll get with ${upsellPlan.name}:</h3>
                <ul>
                  ${upsellPlan.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                </ul>
                <p><strong>Special upgrade price: $${upsellPlan.price}/month</strong></p>
                <p><a href="${window.location.origin}/pricing?upgrade=${upsellPlan.id}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Upgrade Now</a></p>
                <p>Questions? Reply to this email and we'll help!</p>
                <p>Best regards,<br>The AutomatePro Team</p>
              `
            }
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Upsell email sent:', data);
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('❌ Upsell email failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Upsell email error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get subscriber info
  async getSubscriber(email) {
    try {
      const subscriberHash = this.createSubscriberHash(email);
      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/members/${subscriberHash}`, {
        method: 'GET',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        return { success: false, error: 'Subscriber not found' };
      }
    } catch (error) {
      console.error('❌ Get subscriber error:', error);
      return { success: false, error: error.message };
    }
  }

  // Create subscriber hash for API calls
  createSubscriberHash(email) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  }

  // Add tags to subscriber
  async addTags(email, tags) {
    try {
      const subscriberHash = this.createSubscriberHash(email);
      const response = await fetch(`${this.baseUrl}/lists/${this.listId}/members/${subscriberHash}/tags`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: tags.map(tag => ({ name: tag, status: 'active' }))
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Tags added:', data);
        return { success: true, data };
      } else {
        const error = await response.json();
        console.error('❌ Add tags failed:', error);
        return { success: false, error };
      }
    } catch (error) {
      console.error('❌ Add tags error:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const emailMarketing = new EmailMarketing();

export default emailMarketing;

// Convenience functions
export const subscribeToNewsletter = (email, firstName, lastName, tags) => 
  emailMarketing.subscribe(email, firstName, lastName, tags);

export const sendWelcomeEmail = (email, firstName) => 
  emailMarketing.sendWelcomeEmail(email, firstName);

export const sendAbandonedCartEmail = (email, cartItems, discountCode) => 
  emailMarketing.sendAbandonedCartEmail(email, cartItems, discountCode);

export const sendUpsellEmail = (email, currentPlan, upsellPlan) => 
  emailMarketing.sendUpsellEmail(email, currentPlan, upsellPlan);

export const getSubscriber = (email) => 
  emailMarketing.getSubscriber(email);

export const addSubscriberTags = (email, tags) => 
  emailMarketing.addTags(email, tags);
