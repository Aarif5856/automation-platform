# 🚀 TemplateMonster Installation Guide - Complete Setup

## 📋 **Installation Requirements**

### **System Requirements:**
- **Node.js:** Version 16.0 or higher
- **Python:** Version 3.8 or higher
- **MongoDB:** Version 4.4 or higher (or MongoDB Atlas)
- **Git:** For cloning the repository
- **Operating System:** Windows 10+, macOS 10.15+, or Linux

### **Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🛠️ **Step-by-Step Installation**

### **Step 1: Download and Extract Template**

1. **Download the template package** from TemplateMonster
2. **Extract the ZIP file** to your desired location
3. **Open terminal/command prompt** in the extracted folder

```bash
# Navigate to the template directory
cd automation-business-dashboard-template
```

### **Step 2: Install Node.js Dependencies**

```bash
# Install frontend dependencies
cd client
npm install

# Go back to root directory
cd ..

# Install backend dependencies
npm install
```

**If you encounter errors:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json

# Reinstall
npm install
cd client && npm install && cd ..
```

### **Step 3: Install Python Dependencies**

```bash
# Install Python packages
pip install -r requirements.txt

# If you have multiple Python versions, use:
python3 -m pip install -r requirements.txt
```

**If you encounter errors:**
```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Install with user flag
pip install --user -r requirements.txt
```

### **Step 4: Database Setup**

#### **Option A: MongoDB Atlas (Recommended)**

1. **Create free account** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create a new cluster** (free tier available)
3. **Get connection string** from Atlas dashboard
4. **Update configuration:**

```bash
# Create environment file
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/automation_db
JWT_SECRET=your_jwt_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=3001
```

#### **Option B: Local MongoDB**

1. **Install MongoDB locally:**
   - Windows: Download from [mongodb.com](https://mongodb.com)
   - macOS: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB service:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Update .env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/automation_db
   ```

### **Step 5: Google OAuth Setup (Optional)**

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create new project** or select existing
3. **Enable Google+ API**
4. **Create OAuth 2.0 credentials**
5. **Add authorized redirect URIs:**
   - `http://localhost:3001/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback`

6. **Update .env file with credentials:**
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

### **Step 6: Initialize Database**

```bash
# Run database setup script
node setup-database.js
```

**Expected output:**
```
✅ Database connected successfully
✅ Sample data created
✅ Admin user created: admin@example.com
✅ Demo users created
✅ Database setup complete!
```

### **Step 7: Start the Application**

```bash
# Start the backend server
npm start

# In a new terminal, start the frontend
cd client
npm start
```

**Expected output:**
```
Backend server running on http://localhost:3001
Frontend server running on http://localhost:3000
```

### **Step 8: Access the Application**

1. **Open browser** and go to `http://localhost:3000`
2. **Login with demo credentials:**
   - Email: `demo@example.com`
   - Password: `demo123`

---

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: "Module not found" errors**

**Solution:**
```bash
# Clear all caches and reinstall
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
npm cache clean --force
npm install
cd client && npm install && cd ..
```

### **Issue 2: "Port already in use" error**

**Solution:**
```bash
# Kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or change port in package.json
```

### **Issue 3: MongoDB connection failed**

**Solution:**
1. **Check MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

2. **Verify connection string in .env file**
3. **Check firewall settings**
4. **For Atlas: Verify IP whitelist**

### **Issue 4: Python dependencies not installing**

**Solution:**
```bash
# Use virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### **Issue 5: "EADDRINUSE" error**

**Solution:**
```bash
# Find and kill process using port
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

---

## 📱 **Mobile Setup (Optional)**

### **For Mobile Development:**

1. **Install React Native CLI:**
   ```bash
   npm install -g @react-native-community/cli
   ```

2. **Install Android Studio** (for Android)
3. **Install Xcode** (for iOS - macOS only)

---

## 🌐 **Production Deployment**

### **Deploy to Heroku:**

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### **Deploy to Vercel:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

---

## 📊 **Verification Checklist**

After installation, verify these features work:

- [ ] **Frontend loads** at `http://localhost:3000`
- [ ] **Backend API responds** at `http://localhost:3001/api`
- [ ] **Database connection** established
- [ ] **User authentication** works
- [ ] **Dashboard displays** correctly
- [ ] **All automation tools** load
- [ ] **Mobile responsive** design works
- [ ] **No console errors** in browser

---

## 🆘 **Getting Help**

### **If you're still having issues:**

1. **Check the console** for error messages
2. **Verify all dependencies** are installed correctly
3. **Ensure ports 3000 and 3001** are available
4. **Check MongoDB** is running and accessible
5. **Review the .env file** configuration

### **Common Error Messages:**

| Error | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` |
| `Port 3000 in use` | Kill process or change port |
| `MongoDB connection failed` | Check connection string |
| `EADDRINUSE` | Port already in use |
| `Module not found` | Clear cache and reinstall |

---

## 🎯 **Quick Start Commands**

```bash
# Complete setup in one go
git clone <repository-url>
cd automation-business-dashboard-template
npm install
cd client && npm install && cd ..
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
node setup-database.js
npm start
# In new terminal: cd client && npm start
```

---

## ✅ **Installation Complete!**

Your automation business dashboard should now be running at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

**Demo Login:**
- Email: `demo@example.com`
- Password: `demo123`

**Next Steps:**
1. Explore the dashboard features
2. Customize the branding
3. Set up your own automation tools
4. Deploy to production

---

**Need more help?** Check the documentation folder for detailed guides on customization and advanced features.
