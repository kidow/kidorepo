import { type Metadata } from 'next'

import './globals.css'

import { ThemeProvider } from 'components'

export const metadata: Metadata = {
  title: 'Archive | kidow'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
