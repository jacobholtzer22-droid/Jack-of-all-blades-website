import { MetadataRoute } from 'next'
import { SERVICE_AREA_SLUGS } from '@/data/serviceAreas'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://jackofallbladeslandscaping.com'
  const serviceAreaUrls: MetadataRoute.Sitemap = SERVICE_AREA_SLUGS.map((slug) => ({
    url: `${base}/service-areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/testimonials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...serviceAreaUrls,
  ]
}
