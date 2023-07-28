import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

export const revalidate = 60 * 60 * 24

function isUUID(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    uuid
  )
}

// export async function generateMetadata({
//   params: { slug }
// }: {
//   params: { slug: string[] }
// }): Promise<Metadata> {
//   if (slug.length !== 2 && slug[0] !== 'wiki' && slug[0] !== 'algorithm')
//     notFound()

//   const id = slug[1]
//   if (!isUUID(id)) notFound()

//   const data = await notion.pages.retrieve({ page_id: id })

//   return {}
// }

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div>
      <h2>{JSON.stringify(params.slug)}</h2>
    </div>
  )
}
