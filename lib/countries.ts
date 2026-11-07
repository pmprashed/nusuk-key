export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  iso: string;
}

export const COUNTRIES_LIST: CountryInfo[] = [
  { code: "GLOBAL", name: "Global", flag: "🌐", iso: "GL" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", iso: "BD" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", iso: "PK" },
  { code: "IN", name: "India", flag: "🇮🇳", iso: "IN" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", iso: "ID" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", iso: "AE" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", iso: "EG" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", iso: "TR" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", iso: "MY" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", iso: "GB" },
  { code: "US", name: "United States", flag: "🇺🇸", iso: "US" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", iso: "DZ" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", iso: "MA" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", iso: "IQ" },
  { code: "JO", name: "Jordan", flag: "🇯🇴", iso: "JO" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", iso: "KW" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", iso: "QA" },
  { code: "OM", name: "Oman", flag: "🇴🇲", iso: "OM" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", iso: "BH" },
  { code: "YE", name: "Yemen", flag: "🇾🇪", iso: "YE" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", iso: "TN" },
  { code: "LY", name: "Libya", flag: "🇱🇾", iso: "LY" },
  { code: "SD", name: "Sudan", flag: "🇸🇩", iso: "SD" },
  { code: "SO", name: "Somalia", flag: "🇸🇴", iso: "SO" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", iso: "UZ" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", iso: "KZ" },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", iso: "AF" },
  { code: "CA", name: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "FR", name: "France", flag: "🇫🇷", iso: "FR" },
  { code: "DE", name: "Germany", flag: "🇩🇪", iso: "DE" },
];

const COUNTRY_MAP = new Map<string, CountryInfo>();
for (const country of COUNTRIES_LIST) {
  COUNTRY_MAP.set(country.code.toUpperCase(), country);
  COUNTRY_MAP.set(country.name.toLowerCase(), country);
  COUNTRY_MAP.set(country.iso.toUpperCase(), country);
}

/** Get country info by code, name, or fallback to Global */
export function getCountryDetails(input?: string | null): CountryInfo {
  if (!input) {
    return COUNTRIES_LIST[0]; // Global
  }
  const clean = input.trim();
  const found = COUNTRY_MAP.get(clean.toUpperCase()) || COUNTRY_MAP.get(clean.toLowerCase());
  return found || COUNTRIES_LIST[0]; // Global
}
