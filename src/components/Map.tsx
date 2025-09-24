import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapProps {
  complaints?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    category: string;
    status: string;
  }>;
  onLocationSelect?: (location: { latitude: number; longitude: number; address: string }) => void;
}

const Map: React.FC<MapProps> = ({ complaints = [], onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const { toast } = useToast();

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.2090, 28.6139], // Delhi, India
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });

    map.current.addControl(geolocate, 'top-right');

    // Click event for location selection
    if (onLocationSelect) {
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        
        // Reverse geocoding to get address
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
          );
          const data = await response.json();
          const address = data.features[0]?.place_name || `${lat}, ${lng}`;
          
          onLocationSelect({
            latitude: lat,
            longitude: lng,
            address
          });
        } catch (error) {
          console.error('Geocoding error:', error);
          onLocationSelect({
            latitude: lat,
            longitude: lng,
            address: `${lat}, ${lng}`
          });
        }
      });
    }
  };

  const addComplaintMarkers = () => {
    if (!map.current) return;

    complaints.forEach((complaint) => {
      const el = document.createElement('div');
      el.className = 'complaint-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      
      // Color based on status
      switch (complaint.status) {
        case 'resolved':
          el.style.backgroundColor = '#22c55e';
          break;
        case 'in_progress':
          el.style.backgroundColor = '#f59e0b';
          break;
        default:
          el.style.backgroundColor = '#ef4444';
      }

      new mapboxgl.Marker(el)
        .setLngLat([complaint.longitude, complaint.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div>
                <h3 style="margin: 0 0 8px 0; font-weight: bold;">${complaint.title}</h3>
                <p style="margin: 0 0 4px 0; color: #666;">Category: ${complaint.category}</p>
                <p style="margin: 0; color: #666;">Status: ${complaint.status}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
  }, [mapboxToken]);

  useEffect(() => {
    if (map.current && complaints.length > 0) {
      addComplaintMarkers();
    }
  }, [complaints, mapboxToken]);

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      toast({
        title: "Map loaded",
        description: "Mapbox map has been initialized successfully.",
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (map.current) {
            map.current.flyTo({ center: [longitude, latitude], zoom: 15 });
          }
          if (onLocationSelect) {
            onLocationSelect({ latitude, longitude, address: `${latitude}, ${longitude}` });
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your current location.",
            variant: "destructive",
          });
        }
      );
    }
  };

  if (!mapboxToken) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Setup Map</h3>
        <p className="text-muted-foreground mb-4">
          Enter your Mapbox public token to enable the map feature
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Enter Mapbox public token"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <Button onClick={handleTokenSubmit}>Load Map</Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Get your token from{' '}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {onLocationSelect && (
        <Button
          onClick={getCurrentLocation}
          className="absolute top-4 left-4 z-10"
          size="sm"
          variant="secondary"
        >
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      )}
    </div>
  );
};

export default Map;