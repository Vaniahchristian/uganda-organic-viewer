'use client'

import React from 'react'
import { BAR_STOOL_X } from '@/lib/constants'
import { box, cylinder } from '@/lib/geometry'
import { fabricRed, glassGreen, metalBar, metalShiny, woodDark } from '@/lib/materials'

/** Positions are baked from the PRD: the counter runs the full back wall at z = -7.3. */
const COUNTER_Z = -7.3
const BOTTLE_COUNT = 8
const BOTTLE_SPACING = 0.7
const STOOL_Z = -6.45

const BarCounterImpl: React.FC = () => (
  <group>
    <mesh
      geometry={box(9, 1.05, 0.85)}
      material={woodDark}
      position={[0, 0.52, COUNTER_Z]}
      castShadow
      receiveShadow
    />
    <mesh
      geometry={box(9.1, 0.07, 1)}
      material={metalBar}
      position={[0, 1.08, COUNTER_Z]}
      castShadow
      receiveShadow
    />

    {Array.from({ length: BOTTLE_COUNT }, (_, i) => {
      const x = (i - (BOTTLE_COUNT - 1) / 2) * BOTTLE_SPACING
      return (
        <mesh
          key={`bottle-${i}`}
          geometry={cylinder(0.06, 0.05, 0.28, 10)}
          material={glassGreen}
          position={[x, 1.28, -7.25]}
        />
      )
    })}

    {BAR_STOOL_X.map((x) => (
      <group key={`stool-${x}`} position={[x, 0, STOOL_Z]}>
        <mesh geometry={cylinder(0.15, 0.15, 0.04, 16)} material={metalShiny} position={[0, 0.04, 0]} />
        <mesh geometry={cylinder(0.025, 0.025, 0.8, 10)} material={metalShiny} position={[0, 0.4, 0]} castShadow />
        <mesh
          geometry={cylinder(0.22, 0.22, 0.05, 18)}
          material={fabricRed}
          position={[0, 0.8, 0]}
          castShadow
          receiveShadow
        />
      </group>
    ))}
  </group>
)

export const BarCounter = React.memo(BarCounterImpl)
BarCounter.displayName = 'BarCounter'

export default BarCounter
