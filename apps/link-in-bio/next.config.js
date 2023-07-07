/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'illustrations.popsy.co' }
    ]
  }
}
