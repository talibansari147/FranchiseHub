import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, editBranch } from '../../features/branchSlice';

export default function EmployeeManager() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const branches = useSelector(state => state.branches.items);
  
  const [myBranch, setMyBranch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '' });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (branches.length > 0 && user?.branchId) {
      const branch = branches.find(b => b.id.toString() === user.branchId.toString());
      if (branch) setMyBranch(branch);
    }
  }, [branches, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (myBranch) {
      const newEmployee = { ...formData, id: Date.now() };
      const updatedEmployees = [...(myBranch.employees || []), newEmployee];
      
      dispatch(editBranch({ 
        id: myBranch.id, 
        updated: { employees: updatedEmployees } 
      }));
      
      setShowForm(false);
      setFormData({ name: '', contact: '', email: '' });
    }
  };

  const handleDelete = (empId) => {
    if (myBranch && window.confirm("Terminate this employee's contract?")) {
      const updatedEmployees = myBranch.employees.filter(e => e.id !== empId);
      dispatch(editBranch({ 
        id: myBranch.id, 
        updated: { employees: updatedEmployees } 
      }));
    }
  };

  if (!myBranch) return <div className="p-8 text-center text-slate-400">Loading branch records...</div>;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Staff Roster</h1>
           <p className="text-slate-500 mt-1">Manage human resources for <span className="font-bold text-indigo-600">{myBranch.name}</span></p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`${showForm ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-900 hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg text-white'} px-6 py-3 rounded-xl transition-all font-bold flex items-center justify-center gap-2`}
        >
          {showForm ? 'Hide Registration Form' : (
             <>
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
               Hire Employee
             </>
          )}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-indigo-50 p-8 shadow-inner border border-indigo-100 rounded-3xl mb-8 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-lg font-bold text-indigo-900 border-b border-indigo-200 pb-2 relative z-10">Employee Onboarding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
             <div>
               <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Legal Name</label>
               <input required type="text" placeholder="John Doe" className="w-full border-none box-shadow-sm rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-white transition-colors"
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Contact Link</label>
               <input required type="text" placeholder="0300-1122334" className="w-full border-none box-shadow-sm rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-white transition-colors"
                 value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
             </div>
             <div>
               <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Work Email</label>
               <input required type="email" placeholder="john@branch.com" className="w-full border-none box-shadow-sm rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-white transition-colors"
                 value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
             </div>
          </div>
          <button type="submit" className="relative z-10 bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 shadow-md transition-colors w-full md:w-auto">
            Confirm & Onboard
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {myBranch.employees?.map(emp => (
            <div key={emp.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden relative group">
               <div className="h-24 bg-gradient-to-r from-slate-100 to-indigo-50"></div>
               <div className="absolute top-8 left-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100">
                     <span className="text-2xl font-black text-indigo-600">{emp.name?.charAt(0)}</span>
                  </div>
               </div>
               
               <div className="pt-4 px-6 pb-6">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-xl font-bold text-slate-800">{emp.name}</h3>
                        <p className="text-indigo-500 text-sm font-semibold capitalize">Staff Member</p>
                     </div>
                     <button 
                       onClick={() => handleDelete(emp.id)}
                       className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                       title="Terminate"
                     >
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-lg text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {emp.contact}
                     </div>
                     <div className="flex items-center text-slate-600 bg-slate-50 p-2 rounded-lg text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {emp.email}
                     </div>
                  </div>
               </div>
            </div>
         ))}
         {(!myBranch.employees || myBranch.employees.length === 0) && (
            <div className="lg:col-span-3 text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
               <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               <p className="text-slate-500 font-medium">No employees registered yet. Build your Dream Team now!</p>
            </div>
         )}
      </div>
    </div>
  );
}
