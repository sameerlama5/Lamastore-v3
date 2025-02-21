'use client'
import React, { useEffect, useState } from 'react';
import { 
  ShoppingCart, 
  Star
} from 'lucide-react';
import NavbarSection from '@/component/navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';


function App() {
  const [featuredProducts,setfeaturedProducts]= useState([])

  const [cartCount, setCartCount] = useState(0);
  const { token,user } = useSelector((state) => state.auth); // Assuming you're using Redux for auth
  // Function to handle adding product to the cart

  const handleAddToCart = async (productId) => {
    try {
      // Make POST request to add item to cart
      console.log(productId)

      const response = await axios.post(
        'http://localhost:8000/cart', 
        { productId, quantity: 1 , userId: user.id},  // Add the product id and quantity
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token for authentication
          },
        }
      );
      // Update the cart count or handle success
      setCartCount((prev) => prev + 1);
      console.log(response.data.message);  // Success message or cart data
    } catch (error) {
      console.error('Error adding item to cart:', error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        console.log(response)
        const transformedData = response.data.map((product, index) => ({
          id: product._id, // Use the API _id as the id
          name: product.name,
          price: product.price,
          rating: product.rating,
          image: product.images[0] // Using the first image in the images array
        }));

        setfeaturedProducts(transformedData); // Assuming response is an array of categories
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
  
    fetchCategories();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSection/>
      {/* Hero Section */}
      <div className="relative bg-indigo-900 h-96">
        <img
          src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1600&auto=format&fit=crop&q=80"
          className="w-full h-full object-cover opacity-50"
          alt="Hero"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Summer Tech Sale
            </h2>
            <p className="text-xl text-white mb-8">
              Up to 40% off on premium gadgets
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.map((product) => (

        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => handleAddToCart(product.id)}  // Call API when button is clicked
              className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.rating})
              </span>
            </div>
            <p className="text-xl font-bold text-indigo-600">
              ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>

      {/* Newsletter */}
      <div className="bg-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest updates on new products and upcoming sales
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;