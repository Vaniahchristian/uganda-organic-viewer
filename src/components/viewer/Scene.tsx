'use client'

import { memo } from 'react'
import { Preload } from '@react-three/drei'
import CameraController from '@/components/viewer/camera/CameraController'
import DayLighting from '@/components/viewer/lighting/DayLighting'
import NightLighting from '@/components/viewer/lighting/NightLighting'
import KitchenZone from '@/components/viewer/zones/KitchenZone'
import OrganicFoodsZone from '@/components/viewer/zones/OrganicFoodsZone'
import RestaurantZone from '@/components/viewer/zones/RestaurantZone'
import { FOG } from '@/lib/constants'
import * as M from '@/lib/materials'
import { useSceneStore } from '@/store/useSceneStore'

const BACKGROUND = { day: '#c9b48a', night: '#05070d' } as const

/** Wall separating the dining room from the kitchen / organic display. */
function DividingWall({ hideTop }: { hideTop: boolean }) {
  return (
    <group name="dividing-wall" visible={!hideTop}>
      <mesh position={[0, 2.1, 1.5]} receiveShadow material={M.wallDivider}>
        <boxGeometry args={[16, 4.2, 0.18]} />
      </mesh>
      <mesh position={[-3, 2.1, 1.5]} material={M.wallAccent}>
        <boxGeometry args={[0.25, 4.2, 0.18]} />
      </mesh>
      <mesh position={[3, 2.1, 1.5]} material={M.wallAccent}>
        <boxGeometry args={[0.25, 4.2, 0.18]} />
      </mesh>
      <mesh position={[0, 4.05, 1.5]} material={M.wallAccent}>
        <boxGeometry args={[6, 0.3, 0.2]} />
      </mesh>
    </group>
  )
}

function SceneImpl() {
  const lightingMode = useSceneStore((s) => s.lightingMode)
  const isFloorPlan = useSceneStore((s) => s.isFloorPlan)
  const isNight = lightingMode === 'night'

  return (
    <>
      <color attach="background" args={[isNight ? BACKGROUND.night : BACKGROUND.day]} />
      <fogExp2
        attach="fog"
        args={[isNight ? BACKGROUND.night : BACKGROUND.day, isNight ? FOG.night : FOG.day]}
      />

      {isNight ? <NightLighting /> : <DayLighting />}

      <CameraController />

      <RestaurantZone />
      <DividingWall hideTop={isFloorPlan} />
      <KitchenZone />
      <OrganicFoodsZone />

      <Preload all />
    </>
  )
}

export const Scene = memo(SceneImpl)
export default Scene
