/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    domains: ['s.yimg.com'],
  },
  async rewrites() {
    return [
      {
        source: `/moya/api/globalnews/:id`,
        destination: `${process.env.NEXT_PUBLIC_MOYA_SERVER}/globalnews?id=:id&token=${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    ];
  },
};

module.exports = nextConfig;
