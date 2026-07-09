import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    dyadComponentTagger(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["robots.txt", "app-logo.png"],
      manifest: {
        name: "Ligtas CamNorte",
        short_name: "Ligtas",
        description: "Family Preparedness Plan for Camarines Norte",
        theme_color: "#f59e0b",
        icons: [
          {
            src: "app-logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "app-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
