import React, { useState, useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            if (isLogin) {
                const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
                login(data);
                navigate('/');
            } else {
                const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
                login(data);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mesh flex items-center justify-center py-24 px-4 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 filter blur-[150px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 filter blur-[150px] rounded-full"></div>

            <div className="max-w-xl w-full relative z-10">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-rose-500 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-rose-500/20">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        {isLogin ? 'WELCOME BACK' : 'JOIN THE ELITE'}
                    </h2>
                    <p className="text-slate-600 text-lg font-bold">
                        {isLogin ? "Ready for your next indulgence?" : "Experience food delivery like never before."}
                    </p>
                </div>

                <div className="glass p-10 lg:p-16 rounded-[4rem] border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-slate-900 transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="space-y-3">
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-5 pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-5 pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest ml-4">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl py-5 pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-6 text-lg flex items-center justify-center group"
                            >
                                {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
                                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center">
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            {isLogin ? "Don't have an account? Join us" : "Already a member? Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;