/**
 * GarageSection — components/GarageSection.tsx
 *
 * Owns the filter state and passes it to Nav and GarageGrid.
 *
 * CLIENT COMPONENT — needs useState (Server Components can't hold state).
 *
 * TYPESCRIPT CHANGES:
 *   useState<string>('all')
 *     We could write this, but TypeScript infers the type automatically
 *     from the initial value 'all' — it's already typed as string.
 *     Explicit annotation is optional here.
 *
 *   (filter: string) => void
 *     This is the type of the onFilterChange callback passed to Nav.
 *     `void` means "this function doesn't return anything useful".
 */
'use client'

import { useState } from 'react'
import Nav          from './Nav'
import GarageGrid   from './GarageGrid'

export default function GarageSection() {
  const [activeFilter, setActiveFilter] = useState('all')

  return (
    <>
      <Nav activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <main className="relative z-10 px-5 pb-24 pt-[50px]">
        <GarageGrid activeFilter={activeFilter} />
      </main>
    </>
  )
}
