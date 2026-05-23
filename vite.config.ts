// Tunefield marketing site — Vite config (post-Lovable eject).
// Mirrors the plugin/option set @lovable.dev/vite-tanstack-config used to provide
// (minus the Lovable-only sandbox / hmr-gate / componentTagger / error-logger plugins).
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      server: { entry: "server" },
    }),
    viteReact(),
    // Cloudflare worker bundling only at build time.
    // If we later swap to Vercel, delete this plugin and the @cloudflare/vite-plugin dep.
    ...(command === "build"
      ? [cloudflare({ viteEnvironment: { name: "ssr" } })]
      : []),
  ],
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
}));
