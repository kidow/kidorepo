'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Editor } from 'components'
import TextareaAutosize from 'react-textarea-autosize'
import { backdrop } from 'services'

export default function Page({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [content, setContent] = useState<object>({
    type: 'doc',
    content: [{ type: 'paragraph' }]
  })
  const [tags, setTags] = useState<string[]>([''])
  const [createdAt, setCreatedAt] = useState<string>('')
  const [coverUrl, setCoverUrl] = useState<string>('')
  const supabase = createClientComponentClient<Database>()

  const get = async () => {
    if (params.id === 'create') return
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) {
      console.log('single select error', error)
      return
    }
    console.log('data', data)
  }

  const tempSave = async () => {
    if (!title) return
  }

  const publish = async () => {}

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <TextareaAutosize
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="타이틀"
          minRows={1}
          className="leading-tighter mt-2 w-full flex-1 resize-none text-4xl font-bold text-slate-900 xl:text-5xl"
        />
        <button
          onClick={tempSave}
          className="rounded-md bg-stone-200 px-3 py-2"
        >
          임시 저장
        </button>
        <button onClick={publish} className="rounded-md bg-stone-200 px-3 py-2">
          배포
        </button>
      </div>
      <main className="xl:w-[820px]">
        <Editor value={content} onChange={(content) => setContent(content)} />
      </main>
    </>
  )
}
