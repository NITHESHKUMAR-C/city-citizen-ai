import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CameraCapture from '@/components/CameraCapture';
import VoiceRecorder from '@/components/VoiceRecorder';
import Map from '@/components/Map';

const ReportIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [voiceRecording, setVoiceRecording] = useState<Blob | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = [
    { id: 'potholes', name: 'Potholes', icon: '🕳️' },
    { id: 'garbage', name: 'Garbage', icon: '🗑️' },
    { id: 'streetlights', name: 'Street Lights', icon: '💡' },
    { id: 'drainage', name: 'Drainage', icon: '🌊' },
    { id: 'water_supply', name: 'Water Supply', icon: '💧' },
    { id: 'sewage', name: 'Sewage', icon: '🚽' },
    { id: 'road_damage', name: 'Road Damage', icon: '🛣️' },
    { id: 'other', name: 'Other', icon: '📝' }
  ];

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const handleVoiceRecording = (audioBlob: Blob) => {
    setVoiceRecording(audioBlob);
  };

  const handleLocationSelect = (loc: { latitude: number; longitude: number; address: string }) => {
    setLocation(loc);
  };

  const uploadFile = async (file: File | Blob, bucket: string, fileName: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${user?.id}/${fileName}`, file);
    
    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      let imageUrl = null;
      let voiceUrl = null;

      // Upload image if captured
      if (capturedImage) {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const fileName = `image_${Date.now()}.jpg`;
        await uploadFile(blob, 'complaint-images', fileName);
        imageUrl = `${user.id}/${fileName}`;
      }

      // Upload voice recording if recorded
      if (voiceRecording) {
        const fileName = `voice_${Date.now()}.webm`;
        await uploadFile(voiceRecording, 'complaint-images', fileName);
        voiceUrl = `${user.id}/${fileName}`;
      }

      // Create complaint
      const { error } = await supabase
        .from('complaints')
        .insert({
          user_id: user.id,
          title,
          description,
          category,
          priority,
          image_url: imageUrl,
          voice_url: voiceUrl,
          latitude: location?.latitude,
          longitude: location?.longitude,
          location: location?.address || 'Location not provided',
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully and will be reviewed soon.",
      });

      navigate('/welcome');
    } catch (error: any) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyCall = () => {
    // In a real app, this would trigger emergency protocols
    toast({
      title: "Emergency Alert",
      description: "Emergency services have been notified. Help is on the way.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/welcome')} variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-primary ml-4">Report Issue</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🔴 High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide detailed description of the issue"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" variant="hero" disabled={loading}>
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? 'Submitting...' : 'Submit Report'}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleEmergencyCall}
                      variant="destructive"
                      size="lg"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Voice Recording */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Voice Message (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
                {voiceRecording && (
                  <Badge variant="secondary" className="mt-2">
                    Voice message recorded
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Media and Location Section */}
          <div className="space-y-6">
            {/* Camera */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Photo Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                {!showCamera && !capturedImage && (
                  <Button onClick={() => setShowCamera(true)} variant="hero" size="lg" className="w-full">
                    Take Photo
                  </Button>
                )}
                
                {showCamera && (
                  <CameraCapture
                    onCapture={handleImageCapture}
                    onClose={() => setShowCamera(false)}
                  />
                )}
                
                {capturedImage && (
                  <div className="space-y-4">
                    <img
                      src={capturedImage}
                      alt="Captured evidence"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Badge variant="secondary">Photo captured</Badge>
                      <Button
                        onClick={() => {
                          setCapturedImage(null);
                          setShowCamera(true);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Retake
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <Map onLocationSelect={handleLocationSelect} />
                {location && (
                  <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Selected Location:</p>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;