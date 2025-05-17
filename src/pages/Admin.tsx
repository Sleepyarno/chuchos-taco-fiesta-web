
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import Login from '@/components/admin/Login';
import AdminPanel from '@/components/admin/AdminPanel';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

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

      <Button 
        className="fixed bottom-4 right-4 bg-bright-orange hover:bg-orange-600"
        onClick={() => navigate('/')}
      >
        Back to Website
      </Button>
    </div>
  );
};

export default Admin;
