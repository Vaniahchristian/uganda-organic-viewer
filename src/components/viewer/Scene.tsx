'use client'

import { memo, useRef } from 'react'
import { Preload } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import CameraController from '@/components/viewer/camera/CameraController'
import Cutaway from '@/components/viewer/effects/Cutaway'
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
function DividingWall() {
  return (
    // Tagged as a single unit: the whole wall drops out when viewed from the
    // restaurant side, which is what opens up the dining room in the hero shot.
    <group name="dividing-wall" userData={{ outward: [0, 0, 1] }}>
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

/**
 * The scene is entirely procedural, so drei's `useProgress` has no assets to
 * report on and never leaves 0%. Readiness is signalled from the first actually
 * rendered frame instead.
 */
function ReadySignal() {
  const setSceneReady = useSceneStore((s) => s.setSceneReady)
  const frames = useRef(0)

  useFrame(() => {
    if (frames.current > 2) return
    frames.current += 1
    if (frames.current === 3) setSceneReady(true)
  })

  return null
}

function SceneImpl() {
  const lightingMode = useSceneStore((s) => s.lightingMode)
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
      <DividingWall />
      <KitchenZone />
      <OrganicFoodsZone />

      <Cutaway />
      <Preload all />
      <ReadySignal />
    </>
  )
}

export const Scene = memo(SceneImpl)
export default Scene
