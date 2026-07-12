import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/lib/AdminAuthContext';

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-obsidian">
        <div className="w-8 h-8 border-2 border-cyber-violet/30 border-t-cyber-violet rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
