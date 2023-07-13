/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'illustrations.popsy.co' }
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
      // {
      //   source: '/blog',
      //   destination: 'https://legacy.kidow.me',
      //   basePath: false,
      //   permanent: false
      // }
    ]
  }
}
