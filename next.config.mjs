const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
      },
    ],
  },
  trailingSlash: true,
  reactStrictMode: false,
};

export default nextConfig;
