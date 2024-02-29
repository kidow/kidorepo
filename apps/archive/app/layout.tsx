import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { allContents } from 'contentlayer/generated'
import { GithubIcon, HomeIcon } from 'lucide-react'
import { Backdrop, Toast } from 'ui'

import CommandMenu from './command-menu'
import Drawer from './drawer'
import HeaderNav from './header-nav'
import HeaderTheme from './header-theme'
import Sidebar from './sidebar'
import ThemeProvider from './theme-provider'

const inter = Inter({
  subsets: ['latin']
})

const TITLE = '아카이브 | Kidow'
const DESCRIPTION = '웹 프론트엔드 개발자의 노하우를 담은 코드 저장소입니다.'
const BASE_URL = 'https://archive.dongwook.kim'

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
  verification: {
    google: 'iOZSvTkUwxiTVHLqRigAXocT03NlO-xG1ZbAzbVwYC4',
    other: {
      'naver-site-verification': '6988bbde1b7649b60d5489d2a0154d5ff5d2fc3f'
    }
  },
  metadataBase: new URL(BASE_URL)
}

export default function RootLayout({ children }: ReactProps) {
  const allLinks: LinkItem['items'] = allContents.map((item) => ({
    title: item.title,
    slug: item.slug
  }))
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-20 w-full border-b bg-white dark:border-neutral-800 dark:bg-neutral-950">
              <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
                <div className="flex items-center gap-6">
                  <Link href="/">
                    <span className="font-bold dark:text-neutral-50">
                      kidow/archive
                    </span>
                  </Link>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <HeaderNav allLinks={allLinks} />
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <CommandMenu allLinks={allLinks} />
                  <div className="flex items-center gap-4">
                    <Drawer allLinks={allLinks} />
                    <Link
                      href="https://dongwook.kim"
                      target="_blank"
                      className="hidden md:inline-block"
                    >
                      <HomeIcon
                        size={24}
                        className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                      />
                    </Link>
                    <Link
                      href="https://github.com/kidow/kidorepo/tree/main/apps/archive"
                      target="_blank"
                      className="hidden md:inline-block"
                    >
                      <GithubIcon
                        size={24}
                        className="text-neutral-500 duration-150 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-50"
                      />
                    </Link>
                    <HeaderTheme />
                  </div>
                </div>
              </div>
            </header>
            <div className="flex-1">
              <div className="container flex-1">
                <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
                  <Sidebar allLinks={allLinks} />
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
          <Toast.v2 />
          <Backdrop.v1 />
        </ThemeProvider>
      </body>
    </html>
  )
}
