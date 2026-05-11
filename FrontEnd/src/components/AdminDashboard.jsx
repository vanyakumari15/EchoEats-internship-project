import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, token } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch all orders
        // Note: You would need an admin route for all orders in backend.
        // For demonstration, we just fetch products.
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const productRes = await axios.get(`${API_URL}/products`);
        setProducts(productRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate, token]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-stone-900 mb-10">Admin Dashboard</h1>
        
        <div className="flex border-b border-stone-200 mb-8">
          <button 
            className={`py-4 px-8 text-lg font-medium focus:outline-none ${activeTab === 'orders' ? 'border-b-2 border-rose-500 text-rose-600' : 'text-stone-500 hover:text-stone-700'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`py-4 px-8 text-lg font-medium focus:outline-none ${activeTab === 'products' ? 'border-b-2 border-rose-500 text-rose-600' : 'text-stone-500 hover:text-stone-700'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold">Products</h2>
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded">Add Product</button>
            </div>
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {products.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{product._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-orange-600 hover:text-orange-900 mr-4">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-lg p-6">
            <p className="text-stone-500">Admin order management would be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
