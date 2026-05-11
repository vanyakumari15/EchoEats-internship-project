import React from 'react';
import { Gavel, CheckCircle, AlertCircle, Info } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] shadow-2xl p-10 lg:p-16">
        
        <div className="text-center mb-16">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto mb-6 text-orange-600">
            <Gavel className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-stone-500 text-lg">Effective Date: April 23, 2026</p>
        </div>

        <div className="space-y-12">
          
          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><CheckCircle className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              By accessing or using EchoEats, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-rose-100 p-2 rounded-xl text-rose-600"><Info className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">2. User Accounts</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-stone-100 p-2 rounded-xl text-stone-600"><AlertCircle className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">3. Service Availability</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              While we strive for 100% uptime, EchoEats does not guarantee that our service will be uninterrupted or error-free. We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
