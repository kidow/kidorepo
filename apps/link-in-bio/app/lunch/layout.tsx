import type { Metadata } from 'next'

const TITLE = '점심 뭐 먹지? | Kidow'

export const metadata: Metadata = {
  title: TITLE,
  openGraph: {
    title: TITLE
  },
  twitter: {
    title: TITLE
  }
}

interface Props extends ReactProps {}

export default function Layout({ children }: Props) {
  return <>{children}</>
}
