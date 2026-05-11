import React, { useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, foodData, updateQuantity } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const cartItems = foodData.filter(item => item.Quantity > 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price || item.Price) * item.Quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-500">
          <div className="h-full flex flex-col bg-white shadow-2xl border-l border-slate-200 overflow-hidden">
            
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">YOUR CART</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{cartItems.length} Items Selected</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 animate-pulse">
                    <ShoppingBag className="w-16 h-16" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">EMPTY CART</h3>
                    <p className="text-slate-500 max-w-[200px] mx-auto">Your culinary journey hasn't started yet.</p>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="btn-primary px-10">BROWSE MENU</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id || item.FoodID} className="flex items-center space-x-6 group">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                      <img src={item.image || item.ImageName} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-black text-slate-900 truncate group-hover:text-rose-500 transition-colors uppercase tracking-tight">{item.name || item.FoodName}</h4>
                      <p className="text-slate-500 text-sm mb-3">Unit Price: ${(item.price || item.Price).toFixed(2)}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-200">
                            <button onClick={() => updateQuantity(item._id || item.FoodID, -1)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:text-rose-500 transition-colors">
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-slate-900 text-sm">{item.Quantity}</span>
                            <button onClick={() => updateQuantity(item._id || item.FoodID, 1)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:text-rose-500 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button onClick={() => updateQuantity(item._id || item.FoodID, -item.Quantity)} className="text-slate-600 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-black text-slate-900">${((item.price || item.Price) * item.Quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-10 bg-white border-t border-slate-100 shadow-2xl space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-slate-900">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                        <span>Delivery Fee</span>
                        <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">Total Amount</span>
                        <span className="text-3xl font-black text-rose-500">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                
                <button 
                  onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                  className="w-full btn-primary py-5 text-lg flex items-center justify-center group"
                >
                  CHECKOUT NOW
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
