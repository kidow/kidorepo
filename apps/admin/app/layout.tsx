import { type Metadata } from 'next'
import { Backdrop } from 'containers'
import { Toaster } from 'sonner'

import './globals.css'

import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Admin | kidow',
  robots: 'noindex, nofollow'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Backdrop />
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}
