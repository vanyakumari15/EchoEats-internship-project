import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import './CSS/NotFound.css';
import illustration404 from '../assets/404.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { GlobalStateProvider } from '../context/GlobalStateContext'

const NotFoundPage = () => {
    const error = useRouteError();
    if (error) console.error(error);

    return (
        <GlobalStateProvider>
            <div className="bg-mesh min-h-screen">
                <Navbar />
                <div className="notFoundContainer !bg-transparent">
                    <div className="notFoundContent">
                        <div className="illustrationWrapper">
                            <img src={illustration404} alt="404 Illustration" className="border-4 border-amber-500/30" />
                        </div>
                        
                        <div className="errorText">
                            <h1 className="!bg-gradient-to-r !from-rose-500 !to-orange-600">404</h1>
                            <h2 className="text-slate-900">Lost in the selection?</h2>
                            <p className="text-slate-600">
                                Oops! The page you're looking for seems to have vanished. 
                                Don't worry, our team can help you find your way back.
                            </p>
                            
                            <div className="actionButtons">
                                <Link to="/" className="homeButton !bg-rose-500 !text-white hover:!bg-rose-600">Back to Home</Link>
                                <Link to="/about" className="secondaryButton !border-rose-500 !text-rose-500 hover:!bg-rose-50">Our Story</Link>
                            </div>
                        </div>

                        <div className="quickLinks !text-slate-400">
                            <Link to="/" className="quickLink !text-slate-500 hover:!text-rose-500">Home</Link>
                            <Link to="/login" className="quickLink !text-slate-500 hover:!text-rose-500">Login</Link>
                            <Link to="/cart" className="quickLink !text-slate-500 hover:!text-rose-500">Cart</Link>
                            <Link to="/profile" className="quickLink !text-slate-500 hover:!text-rose-500">Profile</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </GlobalStateProvider>
    );
};

export default NotFoundPage;
