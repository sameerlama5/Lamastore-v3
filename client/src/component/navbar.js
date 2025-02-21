"use client";
import axios from "axios";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NavbarSection = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    if (user) {
      // Toggle dropdown for logged-in user
      setDropdownOpen((prev) => !prev);
    } else {
      // Redirect to login page
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (!user) {
          console.error("User not logged in");
          return;
        }
        const response = await axios.post("http://localhost:8000/item", {
          userId: user.id, // Ensure the ID is correct
        });
        console.log("API Response:", response.data);
        setCartCount(response.data.count); // Assuming `message` contains the cart count
      } catch (err) {
        console.error("Error fetching cart count:", err.response?.data || err.message);
      }
    };
  
    fetchCartCount();
  }, [user]);
  
  

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Books",
  ];

  const checkUser = (path) => {
    if (user) {
      router.push(`/${path}`);
    } else {
      router.push(`/login`);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/category/${category.toLowerCase()}`);
  };
  console.log("Cart Count:", cartCount); // Debug log
  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 ">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 mr-4 cursor-pointer text-gray-600 md:hidden" />
              <h1 className="text-2xl font-bold text-indigo-600">TechMart</h1>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center px-8">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Heart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500" />
            <div className="relative" onClick={() => checkUser("cart")}>
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600" />

              {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {cartCount}
    </span>)}
      
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* Avatar Icon */}
                <div
                  className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={handleAvatarClick}
                >
                  <User className="h-6 w-6 text-gray-600" />
                </div>

                {/* Dropdown Menu (visible only if dropdownOpen is true and user exists) */}
                {dropdownOpen && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push("/profile")}
                      >
                        {user.name}
                      </li>
                      <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className="text-gray-600 hover:text-indigo-600 whitespace-nowrap focus:outline-none"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavbarSection;
