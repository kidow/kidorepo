import { type Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Admin | kidow'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
