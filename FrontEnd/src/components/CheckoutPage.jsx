import React, { useContext, useState } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { foodData, Quantity, user, token, clearCart } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [loading, setLoading] = useState(false);

  const cartItems = foodData.filter(item => item.Quantity > 0);
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.Quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const { data } = await axios.post(`${API_URL}/orders`, {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.Quantity,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }, config);
      
      await clearCart();
      navigate(`/orders/${data._id}`);
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="min-h-screen flex items-center justify-center flex-col pt-20">
      <h2 className="text-2xl font-bold text-stone-800 mb-4">Your cart is empty</h2>
      <button onClick={() => navigate('/menu')} className="text-rose-600 hover:underline">Go back to menu</button>
    </div>
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-stone-900 mb-10 text-center">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl-lg rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shipping Address</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700">Address</label>
                  <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700">City</label>
                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700">Postal Code</label>
                    <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700">Country</label>
                  <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 p-3 border" />
                </div>
              </form>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">Payment Method</h2>
              <div className="flex items-center">
                <input id="paypal" name="paymentMethod" type="radio" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-stone-300" />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-stone-700">
                  PayPal or Credit Card
                </label>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl-lg rounded-2xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Items</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Tax</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-xl text-stone-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={placeOrderHandler}
                disabled={loading || !address || !city || !postalCode || !country}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
