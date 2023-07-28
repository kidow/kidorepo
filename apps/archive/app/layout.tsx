'use client'

import './globals.css'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import Header from './header'
import Sidebar from './sidebar'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
