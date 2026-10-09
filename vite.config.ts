import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    ...(process.env.NETLIFY ? [netlify()] : [nitro({ preset: "vercel" })]),
    tailwindcss(),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
