/**
 * Development utility to quickly set admin access for testing
 * 
 * Usage: Import and call setTestAdmin() in browser console or component
 * 
 * WARNING: This is for development/testing only. Remove in production!
 */

import { setUser, setToken } from './auth';
import type { User } from '../types';

export const setTestAdmin = () => {
  const adminUser: User = {
    id: 'test-admin-1',
    name: 'Test Admin',
    email: 'admin@zoemusicacademy.com',
    role: 'admin',
    created_at: new Date().toISOString(),
  };

  setUser(adminUser);
  setToken('test-admin-token');
  
  console.log('✅ Admin access granted!');
  console.log('User:', adminUser);
  console.log('Navigate to /admin to access admin panel');
  
  return adminUser;
};

export const removeTestAdmin = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  console.log('✅ Admin access removed');
};

// Make it available globally for easy console access
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).setTestAdmin = setTestAdmin;
  (window as any).removeTestAdmin = removeTestAdmin;
}

