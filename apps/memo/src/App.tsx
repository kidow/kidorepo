import { useEffect, useRef } from 'react'
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'
import { Eraser, Github } from 'lucide-react'

function App() {
  const ref = useRef<EditorJS>()

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: '아무 내용이나 입력하세요...',
      autofocus: true,
      onChange: async () => {
        const content = await editor.save()
        window.localStorage.setItem('content', JSON.stringify(content))
      },
      data:
        (JSON.parse(
          window.localStorage.getItem('content') as string
        ) as OutputData) || undefined,
      tools: {
        header: Header,
        image: SimpleImage,
        list: List,
        checklist: Checklist,
        table: Table,
        code: Code,
        Marker: Marker,
        inlineCode: InlineCode
      },
      onReady: () => {
        console.log('Editor.js is ready to work!')
        ref.current = editor
      }
    })
    return () => {
      ref.current?.destroy()
      ref.current = undefined
    }
  }, [])
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div id="editorjs" className="prose min-h-[500px]" />
      </div>
      <div className="hidden md:block">
        <div className="fixed right-2 top-2 z-10">
          <div className="flex gap-2">
            <button
              onClick={() => {
                ref.current?.clear()
                ref.current?.focus()
              }}
              className="buttons"
            >
              <Eraser size={16} />
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://github.com/kidow/kidorepo/tree/main/apps/memo'
                )
              }
              className="buttons"
            >
              <Github size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
