import { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BiArrowBack } from "react-icons/bi";
import { findCountryByCode, getBorderCountryNames } from "./utils";
import LoadingState from "./components/LoadingState"; 
import CountryNotFoundState from "./components/CountryNotFoundState"; 
import CountryInfo from "./components/CountryInfo"; 

const CountryDetailPage = memo(({ allCountriesData }) => {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    if (allCountriesData && allCountriesData.length > 0) {
      const foundCountry = findCountryByCode(countryCode, allCountriesData);
      setCountry(foundCountry);
      if (foundCountry && foundCountry.borders) {
        setBorderCountries(
          getBorderCountryNames(foundCountry.borders, allCountriesData)
        );
      } else {
        setBorderCountries([]);
      }
    }
  }, [countryCode, allCountriesData]);

  if (!allCountriesData || allCountriesData.length === 0) {
    return <LoadingState message="Loading data..." />;
  }

  if (!country) {
    return <CountryNotFoundState />;
  }

  return (
    <div className="dark:bg-backgroundDark min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 pt-18 sm:pt-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 sm:mb-16 bg-white dark:bg-elementsDark text-textLight dark:text-white shadow-lg py-2 px-8 rounded flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <BiArrowBack size={20} /> Back
        </button>
        <CountryInfo country={country} borderCountries={borderCountries} />
      </main>
    </div>
  );
});

export default CountryDetailPage;
