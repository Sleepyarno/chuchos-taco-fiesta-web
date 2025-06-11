
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import Login from '@/components/admin/Login';
import AdminPanel from '@/components/admin/AdminPanel';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

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
