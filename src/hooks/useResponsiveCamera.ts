import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { CAMERA } from '@/lib/constants'

export const MOBILE_BREAKPOINT = 768

export interface ResponsiveCamera {
  isMobile: boolean
  /** Extra orbit radius on small screens so the whole room still fits. */
  distanceBoost: number
}

/** Widens FOV and pulls the camera back once the viewport goes mobile-sized. */
export function useResponsiveCamera(): ResponsiveCamera {
  const camera = useThree((s) => s.camera)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    camera.fov = isMobile ? CAMERA.fovMobile : CAMERA.fovDesktop
    camera.updateProjectionMatrix()
  }, [camera, isMobile])

  return { isMobile, distanceBoost: isMobile ? 3 : 0 }
}

/** Same breakpoint, usable outside the Canvas (HUD components). */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return isMobile
}
