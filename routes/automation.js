const express = require('express');
const Automation = require('../models/Automation');
const router = express.Router();

// Get all automations
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'createdAt', order = 'desc' } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    const automations = await Automation.find(query)
      .sort(sortObj)
      .populate('createdBy', 'name email');
    
    res.json(automations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single automation
router.get('/:id', async (req, res) => {
  try {
    const automation = await Automation.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!automation) {
      return res.status(404).json({ message: 'Automation not found' });
    }
    
    res.json(automation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create automation (admin only)
router.post('/', async (req, res) => {
  try {
    const automation = new Automation(req.body);
    await automation.save();
    res.status(201).json(automation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update automation
router.put('/:id', async (req, res) => {
  try {
    const automation = await Automation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!automation) {
      return res.status(404).json({ message: 'Automation not found' });
    }
    
    res.json(automation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete automation
router.delete('/:id', async (req, res) => {
  try {
    const automation = await Automation.findByIdAndDelete(req.params.id);
    
    if (!automation) {
      return res.status(404).json({ message: 'Automation not found' });
    }
    
    res.json({ message: 'Automation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Automation.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
