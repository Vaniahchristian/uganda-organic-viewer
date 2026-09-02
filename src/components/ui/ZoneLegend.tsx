'use client'

import { LEGEND } from '@/lib/constants'

export default function ZoneLegend() {
  return (
    <aside
      aria-label="Zone colour legend"
      className="pointer-events-auto rounded-2xl px-4 py-3 text-[#f5efe2] shadow-lg"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-gold-soft)]">
        Zones
      </h2>
      <ul className="space-y-1.5">
        {LEGEND.map((row) => (
          <li key={row.label} className="flex items-center gap-2 text-xs leading-none">
            <span aria-hidden className="text-sm leading-none">
              {row.dot}
            </span>
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
