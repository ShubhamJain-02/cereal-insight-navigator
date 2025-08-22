import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";
import { Badge } from "@/components/ui/badge";

const wordFrequencyData = {
  cereal1: {
    UK: {
      positive: [
        { word: 'chocolate', count: 12 },
        { word: 'desert like', count: 9 },
        { word: 'kids like it', count: 8 },
        { word: 'good branding', count: 7 },
      ],
      negative: [
        { word: 'like of fiber', count: 7},
        { word: 'not filling', count: 8 },
        { word: 'high sugar', count: 13 }
      ]
    },
    AU: {
      positive: [
        { word: 'health', count: 11 },
        { word: 'family choice', count: 9 },
        { word: 'convinience', count: 6 },
        { word: 'variety', count: 5 },
      ],
      negative: [
        { word: 'availability', count: 3 },
        { word: 'portion size', count: 4 },
        { word: 'expensive', count: 5 },
        { word: 'packaging', count: 6 },
      ]
    },
    FR: {
      positive: [
        { word: 'strong branding', count: 7 },
        { word: 'whole wheat', count: 9 },
        { word: 'chocolate and caramel', count: 12 }
      ],
      negative: [
        { word: 'palm oil', count: 5 },
        { word: 'processed', count: 8 },
        { word: 'high sugar', count: 11 }
      ]
    }
  },

  cereal2: {
    UK: {
      positive: [
        { word: 'nutritious', count: 8 },
        { word: 'health', count: 11 },
        { word: 'filling', count: 5 },
        { word: 'tasty', count: 2 },
      ],
      negative: [
        { word: 'processed', count: 9 },
        { word: 'less appealing', count: 8 },
        { word: 'bland', count: 7 },
        { word: 'plain', count: 10 },
      ]
    },
    AU: {
      positive: [
        { word: 'grab-n-go', count: 11 },
        { word: 'flavorful', count: 11 },
        { word: 'natural', count: 9 },
        { word: 'healthy', count: 12 },
      ],
      negative: [
        { word: 'packaging', count: 5 },
        { word: 'portion size', count: 6 },
        { word: 'dry/crumbly', count: 7 },
        { word: 'pricey', count: 4 }
      ]
    },
    FR: {
      positive: [
        { word: 'kids appeal', count: 7 },
        { word: 'versatile', count: 9 },
        { word: 'crunchy', count: 10 },
        { word: 'chocolate', count: 13 }
      ],
      negative: [
        { word: 'portion size', count: 5 },
        { word: 'low nutrition', count: 6 },
        { word: 'sweet', count: 9 },
        { word: 'messy to eat', count: 11 },
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
  const data = wordFrequencyData[cerealId as keyof typeof wordFrequencyData];
  const countryData = data[country as keyof typeof data] || data.UK;

  const wordData = wordFrequencyData[cerealId as keyof typeof wordFrequencyData];
  const wordCountryData = wordData[country as keyof typeof wordData] || wordData.UK;

  const positive = countryData?.positive ?? [];
const negative = countryData?.negative ?? [];

const totalPositive = positive.reduce((sum, curr) => sum + (curr?.count ?? 0), 0);
const totalNegative = negative.reduce((sum, curr) => sum + (curr?.count ?? 0), 0);

const sentimentScore = totalPositive + totalNegative > 0
  ? (((totalPositive - totalNegative) / (totalPositive + totalNegative)) * 100).toFixed(1)
  : '0.0';

const growthTrend = (positive.length >= 2 && positive[0].count !== 0)
  ? (((positive[positive.length - 1].count - positive[0].count) / positive[0].count) * 100).toFixed(1)
  : '0.0';

const cerealInsight = {
  title: `${cerealName} Performance`,
  content: `${cerealName} shows strong market performance in ${country} with positive sentiment trending upward. Consumer feedback indicates high satisfaction with taste and quality.`,
  metrics: [
    `Sentiment Score: ${sentimentScore}%`,
    `Total Positive: ${totalPositive.toLocaleString()}`,
    `Total Negative: ${totalNegative.toLocaleString()}`,
    `Growth Trend: ${growthTrend}%`
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
        {/* Positive Word Frequency */}
        <Card className="card-analytics col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-chart-2">Positive Keywords</CardTitle>
            <CardDescription>Common positive feedback in {country}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wordCountryData.positive}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="word" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Negative Word Frequency */}
        <Card className="card-analytics col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-chart-4">Negative Keywords</CardTitle>
            <CardDescription>Common negative feedback in {country}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wordCountryData.negative}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="word" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* FlipCard Insight */}
        <div className="col-span-1">
          <FlipCard insight={cerealInsight} />
        </div>
      </div>
    </div>
  );
};
