import { useEffect, useState, useCallback, memo } from "react";
import { Formik, Form, Field } from "formik";
import { FiSearch } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import Navbar from "./Navbar";
import Homepage from "../Homepage";
import debounce from "../utils/debounce";

const HomepageLayout = ({ allCountriesData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(allCountriesData);
  }, [allCountriesData]);

  const debouncedSetSearchQuery = useCallback(
    debounce(setDebouncedSearchQuery, 300),
    []
  );

  useEffect(() => {
    debouncedSetSearchQuery(searchQuery);
  }, [searchQuery, debouncedSetSearchQuery]);

  useEffect(() => {
    let tempFiltered = allCountriesData;
    const searchQueryLower = debouncedSearchQuery.toLowerCase().trim();
    const regionSelected = selectedRegion && selectedRegion !== "";

    if (searchQueryLower) {
      tempFiltered = allCountriesData.filter(
        (country) =>
          country.name &&
          country.name.toLowerCase().includes(searchQueryLower)
      );
      if (regionSelected) {
        tempFiltered = tempFiltered.filter(
          (country) => country.region === selectedRegion
        );
      }
    } else if (regionSelected) {
      tempFiltered = allCountriesData.filter(
        (country) => country.region === selectedRegion
      );
    }
    setFilteredCountries(tempFiltered);
  }, [debouncedSearchQuery, selectedRegion, allCountriesData]);

  return (
    <>
      <header>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 pt-24">
          <Formik
            initialValues={{ searchQuery: "", selectedRegion: "" }} // Kept for Formik structure, but not primary source of truth for filtering
            // onSubmit is not strictly needed here as filtering happens on change
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
            }}
          >
            {() => ( // Removed 'values' from here as we use component state
              <Form className="flex items-start sm:items-center justify-between gap-[0.8lh] flex-col sm:flex-row">
                <div className="relative">
                  <Field
                    type="text"
                    name="searchQuery" // Name still useful for Formik's internal handling if needed, or for accessibility
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a country..."
                    className="relative shadow-md rounded py-[0.8ch] px-16 placeholder:text-[0.875rem] text-inputLight dark:bg-elementsDark dark:placeholder:text-white dark:text-white focus:outline-0 w-full sm:w-auto"
                  />
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500 dark:text-white" />
                </div>

                <div className="relative grid">
                  <Field
                    as="select"
                    name="selectedRegion" // Name still useful
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="focus:outline-0 w-full shadow-lg appearance-none rounded-md pl-6 pr-10 py-2 dark:bg-elementsDark"
                  >
                    <option
                      value=""
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Filter by Region
                    </option>
                    <option
                      value="Africa"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Africa
                    </option>
                    <option
                      value="Americas"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Americas
                    </option>
                    <option
                      value="Asia"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Asia
                    </option>
                    <option
                      value="Europe"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Europe
                    </option>
                    <option
                      value="Oceania"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Oceania
                    </option>
                    <option
                      value="Polar"
                      className="dark:text-white text-[0.875rem] text-textLight"
                    >
                      Polar
                    </option>
                  </Field>
                  <BiChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-gray-500 dark:text-white sm:size-4"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </header>
      <Homepage countries={filteredCountries} />
    </>
  );
};

export default memo(HomepageLayout);
