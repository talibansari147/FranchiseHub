import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import { addToCart } from '../../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
     dispatch(addToCart({ product }));
     setToast(`Added ${product.name} to your Cart!`);
     setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full pb-10">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-fade-in-up">
           <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {toast}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-3xl mx-4 mt-4 shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative px-8 py-24 md:py-32 md:px-16 max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-semibold text-sm mb-6 backdrop-blur-md transition-transform hover:scale-105">
            🔥 Welcome to FranchiseHub
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Crave it. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 hover:scale-105 inline-block transition-transform duration-300">Click it.</span><br/> We deliver it.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Experience the best fast-food crafted with fresh ingredients, signature spices, and delivered hot right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => {document.getElementById('menu').scrollIntoView({behavior: 'smooth'})}} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 text-center text-lg">
              Explore Our Menu
            </button>
            <Link to="/reviews" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center text-lg group">
              Read Reviews <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Exclusive Offers Banner (NEW) */}
      <section className="mt-12 mx-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-8 md:p-12 shadow-xl shadow-amber-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-yellow-900 group cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => {document.getElementById('menu').scrollIntoView({behavior: 'smooth'})}}>
         <div className="absolute right-0 top-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700"></div>
         <div className="relative z-10 md:w-2/3">
            <span className="uppercase font-black tracking-widest text-sm bg-yellow-900 text-yellow-400 px-3 py-1 rounded-full mb-4 inline-block shadow-md">Limited Time</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Midnight Cravings Combo!</h2>
            <p className="text-lg font-medium opacity-90">Get two Zinger Burgers and massive crispy fries at a flat 30% discount starting 10:00 PM tonight.</p>
         </div>
         <div className="relative z-10 mt-6 md:mt-0 text-center md:text-right">
            <button className="bg-yellow-900 text-yellow-400 hover:bg-yellow-800 font-bold px-8 py-4 rounded-xl shadow-xl transition-transform hover:-translate-y-1">
               Order Bundle Now
            </button>
         </div>
      </section>

      {/* How It Works (NEW) */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center">
         <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">It's incredibly simple</h2>
         <p className="text-slate-500 text-lg mb-16">Get to the food faster than ever before. Here's how it works.</p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-indigo-100/50 mb-6 text-indigo-600 border-4 border-indigo-50 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">1. Build Your Cart</h3>
               <p className="text-slate-500">Pick from our premium catalog. Burgers, fries, pizzas – mix and match your perfect meal.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-fuchsia-100/50 mb-6 text-fuchsia-600 border-4 border-fuchsia-50 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">2. Secure Checkout</h3>
               <p className="text-slate-500">Select your nearest branch to confirm order. Our secure network transmits it instantly.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center group">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-100/50 mb-6 text-emerald-500 border-4 border-emerald-50 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">3. Receive & Enjoy</h3>
               <p className="text-slate-500">Fast, hot delivery right to your door. Dive in and share a review of your experience!</p>
            </div>
         </div>
      </section>

      {/* Popular Menu Section */}
      <section id="menu" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Signature Menu</h2>
            <p className="text-slate-500 mt-2 text-lg">Carefully crafted, wildly loved.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, idx) => (
            <div key={p.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col relative">
              <div className="h-56 overflow-hidden relative">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                )}
                {idx === 0 && (
                   <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">Bestseller</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between border-t border-slate-50 relative pb-20">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{p.name}</h3>
                  <div className="flex items-center space-x-1 text-yellow-400 mb-3">
                     {[...Array(5)].map((_, i) => (
                       <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                     ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-2xl font-extrabold text-indigo-600">Rs {p.price}</p>
                </div>
              </div>
              
              <button onClick={() => handleAddToCart(p)} className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 group-hover:bg-indigo-600 flex justify-center items-center gap-2">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div>
              <div className="w-16 h-16 mx-auto bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-slate-500">Hot and fresh, delivered to your door in under 30 minutes.</p>
           </div>
           <div>
              <div className="w-16 h-16 mx-auto bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-slate-500">We source only the finest ingredients for unforgettable taste.</p>
           </div>
           <div>
              <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Happy Customers</h3>
              <p className="text-slate-500">Over 10,000+ 5-star reviews from food lovers everywhere.</p>
           </div>
        </div>
      </section>

      {/* Newsletter (NEW) */}
      <section className="mt-12 mx-4 bg-slate-100 rounded-3xl p-8 md:p-16 text-center border border-slate-200 shadow-inner">
         <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Never Miss a Byte!</h2>
         <p className="text-slate-500 mb-8 max-w-lg mx-auto">Subscribe to our newsletter and get exclusive access to flash coupons, new launches, and combo deals direct to your inbox.</p>
         <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input type="email" placeholder="foodlover@email.com" className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <button className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg">Subscribe</button>
         </div>
      </section>
    </div>
  );
}
