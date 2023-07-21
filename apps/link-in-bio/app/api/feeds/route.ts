import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET(req: Request) {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const url = new URL(req.url)
  const cursor = url.searchParams.get('cursor') || undefined
  const data = await notion.databases.query({
    database_id: '498cea7e5c4b44ba8b2b13c6a7f9e3d1',
    sorts: [{ property: '생성일', direction: 'descending' }],
    page_size: 10,
    start_cursor: cursor
  })
  return NextResponse.json(data)
}
