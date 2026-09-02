'use client'

import React from 'react'
import { Html } from '@react-three/drei'
import { box, cylinder, torus } from '@/lib/geometry'
import { basketStraw, matooke, signFace, woodDark, woodMid } from '@/lib/materials'

/**
 * Matooke = short, stubby, GREEN cooking bananas (#7ab648) — not long yellow
 * dessert bananas. Each bunch is a tight fan of 5-7 stubs rising from a shared
 * crown, sitting in a woven straw basket.
 */

const BUNCHES: readonly { readonly position: readonly [number, number, number]; readonly count: number; readonly yaw: number }[] = [
  { position: [3.2, 0, 8.0], count: 6, yaw: 0.2 },
  { position: [3.8, 0, 8.3], count: 7, yaw: -0.35 },
  { position: [4.4, 0, 8.0], count: 5, yaw: 0.55 },
]

const FAN_STEP = 0.26
const BANANA_HALF = 0.14

interface MatookeBunchProps {
  position: readonly [number, number, number]
  count: number
  yaw: number
}

const MatookeBunch: React.FC<MatookeBunchProps> = ({ position, count, yaw }) => {
  const [px, py, pz] = position

  return (
    <group position={[px, py, pz]} rotation={[0, yaw, 0]}>
      <mesh
        geometry={cylinder(0.22, 0.18, 0.2, 12)}
        material={basketStraw}
        position={[0, 0.1, 0]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={torus(0.22, 0.015, 6, 24)}
        material={basketStraw}
        position={[0, 0.2, 0]}
        rotation={[Math.PI * 0.5, 0, 0]}
      />

      {/* Whole hand tilted forward as specified. */}
      <group position={[0, 0.2, 0]} rotation={[0.15, 0, 0]}>
        {Array.from({ length: count }, (_, i) => {
          const angle = (i - (count - 1) / 2) * FAN_STEP
          // Cylinder's +Y is rotated onto (sin a, cos a), so the stubs radiate
          // from a common crown at the basket mouth.
          return (
            <mesh
              key={`matooke-${i}`}
              geometry={cylinder(0.06, 0.04, 0.28, 10)}
              material={matooke}
              position={[
                Math.sin(angle) * BANANA_HALF,
                Math.cos(angle) * BANANA_HALF,
                (i % 2 === 0 ? 0.02 : -0.02),
              ]}
              rotation={[0, 0, -angle]}
              castShadow
            />
          )
        })}
      </group>
    </group>
  )
}

const MatookeDisplayImpl: React.FC = () => (
  <group>
    <mesh geometry={box(0.8, 0.35, 0.5)} material={woodDark} position={[3.8, 0.17, 7.6]} castShadow receiveShadow />
    <mesh geometry={box(0.86, 0.04, 0.56)} material={woodMid} position={[3.8, 0.37, 7.6]} castShadow receiveShadow />

    {BUNCHES.map((bunch) => (
      <MatookeBunch
        key={`${bunch.position[0]}:${bunch.position[2]}`}
        position={bunch.position}
        count={bunch.count}
        yaw={bunch.yaw}
      />
    ))}

    {/* Placard on the low table. */}
    <group position={[3.8, 0, 7.44]}>
      <mesh geometry={cylinder(0.02, 0.02, 0.34, 8)} material={woodDark} position={[0, 0.56, 0]} />
      <mesh geometry={box(0.6, 0.2, 0.03)} material={signFace} position={[0, 0.78, 0]} />
      <Html transform occlude center position={[0, 0.78, 0.025]} scale={0.0024} zIndexRange={[8, 0]}>
        <div
          className="pointer-events-none select-none"
          style={{
            width: 240,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 42,
            lineHeight: 1,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#1a5c2a',
          }}
        >
          Fresh Matooke
        </div>
      </Html>
    </group>

    <pointLight
      color="#aadd44"
      intensity={0.3}
      distance={1.5}
      position={[3.8, 0.9, 8.0]}
      castShadow={false}
    />
  </group>
)

export const MatookeDisplay = React.memo(MatookeDisplayImpl)
MatookeDisplay.displayName = 'MatookeDisplay'

export default MatookeDisplay
