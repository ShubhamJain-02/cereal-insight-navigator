import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GitCompare, X } from "lucide-react";

interface ComparisonModeProps {
  primaryCountry: string;
  onClose: () => void;
}

export const ComparisonMode = ({ primaryCountry, onClose }: ComparisonModeProps) => {
  const [compareCountry, setCompareCountry] = useState("AU");
  
  const countries = [
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
  ];

  const comparisonData = [
    {
      metric: "User Engagement",
      [primaryCountry]: 89.3,
      [compareCountry]: 85.7,
    },
    {
      metric: "Conversion Rate",
      [primaryCountry]: 12.5,
      [compareCountry]: 14.2,
    },
    {
      metric: "Retention Rate",
      [primaryCountry]: 78.4,
      [compareCountry]: 72.1,
    },
    {
      metric: "Satisfaction Score",
      [primaryCountry]: 4.7,
      [compareCountry]: 4.5,
    }
  ];

  const availableCountries = countries.filter(c => c.code !== primaryCountry);

  return (
    <Card className="card-analytics animate-slide-in-right">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-chart-1" />
            <CardTitle>Country Comparison</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          Comparing {primaryCountry} vs {compareCountry}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Country Selector */}
        <div className="flex gap-2 flex-wrap">
          {availableCountries.map(country => (
            <Button
              key={country.code}
              variant={compareCountry === country.code ? "default" : "outline"}
              size="sm"
              onClick={() => setCompareCountry(country.code)}
              className="text-xs"
            >
              {country.name}
            </Button>
          ))}
        </div>

        {/* Comparison Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="metric" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Bar dataKey={primaryCountry} fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
              <Bar dataKey={compareCountry} fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {primaryCountry}
            </Badge>
            <div className="text-2xl font-bold text-chart-1">Higher</div>
            <div className="text-sm text-muted-foreground">In 3/4 metrics</div>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {compareCountry}
            </Badge>
            <div className="text-2xl font-bold text-chart-2">Lower</div>
            <div className="text-sm text-muted-foreground">In 1/4 metrics</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};