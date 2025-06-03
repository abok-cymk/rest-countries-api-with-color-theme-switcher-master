import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import countriesData from "../data.json";
import Homepage from "./Homepage";
import CountryDetailPage from "./CountryDetailPage"; // Create this file
import { Formik, Form, Field } from "formik";
import { Routes, Route } from "react-router-dom";

// Debounce function (keep as is)
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// This component will manage the state and logic for the homepage (list + filters)
const HomePageLayout = ({ allCountriesData }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    // Initialize or update filteredCountries when allCountriesData changes
    setFilteredCountries(allCountriesData);
  }, [allCountriesData]);

  const debouncedSetSearchQueryCallback = useCallback(
    debounce(setDebouncedSearchQuery, 300),
    []
  );

  return (
    <Formik
      initialValues={{ searchQuery: "", selectedRegion: "" }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false); // Not used for primary filtering
      }}
    >
      {({ values }) => {
        useEffect(() => {
          debouncedSetSearchQueryCallback(values.searchQuery);
        }, [values.searchQuery, debouncedSetSearchQueryCallback]);

        useEffect(() => {
          let tempFiltered = allCountriesData;
          const searchQueryActive = debouncedSearchQuery.trim() !== "";
          const regionSelected =
            values.selectedRegion && values.selectedRegion !== "";

          if (searchQueryActive) {
            // If search is active, filter from allCountriesData based on search
            tempFiltered = allCountriesData.filter(
              (country) =>
                country.name && // Safety check
                country.name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase().trim())
            );
          } else if (regionSelected) {
            // Else if no search, but region is selected, filter from allCountriesData
            tempFiltered = allCountriesData.filter(
              (country) => country.region === values.selectedRegion
            );
          }
          setFilteredCountries(tempFiltered);
        }, [debouncedSearchQuery, values.selectedRegion, allCountriesData]);

        return (
          <>
            <header>
              <Navbar />
              <div className="max-w-6xl mx-auto px-4 pt-24">
                <Form className="flex items-start sm:items-center justify-between gap-[0.8lh] flex-col lg:flex-row">
                  <div className="relative">
                    <Field
                      type="text"
                      name="searchQuery"
                      placeholder="Search for a country..."
                      className="relative shadow-md rounded py-[0.8ch] px-16 placeholder:text-[0.875rem] text-inputLight dark:bg-elementsDark dark:text-white focus:outline-0 w-full sm:w-auto"
                    />
                    <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 dark:text-white" />
                  </div>

                  <div className="relative grid">
                    <Field
                      as="select"
                      name="selectedRegion"
                      className="focus:outline-0 w-full shadow-lg appearance-none rounded-md py-2 pl-6 pr-12 text-textLight dark:bg-elementsDark dark:text-white text-[0.875rem]"
                    >
                      <option value="" className="text-[0.875rem]">
                        Filter by Region
                      </option>
                      <option value="Africa" className="text-[0.875rem]">
                        Africa
                      </option>
                      <option value="Americas" className="text-[0.875rem]">
                        Americas
                      </option>
                      <option value="Asia" className="text-[0.875rem]">
                        Asia
                      </option>
                      <option value="Europe" className="text-[0.875rem]">
                        Europe
                      </option>
                      <option value="Oceania" className="text-[0.875rem]">
                        Oceania
                      </option>
                      <option value="Polar" className="text-[0.875rem]">
                        Polar
                      </option>
                    </Field>
                    <BiChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 dark:text-white sm:size-4"
                    />
                  </div>
                </Form>
              </div>
            </header>
            <Homepage countries={filteredCountries} />
          </>
        );
      }}
    </Formik>
  );
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);

  // Effect to load and clean initial data (once)
  useEffect(() => {
    const validCountries = countriesData
      .filter(
        (country) =>
          country &&
          typeof country.name === "string" &&
          typeof country.alpha3Code === "string" && // Important for routing key
          typeof country.region === "string" &&
          country.flags &&
          typeof country.flags.png === "string" &&
          typeof country.population === "number"
      )
      .map((country) => ({
        ...country,
        capital: country.capital || "N/A",
        // Ensure essential arrays are at least empty for detail page
        currencies: country.currencies || [],
        languages: country.languages || [],
      }));
    setAllCountries(validCountries);
  }, []);

  return (
    <Routes>
      <Route
        path="*"
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
