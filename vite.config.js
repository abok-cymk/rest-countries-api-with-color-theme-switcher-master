import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/rest-countries-api-with-color-theme-switcher-master/",
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
  },
});
