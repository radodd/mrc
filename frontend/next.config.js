/** @type {import('next').NextConfig} */
const nextConfig = {
  // module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dzlauufqbyfqfivbiipg.supabase.co",
        pathname: "/storage/v1/object/sign/**",
        // port: "3030",
        // pathname: '/account123/**',
      },
    ],
  },

  // reactStrictMode: true,
  // env: {
  //   NEXT_PUBLIC_BASE_URL:
  //     process.env.NEXT_PUBLIC_BASE_URL || "https://mrc-two.vercel.app",
  // },
};

// module.exports = nextConfig;
export default nextConfig;

// module.exports = {
//   reactStrictMode: true,
//   env: {
//     NEXT_PUBLIC_BASE_URL:
//       process.env.NEXT_PUBLIC_BASE_URL || "https://mrc-two.vercel.app",
//   },
// };
