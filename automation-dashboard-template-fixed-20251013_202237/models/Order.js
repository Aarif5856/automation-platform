const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    automation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Automation',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'paypal', 'bank_transfer'],
      required: true
    },
    transactionId: String,
    stripePaymentIntentId: String,
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'cancelled'],
      default: 'pending'
    }
  },
  delivery: {
    method: {
      type: String,
      enum: ['email', 'download', 'custom'],
      default: 'email'
    },
    email: String,
    downloadLink: String,
    deliveredAt: Date
  },
  notes: String,
  refundReason: String,
  refundedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
