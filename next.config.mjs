/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable gzip compression for responses (default: true)
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 5184000, // 60 days
  },

  // Cache-Control headers: 1 year for static assets
  async headers() {
    const oneYear = "public, max-age=31536000, immutable";

    return [
      // Images in /public/images/
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      // Built CSS, JS, chunks from Next.js
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      // Optimized images from Next.js Image
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Favicons and PWA icons
      {
        source: "/:path*.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: oneYear }],
      },
      // Manifest and other static JSON
      {
        source: "/manifest.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
