import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import { fetchBranches } from '../../features/branchSlice';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector(state => state.products.items);
  const branches = useSelector(state => state.branches.items);
  const { user } = useSelector(state => state.auth);
  
  const queryParams = new URLSearchParams(location.search);
  const defaultProduct = queryParams.get('item') || '';

  const [formData, setFormData] = useState({
    name: '', contact: '', email: user ? user.email : '',
    branchId: '', productId: defaultProduct, quantity: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedProduct = products.find(p => p.id.toString() === formData.productId.toString());
    const newOrder = {
      id: Date.now().toString(),
      userId: user ? user.uid : 'guest',
      branchId: formData.branchId, 
      product: selectedProduct ? selectedProduct.name : '',
      quantity: Number(formData.quantity),
      status: 'Pending',
      customerName: formData.name,
      contact: formData.contact
    };

    try {
      await axios.post('http://localhost:5000/orders', newOrder);
      setTimeout(() => {
         setIsSubmitting(false);
         alert('Direct order placed successfully!');
         navigate('/');
      }, 1000);
    } catch {
       alert("Error placing order.");
       setIsSubmitting(false);
    }
  };

  const selectedProductData = products.find(p => p.id.toString() === formData.productId.toString());
  const totalPrice = selectedProductData ? selectedProductData.price * formData.quantity : 0;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Visual Map/Info side */}
        <div className="md:w-5/12 bg-slate-900 p-8 md:p-12 text-white relative flex flex-col justify-between overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center mix-blend-overlay"></div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 mb-12">
              <h2 className="text-3xl font-extrabold mb-4">Fast Checkout</h2>
              <p className="text-slate-300 text-lg leading-relaxed">Direct ordering portal for single items. If you want multiple items, use our new Cart system!</p>
           </div>

           {/* Why Trust Us (NEW Section) */}
           <div className="relative z-10 hidden sm:block mb-8 border-y border-slate-700 py-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Why users love us</h3>
              <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                    <div className="mt-1 text-green-400 bg-green-400/10 p-1.5 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                    <span className="text-slate-300">Over 50+ network branches</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="mt-1 text-yellow-400 bg-yellow-400/10 p-1.5 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <span className="text-slate-300">Real-time driver tracking</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="mt-1 text-purple-400 bg-purple-400/10 p-1.5 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
                    <span className="text-slate-300">Grade A ingredients guaranteed</span>
                 </li>
              </ul>
           </div>

           <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <h3 className="text-lg font-bold mb-4">Summary</h3>
              {selectedProductData ? (
                 <>
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-slate-300">{selectedProductData.name} (x{formData.quantity})</span>
                     <span className="font-semibold">Rs {selectedProductData.price * formData.quantity}</span>
                   </div>
                   <div className="w-full h-px bg-white/20 my-3"></div>
                   <div className="flex justify-between items-center text-xl font-bold text-yellow-400">
                     <span>Total</span>
                     <span>Rs {totalPrice}</span>
                   </div>
                 </>
              ) : (
                <p className="text-slate-400 text-sm">Please select a product.</p>
              )}
           </div>
        </div>

        {/* Right Form Side */}
        <div className="md:w-7/12 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Full Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white outline-none"
                  placeholder="John Doe"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white outline-none"
                  placeholder="0300-1234567"
                  value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Delivery Branch (Closest to you)</label>
              <select required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white outline-none"
                value={formData.branchId} onChange={e => setFormData({...formData, branchId: e.target.value})}
              >
                <option value="" disabled>Select nearest branch...</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.location})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Item</label>
                <select required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 focus:bg-white outline-none"
                  value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})}
                >
                  <option value="" disabled>What are you craving?</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - Rs {p.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
                <input required type="number" min="1" max="20" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-slate-50 outline-none text-center"
                  value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/30 disabled:opacity-75 disabled:hover:translate-y-0 flex justify-center items-center">
              {isSubmitting ? 'Processing Order...' : 'Confirm & Send to Kitchen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
