/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   externalDir: true, // Helps keep Cloudinary available
  // },
  webpack: (config) => {
    config.externals = [...(config.externals || []), "cloudinary"];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;

// res.cloudinary.com"
