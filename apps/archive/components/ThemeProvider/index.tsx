'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({ children }: ReactProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
