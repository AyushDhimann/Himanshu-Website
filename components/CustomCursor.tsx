/**
 * CustomCursor — components/CustomCursor.tsx
 *
 * Replaces the OS cursor with a custom pink dot + lagging ring.
 *
 * CLIENT COMPONENT — uses useRef and window event listeners.
 *
 * TYPESCRIPT CHANGES:
 *   useRef<HTMLDivElement>(null)
 *     The generic <HTMLDivElement> tells TypeScript exactly what DOM element
 *     the ref points to. This gives us:
 *       - dotRef.current.style.left ✓   (HTMLDivElement has .style)
 *       - dotRef.current.value ✗        (TypeScript error — divs don't have .value)
 *     Without the generic, ref.current would be typed as `null` and we'd
 *     lose all autocompletion on the DOM element.
 *
 *   MouseEvent (the browser's native MouseEvent, not React's)
 *     We're attaching listeners to `window`, so we get the native DOM
 *     MouseEvent — not React's synthetic event. TypeScript knows the difference.
 */
'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef:     React.RefObject<HTMLDivElement | null> = useRef(null)
  const outlineRef: React.RefObject<HTMLDivElement | null> = useRef(null)

  useEffect(() => {
    const dot     = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const handleMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`

      outline.animate(
        { left: `${e.clientX}px`, top: `${e.clientY}px` },
        { duration: 500, fill: 'forwards' }
      )
    }

    /*
     * e.target is typed as EventTarget | null in TypeScript.
     * We cast to Element so we can call .closest() on it.
     * The `as Element` cast is safe here because mouseover/mouseout
     * events only fire on actual DOM elements.
     */
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('a, .car-card, .visitor-counter-img')) {
        outline.classList.add('cursor-hover')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('a, .car-card, .visitor-counter-img')) {
        outline.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove',  handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout',  handleMouseOut)

    return () => {
      window.removeEventListener('mousemove',  handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout',  handleMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8, height: 8,
          background: 'var(--color-accent)',
          top: 0, left: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: 40, height: 40,
          border: '2px solid var(--color-accent)',
          top: 0, left: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s',
        }}
      />
      <style>{`
        .cursor-outline.cursor-hover {
          width: 60px;
          height: 60px;
          background-color: rgba(255, 51, 102, 0.1);
          border-color: rgba(255, 51, 102, 0.5);
        }
      `}</style>
    </>
  )
}
