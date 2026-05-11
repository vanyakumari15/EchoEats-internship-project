const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = require('./data/products');


mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce')
  .then(async () => {
    console.log('MongoDB Connected to seed data');
    try {
      await Product.deleteMany();
      console.log('Cleared existing products');
      
      await Product.insertMany(products);
      console.log('Inserted new products successfully!');
      process.exit();
    } catch (error) {
      console.error('Error seeding data:', error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
