import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer"; 


export default defineConfig({
  base: "/rest-countries-api-with-color-theme-switcher-master/",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }), 
  ],
  build: {
    sourcemap: true,
  },
});
