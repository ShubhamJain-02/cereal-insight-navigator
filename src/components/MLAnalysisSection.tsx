import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";

const elbowData = {
  UK: [
    { k: 1, wcss: 1500 },
    { k: 2, wcss: 800 },
    { k: 3, wcss: 450 },
    { k: 4, wcss: 320 },
    { k: 5, wcss: 280 },
    { k: 6, wcss: 260 },
    { k: 7, wcss: 250 },
    { k: 8, wcss: 245 }
  ],
  AU: [
    { k: 1, wcss: 1400 },
    { k: 2, wcss: 750 },
    { k: 3, wcss: 420 },
    { k: 4, wcss: 300 },
    { k: 5, wcss: 270 },
    { k: 6, wcss: 255 },
    { k: 7, wcss: 248 },
    { k: 8, wcss: 244 }
  ],
  PL: [
    { k: 1, wcss: 1200 },
    { k: 2, wcss: 680 },
    { k: 3, wcss: 390 },
    { k: 4, wcss: 280 },
    { k: 5, wcss: 250 },
    { k: 6, wcss: 235 },
    { k: 7, wcss: 228 },
    { k: 8, wcss: 225 }
  ],
  FR: [
    { k: 1, wcss: 1350 },
    { k: 2, wcss: 720 },
    { k: 3, wcss: 410 },
    { k: 4, wcss: 295 },
    { k: 5, wcss: 265 },
    { k: 6, vcss: 248 },
    { k: 7, wcss: 240 },
    { k: 8, wcss: 237 }
  ]
};

const silhouetteData = {
  UK: [
    { k: 2, score: 0.65 },
    { k: 3, score: 0.78 },
    { k: 4, score: 0.82 },
    { k: 5, score: 0.75 },
    { k: 6, score: 0.68 },
    { k: 7, score: 0.62 },
    { k: 8, score: 0.58 }
  ],
  AU: [
    { k: 2, score: 0.62 },
    { k: 3, score: 0.75 },
    { k: 4, score: 0.80 },
    { k: 5, score: 0.73 },
    { k: 6, score: 0.66 },
    { k: 7, score: 0.60 },
    { k: 8, score: 0.56 }
  ],
  PL: [
    { k: 2, score: 0.68 },
    { k: 3, score: 0.79 },
    { k: 4, score: 0.84 },
    { k: 5, score: 0.77 },
    { k: 6, score: 0.70 },
    { k: 7, score: 0.64 },
    { k: 8, score: 0.59 }
  ],
  FR: [
    { k: 2, score: 0.64 },
    { k: 3, score: 0.76 },
    { k: 4, score: 0.81 },
    { k: 5, score: 0.74 },
    { k: 6, score: 0.67 },
    { k: 7, score: 0.61 },
    { k: 8, score: 0.57 }
  ]
};

