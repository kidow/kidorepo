import type { Metadata } from 'next'

const TITLE = 'RESUME | Kidow'
const BASE_URL = 'https://kidow.me/resume'

export const metadata: Metadata = {
  title: TITLE,
  keywords: ['resume'],
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    url: BASE_URL
  },
  twitter: {
    title: TITLE
  },
  metadataBase: new URL(BASE_URL)
}

export default function Layout({ children }: ReactProps) {
  return <div className="prose-sm xl:prose prose-neutral">{children}</div>
}
