import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Client } from '@notionhq/client'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

import Pagination from '@/components/Pagination'
import Post from '@/components/Post'

export const revalidate = 60 * 60 * 24 * 7

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export function generateMetadata({
  params
}: {
  params: { name: string }
}): Metadata {
  const name = decodeURI(params.name)
  const TITLE = `태그 - ${name} | Kidow`
  return {
    title: TITLE,
    keywords: [name, 'kidow'],
    openGraph: {
      title: TITLE
    },
    twitter: {
      title: TITLE
    }
  }
}

async function getData(name: string) {
  let filter: WithAuth<QueryDatabaseParameters>['filter'] = {
    property: '태그',
    multi_select: { contains: name }
  }
  if (process.env.NODE_ENV === 'production') {
    filter = {
      and: [
        { property: '태그', multi_select: { contains: name } },
        { property: '배포', checkbox: { equals: true } }
      ]
    }
  }

  const data = (await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    filter: { property: '태그', multi_select: { contains: name } }
  })) as unknown as BlogList
  return data
}

export default async function Page({ params }: { params: { name: string } }) {
  const name = decodeURI(params.name)
  const { results, next_cursor } = await getData(name)
  if (!results.length) redirect('/blog')
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight xl:text-5xl">
        # {name}
      </h1>
      <hr className="my-8" />
      <ul className="grid gap-6 xl:grid-cols-2 xl:gap-10">
        {results.map((item) => (
          <Post {...item} key={item.id} />
        ))}
        <Pagination nextCursor={next_cursor} tag={name} />
      </ul>
    </>
  )
}
