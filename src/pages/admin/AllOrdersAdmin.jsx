import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBranches } from '../../features/branchSlice';

export default function AllOrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const branches = useSelector((state) => state.branches.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranches());
    fetchOrders();
  }, [dispatch]);

  const fetchOrders = () => {
    axios.get('http://localhost:5000/orders').then(res => {
      // Sort orders globally (newest first assuming ID is timestamp based roughly)
      setOrders(res.data.reverse());
      setLoading(false);
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(`http://localhost:5000/orders/${id}`, { status: newStatus });
    fetchOrders();
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Global Order History</h1>
            <p className="text-slate-500 mt-2">Comprehensive list of all orders processed across the network.</p>
         </div>
         <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl font-bold">
            Total Orders: {orders.length}
         </div>
      </div>
      
      <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
        {loading ? (
           <div className="p-12 text-center text-slate-400 font-bold">Initialising Secure Connection...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Info</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Product Log</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fulfilling Branch</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map(o => {
                  const branchObj = branches.find(b => b.id.toString() === o.branchId?.toString());
                  return (
                   <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                     <td className="p-4 font-mono text-xs text-slate-500 bg-slate-50/30">{o.id}</td>
                     <td className="p-4">
                       <div className="font-bold text-slate-800 capitalize">{o.customerName || 'Walk-in'}</div>
                       <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          {o.contact || o.userId}
                       </div>
                     </td>
                     <td className="p-4">
                       <div className="font-bold text-indigo-600">{o.product}</div>
                       <div className="text-xs font-semibold text-slate-500 mt-1">Quantity: x{o.quantity}</div>
                     </td>
                     <td className="p-4">
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">B{branchObj?.id || '?'}</div>
                         <span className="font-bold text-slate-600">{branchObj ? branchObj.name : 'Unknown'}</span>
                       </div>
                     </td>
                     <td className="p-4">
                       <select 
                         className={`px-3 py-2 text-sm font-bold rounded-xl border outline-none ${
                           o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500' 
                           : o.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 focus:ring-red-500' 
                           : 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500'
                         }`}
                         value={o.status || 'Pending'}
                         onChange={(e) => handleStatusChange(o.id, e.target.value)}
                       >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                       </select>
                     </td>
                   </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
