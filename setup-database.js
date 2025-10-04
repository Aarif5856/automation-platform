#!/usr/bin/env node
/**
 * Database Setup Script
 * This script helps you set up the database for the automation project
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Environment Configuration
PORT=3000

# MongoDB Atlas (Free tier) - Get your free connection string from https://cloud.mongodb.com
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/automation-business?retryWrites=true&w=majority

# Alternative: Use local MongoDB (uncomment if you have MongoDB installed locally)
# MONGODB_URI=mongodb://localhost:27017/automation-business

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Stripe Keys (for payments)
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
} else {
  console.log('✅ .env file already exists');
}

// Test database connection
const testConnection = async () => {
  try {
    console.log('🔌 Testing database connection...');
    
    // Try to connect with a short timeout
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/automation-business', {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Database connection successful!');
    console.log('🎉 Your automation project is ready to go!');
    
    // Close connection
    await mongoose.connection.close();
    
  } catch (error) {
    console.log('❌ Database connection failed');
    console.log('💡 To fix this:');
    console.log('   1. Get a free MongoDB Atlas account: https://cloud.mongodb.com');
    console.log('   2. Create a cluster and get your connection string');
    console.log('   3. Update the MONGODB_URI in your .env file');
    console.log('   4. Or install MongoDB locally: https://www.mongodb.com/try/download/community');
    console.log('');
    console.log('⚠️ The project will still work without a database, but some features will be limited');
  }
};

// Load environment variables
require('dotenv').config();

// Run the test
testConnection();
