import * as THREE from 'three'

/**
 * Geometry factory + cache. Repeated shapes (chair legs, bottles, stools) share
 * one BufferGeometry instead of allocating per mesh.
 */
const cache = new Map<string, THREE.BufferGeometry>()

function memo<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  const hit = cache.get(key)
  if (hit) return hit as T
  const geo = make()
  cache.set(key, geo)
  return geo
}

export function box(w: number, h: number, d: number): THREE.BoxGeometry {
  return memo(`box:${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d))
}

export function cylinder(
  rTop: number,
  rBottom: number,
  h: number,
  radial = 16,
): THREE.CylinderGeometry {
  return memo(`cyl:${rTop},${rBottom},${h},${radial}`, () =>
    new THREE.CylinderGeometry(rTop, rBottom, h, radial),
  )
}

export function sphere(r: number, widthSeg = 16, heightSeg = 12): THREE.SphereGeometry {
  return memo(`sph:${r},${widthSeg},${heightSeg}`, () =>
    new THREE.SphereGeometry(r, widthSeg, heightSeg),
  )
}

export function cone(
  r: number,
  h: number,
  radial = 16,
  heightSeg = 1,
  openEnded = false,
): THREE.ConeGeometry {
  return memo(`cone:${r},${h},${radial},${heightSeg},${openEnded}`, () =>
    new THREE.ConeGeometry(r, h, radial, heightSeg, openEnded),
  )
}

export function torus(r: number, tube: number, radial = 8, tubular = 24): THREE.TorusGeometry {
  return memo(`tor:${r},${tube},${radial},${tubular}`, () =>
    new THREE.TorusGeometry(r, tube, radial, tubular),
  )
}

/** Even radial layout — used for chairs around a table and burners on a hob. */
export function ringPositions(count: number, radius: number, phase = 0): [number, number][] {
  return Array.from({ length: count }, (_, i) => {
    const a = phase + (i / count) * Math.PI * 2
    return [Math.sin(a) * radius, Math.cos(a) * radius]
  })
}
