import React, { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, Clock, CheckCircle, Search } from 'lucide-react';

const OrdersPage = () => {
    const { user, isLoggedIn, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const { data } = await axios.get(`${API_URL}/orders/myorders`, config);
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isLoggedIn, navigate, token]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-medium text-stone-600">Loading orders...</div>;
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-stone-900 flex items-center">
                        <Package className="w-8 h-8 mr-3 text-rose-600" />
                        My Orders
                    </h1>
                    <div className="relative">
                        <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-stone-300 rounded-full focus:ring-rose-500 focus:border-rose-500 w-64" />
                        <Search className="absolute left-3 top-2.5 text-stone-400 w-5 h-5" />
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl p-12 text-center">
                        <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-stone-900 mb-2">No orders yet</h2>
                        <p className="text-stone-500 mb-6">Looks like you haven't placed any orders.</p>
                        <button onClick={() => navigate('/menu')} className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
                            Start Ordering
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl overflow-hidden border border-stone-100">
                                <div className="bg-white px-6 py-4 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Order Placed</p>
                                        <p className="text-stone-900 font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Total</p>
                                        <p className="text-stone-900 font-bold">${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Order #</p>
                                        <p className="text-stone-900 font-mono">{order._id.substring(order._id.length - 8)}</p>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center mb-6">
                                        {order.isDelivered ? (
                                            <span className="flex items-center text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full text-sm">
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-orange-600 font-semibold bg-orange-50 px-4 py-2 rounded-full text-sm">
                                                <Clock className="w-5 h-5 mr-2" />
                                                Processing
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 py-4 border-t border-stone-100 first:border-t-0 first:pt-0">
                                                <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-bold text-stone-900">{item.name}</h4>
                                                    <p className="text-stone-500 text-sm">Qty: {item.qty}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-stone-900">${(item.price * item.qty).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;