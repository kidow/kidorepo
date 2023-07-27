'use client'

import Link from 'next/link'
import { useMDXComponent } from 'next-contentlayer/hooks'

interface Props {
  code: string
}

const components: any = {
  a: ({ href, children }) => (
    <Link href={href as string} target="_blank">
      {children}
    </Link>
  )
}

export default function MDXComponent({ code }: Props) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={components} />
}
