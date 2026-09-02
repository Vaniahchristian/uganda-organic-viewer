import { create } from 'zustand'
import { PRESET_ZONE, type CameraPresetName } from '@/components/viewer/camera/cameraPresets'
import type { LightingMode, Zone } from '@/types/scene.types'

interface SceneStore {
  lightingMode: LightingMode
  setLightingMode: (mode: LightingMode) => void

  activeCameraPreset: CameraPresetName
  setCameraPreset: (preset: CameraPresetName) => void
  isTransitioning: boolean
  setTransitioning: (v: boolean) => void

  activeZone: Zone | null
  setActiveZone: (zone: Zone | null) => void
  isPanelOpen: boolean
  setPanelOpen: (v: boolean) => void
  isFloorPlan: boolean
  toggleFloorPlan: () => void
}

export const useSceneStore = create<SceneStore>((set, get) => ({
  lightingMode: 'day',
  setLightingMode: (mode) => set({ lightingMode: mode }),

  activeCameraPreset: 'default',
  setCameraPreset: (preset) => {
    const zone = PRESET_ZONE[preset]
    set({
      activeCameraPreset: preset,
      isTransitioning: true,
      isFloorPlan: preset === 'top',
      activeZone: zone,
      isPanelOpen: zone !== null,
    })
  },
  isTransitioning: false,
  setTransitioning: (v) => set({ isTransitioning: v }),

  activeZone: null,
  setActiveZone: (zone) => set({ activeZone: zone, isPanelOpen: zone !== null }),
  isPanelOpen: false,
  setPanelOpen: (v) => set({ isPanelOpen: v }),
  isFloorPlan: false,
  toggleFloorPlan: () => {
    const next = !get().isFloorPlan
    get().setCameraPreset(next ? 'top' : 'default')
  },
}))
