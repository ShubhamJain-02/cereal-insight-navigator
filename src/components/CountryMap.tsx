import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Globe, Zap, TrendingUp, Users, BarChart3 } from 'lucide-react';

interface CountryMapProps {
  selectedCountry: string;
  onCountrySelect: (country: string) => void;
}

const countryData = {
  UK: {
    coordinates: [-3.435973, 55.378051],
    marketSize: 85,
    growth: 12,
    satisfaction: 78,
    demographic: 'Millennials',
    color: '#3b82f6'
  },
  Australia: {
    coordinates: [133.7751, -25.2744],
    marketSize: 92,
    growth: 8,
    satisfaction: 82,
    demographic: 'Gen Z',
    color: '#10b981'
  },
  France: {
    coordinates: [2.2137, 46.2276],
    marketSize: 79,
    growth: 6,
    satisfaction: 85,
    demographic: 'Baby Boomers',
    color: '#ef4444'
  }
} as const;

type MetricType = 'marketSize' | 'growth' | 'satisfaction';

const CountryMap: React.FC<CountryMapProps> = ({ selectedCountry, onCountrySelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('marketSize');

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

        // Add markers for each country with comparative data
        Object.entries(countryData).forEach(([country, data]) => {
          const metricValue = data[selectedMetric];
          const normalizedSize = 0.8 + (metricValue / 100) * 0.8; // Scale between 0.8 and 1.6
          
          const marker = new mapboxgl.Marker({
            color: country === selectedCountry ? data.color : `${data.color}80`,
            scale: country === selectedCountry ? normalizedSize * 1.3 : normalizedSize,
          })
            .setLngLat(data.coordinates as [number, number])
            .addTo(map.current!);

          marker.getElement().addEventListener('click', () => {
            onCountrySelect(country);
            // Fly to selected country
            map.current?.flyTo({
              center: data.coordinates as [number, number],
              zoom: 4,
              pitch: 45,
              duration: 2000
            });
          });

          // Add detailed popup with comparative metrics
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-4 space-y-2 min-w-48">
                <h3 class="font-bold text-lg text-foreground">${country}</h3>
                <div class="space-y-1">
                  <div class="flex justify-between">
                    <span class="text-sm text-muted-foreground">Market Size:</span>
                    <span class="text-sm font-medium">${data.marketSize}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-muted-foreground">Growth Rate:</span>
                    <span class="text-sm font-medium text-green-600">+${data.growth}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-muted-foreground">Satisfaction:</span>
                    <span class="text-sm font-medium">${data.satisfaction}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-muted-foreground">Key Demo:</span>
                    <span class="text-sm font-medium">${data.demographic}</span>
                  </div>
                </div>
                <p class="text-xs text-muted-foreground mt-2">Click to analyze</p>
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

    // Re-add markers with updated styling and metrics
    Object.entries(countryData).forEach(([country, data]) => {
      const metricValue = data[selectedMetric];
      const normalizedSize = 0.8 + (metricValue / 100) * 0.8;
      
      const marker = new mapboxgl.Marker({
        color: country === selectedCountry ? data.color : `${data.color}80`,
        scale: country === selectedCountry ? normalizedSize * 1.3 : normalizedSize,
      })
        .setLngLat(data.coordinates as [number, number])
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        onCountrySelect(country);
      });
    });
  }, [selectedCountry, selectedMetric]);

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
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Comparative Analysis Map</h3>
                <p className="text-sm text-muted-foreground">Visual comparison across markets</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedMetric} onValueChange={(value: MetricType) => setSelectedMetric(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketSize">Market Size</SelectItem>
                  <SelectItem value="growth">Growth Rate</SelectItem>
                  <SelectItem value="satisfaction">Satisfaction</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTokenInput(true)}
              >
                Reset Map
              </Button>
            </div>
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
        
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border/50 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: countryData[selectedCountry as keyof typeof countryData]?.color}}></div>
            <span className="font-medium">Selected: {selectedCountry}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Market Size: {countryData[selectedCountry as keyof typeof countryData]?.marketSize}%</div>
            <div>Growth: +{countryData[selectedCountry as keyof typeof countryData]?.growth}%</div>
            <div>Satisfaction: {countryData[selectedCountry as keyof typeof countryData]?.satisfaction}%</div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="font-medium mb-2">Legend ({selectedMetric})</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-1"></div>
              <span>High (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-2"></div>
              <span>Medium (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-3"></div>
              <span>Low (0-60%)</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountryMap;