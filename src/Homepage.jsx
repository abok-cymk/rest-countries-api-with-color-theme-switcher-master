import { memo } from "react";
import CountryCard from "./components/CountryCard";

function Homepage({ countries }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-16">
        {countries.length > 0 ? (
          countries.map((country, index) => (
            <CountryCard
              key={country.alpha3Code || country.name}
              country={country}
              isAboveThreshold={index < 4}
            />
          ))
        ) : (
          <p className="dark:text-white col-span-full text-center text-lg py-10">
            No countries found matching your criteria.
          </p>
        )}
      </div>
    </main>
  );
}

export default memo(Homepage);
