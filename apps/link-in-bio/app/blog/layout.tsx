import { type Metadata } from 'next'

const TITLE = 'BLOG | Kidow'
const DESCRIPTION = '웹 개발자의 이야기들을 다룹니다.'
const BASE_URL = 'https://kidow.me/blog'

export const metadata: Metadata = {
  title: 'BLOG | Kidow',
  description: DESCRIPTION,
  keywords: ['blog', 'nextjs'],
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION
  },
  metadataBase: new URL(BASE_URL)
}

export default function Layout({ children }: ReactProps) {
  return <>{children}</>
}
