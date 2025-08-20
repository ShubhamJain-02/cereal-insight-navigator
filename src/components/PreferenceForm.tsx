import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Trophy, TrendingUp } from "lucide-react";

const formSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  taste: z.number().min(1).max(10),
  nutrition: z.number().min(1).max(10),
  price: z.number().min(1).max(10),
  packaging: z.number().min(1).max(10),
  availability: z.number().min(1).max(10),
  satisfaction: z.number().min(1).max(10),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "FR", name: "France", flag: "🇫🇷" },
];

const cerealDataByCountry = {
  UK: {
    "British Morning Crunch": {
      taste: 88,
      nutrition: 82,
      price: 72,
      packaging: 85,
      availability: 92,
      satisfaction: 89
    },
    "Royal Oat Delight": {
      taste: 83,
      nutrition: 90,
      price: 68,
      packaging: 78,
      availability: 88,
      satisfaction: 86
    },
  },
  AU: {
    "Aussie Crispy Flakes": {
      taste: 91,
      nutrition: 75,
      price: 80,
      packaging: 82,
      availability: 95,
      satisfaction: 88
    },
    "Outback Granola Mix": {
      taste: 79,
      nutrition: 94,
      price: 65,
      packaging: 76,
      availability: 87,
      satisfaction: 84
    },
  },
  FR: {
    "French Gourmet Muesli": {
      taste: 94,
      nutrition: 88,
      price: 58,
      packaging: 92,
      availability: 78,
      satisfaction: 91
    },
    "Provence Honey Crunch": {
      taste: 86,
      nutrition: 85,
      price: 62,
      packaging: 89,
      availability: 82,
      satisfaction: 87
    },
  },
};

const factors = [
  { key: "taste" as const, label: "Taste", description: "How important is taste to you?" },
  { key: "nutrition" as const, label: "Nutrition", description: "How much do you value nutritional content?" },
  { key: "price" as const, label: "Price", description: "How important is affordability?" },
  { key: "packaging" as const, label: "Packaging", description: "How much do you care about packaging design?" },
  { key: "availability" as const, label: "Availability", description: "How important is easy availability?" },
  { key: "satisfaction" as const, label: "Overall Satisfaction", description: "How important is overall satisfaction?" },
];

interface PreferenceFormProps {
  onRecommendation: (recommendation: {
    recommendedCereal: string;
    score: number;
    reasoning: string;
    comparison: any;
  }) => void;
}

export const PreferenceForm = ({ onRecommendation }: PreferenceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      taste: 5,
      nutrition: 5,
      price: 5,
      packaging: 5,
      availability: 5,
      satisfaction: 5,
    },
  });

  const calculateMatch = (userPrefs: FormValues) => {
    const countryData = cerealDataByCountry[userPrefs.country as keyof typeof cerealDataByCountry];
    if (!countryData) return null;
    
    const cereals = Object.entries(countryData);
    const results = cereals.map(([name, cereal]) => {
      let totalScore = 0;
      let maxPossibleScore = 0;

      factors.forEach(({ key }) => {
        const userWeight = userPrefs[key] / 10; // Normalize to 0-1
        const cerealScore = cereal[key] / 100; // Normalize to 0-1
        totalScore += userWeight * cerealScore * 100;
        maxPossibleScore += userWeight * 100;
      });

      const matchPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
      
      return {
        name,
        score: Math.round(matchPercentage),
        details: cereal
      };
    });

    results.sort((a, b) => b.score - a.score);
    
    const best = results[0];
    const runner = results[1];
    
    // Find the strongest factor for the recommended cereal
    const strongestFactor = factors.reduce((prev, current) => {
      const prevDiff = Math.abs(best.details[prev.key] - runner.details[prev.key]);
      const currentDiff = Math.abs(best.details[current.key] - runner.details[current.key]);
      return currentDiff > prevDiff ? current : prev;
    });

    return {
      recommendedCereal: best.name,
      score: best.score,
      reasoning: `Based on your preferences, ${best.name} is your best match with a ${best.score}% compatibility score. It particularly excels in ${strongestFactor.label.toLowerCase()}.`,
      comparison: {
        winner: best,
        runnerUp: runner,
        strongestFactor: strongestFactor.label
      }
    };
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recommendation = calculateMatch(data);
    if (recommendation) {
      onRecommendation(recommendation);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Find Your Perfect Cereal</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Tell us your preferences and we'll recommend the cereal that matches you best
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Country Selection */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Your Country</FormLabel>
                  <FormDescription>
                    Select your country to get localized recommendations
                  </FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full bg-secondary/50">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{country.flag}</span>
                            <span>{country.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preference Ratings */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Rate Your Preferences</h3>
                <p className="text-muted-foreground">
                  Rate each factor from 1 (not important) to 10 (very important)
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {factors.map(({ key, label, description }) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between">
                          <FormLabel className="font-medium">{label}</FormLabel>
                          <Badge variant="secondary" className="text-sm">
                            {field.value}/10
                          </Badge>
                        </div>
                        <FormDescription className="text-sm">
                          {description}
                        </FormDescription>
                        <FormControl>
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Finding Your Perfect Match...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5 mr-2" />
                  Get My Recommendation
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};