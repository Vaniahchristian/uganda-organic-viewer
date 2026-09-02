'use client'

import { memo, useCallback } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import BarCounter from '@/components/viewer/objects/BarCounter'
import DiningTable from '@/components/viewer/objects/DiningTable'
import HangingLamp from '@/components/viewer/objects/HangingLamp'
import Speaker from '@/components/viewer/objects/Speaker'
import { SPEAKER_POSITIONS, TABLES } from '@/lib/constants'
import * as M from '@/lib/materials'
import { useSceneStore } from '@/store/useSceneStore'

/** Dining room: shell, bar, corner speakers, six laid tables under pendant lamps. */
function RestaurantZoneImpl() {
  const setActiveZone = useSceneStore((s) => s.setActiveZone)
  // Top-down floor plan would otherwise stare at the underside of the ceiling.
  const isFloorPlan = useSceneStore((s) => s.isFloorPlan)

  const select = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      setActiveZone('restaurant')
    },
    [setActiveZone],
  )

  return (
    <group name="restaurant-zone">
      {/* Shell */}
      <mesh position={[0, -0.09, -3]} receiveShadow material={M.floorTile} onClick={select}>
        <boxGeometry args={[16, 0.18, 10]} />
      </mesh>
      <mesh position={[0, 2.1, -8]} receiveShadow material={M.wallPlaster}>
        <boxGeometry args={[16, 4.2, 0.18]} />
      </mesh>
      <mesh position={[-8, 2.1, -3]} receiveShadow material={M.wallPlaster}>
        <boxGeometry args={[0.18, 4.2, 10]} />
      </mesh>
      <mesh position={[8, 2.1, -3]} receiveShadow material={M.wallPlaster}>
        <boxGeometry args={[0.18, 4.2, 10]} />
      </mesh>
      <mesh position={[0, 4.28, -3]} visible={!isFloorPlan} material={M.ceiling}>
        <boxGeometry args={[16, 0.15, 10]} />
      </mesh>

      {/* Wainscot: 0.6 high accent strip, offset a hair off each wall so it reads as trim */}
      <mesh position={[0, 0.3, -7.89]} material={M.wallAccent}>
        <boxGeometry args={[16, 0.6, 0.05]} />
      </mesh>
      <mesh position={[-7.89, 0.3, -3]} material={M.wallAccent}>
        <boxGeometry args={[0.05, 0.6, 10]} />
      </mesh>
      <mesh position={[7.89, 0.3, -3]} material={M.wallAccent}>
        <boxGeometry args={[0.05, 0.6, 10]} />
      </mesh>

      <BarCounter />

      {SPEAKER_POSITIONS.map((position, i) => (
        <Speaker key={`speaker-${i}`} position={position} />
      ))}

      {TABLES.map((table, i) => (
        <group key={table.id}>
          <DiningTable position={table.position} accent={table.accent} seed={i} />
          <HangingLamp position={table.position} />
        </group>
      ))}
    </group>
  )
}

export const RestaurantZone = memo(RestaurantZoneImpl)
export default RestaurantZone
