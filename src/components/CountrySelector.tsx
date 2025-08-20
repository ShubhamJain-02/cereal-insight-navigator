import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  { code: "UK", name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "AU", name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  { code: "PL", name: "Poland", flag: "https://flagcdn.com/w40/pl.png" },
  { code: "FR", name: "France", flag: "https://flagcdn.com/w40/fr.png" },
];

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export const CountrySelector = ({ selectedCountry, onCountryChange }: CountrySelectorProps) => {
  const selectedCountryData = countries.find(c => c.code === selectedCountry);

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