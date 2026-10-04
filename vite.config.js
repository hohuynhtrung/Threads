import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    // Custom plugin tự động chèn /Threads/ cho các link thiếu từ Backend email
    {
      name: "redirect-missing-base",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url.startsWith("/verify-email") ||
            req.url.startsWith("/reset-password")
          ) {
            res.writeHead(302, { Location: `/Threads${req.url}` });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/Threads/",
});
