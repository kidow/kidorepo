import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { allContents } from 'contentlayer/generated'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { getToc } from 'services'

import Comment from './comment'
import MDXComponent from './mdx-component'
import Toc from './toc'

interface Props {
  params: {
    slug: string[]
  }
}

function getDocFromParams({ params }: Props) {
  const slug = params.slug?.join('/') || ''

  const index = allContents.findIndex((doc) => {
    if (!slug) return doc.slug === '/'
    return doc.slug === `/${slug}`
  })
  const doc = allContents.find((doc) => {
    if (!slug) return doc.slug === '/'
    return doc.slug === `/${slug}`
  })

  if (!doc) notFound()

  return {
    doc: allContents[index],
    prev: index === 0 ? null : allContents[index - 1],
    next: index === allContents.length - 1 ? null : allContents[index + 1]
  }
}

export function generateStaticParams(): Props['params'][] {
  return allContents.map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const { doc } = getDocFromParams({ params })

  if (!doc) notFound()

  return {
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: `https://archive.dongwook.kim${doc.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      creator: '__kidow__'
    }
  }
}

export default async function Page({ params }: Props) {
  const { doc, prev, next } = getDocFromParams({ params })

  if (!doc) notFound()

  const toc = await getToc(doc.body.raw)
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_216px]">
      <article className="mx-auto w-full min-w-0">
        <h1 className="text-4xl font-bold tracking-tight">{doc.title}</h1>
        {doc.description && (
          <p className="mt-2 text-lg text-neutral-400 dark:text-neutral-500">
            {doc.description}
          </p>
        )}
        <MDXComponent code={doc.body.code} />
        <Comment />
        <div className="mt-8 flex items-center justify-between text-sm">
          {prev && (
            <Link
              href={prev.slug}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              <ChevronLeftIcon size={20} />
              <span>{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={next.slug}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
            >
              <span>{next.title}</span>
              <ChevronRightIcon size={20} />
            </Link>
          )}
        </div>
      </article>
      {doc.toc && <Toc toc={toc} />}
    </main>
  )
}
