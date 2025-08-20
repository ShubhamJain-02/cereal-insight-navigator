import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";
import { Badge } from "@/components/ui/badge";

const wordFrequencyData = {
  cereal1: {
    UK: {
      positive: [
        { word: 'delicious', count: 120 },
        { word: 'crunchy', count: 95 },
        { word: 'healthy', count: 90 },
        { word: 'tasty', count: 85 },
        { word: 'fresh', count: 80 }
      ],
      negative: [
        { word: 'bland', count: 60 },
        { word: 'stale', count: 45 },
        { word: 'soggy', count: 40 },
        { word: 'expensive', count: 35 },
        { word: 'artificial', count: 30 }
      ]
    },
    AU: {
      positive: [
        { word: 'crunchy', count: 100 },
        { word: 'nutritious', count: 85 },
        { word: 'affordable', count: 75 },
        { word: 'tasty', count: 70 },
        { word: 'natural', count: 65 }
      ],
      negative: [
        { word: 'stale', count: 50 },
        { word: 'dry', count: 45 },
        { word: 'hard', count: 40 },
        { word: 'boring', count: 30 },
        { word: 'unhealthy', count: 25 }
      ]
    },
    PL: {
      positive: [
        { word: 'smaczne', count: 95 },
        { word: 'chrupiące', count: 80 },
        { word: 'zdrowe', count: 70 },
        { word: 'świeże', count: 65 },
        { word: 'dobrze', count: 60 }
      ],
      negative: [
        { word: 'nudne', count: 40 },
        { word: 'stare', count: 35 },
        { word: 'drogi', count: 30 },
        { word: 'zbyt twarde', count: 25 },
        { word: 'słabe', count: 20 }
      ]
    },
    FR: {
      positive: [
        { word: 'délicieux', count: 110 },
        { word: 'croquant', count: 95 },
        { word: 'sain', count: 90 },
        { word: 'frais', count: 80 },
        { word: 'bon goût', count: 75 }
      ],
      negative: [
        { word: 'fade', count: 55 },
        { word: 'cher', count: 50 },
        { word: 'mou', count: 40 },
        { word: 'artificiel', count: 35 },
        { word: 'sec', count: 30 }
      ]
    }
  },

  cereal2: {
    UK: {
      positive: [
        { word: 'nutritious', count: 100 },
        { word: 'yummy', count: 90 },
        { word: 'natural', count: 85 },
        { word: 'crunchy', count: 80 },
        { word: 'satisfying', count: 75 }
      ],
      negative: [
        { word: 'dry', count: 55 },
        { word: 'flavorless', count: 50 },
        { word: 'bitter', count: 40 },
        { word: 'unpleasant', count: 30 },
        { word: 'fake', count: 25 }
      ]
    },
    AU: {
      positive: [
        { word: 'organic', count: 95 },
        { word: 'flavorful', count: 85 },
        { word: 'wholesome', count: 80 },
        { word: 'crisp', count: 75 },
        { word: 'energy', count: 70 }
      ],
      negative: [
        { word: 'plain', count: 50 },
        { word: 'tough', count: 45 },
        { word: 'stale', count: 40 },
        { word: 'noisy', count: 35 },
        { word: 'pricey', count: 30 }
      ]
    },
    PL: {
      positive: [
        { word: 'naturalne', count: 90 },
        { word: 'pyszne', count: 85 },
        { word: 'chrupkie', count: 80 },
        { word: 'odżywcze', count: 75 },
        { word: 'smaczne', count: 70 }
      ],
      negative: [
        { word: 'mdłe', count: 45 },
        { word: 'suche', count: 40 },
        { word: 'gorzkie', count: 35 },
        { word: 'twarde', count: 30 },
        { word: 'drogie', count: 25 }
      ]
    },
    FR: {
      positive: [
        { word: 'sain', count: 95 },
        { word: 'croquant', count: 85 },
        { word: 'délicieux', count: 80 },
        { word: 'naturel', count: 75 },
        { word: 'nourrissant', count: 70 }
      ],
      negative: [
        { word: 'fade', count: 50 },
        { word: 'dur', count: 45 },
        { word: 'pas frais', count: 40 },
        { word: 'trop cher', count: 35 },
        { word: 'sec', count: 30 }
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
