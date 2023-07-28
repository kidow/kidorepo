import type { MetadataRoute } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

async function* getList() {
  let isFirst = true
  let nextCursor: string

  while (isFirst || nextCursor) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      start_cursor: nextCursor,
      filter: { property: '배포', checkbox: { equals: true } }
    })
    nextCursor = next_cursor
    if (isFirst) isFirst = false

    yield results
  }
}

async function getPostIds() {
  let results = []
  for await (const arr of getList()) {
    results.push(...arr)
  }
  return results
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostIds()
  return [
    { url: 'https://kidow.me', lastModified: new Date() },
    { url: 'https://kidow.me/memo', lastModified: new Date() },
    { url: 'https://kidow.me/resume', lastModified: new Date() },
    { url: 'https://kidow.me/lunch', lastModified: new Date() },
    { url: 'https://kidow.me/blog', lastModified: new Date() },
    ...posts.map((item) => ({
      url: `https://kidow.me/blog/${item.id}`,
      lastModified: new Date()
    }))
  ]
}
