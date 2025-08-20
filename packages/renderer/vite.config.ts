import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        home: resolve(__dirname, "home.html"),
      },
    },
  },
  plugins: [react()],
  server: {
    port: 8163,
  },
});
