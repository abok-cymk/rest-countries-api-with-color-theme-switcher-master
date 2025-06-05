import { useEffect, useState } from "react";
import countriesData from "../data.json";
import CountryDetailPage from "./CountryDetailPage";
import HomePageLayout from "./components/HomepageLayout";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);

  // Effect to load and clean initial data (once)
  useEffect(() => {
    const validCountries = countriesData
      .filter(
        (country) =>
          country &&
          typeof country.name === "string" &&
          typeof country.alpha3Code === "string" &&
          typeof country.region === "string" &&
          country.flags &&
          (typeof country.flags.png === "string" ||
            typeof country.flags.svg === "string") && // Allow svg as well
          typeof country.population === "number"
      )
      .map((country) => ({
        ...country,
        capital: country.capital || "N/A",
        // Ensure essential arrays are at least empty for detail page
        currencies: country.currencies || [],
        languages: country.languages || [],
        flags: {
          // Ensure flags object and its properties exist
          png: country.flags.png,
          svg: country.flags.svg,
        },
      }));
    setAllCountries(validCountries);
  }, []);

  return (
    <Routes>
      <Route
        path="/*"
        element={<HomePageLayout allCountriesData={allCountries} />}
      />
      <Route
        path="/country/:countryCode"
        element={<CountryDetailPage allCountriesData={allCountries} />}
      />
    </Routes>
  );
};

export default App;
