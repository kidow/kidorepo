import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allContents } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { getToc } from 'services'

import Toc from './toc'

interface Props {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: Props) {
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
  const doc = await getDocFromParams({ params })

  if (!doc) {
    return {}
  }

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
  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

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
        <div
          className="[&>*:last-child]:mb-0 [&>*]:mb-3"
          dangerouslySetInnerHTML={{ __html: doc.body.html }}
        />
      </article>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
            <div className="overflow-auto pb-10">
              <Toc toc={toc} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
