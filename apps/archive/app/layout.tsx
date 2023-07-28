import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from './header'
import Sidebar from './sidebar'
import ThemeProvider from './theme-provider'

const inter = Inter({
  subsets: ['latin']
})

const TITLE = '아카이브 | Kidow'
const DESCRIPTION = '웹 프론트엔드 개발자의 노하우를 담은 코드 저장소입니다.'
const BASE_URL = 'https://archive.kidow.me'

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: '%s | Kidow'
  },
  description: '웹 프론트엔드 개발자의 노하우를 담은 코드 저장소입니다.',
  keywords: ['archive', 'front-end', 'code', 'algorithm', 'wiki'],
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION
  },
  metadataBase: new URL(BASE_URL)
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              <div className="container flex-1">
                <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                  <Sidebar />
                  {children}
                </div>
              </div>
            </div>
            <footer className="border-t dark:border-neutral-800">
              <div className="container flex h-16 items-center md:h-24">
                <p className="text-sm text-neutral-400">
                  Built by{' '}
                  <a
                    href="https://github.com/kidow"
                    target="_blank"
                    className="underline"
                  >
                    Kidow
                  </a>
                  .
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
