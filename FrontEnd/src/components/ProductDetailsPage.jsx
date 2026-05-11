import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Star, Clock, ShieldCheck, Heart } from 'lucide-react';
import { GlobalStateContext } from '../context/GlobalStateContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { updateQuantity } = useContext(GlobalStateContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const { data } = await axios.get(`${API_URL}/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-4xl font-black text-slate-900 mb-6">Product Not Found</h2>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-12 transition-colors font-bold uppercase tracking-widest text-xs group"
        >
          <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Back to Selection
        </button>
        
        <div className="glass rounded-[4rem] overflow-hidden flex flex-col lg:flex-row border-slate-200 shadow-2xl">
          {/* Image Section */}
          <div className="lg:w-1/2 relative h-[500px] lg:h-auto">
            <img 
                src={product.image || 'https://via.placeholder.com/800'} 
                alt={product.name} 
                className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
            <button className="absolute top-8 right-8 w-14 h-14 bg-white/50 backdrop-blur-xl rounded-2xl flex items-center justify-center text-slate-900 border border-white/20 hover:bg-rose-500 hover:text-white transition-all group shadow-xl">
                <Heart className="w-6 h-6 group-hover:fill-current" />
            </button>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-10 lg:p-20 flex flex-col">
            <div className="flex items-center space-x-3 mb-6">
                <span className="bg-rose-500/10 text-rose-500 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">{product.category}</span>
                <div className="flex items-center text-amber-600 text-sm font-black bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>4.9</span>
                </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter uppercase">{product.name}</h1>
            <p className="text-4xl font-black text-rose-500 mb-10">${parseFloat(product.price).toFixed(2)}</p>
            
            <div className="text-xl text-slate-600 leading-relaxed font-medium mb-12 border-l-4 border-rose-500/30 pl-8">
              {product.description}
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-slate-400" />
                    <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Delivery</p>
                        <p className="text-slate-900 font-bold">15-20 Min</p>
                    </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center space-x-4">
                    <ShieldCheck className="w-6 h-6 text-slate-400" />
                    <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Quality</p>
                        <p className="text-slate-900 font-bold">Inspected</p>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button 
                  onClick={() => updateQuantity(product._id, 1)}
                  disabled={product.countInStock === 0}
                  className="w-full btn-primary py-6 text-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <ShoppingCart className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform" />
                  {product.countInStock > 0 ? 'ADD TO BASKET' : 'OUT OF STOCK'}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
