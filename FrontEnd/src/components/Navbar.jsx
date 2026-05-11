import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, User, Package, LogOut, LayoutDashboard, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { Quantity, searchTerm, setSearchTerm, setIsCartOpen } = useContext(GlobalStateContext);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getInitials = () => {
    if (!user || !user.name) return '?';
    const names = user.name.split(' ');
    if (names.length > 1) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-[100] transition-all duration-300">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)]"></div>
      
      <div className="relative px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-3xl font-black tracking-tighter text-slate-900">
                ECHO<span className="text-rose-500 group-hover:text-orange-400 transition-colors">EATS</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <Link to="/" className="text-slate-600 hover:text-rose-500 font-semibold transition-colors text-sm uppercase tracking-widest">Home</Link>
            <Link to="/#items" className="text-slate-600 hover:text-rose-500 font-semibold transition-colors text-sm uppercase tracking-widest">Menu</Link>
            <Link to="/about" className="text-slate-600 hover:text-rose-500 font-semibold transition-colors text-sm uppercase tracking-widest">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-rose-500 font-semibold transition-colors text-sm uppercase tracking-widest">Contact</Link>
          </div>

          <div className="flex items-center space-x-5 md:space-x-8">
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-rose-500/50 transition-all group">
              <Search className="w-4 h-4 text-slate-400 mr-2 group-focus-within:text-rose-500" />
              <input 
                type="text" 
                placeholder="Search cravings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all text-slate-900 placeholder-slate-500" 
              />
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-slate-600 hover:text-rose-500 transition-all transform hover:scale-110"
            >
              <ShoppingCart className="w-6 h-6" />
              {Quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg shadow-rose-500/40 border-2 border-white">
                  {Quantity}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button 
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold hover:shadow-lg hover:shadow-rose-500/20 transition-all transform hover:scale-105 border-2 border-white/10"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getInitials()}
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Welcome</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setShowDropdown(false)} className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-rose-500 transition-colors">
                        <LayoutDashboard className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                    )}
                    <Link to="/profile" onClick={() => setShowDropdown(false)} className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-rose-500 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link to="/orders" onClick={() => setShowDropdown(false)} className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-rose-500 transition-colors">
                      <Package className="w-4 h-4 mr-3" />
                      My Orders
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors">
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-rose-500 to-orange-400 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:scale-95 text-xs uppercase tracking-widest">
                Login
              </Link>
            )}

            <button className="md:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link to="/" className="block text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/#items" className="block text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link to="/about" className="block text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block text-slate-600 font-bold py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;