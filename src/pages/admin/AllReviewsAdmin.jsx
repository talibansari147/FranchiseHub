import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBranches } from '../../features/branchSlice';

export default function AllReviewsAdmin() {
  const branches = useSelector((state) => state.branches.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Flatten all reviews from all branches
  const globalReviews = branches.reduce((acc, currentBranch) => {
     if (currentBranch.reviews && currentBranch.reviews.length > 0) {
        const branchReviews = currentBranch.reviews.map(r => ({...r, branchName: currentBranch.name}));
        return [...acc, ...branchReviews];
     }
     return acc;
  }, []);

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Global Feedback</h1>
            <p className="text-slate-500 mt-2">Monitor customer satisfaction across all active branches.</p>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {globalReviews.map((r, index) => (
           <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 relative group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 p-4">
                 <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{r.branchName}</span>
              </div>
              
              <div className="mb-6 relative">
                 <span className="text-6xl text-slate-200 font-serif leading-none absolute -top-4 -left-3 group-hover:text-indigo-100 transition-colors">"</span>
                 <p className="relative z-10 text-slate-700 italic text-lg line-clamp-4">{r.review}</p>
              </div>
              
              <div className="border-t border-slate-100 pt-4 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                   {r.user ? r.user.charAt(0).toUpperCase() : '?'}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800 text-lg">{r.user || 'Unknown User'}</h4>
                    <p className="text-xs font-semibold text-slate-400">{r.date || 'Recent Submission'}</p>
                 </div>
              </div>
           </div>
         ))}

         {globalReviews.length === 0 && (
           <div className="col-span-full py-20 text-center">
             <div className="w-24 h-24 mx-auto bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
             </div>
             <p className="text-slate-500 font-medium text-lg">No reviews have been submitted into the database yet.</p>
           </div>
         )}
      </div>
    </div>
  );
}
