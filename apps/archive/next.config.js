const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'illustrations.popsy.co' }]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/components/accordion',
        permanent: true
      }
    ]
  }
}

module.exports = withContentlayer(nextConfig)