const clusterData = {
  UK: [
    { x: 2.3, y: 4.1, cluster: 0 },
    { x: 2.8, y: 4.5, cluster: 0 },
    { x: 3.1, y: 3.9, cluster: 0 },
    { x: 5.2, y: 6.8, cluster: 1 },
    { x: 5.8, y: 7.2, cluster: 1 },
    { x: 6.1, y: 6.5, cluster: 1 },
    { x: 8.5, y: 2.1, cluster: 2 },
    { x: 8.9, y: 2.8, cluster: 2 },
    { x: 9.2, y: 2.4, cluster: 2 },
    { x: 4.2, y: 8.9, cluster: 3 },
    { x: 4.8, y: 9.5, cluster: 3 },
    { x: 5.1, y: 8.7, cluster: 3 }
  ],
  AU: [
    { x: 2.1, y: 4.3, cluster: 0 },
    { x: 2.9, y: 4.8, cluster: 0 },
    { x: 3.3, y: 4.1, cluster: 0 },
    { x: 5.4, y: 6.9, cluster: 1 },
    { x: 5.9, y: 7.4, cluster: 1 },
    { x: 6.3, y: 6.7, cluster: 1 },
    { x: 8.2, y: 2.3, cluster: 2 },
    { x: 8.7, y: 2.9, cluster: 2 },
    { x: 9.1, y: 2.6, cluster: 2 },
    { x: 4.1, y: 9.1, cluster: 3 },
    { x: 4.7, y: 9.6, cluster: 3 },
    { x: 5.2, y: 8.9, cluster: 3 }
  ],
  PL: [
    { x: 2.5, y: 4.2, cluster: 0 },
    { x: 3.0, y: 4.6, cluster: 0 },
    { x: 3.4, y: 4.0, cluster: 0 },
    { x: 5.1, y: 6.7, cluster: 1 },
    { x: 5.7, y: 7.1, cluster: 1 },
    { x: 6.0, y: 6.4, cluster: 1 },
    { x: 8.3, y: 2.2, cluster: 2 },
    { x: 8.8, y: 2.7, cluster: 2 },
    { x: 9.0, y: 2.5, cluster: 2 },
    { x: 4.3, y: 8.8, cluster: 3 },
    { x: 4.9, y: 9.3, cluster: 3 },
    { x: 5.3, y: 8.6, cluster: 3 }
  ],
  FR: [
    { x: 2.2, y: 4.4, cluster: 0 },
    { x: 2.7, y: 4.7, cluster: 0 },
    { x: 3.2, y: 4.2, cluster: 0 },
    { x: 5.3, y: 6.6, cluster: 1 },
    { x: 5.6, y: 7.0, cluster: 1 },
    { x: 6.2, y: 6.8, cluster: 1 },
    { x: 8.4, y: 2.0, cluster: 2 },
    { x: 8.6, y: 2.6, cluster: 2 },
    { x: 9.3, y: 2.3, cluster: 2 },
    { x: 4.0, y: 9.0, cluster: 3 },
    { x: 4.6, y: 9.4, cluster: 3 },
    { x: 5.0, y: 8.8, cluster: 3 }
  ]
};

const CLUSTER_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

interface MLAnalysisSectionProps {
  country: string;
}

export const MLAnalysisSection = ({ country }: MLAnalysisSectionProps) => {
  const countryElbowData = elbowData[country as keyof typeof elbowData] || elbowData.UK;
  const countrySilhouetteData = silhouetteData[country as keyof typeof silhouetteData] || silhouetteData.UK;
  const countryClusterData = clusterData[country as keyof typeof clusterData] || clusterData.UK;

  const optimalK = countrySilhouetteData.reduce((max, curr) => curr.score > max.score ? curr : max, countrySilhouetteData[0]);

  const mlInsight = {
    title: "Machine Learning Insights",
    content: `Advanced clustering analysis reveals ${optimalK.k} distinct consumer segments in ${country}. The model shows strong cluster separation with high silhouette scores, indicating well-defined consumer preferences.`,
    metrics: [
      `Optimal Clusters: ${optimalK.k}`,
      `Best Silhouette Score: ${optimalK.score.toFixed(3)}`,
      `Model Accuracy: ${(optimalK.score * 100).toFixed(1)}%`,
      `Segments Identified: Premium, Budget, Health-focused, Family`
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Elbow Method Chart */}
      <Card className="card-analytics col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-chart-1">Elbow Method</CardTitle>
          <CardDescription>Optimal cluster determination</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={countryElbowData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="k" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
              <Line 
                type="monotone" 
                dataKey="wcss" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Silhouette Score Chart */}
      <Card className="card-analytics col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-chart-2">Silhouette Analysis</CardTitle>
          <CardDescription>Cluster quality assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={countrySilhouetteData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="k" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
              <Bar dataKey="score" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cluster Plot */}
      <Card className="card-analytics col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-chart-3">Cluster Plot</CardTitle>
          <CardDescription>Consumer segment visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={countryClusterData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Feature 1"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Feature 2"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              {[0, 1, 2, 3].map((cluster) => (
                <Scatter
                  key={cluster}
                  data={countryClusterData.filter(d => d.cluster === cluster)}
                  fill={CLUSTER_COLORS[cluster]}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ML Insights Flip Card */}
      <div className="col-span-1">
        <FlipCard insight={mlInsight} />
      </div>
    </div>
  );
};