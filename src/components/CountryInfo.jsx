import { memo } from "react";
import { Link } from "react-router-dom";

const CountryInfo = ({ country, borderCountries }) => {
  const currencyNames =
    country.currencies?.map((c) => c.name).join(", ") || "N/A";
  const languageNames =
    country.languages?.map((l) => l.name).join(", ") || "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
      <img
        src={country.flags.svg || country.flags.png}
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
  );
};

export default memo(CountryInfo);
