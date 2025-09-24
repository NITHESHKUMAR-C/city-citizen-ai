import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Shield, User } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const LoginPage = () => {
  const [accountType, setAccountType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      // Check user profile for role and redirect accordingly
      checkUserProfile();
    }
  }, [user]);

  const checkUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (profile?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      navigate('/welcome');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      // Navigation will be handled by useEffect when user state changes
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-secondary/10 p-4">
      <div className="w-full max-w-6xl flex rounded-2xl shadow-elegant overflow-hidden bg-card">
        {/* Left side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img 
            src={heroImage} 
            alt="Civic Issues App Hero" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 gradient-hero opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">🏛️ Welcome Back</h1>
              <p className="text-xl opacity-90">Continue Making a Difference</p>
              <div className="mt-8 text-sm bg-white/20 rounded-lg p-4">
                <p className="mb-2">📊 <strong>10,247</strong> Issues Resolved</p>
                <p>🏆 Making cities better, one report at a time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 flex items-center">
          <Card className="border-0 shadow-none w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">Sign In</CardTitle>
              <CardDescription className="text-lg">
                Access your civic dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Login As</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={accountType === 'user' ? 'default' : 'outline'}
                    onClick={() => setAccountType('user')}
                    className="flex-1"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Citizen
                  </Button>
                  <Button
                    type="button"
                    variant={accountType === 'admin' ? 'civic' : 'outline'}
                    onClick={() => setAccountType('admin')}
                    className="flex-1"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-input" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full" variant="hero" size="lg" disabled={loading}>
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <Separator />

              <div className="text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => navigate('/signup')}
                    className="text-primary hover:underline font-medium"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;