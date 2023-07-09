import { type Metadata } from 'next'

import './globals.css'

import { ThemeProvider } from 'components'
import { Header } from 'containers'

export const metadata: Metadata = {
  title: 'Archive | kidow'
}

export default function RootLayout({ children }: ReactProps) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                  <div
                    dir="ltr"
                    className="relative h-full overflow-hidden py-6 pl-8 pr-6 lg:py-8"
                  >
                    <div className="h-full w-full overflow-auto">
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                      <h1 className="text-8xl">asd</h1>
                    </div>
                  </div>
                </aside>
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
