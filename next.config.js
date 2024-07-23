/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = {
  i18n: {
    locales: ['en', 'fi'],
    defaultLocale: 'en',
  },
};
module.exports = nextConfig;
