import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, RotateCcw } from "lucide-react";

interface FlipCardProps {
  insight: {
    title: string;
    content: string;
    metrics: string[];
  };
}

export const FlipCard = ({ insight }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-full min-h-[400px]">
      <div 
        className={`flip-card h-full cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flip-card-inner h-full">
          {/* Front Side */}
          <div className="flip-card-front">
            <Card className="card-analytics h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
              <CardContent className="space-y-6 relative z-10">
                <div className="p-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto w-fit animate-pulse-glow">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {insight.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    Click to reveal detailed insights
                  </p>
                </div>
                <div className="flex justify-center">
                  <RotateCcw className="w-6 h-6 text-primary/70 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <Card className="card-analytics h-full">
              <CardHeader>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <CardDescription className="text-lg leading-relaxed">
                  {insight.content}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Key Metrics</h4>
                  <div className="space-y-2">
                    {insight.metrics.map((metric, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs py-1 px-2 block text-left bg-secondary/50"
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <RotateCcw className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};