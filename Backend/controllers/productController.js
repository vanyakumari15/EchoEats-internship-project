const mongoose = require('mongoose');
const initialProducts = require('../data/products');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Safety Net: If DB is not connected yet (readyState !== 1), return initial products
    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️ DB not connected. Returning static product data.');
      return res.json(initialProducts);
    }

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const categoryFilter = req.query.category ? { category: req.query.category } : {};

    const filter = { ...keyword, ...categoryFilter };

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    // Catch-all: return initial products if any error occurs
    console.error('Error fetching products, falling back to static data:', error.message);
    res.json(initialProducts);
  }
};


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Fallback if DB not connected
    if (mongoose.connection.readyState !== 1) {
      // For static data, we use the 'name' or 'index' as ID since they won't have MongoDB ObjectIds
      const product = initialProducts.find(p => p.name.toLowerCase().replace(/ /g, '-') === req.params.id || p._id === req.params.id);
      if (product) return res.json(product);
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // If ID is not a valid ObjectId, try finding in static data
    const product = initialProducts.find(p => p.name.toLowerCase().replace(/ /g, '-') === req.params.id);
    if (product) return res.json(product);
    
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    // Note: Needs auth middleware for admin check in routes
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user ? req.user._id : undefined,
      image: '/images/sample.jpg',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
