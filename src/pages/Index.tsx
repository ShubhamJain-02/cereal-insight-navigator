import { useState } from "react";
import { CountrySelector } from "@/components/CountrySelector";
import { DemographicsSection } from "@/components/DemographicsSection";
import { CerealAnalysisSection } from "@/components/CerealAnalysisSection";
import { MLAnalysisSection } from "@/components/MLAnalysisSection";
import { TrendingUp, Users, BarChart3 } from "lucide-react";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState("UK");

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/20">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cereal Analytics Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comprehensive market analysis and consumer insights across global markets
        </p>
      </div>

      {/* Country Selector */}
      <div className="flex justify-center">
        <CountrySelector 
          selectedCountry={selectedCountry} 
          onCountryChange={setSelectedCountry} 
        />
      </div>

      {/* Dashboard Sections */}
      <div className="space-y-12">
        {/* Demographics Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-chart-2" />
            <h2 className="text-2xl font-semibold">Demographics Analysis</h2>
          </div>
          <DemographicsSection country={selectedCountry} />
        </section>

        {/* Cereal Analysis Sections */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-chart-3" />
            <h2 className="text-2xl font-semibold">Product Analysis</h2>
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

        {/* ML Analysis Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-chart-4" />
            <h2 className="text-2xl font-semibold">Machine Learning Analysis</h2>
          </div>
          <MLAnalysisSection country={selectedCountry} />
        </section>
      </div>
    </div>
  );
};

export default Index;