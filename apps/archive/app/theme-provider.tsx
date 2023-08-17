'use client'

import { ThemeProvider as Provider } from 'next-themes'

export default function ThemeProvider({ children }: ReactProps) {
  return (
    <Provider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </Provider>
  )
}
