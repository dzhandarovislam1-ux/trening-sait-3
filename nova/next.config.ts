import type { NextConfig } from "next";

// On GitHub Pages the site lives at /<repo-name>; locally it lives at /.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
