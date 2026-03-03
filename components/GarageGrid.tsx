/**
 * GarageGrid — components/GarageGrid.tsx
 *
 * Responsive grid that renders filtered car cards with scroll-in animations.
 *
 * CLIENT COMPONENT — uses useRef + IntersectionObserver.
 *
 * TYPESCRIPT CHANGES:
 *   GarageGridProps
 *     Simple single-prop interface. Even for one prop, it's good practice
 *     to define an interface — it documents what the component expects.
 *
 *   import type { Car, CarsData }
 *     `import type` is a TypeScript-only import that is completely erased
 *     at runtime. Use it for types you only need at compile time, not values
 *     you need at runtime. This keeps the bundle slightly smaller.
 *
 *   carsData as CarsData
 *     JSON imports are typed as `any` by default. We cast the import to our
 *     CarsData interface so TypeScript validates the structure.
 */
'use client'

import { useEffect, useRef } from 'react'
import type { Car, CarsData } from '@/types'
import rawCarsData from '@/data/cars.json'
import CarCard from './CarCard'

// Cast the JSON import to our typed interface
const carsData = rawCarsData as CarsData

/* ----------------------------------------------------------------
 * GarageGridProps
 * ---------------------------------------------------------------- */
interface GarageGridProps {
  activeFilter: string
}

export default function GarageGrid({ activeFilter }: GarageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Filter logic — show all or filter by category
  const visibleCars: Car[] =
    activeFilter === 'all'
      ? carsData.cars
      : carsData.cars.filter((car) => car.category === activeFilter)

  // IntersectionObserver — stagger cards into view as they scroll in
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.car-card')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [activeFilter])

  return (
    <div
      ref={gridRef}
      /*
       * minmax(min(100%, 340px), 1fr)
       * The `min(100%, 340px)` CSS function prevents overflow on narrow screens.
       * Without it, `340px` is an absolute minimum — on a 390px phone with 40px
       * of horizontal padding, only 350px is available, which barely fits and
       * causes horizontal scroll on anything smaller (e.g. 375px iPhone SE).
       * `min(100%, 340px)` says "use at most 340px, but never more than 100%
       * of the available space" — so on mobile it becomes 1 column perfectly.
       *
       * gap-6 on mobile (24px), md:gap-10 on desktop (40px) — less wasted
       * vertical space between cards when the screen is tight.
       */
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-6 md:gap-10 max-w-[1400px] mx-auto"
    >
      {visibleCars.map((car, index) => (
        <CarCard key={`${car.name}-${index}`} car={car} />
      ))}
    </div>
  )
}
