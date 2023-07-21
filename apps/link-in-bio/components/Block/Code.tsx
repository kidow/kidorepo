'use client'

import { useEffect, type FC } from 'react'
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import hljs from 'highlight.js'
import mermaid from 'mermaid'

import 'highlight.js/styles/github-dark.css'

export interface Props extends CodeBlockObjectResponse {}

const Code: FC<Props> = (block) => {
  useEffect(() => {
    if (block.code.language === 'mermaid') {
      mermaid.initialize({})
      mermaid.contentLoaded()
    } else {
      hljs.highlightAll()
    }
  }, [])

  if (block.code.language === 'mermaid')
    return (
      <div className="mermaid [&>svg]:mx-auto">
        {block.code.rich_text[0].plain_text}
      </div>
    )
  return (
    <pre>
      <code
        className={`language-${block.code.language} !bg-transparent !p-0 !text-inherit`}
      >
        {block.code.rich_text.map((item, key) => (
          <span key={key}>{item.plain_text}</span>
        ))}
      </code>
    </pre>
  )
}

export default Code
