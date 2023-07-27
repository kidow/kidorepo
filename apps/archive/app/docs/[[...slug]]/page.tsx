import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allContents } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getToc } from 'services'

import MDXComponent from './mdx-component'
import Toc from './toc'

interface Props {
  params: {
    slug: string[]
  }
}

function getDocFromParams({ params }: Props) {
  const slug = params.slug?.join('/') || ''
  const doc = allContents.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    null
  }

  return doc
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allContents.map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = getDocFromParams({ params })

  if (!doc) notFound()

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: `https://archive.kidow.me${doc.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      creator: '@kidow'
    }
  }
}

export default async function Page({ params }: Props) {
  const doc = getDocFromParams({ params })

  if (!doc) notFound()

  const toc = await getToc(doc.body.raw)
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <article className="mx-auto w-full min-w-0">
        <div className="mb-8 text-center">
          <time dateTime={doc.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(doc.date), 'LLLL d, yyyy')}
          </time>
          <h1 className="text-3xl font-bold">{doc.title}</h1>
        </div>
        <MDXComponent code={doc.body.code} />
      </article>
      {doc.toc && <Toc toc={toc} />}
    </main>
  )
}
