import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { FlipCard } from './FlipCard';
import { GitCompare, TrendingUp, Award, Target } from 'lucide-react';

interface CerealComparisonProps {
  country: string;
}

const cerealData = {
  "Crunchy Oats Premium": {
    taste: 85,
    nutrition: 78,
    price: 65,
    packaging: 82,
    availability: 90,
    satisfaction: 87
  },
  "Healthy Granola Blend": {
    taste: 79,
    nutrition: 92,
    price: 58,
    packaging: 75,
    availability: 85,
    satisfaction: 83
  },
  "Morning Crunch Classic": {
    taste: 88,
    nutrition: 65,
    price: 85,
    packaging: 78,
    availability: 95,
    satisfaction: 81
  },
  "Fiber Rich Flakes": {
    taste: 72,
    nutrition: 95,
    price: 72,
    packaging: 70,
    availability: 88,
    satisfaction: 79
  }
};

export const CerealComparison: React.FC<CerealComparisonProps> = ({ country }) => {
  const [cereal1, setCereal1] = useState("Crunchy Oats Premium");
  const [cereal2, setCereal2] = useState("Healthy Granola Blend");

  const cerealOptions = Object.keys(cerealData);

  const getComparisonData = () => {
    const data1 = cerealData[cereal1 as keyof typeof cerealData];
    const data2 = cerealData[cereal2 as keyof typeof cerealData];

    return [
      { metric: 'Taste', cereal1: data1.taste, cereal2: data2.taste, fullMark: 100 },
      { metric: 'Nutrition', cereal1: data1.nutrition, cereal2: data2.nutrition, fullMark: 100 },
      { metric: 'Price Value', cereal1: data1.price, cereal2: data2.price, fullMark: 100 },
      { metric: 'Packaging', cereal1: data1.packaging, cereal2: data2.packaging, fullMark: 100 },
      { metric: 'Availability', cereal1: data1.availability, cereal2: data2.availability, fullMark: 100 },
      { metric: 'Satisfaction', cereal1: data1.satisfaction, cereal2: data2.satisfaction, fullMark: 100 }
    ];
  };

  const getWinner = () => {
    const data1 = cerealData[cereal1 as keyof typeof cerealData];
    const data2 = cerealData[cereal2 as keyof typeof cerealData];
    
    const total1 = Object.values(data1).reduce((sum, val) => sum + val, 0);
    const total2 = Object.values(data2).reduce((sum, val) => sum + val, 0);
    
    return total1 > total2 ? cereal1 : cereal2;
  };

  const getTopMetric = () => {
    const comparisonData = getComparisonData();
    let maxDiff = 0;
    let topMetric = '';
    let leader = '';

    comparisonData.forEach(item => {
      const diff = Math.abs(item.cereal1 - item.cereal2);
      if (diff > maxDiff) {
        maxDiff = diff;
        topMetric = item.metric;
        leader = item.cereal1 > item.cereal2 ? cereal1 : cereal2;
      }
    });

    return { metric: topMetric, leader, difference: maxDiff };
  };

  const winner = getWinner();
  const topMetric = getTopMetric();

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-chart-5/20">
            <GitCompare className="w-8 h-8 text-chart-5" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Cereal Head-to-Head Comparison</h2>
            <p className="text-muted-foreground">Direct performance analysis across key metrics</p>
          </div>
        </div>
      </div>

      {/* Cereal Selection */}
      <Card className="bg-gradient-to-br from-card/80 to-muted/20 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Select Products to Compare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Product A</label>
              <Select value={cereal1} onValueChange={setCereal1}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cerealOptions.filter(option => option !== cereal2).map((cereal) => (
                    <SelectItem key={cereal} value={cereal}>{cereal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Product B</label>
              <Select value={cereal2} onValueChange={setCereal2}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cerealOptions.filter(option => option !== cereal1).map((cereal) => (
                    <SelectItem key={cereal} value={cereal}>{cereal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart Comparison */}
      <Card className="bg-gradient-to-br from-card/80 to-muted/20 border-primary/20">
        <CardHeader>
          <CardTitle>Performance Radar Analysis</CardTitle>
          <CardDescription>
            Comprehensive comparison across all performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={getComparisonData()}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ 
                    fill: 'hsl(var(--foreground))', 
                    fontSize: 12,
                    fontWeight: 500
                  }} 
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ 
                    fill: 'hsl(var(--muted-foreground))', 
                    fontSize: 10 
                  }}
                />
                <Radar
                  name={cereal1}
                  dataKey="cereal1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Radar
                  name={cereal2}
                  dataKey="cereal2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FlipCard
          insight={{
            title: "Overall Winner",
            content: `${winner} leads in ${country}. ${winner} scores higher across multiple metrics, showing stronger overall market performance with superior customer satisfaction and value proposition.`,
            metrics: [`Winner: ${winner}`, `Market: ${country}`, `Performance: Superior`]
          }}
        />
        
        <FlipCard
          insight={{
            title: "Key Differentiator",
            content: `${topMetric.metric}: ${topMetric.leader} leads by ${topMetric.difference} points. ${topMetric.leader} has a significant advantage in ${topMetric.metric.toLowerCase()}, creating a ${topMetric.difference}-point gap that drives consumer preference.`,
            metrics: [`Metric: ${topMetric.metric}`, `Leader: ${topMetric.leader}`, `Gap: ${topMetric.difference} points`]
          }}
        />
        
        <FlipCard
          insight={{
            title: "Strategic Recommendation",
            content: `Focus on ${topMetric.metric.toLowerCase()} improvements. The losing brand should prioritize ${topMetric.metric.toLowerCase()} enhancements while maintaining strengths in other areas to close the competitive gap.`,
            metrics: [`Focus: ${topMetric.metric}`, `Strategy: Enhancement`, `Goal: Close gap`]
          }}
        />
      </div>
    </section>
  );
};