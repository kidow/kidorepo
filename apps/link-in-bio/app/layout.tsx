import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

const TITLE = 'Kidow'
const DESCRIPTION = '비즈니스에 관심이 많은 웹 개발자'
const BASE_URL = 'https://kidow.me'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'Link in bio',
  generator: 'Next.js',
  keywords: ['kidow', 'link-in-bio', 'next.js', 'bento.me'],
  themeColor: '#dffc03',
  creator: 'kidow',
  publisher: 'Vercel',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    creator: '__kidow__',
    card: 'summary_large_image'
  },
  verification: {
    google: 'dpMF3-oHfMYFVkjgJpIJSGM_W_aL_gSFFnmWHM90NHU',
    other: {
      'naver-site-verification': '6aad57e80bc0cb85f4d497fde9a243497dfa5a3d'
    }
  },
  category: 'Link-in-Bio',
  metadataBase: new URL(BASE_URL)
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko" className={inter.className}>
      <head>
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c0986f45ad519044d2574ac8091cb572&libraries=services,clusterer&autoload=false"
        />
        <link
          rel="stylesheet"
          href="node_modules/react-github-contribution-calendar/default.css"
          type="text/css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
