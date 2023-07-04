import { useEffect } from 'react'
import Checklist from '@editorjs/checklist'
import Code from '@editorjs/code'
import EditorJS, { type OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import SimpleImage from '@editorjs/simple-image'
import Table from '@editorjs/table'

function App() {
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
      }
    })
  }, [])
  return (
    <>
      <div id="editorjs" />
    </>
  )
}

export default App
