'use client'

import Link from 'next/link'
import { useMDXComponent } from 'next-contentlayer/hooks'

interface Props {
  code: string
}

const components: any = {
  // Override the default <a> element to use the next/link component.
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  // Add a custom component.
  MyComponent: () => <div>Hello World!</div>
}

export default function MDXComponent({ code }: Props) {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={components} />
}
