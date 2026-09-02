'use client'

import React from 'react'
import { Html } from '@react-three/drei'
import { box, cylinder } from '@/lib/geometry'
import { cassava, metalShiny, signFace, woodDark, woodMid } from '@/lib/materials'

/** Table centre from the PRD; everything else is local to it. */
const TABLE_POSITION: [number, number, number] = [5.5, 0, 7.8]

/** Three roots laid on their sides, each nudged so the pile is not a grid. */
const ROOTS: readonly { readonly offset: readonly [number, number]; readonly yaw: number }[] = [
  { offset: [-0.4, -0.12], yaw: 0.35 },
  { offset: [0, 0.1], yaw: -0.18 },
  { offset: [0.4, -0.05], yaw: 0.62 },
]

const CassavaDisplayImpl: React.FC = () => (
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
      <mesh geometry={box(0.62, 0.22, 0.03)} material={signFace} position={[0, 1.24, 0]} />
      <Html transform occlude center position={[0, 1.24, 0.025]} scale={0.0024} zIndexRange={[8, 0]}>
        <div
          className="pointer-events-none select-none"
          style={{
            width: 250,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 44,
            lineHeight: 1,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#3a2408',
          }}
        >
          Fresh Cassava
        </div>
      </Html>
    </group>
  </group>
)

export const CassavaDisplay = React.memo(CassavaDisplayImpl)
CassavaDisplay.displayName = 'CassavaDisplay'

export default CassavaDisplay
