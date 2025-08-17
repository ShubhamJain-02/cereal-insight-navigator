import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";
import { Badge } from "@/components/ui/badge";

const feedbackData = {
  cereal1: {
    UK: {
      positive: [
        { month: 'Jan', count: 450 },
        { month: 'Feb', count: 520 },
        { month: 'Mar', count: 480 },
        { month: 'Apr', count: 600 },
        { month: 'May', count: 650 },
        { month: 'Jun', count: 720 }
      ],
      negative: [
        { month: 'Jan', count: 120 },
        { month: 'Feb', count: 100 },
        { month: 'Mar', count: 150 },
        { month: 'Apr', count: 110 },
        { month: 'May', count: 90 },
        { month: 'Jun', count: 85 }
      ]
    },
    AU: {
      positive: [
        { month: 'Jan', count: 380 },
        { month: 'Feb', count: 420 },
        { month: 'Mar', count: 450 },
        { month: 'Apr', count: 500 },
        { month: 'May', count: 540 },
        { month: 'Jun', count: 580 }
      ],
      negative: [
        { month: 'Jan', count: 95 },
        { month: 'Feb', count: 85 },
        { month: 'Mar', count: 100 },
        { month: 'Apr', count: 75 },
        { month: 'May', count: 65 },
        { month: 'Jun', count: 60 }
      ]
    },
    PL: {
      positive: [
        { month: 'Jan', count: 250 },
        { month: 'Feb', count: 280 },
        { month: 'Mar', count: 320 },
        { month: 'Apr', count: 350 },
        { month: 'May', count: 380 },
        { month: 'Jun', count: 400 }
      ],
      negative: [
        { month: 'Jan', count: 80 },
        { month: 'Feb', count: 70 },
        { month: 'Mar', count: 85 },
        { month: 'Apr', count: 60 },
        { month: 'May', count: 55 },
        { month: 'Jun', count: 50 }
      ]
    },
    FR: {
      positive: [
        { month: 'Jan', count: 400 },
        { month: 'Feb', count: 450 },
        { month: 'Mar', count: 480 },
        { month: 'Apr', count: 520 },
        { month: 'May', count: 580 },
        { month: 'Jun', count: 620 }
      ],
      negative: [
        { month: 'Jan', count: 110 },
        { month: 'Feb', count: 95 },
        { month: 'Mar', count: 120 },
        { month: 'Apr', count: 85 },
        { month: 'May', count: 75 },
        { month: 'Jun', count: 70 }
      ]
    }
  },
  cereal2: {
    UK: {
      positive: [
        { month: 'Jan', count: 320 },
        { month: 'Feb', count: 380 },
        { month: 'Mar', count: 420 },
        { month: 'Apr', count: 480 },
        { month: 'May', count: 520 },
        { month: 'Jun', count: 580 }
      ],
      negative: [
        { month: 'Jan', count: 180 },
        { month: 'Feb', count: 160 },
        { month: 'Mar', count: 140 },
        { month: 'Apr', count: 120 },
        { month: 'May', count: 100 },
        { month: 'Jun', count: 90 }
      ]
    },
    AU: {
      positive: [
        { month: 'Jan', count: 280 },
        { month: 'Feb', count: 320 },
        { month: 'Mar', count: 360 },
        { month: 'Apr', count: 400 },
        { month: 'May', count: 440 },
        { month: 'Jun', count: 480 }
      ],
      negative: [
        { month: 'Jan', count: 150 },
        { month: 'Feb', count: 130 },
        { month: 'Mar', count: 120 },
        { month: 'Apr', count: 100 },
        { month: 'May', count: 85 },
        { month: 'Jun', count: 75 }
      ]
    },
    PL: {
      positive: [
        { month: 'Jan', count: 200 },
        { month: 'Feb', count: 240 },
        { month: 'Mar', count: 280 },
        { month: 'Apr', count: 320 },
        { month: 'May', count: 360 },
        { month: 'Jun', count: 400 }
      ],
      negative: [
        { month: 'Jan', count: 120 },
        { month: 'Feb', count: 110 },
        { month: 'Mar', count: 100 },
        { month: 'Apr', count: 85 },
        { month: 'May', count: 70 },
        { month: 'Jun', count: 60 }
      ]
    },
    FR: {
      positive: [
        { month: 'Jan', count: 300 },
        { month: 'Feb', count: 340 },
        { month: 'Mar', count: 380 },
        { month: 'Apr', count: 420 },
        { month: 'May', count: 460 },
        { month: 'Jun', count: 500 }
      ],
      negative: [
        { month: 'Jan', count: 140 },
        { month: 'Feb', count: 125 },
        { month: 'Mar', count: 115 },
        { month: 'Apr', count: 95 },
        { month: 'May', count: 80 },
        { month: 'Jun', count: 70 }
      ]
    }
  }
};

interface CerealAnalysisSectionProps {
  cerealName: string;
  cerealId: string;
  country: string;
}

export const CerealAnalysisSection = ({ cerealName, cerealId, country }: CerealAnalysisSectionProps) => {
  const data = feedbackData[cerealId as keyof typeof feedbackData];
  const countryData = data[country as keyof typeof data] || data.UK;
  
  const combinedData = countryData.positive.map((pos, index) => ({
    month: pos.month,
    positive: pos.count,
    negative: countryData.negative[index].count
  }));

  const totalPositive = countryData.positive.reduce((sum, curr) => sum + curr.count, 0);
  const totalNegative = countryData.negative.reduce((sum, curr) => sum + curr.count, 0);
  const sentimentScore = ((totalPositive - totalNegative) / (totalPositive + totalNegative) * 100).toFixed(1);

  const cerealInsight = {
    title: `${cerealName} Performance`,
    content: `${cerealName} shows strong market performance in ${country} with positive sentiment trending upward. Consumer feedback indicates high satisfaction with taste and quality.`,
    metrics: [
      `Sentiment Score: ${sentimentScore}%`,
      `Total Positive: ${totalPositive.toLocaleString()}`,
      `Total Negative: ${totalNegative.toLocaleString()}`,
      `Growth Trend: ${((countryData.positive[5].count - countryData.positive[0].count) / countryData.positive[0].count * 100).toFixed(1)}%`
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-3">
          {cerealName}
          <Badge 
            variant="secondary" 
            className={`${parseFloat(sentimentScore) > 50 ? 'bg-chart-2/20 text-chart-2' : 'bg-chart-4/20 text-chart-4'}`}
          >
            {parseFloat(sentimentScore) > 50 ? 'Positive' : 'Negative'} {sentimentScore}%
          </Badge>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Combined Feedback Chart */}
        <Card className="card-analytics col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-chart-3">Feedback Trends</CardTitle>
            <CardDescription>Monthly positive vs negative feedback in {country}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
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
                  dataKey="positive" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                  name="Positive Feedback"
                />
                <Line 
                  type="monotone" 
                  dataKey="negative" 
                  stroke="hsl(var(--chart-4))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 4 }}
                  name="Negative Feedback"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights Flip Card */}
        <div className="col-span-1">
          <FlipCard insight={cerealInsight} />
        </div>
      </div>
    </div>
  );
};