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

const getAverageMetrics = (country: string) => {
  const cerealData: Record<string, Record<string, any>> = {
    UK: {
      "Cookie Crisps": { taste: 86, health: 30, filling: 80, convenience: 86, kids: 98, family: 40 },
      "Shreddies": { taste: 56, health: 98, filling: 85, convenience: 70, kids: 60, family: 90 },
    },
    AU: {
      "Breakfast Bakes": { taste: 85, health: 85, filling: 62, convenience: 95, kids: 60, family: 95 },
      "Oat slice": { taste: 75, health: 78, filling: 75, convenience: 60, kids: 70, family: 60 },
    },
    FR: {
      "Lion": { taste: 90, health: 45, filling: 60, convenience: 80, kids: 70, family: 70 },
      "Tresor": { taste: 95, health: 25, filling: 70, convenience: 85, kids: 82, family: 85 },
    },
  };

  const cereals = Object.values(cerealData[country]);
  const keys = ["taste", "health", "filling", "convenience", "kids", "family"];
  const averages: Record<string, number> = {};

  for (const key of keys) {
    const total = cereals.reduce((sum, item) => sum + item[key], 0);
    averages[key] = parseFloat((total / cereals.length).toFixed(1));
  }

  return averages;
};

export const ComparisonMode = ({ primaryCountry, onClose }: ComparisonModeProps) => {
  const [compareCountry, setCompareCountry] = useState("AU");

  const countries = [
    { code: "UK", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
  ];

  const primaryMetrics = getAverageMetrics(primaryCountry);
  const compareMetrics = getAverageMetrics(compareCountry);

  const comparisonData = Object.keys(primaryMetrics).map(metric => ({
    metric: metric.charAt(0).toUpperCase() + metric.slice(1),
    [primaryCountry]: primaryMetrics[metric],
    [compareCountry]: compareMetrics[metric],
  }));

  const availableCountries = countries.filter(c => c.code !== primaryCountry);

  const leadingMetrics = comparisonData.filter(
    item => item[primaryCountry] > item[compareCountry]
  ).length;

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
                  color: 'hsl(var(--card-foreground))',
                }}
              />
              <Bar dataKey={primaryCountry} fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
              <Bar dataKey={compareCountry} fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Strategic Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {primaryCountry}
            </Badge>
            <div className="text-lg font-bold text-chart-1">
              {leadingMetrics > 3 ? "Leads" : "Lags"}
            </div>
            <div className="text-lg text-muted-foreground">
              In {leadingMetrics}/6 key drivers
            </div>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {compareCountry}
            </Badge>
            <div className="text-lg font-bold text-chart-2">
              {6 - leadingMetrics > 3 ? "Leads" : "Lags"}
            </div>
            <div className="text-lg text-muted-foreground">
              In {6 - leadingMetrics}/6 key drivers
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
