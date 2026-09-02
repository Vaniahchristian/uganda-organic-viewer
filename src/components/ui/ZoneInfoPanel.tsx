'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ZONES } from '@/lib/constants'
import { useSceneStore } from '@/store/useSceneStore'

export default function ZoneInfoPanel() {
  const reduceMotion = useReducedMotion()
  const activeZone = useSceneStore((s) => s.activeZone)
  const isPanelOpen = useSceneStore((s) => s.isPanelOpen)
  const setPanelOpen = useSceneStore((s) => s.setPanelOpen)

  const meta = activeZone ? ZONES[activeZone] : null

  return (
    <AnimatePresence>
      {isPanelOpen && meta && (
        <motion.section
          key={activeZone}
          aria-label={`${meta.label} zone details`}
          className="pointer-events-auto w-[19rem] max-w-[calc(100vw-2rem)] rounded-2xl p-5 text-[#f5efe2] shadow-2xl"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            backdropFilter: 'var(--glass-blur)',
          }}
          initial={reduceMotion ? { opacity: 0 } : { x: 320, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: 320, opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }
          }
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden>{meta.emoji}</span>
              <span>{meta.label}</span>
            </h2>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label={`Close ${meta.label} details`}
              className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[#f5efe2]/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold-soft)]"
            >
              <span aria-hidden>✕</span>
            </button>
          </div>

          <div
            aria-hidden
            className="mt-3 h-0.5 w-10 rounded-full"
            style={{ background: meta.color }}
          />

          <p className="mt-3 text-sm leading-relaxed text-[#f5efe2]/85">{meta.description}</p>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
