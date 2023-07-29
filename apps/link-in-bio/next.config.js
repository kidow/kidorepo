/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'illustrations.popsy.co' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'xsafexolrozevmdgygbn.supabase.co' }
    ]
  }
}
