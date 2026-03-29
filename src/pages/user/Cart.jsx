import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../../features/cartSlice';
import { fetchBranches } from '../../features/branchSlice';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart() {
  const { items } = useSelector(state => state.cart);
  const branches = useSelector(state => state.branches.items);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contact, setContact] = useState('');
  const [customerName, setCustomerName] = useState(user ? user.email.split('@')[0] : '');
  const [branchId, setBranchId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const totalPrice = items.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!branchId) return alert("Please select a delivery branch.");
    if (items.length === 0) return alert("Cart is empty.");

    setIsSubmitting(true);

    try {
      // Loop to create individual order tickets per product (for simplicity in our flat DB structure)
      for (const item of items) {
        const orderData = {
          id: Date.now().toString() + Math.floor(Math.random() * 1000),
          userId: user ? user.uid : 'guest',
          branchId,
          product: item.product.name,
          quantity: item.quantity,
          status: 'Pending',
          customerName,
          contact
        };
        await axios.post('http://localhost:5000/orders', orderData);
      }
      
      setTimeout(() => {
        dispatch(clearCart());
        alert("Your order has been sent to the kitchen! 🎉");
        navigate('/');
      }, 1000);
      
    } catch {
       alert("Error processing your checkout. Please try again.");
    } finally {
       setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
         <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
           <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
         </div>
         <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Your Cart is Empty</h2>
         <p className="text-slate-500 mb-8">Looks like you haven't made your choice yet.</p>
         <Link to="/" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition">
           Explore Menu
         </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Cart Items List */}
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-8 border-b border-slate-200 pb-4">Shopping Cart</h1>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative pr-12">
               <img src={item.product.image} className="w-24 h-24 object-cover rounded-xl" alt={item.product.name} />
               <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-800">{item.product.name}</h3>
                  <p className="text-indigo-600 font-bold mb-2">Rs {item.product.price}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                     <div className="flex items-center bg-slate-100 rounded-lg p-1">
                        <button onClick={() => dispatch(updateQuantity({id: item.product.id, quantity: item.quantity - 1}))} className="w-8 h-8 rounded bg-white shadow-sm text-slate-600 font-black hover:text-indigo-600 focus:outline-none">-</button>
                        <span className="w-10 text-center font-bold text-slate-700">{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({id: item.product.id, quantity: item.quantity + 1}))} className="w-8 h-8 rounded bg-white shadow-sm text-slate-600 font-black hover:text-indigo-600 focus:outline-none">+</button>
                     </div>
                  </div>
               </div>
               <div className="text-right hidden sm:block">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-1">Subtotal</p>
                  <p className="text-xl font-black text-slate-800">Rs {item.product.price * item.quantity}</p>
               </div>
               <button onClick={() => dispatch(removeFromCart(item.product.id))} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Sidebar */}
      <div className="lg:w-1/3">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-300">
              <span>Items Total</span>
              <span>Rs {totalPrice}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Delivery Fee</span>
              <span>Rs 0.00 (Free)</span>
            </div>
          </div>
          
          <div className="flex justify-between text-2xl font-black text-yellow-400 mb-8 pt-4 border-t border-slate-700">
             <span>Total</span>
             <span>Rs {totalPrice}</span>
          </div>

          <form onSubmit={handleCheckout} className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Delivery Branch</label>
               <select required value={branchId} onChange={e => setBranchId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500">
                  <option value="" disabled>Select closest branch...</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.location})</option>
                  ))}
               </select>
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Display Name</label>
               <input required type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500" placeholder="John Doe" />
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Phone Contact</label>
               <input required type="text" value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500" placeholder="0300-..." />
             </div>
             
             <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-75">
               {isSubmitting ? 'Confirming Order...' : 'Checkout Now'}
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}
