import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Camera, MessageCircle, X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-900 pt-32 pb-16 border-t border-slate-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-rose-500/5 filter blur-[150px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
              ECHO<span className="text-rose-500">EATS</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Experience the pinnacle of culinary delivery. Quality, speed, and AI-driven precision in every order.
            </p>
            <div className="flex space-x-6 pt-4">
              <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/30 transition-all"><Camera className="w-6 h-6" /></a>
              <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/30 transition-all"><X className="w-6 h-6" /></a>
              <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-500/30 transition-all"><MessageCircle className="w-6 h-6" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Our Story</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Join the Team</Link></li>
              <li><Link to="/faq" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Help Center</Link></li>
              <li><Link to="/privacy" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Legal & Policy</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Refund Policy</Link></li>
              <li><Link to="/faq" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:translate-x-2 inline-block">Cookie Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Reach Us</h4>
            <ul className="space-y-8">
              <li className="flex items-start">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-rose-500 mr-5 flex-shrink-0 border border-slate-100"><MapPin className="w-5 h-5" /></div>
                <span className="text-slate-600 font-medium">123 Culinary Boulevard, <br />Epicurean District, CC 12345</span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-rose-500 mr-5 flex-shrink-0 border border-slate-100"><Phone className="w-5 h-5" /></div>
                <span className="text-slate-600 font-medium">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-rose-500 mr-5 flex-shrink-0 border border-slate-100"><Mail className="w-5 h-5" /></div>
                <span className="text-slate-600 font-medium">concierge@echoeats.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-16 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} ECHOEATS PLATFORMS INC.
          </p>
          <div className="flex space-x-8 text-xs font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-rose-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Dribbble</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Behance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;