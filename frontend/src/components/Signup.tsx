import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (form.name.length < 20 || form.name.length > 60) {
      return 'Name must be between 20 and 60 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Invalid email format';
    }
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(form.password)) {
      return 'Password must be 8-16 characters with at least one uppercase letter and one special character';
    }
    if (form.address.length > 400) {
      return 'Address must be under 400 characters';
    }
    return '';
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      await axios.post('http://localhost:5000/auth/signup', form);
      navigate('/login');
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;