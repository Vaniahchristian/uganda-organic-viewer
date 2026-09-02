'use client'

import { memo, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useOrbitControls } from '@/hooks/useOrbitControls'
import { useResponsiveCamera } from '@/hooks/useResponsiveCamera'
import { useSceneStore } from '@/store/useSceneStore'
import { CAMERA } from '@/lib/constants'
import { CAMERA_PRESETS } from './cameraPresets'
import type { CameraPresetDef } from '@/types/scene.types'

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/** Shortest signed angular distance, so a preset never spins the long way round. */
function shortestAngle(from: number, to: number): number {
  return ((((to - from) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI
}

function CameraControllerImpl() {
  const camera = useThree((s) => s.camera)
  const orbit = useOrbitControls()
  const { distanceBoost } = useResponsiveCamera()

  const activePreset = useSceneStore((s) => s.activeCameraPreset)
  const setTransitioning = useSceneStore((s) => s.setTransitioning)

  const from = useRef({ radius: 0, phi: 0, theta: 0, target: new THREE.Vector3() })
  const to = useRef({ radius: 0, phi: 0, theta: 0, target: new THREE.Vector3() })
  const elapsed = useRef(Number.POSITIVE_INFINITY)

  const scratch = useMemo(
    () => ({ offset: new THREE.Vector3(), spherical: new THREE.Spherical(), pos: new THREE.Vector3() }),
    [],
  )

  // Re-aim whenever the preset changes (and once on mount, which snaps rather than lerps).
  useEffect(() => {
    // Indexed rather than spread: `preset` is a union of six tuple types and
    // TS will not spread a union into fixed parameters.
    const preset: CameraPresetDef = CAMERA_PRESETS[activePreset]
    const target = new THREE.Vector3(preset.target[0], preset.target[1], preset.target[2])
    scratch.offset
      .set(preset.position[0], preset.position[1], preset.position[2])
      .sub(target)
    scratch.spherical.setFromVector3(scratch.offset)

    const radius = THREE.MathUtils.clamp(
      scratch.spherical.radius + distanceBoost,
      CAMERA.minDistance,
      CAMERA.maxDistance,
    )
    const phi = THREE.MathUtils.clamp(scratch.spherical.phi, CAMERA.minPolar, CAMERA.maxPolar)

    const first = elapsed.current === Number.POSITIVE_INFINITY

    from.current = {
      radius: first ? radius : orbit.current.spherical.radius,
      phi: first ? phi : orbit.current.spherical.phi,
      theta: first ? scratch.spherical.theta : orbit.current.spherical.theta,
      target: first ? target.clone() : orbit.current.target.clone(),
    }
    to.current = { radius, phi, theta: scratch.spherical.theta, target }

    if (first) {
      orbit.current.spherical.set(radius, phi, scratch.spherical.theta)
      orbit.current.target.copy(target)
      elapsed.current = CAMERA.transitionSeconds
      return
    }

    elapsed.current = 0
    setTransitioning(true)
  }, [activePreset, distanceBoost, orbit, scratch, setTransitioning])

  useFrame((_, delta) => {
    const o = orbit.current

    if (elapsed.current < CAMERA.transitionSeconds) {
      // A drag mid-flight hands control straight back to the user.
      if (o.userInteracting) {
        elapsed.current = CAMERA.transitionSeconds
        setTransitioning(false)
      } else {
        elapsed.current = Math.min(elapsed.current + delta, CAMERA.transitionSeconds)
        const t = easeInOutCubic(elapsed.current / CAMERA.transitionSeconds)
        o.spherical.radius = THREE.MathUtils.lerp(from.current.radius, to.current.radius, t)
        o.spherical.phi = THREE.MathUtils.lerp(from.current.phi, to.current.phi, t)
        o.spherical.theta =
          from.current.theta + shortestAngle(from.current.theta, to.current.theta) * t
        o.target.lerpVectors(from.current.target, to.current.target, t)
        if (elapsed.current >= CAMERA.transitionSeconds) setTransitioning(false)
      }
    }

    o.spherical.phi = THREE.MathUtils.clamp(o.spherical.phi, CAMERA.minPolar, CAMERA.maxPolar)
    o.spherical.radius = THREE.MathUtils.clamp(
      o.spherical.radius,
      CAMERA.minDistance,
      CAMERA.maxDistance,
    )
    o.spherical.makeSafe()

    scratch.pos.setFromSpherical(o.spherical).add(o.target)
    camera.position.copy(scratch.pos)
    camera.lookAt(o.target)
  })

  return null
}

export const CameraController = memo(CameraControllerImpl)
export default CameraController
