import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, editBranch } from '../../features/branchSlice';
import { fetchProducts } from '../../features/productSlice';

export default function InventoryManager() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const branches = useSelector(state => state.branches.items);
  const products = useSelector(state => state.products.items);
  
  const [myBranch, setMyBranch] = useState(null);
  const [inventory, setInventory] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (branches.length > 0 && user?.branchId) {
      const branch = branches.find(b => b.id.toString() === user.branchId.toString());
      if (branch) {
        setMyBranch(branch);
        setInventory(branch.inventory || {});
      }
    }
  }, [branches, user]);

  const handleUpdate = () => {
    if (myBranch) {
      setIsSaving(true);
      dispatch(editBranch({ 
        id: myBranch.id, 
        updated: { inventory } 
      })).then(() => {
         setIsSaving(false);
      });
    }
  };

  const handleInputChange = (item, value) => {
    setInventory(prev => ({ ...prev, [item]: Number(value) }));
  };

  if (!myBranch) return <div className="p-8 text-center text-slate-400">Synchronizing Inventory...</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Stock & Inventory</h1>
           <p className="text-slate-500 mt-1">Manage ingredient levels for <span className="font-bold text-indigo-600">{myBranch.name}</span></p>
        </div>
        <button 
           onClick={handleUpdate}
           disabled={isSaving}
           className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all font-bold flex items-center justify-center disabled:opacity-75"
        >
          {isSaving ? 'Synchronizing...' : 'Sync Stock Levels'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Inventory Editor */}
        <div className="lg:col-span-3 bg-white p-8 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100">
          <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
             <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             Current Warehouse Assets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(inventory).map(key => {
              const qty = inventory[key];
              const isLow = qty < 30;
              return (
                <div key={key} className={`flex justify-between items-center p-4 rounded-2xl border transition-colors ${
                  isLow ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
                }`}>
                  <div className="flex flex-col">
                     <span className="capitalize font-bold text-slate-700">{key}</span>
                     {isLow && <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Low Stock</span>}
                  </div>
                  <input 
                    type="number" 
                    value={qty} 
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="border border-slate-300 p-2 rounded-xl w-20 text-center font-black text-indigo-700 focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl border">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Register New Item Category</h3>
            <div className="flex gap-2">
               <input 
                 type="text" 
                 id="newItem"
                 placeholder="e.g. Cheese Slices" 
                 className="flex-1 border border-slate-300 p-3 rounded-xl focus:outline-indigo-500 bg-white"
               />
               <button 
                 onClick={() => {
                   const val = document.getElementById('newItem').value;
                   if(val) handleInputChange(val.toLowerCase(), 0);
                   document.getElementById('newItem').value = '';
                 }}
                 className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition"
               >
                 Add
               </button>
            </div>
          </div>
        </div>

        {/* Reference Catalog */}
        <div className="lg:col-span-2 bg-indigo-50 p-8 shadow-inner rounded-3xl border border-indigo-100">
          <h2 className="text-lg font-bold mb-6 text-indigo-900 flex items-center gap-2">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
             Global Products Ref
          </h2>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                <span className="font-bold text-indigo-800">{p.name}</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg text-sm font-black">Rs {p.price}</span>
              </div>
            ))}
            {products.length === 0 && <p className="text-indigo-400 text-sm">No products in global catalog.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
