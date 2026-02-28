import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://jackofallbladeslandscaping.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://jackofallbladeslandscaping.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://jackofallbladeslandscaping.com/portfolio', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://jackofallbladeslandscaping.com/testimonials', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://jackofallbladeslandscaping.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ]
}
