/** @type {import('next').NextConfig} */
const nextConfig = {
  // module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzlauufqbyfqfivbiipg.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // experimental: { appDir: true },
  async rewrites() {
    return [
      {
        source: "/api/products", // Frontend path
        destination: "https://mrc-two.vercel.app/api/products", // Backend API endpoint
      },
    ];
  },
};

module.exports = nextConfig;
// export default nextConfig;
// reactStrictMode: true,
// env: {
//   NEXT_PUBLIC_BASE_URL:
//     process.env.NEXT_PUBLIC_BASE_URL || "https://mrc-two.vercel.app",
// },
// module.exports = nextConfig;
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_BASE_URL:
//       process.env.NEXT_PUBLIC_BASE_URL || "https://mrc-two.vercel.app",
//   },
// };
