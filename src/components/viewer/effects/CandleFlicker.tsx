'use client'

import type { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

/**
 * Drives one candle: sinusoidal point-light intensity plus a slight vertical
 * squash on the flame mesh. `offset` de-syncs tables so six candles do not
 * flicker in lockstep.
 */
export function useCandleFlicker(
  lightRef: RefObject<THREE.PointLight>,
  flameRef: RefObject<THREE.Mesh>,
  offset = 0,
): void {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const light = lightRef.current
    if (light) light.intensity = 0.45 + Math.sin(t * 7 + offset) * 0.12
    const flame = flameRef.current
    if (flame) flame.scale.y = 0.9 + Math.sin(t * 11 + offset) * 0.15
  })
}

export default useCandleFlicker
