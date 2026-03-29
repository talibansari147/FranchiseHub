import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Redirect somewhere safe if unauthorized
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'manager') return <Navigate to="/manager" />;
    return <Navigate to="/" />;
  }

  return children;
}
