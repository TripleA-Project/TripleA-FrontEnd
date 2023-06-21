/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  server: {
    host: '54.180.102.131',
    port: '3000'
  }
};

module.exports = nextConfig;
