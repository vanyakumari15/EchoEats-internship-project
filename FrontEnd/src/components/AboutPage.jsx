import React from 'react';
import { Users, Clock, ThumbsUp, Star, Mail, Phone, MapPin, Target, Sparkles } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="glass p-10 rounded-[3rem] border-slate-200 hover:border-rose-500/30 hover:-translate-y-2 transition-all duration-500 group">
    <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-black/10`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-5xl font-black text-slate-900 mb-2">{value}</h3>
    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{label}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="group relative overflow-hidden rounded-[3rem] aspect-square border border-slate-200">
    <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{name}</h4>
      <p className="text-rose-600 font-bold uppercase tracking-widest text-xs mt-2">{role}</p>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-5 py-2 rounded-full border border-slate-200 mb-8">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-rose-600 font-bold text-xs uppercase tracking-widest">Our Vision</span>
          </div>
          <h1 className="text-7xl lg:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            ELEVATING THE <br />
            <span className="text-gradient">TASTE EXPERIENCE</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium">
            EchoEats isn't just a delivery platform. It's a culinary bridge between artisanal excellence and the modern home.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-40">
          <StatCard icon={Users} value="10k+" label="Gourmet Lovers" color="bg-rose-500" />
          <StatCard icon={Clock} value="18m" label="Avg. Response" color="bg-slate-200" />
          <StatCard icon={Target} value="99.9%" label="Quality Focus" color="bg-blue-600" />
          <StatCard icon={Star} value="4.9" label="App Excellence" color="bg-orange-500" />
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="order-2 lg:order-1">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-10 leading-tight tracking-tighter uppercase">
              Founded on <span className="text-rose-500 underline decoration-slate-200 underline-offset-8">Innovation.</span>
            </h2>
            <div className="space-y-8 text-xl text-slate-600 leading-relaxed font-medium mb-12">
              <p>
                In 2024, Vanya Kumari (4th Year ISE) envisioned a fusion of advanced artificial intelligence and artisanal culinary traditions.
              </p>
              <p>
                What started as a student project in a dorm room blossomed into EchoEats—the city's premier destination for those who demand more from their delivery experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-[2rem] border-slate-200 flex items-center space-x-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-rose-500"><Mail className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Email Us</h3>
                  <p className="text-slate-500">concierge@echoeats.com</p>
                </div>
              </div>

              <div className="glass p-8 rounded-[2rem] border-slate-200 flex items-center space-x-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-blue-500"><Phone className="w-6 h-6" /></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Call Us</h3>
                  <p className="text-slate-500">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-[4rem] rotate-3 translate-x-6 translate-y-6 -z-10 group-hover:rotate-1 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-700"></div>
              <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200" 
                alt="Kitchen Excellence" 
                className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl border-4 border-white/10"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter">THE <span className="text-rose-500">VISIONARIES</span></h2>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">The masterminds behind the future of food technology.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <TeamMember name="Vanya Kumari" role="Founder & CEO" image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800" />
          <TeamMember name="Rishil Poojary" role="Head of Technology" image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" />
          <TeamMember name="Adarsh" role="Creative Director" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;