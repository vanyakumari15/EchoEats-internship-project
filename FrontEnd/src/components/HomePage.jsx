import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ItemsPage from './ItemsPage';
import { ChevronRight, Utensils, Truck, Heart, Star, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#items' || location.pathname === '/menu') {
      const element = document.getElementById('items');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-mesh min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 lg:pt-52 lg:pb-36 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-rose-500/5 filter blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-orange-500/5 filter blur-[100px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
              <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-rose-600 font-bold text-xs uppercase tracking-widest">Premium Food Experience</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
                MINIMAL <br />
                <span className="text-rose-500">INDULGENCE</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Savor the essence of gourmet dining. Elegantly simple, exceptionally crafted, and delivered with precision.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                <Link to="/#items" className="btn-primary flex items-center justify-center text-lg px-12 py-5">
                  EXPLORE MENU
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Link>
                <Link to="/about" className="inline-flex justify-center items-center px-12 py-5 border-2 border-slate-200 text-lg font-bold rounded-full text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
                  OUR STORY
                </Link>
              </div>
              
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-slate-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">50k+</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Orders</span>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">4.9/5</span>
                  <span className="text-xs uppercase tracking-widest font-bold">Rating</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative group perspective-1000 py-20">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                
                {/* Premium WordArt */}
                <div className="relative z-10 select-none">
                  <div className="flex flex-col items-center lg:items-end">
                    <h2 className="text-[8rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400 drop-shadow-2xl">
                      ECHO
                    </h2>
                    <h2 className="text-[6rem] lg:text-[10rem] font-black leading-[0.8] tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-rose-600 to-orange-400 -mt-2 lg:-mt-4 ml-8 lg:ml-0 drop-shadow-xl transform hover:scale-110 transition-transform duration-700 cursor-default">
                      EATS
                    </h2>
                    
                    <div className="mt-8 flex items-center space-x-4 opacity-40">
                      <div className="h-px w-12 bg-slate-400"></div>
                      <span className="text-xs font-bold uppercase tracking-[0.5em] text-slate-500">Est. 2024</span>
                      <div className="h-px w-12 bg-slate-400"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 transform rotate-12 hover:rotate-0 transition-all duration-500 hidden lg:block">
                  <div className="flex items-center space-x-2">
                    <div className="bg-amber-100 p-2 rounded-xl">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Voted #1</p>
                      <p className="text-sm font-bold text-slate-900">Gourmet Choice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6">WHY CHOOSE ECHO?</h2>
            <div className="h-1.5 w-24 bg-rose-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Utensils, title: "Gourmet Selection", desc: "Curated dishes from top-tier artisanal kitchens.", color: "rose" },
              { icon: ShieldCheck, title: "Secure Quality", desc: "Every order is inspected for perfection and hygiene.", color: "blue" },
              { icon: Truck, title: "Flash Delivery", desc: "Our proprietary routing gets food to you while it's hot.", color: "orange" }
            ].map((f, idx) => (
              <div key={idx} className="glass p-10 rounded-[3rem] group hover:-translate-y-3 transition-all duration-500 border-slate-200 hover:border-rose-500/30">
                <div className={`w-20 h-20 bg-${f.color}-500/10 rounded-2xl flex items-center justify-center text-${f.color}-500 mb-8 group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div id="items">
        <ItemsPage />
      </div>

      {/* Luxury Footer Preview */}
      <div className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-10">READY TO <span className="text-rose-500">INDULGE?</span></h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Join thousands of food lovers who experience the magic of EchoEats every day.</p>
          <Link to="/#items" className="btn-primary inline-block text-xl px-16 py-6">START YOUR ORDER</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;