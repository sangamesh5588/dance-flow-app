import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Music, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Dance Academy",
      });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use any email with password "password"');
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset link would be sent to your email",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Star className="absolute top-20 left-20 w-4 h-4 text-primary/30 animate-pulse" />
        <Music className="absolute top-40 right-32 w-6 h-6 text-secondary/40 floating-animation" />
        <Star className="absolute bottom-32 left-1/4 w-5 h-5 text-primary/25 animate-pulse delay-1000" />
        <Music className="absolute bottom-20 right-20 w-4 h-4 text-secondary/30 floating-animation delay-500" />
      </div>

      <Card className="w-full max-w-md dance-card slide-in-up relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center dance-glow">
            <Music className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dance Academy
          </CardTitle>
          <CardDescription>
            Welcome back! Sign in to your student portal
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@danceacademy.com"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full dance-button text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full transition-colors hover:text-primary"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-4 p-3 bg-accent/50 rounded-lg">
              <p className="font-medium">Demo Account:</p>
              <p>Email: any email address</p>
              <p>Password: <code className="bg-muted px-1 rounded">password</code></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;