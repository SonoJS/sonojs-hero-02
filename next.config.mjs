const rawBase =
  process.env.BASE_PATH ?? process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

const isStandalone = process.env.BUILD_STANDALONE === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isStandalone
    ? {
        // Docker / Node server build
        output: "standalone",
      }
    : {
        // Static export for GitHub Pages (and local `out/`)
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        ...(basePath
          ? {
              basePath,
              assetPrefix: basePath,
            }
          : {}),
      }),
};

export default nextConfig;
