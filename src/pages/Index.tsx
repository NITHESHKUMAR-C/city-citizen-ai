import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Shield, Users, BarChart3, Camera, MapPin } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "Quick Reporting",
      description: "Report issues with photos and videos instantly"
    },
    {
      icon: MapPin,
      title: "Auto Location",
      description: "GPS-powered location tagging for accurate reports"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Citizens and officials working together for better cities"
    },
    {
      icon: BarChart3,
      title: "Real-time Tracking", 
      description: "Monitor progress from report to resolution"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Civic Issues App Hero" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 gradient-hero opacity-85"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            🏛️ Civic Issues App
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Empowering Citizens, Building Better Cities Together
          </p>
          <p className="text-lg mb-12 opacity-80 max-w-xl mx-auto">
            Report civic issues instantly, track progress in real-time, and be part of the solution for a smarter, cleaner India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-6 min-w-[200px]"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-6 min-w-[200px] bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm opacity-90">Issues Resolved</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Cities Connected</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm opacity-90">Active Citizens</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-sm opacity-90">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              🌟 Powerful Features for Smart Cities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to report, track, and resolve civic issues efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-primary transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make a Difference? 🚀
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of citizens who are already making their cities better, one report at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-6 min-w-[200px]"
            >
              <Users className="h-5 w-5 mr-2" />
              Join as Citizen
            </Button>
            <Button 
              size="lg" 
              variant="civic"
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-6 min-w-[200px]"
            >
              <Shield className="h-5 w-5 mr-2" />
              Admin Access
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
