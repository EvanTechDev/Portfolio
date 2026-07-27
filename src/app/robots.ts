import { MetadataRoute } from 'next'
import { DATA } from '@/data/resume'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/'],
      }
    ],
    sitemap: `${DATA.url}/sitemap.xml`,
    host: DATA.url,
  }
}
