/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'illustrations.popsy.co' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/archive',
        destination: 'https://legacy.kidow.me/archive/intro',
        basePath: false,
        permanent: false
      }
    ]
  }
}
