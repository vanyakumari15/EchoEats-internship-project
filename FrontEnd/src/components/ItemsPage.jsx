import React, { useState, useEffect, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { Minus, Plus, ShoppingCart, Eye, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white border border-slate-200 rounded-[3rem] overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
          <img src={item.image || item.ImageName} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-10 flex flex-col">
          <button onClick={onClose} className="self-end p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors mb-4"><X className="w-6 h-6" /></button>
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-4">
                <span className="bg-rose-500/10 text-rose-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{item.category || item.Category}</span>
                <div className="flex items-center text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>4.9</span>
                </div>
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">{item.name || item.FoodName}</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{item.description || item.Description}</p>
          </div>
          <div className="flex items-center justify-between mt-8 border-t border-slate-100 pt-8">
            <span className="text-4xl font-black text-slate-900">${parseFloat(item.price || item.Price).toFixed(2)}</span>
            <button 
                onClick={() => { onAddToCart(item, 1); onClose(); }} 
                className="btn-primary px-10"
            >
                ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ItemsPage = () => {
  const { foodData, updateQuantity, searchTerm } = useContext(GlobalStateContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);

  useEffect(() => {
    if (foodData.length > 0) {
      const categorySet = new Set(foodData.map(item => item.Category || item.category));
      const uniqueCategories = ['All', ...Array.from(categorySet).filter(Boolean)];
      setCategories(uniqueCategories);
    }
  }, [foodData]);

  const filteredItems = foodData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || (item.Category || item.category) === selectedCategory;
    const nameStr = (item.name || item.FoodName || '').toLowerCase();
    const descStr = (item.description || item.Description || '').toLowerCase();
    const searchStr = (searchTerm || '').toLowerCase();
    return matchesCategory && (nameStr.includes(searchStr) || descStr.includes(searchStr));
  });

  const handleQuantityChange = async (item, delta) => {
    const id = item._id || item.FoodID;
    if (id) await updateQuantity(id, delta);
  };

  return (
    <div className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4 uppercase">The <span className="text-rose-500">Selection</span></h2>
            <p className="text-xl text-slate-500 font-medium">Exceptional taste, expertly curated for you.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === category 
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredItems.map((item) => (
            <div key={item._id || item.FoodID} className="group bg-white rounded-[2rem] overflow-hidden flex flex-col border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image || item.ImageName || "https://via.placeholder.com/400?text=Delicious+Food"} 
                  alt={item.name || item.FoodName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=Delicious+Food" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button 
                    onClick={() => setQuickViewItem(item)}
                    className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-slate-900 transition-all transform hover:scale-110"
                  >
                    <Eye className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-rose-500 border border-slate-100">
                  {item.category || item.Category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight transition-colors">{item.name || item.FoodName}</h3>
                  <div className="flex items-center text-amber-600 text-xs font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />
                    <span>4.9</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">{item.description || item.Description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                  <span className="text-2xl font-black text-slate-900">${parseFloat(item.price || item.Price || 0).toFixed(2)}</span>
                  
                  {(item.Quantity || 0) > 0 ? (
                    <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
                      <button 
                         className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-rose-500 transition-all"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900 text-sm">
                        {item.Quantity}
                      </span>
                      <button 
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:scale-110 transition-all"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="flex items-center bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-rose-500 transition-all duration-300"
                      onClick={() => handleQuantityChange(item, 1)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {quickViewItem && <QuickViewModal item={quickViewItem} onClose={() => setQuickViewItem(null)} onAddToCart={handleQuantityChange} />}
      </div>
    </div>
  );
};

export default ItemsPage;