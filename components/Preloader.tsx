/**
 * Preloader — components/Preloader.tsx
 *
 * Full-screen loading overlay that fades out after 3.5 seconds.
 *
 * CLIENT COMPONENT — needs useState + useEffect (browser-only hooks).
 *
 * TYPESCRIPT CHANGES:
 *   - No prop types needed here (this component takes no props)
 *   - useState<boolean> is inferred automatically so no annotation needed
 *   - The return type `JSX.Element | null` is also inferred — TypeScript
 *     knows a component returns renderable content or null
 */
'use client'

import { useState, useEffect } from 'react'

export default function Preloader() {
  const [hidden,  setHidden]  = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setHidden(true),  3500)
    const removeTimer = setTimeout(() => setRemoved(true), 4300)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (removed) return null

  return (
    <div
      className={`
        fixed inset-0 z-[99999]
        flex flex-col items-center justify-center
        bg-site-bg
        transition-[opacity,visibility] duration-500
        ${hidden ? 'opacity-0 invisible' : 'opacity-100 visible'}
      `}
    >
      <div className="flex flex-col items-center gap-5">
        <p className="preloader-logo-text font-display text-4xl font-bold tracking-[6px] text-white uppercase">
          HIMANSHU
        </p>
        <div className="relative w-[250px] h-[2px] rounded-sm bg-white/10 overflow-hidden">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  )
}
