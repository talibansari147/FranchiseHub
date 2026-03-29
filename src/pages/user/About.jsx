import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="w-full pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-3xl mx-4 mt-4 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
            alt="About Us Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative px-8 py-24 md:py-32 md:px-16 max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-semibold text-sm mb-6 backdrop-blur-md">
            🚀 Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Crafting flavors that <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-500">spark joy.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            From a humble kitchen to a nationwide sensation, our journey has been fueled by an uncompromising passion for taste, quality, and moments of shared happiness.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-4 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow group">
            <h3 className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform">12+</h3>
            <p className="text-slate-500 font-medium">Locations</p>
         </div>
         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow group">
            <h3 className="text-4xl font-black text-fuchsia-600 mb-2 group-hover:scale-110 transition-transform">1.2M</h3>
            <p className="text-slate-500 font-medium">Meals Served</p>
         </div>
         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow group">
            <h3 className="text-4xl font-black text-amber-500 mb-2 group-hover:scale-110 transition-transform">50+</h3>
            <p className="text-slate-500 font-medium">Menu Items</p>
         </div>
         <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow group">
            <h3 className="text-4xl font-black text-emerald-500 mb-2 group-hover:scale-110 transition-transform">4.9</h3>
            <p className="text-slate-500 font-medium">Star Rating</p>
         </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
         <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000&auto=format&fit=crop" className="relative z-10 w-full h-auto rounded-3xl shadow-2xl object-cover border-4 border-white" alt="Chef Cooking" />
         </div>
         
         <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">We believe in <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">real ingredients.</span></h2>
            <p className="text-lg text-slate-500 mb-6 leading-relaxed">
               Quality isn't just a buzzword for us—it's the foundation of everything we do. We source our produce from local farmers, hand-pick our spices, and prepare our dishes fresh to order every single day.
            </p>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
               When you take a bite of our signature burger or slice into our fresh-baked pizza, you're tasting hours of dedication, years of perfected recipes, and a genuine love for incredible food.
            </p>
            
            <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 group">
               View Our Menu
               <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </Link>
         </div>
      </section>
      
      {/* Promise Section */}
      <section className="mx-4 mt-8 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
         
         <div className="relative z-10 max-w-3xl mx-auto">
            <svg className="w-16 h-16 text-indigo-400 mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Promise to You</h2>
            <p className="text-xl text-indigo-200 mb-0 font-light leading-relaxed">
               "We will never compromise on taste. We promise to deliver hot, fresh, and irresistibly delicious food to your table, every single time. Your satisfaction is not just our goal, it's our guarantee."
            </p>
         </div>
      </section>
    </div>
  );
}
