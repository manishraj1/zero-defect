import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // Moves any potential dev badge into the upper corner out of your logo's layout bounding box
    position: "top-right"
  }
};

export default nextConfig;