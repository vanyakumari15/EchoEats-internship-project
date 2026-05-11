import React from 'react';
import { RotateCcw, CreditCard, Clock, HelpCircle } from 'lucide-react';

const RefundPage = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-xl border border-white/50 rounded-[3rem] shadow-2xl p-10 lg:p-16">
        
        <div className="text-center mb-16">
          <div className="bg-rose-100 p-4 rounded-full w-fit mx-auto mb-6 text-rose-600">
            <RotateCcw className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">Refund Policy</h1>
          <p className="text-stone-500 text-lg">Transparent and fair refunds for our foodies.</p>
        </div>

        <div className="space-y-12">
          
          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-rose-100 p-2 rounded-xl text-rose-600"><Clock className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">Order Cancellations</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              You can cancel your order within 2 minutes of placement for a full refund. Once the restaurant has accepted the order and started preparation, cancellations may not be eligible for a refund.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><CreditCard className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">Refund Processing</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Approved refunds are processed to your original payment method within 5-7 business days. You will receive an email confirmation once the refund has been initiated.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-stone-100 p-2 rounded-xl text-stone-600"><HelpCircle className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-stone-900">Issues with Food Quality</h2>
            </div>
            <p className="text-stone-600 leading-relaxed">
              If there is an issue with the quality of your food or missing items, please contact us within 30 minutes of delivery with a photo of the issue. We will either issue a partial/full refund or provide a replacement.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPage;
