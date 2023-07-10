import { type Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Admin | kidow',
  robots: 'noindex, nofollow'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
