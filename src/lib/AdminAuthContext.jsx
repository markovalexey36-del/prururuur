import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api.admin.me();
      setAdmin(data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (payload) => {
    const data = await api.admin.login(payload);
    setAdmin(data.admin);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await api.admin.logout();
    setAdmin(null);
  }, []);

  const value = useMemo(() => ({
    admin,
    isAuthenticated: !!admin,
    loading,
    login,
    logout,
    refresh,
  }), [admin, loading, login, logout, refresh]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
