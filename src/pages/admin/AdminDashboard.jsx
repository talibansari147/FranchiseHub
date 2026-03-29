import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../features/branchSlice';
import { fetchProducts } from '../../features/productSlice';
import axios from 'axios';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.items);
  const products = useSelector((state) => state.products.items);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchProducts());
    axios.get('http://localhost:5000/orders').then(res => setOrders(res.data));
  }, [dispatch]);

  const totalEmployees = branches.reduce((acc, b) => acc + (b.employees?.length || 0), 0);
  const totalRevenue = orders.reduce((acc, curr) => {
     const product = products.find(p => p.name === curr.product);
     return acc + ((product?.price || 0) * (curr.quantity || 1));
  }, 0);

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">HQ Overview</h1>
            <p className="text-slate-500 mt-2">Your entire franchise ecosystem at a glance.</p>
         </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 shadow-xl shadow-indigo-100 rounded-3xl flex flex-col justify-center border border-indigo-50 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider relative z-10">Total Branches</h2>
          <p className="text-5xl font-black text-indigo-600 mt-2 relative z-10">{branches.length}</p>
        </div>

        <div className="bg-white p-6 shadow-xl shadow-fuchsia-100 rounded-3xl flex flex-col justify-center border border-fuchsia-50 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-fuchsia-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider relative z-10">Total Catalog Items</h2>
          <p className="text-5xl font-black text-fuchsia-600 mt-2 relative z-10">{products.length}</p>
        </div>

        <div className="bg-white p-6 shadow-xl shadow-amber-100 rounded-3xl flex flex-col justify-center border border-amber-50 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider relative z-10">Global Workforce</h2>
          <p className="text-5xl font-black text-amber-500 mt-2 relative z-10">{totalEmployees}</p>
        </div>

        <div className="bg-white p-6 shadow-xl shadow-emerald-100 rounded-3xl flex flex-col justify-center border border-emerald-50 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider relative z-10">Estimated Sales</h2>
          <p className="text-5xl font-black text-emerald-500 mt-2 relative z-10">Rs {totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Live Orders Feed */}
      <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">System Live Orders</h2>
          <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Item</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider bg-indigo-50/50">Branch</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Qty</th>
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(o => {
                const branchObj = branches.find(b => b.id.toString() === o.branchId?.toString());
                return (
                 <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                   <td className="p-4 font-mono text-xs text-slate-400">{o.id.substring(0,8)}...</td>
                   <td className="p-4">
                     <div className="font-bold text-slate-700 capitalize">{o.customerName || 'Walk-in'}</div>
                     <div className="text-xs text-slate-400">{o.contact || o.userId}</div>
                   </td>
                   <td className="p-4 font-semibold text-slate-700">{o.product}</td>
                   <td className="p-4 bg-indigo-50/20 font-medium text-indigo-700">{branchObj ? `${branchObj.name} (${branchObj.location})` : `Branch #${o.branchId}`}</td>
                   <td className="p-4 text-center font-bold text-slate-600 bg-slate-50/50 rounded-lg">{o.quantity}</td>
                   <td className="p-4">
                     <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                       o.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                     }`}>
                       {o.status || 'Pending'}
                     </span>
                   </td>
                 </tr>
                )
              })}
              {orders.length === 0 && (
                 <tr>
                    <td colSpan="6" className="p-12 text-center text-slate-400">
                       <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                       No orders currently inside the network.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
