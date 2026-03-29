import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/authSlice';

// Components
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/user/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import BranchesAdmin from './pages/admin/BranchesAdmin.jsx';
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx';
import OrderForm from './pages/user/OrderForm.jsx';
import Reviews from './pages/user/Reviews.jsx';
import Cart from './pages/user/Cart.jsx';
import About from './pages/user/About.jsx';
import Locations from './pages/user/Locations.jsx';
import AllOrdersAdmin from './pages/admin/AllOrdersAdmin.jsx';
import AllReviewsAdmin from './pages/admin/AllReviewsAdmin.jsx';
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check firebase auth state
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/locations" element={<Locations />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/all-orders" element={<ProtectedRoute role="admin"><AllOrdersAdmin /></ProtectedRoute>} />
          <Route path="/admin/all-reviews" element={<ProtectedRoute role="admin"><AllReviewsAdmin /></ProtectedRoute>} />
          <Route path="/admin/branches" element={<ProtectedRoute role="admin"><BranchesAdmin /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute role="admin"><ProductsAdmin /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}