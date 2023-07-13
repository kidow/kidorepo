import Footer from '@/components/Footer'
import Header from '@/components/Header'

import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import ToastProvider from './toaster'

const inter = Inter({
  subsets: ['latin']
})

const TITLE = 'Kidow'
const DESCRIPTION = '비즈니스에 관심이 많은 웹 개발자'
const BASE_URL = 'https://kidow.me'

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE
  },
  description: DESCRIPTION,
  applicationName: 'Link in bio',
  generator: 'Next.js',
  keywords: [
    'kidow',
    'link-in-bio',
    'next.js',
    'bento.me',
    'resume',
    'blog',
    'google-analytics',
    'spotify',
    'google-calendar',
    'google-meet',
    'giphy',
    'github',
    'gmail',
    'kakao-map',
    'twitter',
    'linkedin',
    'gumroad',
    'buymeacoffee',
    'producthunt',
    'tistory',
    'disquiet',
    'memo'
  ],
  themeColor: '#dffc03',
  creator: 'kidow',
  publisher: 'Dongwook Kim',
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
    creator: '@__kidow__',
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
        <Script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c0986f45ad519044d2574ac8091cb572&libraries=services&autoload=false"
          async
        />
      </head>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex min-h-screen w-full max-w-[1728px] flex-col">
            <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
              <Header />
              <div className="flex h-full w-full max-w-[428px] flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16">
                <div className="mb-10 flex flex-col px-4 xl:mb-0 xl:mr-20 xl:flex-1 xl:px-0" />
                <div className="relative flex-1 xl:w-[820px] xl:flex-none">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <ToastProvider />
      </body>
    </html>
  )
}
