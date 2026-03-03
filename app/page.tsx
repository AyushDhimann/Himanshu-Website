/**
 * Home Page — app/page.tsx
 *
 * SERVER COMPONENT — rendered on the server, ships zero JS to the browser.
 *
 * This file just composes the layout by assembling components.
 * All interactive logic lives in the Client Components below.
 *
 * COMPONENT TREE:
 *   HomePage (server)
 *     ├── Preloader      (client — useState + setTimeout)
 *     ├── AmbientScene   (server — purely decorative static divs)
 *     ├── CustomCursor   (client — tracks mouse position)
 *     ├── GarageSection  (client — owns filter state)
 *     │     ├── Nav          (client — filter buttons)
 *     │     └── GarageGrid   (client — IntersectionObserver)
 *     │           └── CarCard (client — 3D tilt on hover)
 *     ├── Hero           (client — variable-font text pressure)
 *     └── Footer         (server — static HTML, zero JS)
 */

import Preloader     from '@/components/Preloader'
import CustomCursor  from '@/components/CustomCursor'
import Hero          from '@/components/Hero'
import GarageSection from '@/components/GarageSection'
import Footer        from '@/components/Footer'

/* ----------------------------------------------------------------
 * AmbientScene — decorative background (Server Component)
 *
 * Three visual layers:
 *   1. SVG fractal noise texture at 4% opacity (grain effect)
 *   2. Animated perspective grid + particle dots (CSS pseudo-elements)
 *   3. Three large blurred colour orbs that float slowly
 *
 * No interactivity → Server Component → zero JS shipped.
 * ---------------------------------------------------------------- */
function AmbientScene() {
  return (
    <>
      {/* Grain / noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated grid + particles (handled by ::before / ::after in globals.css) */}
      <div
        className="ambient-background fixed inset-0 -z-10 overflow-hidden"
        style={{ background: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)' }}
      >
        {/* Pink orb — top-left */}
        <div
          className="absolute rounded-full opacity-50"
          style={{
            width: 400, height: 400,
            background: '#ff3366',
            top: -100, left: -100,
            filter: 'blur(80px)',
            animation: 'orb-float 20s infinite ease-in-out alternate',
            animationDelay: '0s',
          }}
        />
        {/* Blue orb — bottom-right */}
        <div
          className="absolute rounded-full opacity-50"
          style={{
            width: 500, height: 500,
            background: '#3333ff',
            bottom: -200, right: -100,
            filter: 'blur(80px)',
            animation: 'orb-float 20s infinite ease-in-out alternate',
            animationDelay: '-5s',
          }}
        />
        {/* Purple orb — centre */}
        <div
          className="absolute rounded-full opacity-50"
          style={{
            width: 300, height: 300,
            background: '#7a00ff',
            top: '40%', left: '50%',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
            animation: 'orb-float 20s infinite ease-in-out alternate',
            animationDelay: '-10s',
          }}
        />
      </div>
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <Preloader />
      <AmbientScene />
      <CustomCursor />
      <GarageSection />
      <Hero />
      <Footer />
    </>
  )
}
