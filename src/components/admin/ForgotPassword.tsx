
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Mail } from 'lucide-react';

type ForgotPasswordProps = {
  onBack: () => void;
};

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset process
    setTimeout(() => {
      toast({
        title: "Password reset instructions sent",
        description: "Please check your email for password reset instructions. For demo purposes, the default credentials are admin/admin123.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you password reset instructions
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full bg-bright-orange hover:bg-orange-600" disabled={isLoading}>
              <Mail className="h-4 w-4 mr-2" />
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default ForgotPassword;
