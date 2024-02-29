import type { Metadata } from 'next'

import './index.css'

import Editor from '@/components/Editor'

const TITLE = '메모 | Kidow'
const DESCRIPTION =
  '새로고침해도 내용이 사라지지 않는 메모장입니다. LocalStorage를 사용합니다.'
const BASE_URL = 'https://dongwook.kim/memo'

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

export default function Page() {
  return <Editor />
}
