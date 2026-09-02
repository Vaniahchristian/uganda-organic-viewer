import type { CAMERA_PRESETS } from '@/components/viewer/camera/cameraPresets'

export type LightingMode = 'day' | 'night'

export type Zone = 'restaurant' | 'kitchen' | 'organic'

export type CameraPreset = keyof typeof CAMERA_PRESETS

export type Vec3 = readonly [number, number, number]

export interface CameraPresetDef {
  readonly position: Vec3
  readonly target: Vec3
}

export interface TableData {
  readonly id: string
  readonly position: Vec3
  /** Drives chair fabric + tablecloth tint: left column red, right column green. */
  readonly accent: 'red' | 'green'
}

export interface ZoneMeta {
  readonly label: string
  readonly emoji: string
  readonly color: string
  readonly description: string
}
