'use client'

import React from 'react'
import { cone, cylinder, sphere } from '@/lib/geometry'
import { bulbGlow, cordBlack, lampGold } from '@/lib/materials'

export interface HangingLampProps {
  /** Floor anchor — only X and Z are used; the lamp hangs from the 4.28 ceiling. */
  position: readonly [number, number, number]
}

const HangingLampImpl: React.FC<HangingLampProps> = ({ position }) => {
  const [px, , pz] = position

  return (
    <group position={[px, 0, pz]}>
      {/* Cord spans y 2.68 -> 4.28, i.e. ceiling slab down to the shade. */}
      <mesh geometry={cylinder(0.008, 0.008, 1.6, 6)} material={cordBlack} position={[0, 3.48, 0]} />
      <mesh
        geometry={cone(0.22, 0.28, 16, 1, true)}
        material={lampGold}
        position={[0, 2.54, 0]}
        rotation={[Math.PI, 0, 0]}
      />
      <mesh geometry={sphere(0.06, 12, 10)} material={bulbGlow} position={[0, 2.52, 0]} />
      <pointLight
        color="#ffeeaa"
        intensity={0.6}
        distance={4}
        position={[0, 2.44, 0]}
        castShadow={false}
      />
    </group>
  )
}

export const HangingLamp = React.memo(HangingLampImpl)
HangingLamp.displayName = 'HangingLamp'

export default HangingLamp
