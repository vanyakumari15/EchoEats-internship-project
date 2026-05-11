import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] shadow-2xl p-10 lg:p-16">
        
        <div className="text-center mb-16">
          <div className="bg-rose-100 p-4 rounded-full w-fit mx-auto mb-6 text-rose-600">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-stone-500 text-lg">Last updated: April 23, 2026</p>
        </div>

        <div className="space-y-12">
          
          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><Eye className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">Information We Collect</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              We collect information that you provide directly to us when you create an account, place an order, or communicate with us. This includes your name, email address, phone number, and delivery address.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-rose-100 p-2 rounded-xl text-rose-600"><Lock className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">How We Use Your Data</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Your data is used to process your food orders, manage your account, and provide you with personalized recommendations through our AI assistant. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-stone-100 p-2 rounded-xl text-stone-600"><FileText className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">Security Measures</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data (like passwords) is encrypted using industry-standard protocols.
            </p>
          </section>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
            <h3 className="font-bold text-stone-900 mb-2">Questions?</h3>
            <p className="text-sm text-stone-500">
              If you have any questions about this Privacy Policy, please contact us at <span className="text-rose-600 font-bold">privacy@echoeats.com</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
