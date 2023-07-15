'use client'

import { Analytics } from '@vercel/analytics/react'
import classnames from 'classnames'
import { Toaster } from 'sonner'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex min-h-screen w-full max-w-[1728px] flex-col">
            <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
              <Header />
              <div
                className={classnames(
                  'flex h-full w-full max-w-prose flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16'
                )}
              >
                <div className="mb-10 flex flex-col px-4 xl:mb-0 xl:mr-20 xl:flex-1 xl:px-0" />
                <div className="relative flex-1 xl:w-[820px] xl:flex-none">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
        <Toaster position="top-center" richColors closeButton />
        <Analytics />
      </body>
    </html>
  )
}
