/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/benchmark-proxy/:path*",
        destination: "http://134.209.109.74:8008/:path*",
      },
    ];
  }
};

export default nextConfig;
