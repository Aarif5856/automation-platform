const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('client/build'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/automation', require('./routes/automation'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/analytics', require('./routes/analytics'));

// Demo routes (when in demo mode)
if (process.env.DEMO_MODE === 'true') {
  app.use('/api/demo', require('./routes/demo'));
  console.log('🎭 Demo mode enabled - Demo API routes available at /api/demo');
}

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Database connection with fallback
const connectDB = async () => {
  try {
    // Try MongoDB Atlas first, then local, then skip if both fail
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/automation-business';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.warn('⚠️ Database connection failed, running without database');
    console.warn('💡 To enable full functionality, set MONGODB_URI environment variable');
    console.warn('💡 Or install MongoDB locally: https://www.mongodb.com/try/download/community');
  }
};

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💰 Your automation business is ready to make money!`);
});
