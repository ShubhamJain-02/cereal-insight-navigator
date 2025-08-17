import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, Globe, Zap } from 'lucide-react';

interface CountryMapProps {
  selectedCountry: string;
  onCountrySelect: (country: string) => void;
}

const countryCoordinates = {
  UK: [-3.435973, 55.378051],
  Australia: [133.7751, -25.2744],
  Poland: [19.1343, 51.9194],
  France: [2.2137, 46.2276]
} as const;

const CountryMap: React.FC<CountryMapProps> = ({ selectedCountry, onCountrySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    setIsLoading(true);
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe' as any,
        zoom: 1.8,
        center: [20, 40],
        pitch: 30,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'hsl(var(--background))',
          'high-color': 'hsl(var(--muted))',
          'horizon-blend': 0.3,
        });

        // Add markers for each country
        Object.entries(countryCoordinates).forEach(([country, coordinates]) => {
          const marker = new mapboxgl.Marker({
            color: country === selectedCountry ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
            scale: country === selectedCountry ? 1.2 : 0.8,
          })
            .setLngLat(coordinates as [number, number])
            .addTo(map.current!);

          marker.getElement().addEventListener('click', () => {
            onCountrySelect(country);
            // Fly to selected country
            map.current?.flyTo({
              center: coordinates as [number, number],
              zoom: 4,
              pitch: 45,
              duration: 2000
            });
          });

          // Add popup with country info
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2 text-center">
                <h3 class="font-bold text-foreground">${country}</h3>
                <p class="text-sm text-muted-foreground">Click to analyze</p>
              </div>
            `);
          
          marker.setPopup(popup);
        });

        setIsLoading(false);
      });

      // Auto-rotate globe
      let userInteracting = false;
      const secondsPerRevolution = 180;

      function spinGlobe() {
        if (!map.current || userInteracting) return;
        
        const zoom = map.current.getZoom();
        if (zoom < 3) {
          const center = map.current.getCenter();
          center.lng -= 360 / secondsPerRevolution;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      map.current.on('mousedown', () => { userInteracting = true; });
      map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
      map.current.on('moveend', spinGlobe);

      spinGlobe();

    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update marker colors when selected country changes
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers and re-add them with updated colors
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    // Re-add markers with updated styling
    Object.entries(countryCoordinates).forEach(([country, coordinates]) => {
      const marker = new mapboxgl.Marker({
        color: country === selectedCountry ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        scale: country === selectedCountry ? 1.2 : 0.8,
      })
        .setLngLat(coordinates as [number, number])
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        onCountrySelect(country);
      });
    });
  }, [selectedCountry]);

  if (showTokenInput) {
    return (
      <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-card/50 to-muted/20 border-primary/20">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-primary/20">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Interactive World Map</h3>
        </div>
        
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-muted-foreground">
            To display the interactive map, please add your Mapbox public token to Supabase Edge Function Secrets, 
            or enter it below temporarily.
          </p>
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-center"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (mapboxToken) {
                    setShowTokenInput(false);
                    initializeMap();
                  }
                }}
                disabled={!mapboxToken || isLoading}
                className="flex-1"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isLoading ? 'Loading Map...' : 'Initialize Map'}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Get your token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a></p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card/80 to-muted/20 border-primary/20">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/20">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Global Analytics Map</h3>
              <p className="text-sm text-muted-foreground">Click countries to analyze markets</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTokenInput(true)}
          >
            Reset Map
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={mapContainer} 
          className="h-96 w-full bg-gradient-to-br from-muted/20 to-background/40" 
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading interactive map...</span>
            </div>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <span className="font-medium">Selected: {selectedCountry}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountryMap;