import { useState } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { DemographicsSection } from "@/components/DemographicsSection";
import { CerealAnalysisSection } from "@/components/CerealAnalysisSection";
import { MLAnalysisSection } from "@/components/MLAnalysisSection";
import { StatsOverview } from "@/components/StatsOverview";
import { ComparisonMode } from "@/components/ComparisonMode";
import { CerealComparison } from "@/components/CerealComparison";
import CountryMap from "@/components/CountryMap";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, BarChart3, GitCompare, Zap } from "lucide-react";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [showComparison, setShowComparison] = useState(false);
  const [isRealTime, setIsRealTime] = useState(false);

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4 animate-bounce-in">
          <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent">
            Cereal Analytics Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
          Comprehensive market analysis and consumer insights across global markets with real-time analytics
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant={isRealTime ? "default" : "outline"}
            onClick={() => setIsRealTime(!isRealTime)}
            className="animate-fade-in"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isRealTime ? "Real-time ON" : "Enable Real-time"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="animate-fade-in"
          >
            <GitCompare className="w-4 h-4 mr-2" />
            {showComparison ? "Hide Comparison" : "Compare Countries"}
          </Button>
        </div>
      </div>

      {/* Country Selector */}
      <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CountrySelector 
          selectedCountry={selectedCountry} 
          onCountryChange={setSelectedCountry} 
        />
      </div>

      {/* Interactive Map */}
      <div className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
        <CountryMap 
          selectedCountry={selectedCountry} 
          onCountrySelect={setSelectedCountry} 
        />
      </div>

      {/* Stats Overview */}
      <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <StatsOverview country={selectedCountry} />
      </div>

      {/* Comparison Mode */}
      {showComparison && (
        <div className="animate-fade-in">
          <ComparisonMode 
            primaryCountry={selectedCountry}
            onClose={() => setShowComparison(false)}
          />
        </div>
      )}

      {/* Dashboard Sections */}
      <div className="space-y-16">
        {/* Demographics Section */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-2/20">
                <Users className="w-8 h-8 text-chart-2" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Demographics Analysis</h2>
                <p className="text-muted-foreground">Consumer behavior insights by age and gender</p>
              </div>
            </div>
            {isRealTime && (
              <div className="flex items-center gap-2 text-sm text-chart-2">
                <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse"></div>
                Live Data
              </div>
            )}
          </div>
          <DemographicsSection country={selectedCountry} />
        </section>

        {/* Cereal Analysis Sections */}
        <section className="space-y-10 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-3/20">
                <BarChart3 className="w-8 h-8 text-chart-3" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Product Analysis</h2>
                <p className="text-muted-foreground">Detailed feedback analysis for cereal products</p>
              </div>
            </div>
            {isRealTime && (
              <div className="flex items-center gap-2 text-sm text-chart-3">
                <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse"></div>
                Live Feedback
              </div>
            )}
          </div>
          
          <CerealAnalysisSection 
            cerealName="Crunchy Oats Premium" 
            cerealId="cereal1"
            country={selectedCountry} 
          />
          
          <CerealAnalysisSection 
            cerealName="Healthy Granola Blend" 
            cerealId="cereal2"
            country={selectedCountry} 
          />
        </section>

        {/* Cereal Comparison Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.65s' }}>
          <CerealComparison country={selectedCountry} />
        </section>

        {/* ML Analysis Section */}
        <section className="space-y-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-chart-4/20">
                <TrendingUp className="w-8 h-8 text-chart-4" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Machine Learning Analysis</h2>
                <p className="text-muted-foreground">Advanced clustering and predictive analytics</p>
              </div>
            </div>
            {isRealTime && (
              <div className="flex items-center gap-2 text-sm text-chart-4">
                <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse"></div>
                ML Processing
              </div>
            )}
          </div>
          <MLAnalysisSection country={selectedCountry} />
        </section>
      </div>
    </div>
  );
};

export default Index;