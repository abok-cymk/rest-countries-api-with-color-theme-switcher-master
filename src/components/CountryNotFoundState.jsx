import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { memo } from "react";

const CountryNotFoundState = () => {
  const navigate = useNavigate();
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
};

export default memo(CountryNotFoundState);
