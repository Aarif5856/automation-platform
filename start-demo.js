#!/usr/bin/env node
/**
 * Demo Startup Script for Automation Business Suite
 * ================================================
 * 
 * This script sets up and starts the complete demo environment
 * with all necessary configurations and sample data.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

class DemoStarter {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.demoMode = true;
  }

  async checkDependencies() {
    console.log('🔍 Checking dependencies...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    console.log(`✅ Node.js version: ${nodeVersion}`);
    
    if (parseInt(nodeVersion.slice(1).split('.')[0]) < 16) {
      console.warn('⚠️ Warning: Node.js 16+ recommended for optimal performance');
    }
    
    // Check if npm is available
    try {
      execSync('npm --version', { stdio: 'pipe' });
      console.log('✅ npm is available');
    } catch (error) {
      console.error('❌ npm is not available');
      process.exit(1);
    }
  }

  async installDependencies() {
    console.log('📦 Installing dependencies...');
    
    try {
      // Install root dependencies
      console.log('├── Installing root dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      
      // Install client dependencies
      console.log('├── Installing client dependencies...');
      execSync('cd client && npm install', { stdio: 'inherit' });
      
      console.log('✅ All dependencies installed successfully');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      process.exit(1);
    }
  }

  async setupDemoEnvironment() {
    console.log('🎭 Setting up demo environment...');
    
    try {
      // Set demo mode environment variable
      process.env.DEMO_MODE = 'true';
      process.env.NODE_ENV = 'development';
      
      // Create .env file if it doesn't exist
      if (!fs.existsSync('.env')) {
        const envContent = `
# Demo Environment Configuration
NODE_ENV=development
PORT=${this.port}
DEMO_MODE=true

# Database (using demo database)
MONGODB_URI=mongodb://localhost:27017/automation_business_demo

# JWT Secret for demo
JWT_SECRET=demo-jwt-secret-key-${Date.now()}

# Frontend Configuration
REACT_APP_API_URL=http://localhost:${this.port}/api
REACT_APP_DEMO_MODE=true
`;
        fs.writeFileSync('.env', envContent);
        console.log('├── Created .env file');
      }
      
      // Create client .env file
      const clientEnvContent = `
REACT_APP_API_URL=http://localhost:${this.port}/api
REACT_APP_DEMO_MODE=true
`;
      fs.writeFileSync('client/.env', clientEnvContent);
      console.log('├── Created client/.env file');
      
      console.log('✅ Demo environment configured');
    } catch (error) {
      console.error('❌ Failed to setup demo environment:', error.message);
      process.exit(1);
    }
  }

  async setupDemoData() {
    console.log('📊 Setting up demo data...');
    
    try {
      // Run demo setup script
      execSync('node demo-setup.js', { stdio: 'inherit' });
      console.log('✅ Demo data setup complete');
    } catch (error) {
      console.error('❌ Failed to setup demo data:', error.message);
      // Continue anyway, demo can work without database
      console.log('⚠️ Continuing without database setup...');
    }
  }

  async buildClient() {
    console.log('🔨 Building React client...');
    
    try {
      execSync('cd client && npm run build', { stdio: 'inherit' });
      console.log('✅ React client built successfully');
    } catch (error) {
      console.error('❌ Failed to build React client:', error.message);
      console.log('⚠️ Starting server without client build...');
      return false;
    }
    
    return true;
  }

  async startServer() {
    console.log('🚀 Starting demo server...');
    
    try {
      // Start the server
      const server = spawn('node', ['server.js'], {
        stdio: 'inherit',
        env: {
          ...process.env,
          DEMO_MODE: 'true',
          PORT: this.port.toString()
        }
      });
      
      // Handle server process
      server.on('error', (error) => {
        console.error('❌ Server error:', error);
      });
      
      server.on('exit', (code) => {
        if (code !== 0) {
          console.error(`❌ Server exited with code ${code}`);
        }
      });
      
      // Wait a moment for server to start
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`✅ Demo server started successfully!`);
      console.log(`🌐 Demo URL: http://localhost:${this.port}`);
      console.log(`🎭 Demo mode: ENABLED`);
      
      return server;
      
    } catch (error) {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    }
  }

  displayDemoInfo() {
    console.log('\n🎉 DEMO ENVIRONMENT READY!');
    console.log('=====================================');
    console.log(`🌐 Demo URL: http://localhost:${this.port}`);
    console.log('🎭 Demo Mode: ENABLED');
    console.log('\n🔑 Demo Login Credentials:');
    console.log('├── Admin: demo@automation-suite.com / demo123');
    console.log('├── Client: client@demo.com / client123');
    console.log('└── Viewer: viewer@demo.com / viewer123');
    console.log('\n✨ Demo Features:');
    console.log('├── LinkedIn Lead Generator (with sample data)');
    console.log('├── Email Campaign Manager (test campaigns)');
    console.log('├── Web Scraping Tools (demo extractions)');
    console.log('├── Analytics Dashboard (sample metrics)');
    console.log('└── Client Management System');
    console.log('\n📊 Demo Data Included:');
    console.log('├── 50+ Sample leads');
    console.log('├── 3 Email campaigns');
    console.log('├── 5 Email templates');
    console.log('└── 30-day analytics history');
    console.log('\n🎬 Next Steps:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Login with demo credentials');
    console.log('3. Explore all features');
    console.log('4. Record demo video');
    console.log('5. Deploy to hosting platform');
    console.log('6. Submit to CodeCanyon');
    console.log('\n🚀 Ready to start earning revenue!');
    console.log('=====================================\n');
  }

  async run() {
    console.log('🚀 Starting Automation Business Suite Demo Setup...\n');
    
    try {
      // Check dependencies
      await this.checkDependencies();
      
      // Install dependencies
      await this.installDependencies();
      
      // Setup demo environment
      await this.setupDemoEnvironment();
      
      // Setup demo data
      await this.setupDemoData();
      
      // Build client
      const buildSuccess = await this.buildClient();
      
      // Display demo information
      this.displayDemoInfo();
      
      // Start server
      const server = await this.startServer();
      
      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down demo server...');
        if (server) {
          server.kill('SIGTERM');
        }
        process.exit(0);
      });
      
      // Keep the process running
      if (server) {
        server.on('exit', () => {
          console.log('👋 Demo server stopped');
          process.exit(0);
        });
      }
      
    } catch (error) {
      console.error('❌ Demo setup failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the demo starter
if (require.main === module) {
  const starter = new DemoStarter();
  starter.run();
}

module.exports = DemoStarter;



