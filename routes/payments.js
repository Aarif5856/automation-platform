const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, customerId } = req.body;
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      customer: customerId,
      metadata: {
        orderItems: JSON.stringify(items)
      }
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, orderData } = req.body;
    
    // Retrieve payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }
    
    // Create order
    const order = new Order({
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer: orderData.customer,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'paid',
      payment: {
        method: 'stripe',
        transactionId: paymentIntent.id,
        stripePaymentIntentId: paymentIntent.id,
        status: 'succeeded'
      }
    });
    
    await order.save();
    
    // Update user credits
    await User.findByIdAndUpdate(orderData.customer, {
      $inc: { credits: orderData.totalAmount * 10 } // 10 credits per dollar
    });
    
    res.json({
      message: 'Payment confirmed successfully',
      order: order
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation error', error: error.message });
  }
});

// Get payment history
router.get('/history/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.userId })
      .populate('items.automation', 'name price')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  res.json({ received: true });
});

module.exports = router;
