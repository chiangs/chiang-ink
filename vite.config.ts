import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      // Inject SW registration automatically — root.tsx manual script can be removed
      injectRegister: "auto",
      // Use existing public/manifest.json — don't let the plugin overwrite it
      manifest: false,
      workbox: {
        // Precache built JS, CSS, HTML, and static assets
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        // Runtime caching for images not in the precache manifest
        runtimeCaching: [
          {
            // Cache-first for portrait + content images
            urlPattern: /\/images\/.*\.(jpe?g|png|webp|svg|avif)(\?.*)?$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache-v1",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
