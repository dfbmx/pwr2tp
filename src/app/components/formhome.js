'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FormHome() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      subject: `newuser: ${formData.name}`,
      message: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.status);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setError(result.status);
      }
    } catch (error) {
      setError('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="p-4 bg-black bg-opacity-30 rounded">
        <div>
          <label htmlFor="name" className="block mb-2 text-purple-500">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-purple-500">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-purple-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-purple-500">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-purple-500"
            required
          />
        </div>
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="hover-gradient-amber-6 text-white p-2 rounded bg-green-500 hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          
        </div>
      </form>
    </div>
  );
}
