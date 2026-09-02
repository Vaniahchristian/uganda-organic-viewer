'use client'

import { memo } from 'react'

/**
 * Night mode is deliberately almost empty: the candles, pendant lamps, stove
 * burners and speaker LEDs live on the objects themselves and become the only
 * light sources once the sun is gone.
 */
function NightLightingImpl() {
  return (
    <>
      <ambientLight color="#102030" intensity={0.04} />
      {/* A whisper of moon so silhouettes read against the walls. */}
      <directionalLight color="#4060a0" intensity={0.08} position={[-6, 10, 6]} castShadow={false} />
    </>
  )
}

export const NightLighting = memo(NightLightingImpl)
export default NightLighting
