import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Mail, Phone, Shield, User } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";
import { useAuth } from "@/hooks/useAuth";

const SignupPage = () => {
  const [signupType, setSignupType] = useState<'email' | 'aadhaar'>('email');
  const [accountType, setAccountType] = useState<'user' | 'admin'>('user');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    const { error } = await signUp(email, password, {
      first_name: firstName,
      last_name: lastName,
      role: accountType
    });
    
    if (!error) {
      navigate('/login');
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
              <h1 className="text-4xl font-bold mb-4">🏛️ Civic Issues App</h1>
              <p className="text-xl opacity-90">Empowering Citizens, Building Better Cities</p>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3">
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <p>Secure & Trusted</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <Phone className="h-6 w-6 mx-auto mb-2" />
                  <p>Quick Reporting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 p-8">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of citizens making a difference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Account Type</Label>
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

              {/* Signup Method Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Sign Up Method</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant={signupType === 'email' ? 'default' : 'outline'}
                    onClick={() => setSignupType('email')}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={signupType === 'aadhaar' ? 'secondary' : 'outline'}
                    onClick={() => setSignupType('aadhaar')}
                    className="flex-1"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Aadhaar
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter first name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter last name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create strong password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>

                <Button type="submit" className="w-full" variant="hero" size="lg" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <Separator />

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
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

export default SignupPage;