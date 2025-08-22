import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

const countries = [
  { code: "UK", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "AU", name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  { code: "FR", name: "France", flag: "https://flagcdn.com/w40/fr.png" },
];

interface CountrySelectorProps {
  selectedCountry: string;
  selectedCereal1: string;
  selectedCereal2: string;
  onCountryChange: (country: string) => void;
  onCereal1Change: (cereal1: string) => void;
  onCereal2Change: (cereal2: string) => void;
}
const cerealMapping: Record<string, string[]> = {
  UK: ["Cookie Crisp", "Shreddies"],
  AU: ["Breakfast Bakes", "Oat Slice"],
  FR: ["Lion", "Tresor"],
};



export const CountrySelector = ({ selectedCountry,selectedCereal1,selectedCereal2, onCountryChange, onCereal1Change,onCereal2Change }: CountrySelectorProps) => {
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  useEffect(() => {
    const cereals = cerealMapping[selectedCountry];
    if (cereals) {
      onCereal1Change(cereals[0]);
      onCereal2Change(cereals[1]);
    }
  }, [selectedCountry]);

  return (
    <div className="card-analytics p-6 rounded-xl border max-w-md">
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          Select Market Region
        </label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="w-full bg-secondary/50 border-border/50">
            <SelectValue>
              <div className="flex items-center gap-3">
                <img src={selectedCountryData.flag} alt={selectedCountryData.name} className="w-5 h-4 object-cover rounded-sm" />
                <span className="font-medium">{selectedCountryData?.name}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border/50">
            {countries.map((country) => (
              <SelectItem 
                key={country.code} 
                value={country.code}
                className="hover:bg-primary/10 focus:bg-primary/10"
              >
                <div className="flex items-center gap-3">
                  <img src={country.flag} alt={country.name} className="w-5 h-4 object-cover rounded-sm" />
                  <span>{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};