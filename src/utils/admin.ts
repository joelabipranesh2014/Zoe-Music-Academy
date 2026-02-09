import { getUser } from './auth';
import type { User } from '../types';

export const isAdmin = (): boolean => {
  const user = getUser();
  return checkIsAdmin(user);
};

/**
 * Check if a user is an admin
 * Handles both is_admin (boolean) and role (string) fields from API
 */
export const checkIsAdmin = (user: User | null): boolean => {
  if (!user) return false;
  // Check for is_admin boolean field first (if API returns it)
  if ((user as any)?.is_admin === true) return true;
  // Fall back to role field
  return user.role === 'admin';
};

export const requireAdmin = (): boolean => {
  if (!isAdmin()) {
    return false;
  }
  return true;
};

