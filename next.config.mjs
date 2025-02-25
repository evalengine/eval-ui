/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["twitter-api-v2"],
  rewrites: async () => {
    return [
      {
        source: "/eval-proxy/:path*",
        destination: "https://api.evalengine.ai/:path*",
      },
      // {
      //   source: "/benchmark-proxy/:path*",
      //   destination: "http://134.209.109.74:8008/:path*",
      // },
    ];
  }
};

export default nextConfig;
