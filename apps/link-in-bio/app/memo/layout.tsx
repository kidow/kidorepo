import { type Metadata } from 'next'

import './index.css'

interface Props extends ReactProps {}

const TITLE = 'MEMO | Kidow'
const DESCRIPTION =
  '새로고침해도 내용이 사라지지 않는 메모장입니다. LocalStorage를 사용합니다.'
const BASE_URL = 'https://kidow.me/memo'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['memo', 'tiptap', 'novel'],
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

export default function Layout({ children }: Props) {
  return <>{children}</>
}
