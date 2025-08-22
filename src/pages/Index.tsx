import { useState } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { DemographicsSection } from "@/components/DemographicsSection";
import { CerealAnalysisSection } from "@/components/CerealAnalysisSection";
import { MLAnalysisSection } from "@/components/MLAnalysisSection";
import { StatsOverview } from "@/components/StatsOverview";
import { ComparisonMode } from "@/components/ComparisonMode";
import { CerealComparison } from "@/components/CerealComparison";
import { PreferenceForm } from "@/components/PreferenceForm";
import { RecommendationResult } from "@/components/RecommendationResult";
import CountryMap from "@/components/CountryMap";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, BarChart3, GitCompare, Zap, Sparkles } from "lucide-react";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("UK");
  const [selectedCereal1, setselectedCereal1] = useState("Cookie Crisp");
  const [selectedCereal2, setselectedCereal2] = useState("Shreddies");
  const [showComparison, setShowComparison] = useState(false);
  const [isRealTime, setIsRealTime] = useState(false);
  const [showPreferenceForm, setShowPreferenceForm] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  return (
    <div className="min-h-screen">
      {/* Floating cereal background elements */}
      <div className="cereal-container">
        <div className="cereal-piece"></div>
        <div className="cereal-piece"></div>
        <div className="cereal-piece"></div>
        <div className="cereal-piece"></div>
        <div className="cereal-piece"></div>
        <div className="cereal-piece"></div>
      </div>
      
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Main Title */}
            <div className="animate-fade-in">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow shadow-elegant">
                  <TrendingUp className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent">
                  Cereal Analytics
                </h1>
              </div>
              <p className="text-2xl font-medium text-primary/80 mb-4">Dashboard</p>
            </div>
            
            {/* Subtitle */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed">
                Comprehensive market analysis and consumer insights across global markets with real-time analytics and predictive intelligence
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                variant={isRealTime ? "default" : "outline"}
                onClick={() => setIsRealTime(!isRealTime)}
                size="lg"
                className="min-w-48 transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                {isRealTime ? "Real-time ON" : "Enable Real-time"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowComparison(!showComparison)}
                size="lg"
                className="min-w-48 transition-all duration-300 hover:scale-105"
              >
                <GitCompare className="w-5 h-5 mr-2" />
                {showComparison ? "Hide Comparison" : "Compare Countries"}
              </Button>
              <Button
                variant="default"
                onClick={() => setShowPreferenceForm(!showPreferenceForm)}
                size="lg"
                className="min-w-48 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Find My Perfect Cereal
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Controls Section */}
        <section className="flex flex-col lg:flex-row gap-8 items-start justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="w-full lg:w-auto">
            <CountrySelector 
              selectedCountry={selectedCountry}
              selectedCereal1={selectedCereal1}
              selectedCereal2={selectedCereal2}
              onCountryChange={setSelectedCountry} 
              onCereal1Change={setselectedCereal1 } 
              onCereal2Change={setselectedCereal2}              
            />
          </div>
        </section>

        {/* Interactive Map Section */}
        {/* <section className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Global Market Overview</h2>
            <p className="text-muted-foreground">Interactive analysis across different markets</p>
          </div>
          <CountryMap 
            selectedCountry={selectedCountry} 
            onCountrySelect={setSelectedCountry} 
          />
        </section> */}

        {/* Stats Overview Section */}
        <section className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <StatsOverview country={selectedCountry} />
        </section>

        {/* Preference Form */}
        {showPreferenceForm && !recommendation && (
          <section className="animate-fade-in">
            <PreferenceForm 
              onRecommendation={(rec) => {
                setRecommendation(rec);
                setShowPreferenceForm(false);
              }}
            />
          </section>
        )}

        {/* Recommendation Result */}
        {recommendation && (
          <section className="animate-fade-in">
            <RecommendationResult 
              recommendation={recommendation}
              onReset={() => {
                setRecommendation(null);
                setShowPreferenceForm(true);
              }}
            />
          </section>
        )}

        {/* Comparison Mode */}
        {showComparison && (
          <section className="animate-fade-in">
            <ComparisonMode 
              primaryCountry={selectedCountry}
              onClose={() => setShowComparison(false)}
            />
          </section>
        )}

        {/* Dashboard Sections */}
        <div className="space-y-20">
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
            cerealName={selectedCereal1} 
            cerealId="cereal1"
            country={selectedCountry} 
          />
          
          <CerealAnalysisSection 
            cerealName={selectedCereal2} 
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
      </main>
    </div>
  );
};

export default Index;