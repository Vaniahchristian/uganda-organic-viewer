'use client'

import React, { useMemo } from 'react'
import { BRAND } from '@/lib/constants'
import { box, cylinder } from '@/lib/geometry'
import { labelTexture } from '@/lib/labelTexture'
import { greenSign, metalShiny, signGlowStrip } from '@/lib/materials'

/** Angled exactly as sketched: group anchored at (4.5, 1.8, 5.5), yawed -PI * 0.18. */
const SIGN_POSITION: [number, number, number] = [4.5, 1.8, 5.5]
const SIGN_ROTATION_Y = -Math.PI * 0.18

const SignBoardImpl: React.FC = () => {
  // Branding is painted into the face texture rather than overlaid as DOM, so
  // it catches the sign's own green wash and never drifts out of alignment.
  const faceMap = useMemo(
    () =>
      labelTexture(BRAND.name, {
        width: 1024,
        height: 512,
        background: '#ffffff',
        color: '#1a6b2a',
        // 3 wrapped lines + tagline must fit 512px: 3 * 112 * 1.15 + 81 = 467.
        fontSize: 112,
        subtitle: BRAND.tagline,
      }),
    [],
  )

  return (
  <group position={SIGN_POSITION} rotation={[0, SIGN_ROTATION_Y, 0]}>
    <mesh geometry={box(3.5, 1.8, 0.22)} material={greenSign} castShadow receiveShadow />
    <mesh geometry={box(3.3, 1.6, 0.05)} position={[0, 0, 0.12]}>
      <meshStandardMaterial map={faceMap} roughness={0.6} />
    </mesh>
    <mesh geometry={box(3.5, 0.12, 0.1)} material={signGlowStrip} position={[0, 0.96, 0.06]} />

    {/* Support pillars stand on the organic-zone floor (world y = 0 -> local y = -1.8). */}
    {[-1.6, 1.6].map((x) => (
      <mesh
        key={`pillar-${x}`}
        geometry={cylinder(0.08, 0.08, 3.2, 12)}
        material={metalShiny}
        position={[x, -0.2, 0]}
        castShadow
      />
    ))}

    <pointLight
      color="#00ee55"
      intensity={0.8}
      distance={3.5}
      position={[0, 0.5, 1.2]}
      castShadow={false}
    />
    <pointLight
      color="#00ee55"
      intensity={0.5}
      distance={2.5}
      position={[0, -0.8, 1]}
      castShadow={false}
    />

  </group>
  )
}

export const SignBoard = React.memo(SignBoardImpl)
SignBoard.displayName = 'SignBoard'

export default SignBoard
