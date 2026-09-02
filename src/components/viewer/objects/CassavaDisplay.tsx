'use client'

import React, { useMemo } from 'react'
import { box, cylinder } from '@/lib/geometry'
import { labelTexture } from '@/lib/labelTexture'
import { cassava, metalShiny, woodDark, woodMid } from '@/lib/materials'

/** Table centre from the PRD; everything else is local to it. */
const TABLE_POSITION: [number, number, number] = [5.5, 0, 7.8]

/** Three roots laid on their sides, each nudged so the pile is not a grid. */
const ROOTS: readonly { readonly offset: readonly [number, number]; readonly yaw: number }[] = [
  { offset: [-0.4, -0.12], yaw: 0.35 },
  { offset: [0, 0.1], yaw: -0.18 },
  { offset: [0.4, -0.05], yaw: 0.62 },
]

const CassavaDisplayImpl: React.FC = () => {
  const placardMap = useMemo(
    () =>
      labelTexture('Fresh Cassava', {
        width: 512,
        height: 180,
        background: '#f7f2e6',
        color: '#3a2408',
        fontSize: 96,
      }),
    [],
  )

  return (
  <group position={TABLE_POSITION}>
    <mesh geometry={box(1.6, 0.7, 1)} material={woodDark} position={[0, 0.35, 0]} castShadow receiveShadow />
    <mesh geometry={box(1.7, 0.05, 1.1)} material={woodMid} position={[0, 0.725, 0]} castShadow receiveShadow />

    {ROOTS.map(({ offset, yaw }, i) => (
      <mesh
        key={`cassava-${i}`}
        geometry={cylinder(0.09, 0.07, 0.22, 12)}
        material={cassava}
        position={[offset[0], 0.84, offset[1]]}
        rotation={[0, yaw, Math.PI * 0.5]}
        castShadow
      />
    ))}

    {/* Label stand: post + placard. */}
    <group position={[0, 0, -0.42]}>
      <mesh geometry={cylinder(0.02, 0.02, 0.5, 8)} material={metalShiny} position={[0, 1, 0]} />
      <mesh geometry={box(0.62, 0.22, 0.03)} position={[0, 1.24, 0]}>
        <meshStandardMaterial map={placardMap} roughness={0.8} />
      </mesh>
    </group>
  </group>
  )
}

export const CassavaDisplay = React.memo(CassavaDisplayImpl)
CassavaDisplay.displayName = 'CassavaDisplay'

export default CassavaDisplay
