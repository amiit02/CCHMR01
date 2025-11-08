# 🛠️ Troubleshooting Guide

## Common Runtime Errors and Solutions

### 1. **Module Not Found Errors**

**Error**: `Cannot resolve module 'react-router-dom'` or similar

**Solution**:
```bash
# Install all dependencies
npm run install-all

# Or install individually
cd client && npm install
cd ../server && npm install
```

### 2. **MongoDB Connection Issues**

**Error**: `MongoDB connection error` or `MongooseError`

**Solutions**:
1. **Install MongoDB locally**:
   ```bash
   # On Windows (using Chocolatey)
   choco install mongodb
   
   # On macOS (using Homebrew)
   brew install mongodb-community
   
   # On Ubuntu/Debian
   sudo apt-get install mongodb
   ```

2. **Start MongoDB service**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   # or
   mongod
   ```

3. **Use MongoDB Atlas (Cloud)**:
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Update `server/.env` with your connection string

### 3. **Port Already in Use**

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Kill process on port 5000
npx kill-port 5000

# Or find and kill the process
lsof -ti:5000 | xargs kill -9

# Change port in server/.env
PORT=5001
```

### 4. **React DatePicker Styling Issues**

**Error**: DatePicker not styled properly

**Solution**: The DatePicker component has custom styling applied. If issues persist:

```bash
# Reinstall react-datepicker
cd client
npm uninstall react-datepicker
npm install react-datepicker@latest
```

### 5. **Authentication Errors**

**Error**: `JWT_SECRET is not defined`

**Solution**:
1. Create `server/.env` file:
   ```bash
   npm run setup
   ```

2. Or manually create `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/driving-school
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   PORT=5000
   ```

### 6. **CORS Issues**

**Error**: `Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**: CORS is already configured in the server. If issues persist:

1. Check if server is running on port 5000
2. Verify the proxy setting in `client/package.json`:
   ```json
   "proxy": "http://localhost:5000"
   ```

### 7. **Styled Components Issues**

**Error**: `Cannot resolve module 'styled-components'`

**Solution**:
```bash
cd client
npm install styled-components@latest
```

### 8. **Framer Motion Issues**

**Error**: `Cannot resolve module 'framer-motion'`

**Solution**:
```bash
cd client
npm install framer-motion@latest
```

## 🚀 Quick Start (Step by Step)

### 1. **Initial Setup**
```bash
# Clone and navigate to project
cd driving-school-website

# Install all dependencies
npm run install-all

# Setup environment
npm run setup
```

### 2. **Start MongoDB**
```bash
# Option A: Local MongoDB
mongod

# Option B: MongoDB Atlas (Cloud)
# Just update server/.env with your connection string
```

### 3. **Start Development Servers**
```bash
# Option A: Start both servers
npm run dev

# Option B: Start individually
npm run server  # Terminal 1
npm run client # Terminal 2
```

### 4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Development Commands

```bash
# Install all dependencies
npm run install-all

# Start both servers
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client

# Build for production
npm run build

# Setup environment
npm run setup
```

## 🐛 Debugging Tips

### 1. **Check Console Logs**
- Browser DevTools Console for frontend errors
- Terminal/Command Prompt for backend errors

### 2. **Verify Dependencies**
```bash
# Check if all packages are installed
cd client && npm list
cd ../server && npm list
```

### 3. **Clear Cache**
```bash
# Clear npm cache
npm cache clean --force

# Clear React cache
cd client
rm -rf node_modules package-lock.json
npm install
```

### 4. **Check Environment Variables**
```bash
# Verify server/.env exists and has correct values
cat server/.env
```

## 📱 Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🔒 Security Notes

1. **Never commit `.env` files**
2. **Use strong JWT secrets in production**
3. **Enable HTTPS in production**
4. **Validate all inputs**

## 🆘 Still Having Issues?

### Common Solutions:

1. **Restart everything**:
   ```bash
   # Stop all processes (Ctrl+C)
   # Then restart
   npm run dev
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be 14+
   npm --version   # Should be 6+
   ```

3. **Verify file permissions**:
   ```bash
   # Make sure you have read/write permissions
   ls -la
   ```

4. **Check firewall/antivirus**:
   - Some antivirus software blocks local servers
   - Add exceptions for Node.js and MongoDB

### Getting Help:

1. **Check the console** for specific error messages
2. **Verify all dependencies** are installed correctly
3. **Ensure MongoDB** is running
4. **Check environment variables** are set correctly

## 📋 System Requirements

- **Node.js**: 14.0 or higher
- **npm**: 6.0 or higher
- **MongoDB**: 4.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space

---

**Need more help?** Check the console logs for specific error messages and search for solutions online!

