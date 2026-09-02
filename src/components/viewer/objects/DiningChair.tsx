'use client'

import React from 'react'
import { box, cylinder, sphere } from '@/lib/geometry'
import { fabricGreen, fabricRed, personDark, skin, woodDark } from '@/lib/materials'

export interface DiningChairProps {
  position: readonly [number, number, number]
  /** Y rotation in radians. Local +Z is the chair's front, so the seated person faces that way. */
  rotationY: number
  accent: 'red' | 'green'
  withPerson?: boolean
}

/** Leg footprint: four posts inset from the 0.46 seat. */
const LEG_OFFSETS: readonly (readonly [number, number])[] = [
  [-0.19, -0.19],
  [0.19, -0.19],
  [-0.19, 0.19],
  [0.19, 0.19],
]

const DiningChairImpl: React.FC<DiningChairProps> = ({
  position,
  rotationY,
  accent,
  withPerson = false,
}) => {
  const [px, py, pz] = position
  const fabric = accent === 'red' ? fabricRed : fabricGreen

  return (
    <group position={[px, py, pz]} rotation={[0, rotationY, 0]}>
      {LEG_OFFSETS.map(([lx, lz]) => (
        <mesh
          key={`${lx}:${lz}`}
          geometry={cylinder(0.022, 0.022, 0.46, 8)}
          material={woodDark}
          position={[lx, 0.23, lz]}
          castShadow
        />
      ))}

      <mesh
        geometry={box(0.46, 0.05, 0.46)}
        material={fabric}
        position={[0, 0.485, 0]}
        castShadow
        receiveShadow
      />

      {/* Backrest sits on the outward side, away from the table. */}
      <mesh
        geometry={box(0.44, 0.42, 0.05)}
        material={woodDark}
        position={[0, 0.72, -0.205]}
        castShadow
      />

      {withPerson ? (
        <group position={[0, 0, 0.02]}>
          <mesh
            geometry={cylinder(0.14, 0.12, 0.35, 12)}
            material={personDark}
            position={[0, 0.685, 0]}
            castShadow
          />
          <mesh
            geometry={sphere(0.1)}
            material={skin}
            position={[0, 0.95, 0]}
            castShadow
          />
        </group>
      ) : null}
    </group>
  )
}

export const DiningChair = React.memo(DiningChairImpl)
DiningChair.displayName = 'DiningChair'

export default DiningChair
