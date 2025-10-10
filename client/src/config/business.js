// Business Configuration
export const BUSINESS_CONFIG = {
  // Official Business Email
  email: {
    support: 'support@#',
    sales: 'sales@#',
    billing: 'billing@#',
    general: 'hello@#'
  },
  
  // PayPal Configuration
  paypal: {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || 'sb', // Use sandbox for testing
    currency: 'USD',
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
  },
  
  // Business Information
  business: {
    name: 'Automation Pro',
    website: '#',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    }
  },
  
  // Payment Messages
  messages: {
    paypal: {
      success: 'Thank you for your payment! Your order has been processed successfully.',
      error: 'Payment failed. Please try again or contact support.',
      cancelled: 'Payment was cancelled. You can try again anytime.'
    },
    email: {
      confirmation: 'We\'ve sent you a confirmation email with your order details and next steps.',
      support: 'Need help? Contact our support team at support@#'
    }
  }
};

export default BUSINESS_CONFIG;
