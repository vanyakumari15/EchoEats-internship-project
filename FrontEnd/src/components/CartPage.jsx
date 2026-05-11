import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const CartPage = () => {
    const { Quantity, foodData, updateQuantity } = useContext(GlobalStateContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const itemsInCart = foodData.filter(item => item.Quantity > 0);
        setCartItems(itemsInCart);
        
        const totalPrice = itemsInCart.reduce((sum, item) => 
            sum + (parseFloat(item.price || item.Price || 0) * item.Quantity), 0
        );
        setTotal(totalPrice);
    }, [foodData]);

    const handleQuantityChange = async (item, delta) => {
        const id = item._id || item.FoodID;
        await updateQuantity(id, delta);
    };

    const handleRemoveItem = async (item) => {
        const id = item._id || item.FoodID;
        await updateQuantity(id, -item.Quantity);
    };

    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: { pathname: '/checkout' } } });
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-20">
                <div className="text-center bg-white p-10 rounded-2xl shadow-sm max-w-md w-full">
                    <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trash2 className="w-10 h-10 text-rose-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
                    <p className="text-stone-500 mb-8">Looks like you haven't added any delicious items yet.</p>
                    <Link to="/menu" className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-colors w-full inline-block">
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-stone-900 mb-10">Shopping Cart</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl overflow-hidden">
                            <ul className="divide-y divide-stone-200">
                                {cartItems.map((item) => (
                                    <li key={item._id || item.FoodID} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                        <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-stone-100">
                                            <img 
                                                src={item.image || item.ImageName} 
                                                alt={item.name || item.FoodName} 
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                                            <h3 className="text-xl font-bold text-stone-900 mb-1">{item.name || item.FoodName}</h3>
                                            <p className="text-rose-600 font-semibold mb-4">${parseFloat(item.price || item.Price || 0).toFixed(2)}</p>
                                            
                                            <div className="flex items-center bg-stone-100 rounded-full p-1 w-32 justify-between">
                                                <button 
                                                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-600 hover:text-rose-600 shadow-sm"
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-bold text-stone-900">{item.Quantity}</span>
                                                <button 
                                                    className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white hover:bg-rose-700 shadow-sm"
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4 mt-4 sm:mt-0">
                                            <p className="text-xl font-bold text-stone-900">
                                                ${(parseFloat(item.price || item.Price || 0) * item.Quantity).toFixed(2)}
                                            </p>
                                            <button 
                                                onClick={() => handleRemoveItem(item)}
                                                className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold text-stone-900 mb-6 border-b pb-4">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-stone-600">
                                    <span>Total Items</span>
                                    <span>{Quantity}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-stone-900">${total.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="border-t pt-6">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-lg font-bold text-stone-900">Estimated Total</span>
                                    <span className="text-2xl font-extrabold text-rose-600">${total.toFixed(2)}</span>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center transition-colors group"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;