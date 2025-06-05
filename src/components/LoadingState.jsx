import React from "react";
import Navbar from "./Navbar";

const LoadingState = ({ message }) => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24 text-center dark:text-white">
        {message}
      </div>
    </>
  );
};

export default React.memo(LoadingState);
