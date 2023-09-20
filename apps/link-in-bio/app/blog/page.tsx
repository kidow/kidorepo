import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NotionAPI } from 'notion-client'
import { getAllPagesInSpace, idToUuid } from 'notion-utils'

const api = new NotionAPI()

const TITLE = '블로그 | Kidow'
const DESCRIPTION = '웹 개발자의 이야기들을 다룹니다.'
const BASE_URL = 'https://kidow.me/blog3'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['blog', 'nextjs'],
  alternates: {
    canonical: BASE_URL
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION
  },
  metadataBase: new URL(BASE_URL)
}

async function getList() {
  const list = await getAllPagesInSpace(
    'ac733b2c269c403f85925f83d5ea3c75',
    null,
    async (pageId) => api.getPage(pageId)
  )
  return list
}

export default async function Page() {
  const list = await getList()
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
          블로그
        </h1>
        <Link href="https://legacy.kidow.me" target="_blank">
          <span className="text-lg font-medium text-slate-500 hover:underline">
            이전 블로그
          </span>
        </Link>
      </div>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {Object.entries(list)
          .filter(([id, recordMap]) => {
            if (id === idToUuid('ac733b2c269c403f85925f83d5ea3c75'))
              return false
            const rawMetadata = recordMap.block[id].value
            if (!rawMetadata.properties || !('Ucq>' in rawMetadata.properties))
              return false || process.env.NODE_ENV === 'development'
            const isPublished =
              rawMetadata.properties['Ucq>']?.at(0)?.at(0) === 'Yes'
            return isPublished || process.env.NODE_ENV === 'development'
          })
          .map(([id, recordMap]) => {
            const rawMetadata = recordMap.block[id].value
            const title = rawMetadata.properties?.title?.at(0)?.at(0)
            return (
              <li key={id}>
                <article className="group relative overflow-hidden rounded-[10px] border">
                  <div className="overflow-hidden">
                    <Image
                      src={rawMetadata.format.page_cover}
                      alt="cover"
                      width={390}
                      height={260}
                      priority
                      className="h-[260px] w-full object-cover duration-200 group-hover:scale-125 xl:w-[390px]"
                      style={{ viewTransitionName: `blog-cover-${id}` }}
                    />
                  </div>
                  <div className="space-y-2 p-5 xl:p-6">
                    <h2 className="overflow-hidden text-2xl font-extrabold text-slate-900 xl:h-16">
                      <span className="after:bg-primary relative block after:absolute after:bottom-1 after:left-0 after:h-1.5 after:w-full after:origin-bottom-right after:-translate-x-full after:opacity-50 after:transition-transform after:duration-150 after:content-[''] after:group-hover:translate-x-0">
                        {title}
                      </span>
                    </h2>
                    <p className="line-clamp-2 text-slate-500">
                      {rawMetadata.properties?.PYAs?.at(0)?.at(0) || ''}
                    </p>
                    <time
                      className="text-sm text-slate-400"
                      dateTime={new Date(
                        rawMetadata.created_time
                      ).toISOString()}
                    >
                      {new Intl.DateTimeFormat('ko', {
                        dateStyle: 'long'
                      }).format(rawMetadata.created_time)}
                    </time>
                  </div>
                  <Link href={`/blog/${id}`} className="absolute inset-0">
                    <span className="sr-only">View Article</span>
                  </Link>
                </article>
              </li>
            )
          })}
      </ul>
    </>
  )
}
