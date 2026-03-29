import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../features/branchSlice';

export default function Locations() {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branches.items);
  const status = useSelector((state) => state.branches.status);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <div className="w-full pb-10">
      <div className="text-center py-16 px-4 bg-slate-900 mx-4 mt-4 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen"></div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10 tracking-tight">Find Us Near You</h1>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto relative z-10">
          We're expanding rapidly to bring our delicious meals closer to you. Check out our growing list of local branches.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {status === 'loading' ? (
           <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
           </div>
        ) : branches.length === 0 ? (
           <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-slate-100">
              <span className="text-6xl mb-4 block">📍</span>
              <p className="text-xl text-slate-500 font-medium">No locations available just yet. Check back soon!</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  {branch.image ? (
                     <img src={branch.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={branch.name} />
                  ) : (
                     <div className="w-full h-full flex flex-col pt-8 bg-gradient-to-br from-indigo-50 to-pink-50 items-center text-slate-400 font-bold justify-center rounded-3xl">
                        <svg className="w-16 h-16 text-indigo-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                     </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm border border-indigo-50">
                    Open Now
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{branch.name}</h2>
                  <div className="flex items-start gap-2 text-slate-500 mb-4">
                     <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     <p className="leading-snug">{branch.location || 'Location details not provided yet.'}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-sm font-semibold text-slate-400">ID: {branch.id.substring(0,6)}...</span>
                     <button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1 group/btn">
                        Get Directions
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
