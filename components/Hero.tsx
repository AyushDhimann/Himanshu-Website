/**
 * Hero — components/Hero.tsx
 *
 * Full-viewport section with the variable-font text pressure effect.
 *
 * CLIENT COMPONENT — uses useRef + window mouse event listeners.
 *
 * TYPESCRIPT CHANGES:
 *   useRef<HTMLHeadingElement>(null)
 *     HTMLHeadingElement is the type for <h1>–<h6> elements.
 *     This gives us type-safe access to el.innerHTML, el.querySelectorAll, etc.
 *
 *   NodeListOf<Element>
 *     querySelectorAll returns a NodeListOf<Element> — a typed list of
 *     DOM elements. We can forEach over it just like an array.
 *
 *   char as HTMLElement
 *     querySelectorAll('.pressure-char') returns generic Element nodes,
 *     but we KNOW they're <span> elements with a .style property.
 *     We cast to HTMLElement to access .style without TypeScript complaining.
 *     (HTMLElement is the base type for all HTML elements that have inline styles.)
 */
'use client'

import { useEffect, useRef } from 'react'

const HERO_TEXT = "HIMANSHU'S COLLECTION"

export default function Hero() {
  const heroRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    // Split heading into per-character <span>s
    el.innerHTML = ''
    HERO_TEXT.split('').forEach((char) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode('\u00A0'))
        return
      }
      const span = document.createElement('span')
      span.textContent = char
      span.className = 'pressure-char'
      el.appendChild(span)
    })

    const chars = el.querySelectorAll('.pressure-char')

    const handleMouseMove = (e: MouseEvent) => {
      chars.forEach((node) => {
        const char = node as HTMLElement   // Cast so we can access .style
        const rect  = char.getBoundingClientRect()
        const cx    = rect.left + rect.width  / 2
        const cy    = rect.top  + rect.height / 2
        const dist  = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)
        const maxDist = 250

        if (dist < maxDist) {
          const factor = 1 - dist / maxDist
          char.style.fontVariationSettings = `"wght" ${700 - factor * 400}`
          char.style.color     = `rgba(255,255,255,${1 - factor * 0.3})`
          char.style.transform = `translateY(${factor * -10}px)`
        } else {
          char.style.fontVariationSettings = '"wght" 700'
          char.style.color     = '#fff'
          char.style.transform = 'translateY(0px)'
        }
      })
    }

    const handleMouseLeave = () => {
      chars.forEach((node) => {
        const char = node as HTMLElement
        char.style.fontVariationSettings = '"wght" 700'
        char.style.color     = '#fff'
        char.style.transform = 'translateY(0px)'
      })
    }

    window.addEventListener('mousemove',  handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove',  handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <header className="relative h-screen flex flex-col items-center justify-center text-center px-5 z-10">
      <div className="hero-content">
        <h1
          ref={heroRef}
          className="font-display font-bold uppercase text-white leading-tight mb-5"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            textShadow: '0 0 40px rgba(255,255,255,0.3)',
          }}
        >
          {HERO_TEXT}
        </h1>
        <p className="text-text-muted font-light text-lg tracking-wide max-w-[600px] mx-auto leading-relaxed">
          The pinnacle of automotive engineering and hypercar performance.
        </p>
      </div>

      <div className="scroll-bounce absolute bottom-10 flex flex-col items-center gap-2.5 text-text-muted text-sm uppercase tracking-[2px]">
        <span>Discover</span>
        <i className="fa-solid fa-chevron-down" />
      </div>
    </header>
  )
}
