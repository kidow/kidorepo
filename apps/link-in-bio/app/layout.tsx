'use client'

import classnames from 'classnames'
import { Toaster } from 'sonner'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import './globals.css'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }: ReactProps) {
  const pathname = usePathname()
  return (
    <html lang="ko">
      <head>
        <Script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c0986f45ad519044d2574ac8091cb572&libraries=services&autoload=false"
          async
        />
      </head>
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex min-h-screen w-full max-w-[1728px] flex-col">
            <div className="relative flex min-h-screen w-full flex-1 flex-col items-center">
              <Header />
              <div
                className={classnames(
                  'flex h-full w-full flex-1 flex-col p-6 pt-0 xl:max-w-[1728px] xl:flex-row xl:p-16',
                  pathname.startsWith('/blog/')
                    ? 'max-w-prose'
                    : 'max-w-[428px]'
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
      </body>
    </html>
  )
}
