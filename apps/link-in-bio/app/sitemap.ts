import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: 'https://kidow.me', lastModified: new Date() },
    { url: 'https://kidow.me/memo', lastModified: new Date() },
    { url: 'https://kidow.me/resume', lastModified: new Date() },
    { url: 'https://kidow.me/blog', lastModified: new Date() }
  ]
}
