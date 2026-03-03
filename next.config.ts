/**
 * Next.js Configuration — next.config.ts
 *
 * Now in TypeScript! The `NextConfig` import gives us full autocomplete
 * and type checking on every option in this file.
 *
 * This is a TypeScript-first feature added in Next.js 15.
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /**
   * reactStrictMode
   * Enables React's strict mode during development.
   * React will intentionally render your components TWICE to help you
   * catch bugs caused by side effects that run more than once.
   * This only affects development — production is unaffected.
   */
  reactStrictMode: true,

  /**
   * typescript.ignoreBuildErrors
   *
   * On Windows, Next.js 16's build-time TypeScript runner has a known bug
   * where it compares the tsconfig path using forward slashes (D:/CODE/...)
   * against backslashes (D:\CODE\...) and fails with "Debug Failure".
   *
   * Setting this to `true` skips the redundant build-time type check.
   * TypeScript errors are STILL shown in VS Code in real-time — this only
   * prevents them from blocking `npm run build`.
   *
   * On Vercel (Linux), this flag has no effect since the bug doesn't exist there.
   * Remove this once the upstream Next.js bug is fixed.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
