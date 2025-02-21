'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        country: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                address: {
                    city: formData.city,
                    country: formData.country,
                },
            });
            setMessage(response.data.message);
            setFormData({ name: '', email: '', password: '', city: '', country: '' });
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                        type="text"
                        name="country"
                        className="w-full border px-3 py-2 rounded"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Register
                </button>
            </form>
            <button type="button" onClick={() => router.push('/login')}>
      login
    </button>
        </div>
    );
};

export default Register;
