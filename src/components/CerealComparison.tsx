import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from './ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from './ui/select';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend
} from 'recharts';
import { FlipCard } from './FlipCard';
import { GitCompare, Target } from 'lucide-react';

interface CerealComparisonProps {
  country: string;
}
type CerealMetrics = {
  taste: number;
  health: number;
  filling: number;
  packaging: number;
  kids: number;
  ingredients: number;
  family: number;
  variety: number;
  convenience: number;
};

const cerealData: Record<string, Record<string, CerealMetrics>> = {
  UK: {
    "Cookie Crisp": {
      taste: 86, health: 30, filling: 80, packaging: 70, kids: 98,
      ingredients: 40, family: 40, variety: 70, convenience: 86
    },
    "Shreddies": {
      taste: 56, health: 98, filling: 85, packaging: 81, kids: 60,
      ingredients: 87, family: 90, variety: 50, convenience: 70
    },
  },
  AU: {
    "Breakfast Bakes": {
      taste: 85, health: 85, filling: 62, packaging: 70, kids: 60,
      ingredients: 87, family: 95, variety: 55, convenience: 95
    },
    "Oat slice": {
      taste: 75, health: 78, filling: 75, packaging: 85, kids: 70,
      ingredients: 85, family: 60, variety: 90, convenience: 60
    },
  },
  FR: {
    "Lion": {
      taste: 90, health: 45, filling: 60, packaging: 80, kids: 70,
      ingredients: 60, family: 70, variety: 80, convenience: 80
    },
    "Tresor": {
      taste: 95, health: 25, filling: 70, packaging: 75, kids: 82,
      ingredients: 65, family: 85, variety: 70, convenience: 85
    },
  },
};

export const CerealComparison: React.FC<CerealComparisonProps> = ({ country }) => {
  const cereals = Object.keys(cerealData[country]);

  const [cereal1, setCereal1] = useState(cereals[0]);
  const [cereal2, setCereal2] = useState(cereals[1]);
  useEffect(() => {
    const cereals = Object.keys(cerealData[country]);
    setCereal1(cereals[0]);
    setCereal2(cereals[1] ?? cereals[0]);
  }, [country]);

  const getComparisonData = () => {
  const data1 = cerealData[country]?.[cereal1];
  const data2 = cerealData[country]?.[cereal2];

  if (!data1 || !data2) return [];

  return Object.keys(data1).map((key) => ({
    metric: key.charAt(0).toUpperCase() + key.slice(1),
    cereal1: data1[key as keyof typeof data1],
    cereal2: data2[key as keyof typeof data2],
    fullMark: 100,
  }));
};


  const getWinner = () => {
  const data1 = cerealData[country]?.[cereal1];
  const data2 = cerealData[country]?.[cereal2];

  if (!data1 || !data2) return "N/A";

  const total1 = Object.values(data1).reduce((sum, val) => sum + val, 0);
  const total2 = Object.values(data2).reduce((sum, val) => sum + val, 0);

  return total1 > total2 ? cereal1 : cereal2;
};


 const getTopMetric = () => {
  const comparisonData = getComparisonData();
  if (comparisonData.length === 0) {
    return { metric: "N/A", leader: "N/A", difference: 0 };
  }

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
                  {cereals.filter(option => option !== cereal2).map((cereal) => (
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
                  {cereals.filter(option => option !== cereal1).map((cereal) => (
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
                <PolarGrid stroke="#aeaeae" strokeWidth={2} />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{
                    fill: 'hsl(var(--foreground))',
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{
                    fill: 'black',
                    fontSize: 10,
                    fontWeight:500
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