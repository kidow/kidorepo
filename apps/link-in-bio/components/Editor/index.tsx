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
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [hydrated, setHydrated] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON()
    setSaveStatus('Saving...')
    setContent(json)
    setTimeout(() => {
      setSaveStatus('Saved')
    }, 500)
  }, 750)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus('Unsaved')
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
        'relative min-h-[500px] pb-80',
        cal.variable,
        inter.variable
      )}
    >
      <div className="absolute -top-12 left-0 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
