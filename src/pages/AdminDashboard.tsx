import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Settings, 
  Bell,
  LogOut,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  MessageSquare
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const stats = [
    { 
      title: 'Total Reports', 
      value: '1,247', 
      change: '+12%', 
      icon: FileText, 
      color: 'primary' 
    },
    { 
      title: 'Resolved', 
      value: '892', 
      change: '+8%', 
      icon: CheckCircle2, 
      color: 'success' 
    },
    { 
      title: 'In Progress', 
      value: '264', 
      change: '+15%', 
      icon: Clock, 
      color: 'warning' 
    },
    { 
      title: 'Pending', 
      value: '91', 
      change: '-5%', 
      icon: AlertCircle, 
      color: 'destructive' 
    }
  ];

  const recentReports = [
    {
      id: '1',
      type: 'Pothole',
      location: 'MG Road, Bangalore',
      priority: 'High',
      status: 'Assigned',
      time: '2 hours ago',
      reporter: 'Raj Kumar'
    },
    {
      id: '2',
      type: 'Streetlight',
      location: 'Park Street, Kolkata',
      priority: 'Medium',
      status: 'Verified',
      time: '4 hours ago',
      reporter: 'Priya Sharma'
    },
    {
      id: '3',
      type: 'Garbage',
      location: 'Anna Nagar, Chennai',
      priority: 'Low',
      status: 'Reported',
      time: '6 hours ago',
      reporter: 'Suresh Babu'
    }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'warning';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'success';
      case 'Assigned': return 'primary';
      case 'Verified': return 'secondary';
      case 'Reported': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10">
      {/* Header */}
      <header className="gradient-hero text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">🏛️ Admin Dashboard</h1>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Municipal Corporation
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-destructive">
                  3
                </Badge>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-elegant hover:shadow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                      <p className="text-sm text-success font-medium">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">📋 Recent Reports</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold">{report.type}</h4>
                          <Badge variant={getPriorityColor(report.priority) as any}>
                            {report.priority}
                          </Badge>
                          <Badge variant={getStatusColor(report.status) as any}>
                            {report.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">{report.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{report.location}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          By: {report.reporter}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>⚡ Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="civic">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Department
                </Button>
                <Button className="w-full justify-start" variant="secondary">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Live Map
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Community Feed
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>📈 This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resolution Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">89%</span>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="text-sm font-medium">2.4 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Citizen Satisfaction</span>
                  <span className="text-sm font-medium">4.7/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-medium">1,847</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chatbot Integration Placeholder */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg" 
            className="rounded-full shadow-primary animate-pulse-glow"
            variant="hero"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Admin Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;