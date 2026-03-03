/**
 * Root Layout — app/layout.tsx
 *
 * Every page in the app is wrapped by this layout.
 * Handles: fonts, metadata (SEO + social sharing), Font Awesome,
 * Vercel Analytics, and Vercel Speed Insights.
 *
 * SERVER COMPONENT — runs on the server, ships zero JavaScript of its own.
 */

import type { Metadata, Viewport } from 'next'
import { Outfit, Space_Grotesk } from 'next/font/google'
import { Analytics }     from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

/* ----------------------------------------------------------------
 * FONTS — self-hosted via next/font
 *
 * next/font downloads font files at BUILD TIME and serves them from
 * your own domain — no request to fonts.googleapis.com at runtime.
 * This means: faster load, better privacy, zero layout shift.
 *
 * Outfit is a VARIABLE FONT — one file contains every weight from
 * 100 (thin) to 900 (black). The Hero text pressure effect exploits
 * this by animating font-variation-settings per character.
 * ---------------------------------------------------------------- */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

/* ----------------------------------------------------------------
 * METADATA — SEO + Social Sharing
 *
 * Next.js turns this object into <title>, <meta>, <link>, and
 * Open Graph tags in the HTML <head>. Defining it here means
 * every page inherits these defaults automatically.
 *
 * metadataBase: REQUIRED when you have absolute URLs (like OG images).
 * Next.js prepends this to any relative URL in the metadata object.
 * Without it, Open Graph images and canonical URLs won't work correctly.
 *
 * Open Graph (og:*) — used by Facebook, WhatsApp, Discord, LinkedIn
 * Twitter cards    — used by X/Twitter when someone pastes your link
 * ---------------------------------------------------------------- */
export const metadata: Metadata = {
  /*
   * metadataBase — the production URL of the site.
   * All relative paths in this metadata object will resolve from here.
   */
  metadataBase: new URL('https://himanshudhiman.website'),

  title: {
    default:  'Ultimate Garage | Himanshu Dhiman',
    template: '%s | Himanshu Dhiman', // Child pages can set a title prefix
  },
  description:
    'The pinnacle of automotive engineering and hypercar performance. Himanshu\'s personal collection of the world\'s most insane cars.',

  /* Canonical URL — tells search engines this is the definitive version */
  alternates: {
    canonical: 'https://himanshudhiman.website',
  },

  /*
   * Open Graph — the preview card when you paste the link into
   * Discord, WhatsApp, LinkedIn, etc.
   */
  openGraph: {
    type:        'website',
    url:         'https://himanshudhiman.website',
    title:       'Ultimate Garage | Himanshu Dhiman',
    description: 'The pinnacle of automotive engineering and hypercar performance.',
    siteName:    'Himanshu\'s Ultimate Garage',
    images: [
      {
        url:    '/images/icon.png', // Resolves to https://himanshudhiman.website/images/icon.png
        width:  1200,
        height: 630,
        alt:    'Himanshu\'s Ultimate Garage',
      },
    ],
  },

  /*
   * Twitter / X card — shown when someone pastes the link on X.
   * summary_large_image = big image card (looks way better than the small one).
   */
  twitter: {
    card:        'summary_large_image',
    title:       'Ultimate Garage | Himanshu Dhiman',
    description: 'The pinnacle of automotive engineering and hypercar performance.',
    images:      ['/images/icon.png'],
  },

  /* Favicon */
  icons: {
    icon: '/images/icon.png',
  },

  /*
   * robots — tells search engine crawlers what they're allowed to do.
   * index: true  → appear in search results
   * follow: true → follow links on the page
   */
  robots: {
    index:  true,
    follow: true,
  },

  keywords: [
    'Himanshu Dhiman',
    'ultimate garage',
    'hypercar',
    'supercar',
    'car collection',
    'Bugatti',
    'Lamborghini',
    'Ferrari',
  ],

  /*
   * authors — tells Next.js (and crawlers) who made the site.
   * Shown in some search result previews and used by aggregators.
   */
  authors: [
    {
      name: 'Himanshu Dhiman',
      url:  'https://himanshudhiman.website',
    },
  ],
}

/* ----------------------------------------------------------------
 * VIEWPORT
 *
 * This is THE most important thing for mobile responsiveness.
 * Without it, mobile browsers assume the page is designed for
 * a 980px-wide desktop and just zoom it out — making it look tiny
 * and unresponsive. All the Tailwind responsive classes (sm:, md:)
 * would be completely ignored.
 *
 * width=device-width  — use the actual screen width as the viewport
 * initialScale=1      — don't zoom in or out on first load
 *
 * In Next.js App Router, this is a separate named export, NOT part
 * of the metadata object (that would be deprecated/ignored).
 * ---------------------------------------------------------------- */
export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
}

/* ----------------------------------------------------------------
 * ROOT LAYOUT
 * ---------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/*
         * Font Awesome — icon library loaded from CDN.
         * The specific icons used are things like fa-gauge-high, fa-bolt, fa-infinity.
         */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        {children}

        {/*
         * ── JSON-LD STRUCTURED DATA ──────────────────────────────────
         * JSON-LD (Linked Data) is a way to embed machine-readable
         * information about the page into the HTML for search engines.
         *
         * Google reads this to understand:
         *   - What TYPE of page this is (a Website + a Person's page)
         *   - Who the author is
         *   - How to contact them
         *
         * This is separate from the <meta> tags above — think of it as
         * a richer, more structured description meant for bots.
         *
         * @type WebSite — describes the site itself
         * @type Person  — describes the site owner
         * ──────────────────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type':    'WebSite',
                name:       "Himanshu's Ultimate Garage",
                url:        'https://himanshudhiman.website',
                description:
                  'The pinnacle of automotive engineering and hypercar performance.',
                author: {
                  '@type': 'Person',
                  name:    'Himanshu Dhiman',
                  url:     'https://himanshudhiman.website',
                  email:   'contact@himanshudhiman.website',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type':    'Person',
                name:       'Himanshu Dhiman',
                url:        'https://himanshudhiman.website',
                email:      'contact@himanshudhiman.website',
              },
            ]),
          }}
        />

        {/*
         * ── VERCEL ANALYTICS ────────────────────────────────────────
         * Tracks page views, unique visitors, countries, devices, etc.
         * Visible in your Vercel project dashboard → Analytics tab.
         *
         * HOW TO ENABLE:
         *   1. Go to vercel.com → your project → Analytics tab
         *   2. Click "Enable Analytics"
         *   3. Deploy — it starts collecting data immediately
         *
         * This component injects a tiny script that sends anonymised
         * events to Vercel's servers. No cookies, GDPR-friendly.
         * It only fires on Vercel deployments (not localhost).
         * ──────────────────────────────────────────────────────────── */}
        <Analytics />

        {/*
         * ── VERCEL SPEED INSIGHTS ───────────────────────────────────
         * Measures Core Web Vitals for REAL users visiting your site:
         *   LCP  — Largest Contentful Paint  (how fast the page feels loaded)
         *   FID  — First Input Delay          (how quickly it responds to clicks)
         *   CLS  — Cumulative Layout Shift    (do things jump around?)
         *   FCP  — First Contentful Paint     (when does anything appear?)
         *   TTFB — Time To First Byte         (server response speed)
         *
         * HOW TO ENABLE:
         *   1. Go to vercel.com → your project → Speed Insights tab
         *   2. Click "Enable Speed Insights"
         *   3. Deploy — real user data starts flowing in
         *
         * Also only fires on Vercel deployments, not locally.
         * ──────────────────────────────────────────────────────────── */}
        <SpeedInsights />
      </body>
    </html>
  )
}
