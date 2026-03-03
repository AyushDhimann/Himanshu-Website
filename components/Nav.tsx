/**
 * Nav — components/Nav.tsx
 *
 * Frosted-glass pill navigation bar — fixed at the top of the screen.
 * Fully responsive: smaller on mobile, full size on desktop.
 *
 * CLIENT COMPONENT — receives filter state as props.
 */
'use client'

import type { Filter } from '@/types'

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
    /*
     * Mobile adjustments:
     *   top-3 (12px) on mobile vs top-[30px] on sm+ — nav sits closer to
     *   the edge on small screens to leave more hero viewport space.
     *
     *   px-3 py-2 on mobile vs px-6 py-3 on sm+ — smaller outer pill padding.
     *
     *   gap-1 on mobile vs gap-[15px] on sm+ — tighter gaps between items.
     *
     *   max-w-[95vw] ensures the pill never exceeds 95% of the screen width.
     *   overflow-x-auto + scrollbar-hiding (via .main-nav in globals.css)
     *   lets users swipe through the filters on narrow screens.
     */
    <nav
      className="
        main-nav
        fixed top-3 sm:top-[30px] left-1/2 -translate-x-1/2
        flex gap-1 sm:gap-[15px]
        px-3 py-2 sm:px-6 sm:py-3
        bg-black/70 backdrop-blur-xl
        border border-white/[0.08] rounded-full
        z-[100]
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        overflow-x-auto
        max-w-[95vw]
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
            /*
             * px-3 py-1.5 text-[0.75rem] on mobile — smaller touch targets
             * still work fine since each pill is at least 44px wide.
             * sm:px-5 sm:py-2 sm:text-[0.9rem] restores the full desktop size.
             */
            className={`
              whitespace-nowrap no-underline
              font-semibold tracking-wider uppercase
              text-[0.75rem] px-3 py-1.5
              sm:text-[0.9rem] sm:px-5 sm:py-2
              rounded-full
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
