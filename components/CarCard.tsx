/**
 * CarCard — components/CarCard.tsx
 *
 * Glassmorphism card for a single car with 3D tilt on hover.
 *
 * CLIENT COMPONENT — mouse event handlers + useRef for tilt.
 *
 * TYPESCRIPT CHANGES:
 *   CarCardProps
 *     Types the `car` prop using our Car interface from types/.
 *     TypeScript will error if you pass anything that doesn't match Car.
 *
 *   StatValueProps & StatBoxProps
 *     Small internal component props — typed inline.
 *
 *   React.MouseEvent<HTMLDivElement>
 *     Click/move/leave events on a <div>. The generic parameter
 *     HTMLDivElement makes e.currentTarget typed correctly.
 *
 *   useRef<HTMLDivElement>(null)
 *     Typed ref pointing at the card's root div element.
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
      <span className="font-display font-semibold text-base text-white whitespace-nowrap">
        <i className="fa-solid fa-infinity rainbow-icon" aria-label="Infinity" />
      </span>
    )
  }
  return (
    <span className="font-display font-semibold text-base text-white whitespace-nowrap">
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
    <div className="flex-1 flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] px-[15px] py-3 rounded-2xl transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/[0.15]">
      <i className={`${iconClass} text-xl text-accent`} />
      <div className="flex flex-col">
        <span className="text-[0.7rem] uppercase text-text-muted tracking-wider">{label}</span>
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
      {/* Image */}
      <div className="relative w-full h-[250px] overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 p-[30px]">
        <h2
          className="font-display text-[1.6rem] font-bold mb-3"
          style={{
            background: 'linear-gradient(90deg, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {car.name}
        </h2>
        <p className="text-[0.95rem] text-text-muted leading-relaxed mb-[25px] font-light">
          {car.description}
        </p>
        <div className="flex gap-[15px]">
          <StatBox iconClass="fa-solid fa-gauge-high" label="Horsepower" value={car.specs?.horsepower} />
          <StatBox iconClass="fa-solid fa-bolt"       label="Top Speed"  value={car.specs?.topSpeed}   />
        </div>
      </div>
    </div>
  )
}
