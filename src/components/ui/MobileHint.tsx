'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useResponsiveCamera'

const HINT_MS = 4000

export default function MobileHint() {
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isMobile) return
    const id = window.setTimeout(() => setVisible(false), HINT_MS)
    return () => window.clearTimeout(id)
  }, [isMobile])

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          key="mobile-hint"
          role="status"
          className="pointer-events-none rounded-full px-4 py-2 text-xs font-medium tracking-wide text-[#f5efe2]"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            backdropFilter: 'var(--glass-blur)',
          }}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
        >
          Drag · Pinch · Tap zones
        </motion.p>
      )}
    </AnimatePresence>
  )
}
