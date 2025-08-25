import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";

const elbowData = {
  UK: [
    { k: 1, wcss: 1500 },
    { k: 2, wcss: 800 },
    { k: 3, wcss: 450 },
    { k: 4, wcss: 320 }
  ],
  AU: [
    { k: 1, wcss: 1400 },
    { k: 2, wcss: 750 },
    { k: 3, wcss: 420 },
    { k: 4, wcss: 300 },
    { k: 5, wcss: 270 },
    { k: 6, wcss: 255 }
  ],
  FR: [
    { k: 1, wcss: 1350 },
    { k: 2, wcss: 720 },
    { k: 3, wcss: 410 },
    { k: 4, wcss: 295 }
  ]
};

const silhouetteData = {
  UK: [
    { k: 2, score: 0.65 },
    { k: 3, score: 0.78 },
    { k: 4, score: 0.82 }
  ],
  AU: [
    { k: 4, score: 0.80 },
    { k: 5, score: 0.73 },
    { k: 6, score: 0.66 }
  ],
  FR: [
    { k: 2, score: 0.64 },
    { k: 3, score: 0.76 },
    { k: 4, score: 0.81 }
  ]
};
function generateClusterPoints(pointsCount: number, clustersCount: number) {
  const data = [];
  const pointsPerCluster = Math.floor(pointsCount / clustersCount);

  for (let cluster = 0; cluster < clustersCount; cluster++) {
    const centerX = 2 + Math.random() * 7;
    const centerY = 2 + Math.random() * 7;

    for (let i = 0; i < pointsPerCluster; i++) {
      const x = +(centerX + (Math.random() - 0.5) * 0.8).toFixed(2);
      const y = +(centerY + (Math.random() - 0.5) * 0.8).toFixed(2);
      data.push({ x, y, cluster });
    }
  }

  while (data.length < pointsCount) {
    const x = +(2 + Math.random() * 7).toFixed(2);
    const y = +(2 + Math.random() * 7).toFixed(2);
    data.push({ x, y, cluster: 0 });
  }

  return data;
}

const clusterData = {
  UK: generateClusterPoints(88, 3),
  AU: generateClusterPoints(98, 5),
  FR: generateClusterPoints(80, 3)
};

const CLUSTER_COLORS = [
  '#1f77b4',
  '#ff7f0e', 
  '#2ca02c', 
  '#d62728', 
  '#9467bd'
];
const mlInsights = {
  UK: {
    title: "Machine Learning Insights - UK",
    content: "Three segments: health-focused, taste-driven, and low-engagement. Actionable groups are health and taste; the third can be deprioritized.",
    metrics: [
      "Clusters: 3",
      "Focus: Health, Taste"
    ]
  },

  AU: {
    title: "Machine Learning Insights - Australia",
    content: "Five segments found. Dominant themes are texture sensitivity, flavour preference, and convenience. Smaller groups focus on health and family needs.",
    metrics: [
      "Clusters: 5",
      "Focus: Texture, Convenience"
    ]
  },

  FR: {
    title: "Machine Learning Insights - France",
    content: "Three segments: Trésor loyalists, brand switchers, and low-engagement buyers. Loyalty and variety are key drivers.",
    metrics: [
      "Clusters: 3",
      "Focus: Loyalty, Variety"
    ]
  }
};


interface MLAnalysisSectionProps {
  country: string;
}

export const MLAnalysisSection = ({ country }: MLAnalysisSectionProps) => {
  const countryElbowData = elbowData[country as keyof typeof elbowData] || elbowData.UK;
  const countrySilhouetteData = silhouetteData[country as keyof typeof silhouetteData] || silhouetteData.UK;
  const countryClusterData = clusterData[country as keyof typeof clusterData] || clusterData.UK;

  const mlInsight = mlInsights[country as keyof typeof mlInsights] || mlInsights.UK;


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