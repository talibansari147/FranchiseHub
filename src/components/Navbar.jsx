import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => navigate('/login'));
  };

  const isActive = (path) => location.pathname === path ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600";
  const navItemClass = "px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm tracking-wide";

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/50 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
            F
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800 hidden sm:block">
            Franchise<span className="text-gradient">Hub</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <>
              {user.role === 'admin' && (
                <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-slate-100 mr-4">
                  <Link to="/admin" className={`${navItemClass} ${isActive('/admin')}`}>Dashboard</Link>
                  <Link to="/admin/all-orders" className={`${navItemClass} ${isActive('/admin/all-orders')}`}>All Orders</Link>
                  <Link to="/admin/all-reviews" className={`${navItemClass} ${isActive('/admin/all-reviews')}`}>All Reviews</Link>
                  <Link to="/admin/branches" className={`${navItemClass} ${isActive('/admin/branches')}`}>Branches Network</Link>
                  <Link to="/admin/products" className={`${navItemClass} ${isActive('/admin/products')}`}>Master Catalog</Link>
                </div>
              )}
              {user.role === 'user' && (
                <div className="flex bg-white/50 p-1 rounded-xl shadow-sm border border-slate-100 mr-4">
                  <Link to="/" className={`${navItemClass} ${isActive('/')}`}>Our Menu</Link>
                  <Link to="/about" className={`${navItemClass} ${isActive('/about')}`}>About Us</Link>
                  <Link to="/locations" className={`${navItemClass} ${isActive('/locations')}`}>Locations</Link>
                  <Link to="/order" className={`${navItemClass} ${isActive('/order')}`}>Find Branch</Link>
                  <Link to="/reviews" className={`${navItemClass} ${isActive('/reviews')}`}>Community Feedback</Link>
                </div>
              )}
              
              <div className="flex items-center pl-4 border-l border-slate-200 gap-4">
                {user.role === 'user' && (
                  <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    {cartCount > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">{cartCount}</span>}
                  </Link>
                )}

                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800 leading-none">{user.email.split('@')[0]}</span>
                  <span className="text-xs text-indigo-500 font-medium capitalize mt-1 px-2 py-0.5 bg-indigo-50 rounded-full">Owner</span>
                </div>
                <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors shadow-sm" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/about" className="px-3 py-2 text-slate-600 font-medium hover:text-indigo-600 transition-colors hidden lg:block">About Us</Link>
              <Link to="/locations" className="px-3 py-2 text-slate-600 font-medium hover:text-indigo-600 transition-colors hidden lg:block">Locations</Link>
              <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors mr-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {cartCount > 0 && <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">{cartCount}</span>}
              </Link>
              <Link to="/login" className="px-5 py-2.5 text-slate-600 font-medium hover:text-indigo-600 transition-colors">Sign In</Link>
              <Link to="/signup" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5">Create Account</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
