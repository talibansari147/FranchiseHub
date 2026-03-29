import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../features/branchSlice';
import axios from 'axios';

export default function ManagerDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const branches = useSelector((state) => state.branches.items);
  
  const [myBranch, setMyBranch] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchBranches());
    axios.get('http://localhost:5000/orders').then(res => setOrders(res.data));
  }, [dispatch]);

  useEffect(() => {
    if (branches.length > 0 && user?.branchId) {
      const branch = branches.find(b => b.id.toString() === user.branchId.toString());
      setMyBranch(branch);
    }
  }, [branches, user]);

  if (!myBranch) return (
     <div className="flex justify-center items-center h-64 text-slate-500 font-bold">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        Synchronizing Branch Data...
     </div>
  );

  const branchOrders = orders.filter(o => o.branchId?.toString() === myBranch.id.toString());

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="bg-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-1">Welcome back!</h1>
            <p className="text-indigo-200 text-lg">You are managing <span className="text-white font-bold">{myBranch.name} ({myBranch.location})</span></p>
         </div>
         <div className="relative z-10 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-center">
            <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Branch Rating</p>
            <p className="text-3xl font-black text-amber-300 flex items-center justify-center gap-2">
               4.8 <svg className="w-6 h-6 fill-current text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            </p>
         </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-2xl flex flex-col justify-center">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Staff</h2>
                <p className="text-4xl font-black text-slate-800">{myBranch.employees?.length || 0}</p>
              </div>

              <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-2xl flex flex-col justify-center">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inventory Stock</h2>
                <p className="text-4xl font-black text-slate-800">{Object.keys(myBranch.inventory || {}).length}</p>
              </div>

              <div className="bg-white p-6 shadow-sm border border-slate-100 rounded-2xl flex flex-col justify-center">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Orders Made</h2>
                <p className="text-4xl font-black text-slate-800">{branchOrders.length}</p>
              </div>
            </div>

            {/* Live Branch Orders */}
            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Branch Order Queue</h2>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <tbody className="divide-y divide-slate-50">
                     {branchOrders.map(o => (
                       <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                         <td className="p-4">
                           <div className="font-bold text-slate-700 capitalize">{o.customerName || 'Walk-in'}</div>
                           <div className="text-xs text-slate-400">{o.contact || o.userId}</div>
                         </td>
                         <td className="p-4 font-semibold text-slate-700">{o.product} <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded ml-2">x{o.quantity}</span></td>
                         <td className="p-4 text-right">
                           <span className={`px-3 py-1 text-xs font-bold rounded-full ${o.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                             {o.status || 'Pending'}
                           </span>
                         </td>
                       </tr>
                     ))}
                     {branchOrders.length === 0 && (
                        <tr><td colSpan="3" className="p-8 text-center text-slate-400">No recent orders for this branch.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>

         <div className="lg:col-span-1">
            {/* Recent Reviews (Branch Specific) */}
            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h2 className="text-xl font-bold text-slate-800">Branch Testimonials</h2>
              </div>
              <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                {myBranch.reviews?.length > 0 ? myBranch.reviews.map((r, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm relative">
                    <div className="absolute top-2 right-4 text-4xl text-slate-100 font-serif leading-none">"</div>
                    <p className="font-bold text-slate-800 text-sm mb-1">{r.user}</p>
                    <p className="text-slate-600 text-sm italic relative z-10">{r.review}</p>
                  </div>
                )) : (
                  <p className="text-slate-400 text-center py-4">No reviews yet.</p>
                )}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
