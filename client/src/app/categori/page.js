'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/categories', {
        name,
        description,
      });

      setSuccess('Category added successfully!');
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to add category. Please try again.');
      console.error('Error adding category:', err.response?.data || err.message);
    }
  };


  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data); // Assuming response is an array of categories
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
        <div>
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
    
    
    
    <div className="max-w-lg mx-auto my-6 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add a New Category</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Category Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Category
        </button>
      </form>
    </div>
    </>


  );
};


export default CategoryList;