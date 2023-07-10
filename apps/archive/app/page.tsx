import Link from 'next/link'
import { allContents, Content } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'

function PostCard(doc: Content) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={doc.slug}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {doc.title}
        </Link>
      </h2>
      <time dateTime={doc.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(doc.date), 'LLLL d, yyyy')}
      </time>
      <div
        className="text-sm [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: doc.body.html }}
      />
    </div>
  )
}

export default function Home() {
  const components = allContents.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )

  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Next.js + Contentlayer Example
      </h1>
      {components.map((doc, idx) => (
        <PostCard key={idx} {...doc} />
      ))}
    </div>
  )
}
