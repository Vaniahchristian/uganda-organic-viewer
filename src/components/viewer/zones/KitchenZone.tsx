'use client'

import { memo, useCallback } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import CookingStove from '@/components/viewer/objects/CookingStove'
import { STOVE_POSITIONS } from '@/lib/constants'
import * as M from '@/lib/materials'
import { useSceneStore } from '@/store/useSceneStore'

const UTENSIL_X = [-5.2, -4.8, -4.4, -4.0, -3.6, -3.2, -2.8, -2.4]

/** Open kitchen: dual stoves, extraction hood, prep counter with a utensil rack. */
function KitchenZoneImpl() {
  const setActiveZone = useSceneStore((s) => s.setActiveZone)
  const isFloorPlan = useSceneStore((s) => s.isFloorPlan)

  const select = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      setActiveZone('kitchen')
    },
    [setActiveZone],
  )

  return (
    <group name="kitchen-zone">
      {/* Shell */}
      <mesh position={[-3.5, -0.09, 4.5]} receiveShadow material={M.floorKitchen} onClick={select}>
        <boxGeometry args={[9, 0.18, 8]} />
      </mesh>
      <mesh position={[-3.5, 2.1, 8.5]} receiveShadow material={M.wallPlaster}>
        <boxGeometry args={[9, 4.2, 0.18]} />
      </mesh>
      <mesh position={[-8, 2.1, 4.5]} receiveShadow material={M.wallPlaster}>
        <boxGeometry args={[0.18, 4.2, 8]} />
      </mesh>
      <mesh position={[-3.5, 4.28, 4.5]} visible={!isFloorPlan} material={M.ceiling}>
        <boxGeometry args={[9, 0.15, 8]} />
      </mesh>

      {STOVE_POSITIONS.map((position, i) => (
        <CookingStove key={`stove-${i}`} position={position} />
      ))}

      {/* Extraction hood + duct to ceiling */}
      <mesh position={[-4, 2.5, 5.2]} castShadow material={M.metalBar}>
        <boxGeometry args={[2.5, 0.15, 0.6]} />
      </mesh>
      <mesh position={[-4, 2.62, 5.2]} material={M.metalShiny}>
        <boxGeometry args={[2.5, 0.06, 0.6]} />
      </mesh>
      <mesh position={[-4, 3.2, 5.2]} material={M.metalBar}>
        <cylinderGeometry args={[0.2, 0.2, 1.0, 16]} />
      </mesh>

      {/* Prep counter along the back wall */}
      <mesh position={[-4, 0.44, 7.9]} castShadow receiveShadow material={M.woodDark}>
        <boxGeometry args={[4.5, 0.88, 0.7]} />
      </mesh>
      <mesh position={[-4, 0.9, 7.9]} castShadow material={M.metalShiny}>
        <boxGeometry args={[4.6, 0.05, 0.8]} />
      </mesh>

      {/* Utensil rack */}
      <mesh position={[-4, 2.8, 7.5]} material={M.metalBar}>
        <boxGeometry args={[3, 0.04, 0.04]} />
      </mesh>
      {UTENSIL_X.map((x) => (
        <group key={`utensil-${x}`} position={[x, 2.66, 7.5]}>
          <mesh material={M.metalShiny}>
            <cylinderGeometry args={[0.008, 0.008, 0.25, 6]} />
          </mesh>
          <mesh position={[0, -0.16, 0]} material={M.metalShiny}>
            <boxGeometry args={[0.09, 0.07, 0.012]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export const KitchenZone = memo(KitchenZoneImpl)
export default KitchenZone
