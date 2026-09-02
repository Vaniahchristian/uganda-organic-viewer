'use client'

import { memo, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

/** Tag a wall/ceiling mesh with this to make it part of the cutaway. */
export interface CutawayData {
  outward: [number, number, number]
}

/** Grazing-angle deadband, so a panel doesn't strobe as you orbit past it. */
const HIDE_THRESHOLD = 0.25

/**
 * Dollhouse cutaway: any shell panel whose outward face is turned toward the
 * camera sits between the viewer and the room, so it is hidden. Walls facing
 * away stay put and keep the space feeling enclosed.
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
      v.toCamera.copy(camera.position).sub(v.world).normalize()
      v.normal.set(outward[0], outward[1], outward[2])
      obj.visible = v.toCamera.dot(v.normal) < HIDE_THRESHOLD
    })
  })

  return null
}

export const Cutaway = memo(CutawayImpl)
export default Cutaway
