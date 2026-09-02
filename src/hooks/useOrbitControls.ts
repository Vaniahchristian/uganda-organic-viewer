import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { CAMERA } from '@/lib/constants'

export interface OrbitState {
  /** Spherical coords around `target`. */
  spherical: THREE.Spherical
  target: THREE.Vector3
  /** Set by pointer/touch input; CameraController uses it to cancel a preset lerp. */
  userInteracting: boolean
}

const DRAG_SENSITIVITY_DESKTOP = 0.005
const DRAG_SENSITIVITY_TOUCH = 0.0035
const PINCH_ZOOM_SPEED = 1.6

/**
 * Hand-rolled orbit: pointer drag rotates, wheel dollies, two-finger pinch zooms.
 * Returns a mutable ref so `useFrame` can read it without re-rendering.
 */
export function useOrbitControls(enabled = true): React.MutableRefObject<OrbitState> {
  const gl = useThree((s) => s.gl)

  const state = useRef<OrbitState>({
    spherical: new THREE.Spherical(20, Math.PI / 4, Math.PI / 4),
    target: new THREE.Vector3(0, 1, 0),
    userInteracting: false,
  })

  useEffect(() => {
    if (!enabled) return
    const el = gl.domElement
    const pointers = new Map<number, { x: number; y: number }>()
    let lastPinchDistance = 0

    const clampRadius = (r: number) =>
      THREE.MathUtils.clamp(r, CAMERA.minDistance, CAMERA.maxDistance)
    const clampPhi = (p: number) => THREE.MathUtils.clamp(p, CAMERA.minPolar, CAMERA.maxPolar)

    const pinchDistance = () => {
      const [a, b] = Array.from(pointers.values())
      return Math.hypot(a.x - b.x, a.y - b.y)
    }

    const onPointerDown = (e: PointerEvent) => {
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      state.current.userInteracting = true
      if (pointers.size === 2) lastPinchDistance = pinchDistance()
      el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId)
      if (!prev) return
      const dx = e.clientX - prev.x
      const dy = e.clientY - prev.y
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointers.size === 2) {
        const d = pinchDistance()
        if (lastPinchDistance > 0) {
          const ratio = lastPinchDistance / d
          state.current.spherical.radius = clampRadius(
            state.current.spherical.radius * (1 + (ratio - 1) * PINCH_ZOOM_SPEED),
          )
        }
        lastPinchDistance = d
        return
      }

      const sens = e.pointerType === 'touch' ? DRAG_SENSITIVITY_TOUCH : DRAG_SENSITIVITY_DESKTOP
      state.current.spherical.theta -= dx * sens
      state.current.spherical.phi = clampPhi(state.current.spherical.phi - dy * sens)
    }

    const endPointer = (e: PointerEvent) => {
      pointers.delete(e.pointerId)
      if (pointers.size < 2) lastPinchDistance = 0
      if (pointers.size === 0) state.current.userInteracting = false
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      state.current.userInteracting = true
      state.current.spherical.radius = clampRadius(
        state.current.spherical.radius * Math.exp(e.deltaY * 0.001),
      )
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endPointer)
    el.addEventListener('pointercancel', endPointer)
    el.addEventListener('wheel', onWheel, { passive: false })
    // Stop the browser from claiming the drag as a scroll/zoom gesture.
    el.style.touchAction = 'none'

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endPointer)
      el.removeEventListener('pointercancel', endPointer)
      el.removeEventListener('wheel', onWheel)
    }
  }, [gl, enabled])

  return state
}
