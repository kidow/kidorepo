import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allContents } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: PageProps) {
  const slug = params.slug?.join('/') || ''
  const doc = allContents.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    null
  }

  return doc
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allContents.map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }))
}
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
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

const PostLayout = async ({ params }: PageProps) => {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-xl py-8">
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
  )
}

export default PostLayout
