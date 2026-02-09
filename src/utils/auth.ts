import { apiClient } from '../services/api';
import type { User } from '../types';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// User management
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem('user');
};

// Auth state
export const isAuthenticated = (): boolean => {
  return getToken() !== null && getUser() !== null;
};

// Auth functions with API calls
export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  const response = await apiClient.login(email, password);
  
  if (response.success && response.data) {
    setToken(response.data.token);
    setUser(response.data.user);
    return { success: true };
  }
  
  return { success: false, error: response.error || 'Login failed' };
};

export const register = async (userData: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> => {
  const response = await apiClient.register(userData);
  
  if (response.success && response.data) {
    setToken(response.data.token);
    setUser(response.data.user);
    return { success: true };
  }
  
  return { success: false, error: response.error || 'Registration failed' };
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeToken();
    removeUser();
  }
};

export const refreshUser = async (): Promise<User | null> => {
  const response = await apiClient.getCurrentUser();
  
  if (response.success && response.data) {
    setUser(response.data);
    return response.data;
  }
  
  // If refresh fails, clear auth
  removeToken();
  removeUser();
  return null;
};
