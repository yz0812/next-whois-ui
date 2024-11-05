/** @type {import('next').NextConfig} */

import setupPWA from 'next-pwa';
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  
  webpack: (config) => {
    config.cache = false;
    return config;
  },

  // 启用 SWC 压缩以减少构建后的文件体积
  swcMinify: true,
};

const withPWA = setupPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/manifest\.json$/, /_next\/data/, /_next\/static/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*\.(css|js|woff2)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'assets-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      }
    },
  ],
});

export default withPWA(nextConfig);
