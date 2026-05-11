import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { GlobalStateProvider } from './context/GlobalStateContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import VoiceAssistant from './components/VoiceAssistant'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import { ShoppingBag } from 'lucide-react'

const LiveOrderTicker = () => {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({ name: "Rizvi", item: "Farmhouse Pizza" });
  
  const names = ["Rizvi", "Aman", "Sarah", "John", "Priya", "Vicky", "Deepak"];
  const items = ["Farmhouse Pizza", "Veggie Burger", "Coke Zero", "Chicken Wings", "Pasta Alfredo", "Tacos"];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setOrder({ name: randomName, item: randomItem });
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-24 left-6 z-[60] animate-in slide-in-from-left-10 fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-4 flex items-center space-x-3 max-w-xs">
        <div className="bg-rose-100 p-2 rounded-full text-rose-600">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-stone-500 font-medium">New Order!</p>
          <p className="text-sm font-bold text-stone-900">{order.name} just ordered a {order.item}</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <GlobalStateProvider>
        <div className="relative min-h-screen">
          <Navbar />
          <CartDrawer />
          <LiveOrderTicker />
          <main className="pt-2">
            <Outlet />
          </main>
          <VoiceAssistant />
          <Footer />
        </div>
      </GlobalStateProvider>
    </AuthProvider>
  )
}

export default App