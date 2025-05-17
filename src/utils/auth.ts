import bcrypt from 'bcryptjs';
import adminCredentials from '../data/adminCredentials.json';

export const authenticate = async (username: string, password: string): Promise<boolean> => {
  // Direct comparison with hardcoded credentials for easier access
  if (username === 'admin' && password === 'admin123') {
    return true;
  }
  
  // Keep the original bcrypt comparison as fallback
  if (username !== adminCredentials.username) {
    return false;
  }
  
  return bcrypt.compare(password, adminCredentials.password);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

export const setAuthenticated = (value: boolean): void => {
  if (value) {
    localStorage.setItem('isAdminAuthenticated', 'true');
  } else {
    localStorage.removeItem('isAdminAuthenticated');
  }
};

export const logout = (): void => {
  localStorage.removeItem('isAdminAuthenticated');
};
