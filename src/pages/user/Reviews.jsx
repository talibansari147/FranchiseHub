import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches, editBranch } from '../../features/branchSlice';

export default function Reviews() {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.branches.items);
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    branchId: '', reviewText: '', reviewerName: user ? user.email.split('@')[0] : ''
  });
  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'read'
  const [selectedBranchToRead, setSelectedBranchToRead] = useState('');

  useEffect(() => {
    dispatch(fetchBranches());
    if (branches.length > 0 && !selectedBranchToRead) {
       setSelectedBranchToRead(branches[0].id);
    }
  }, [dispatch, branches.length, selectedBranchToRead]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.branchId) return alert('Please select a branch');
    
    const branch = branches.find(b => b.id.toString() === formData.branchId.toString());
    if (branch) {
      const newReview = {
        id: Date.now(),
        user: formData.reviewerName || 'Anonymous Foodie',
        review: formData.reviewText,
        date: new Date().toLocaleDateString()
      };
      
      const updatedReviews = [...(branch.reviews || []), newReview];
      dispatch(editBranch({ id: branch.id, updated: { reviews: updatedReviews } })).then(() => {
        setFormData({ ...formData, reviewText: '' });
        setActiveTab('read');
        setSelectedBranchToRead(branch.id);
      });
    }
  };

  const branchToRead = branches.find(b => b.id.toString() === selectedBranchToRead?.toString());

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
         <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Customer <span className="text-indigo-600">Feedback</span></h1>
         <p className="text-lg text-slate-500">Your opinion helps us craft the perfect fast-food experience.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
           <button 
             className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'write' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
             onClick={() => setActiveTab('write')}
           >
             Drop a Review
           </button>
           <button 
             className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'read' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
             onClick={() => setActiveTab('read')}
           >
             Read Wall of Love
           </button>
        </div>

        {/* Write Panel */}
        {activeTab === 'write' && (
          <div className="p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10 max-w-2xl mx-auto space-y-6 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Display Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white outline-none"
                    placeholder="E.g. Food Lover (Optional)"
                    value={formData.reviewerName} onChange={e => setFormData({...formData, reviewerName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Which Branch?</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white outline-none"
                    value={formData.branchId} onChange={e => setFormData({...formData, branchId: e.target.value})}
                  >
                    <option value="" disabled>Select Branch visited...</option>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name} ({b.location})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Experience</label>
                <textarea required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white outline-none resize-none" rows="5"
                  placeholder="The Zinger was crunchy, the fries were hot! Highly recommended..."
                  value={formData.reviewText} onChange={e => setFormData({...formData, reviewText: e.target.value})}
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="w-full md:w-auto px-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:-translate-y-1 transition-all">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Read Panel */}
        {activeTab === 'read' && (
           <div className="p-8 bg-slate-50 min-h-[400px]">
             <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
               <h3 className="text-2xl font-bold text-slate-800">What People Say</h3>
               <select className="px-4 py-2 border border-slate-300 rounded-lg shadow-sm bg-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedBranchToRead} onChange={e => setSelectedBranchToRead(e.target.value)}
               >
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
               </select>
             </div>

             <div className="grid gap-6 md:grid-cols-2">
               {branchToRead && branchToRead.reviews?.length > 0 ? (
                 branchToRead.reviews.map(r => (
                   <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                     <p className="text-slate-600 italic mb-6 relative">
                       <span className="text-4xl text-indigo-100 absolute -top-4 -left-2">"</span>
                       <span className="relative z-10">{r.review}</span>
                     </p>
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                         {r.user.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <p className="font-bold text-slate-800 leading-tight">{r.user}</p>
                         <p className="text-xs text-slate-400">{r.date || 'Recently'}</p>
                       </div>
                     </div>
                   </div>
                 ))
               ) : (
                 <div className="col-span-2 text-center py-12 text-slate-400">
                   <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                   <p className="text-lg">No reviews yet for this branch. Be the first!</p>
                 </div>
               )}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
