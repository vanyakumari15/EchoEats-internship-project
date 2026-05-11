import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [Quantity, setQuantity] = useState(0);
  const [displayCart, setDisplayCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState([]);
  const [Togg, setTogg] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const syncCartState = useCallback((data) => {
    const total = data.reduce((sum, item) => sum + (item.Quantity || 0), 0);
    setQuantity(total);
    setDisplayCart(total > 0);
    
    // Persist cart items to localStorage
    const cartItems = data.filter(item => (item.Quantity || 0) > 0).map(item => ({ id: item._id, Quantity: item.Quantity }));
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, []);

  const fetchFoodData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      
      // Load cart from localStorage
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      const formattedData = data.map(item => {
        const savedItem = savedCart.find(c => c.id === item._id);
        return { ...item, Quantity: savedItem ? savedItem.Quantity : 0 };
      });
      
      setFoodData(formattedData);
      syncCartState(formattedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [syncCartState, API_URL]);

  useEffect(() => {
    fetchFoodData();
  }, [fetchFoodData]);

  const updateQuantity = useCallback(async (productId, delta) => {
    setFoodData(prev => {
      const updated = prev.map(item => {
        if (item._id === productId || item.FoodID === productId) {
          return { ...item, Quantity: Math.max(0, (item.Quantity || 0) + delta) };
        }
        return item;
      });
      syncCartState(updated);
      return updated;
    });
  }, [syncCartState]);

  const clearCart = useCallback(async () => {
    setFoodData(prev => prev.map(item => ({ ...item, Quantity: 0 })));
    setQuantity(0);
    setDisplayCart(false);
    localStorage.removeItem('cart');
  }, []);

  const value = {
    Quantity, setQuantity,
    displayCart, setDisplayCart,
    loading,
    updateQuantity,
    clearCart,
    foodData,
    fetchFoodData,
    Togg, setTogg,
    searchTerm, setSearchTerm,
    isCartOpen, setIsCartOpen,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
