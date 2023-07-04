import { useEffect } from 'react'
import EditorJS, { type OutputData } from '@editorjs/editorjs'

function App() {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      placeholder: '아무 내용이나 입력하세요...',
      autofocus: true,
      inlineToolbar: true,
      onChange: async () => {
        const content = await editor.save()
        window.localStorage.setItem('content', JSON.stringify(content))
      },
      data:
        (JSON.parse(
          window.localStorage.getItem('content') as string
        ) as OutputData) || undefined
    })
  }, [])
  return (
    <>
      <div id="editorjs" />
    </>
  )
}

export default App
