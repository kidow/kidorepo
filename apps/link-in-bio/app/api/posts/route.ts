import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

export async function GET(req: Request) {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const url = new URL(req.url)
  const cursor = url.searchParams.get('cursor') || undefined
  const tag = url.searchParams.get('tag')

  let filter: WithAuth<QueryDatabaseParameters>['filter'] = undefined
  if (tag && process.env.NODE_ENV === 'production') {
    filter = {
      and: [
        { property: '태그', multi_select: { contains: tag } },
        { property: '배포', checkbox: { equals: true } }
      ]
    }
  } else if (tag) {
    filter = { property: '태그', multi_select: { contains: tag } }
  } else if (process.env.NODE_ENV === 'production') {
    filter = { property: '배포', checkbox: { equals: true } }
  }

  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 20,
    start_cursor: cursor,
    filter
  })
  return NextResponse.json(data)
}
