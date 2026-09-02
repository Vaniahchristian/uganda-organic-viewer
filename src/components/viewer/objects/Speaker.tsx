'use client'

import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import { box, cylinder, sphere, torus } from '@/lib/geometry'
import { ledBlue, metalShiny, speakerBody, speakerGrille } from '@/lib/materials'

export interface SpeakerProps {
  position: readonly [number, number, number]
  rotationY?: number
}

const SpeakerImpl: React.FC<SpeakerProps> = ({ position, rotationY = 0 }) => {
  const [px, py, pz] = position

  // Cloned: the pulse below writes emissiveIntensity every frame.
  const ledMaterial = useMemo(() => ledBlue.clone(), [])
  const ledRef = useRef<THREE.MeshStandardMaterial>(ledMaterial)

  useFrame((state) => {
    ledRef.current.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5
  })

  return (
    <group position={[px, py, pz]} rotation={[0, rotationY, 0]}>
      <mesh geometry={box(0.7, 1.1, 0.45)} material={speakerBody} castShadow receiveShadow />
      <mesh geometry={box(0.55, 0.7, 0.05)} material={speakerGrille} position={[0, 0, 0.24]} />

      {/* Woofer + dust-cap dome, lower half of the baffle. */}
      <mesh
        geometry={cylinder(0.18, 0.18, 0.06, 20)}
        material={speakerBody}
        position={[0, -0.15, 0.27]}
        rotation={[Math.PI * 0.5, 0, 0]}
      />
      <mesh geometry={sphere(0.08, 12, 10)} material={metalShiny} position={[0, -0.15, 0.3]} />

      {/* Tweeter, upper baffle. */}
      <mesh
        geometry={cylinder(0.06, 0.06, 0.04, 14)}
        material={metalShiny}
        position={[0, 0.32, 0.26]}
        rotation={[Math.PI * 0.5, 0, 0]}
      />

      <mesh
        geometry={torus(0.19, 0.015, 8, 24)}
        material={ledMaterial}
        position={[0, -0.15, 0.28]}
      />

      <pointLight
        color="#0066ff"
        intensity={0.4}
        distance={2}
        position={[0, -0.05, 0.3]}
        castShadow={false}
      />
    </group>
  )
}

export const Speaker = React.memo(SpeakerImpl)
Speaker.displayName = 'Speaker'

export default Speaker
