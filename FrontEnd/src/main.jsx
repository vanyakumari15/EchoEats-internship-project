import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import OrdersPage from './components/Orders';
import NotFoundPage from './components/NotFoundPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import CheckoutPage from './components/CheckoutPage';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import RefundPage from './components/RefundPage';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    errorElement: <NotFoundPage />,
    children:[
      {
        path:'/',
        element:<HomePage />,
      },
      {
        path:'/about',
        element:<AboutPage />,
      },
      {
        path:'/login',
        element:<LoginPage />,
      },
      {
        path:'/cart',
        element:<CartPage />,
      },
      {
        path:'/profile',
        element:<ProfilePage />,
      },
      {
        path:'/orders',
        element:<OrdersPage />,
      },
      {
        path:'/menu',
        element:<HomePage />,
      },
      {
        path:'/product/:id',
        element:<ProductDetailsPage />,
      },
      {
        path:'/checkout',
        element:<CheckoutPage />,
      },
      {
        path:'/admin',
        element:<AdminDashboard />,
      },
      {
        path:'/contact',
        element:<ContactPage />,
      },
      {
        path:'/faq',
        element:<FAQPage />,
      },
      {
        path:'/privacy',
        element:<PrivacyPolicyPage />,
      },
      {
        path:'/terms',
        element:<TermsPage />,
      },
      {
        path:'/refund',
        element:<RefundPage />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)