import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/rest-countries-api-with-color-theme-switcher-master/">
      <App />
    </BrowserRouter>
  </StrictMode>
);