import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getUser, refreshUser } from '../utils/auth';
import { checkIsAdmin } from '../utils/admin';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(getUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and refresh user data
    const checkAuth = async () => {
      if (getUser()) {
        const refreshedUser = await refreshUser();
        setUser(refreshedUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const result = await apiLogin(email, password);
    if (result.success) {
      const user = getUser();
      setUser(user);
      
      // Navigate based on admin status
      if (checkIsAdmin(user)) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
    return result;
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => {
    setLoading(true);
    const result = await apiRegister(userData);
    if (result.success) {
      const user = getUser();
      setUser(user);
      
      // Navigate based on admin status
      if (checkIsAdmin(user)) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    await apiLogout();
    setUser(null);
    setLoading(false);
    navigate('/login');
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}

