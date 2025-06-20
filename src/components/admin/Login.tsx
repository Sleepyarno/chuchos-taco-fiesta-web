
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { authenticate, setAuthenticated } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import ForgotPassword from './ForgotPassword';

type LoginProps = {
  onSuccess: () => void;
};

const Login = ({ onSuccess }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isAuth = await authenticate(username, password);
      if (isAuth) {
        setAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        onSuccess();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bright-orange/20 to-vivid-purple/20 relative">
        <Button 
          className="absolute top-4 left-4 bg-bright-orange hover:bg-orange-600"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Website
        </Button>
        
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bright-orange/20 to-vivid-purple/20 relative">
      <Button 
        className="absolute top-4 left-4 bg-bright-orange hover:bg-orange-600"
        onClick={() => navigate('/')}
      >
        <Home className="h-4 w-4 mr-2" />
        Back to Website
      </Button>
      
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
          <CardDescription className="text-center font-medium text-bright-orange">
            Default: admin / admin123
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full bg-bright-orange hover:bg-orange-600" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot your password?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
