'use client'

import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { EditorContent, useEditor } from '@tiptap/react'
import classnames from 'classnames'
import { useDebouncedCallback } from 'use-debounce'

import { EditorBubbleMenu } from './bubble-menu'
import { TiptapExtensions } from './extensions'
import { TiptapEditorProps } from './props'
import { useLocalStorage } from './use-local-storage'

const cal = localFont({
  src: './CalSans-SemiBold.otf',
  variable: '--font-display'
})

const inter = Inter({
  variable: '--font-default',
  subsets: ['latin']
})

export default function Editor() {
  const [content, setContent] = useLocalStorage('content', {
    type: 'doc',
    content: [{ type: 'paragraph' }]
  })
  const [saveStatus, setSaveStatus] = useState('저장됨')
  const [hydrated, setHydrated] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON()
    setSaveStatus('저장 중...')
    setContent(json)
    setTimeout(() => {
      setSaveStatus('저장됨')
    }, 500)
  }, 750)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus('작성 중...')
      debouncedUpdates(e)
    },
    autofocus: 'end'
  })

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])
  return (
    <div
      className={classnames(
        'prose relative min-h-[500px] pb-80',
        cal.variable,
        inter.variable
      )}
    >
      <h1>메모</h1>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="rounded-lg bg-stone-100 px-2 py-1 text-stone-400">
          {saveStatus}
        </span>
        <button
          onClick={() => editor.commands.clearContent()}
          className="rounded-lg border px-2 py-1 text-stone-500"
        >
          비우기
        </button>
      </div>
    </div>
  )
}
