'use client'

import './index.css'

import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Editor } from 'components'
import { Modal } from 'containers'
import dayjs from 'dayjs'
import TextareaAutosize from 'react-textarea-autosize'
import { backdrop, isURL, useObjectState } from 'services'

interface State {
  title: string
  description: string
  content: object
  tags: string
  coverUrl: string
  isOpen: boolean
  isPublished: boolean
  createdAt: string
}

export default function Page({ params }: { params: { id: string } }) {
  const [
    {
      title,
      description,
      content,
      tags,
      coverUrl,
      isOpen,
      isPublished,
      createdAt
    },
    setState,
    onChange
  ] = useObjectState<State>({
    title: '',
    description: '',
    content: {
      type: 'doc',
      content: [{ type: 'paragraph' }]
    },
    tags: '',
    coverUrl: '',
    isOpen: false,
    isPublished: false,
    createdAt: ''
  })
  const supabase = createClientComponentClient<Database>()
  const { replace } = useRouter()

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
    setState({
      title: data.title || '',
      description: data.description || '',
      tags: data.tags.join(', ') || '',
      coverUrl: data.cover_url || '',
      isPublished: data.is_published,
      createdAt: data.created_at || ''
    })
  }

  const tempSave = async () => {
    if (!title || !description) return
    const { data } = await supabase
      .from('posts')
      .insert({
        title,
        description,
        tags: tags.split(', '),
        is_published: false
      })
      .select('id')
      .single()
    replace(`/blog/posts/${data.id}`)
  }

  const publish = async () => {}

  useEffect(() => {
    get()
    window.onbeforeunload = () => 'asd'
    return () => {
      window.onbeforeunload = null
    }
  }, [])
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <TextareaAutosize
          value={title}
          name="title"
          onChange={onChange}
          placeholder="타이틀"
          tabIndex={1}
          minRows={1}
          className="mt-2 w-full flex-1 text-4xl font-bold text-stone-900 xl:text-5xl"
        />
        {!isPublished && (
          <button
            onClick={tempSave}
            className="rounded-md bg-stone-200 px-3 py-2"
          >
            임시 저장
          </button>
        )}
        <button
          onClick={() => setState({ isOpen: true })}
          className="rounded-md bg-stone-200 px-3 py-2"
        >
          배포
        </button>
      </div>
      <main className="xl:w-[820px]">
        <div>
          <TextareaAutosize
            value={description}
            name="description"
            onChange={onChange}
            minRows={2}
            tabIndex={2}
            placeholder="설명"
            className="w-full"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            value={tags}
            name="tags"
            tabIndex={3}
            onChange={onChange}
            placeholder="태그 (쉼표로 구분)"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div className="prose">
          <Editor
            value={content}
            onChange={(content) => setState({ content })}
          />
        </div>
      </main>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setState({ isOpen: false })}
          title="배포"
          maxWidth="max-w-[876px]"
        >
          <div>
            <input
              value={coverUrl}
              onPaste={(e) => {
                const text = e.clipboardData.getData('Text')
                if (isURL(text)) setState({ coverUrl: text })
              }}
              placeholder="커버 이미지 URL"
              autoComplete="off"
              className="w-full rounded-md border px-3 py-2 ring-blue-500 duration-150 focus:ring"
            />
          </div>
          <hr className="my-8" />
          <div className="prose">
            <span className="text-sm text-slate-400">
              {dayjs(createdAt || undefined).format('YYYY년 MM월 DD일')}
            </span>
            <h1 className="mt-2 text-4xl font-bold text-slate-900 xl:text-5xl">
              {title}
            </h1>
            <Image
              src={coverUrl}
              alt="cover"
              width={820}
              height={450}
              className="mt-8 h-[280px] rounded-md border xl:h-[450px]"
            />
            <Editor value={content} onChange={() => {}} readOnly />
          </div>
        </Modal>
      )}
    </>
  )
}
