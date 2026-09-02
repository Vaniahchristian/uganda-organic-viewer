'use client'

import React from 'react'
import { Html } from '@react-three/drei'
import { BRAND } from '@/lib/constants'
import { box, cylinder } from '@/lib/geometry'
import { greenSign, metalShiny, signFace, signGlowStrip } from '@/lib/materials'

/** Angled exactly as sketched: group anchored at (4.5, 1.8, 5.5), yawed -PI * 0.18. */
const SIGN_POSITION: [number, number, number] = [4.5, 1.8, 5.5]
const SIGN_ROTATION_Y = -Math.PI * 0.18

const SignBoardImpl: React.FC = () => (
  <group position={SIGN_POSITION} rotation={[0, SIGN_ROTATION_Y, 0]}>
    <mesh geometry={box(3.5, 1.8, 0.22)} material={greenSign} castShadow receiveShadow />
    <mesh geometry={box(3.3, 1.6, 0.05)} material={signFace} position={[0, 0, 0.12]} />
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

    <Html transform occlude center position={[0, 0.02, 0.16]} scale={0.005} zIndexRange={[8, 0]}>
      <div
        className="pointer-events-none select-none"
        style={{
          width: 620,
          textAlign: 'center',
          fontWeight: 800,
          fontSize: 78,
          lineHeight: 1.05,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: '#ffffff',
          // White per brand, but stroked deep green so it still reads on the white face.
          textShadow: '0 6px 18px rgba(0,0,0,0.45)',
          WebkitTextStroke: '4px #1a6b2a',
          paintOrder: 'stroke fill',
        }}
      >
        {BRAND.name}
      </div>
    </Html>
  </group>
)

export const SignBoard = React.memo(SignBoardImpl)
SignBoard.displayName = 'SignBoard'

export default SignBoard
