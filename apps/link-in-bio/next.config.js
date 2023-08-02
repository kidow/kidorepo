/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['ui', 'utils'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'illustrations.popsy.co' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/archive',
        destination: 'https://archive.kidow.me',
        permanent: true
      },
      {
        source: '/workshop',
        destination: 'https://workshop.kidow.me',
        permanent: true
      }
    ]
  }
}
