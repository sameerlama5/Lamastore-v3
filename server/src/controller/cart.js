const {Cart} = require('../model/page');
const {Product} = require('../model/page');

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity , userId } = req.body;
         // Extract user ID from the JWT token

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        // If no cart, create a new one
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity if product already exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new product to cart
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
      console.log("User ID:", userId); // Debug log
  
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json({ count: cart.items.length }); // Return count
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  