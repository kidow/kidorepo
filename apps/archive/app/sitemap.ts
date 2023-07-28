import type { MetadataRoute } from 'next'
import { allContents } from 'contentlayer/generated'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return allContents.map(({ slug }) => ({
    url: 'https://archive.kidow.me' + slug,
    lastModified: new Date()
  }))
}
