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
            <Card className="card-analytics h-full flex flex-col justify-center items-center text-center">
              <CardContent className="space-y-6">
                <div className="p-4 rounded-full bg-primary/20 mx-auto w-fit">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click to reveal insights
                  </p>
                </div>
                <div className="flex justify-center">
                  <RotateCcw className="w-5 h-5 text-muted-foreground animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <Card className="card-analytics h-full">
              <CardHeader>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
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