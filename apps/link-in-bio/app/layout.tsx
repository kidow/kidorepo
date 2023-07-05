import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Kidow',
  description: '더 게으르기 위해 더 열심히 공부하는 개발자입니다.'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
