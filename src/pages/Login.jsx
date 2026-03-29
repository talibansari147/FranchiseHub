import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    
    dispatch(loginUser({ email, password })).then((res) => {
      if (!res.error) {
        let role = res.payload.role;
        // Map manager implicitly to admin if needed later, but strict block here:
        if (role === 'manager') role = 'admin'; // Fail-safe (treating old managers as admins if they log in)

        if (role !== activeTab && !(role === 'manager' && activeTab === 'admin')) {
           setLocalError(`Access Denied: These credentials do not belong to an ${activeTab.toUpperCase()} account.`);
           dispatch(logoutUser()); 
        } else {
           if (role === 'admin') navigate('/admin');
           else navigate('/');
        }
      }
    });
  };

  const getTabStyle = (role) => {
    if (activeTab === role) return "bg-indigo-600 text-white shadow-md transform scale-105 transition-all font-bold";
    return "bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-semibold";
  };

  const currentDisplayError = localError || error;

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Left Side Image mapped by role */}
        <div className="hidden md:block w-1/2 relative bg-slate-900 overflow-hidden">
          {activeTab === 'user' && <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 animate-fade-in-up" alt="User Portal" />}
          {activeTab === 'admin' && <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 animate-fade-in-up" alt="Admin Portal" />}
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex flex-col justify-end p-12 text-white">
            <div className="uppercase tracking-widest text-indigo-400 font-bold text-sm mb-2">{activeTab} Portal</div>
            <h2 className="text-4xl font-extrabold mb-4 capitalize">Welcome {activeTab}</h2>
            <p className="text-slate-300">
              {activeTab === 'user' && "Order fresh hot food with just a tap."}
              {activeTab === 'admin' && "Complete global control over the franchise network."}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-50 relative">
          
          <div className="flex justify-between bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 mb-10 w-full">
            <button onClick={() => {setActiveTab('user'); setLocalError(null)}} className={`flex-1 py-2.5 rounded-xl text-sm ${getTabStyle('user')}`}>User</button>
            <button onClick={() => {setActiveTab('admin'); setLocalError(null)}} className={`flex-1 py-2.5 rounded-xl text-sm ${getTabStyle('admin')}`}>Admin</button>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Sign In</h1>
            <p className="text-slate-500 mt-2">Enter credentials for your <strong className="capitalize text-indigo-600">{activeTab}</strong> account.</p>
          </div>

          {currentDisplayError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start space-x-3 shadow-sm animate-fade-in-up">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <span className="font-medium text-sm leading-tight">{currentDisplayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-sm outline-none" 
                placeholder="account@domain.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
              </div>
              <input 
                type="password" 
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-sm outline-none" 
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)} required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-600/30 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : `Secure Sign In`}
            </button>
          </form>

          {activeTab === 'user' && (
             <p className="mt-8 text-center text-sm font-medium text-slate-500">
               New customer? <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-colors">Join us today</Link>
             </p>
          )}
        </div>
      </div>
    </div>
  );
}
