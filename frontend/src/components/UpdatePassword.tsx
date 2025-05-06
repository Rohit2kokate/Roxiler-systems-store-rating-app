import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/.test(form.newPassword)) {
      return 'New password must be 8-16 characters with at least one uppercase letter and one special character';
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
      await axios.put(
        'http://localhost:5000/users/password',
        form,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccess('Password updated successfully');
      setError('');
    } catch (err) {
      setError('Failed to update password');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;