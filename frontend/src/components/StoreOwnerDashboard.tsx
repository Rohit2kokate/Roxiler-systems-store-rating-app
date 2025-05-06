import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Rating {
  id: number;
  rating: number;
  user: {
    name: string;
  };
}

interface Store {
  name: string;
  ratings: Rating[];
  owner: {
    id: string;
  };
}

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stores', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const ownedStore = response.data.find((s: Store) => s.owner.id === localStorage.getItem('userId'));
        setStore(ownedStore);
      } catch (err) {
        console.error('Failed to fetch store');
      }
    };
    fetchStore();
  }, []);

  if (!store) return <div className="max-w-4xl mx-auto p-4">Loading...</div>;

  const averageRating = store.ratings.length
    ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Store Owner Dashboard</h2>
      <div className="mb-4">
        <h3 className="text-lg">Store: {store.name}</h3>
        <p>Average Rating: {averageRating}</p>
      </div>
      <h3 className="text-xl font-bold mb-2">Ratings</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">User</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {store.ratings.map((rating) => (
            <tr key={rating.id} className="border-b">
              <td className="p-2">{rating.user.name}</td>
              <td className="p-2">{rating.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreOwnerDashboard;
