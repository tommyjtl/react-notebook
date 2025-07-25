import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Uncomment the line below to change the output directory name
  // distDir: 'build'
};

export default nextConfig;
