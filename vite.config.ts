import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const frameAncestors = "frame-ancestors 'self' https://www.songchainn.xyz https://songchainn.xyz";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: false,
    headers: {
      "Content-Security-Policy": frameAncestors,
    },
  },
  preview: {
    headers: {
      "Content-Security-Policy": frameAncestors,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
