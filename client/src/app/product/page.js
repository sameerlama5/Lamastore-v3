'use client'
import { useEffect, useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImageUrls(newImageUrls);

    // You can also handle file uploads here by sending the files to a server or cloud service
  };
  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data); // Assuming response is an array of categories
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const productdetail = {
        ...product,
        price: parseFloat(product.price),  // Convert price to a number
        stock: parseInt(product.stock),    // Convert stock to an integer
        images: imageUrls, // Assuming images are uploaded as URLs
        category: product.category, // Send the selected category's _id
      }


      // Make API request to add product
      const response = await axios.post("http://localhost:8000/products",productdetail );

      console.log("Product added:", response.data);
      alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-6 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add a New Product</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {imageUrls.length > 0 && (
            <div className="mt-2">
              <p>Preview of images:</p>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="Image preview" className="w-20 h-20 mr-2" />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
