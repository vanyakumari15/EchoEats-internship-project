import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/40"
      >
        <span className="font-bold text-stone-900">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-stone-600 animate-in slide-in-from-top-2 duration-300">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    { question: "How fast is the delivery?", answer: "We aim for under 20 minutes for local deliveries. Delivery times may vary depending on traffic and restaurant preparation time." },
    { question: "Is there a minimum order amount?", answer: "Most restaurants have a $10 minimum order, but this can vary by partner." },
    { question: "How do I use voice ordering?", answer: "Just click the Echo Assistant icon in the bottom-right corner and say what you're craving! For example: 'Add a cheese pizza to my cart'." },
    { question: "Can I cancel my order?", answer: "Orders can be cancelled within 2 minutes of placement. After that, the restaurant typically starts preparing your food." },
    { question: "Do you offer vegan options?", answer: "Yes! Use our search bar or filter the menu by 'Vegan' category to see all available plant-based options." }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-rose-100 p-4 rounded-full w-fit mx-auto mb-6 text-rose-600"><HelpCircle className="w-10 h-10" /></div>
          <h1 className="text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">FAQ</h1>
          <p className="text-stone-500 text-lg">Common questions and helpful answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => <FAQItem key={idx} {...faq} />)}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
