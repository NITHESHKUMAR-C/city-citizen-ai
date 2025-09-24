import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  FileText,
  Languages,
  LogOut,
  Settings,
  Bell,
  ChevronRight
} from "lucide-react";

const WelcomePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigate = useNavigate();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  const issueTypes = [
    { id: 'potholes', name: 'Potholes', icon: '🕳️', color: 'destructive' },
    { id: 'garbage', name: 'Garbage', icon: '🗑️', color: 'warning' },
    { id: 'streetlights', name: 'Street Lights', icon: '💡', color: 'secondary' },
    { id: 'drainage', name: 'Drainage', icon: '🌊', color: 'primary' }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10">
      {/* Header */}
      <header className="gradient-hero text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">🏛️ Civic Issues App</h1>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Citizen Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Welcome to Civic Issues App! 🙏
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Your voice matters. Together, we build better cities.
          </p>
          
          {/* Language Selection */}
          <Card className="max-w-2xl mx-auto shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Choose Your Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.name ? 'default' : 'outline'}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className="text-center p-3 h-auto flex-col"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm opacity-80">{lang.nativeName}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Report Issue Card */}
          <Card className="shadow-elegant hover:shadow-primary transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <CardTitle className="text-2xl text-center group-hover:text-primary transition-colors">
                📸 Report Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Take a photo or video to report civic issues instantly
              </p>
              <Button className="w-full" variant="hero" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Start Reporting
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                {issueTypes.map((type) => (
                  <Badge 
                    key={type.id} 
                    variant="outline" 
                    className="justify-center p-2 text-xs"
                  >
                    {type.icon} {type.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Track Issues Card */}
          <Card className="shadow-elegant hover:shadow-secondary transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <CardTitle className="text-2xl text-center group-hover:text-secondary transition-colors">
                📊 Track Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Monitor the progress of your reported issues
              </p>
              <Button className="w-full" variant="secondary" size="lg">
                <Clock className="h-5 w-5 mr-2" />
                View My Reports
              </Button>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reported</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress</span>
                  <Badge variant="secondary">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resolved</span>
                  <Badge variant="outline">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Card */}
          <Card className="shadow-elegant hover:shadow-destructive transition-all duration-300 cursor-pointer group border-destructive/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center group-hover:text-destructive transition-colors">
                🚨 Emergency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Report urgent issues requiring immediate attention
              </p>
              <Button className="w-full" variant="destructive" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Report
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Available 24/7 for critical issues
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🌟 App Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Auto Location</h3>
                <p className="text-sm text-muted-foreground">GPS-powered location tagging</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 text-secondary" />
                <h3 className="font-semibold mb-2">Voice Reports</h3>
                <p className="text-sm text-muted-foreground">Record voice complaints easily</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <FileText className="h-8 w-8 mx-auto mb-3 text-navy" />
                <h3 className="font-semibold mb-2">AI Verification</h3>
                <p className="text-sm text-muted-foreground">Smart image verification</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <Bell className="h-8 w-8 mx-auto mb-3 text-warning" />
                <h3 className="font-semibold mb-2">Live Updates</h3>
                <p className="text-sm text-muted-foreground">Real-time status notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chatbot Integration Placeholder */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg" 
            className="rounded-full shadow-primary animate-pulse-glow"
            variant="hero"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;