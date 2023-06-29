/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
module.exports = {
  async rewrites() {
    return [
      {
        source: '/detail/:newsId',
        destination: '/[newsId]',
      },
    ];
  },
};
