/**
 * Footer — components/Footer.tsx
 *
 * Static footer with the visitor counter badge and contact email.
 *
 * SERVER COMPONENT — no 'use client', no hooks, zero JS shipped.
 */

const CONTACT_EMAIL = 'contact@himanshudhiman.website'

export default function Footer() {
  return (
    <footer className="relative z-10 px-5 py-10 text-center border-t border-white/[0.08] bg-black/50 backdrop-blur-[10px] mt-5">
      <div className="flex flex-col items-center gap-6">

        {/* ── Visitor counter ────────────────────────────────────────
          * hits.sh tracks page visits by URL slug.
          * The slug is himanshudhiman.website so the counter ties
          * to the live production site, not a random placeholder.
          * ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-text-muted text-[0.85rem] uppercase tracking-[3px]">
            Garage Visitors
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hits.sh/himanshudhiman.website.svg?style=for-the-badge&label=VISITORS&color=ff3366&labelColor=141414"
            alt="Visitor counter badge"
            className="visitor-counter-img rounded-[4px] shadow-[0_4px_15px_rgba(255,51,102,0.15)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,51,102,0.4)]"
          />
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="w-24 h-px bg-white/[0.08]" />

        {/* ── Contact email ────────────────────────────────────────
          * mailto: links open the user's default email app with
          * the To field pre-filled — no JavaScript needed.
          * ──────────────────────────────────────────────────────── */}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="
            flex items-center gap-2
            font-display text-[0.8rem] uppercase tracking-[2px]
            text-text-muted
            transition-colors duration-300
            hover:text-accent
          "
        >
          <i className="fa-solid fa-envelope text-accent" />
          {CONTACT_EMAIL}
        </a>

        {/* ── Built-by line ─────────────────────────────────────── */}
        <p className="text-white/20 text-xs tracking-wider">
          © {new Date().getFullYear()} Himanshu Dhiman
        </p>

      </div>
    </footer>
  )
}
