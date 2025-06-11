
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import Login from '@/components/admin/Login';
import AdminPanel from '@/components/admin/AdminPanel';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Admin component mounted');
    try {
      const authStatus = isAuthenticated();
      console.log('Authentication status:', authStatus);
      setAuthenticated(authStatus);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    console.log('Login successful');
    setAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('Logout triggered');
    setAuthenticated(false);
  };

  console.log('Admin render - loading:', loading, 'authenticated:', authenticated);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {authenticated ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default Admin;
