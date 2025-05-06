import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface User {
  id: string;
  email?: string;
}

interface Rating {
  id: string;
  rating: number;
  user?: User | null;
}

interface Store {
  id: string;
  name: string;
  address: string;
  ratings: Rating[];
}

const StoreList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState({ name: '', address: '', sortBy: 'name', order: 'ASC' });
  const [rating, setRating] = useState({ storeId: '', rating: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stores`, {
        params: search,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Stores response:', response.data); // Debug response
      setStores(response.data);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch stores:', err);
      setError(err.response?.data?.message || 'Failed to fetch stores');
    }
  };

  const handleSubmitRating = async (storeId: string) => {
    try {
      await axios.post(
        `${API_BASE_URL}/ratings`,
        { storeId, rating: rating.rating },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchStores();
      setRating({ storeId: '', rating: 0 });
    } catch (err: any) {
      console.error('Failed to submit rating:', err);
      setError(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Store List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Search by Address"
          value={search.address}
          onChange={(e) => setSearch({ ...search, address: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <select
          value={search.sortBy}
          onChange={(e) => setSearch({ ...search, sortBy: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="address">Address</option>
        </select>
        <select
          value={search.order}
          onChange={(e) => setSearch({ ...search, order: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Average Rating</th>
            <th className="p-2">Your Rating</th>
            <th className="p-2">Submit Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-2 text-center">No stores found</td>
            </tr>
          ) : (
            stores.map((store) => (
              <tr key={store.id} className="border-b">
                <td className="p-2">{store.name}</td>
                <td className="p-2">{store.address}</td>
                <td className="p-2">
                  {store.ratings?.length
                    ? (
                        store.ratings.reduce((sum: number, r: Rating) => sum + r.rating, 0) /
                        store.ratings.length
                      ).toFixed(1)
                    : 'N/A'}
                </td>
                <td className="p-2">
                  {store.ratings?.find((r: Rating) => r.user?.id === localStorage.getItem('userId'))
                    ?.rating || 'Not Rated'}
                </td>
                <td className="p-2">
                  <select
                    value={rating.storeId === store.id ? rating.rating : 0}
                    onChange={(e) => setRating({ storeId: store.id, rating: parseInt(e.target.value) })}
                    className="p-1 border rounded"
                  >
                    <option value="0">Select</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSubmitRating(store.id)}
                    className="ml-2 p-1 bg-blue-500 text-white rounded"
                    disabled={rating.storeId !== store.id || rating.rating === 0}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;