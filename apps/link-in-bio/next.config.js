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
    ],
    domains: [
      'i.scdn.co',
      'illustrations.popsy.co',
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      'abs.twimg.com',
      's3.us-west-2.amazonaws.com',
      'transitivebullsh.it',
      'i.imgur.com'
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  async redirects() {
    return [
      {
        source: '/archive',
        destination: 'https://archive.dongwook.kim',
        permanent: true
      },
      {
        source: '/workshop',
        destination: 'https://workshop.dongwook.kim',
        permanent: true
      }
    ]
  },
  staticPageGenerationTimeout: 300
}
