'use client'

import { memo, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

function Comment() {
  const ref = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    const theme = resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'
    const giscusEl: HTMLIFrameElement = ref.current.querySelector(
      'iframe.giscus-frame'
    )

    const createGiscus = () => {
      const script = document.createElement('script')
      const attributes = {
        src: 'https://giscus.app/client.js',
        'data-repo': 'kidow/kidorepo',
        'data-repo-id': 'R_kgDOJ26JBA',
        'data-category': 'General',
        'data-category-id': 'DIC_kwDOJ26JBM4CYLwk',
        'data-mapping': 'title',
        'data-strict': '0',
        'data-reactions-enabled': '1',
        'date-emit-metadata': '0',
        'data-input-position': 'bottom',
        'data-theme': theme,
        'data-lang': 'ko',
        'data-loading': 'lazy',
        crossorigin: 'anonymous',
        async: 'true'
      }
      Object.entries(attributes).forEach(([key, value]) =>
        script.setAttribute(key, value)
      )
      ref.current?.appendChild(script)
    }

    const postThemeMessage = () => {
      giscusEl.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      )
    }

    giscusEl ? postThemeMessage() : createGiscus()
  }, [resolvedTheme])
  return <div ref={ref} className="mt-10" />
}

export default memo(Comment)
