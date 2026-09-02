'use client'

import { useSceneStore } from '@/store/useSceneStore'
import { useIsMobile } from '@/hooks/useResponsiveCamera'
import type { CameraPresetName } from '@/components/viewer/camera/cameraPresets'
import type { LightingMode } from '@/types/scene.types'

type ControlAction =
  | { readonly kind: 'lighting'; readonly mode: LightingMode }
  | { readonly kind: 'preset'; readonly preset: CameraPresetName }

interface ControlItem {
  readonly id: string
  readonly icon: string
  readonly label: string
  readonly action: ControlAction
}

/** Left-to-right button order per the PRD. */
const CONTROLS: readonly ControlItem[] = [
  { id: 'day', icon: '☀', label: 'Day', action: { kind: 'lighting', mode: 'day' } },
  { id: 'night', icon: '🌙', label: 'Night', action: { kind: 'lighting', mode: 'night' } },
  { id: 'floorplan', icon: '⊞', label: 'Floor Plan', action: { kind: 'preset', preset: 'top' } },
  {
    id: 'restaurant',
    icon: '🍽',
    label: 'Restaurant',
    action: { kind: 'preset', preset: 'restaurant' },
  },
  { id: 'kitchen', icon: '🍳', label: 'Kitchen', action: { kind: 'preset', preset: 'kitchen' } },
  {
    id: 'organic',
    icon: '🌿',
    label: 'Organic Foods',
    action: { kind: 'preset', preset: 'organicSign' },
  },
  { id: 'bar', icon: '🍺', label: 'Bar', action: { kind: 'preset', preset: 'bar' } },
  { id: 'reset', icon: '↺', label: 'Reset', action: { kind: 'preset', preset: 'default' } },
]

export default function ControlBar() {
  const isMobile = useIsMobile()
  const lightingMode = useSceneStore((s) => s.lightingMode)
  const setLightingMode = useSceneStore((s) => s.setLightingMode)
  const activeCameraPreset = useSceneStore((s) => s.activeCameraPreset)
  const setCameraPreset = useSceneStore((s) => s.setCameraPreset)

  const isActive = (action: ControlAction): boolean =>
    action.kind === 'lighting'
      ? lightingMode === action.mode
      : activeCameraPreset === action.preset

  const run = (action: ControlAction): void => {
    if (action.kind === 'lighting') setLightingMode(action.mode)
    else setCameraPreset(action.preset)
  }

  return (
    <nav
      aria-label="Scene controls"
      className={[
        'pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-[50px] p-1.5 no-scrollbar',
        isMobile ? 'gap-1' : 'gap-1.5 px-2',
      ].join(' ')}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        backdropFilter: 'var(--glass-blur)',
      }}
    >
      {CONTROLS.map((item) => {
        const active = isActive(item.action)
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => run(item.action)}
            aria-pressed={active}
            aria-label={item.label}
            title={item.label}
            className={[
              'shrink-0 whitespace-nowrap rounded-[50px] text-sm font-medium text-[#f5efe2]',
              'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--brand-gold-soft)] focus-visible:ring-offset-0',
              isMobile ? 'h-9 w-9 text-base leading-none' : 'px-3.5 py-2',
              active ? 'font-semibold' : 'hover:bg-white/10',
            ].join(' ')}
            style={{
              background: active ? 'var(--glass-active-bg)' : 'transparent',
              border: active
                ? '1px solid var(--glass-active-border)'
                : '1px solid transparent',
            }}
          >
            <span aria-hidden>{item.icon}</span>
            {!isMobile && <span className="ml-1.5">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}
