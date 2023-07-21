import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export async function GET(req: Request) {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  async function getData(id: string) {
    let isFirst = true
    let nextCursor: string
    let data: BlockObjectResponse[] = []

    while (isFirst || nextCursor) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: id,
        start_cursor: nextCursor
      })
      nextCursor = next_cursor
      if (isFirst) isFirst = false

      data.push(...(results as BlockObjectResponse[]))
    }

    return data
  }

  const list = await getData(id)
  return NextResponse.json(list)
}
