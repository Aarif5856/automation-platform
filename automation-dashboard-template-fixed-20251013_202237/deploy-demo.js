#!/usr/bin/env node
/**
 * Demo Deployment Script for Automation Business Suite
 * ===================================================
 * 
 * This script deploys the demo environment to various hosting platforms:
 * - Netlify (Frontend)
 * - Railway/Render (Backend)
 * - MongoDB Atlas (Database)
 * - Vercel (Alternative)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DemoDeployer {
  constructor() {
    this.deploymentConfig = {
      platforms: {
        netlify: {
          name: 'Netlify',
          frontend: true,
          free: true,
          setup: this.setupNetlify.bind(this)
        },
        railway: {
          name: 'Railway',
          backend: true,
          free: true,
          setup: this.setupRailway.bind(this)
        },
        render: {
          name: 'Render',
          backend: true,
          free: true,
          setup: this.setupRender.bind(this)
        },
        vercel: {
          name: 'Vercel',
          fullstack: true,
          free: true,
          setup: this.setupVercel.bind(this)
        }
      }
    };
  }

  async setupNetlify() {
    console.log('🚀 Setting up Netlify deployment...');
    
    // Create netlify.toml configuration
    const netlifyConfig = `
[build]
  publish = "client/build"
  command = "cd client && npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.railway.app/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production]
  command = "cd client && npm run build"

[context.deploy-preview]
  command = "cd client && npm run build"

[context.branch-deploy]
  command = "cd client && npm run build"
`;

    fs.writeFileSync('netlify.toml', netlifyConfig);
    
    // Create build script
    const buildScript = `
#!/bin/bash
echo "🔧 Building React app for Netlify..."
cd client
npm install
npm run build
echo "✅ Build complete!"
`;

    fs.writeFileSync('build.sh', buildScript);
    fs.chmodSync('build.sh', '755');
    
    // Create deployment instructions
    const netlifyInstructions = `
# Netlify Deployment Instructions

## 1. Connect Repository
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select the repository

## 2. Build Settings
- **Build command:** \`cd client && npm run build\`
- **Publish directory:** \`client/build\`
- **Node version:** 18

## 3. Environment Variables
Add these environment variables in Netlify:
- \`REACT_APP_API_URL\` = https://your-backend-url.railway.app
- \`REACT_APP_DEMO_MODE\` = true

## 4. Deploy
1. Click "Deploy site"
2. Wait for build to complete
3. Your demo will be live at: https://your-site-name.netlify.app

## 5. Custom Domain (Optional)
1. Go to "Domain settings"
2. Add custom domain
3. Update DNS records
`;

    fs.writeFileSync('NETLIFY_DEPLOYMENT.md', netlifyInstructions);
    
    console.log('✅ Netlify configuration created!');
    console.log('📋 See NETLIFY_DEPLOYMENT.md for deployment instructions');
  }

  async setupRailway() {
    console.log('🚀 Setting up Railway deployment...');
    
    // Create railway.json configuration
    const railwayConfig = {
      "$schema": "https://railway.app/railway.schema.json",
      "build": {
        "builder": "NIXPACKS",
        "buildCommand": "npm install && cd client && npm install && npm run build"
      },
      "deploy": {
        "startCommand": "npm start",
        "healthcheckPath": "/api/health",
        "healthcheckTimeout": 100,
        "restartPolicyType": "ON_FAILURE",
        "restartPolicyMaxRetries": 10
      }
    };

    fs.writeFileSync('railway.json', JSON.stringify(railwayConfig, null, 2));
    
    // Create Railway deployment instructions
    const railwayInstructions = `
# Railway Deployment Instructions

## 1. Connect Repository
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

## 2. Environment Variables
Add these environment variables in Railway:
- \`NODE_ENV\` = production
- \`PORT\` = 3000
- \`MONGODB_URI\` = your-mongodb-atlas-connection-string
- \`DEMO_MODE\` = true
- \`JWT_SECRET\` = your-jwt-secret-key

## 3. Database Setup
1. Add MongoDB service in Railway
2. Copy connection string to MONGODB_URI
3. Run database migrations

## 4. Deploy
1. Railway will automatically deploy on git push
2. Your API will be available at: https://your-app.railway.app
3. Update frontend API_URL to point to this URL

## 5. Custom Domain (Optional)
1. Go to "Settings" → "Domains"
2. Add custom domain
3. Update DNS records
`;

    fs.writeFileSync('RAILWAY_DEPLOYMENT.md', railwayInstructions);
    
    console.log('✅ Railway configuration created!');
    console.log('📋 See RAILWAY_DEPLOYMENT.md for deployment instructions');
  }

  async setupRender() {
    console.log('🚀 Setting up Render deployment...');
    
    // Create render.yaml configuration
    const renderConfig = `
services:
  - type: web
    name: automation-business-suite
    env: node
    buildCommand: npm install && cd client && npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: MONGODB_URI
        fromDatabase:
          name: automation-db
          property: connectionString
      - key: DEMO_MODE
        value: true
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: automation-db
    databaseName: automation_business
    user: automation_user
`;

    fs.writeFileSync('render.yaml', renderConfig);
    
    // Create Render deployment instructions
    const renderInstructions = `
# Render Deployment Instructions

## 1. Connect Repository
1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select the repository

## 2. Service Configuration
- **Name:** automation-business-suite
- **Environment:** Node
- **Build Command:** \`npm install && cd client && npm install && npm run build\`
- **Start Command:** \`npm start\`

## 3. Environment Variables
- \`NODE_ENV\` = production
- \`PORT\` = 3000
- \`MONGODB_URI\` = your-mongodb-connection-string
- \`DEMO_MODE\` = true
- \`JWT_SECRET\` = auto-generated

## 4. Database Setup
1. Create MongoDB database in Render
2. Copy connection string to MONGODB_URI
3. Database will be automatically provisioned

## 5. Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your app will be available at: https://your-app.onrender.com

## 6. Custom Domain (Optional)
1. Go to "Settings" → "Custom Domains"
2. Add custom domain
3. Update DNS records
`;

    fs.writeFileSync('RENDER_DEPLOYMENT.md', renderInstructions);
    
    console.log('✅ Render configuration created!');
    console.log('📋 See RENDER_DEPLOYMENT.md for deployment instructions');
  }

  async setupVercel() {
    console.log('🚀 Setting up Vercel deployment...');
    
    // Create vercel.json configuration
    const vercelConfig = {
      "version": 2,
      "builds": [
        {
          "src": "client/package.json",
          "use": "@vercel/static-build",
          "config": {
            "distDir": "build"
          }
        },
        {
          "src": "server.js",
          "use": "@vercel/node"
        }
      ],
      "routes": [
        {
          "src": "/api/(.*)",
          "dest": "/server.js"
        },
        {
          "src": "/(.*)",
          "dest": "/client/build/$1"
        }
      ],
      "env": {
        "DEMO_MODE": "true",
        "NODE_ENV": "production"
      }
    };

    fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
    
    // Create Vercel deployment instructions
    const vercelInstructions = `
# Vercel Deployment Instructions

## 1. Install Vercel CLI
\`\`\`bash
npm i -g vercel
\`\`\`

## 2. Deploy
\`\`\`bash
vercel --prod
\`\`\`

## 3. Environment Variables
Add these in Vercel dashboard:
- \`MONGODB_URI\` = your-mongodb-connection-string
- \`JWT_SECRET\` = your-jwt-secret-key
- \`DEMO_MODE\` = true

## 4. Database Setup
1. Use MongoDB Atlas (free tier)
2. Create cluster and database
3. Get connection string
4. Add to environment variables

## 5. Custom Domain (Optional)
1. Go to "Domains" in Vercel dashboard
2. Add custom domain
3. Update DNS records

## 6. Automatic Deployments
- Connect GitHub repository
- Automatic deployments on git push
- Preview deployments for pull requests
`;

    fs.writeFileSync('VERCEL_DEPLOYMENT.md', vercelInstructions);
    
    console.log('✅ Vercel configuration created!');
    console.log('📋 See VERCEL_DEPLOYMENT.md for deployment instructions');
  }

  async createDockerfile() {
    console.log('🐳 Creating Docker configuration...');
    
    const dockerfile = `
# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build React app
RUN cd client && npm run build

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV DEMO_MODE=true

# Start the application
CMD ["npm", "start"]
`;

    fs.writeFileSync('Dockerfile', dockerfile);
    
    // Create docker-compose.yml for local development
    const dockerCompose = `
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DEMO_MODE=true
      - MONGODB_URI=mongodb://mongo:27017/automation_business
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
`;

    fs.writeFileSync('docker-compose.yml', dockerCompose);
    
    console.log('✅ Docker configuration created!');
  }

  async createEnvironmentFiles() {
    console.log('🔧 Creating environment configuration files...');
    
    // Create .env.example
    const envExample = `
# Demo Environment Configuration
NODE_ENV=production
PORT=3000
DEMO_MODE=true

# Database
MONGODB_URI=mongodb://localhost:27017/automation_business

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_DEMO_MODE=true

# Email Configuration (for demo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# LinkedIn Configuration (for demo)
LINKEDIN_USERNAME=demo@example.com
LINKEDIN_PASSWORD=demo-password

# Stripe Configuration (for demo)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
`;

    fs.writeFileSync('.env.example', envExample);
    
    // Create .env.local for local development
    const envLocal = `
# Local Development Environment
NODE_ENV=development
PORT=3000
DEMO_MODE=true

# Database
MONGODB_URI=mongodb://localhost:27017/automation_business_demo

# JWT Secret
JWT_SECRET=demo-jwt-secret-key

# Frontend Configuration
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_DEMO_MODE=true
`;

    fs.writeFileSync('.env.local', envLocal);
    
    console.log('✅ Environment files created!');
  }

  async createHealthCheck() {
    console.log('🏥 Creating health check endpoint...');
    
    const healthCheckRoute = `
const express = require('express');
const router = express.Router();

// Health check endpoint for deployment platforms
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    demo_mode: process.env.DEMO_MODE === 'true',
    version: '1.0.0'
  });
});

// Demo status endpoint
router.get('/demo/status', (req, res) => {
  res.status(200).json({
    demo_mode: true,
    features: {
      linkedin: true,
      email: true,
      scraping: true,
      analytics: true
    },
    limits: {
      linkedin_searches: 5,
      emails_per_day: 10,
      scraping_requests: 20
    },
    uptime: process.uptime()
  });
});

module.exports = router;
`;

    fs.writeFileSync('routes/health.js', healthCheckRoute);
    
    // Update server.js to include health check
    const serverUpdate = `
// Add this to your server.js file
app.use('/api/health', require('./routes/health'));
`;

    fs.writeFileSync('HEALTH_CHECK_UPDATE.md', serverUpdate);
    
    console.log('✅ Health check endpoint created!');
  }

  async createDeploymentScript() {
    console.log('📜 Creating deployment script...');
    
    const deployScript = `
#!/bin/bash

echo "🚀 Starting Automation Business Suite Demo Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd client && npm install && cd ..

# Build the application
echo "🔨 Building application..."
cd client && npm run build && cd ..

# Set up demo environment
echo "🎭 Setting up demo environment..."
node demo-setup.js

# Start the application
echo "🚀 Starting application..."
echo "📱 Demo will be available at: http://localhost:3000"
echo "🔑 Demo credentials:"
echo "   Admin: demo@automation-suite.com / demo123"
echo "   Client: client@demo.com / client123"
echo "   Viewer: viewer@demo.com / viewer123"

npm start
`;

    fs.writeFileSync('deploy.sh', deployScript);
    fs.chmodSync('deploy.sh', '755');
    
    console.log('✅ Deployment script created!');
  }

  async createQuickStartGuide() {
    console.log('📚 Creating quick start guide...');
    
    const quickStartGuide = `
# 🚀 Quick Start Guide - Automation Business Suite Demo

## 🎯 **GET STARTED IN 5 MINUTES**

### **Option 1: Local Demo (Recommended)**
\`\`\`bash
# 1. Clone the repository
git clone <your-repo-url>
cd automation-business-suite

# 2. Run the deployment script
chmod +x deploy.sh
./deploy.sh
\`\`\`

### **Option 2: Manual Setup**
\`\`\`bash
# 1. Install dependencies
npm install
cd client && npm install && cd ..

# 2. Set up demo environment
node demo-setup.js

# 3. Start the application
npm start
\`\`\`

### **Option 3: Docker (Alternative)**
\`\`\`bash
# 1. Build and run with Docker
docker-compose up --build
\`\`\`

---

## 🌐 **ACCESS YOUR DEMO**

### **Demo URL:** http://localhost:3000

### **Demo Credentials:**
- **Admin:** demo@automation-suite.com / demo123
- **Client:** client@demo.com / client123  
- **Viewer:** viewer@demo.com / viewer123

### **Demo Features:**
- ✅ LinkedIn Lead Generator (with sample data)
- ✅ Email Campaign Manager (test campaigns)
- ✅ Web Scraping Tools (demo extractions)
- ✅ Analytics Dashboard (sample metrics)
- ✅ Client Management System

---

## 📊 **DEMO DATA INCLUDED**

- **50+ Sample Leads** - Realistic contact information
- **3 Email Campaigns** - With actual results
- **5 Email Templates** - Professional designs
- **30-day Analytics** - Revenue and performance data
- **Client Testimonials** - Success stories

---

## 🚀 **DEPLOY TO HOSTING**

### **Free Hosting Options:**

#### **1. Netlify + Railway (Recommended)**
- Frontend: Netlify (free)
- Backend: Railway (free)
- Database: MongoDB Atlas (free)

#### **2. Vercel (Full-stack)**
- Everything on Vercel (free)
- MongoDB Atlas database

#### **3. Render (Full-stack)**
- Everything on Render (free)
- Built-in MongoDB

### **Deployment Steps:**
1. Choose your hosting platform
2. Follow the deployment guide (NETLIFY_DEPLOYMENT.md, etc.)
3. Set up environment variables
4. Deploy your demo
5. Share the live URL

---

## 🎬 **CREATE DEMO VIDEO**

### **Video Requirements:**
- **Length:** 3-5 minutes
- **Quality:** 1080p minimum
- **Content:** Complete user journey

### **Script:** See DEMO_VIDEO_SCRIPT.md

### **Recording Tools:**
- **Free:** OBS Studio, Loom
- **Paid:** Camtasia, ScreenFlow

---

## 📋 **MARKETPLACE SUBMISSION**

### **Required for CodeCanyon:**
- [ ] Working demo URL
- [ ] Demo video (YouTube/Vimeo)
- [ ] 10+ high-quality screenshots
- [ ] Complete documentation
- [ ] Installation guide
- [ ] Support information

### **Screenshots Needed:**
1. Dashboard overview
2. LinkedIn automation
3. Email campaigns
4. Web scraping
5. Analytics dashboard
6. Lead management
7. Mobile responsive
8. Revenue metrics
9. Client testimonials
10. Admin panel

---

## 🎯 **SUCCESS METRICS**

### **Demo Performance:**
- Page load time: < 3 seconds
- All features working
- Mobile responsive
- Professional appearance

### **Marketplace Success:**
- Item approved within 7 days
- 4.5+ star rating
- 100+ sales in first month
- Featured item status

---

## 🆘 **SUPPORT & HELP**

### **Common Issues:**
1. **Port 3000 in use:** Change PORT in .env
2. **Database connection:** Check MongoDB URI
3. **Build errors:** Run \`npm install\` in both directories
4. **Demo not loading:** Check demo-setup.js ran successfully

### **Getting Help:**
- Check the documentation files
- Review deployment guides
- Contact support with specific error messages

---

## 🚀 **READY TO LAUNCH!**

Your automation business suite demo is ready to:
1. **Impress reviewers** with professional functionality
2. **Generate sales** with proven value proposition
3. **Build your business** with complete automation tools

**Next Steps:**
1. Test all features locally
2. Deploy to hosting platform
3. Record demo video
4. Submit to CodeCanyon
5. Start earning revenue!

---

*Your automation business is ready to dominate the marketplace! 🚀*
`;

    fs.writeFileSync('QUICK_START_GUIDE.md', quickStartGuide);
    
    console.log('✅ Quick start guide created!');
  }

  async run() {
    console.log('🚀 Starting Demo Deployment Setup...\n');
    
    try {
      // Create all deployment configurations
      await this.setupNetlify();
      await this.setupRailway();
      await this.setupRender();
      await this.setupVercel();
      
      // Create additional files
      await this.createDockerfile();
      await this.createEnvironmentFiles();
      await this.createHealthCheck();
      await this.createDeploymentScript();
      await this.createQuickStartGuide();
      
      console.log('\n🎉 Demo deployment setup completed successfully!');
      console.log('\n📁 Files Created:');
      console.log('├── netlify.toml (Netlify configuration)');
      console.log('├── railway.json (Railway configuration)');
      console.log('├── render.yaml (Render configuration)');
      console.log('├── vercel.json (Vercel configuration)');
      console.log('├── Dockerfile (Docker configuration)');
      console.log('├── docker-compose.yml (Local Docker setup)');
      console.log('├── .env.example (Environment template)');
      console.log('├── .env.local (Local environment)');
      console.log('├── deploy.sh (Deployment script)');
      console.log('└── QUICK_START_GUIDE.md (Complete guide)');
      
      console.log('\n📋 Deployment Guides:');
      console.log('├── NETLIFY_DEPLOYMENT.md');
      console.log('├── RAILWAY_DEPLOYMENT.md');
      console.log('├── RENDER_DEPLOYMENT.md');
      console.log('└── VERCEL_DEPLOYMENT.md');
      
      console.log('\n🚀 Quick Start:');
      console.log('1. Run: chmod +x deploy.sh && ./deploy.sh');
      console.log('2. Visit: http://localhost:3000');
      console.log('3. Login: demo@automation-suite.com / demo123');
      console.log('4. Explore all features');
      console.log('5. Deploy to hosting platform');
      
      console.log('\n🎬 Next Steps:');
      console.log('1. Test demo locally');
      console.log('2. Deploy to hosting');
      console.log('3. Record demo video');
      console.log('4. Submit to CodeCanyon');
      console.log('5. Start earning revenue!');
      
    } catch (error) {
      console.error('❌ Error setting up deployment:', error);
      process.exit(1);
    }
  }
}

// Run the deployment setup
if (require.main === module) {
  const deployer = new DemoDeployer();
  deployer.run();
}

module.exports = DemoDeployer;
