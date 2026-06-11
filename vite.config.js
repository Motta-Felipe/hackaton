import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base so the build works under any GitHub Pages subpath.
  base: "./",
  plugins: [react()],
  // Consente di raggiungere il dev server dal browser MCP in Docker.
  server: { allowedHosts: ["host.docker.internal"] },
});
