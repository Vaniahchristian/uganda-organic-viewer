'use client'

import { memo } from 'react'

/** Sunlit mode: one shadow-casting key light plus warm/cool fill. */
function DayLightingImpl() {
  return (
    <>
      <ambientLight color="#fff5e0" intensity={0.25} />
      <directionalLight
        color="#fff8e8"
        intensity={1.5}
        position={[6, 12, 8]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-bias={-0.0005}
      />
      <pointLight color="#ffe8c0" intensity={0.4} distance={20} position={[0, 5, -3]} castShadow={false} />
      <pointLight color="#c0e0ff" intensity={0.2} distance={15} position={[-4, 4, 5]} castShadow={false} />
    </>
  )
}

export const DayLighting = memo(DayLightingImpl)
export default DayLighting
