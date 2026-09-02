import type { CameraPresetDef } from '@/types/scene.types'

export const CAMERA_PRESETS = {
  default: { position: [10, 10, 14], target: [0, 1, 0] },
  top: { position: [0, 22, 0.01], target: [0, 0, 0] },
  restaurant: { position: [0, 6, -1], target: [0, 1, -4] },
  kitchen: { position: [-4, 5, 9], target: [-4, 1, 5] },
  organicSign: { position: [7, 4, 7], target: [4, 2, 5.5] },
  bar: { position: [0, 3, -5], target: [0, 1, -7] },
} as const satisfies Record<string, CameraPresetDef>

export type CameraPresetName = keyof typeof CAMERA_PRESETS

/** Which info panel (if any) a preset should open. */
export const PRESET_ZONE: Record<CameraPresetName, 'restaurant' | 'kitchen' | 'organic' | null> = {
  default: null,
  top: null,
  restaurant: 'restaurant',
  kitchen: 'kitchen',
  organicSign: 'organic',
  bar: 'restaurant',
}
