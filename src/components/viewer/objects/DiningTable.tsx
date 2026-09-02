'use client'

import React, { useMemo, useRef } from 'react'
import type * as THREE from 'three'
import { cylinder, sphere } from '@/lib/geometry'
import { clothCream, clothWhite, flameGlow, wax, woodDark, woodMid } from '@/lib/materials'
import { useCandleFlicker } from '@/components/viewer/effects/CandleFlicker'
import DiningChair from './DiningChair'

export interface DiningTableProps {
  position: readonly [number, number, number]
  accent: 'red' | 'green'
  /** Phase offset so each table's candle flickers independently. */
  seed?: number
}

const CHAIR_RADIUS = 1.05
/** N / E / S / W around the table. */
const CHAIR_ANGLES = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5] as const

const DiningTableImpl: React.FC<DiningTableProps> = ({ position, accent, seed = 0 }) => {
  const [px, py, pz] = position
  const lightRef = useRef<THREE.PointLight>(null)
  const flameRef = useRef<THREE.Mesh>(null)

  // Cloned so the flicker hook never mutates the shared singleton.
  const flameMaterial = useMemo(() => flameGlow.clone(), [])
  useCandleFlicker(lightRef, flameRef, seed)

  const cloth = accent === 'red' ? clothWhite : clothCream

  return (
    <group position={[px, py, pz]}>
      <mesh
        geometry={cylinder(0.28, 0.32, 0.06, 20)}
        material={woodDark}
        position={[0, 0.03, 0]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={cylinder(0.08, 0.1, 0.72, 12)}
        material={woodDark}
        position={[0, 0.36, 0]}
        castShadow
      />
      <mesh
        geometry={cylinder(0.72, 0.72, 0.07, 24)}
        material={woodMid}
        position={[0, 0.755, 0]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={cylinder(0.7, 0.74, 0.02, 24)}
        material={cloth}
        position={[0, 0.8, 0]}
        receiveShadow
      />

      <mesh geometry={cylinder(0.035, 0.035, 0.13, 10)} material={wax} position={[0, 0.875, 0]} />
      <mesh
        ref={flameRef}
        geometry={sphere(0.04, 10, 8)}
        material={flameMaterial}
        position={[0, 0.97, 0]}
      />
      <pointLight
        ref={lightRef}
        color="#ff9944"
        intensity={0.5}
        distance={2.2}
        position={[0, 1.02, 0]}
        castShadow={false}
      />

      {CHAIR_ANGLES.map((angle) => (
        <DiningChair
          key={angle}
          position={[Math.sin(angle) * CHAIR_RADIUS, 0, Math.cos(angle) * CHAIR_RADIUS]}
          // Chair front is local +Z, so add PI to turn it back toward the table.
          rotationY={angle + Math.PI}
          accent={accent}
          withPerson
        />
      ))}
    </group>
  )
}

export const DiningTable = React.memo(DiningTableImpl)
DiningTable.displayName = 'DiningTable'

export default DiningTable
