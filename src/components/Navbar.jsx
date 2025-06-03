import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { IoMoonOutline } from "react-icons/io5";

function Navbar() {
  const [toggleTheme, setToggleTheme] = useState(() => {
    // Check localStorage first, then fallback to system or default
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (toggleTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [toggleTheme]);
  return (
    <nav className="shadow-sm fixed w-full z-30 bg-white dark:bg-elementsDark">
      <div className="max-w-6xl mx-auto py-3 px-4 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-3xl font-800">
          Where in the world?
        </Link>
        <Button
          icon={<IoMoonOutline size={24}/>}
          text="Dark mode"
          onClick={() => setToggleTheme((prev) => !prev)}
        />
      </div>
    </nav>
  );
}

export default memo(Navbar);
