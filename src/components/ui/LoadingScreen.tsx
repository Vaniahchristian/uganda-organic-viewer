'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BRAND } from '@/lib/constants'

export default function LoadingScreen() {
  const { progress } = useProgress()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  const pct = Math.min(100, Math.max(0, Math.round(progress)))

  useEffect(() => {
    if (pct < 100) return
    // Hold at 100% for a beat so the bar visibly completes, then fade.
    const id = window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 350)
    return () => window.clearTimeout(id)
  }, [pct, reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${BRAND.name}, ${pct} percent`}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center px-8 text-center"
          style={{ background: BRAND.primaryGreen }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-2xl font-bold uppercase tracking-[0.2em] text-white sm:text-4xl">
            {BRAND.name}
          </h1>

          <div
            className="mt-7 h-1.5 w-64 max-w-[80vw] overflow-hidden rounded-full"
            style={{ background: 'rgba(255, 255, 255, 0.18)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: BRAND.organicSign }}
              initial={{ width: '0%' }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
            />
          </div>

          <p className="mt-4 text-xs font-medium tracking-[0.14em] text-white/70">
            {pct}%
          </p>

          <p className="mt-6 text-sm italic text-white/85 sm:text-base">{BRAND.tagline}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
