import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">Contact Us</h1>
          <p className="text-stone-500 text-lg">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl flex items-start space-x-6">
              <div className="bg-rose-100 p-4 rounded-2xl text-rose-600"><Mail className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">Email Us</h3>
                <p className="text-stone-600">support@echoeats.com</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl flex items-start space-x-6">
              <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Phone className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">Call Us</h3>
                <p className="text-stone-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl flex items-start space-x-6">
              <div className="bg-stone-100 p-4 rounded-2xl text-stone-600"><MapPin className="w-6 h-6" /></div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-1">Visit Us</h3>
                <p className="text-stone-600">123 Food Street, Delicious City</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-2xl">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                <input type="text" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                <textarea rows="4" className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-rose-600/30 transition-all flex items-center justify-center">
                Send Message <Send className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
