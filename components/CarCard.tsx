/**
 * CarCard — components/CarCard.tsx
 *
 * Glassmorphism card for a single car with 3D tilt on hover.
 * Fully responsive — adapts padding, stat layout, and image height to screen size.
 *
 * CLIENT COMPONENT — mouse event handlers + useRef for tilt.
 */
'use client'

import { useRef } from 'react'
import type { Car } from '@/types'

/* ----------------------------------------------------------------
 * StatValue — displays either a number string or a rainbow ∞ icon
 * ---------------------------------------------------------------- */
interface StatValueProps {
  value: string | undefined
}

function StatValue({ value }: StatValueProps) {
  const normalised = String(value ?? '').trim().toLowerCase()

  if (normalised === 'infinity' || normalised === '∞') {
    return (
      <span className="font-display font-semibold text-sm sm:text-base text-white">
        <i className="fa-solid fa-infinity rainbow-icon" aria-label="Infinity" />
      </span>
    )
  }
  return (
    /*
     * No whitespace-nowrap here — long values like "193 mph / 310 km/h"
     * need to wrap on narrow cards rather than overflow the container.
     * leading-tight keeps wrapped lines compact.
     */
    <span className="font-display font-semibold text-sm sm:text-base text-white leading-tight">
      {String(value ?? '')}
    </span>
  )
}

/* ----------------------------------------------------------------
 * StatBox — icon + label + value pill
 * ---------------------------------------------------------------- */
interface StatBoxProps {
  iconClass: string
  label:     string
  value:     string | undefined
}

function StatBox({ iconClass, label, value }: StatBoxProps) {
  return (
    /*
     * min-w-0 is crucial here.
     * Without it, a flex child ignores its parent's width constraint and
     * can overflow the container. min-w-0 sets the implicit minimum width
     * to 0 so the box can actually shrink when needed.
     */
    <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3 bg-white/[0.03] border border-white/[0.05] px-3 sm:px-[15px] py-2.5 sm:py-3 rounded-2xl transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]">
      <i className={`${iconClass} text-base sm:text-xl text-accent flex-shrink-0`} />
      <div className="flex flex-col min-w-0">
        <span className="text-[0.65rem] sm:text-[0.7rem] uppercase text-text-muted tracking-wider">{label}</span>
        <StatValue value={value} />
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
 * CarCard — main export
 * ---------------------------------------------------------------- */
interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect    = card.getBoundingClientRect()
    const mouseX  = e.clientX - (rect.left + rect.width  / 2)
    const mouseY  = e.clientY - (rect.top  + rect.height / 2)
    const rotateX = (mouseY / (rect.height / 2)) * -8
    const rotateY = (mouseX / (rect.width  / 2)) *  8
    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className="car-card"
      data-category={car.category}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      {/*
       * h-[200px] on mobile, h-[250px] on sm+ (640px+).
       * Shorter image on mobile saves vertical space so you can see
       * more of the card text without scrolling.
       */}
      <div className="relative w-full h-[200px] sm:h-[250px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image}
          alt={car.alt || car.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(20,20,20,1) 100%)' }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      {/*
       * p-5 (20px) on mobile, p-[30px] on sm+ — more breathing room
       * on larger screens without squishing content on phones.
       */}
      <div className="relative z-10 p-5 sm:p-[30px]">
        <h2
          className="font-display text-[1.3rem] sm:text-[1.6rem] font-bold mb-2.5 sm:mb-3 leading-tight"
          style={{
            background: 'linear-gradient(90deg, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {car.name}
        </h2>

        <p className="text-[0.9rem] sm:text-[0.95rem] text-text-muted leading-relaxed mb-5 sm:mb-[25px] font-light">
          {car.description}
        </p>

        {/*
         * Stats layout:
         *   < 480px — stack vertically (column) — wide values don't overflow
         *   ≥ 480px — side by side (row) — two columns look better when there's space
         *
         * min-[480px]: is a Tailwind v4 arbitrary min-width breakpoint.
         * It's not tied to a screen size (like sm = 640px) but to an exact pixel value,
         * which is useful here because cards have a fixed minimum width.
         */}
        <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:gap-[15px]">
          <StatBox iconClass="fa-solid fa-gauge-high" label="Horsepower" value={car.specs?.horsepower} />
          <StatBox iconClass="fa-solid fa-bolt"       label="Top Speed"  value={car.specs?.topSpeed}   />
        </div>
      </div>
    </div>
  )
}
