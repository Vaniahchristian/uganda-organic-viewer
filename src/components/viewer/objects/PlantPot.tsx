'use client'

import React from 'react'
import { cylinder, sphere } from '@/lib/geometry'
import { leafDark, leafLight, terracotta } from '@/lib/materials'

export interface PlantPotProps {
  position: readonly [number, number, number]
}

const PlantPotImpl: React.FC<PlantPotProps> = ({ position }) => {
  const [px, py, pz] = position

  return (
    <group position={[px, py, pz]}>
      <mesh
        geometry={cylinder(0.22, 0.16, 0.35, 10)}
        material={terracotta}
        position={[0, 0.175, 0]}
        castShadow
        receiveShadow
      />
      <mesh geometry={sphere(0.28, 14, 10)} material={leafDark} position={[0, 0.55, 0]} castShadow />
      <mesh geometry={sphere(0.2, 12, 10)} material={leafLight} position={[0.12, 0.7, 0.05]} castShadow />
    </group>
  )
}

export const PlantPot = React.memo(PlantPotImpl)
PlantPot.displayName = 'PlantPot'

export default PlantPot
