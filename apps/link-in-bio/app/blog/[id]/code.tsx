'use client'

import { useEffect, type FC } from 'react'
import { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import hljs from 'highlight.js'

import 'highlight.js/styles/github.css'

export interface Props extends CodeBlockObjectResponse {}

const Code: FC<Props> = (block) => {
  console.log('block.code', block.code)
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  if (block.code.language === 'mermaid') return <>mermaid</>
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
