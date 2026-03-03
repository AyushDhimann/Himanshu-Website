/**
 * PostCSS Configuration
 *
 * PostCSS is a tool that transforms CSS using JavaScript plugins.
 * Think of it as a pre-processor that runs before your CSS reaches the browser.
 *
 * Tailwind CSS v4 ships its own PostCSS plugin called @tailwindcss/postcss.
 * In older Tailwind versions (v3), you also needed 'autoprefixer' here,
 * but Tailwind v4 handles vendor prefixes automatically — so this is all you need!
 */

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
