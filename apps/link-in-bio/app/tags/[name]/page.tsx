import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Client } from '@notionhq/client'

import Post from '@/components/Post'

export const revalidate = 60 * 60 * 24 * 7

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export function generateMetadata({
  params
}: {
  params: { name: string }
}): Metadata {
  const TITLE = `태그 - ${params.name} | Kidow`
  return {
    title: TITLE,
    keywords: [params.name, 'kidow'],
    openGraph: {
      title: TITLE
    },
    twitter: {
      title: TITLE
    }
  }
}

async function getData(name: string) {
  const data = (await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    filter: { property: '태그', multi_select: { contains: name } }
  })) as unknown as NotionList
  return data
}

export default async function Page({ params }: { params: { name: string } }) {
  const { results } = await getData(params.name)
  if (!results.length) redirect('/blog')
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
        # {params.name}
      </h1>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {results.map((item) => (
          <Post {...item} key={item.id} />
        ))}
      </ul>
    </>
  )
}
