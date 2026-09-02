'use client'

import { memo, useCallback } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import CassavaDisplay from '@/components/viewer/objects/CassavaDisplay'
import MatookeDisplay from '@/components/viewer/objects/MatookeDisplay'
import PlantPot from '@/components/viewer/objects/PlantPot'
import SignBoard from '@/components/viewer/objects/SignBoard'
import { PLANT_POSITIONS } from '@/lib/constants'
import * as M from '@/lib/materials'
import { useSceneStore } from '@/store/useSceneStore'

/** Branded display: angled signboard, planters, cassava table and matooke baskets. */
function OrganicFoodsZoneImpl() {
  const setActiveZone = useSceneStore((s) => s.setActiveZone)

  const select = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      setActiveZone('organic')
    },
    [setActiveZone],
  )

  return (
    <group name="organic-zone">
      <mesh position={[4.5, -0.04, 5.5]} receiveShadow material={M.floorOrganic} onClick={select}>
        <boxGeometry args={[4, 0.1, 4]} />
      </mesh>

      <SignBoard />

      {PLANT_POSITIONS.map((position, i) => (
        <PlantPot key={`plant-${i}`} position={position} />
      ))}

      <CassavaDisplay />
      <MatookeDisplay />
    </group>
  )
}

export const OrganicFoodsZone = memo(OrganicFoodsZoneImpl)
export default OrganicFoodsZone
