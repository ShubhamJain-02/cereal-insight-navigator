import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlipCard } from "@/components/FlipCard";

const ageData = {
  UK: [
    { age: '18-29', population: 8 },
    { age: '30-39', population: 16 },
    { age: '40-49', population: 11 },
    { age: '40-59', population: 8 }
  ],
  AU: [
    { age: '18-24', population: 2 },
    { age: '25-34', population: 6 },
    { age: '35-44', population: 25 },
    { age: '45-54', population: 7 },
    { age: '55-64', population: 11 },
    { age: '65+', population: 4 }
  ],
  FR: [
    { age: '25-34', population: 4 },
    { age: '35-44', population: 27 },
    { age: '45-54', population: 13 },
    { age: '55+', population: 1 }
  ]
};

const genderData = {
  UK: [
    { gender: 'Male', value: 18, count: 8 },
    { gender: 'Female', value: 81, count: 36 }
  ],
  AU: [
    { gender: 'Male', value: 42, count: 21 },
    { gender: 'Female', value: 58, count: 30 }
  ],
  FR: [
    { gender: 'Male', value: 22, count: 10 },
    { gender: 'Female', value: 78, count: 36 }
  ]
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

interface DemographicsSectionProps {
  country: string;
}

export const DemographicsSection = ({ country }: DemographicsSectionProps) => {
  const countryAgeData = ageData[country as keyof typeof ageData] || ageData.UK;
  const countryGenderData = genderData[country as keyof typeof genderData] || genderData.UK;

  const demographicsInsight = {
    title: "Demographics Insights",
    content: `${country} shows a strong representation in the 25-34 age group, making up the largest consumer segment. Gender distribution remains relatively balanced with slight female preference for cereal products.`,
    metrics: [
      `Peak Age Group: ${countryAgeData.reduce((max, curr) => curr.population > max.population ? curr : max, countryAgeData[0]).age}`,
      `Female Preference: +${countryGenderData.find(g => g.gender === 'Female')?.value}%`,
      `Total Sample: ${countryAgeData.reduce((sum, curr) => sum + curr.population, 0).toLocaleString()}`
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Age Distribution Chart */}
      <Card className="card-analytics col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-chart-1">Age Distribution</CardTitle>
          <CardDescription>Consumer age demographics in {country}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={countryAgeData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="age" 
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
              <Bar dataKey="population" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gender Distribution Chart */}
      <Card className="card-analytics col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-chart-2">Gender Distribution</CardTitle>
          <CardDescription>Consumer gender demographics in {country}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryGenderData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ gender, value }) => `${gender}: ${value}%`}
              >
                {countryGenderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights Flip Card */}
      <div className="col-span-1">
        <FlipCard insight={demographicsInsight} />
      </div>
    </div>
  );
};