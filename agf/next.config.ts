import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/book-visit',
        destination: '/book-a-visit',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
