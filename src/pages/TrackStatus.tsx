import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, MapPin, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  priority: string;
  location: string;
  created_at: string;
  updated_at: string;
  image_url?: string;
}

const TrackStatus = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error: any) {
      console.error('Error fetching complaints:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your complaints.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;

    if (searchTerm) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    setFilteredComplaints(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'verified':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'verified':
        return 50;
      case 'in_progress':
        return 75;
      case 'resolved':
        return 100;
      default:
        return 0;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your complaints...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/welcome')} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-primary ml-4">Track Status</h1>
        </div>

        {/* Filters */}
        <Card className="shadow-elegant mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('in_progress')}
                  size="sm"
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('resolved')}
                  size="sm"
                >
                  Resolved
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{complaints.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {complaints.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {complaints.filter(c => c.status === 'in_progress').length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card className="shadow-elegant">
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No complaints match your filters.' 
                    : 'You haven\'t reported any issues yet.'
                  }
                </div>
                {!searchTerm && statusFilter === 'all' && (
                  <Button 
                    onClick={() => navigate('/report')} 
                    variant="hero" 
                    className="mt-4"
                  >
                    Report Your First Issue
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="shadow-elegant hover:shadow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold">{complaint.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant={getStatusColor(complaint.status)}>
                            {complaint.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant={getPriorityColor(complaint.priority)}>
                            {complaint.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(complaint.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {complaint.location}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${getStatusProgress(complaint.status)}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{complaint.category}</Badge>
                        <div className="text-sm text-muted-foreground">
                          Updated: {formatDate(complaint.updated_at)}
                        </div>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {complaint.image_url && (
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={`${supabase.storage.from('complaint-images').getPublicUrl(complaint.image_url).data.publicUrl}`}
                          alt="Complaint evidence"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackStatus;