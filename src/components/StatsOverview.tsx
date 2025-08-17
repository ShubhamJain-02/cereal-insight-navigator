import { TrendingUp, TrendingDown, Users, Eye, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatsOverviewProps {
  country: string;
}

export const StatsOverview = ({ country }: StatsOverviewProps) => {
  const stats = [
    {
      title: "Total Users",
      value: "47.2K",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "chart-1"
    },
    {
      title: "Engagement Rate",
      value: "89.3%",
      change: "+5.2%",
      trend: "up",
      icon: Eye,
      color: "chart-2"
    },
    {
      title: "Avg. Rating",
      value: "4.7/5",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "chart-3"
    },
    {
      title: "Conversions",
      value: "23.8K",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      color: "chart-4"
    }
  ];

  const handleExportData = () => {
    const data = {
      country,
      timestamp: new Date().toISOString(),
      stats
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${country.toLowerCase()}-analytics-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Market Overview</h2>
          <p className="text-muted-foreground">Real-time analytics for {country}</p>
        </div>
        <Button 
          onClick={handleExportData}
          variant="outline" 
          size="sm"
          className="animate-pulse-glow"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isPositive = stat.trend === "up";
          
          return (
            <div 
              key={stat.title}
              className="stats-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-${stat.color}/20`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  isPositive ? 'text-chart-2' : 'text-chart-4'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};