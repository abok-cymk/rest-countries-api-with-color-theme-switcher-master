export const findCountryByCode = (code, countries) => {
  return countries.find((country) => country.alpha3Code === code);
};

export const getBorderCountryNames = (borderCodes, countries) => {
  if (!borderCodes || borderCodes.length === 0) return [];
  return borderCodes
    .map((code) => {
      const country = findCountryByCode(code, countries);
      return country ? { name: country.name, code: country.alpha3Code } : null;
    })
    .filter(Boolean); // Remove nulls if a border country code isn't found
};