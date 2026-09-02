'use client'

import { useEffect, useState } from 'react'

export interface SceneProviderProps {
  children: React.ReactNode
}

/**
 * NOT a React context provider — zustand stores are module-level singletons and
 * need no provider at all. This component exists purely as an SSR-safety mount
 * gate: it renders a static placeholder on the server and during the first
 * client render, then swaps in `children` after mount. That keeps the
 * store-driven HUD (which reads state the server cannot know, e.g. viewport
 * width and camera preset) from causing a hydration mismatch.
 */
export default function SceneProvider({ children }: SceneProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Static, deterministic shell — identical on server and first client render.
    return (
      <div
        aria-hidden
        className="h-full w-full"
        style={{ background: 'var(--brand-green-deep, #0f4419)' }}
      />
    )
  }

  return <>{children}</>
}
