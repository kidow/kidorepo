import type { MetadataRoute } from 'next'
import { NotionAPI } from 'notion-client'
import { getAllPagesInSpace, idToUuid } from 'notion-utils'

const api = new NotionAPI()

async function getList() {
  const list = await getAllPagesInSpace(
    'ac733b2c269c403f85925f83d5ea3c75',
    null,
    async (pageId) => api.getPage(pageId)
  )
  return list
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const list = await getList()
  return [
    { url: 'https://dongwook.kim', lastModified: new Date() },
    { url: 'https://dongwook.kim/memo', lastModified: new Date() },
    { url: 'https://dongwook.kim/resume', lastModified: new Date() },
    { url: 'https://dongwook.kim/lunch', lastModified: new Date() },
    { url: 'https://dongwook.kim/blog', lastModified: new Date() },
    ...Object.entries(list)
      .filter(([id, recordMap]) => {
        if (id === idToUuid('ac733b2c269c403f85925f83d5ea3c75')) return false
        const rawMetadata = recordMap.block[id].value
        if (!rawMetadata.properties || !('Ucq>' in rawMetadata.properties))
          return false || process.env.NODE_ENV === 'development'
        const isPublished =
          rawMetadata.properties['Ucq>']?.at(0)?.at(0) === 'Yes'
        return isPublished || process.env.NODE_ENV === 'development'
      })
      .map(([id]) => ({
        url: `https://dongwook.kim/blog/${id}`,
        lastModified: new Date()
      }))
  ]
}
