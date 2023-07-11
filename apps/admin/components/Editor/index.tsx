'use client'

import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import classnames from 'classnames'

import { EditorBubbleMenu } from './bubble-menu'
import { TiptapExtensions } from './extensions'
import { TiptapEditorProps } from './props'

const cal = localFont({
  src: './CalSans-SemiBold.otf',
  variable: '--font-display'
})

const inter = Inter({
  variable: '--font-default',
  subsets: ['latin']
})

interface Props {
  value: JSONContent
  onChange: (value: JSONContent) => void
  readOnly?: boolean
}

export default function Editor({ value, onChange, readOnly }: Props) {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      onChange(e.editor.getJSON())
    },
    autofocus: 'end'
  })

  useEffect(() => {
    if (editor) editor.commands.setContent(value)
  }, [editor])

  useEffect(() => {
    if (readOnly && editor) editor.setEditable(false)
  }, [readOnly, editor])
  return (
    <div
      className={classnames(
        'relative min-h-[500px]',
        cal.variable,
        inter.variable
      )}
    >
      {editor && !readOnly && <EditorBubbleMenu editor={editor} />}
      <EditorContent tabIndex={4} editor={editor} />
    </div>
  )
}
