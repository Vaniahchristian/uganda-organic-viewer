'use client'

import type { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

/**
 * Pulses a stove burner's emissive intensity between 0.8 and 1.8.
 * The material handed in MUST be a per-instance clone — two stoves sharing one
 * material object would write the same value twice per frame.
 */
export function useBurnerGlow(
  materialRef: RefObject<THREE.MeshStandardMaterial>,
  offset = 0,
): void {
  useFrame((state) => {
    const mat = materialRef.current
    if (!mat) return
    mat.emissiveIntensity = 1.3 + Math.sin(state.clock.elapsedTime * 3.5 + offset) * 0.5
  })
}

export default useBurnerGlow
