const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'illustrations.popsy.co' }]
  }
}

module.exports = withContentlayer(nextConfig)
