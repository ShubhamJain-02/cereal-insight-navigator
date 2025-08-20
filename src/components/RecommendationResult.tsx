import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, TrendingUp, RefreshCcw } from "lucide-react";

interface RecommendationResultProps {
  recommendation: {
    recommendedCereal: string;
    score: number;
    reasoning: string;
    comparison: any;
  };
  onReset: () => void;
}

export const RecommendationResult = ({ recommendation, onReset }: RecommendationResultProps) => {
  const { recommendedCereal, score, reasoning, comparison } = recommendation;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    return "Fair Match";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
        
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 rounded-full bg-primary/20 animate-pulse-glow">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-primary">
                Your Perfect Match
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                We found the ideal cereal for you!
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Winner Display */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent">
                {recommendedCereal}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <Badge 
                  className={`${getScoreColor(score)} text-white px-4 py-2 text-lg font-semibold`}
                >
                  {score}% Match
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  {getScoreText(score)}
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {reasoning}
            </p>
          </div>

          {/* Comparison Details */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Your Choice</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{comparison.winner.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Compatibility Score: {comparison.winner.score}%
                  </p>
                  <Badge className="bg-primary text-white">
                    Best in {comparison.strongestFactor}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted bg-muted/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg text-muted-foreground">Runner-up</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{comparison.runnerUp.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Compatibility Score: {comparison.runnerUp.score}%
                  </p>
                  <Badge variant="outline">
                    Alternative Option
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          <div className="text-center pt-4">
            <Button 
              onClick={onReset}
              variant="outline"
              size="lg"
              className="min-w-48"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Try Different Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};