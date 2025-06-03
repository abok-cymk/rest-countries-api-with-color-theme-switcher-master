import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useIntersectionObserver from "./hooks/useIntersectionObserver"; // Import the hook

// New CountryCard component
const CountryCard = memo(({ country }) => {
  const [cardRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1, // Trigger when 10% of the card is visible
    triggerOnce: true, // Only animate once
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
    >
      <Link
        to={`/country/${country.alpha3Code}`}
        className="bg-white dark:bg-elementsDark shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 block focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name}`}
          loading="lazy"
          className="w-full h-40 object-cover"
        />
        <div className="p-6">
          <h2 className="font-800 text-lg mb-2 dark:text-white truncate">
            {country.name}
          </h2>
          <p className="text-sm text-textLight dark:text-gray-300 mb-1">
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className="text-sm text-textLight dark:text-gray-300 mb-1">
            <strong>Region:</strong> {country.region}
          </p>
          <p className="text-sm text-textLight dark:text-gray-300">
            <strong>Capital:</strong> {country.capital}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

function Homepage({ countries }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-16">
        {" "}
        {/* Adjusted gaps from previous example */}
        {countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard
              key={country.alpha3Code || country.name}
              country={country}
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
