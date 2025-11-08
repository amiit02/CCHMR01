const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
const result = dotenv.config();
if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded successfully');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✓ Set' : '✗ Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✓ Set' : '✗ Not set');
console.log('PORT:', process.env.PORT || '5000 (default)');

const app = express();

// Middleware with specific CORS configuration
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/instructors', require('./routes/instructors'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat')); // Chatbot route

// MongoDB connection with retries
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const options = {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        maxPoolSize: 50,
        retryWrites: true
      };

      const uri = process.env.MONGODB_URI || 'mongodb+srv://dbuser:OboWsn7Gti75ChnS@cluster0.pgrdazr.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority' ;
      if (!uri) {
        throw new Error('MONGODB_URI environment variable is not set');
      }

      console.log('🌎 Connecting to MongoDB Atlas...');
      await mongoose.connect(uri, options);
      console.log('📦 Connected to MongoDB Atlas successfully!');
      return true;
    } catch (err) {
      if (i === retries - 1) {
        console.error('❌ MongoDB connection failed after retries:', err);
        if (err.name === 'MongoServerSelectionError') {
          console.error(`
🔍 Connection Error Details:
${isAtlasUri ? `
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in Atlas
- Verify username and password are correct
- Check if your Atlas cluster is running` : `
- Is MongoDB installed locally?
- Try: net start MongoDB
- Or connect manually: mongosh`}
`);
        }
        return false;
      }
      console.log(`MongoDB connection attempt ${i + 1} failed. Retrying in 3s...`);
      console.error('Error:', err.message);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

// Monitor MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('🔄 MongoDB connected');
});

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❗ MongoDB disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Driving School API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Then start Express server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } finally {}
}

// Start server
startServer();
