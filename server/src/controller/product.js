// controllers/productController.js
const {Product, Category} = require('../model/page');

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Add a new product
// controllers/productController.js
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, images } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).json({ message: "Price and stock must be valid numbers" });
    }
    

    // Check if category exists (optional but recommended)
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Create the new product
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    // Save product
    const savedProduct = await newProduct.save();

    res.status(201).json({message:'product added'});
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};


module.exports = { getProducts, addProduct };
