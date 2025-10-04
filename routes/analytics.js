const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Automation = require('../models/Automation');
const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    // Get orders in date range
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: now },
      status: { $in: ['paid', 'completed'] }
    }).populate('items.automation');
    
    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Get top selling automations
    const automationSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const automationId = item.automation._id.toString();
        if (!automationSales[automationId]) {
          automationSales[automationId] = {
            name: item.automation.name,
            sales: 0,
            revenue: 0
          };
        }
        automationSales[automationId].sales += item.quantity;
        automationSales[automationId].revenue += item.price * item.quantity;
      });
    });
    
    const topAutomations = Object.values(automationSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    
    // Get daily revenue for chart
    const dailyRevenue = {};
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!dailyRevenue[date]) {
        dailyRevenue[date] = 0;
      }
      dailyRevenue[date] += order.totalAmount;
    });
    
    const revenueChart = Object.entries(dailyRevenue)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Get user metrics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ 
      lastLogin: { $gte: startDate } 
    });
    const newUsers = await User.countDocuments({ 
      createdAt: { $gte: startDate } 
    });
    
    res.json({
      period,
      revenue: {
        total: totalRevenue,
        average: averageOrderValue,
        chart: revenueChart
      },
      orders: {
        total: totalOrders,
        chart: revenueChart.map(item => ({ date: item.date, orders: 0 })) // Simplified
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        new: newUsers
      },
      topAutomations,
      growth: {
        revenue: calculateGrowthRate(revenueChart),
        orders: 0, // Simplified
        users: 0 // Simplified
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
});

// Get automation performance
router.get('/automations', async (req, res) => {
  try {
    const automations = await Automation.find({ isActive: true })
      .populate('createdBy', 'name')
      .sort({ salesCount: -1 });
    
    const performance = automations.map(automation => ({
      id: automation._id,
      name: automation.name,
      category: automation.category,
      price: automation.price,
      sales: automation.salesCount,
      revenue: automation.salesCount * automation.price,
      rating: automation.rating.average,
      reviews: automation.rating.count,
      createdAt: automation.createdAt
    }));
    
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
});

// Get customer analytics
router.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('name email createdAt lastLogin subscription')
      .sort({ createdAt: -1 });
    
    const customerData = customers.map(customer => {
      const totalSpent = 0; // This would require aggregation
      const orderCount = 0; // This would require aggregation
      
      return {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        joinedAt: customer.createdAt,
        lastLogin: customer.lastLogin,
        plan: customer.subscription.plan,
        totalSpent,
        orderCount,
        status: customer.subscription.status
      };
    });
    
    res.json(customerData);
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
});

// Helper function to calculate growth rate
function calculateGrowthRate(data) {
  if (data.length < 2) return 0;
  
  const first = data[0].revenue;
  const last = data[data.length - 1].revenue;
  
  if (first === 0) return last > 0 ? 100 : 0;
  
  return ((last - first) / first) * 100;
}

module.exports = router;
