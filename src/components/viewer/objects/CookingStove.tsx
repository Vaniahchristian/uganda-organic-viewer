'use client'

import React, { useMemo, useRef } from 'react'
import type * as THREE from 'three'
import { box, cylinder, sphere } from '@/lib/geometry'
import { burnerGlow, metalShiny, stoveBody, stoveTop } from '@/lib/materials'
import { useBurnerGlow } from '@/components/viewer/effects/BurnerGlow'

export interface CookingStoveProps {
  position: readonly [number, number, number]
}

/** Four hobs, local to the stove body centre. Slab top sits at local y = 0.5. */
const BURNER_OFFSETS: readonly (readonly [number, number])[] = [
  [-0.35, -0.28],
  [0.35, -0.28],
  [-0.35, 0.28],
  [0.35, 0.28],
]
const BURNER_Y = 0.515

const CookingStoveImpl: React.FC<CookingStoveProps> = ({ position }) => {
  const [px, py, pz] = position

  // One clone per stove so two stoves do not write the same emissive value.
  const glowMaterial = useMemo(() => burnerGlow.clone(), [])
  const glowRef = useRef<THREE.MeshStandardMaterial>(glowMaterial)
  useBurnerGlow(glowRef, px)

  return (
    <group position={[px, py, pz]}>
      <mesh geometry={box(1.4, 0.88, 0.95)} material={stoveBody} castShadow receiveShadow />
      <mesh
        geometry={box(1.5, 0.06, 1.05)}
        material={stoveTop}
        position={[0, 0.47, 0]}
        castShadow
        receiveShadow
      />

      {BURNER_OFFSETS.map(([bx, bz]) => (
        <group key={`${bx}:${bz}`}>
          <mesh
            geometry={cylinder(0.2, 0.2, 0.03, 16)}
            material={glowMaterial}
            position={[bx, BURNER_Y, bz]}
          />
          <pointLight
            color="#ff3300"
            intensity={0.3}
            distance={1.2}
            position={[bx, BURNER_Y + 0.08, bz]}
            castShadow={false}
          />
        </group>
      ))}

      {/* One shadow-casting light per stove — the only point lights in the scene allowed to cast. */}
      <pointLight
        color="#ff4400"
        intensity={0.35}
        distance={2.4}
        position={[0, 0.85, 0]}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {/* Pot on the back-left hob. */}
      <group position={[-0.35, BURNER_Y + 0.015, 0.28]}>
        <mesh geometry={cylinder(0.25, 0.22, 0.28, 18)} material={metalShiny} position={[0, 0.14, 0]} castShadow />
        <mesh geometry={cylinder(0.26, 0.26, 0.03, 18)} material={metalShiny} position={[0, 0.295, 0]} castShadow />
        <mesh geometry={sphere(0.035, 10, 8)} material={stoveTop} position={[0, 0.325, 0]} />
      </group>
    </group>
  )
}

export const CookingStove = React.memo(CookingStoveImpl)
CookingStove.displayName = 'CookingStove'

export default CookingStove
