'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'
import type { NotionComponents } from 'react-notion-x'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.allSettled([
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-markup'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-yaml.js'),
      import('prismjs/components/prism-typescript.js'),
      import('prismjs/components/prism-css.js'),
      import('prismjs/components/prism-javascript.js'),
      import('prismjs/components/prism-json.js'),
      import('prismjs/components/prism-jsx.js'),
      import('prismjs/components/prism-tsx.js')
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

export default function Renderer({ ...props }: any) {
  const components: Partial<NotionComponents> = useMemo(
    () => ({ Code, nextImage: Image, nextLink: Link, Collection }),
    []
  )
  return <NotionRenderer {...props} components={components} />
}
