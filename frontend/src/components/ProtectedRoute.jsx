import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <p className="text-xl sm:text-2xl font-semibold text-slate-700">Checking authentication...</p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
};

export default ProtectedRoute; 