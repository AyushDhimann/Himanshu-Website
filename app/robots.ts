/**
 * robots.ts — app/robots.ts
 *
 * Next.js generates /robots.txt from this file at build time.
 * No need to create a static file in /public — this is the modern way.
 *
 * WHAT IS robots.txt?
 * It's a plain-text file that tells search engine crawlers (Googlebot,
 * Bingbot, etc.) which pages they're allowed to index and which to skip.
 * Every crawler checks /robots.txt before crawling your site.
 *
 * WHY DOES IT MATTER?
 * Without it, crawlers still index your site — but with it you can:
 *   - Prevent private/admin pages from showing up in search results
 *   - Point crawlers to your sitemap so they find all your pages faster
 *   - Block bad bots (AI scrapers, spam bots, etc.)
 *
 * For this site we want everything indexed, so we allow all crawlers
 * and point them straight to the sitemap.
 *
 * MetadataRoute.Robots is a TypeScript type from Next.js that tells
 * you exactly what fields this function is allowed to return.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        /*
         * userAgent: '*' means "applies to all crawlers".
         * You can add separate rule objects for specific bots, e.g.:
         *   { userAgent: 'GPTBot', disallow: ['/'] }  ← block OpenAI's scraper
         */
        userAgent: '*',
        allow: '/',
      },
    ],

    /*
     * Pointing crawlers to the sitemap helps them discover all your pages
     * faster without having to guess at URLs.
     * This URL must be absolute (full domain included).
     */
    sitemap: 'https://himanshudhiman.website/sitemap.xml',
  }
}
