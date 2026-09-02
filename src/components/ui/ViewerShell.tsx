'use client'

import ControlBar from '@/components/ui/ControlBar'
import ZoneLegend from '@/components/ui/ZoneLegend'
import ZoneInfoPanel from '@/components/ui/ZoneInfoPanel'
import MobileHint from '@/components/ui/MobileHint'

export interface ViewerShellProps {
  /** The <RestaurantViewer /> canvas. */
  children: React.ReactNode
}

/**
 * Full-bleed stage for the 3D canvas with the HUD layered on top.
 *
 * The HUD is a `pointer-events-none` overlay so orbit drags pass straight
 * through the empty space to the canvas; only the actual controls re-enable
 * pointer events. LoadingScreen is deliberately NOT rendered here —
 * RestaurantViewer mounts it as its Suspense fallback.
 */
export default function ViewerShell({ children }: ViewerShellProps) {
  return (
    <div
      className="relative w-full overflow-hidden bg-[color:var(--background)] h-[var(--canvas-mobile-height)] md:h-[100dvh]"
      style={{ touchAction: 'none' }}
    >
      {/* Canvas layer */}
      <div className="absolute inset-0">{children}</div>

      {/* HUD layer — transparent to pointer events except on the controls. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col p-3 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <ControlBar />
          <div className="hidden sm:block">
            <ZoneLegend />
          </div>
        </div>

        <div className="mt-auto flex items-end justify-end">
          <ZoneInfoPanel />
        </div>
      </div>

      {/* Bottom-centre hint, mobile only (renders null elsewhere). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center">
        <MobileHint />
      </div>
    </div>
  )
}
