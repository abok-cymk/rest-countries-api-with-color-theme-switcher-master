import { memo, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BiArrowBack } from "react-icons/bi";

const findCountryByCode = (code, countries) => {
  return countries.find((country) => country.alpha3Code === code);
};

const getBorderCountryNames = (borderCodes, countries) => {
  if (!borderCodes || borderCodes.length === 0) return [];
  return borderCodes
    .map((code) => {
      const country = findCountryByCode(code, countries);
      return country ? { name: country.name, code: country.alpha3Code } : null;
    })
    .filter(Boolean); // Remove nulls if a border country code isn't found
};

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

  // Basic loading/not found state
  if (!allCountriesData || allCountriesData.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8 pt-24 text-center dark:text-white">
          Loading data...
        </div>
      </>
    );
  }

  if (!country) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8 pt-24 text-center dark:text-white">
          Country not found or still loading...
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-white dark:bg-elementsDark text-textLight dark:text-white shadow-md py-2 px-8 rounded"
          >
            Go Home
          </button>
        </div>
      </>
    );
  }

  const currencyNames =
    country.currencies?.map((c) => c.name).join(", ") || "N/A";
  const languageNames =
    country.languages?.map((l) => l.name).join(", ") || "N/A";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <img
            src={country.flags.svg || country.flags.png} // Prefer SVG if available, fallback to PNG
            alt={`Flag of ${country.name}`}
            loading="lazy"
            className="w-full max-w-lg rounded"
          />

          <div className="text-textLight dark:text-white">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-5">
              {country.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
              <div>
                <p className="mb-2">
                  <strong className="text-base">Native Name:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.nativeName || "N/A"}
                  </span>
                </p>
                <p className="mb-2">
                  <strong className="font-600">Population:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.population?.toLocaleString() || "N/A"}
                  </span>
                </p>
                <p className="mb-2">
                  <strong className="font-600">Region:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.region || "N/A"}
                  </span>
                </p>
                <p className="mb-2">
                  <strong className="font-600">Sub Region:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.subregion || "N/A"}
                  </span>
                </p>
                <p>
                  <strong className="font-600">Capital:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.capital || "N/A"}
                  </span>
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong className="font-600">Top Level Domain:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {country.topLevelDomain?.join(", ") || "N/A"}
                  </span>
                </p>
                <p className="mb-2">
                  <strong className="font-600">Currencies:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {currencyNames}
                  </span>
                </p>
                <p>
                  <strong className="font-600">Languages:</strong>{" "}
                  <span className="text-sm dark:text-textDark font-300">
                    {languageNames}
                  </span>
                </p>
              </div>
            </div>

            {borderCountries.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-600 mb-3">
                  Border Countries:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Link
                      key={border.code}
                      to={`/country/${border.code}`}
                      className="bg-white dark:bg-elementsDark shadow py-1.5 px-5 rounded text-xs sm:text-sm hover:opacity-80 transition-opacity focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400"
                    >
                      {border.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* Handle cases where borders array exists but names couldn't be found or no borders */}
            {country.borders &&
              country.borders.length > 0 &&
              borderCountries.length === 0 && (
                <p className="text-sm sm:text-base">
                  <strong className="font-600">Border Countries:</strong>{" "}
                  Information not fully available.
                </p>
              )}
            {(!country.borders || country.borders.length === 0) && (
              <p className="text-sm sm:text-base">
                <strong>Border Countries:</strong> None
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});

export default CountryDetailPage;
