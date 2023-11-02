import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET(req: Request) {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const url = new URL(req.url)
  const cursor = url.searchParams.get('cursor') || undefined

  const data = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 20,
    start_cursor: cursor,
    filter: { property: '배포', checkbox: { equals: true } }
  })
  return NextResponse.json(data)
}
