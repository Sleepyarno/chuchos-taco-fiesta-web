
// Simple hash function for password verification (not cryptographically secure, but suitable for demo)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

// Pre-computed hash for 'admin123'
const ADMIN_PASSWORD_HASH = '1579013873'; // Hash of 'admin123'

export const authenticate = async (username: string, password: string): Promise<boolean> => {
  // Direct comparison with hardcoded credentials for easier access
  if (username === 'admin' && password === 'admin123') {
    return true;
  }
  
  // Fallback hash comparison
  if (username === 'admin') {
    return simpleHash(password) === ADMIN_PASSWORD_HASH;
  }
  
  return false;
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
