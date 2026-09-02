'use client'

import { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Scene from '@/components/viewer/Scene'
import { CAMERA } from '@/lib/constants'
import { CAMERA_PRESETS } from '@/components/viewer/camera/cameraPresets'

/**
 * Canvas host. Everything inside <Suspense> streams in behind the branded
 * loading overlay; renderer tone mapping and shadow settings are pinned here.
 */
export default function RestaurantViewer() {
  return (
    <>
      <Canvas
        className="h-full w-full"
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{
          fov: CAMERA.fovDesktop,
          near: 0.1,
          far: 200,
          position: [...CAMERA_PRESETS.default.position],
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.1
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </>
  )
}
