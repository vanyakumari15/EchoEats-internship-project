import React, { useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalStateContext';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Calendar, MapPin, Edit, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isLoggedIn || !user) {
        navigate('/login');
        return null;
    }

    const getInitials = () => {
        if (!user.name) return '?';
        const names = user.name.split(' ');
        if (names.length > 1) {
            return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
        }
        return user.name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl-xl rounded-2xl overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-rose-600 to-orange-600"></div>
                    
                    <div className="relative px-8 pb-8 flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12 gap-6">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl-lg flex items-center justify-center text-4xl font-bold text-rose-600 bg-gradient-to-br from-rose-50 to-rose-100">
                            {getInitials()}
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left mb-2">
                            <h1 className="text-3xl font-extrabold text-stone-900">{user.name}</h1>
                            <p className="text-rose-600 font-medium flex items-center justify-center sm:justify-start mt-1">
                                <Shield className="w-4 h-4 mr-1" />
                                {user.role === 'admin' ? 'Administrator' : 'Customer'}
                            </p>
                        </div>
                        
                        <button className="flex items-center px-4 py-2 border border-stone-300 shadow-sm text-sm font-medium rounded-lg text-stone-700 bg-white hover:bg-white mb-2">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                    </div>

                    <div className="border-t border-stone-200 px-8 py-8">
                        <h2 className="text-xl font-bold text-stone-900 mb-6 border-b pb-4">Personal Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start bg-white p-4 rounded-xl">
                                <User className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <p className="text-sm font-medium text-stone-500">Full Name</p>
                                    <p className="mt-1 text-lg text-stone-900 font-semibold">{user.name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start bg-white p-4 rounded-xl">
                                <Mail className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <p className="text-sm font-medium text-stone-500">Email Address</p>
                                    <p className="mt-1 text-lg text-stone-900 font-semibold">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-white p-4 rounded-xl">
                                <Calendar className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <p className="text-sm font-medium text-stone-500">Member Since</p>
                                    <p className="mt-1 text-lg text-stone-900 font-semibold">
                                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start bg-white p-4 rounded-xl">
                                <MapPin className="w-6 h-6 text-stone-400 mt-1 mr-4" />
                                <div>
                                    <p className="text-sm font-medium text-stone-500">Default Address</p>
                                    <p className="mt-1 text-lg text-stone-900 font-semibold">Not set</p>
                                    <button className="text-sm text-rose-600 hover:text-rose-700 mt-1 font-medium">Add address</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;