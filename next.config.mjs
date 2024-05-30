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

export default nextConfig;
