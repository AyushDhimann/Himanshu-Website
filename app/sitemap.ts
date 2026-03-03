/**
 * sitemap.ts — app/sitemap.ts
 *
 * Next.js generates /sitemap.xml from this file at build time.
 *
 * WHAT IS A SITEMAP?
 * An XML file that lists every page on your site with extra hints
 * for search engines — when it was last updated, how often it changes,
 * and how important it is relative to other pages (priority).
 *
 * WHY DOES IT MATTER?
 * Without a sitemap, Google discovers your pages by following links.
 * With a sitemap, you hand Google a complete map upfront — pages get
 * indexed faster and more reliably. It's especially important when
 * you add new content (new cars, new pages).
 *
 * HOW TO SUBMIT IT:
 * 1. Go to Google Search Console (search.google.com/search-console)
 * 2. Add your property (himanshudhiman.website)
 * 3. Go to Sitemaps → paste: https://himanshudhiman.website/sitemap.xml
 * 4. Google will start crawling immediately
 *
 * ADDING MORE PAGES:
 * If you create a car detail page at /cars/[slug] in the future,
 * add an entry here for each car. Example:
 *
 *   import carsData from '@/data/cars.json'
 *   ...
 *   ...carsData.cars.map((car) => ({
 *     url: `https://himanshudhiman.website/cars/${encodeURIComponent(car.name)}`,
 *     lastModified: new Date(),
 *     changeFrequency: 'monthly' as const,
 *     priority: 0.7,
 *   }))
 *
 * MetadataRoute.Sitemap is Next.js's TypeScript type for the return value.
 */

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      /*
       * The homepage — the most important URL on the site.
       *
       * changeFrequency: 'weekly' — tells crawlers to re-check weekly.
       *   This is honest: the car collection gets updated occasionally.
       *   Don't set this to 'always' or 'hourly' unless you're literally
       *   updating the page that often — crawlers will distrust your sitemap.
       *
       * priority: 1.0 — the max (range is 0.0–1.0).
       *   This is only meaningful relative to other pages on YOUR site.
       *   It does not affect how Google ranks you vs other websites.
       *
       * lastModified: new Date() — the current build time.
       *   For a static site, the content changes when you redeploy,
       *   so using the build time is accurate.
       */
      url:             'https://himanshudhiman.website',
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        1.0,
    },
  ]
}
