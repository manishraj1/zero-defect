import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // This tells Next to hide the development badge entirely
    buildActivity: false
  }
};

export default nextConfig;