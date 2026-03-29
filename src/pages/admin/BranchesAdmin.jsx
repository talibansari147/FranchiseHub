import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, addBranch, editBranch, deleteBranch } from '../../features/branchSlice';

export default function BranchesAdmin() {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.items);

  const [formData, setFormData] = useState({ name: '', location: '', managerEmail: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(editBranch({ id: editingId, updated: formData })).then(() => {
        setEditingId(null);
        setFormData({ name: '', location: '', managerEmail: '' });
      });
    } else {
      const newBranch = { ...formData, id: Date.now().toString(), inventory: {}, employees: [], reviews: [] };
      dispatch(addBranch(newBranch)).then(() => setFormData({ name: '', location: '', managerEmail: '' }));
    }
  };

  const handleEditInit = (b) => {
    setEditingId(b.id);
    setFormData({ name: b.name, location: b.location, managerEmail: b.managerEmail });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', managerEmail: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm("Disconnect and delete this branch from network?")) dispatch(deleteBranch(id));
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-8">Branch Network Operations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 p-8 self-start sticky top-24">
          <div className="flex items-center justify-between mb-6 border-b border-indigo-100 pb-3">
             <h2 className="text-xl font-bold text-indigo-900">{editingId ? 'Edit Branch Data' : 'Register Sub-Branch'}</h2>
             {editingId && (
                <button type="button" onClick={handleCancelEdit} className="text-sm font-bold text-slate-400 hover:text-slate-700">Cancel</button>
             )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Branch Name</label>
               <input required type="text" placeholder="e.g. Islamabad Centaurus" className="w-full border-slate-200 border rounded-xl p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 transition-colors"
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City / Location</label>
               <input required type="text" placeholder="Islamabad" className="w-full border-slate-200 border rounded-xl p-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-slate-50 transition-colors"
                 value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
            <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Manager Access Email</label>
               <input type="email" placeholder="(Depreciated)" disabled className="w-full border-slate-200 border rounded-xl p-3 bg-slate-200 text-slate-400 cursor-not-allowed"
                 value={formData.managerEmail} onChange={e => setFormData({...formData, managerEmail: e.target.value})} title="Manager roles have been phased out." />
            </div>
            <button type="submit" className={`w-full text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 ${editingId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`}>
              {editingId ? 'Update Branch Details' : 'Deploy Branch'}
            </button>
          </form>
        </div>

        {/* Network Table */}
        <div className="lg:col-span-2 bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h2 className="text-xl font-bold text-slate-800">Active Network Nodes</h2>
             <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">{branches.length} Branches</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-slate-100">
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Node / Branch</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Metrics</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {branches.map(branch => (
                  <tr key={branch.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-base">{branch.name}</div>
                      <div className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded">
                        {branch.location}
                      </div>
                    </td>
                    <td className="p-4">
                       <div className="flex flex-col gap-1 text-xs font-medium text-slate-500">
                         <span>Staff: <b className="text-slate-800">{branch.employees?.length || 0}</b></span>
                         <span>Catalog Stock: <b className="text-slate-800">{Object.keys(branch.inventory || {}).length}</b></span>
                       </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleEditInit(branch)}
                          className="px-3 py-1.5 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(branch.id)}
                          className="px-3 py-1.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {branches.length === 0 && (
                   <tr>
                      <td colSpan="3" className="p-8 text-center text-slate-400">Network is offline. Register a branch.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
