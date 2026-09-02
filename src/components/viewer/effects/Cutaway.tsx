'use client'

import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

/** Tag a wall/ceiling mesh with this to make it part of the cutaway. */
export interface CutawayData {
  outward: [number, number, number]
}

/** Metres past the panel's plane before it drops out — stops edge-on strobing. */
const HIDE_MARGIN = 0.15

/**
 * Dollhouse cutaway: a shell panel is hidden when the camera is on its outward
 * side, because then it sits between the viewer and the room. Walls the camera
 * is inside of stay put and keep the space feeling enclosed.
 *
 * This is a side-of-plane test, not an angle test: at shallow angles (looking
 * into the kitchen from just above the roofline) an angle test leaves the
 * ceiling up and the shot renders blank.
 *
 * ponytail: a full-scene traverse per frame. Fine for ~200 objects; if the
 * scene grows, collect the tagged meshes once on mount instead.
 */
function CutawayImpl() {
  const scene = useThree((s) => s.scene)
  const v = useMemo(
    () => ({ toCamera: new THREE.Vector3(), world: new THREE.Vector3(), normal: new THREE.Vector3() }),
    [],
  )

  useFrame(({ camera }) => {
    scene.traverse((obj) => {
      const outward = (obj.userData as Partial<CutawayData>).outward
      if (!outward) return
      obj.getWorldPosition(v.world)
      // Signed distance from the panel's plane to the camera, along its normal.
      v.toCamera.copy(camera.position).sub(v.world)
      v.normal.set(outward[0], outward[1], outward[2])
      obj.visible = v.toCamera.dot(v.normal) < HIDE_MARGIN
    })
  })

  return null
}

export const Cutaway = memo(CutawayImpl)
export default Cutaway
