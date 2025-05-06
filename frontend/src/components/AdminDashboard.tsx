import React, {useEffect, useState } from 'react';



import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState({ name: '', email: '', address: '', role: '', sortBy: 'name', order: 'ASC' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'USER' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', ownerId: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/users', {
        params: filter,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users');
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/stores', {
        params: filter,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStores(response.data);
    } catch (err) {
      console.error('Failed to fetch stores');
    }
  };

  const handleCreateUser =  async (e : any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin/users', newUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUsers();
      setNewUser({ name: '', email: '', password: '', address: '', role: 'USER' });
    } catch (err) {
      console.error('Failed to create user');
    }
  };

  const handleCreateStore = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/admin/stores', newStore, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchStores();
      setNewStore({ name: '', email: '', address: '', ownerId: '' });
    } catch (err) {
      console.error('Failed to create store');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="text-lg">Total Stores</h3>
          <p className="text-2xl">{stats.stores}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="text-lg">Total Ratings</h3>
          <p className="text-2xl">{stats.ratings}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">Create User</h3>
      <form onSubmit={handleCreateUser} className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Create User
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Create Store</h3>
      <form onSubmit={handleCreateStore} className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newStore.name}
          onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newStore.email}
          onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Address"
          value={newStore.address}
          onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Owner ID"
          value={newStore.ownerId}
          onChange={(e) => setNewStore({ ...newStore, ownerId: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Create Store
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Filter Users/Stores</h3>
      <div className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Address"
          value={filter.address}
          onChange={(e) => setFilter({ ...filter, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="STORE_OWNER">Store Owner</option>
        </select>
        <select
          value={filter.sortBy}
          onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="address">Address</option>
        </select>
        <select
          value={filter.order}
          onChange={(e) => setFilter({ ...filter, order: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <button
          onClick={() => { fetchUsers(); fetchStores(); }}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Apply Filters
        </button>
      </div>

      <h3 className="text-xl font-bold mb-2">Users</h3>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.address}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-bold mb-2">Stores</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Address</th>
            <th className="p-2">Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store: any) => (
            <tr key={store.id} className="border-b">
              <td className="p-2">{store.name}</td>
              <td className="p-2">{store.email}</td>
              <td className="p-2">{store.address}</td>
              <td className="p-2">
                {store.ratings.length ? (store.ratings.reduce((sum: number, r: any) => sum + r.rating, 0) / store.ratings.length).toFixed(1) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;