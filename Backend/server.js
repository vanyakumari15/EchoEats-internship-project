require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const voiceRoutes = require('./routes/voiceRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/voice', voiceRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('E-Commerce API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const Product = require('./models/Product');
const initialProducts = require('./data/products');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
  
  try {
    // Attempt primary connection
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ MongoDB Connected (Local/Remote)');
  } catch (err) {
    console.warn('⚠️  Primary MongoDB Connection Failed. Falling back to In-Memory Database...');
    console.log('   (This is normal if you don\'t have MongoDB installed locally)');
    
    try {
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log('🚀 In-Memory MongoDB Started & Connected');
      
      // Auto-seed the memory database
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(initialProducts);
        console.log('📦 In-Memory Database Seeded with sample products');
      }
    } catch (memErr) {
      console.error('❌ Failed to start In-Memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }
};

const PORT = process.env.PORT || 5000;

// Start server immediately if not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`📡 Server running on port ${PORT}`);
    // Connect to DB in the background
    connectDB();
  });
}

// Export the app and DB connection function for Netlify Serverless Functions
module.exports = { app, connectDB };
