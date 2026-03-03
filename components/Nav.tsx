/**
 * Nav — components/Nav.tsx
 *
 * Frosted-glass pill navigation bar.
 *
 * CLIENT COMPONENT — receives a callback prop (onClick handler).
 *
 * TYPESCRIPT CHANGES:
 *   NavProps interface
 *     Defines the exact props this component accepts.
 *     If you forget to pass activeFilter, TypeScript shows an error
 *     immediately — you don't have to run the app to find out.
 *
 *   Filter[] type on the FILTERS constant
 *     The array is typed as Filter[] (imported from types/) so TypeScript
 *     checks that every object has the right keys.
 *
 *   React.MouseEvent<HTMLAnchorElement>
 *     The type for a click event on an <a> element.
 *     Using this gives us autocomplete on `e.preventDefault()` etc.
 */
'use client'

import type { Filter } from '@/types'

/* ----------------------------------------------------------------
 * NavProps — the props contract for this component.
 * Whoever renders <Nav /> MUST provide both of these.
 * ---------------------------------------------------------------- */
interface NavProps {
  activeFilter:   string
  onFilterChange: (filter: string) => void
}

const FILTERS: Filter[] = [
  { label: 'All',               value: 'all'           },
  { label: 'Supercars',         value: 'supercar'      },
  { label: 'Hypercars',         value: 'hypercar'      },
  { label: 'SUVs & Luxury',     value: 'suv-luxury'    },
  { label: 'Concepts & Racing', value: 'concept-racing'},
]

export default function Nav({ activeFilter, onFilterChange }: NavProps) {
  return (
    <nav
      className="
        main-nav
        fixed top-[30px] left-1/2 -translate-x-1/2
        flex gap-[15px]
        px-6 py-3
        bg-black/70 backdrop-blur-xl
        border border-white/[0.08] rounded-full
        z-[100]
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        overflow-x-auto
        max-w-[90vw]
      "
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value
        return (
          <a
            key={filter.value}
            href="#"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              onFilterChange(filter.value)
            }}
            className={`
              whitespace-nowrap no-underline
              font-semibold text-[0.9rem] tracking-wider uppercase
              px-5 py-2 rounded-full
              transition-all duration-300
              ${isActive
                ? 'bg-accent text-white shadow-[0_0_20px_var(--accent-glow)]'
                : 'text-text-muted hover:text-white hover:bg-white/5'
              }
            `}
          >
            {filter.label}
          </a>
        )
      })}
    </nav>
  )
}
