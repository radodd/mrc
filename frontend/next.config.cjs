/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzlauufqbyfqfivbiipg.supabase.co",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "https://mrc-two.vercel.app",
  },
};

module.exports = nextConfig;
// export default nextConfig;
