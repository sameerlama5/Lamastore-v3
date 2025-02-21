import { Edit, Filter, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react'

const AdminProuct = () => {
  // Mock data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    stock: 45,
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    stock: 32,
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Professional Camera Kit",
    stock: 12,
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=80",
  },
];
  return (
    <div className="bg-white rounded-lg shadow">
    <div className="p-6 border-b flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900">Products</h3>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
        <Plus className="h-5 w-5" />
        <span>Add Product</span>
      </button>
    </div>
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-400" />
          <span>Filter</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Stock: {product.stock}</span>
                <span className="font-semibold text-indigo-600">${product.price}</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-indigo-50 text-indigo-600 px-4 py-2 rounded flex items-center justify-center space-x-1 hover:bg-indigo-100">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded flex items-center justify-center space-x-1 hover:bg-red-100">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default AdminProuct
