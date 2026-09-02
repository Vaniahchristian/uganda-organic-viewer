import * as THREE from 'three'

/**
 * Shared material singletons. Reused across every mesh so three.js compiles one
 * program per material instead of one per instance.
 */
export const floorTile = new THREE.MeshStandardMaterial({ color: '#6b4a1e', roughness: 0.85 })
export const floorKitchen = new THREE.MeshStandardMaterial({ color: '#4a3318', roughness: 0.9 })
export const floorOrganic = new THREE.MeshStandardMaterial({ color: '#2a4a1a', roughness: 0.9 })
export const wallPlaster = new THREE.MeshStandardMaterial({ color: '#f2e8d4', roughness: 0.95 })
export const wallDivider = new THREE.MeshStandardMaterial({ color: '#e0d4bc', roughness: 0.95 })
export const wallAccent = new THREE.MeshStandardMaterial({ color: '#4a2800', roughness: 0.8 })
export const ceiling = new THREE.MeshStandardMaterial({ color: '#e0d4bc', roughness: 0.95 })
export const woodDark = new THREE.MeshStandardMaterial({ color: '#2e1a06', roughness: 0.5, metalness: 0.05 })
export const woodMid = new THREE.MeshStandardMaterial({ color: '#5c3010', roughness: 0.6 })
export const clothWhite = new THREE.MeshStandardMaterial({ color: '#f7f4ec', roughness: 0.95 })
export const clothCream = new THREE.MeshStandardMaterial({ color: '#e3ecd8', roughness: 0.95 })
export const fabricRed = new THREE.MeshStandardMaterial({ color: '#c0392b', roughness: 0.9 })
export const fabricGreen = new THREE.MeshStandardMaterial({ color: '#1a5c2a', roughness: 0.9 })
export const metalBar = new THREE.MeshStandardMaterial({ color: '#1c1c1c', roughness: 0.2, metalness: 0.7 })
export const metalShiny = new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.1, metalness: 0.9 })
export const speakerBody = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.8, metalness: 0.1 })
export const speakerGrille = new THREE.MeshStandardMaterial({ color: '#333333', roughness: 0.9 })
export const stoveBody = new THREE.MeshStandardMaterial({ color: '#222222', roughness: 0.3, metalness: 0.6 })
export const stoveTop = new THREE.MeshStandardMaterial({ color: '#1c1c1c', roughness: 0.2, metalness: 0.8 })
export const greenSign = new THREE.MeshStandardMaterial({ color: '#1a6b2a', roughness: 0.5, metalness: 0.05 })
export const signFace = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.6 })
export const cassava = new THREE.MeshStandardMaterial({ color: '#e8d5a0', roughness: 0.95 })
export const matooke = new THREE.MeshStandardMaterial({ color: '#7ab648', roughness: 0.85 })
export const basketStraw = new THREE.MeshStandardMaterial({ color: '#c8a05a', roughness: 0.95 })
export const terracotta = new THREE.MeshStandardMaterial({ color: '#b05c2a', roughness: 0.7 })
export const leafDark = new THREE.MeshStandardMaterial({ color: '#1f5c22', roughness: 0.9 })
export const leafLight = new THREE.MeshStandardMaterial({ color: '#3d8c35', roughness: 0.9 })
export const glassGreen = new THREE.MeshStandardMaterial({
  color: '#1d4a24',
  roughness: 0.15,
  metalness: 0.2,
  transparent: true,
  opacity: 0.85,
})
export const lampGold = new THREE.MeshStandardMaterial({
  color: '#d4930a',
  roughness: 0.2,
  metalness: 0.6,
  emissive: new THREE.Color('#ffcc44'),
  emissiveIntensity: 0.4,
  side: THREE.DoubleSide,
})
export const cordBlack = new THREE.MeshStandardMaterial({ color: '#222222', roughness: 0.9 })
export const wax = new THREE.MeshStandardMaterial({ color: '#fffbe8', roughness: 0.7 })
export const skin = new THREE.MeshStandardMaterial({ color: '#c07840', roughness: 0.85 })
export const childShirt = new THREE.MeshStandardMaterial({ color: '#ff9933', roughness: 0.9 })
export const personDark = new THREE.MeshStandardMaterial({ color: '#3a3f4a', roughness: 0.9 })

/** Emissive materials are cloned per-instance where a hook animates them. */
export const bulbGlow = new THREE.MeshStandardMaterial({
  color: '#ffe88a',
  emissive: new THREE.Color('#ffe88a'),
  emissiveIntensity: 3,
})
export const flameGlow = new THREE.MeshStandardMaterial({
  color: '#ffaa33',
  emissive: new THREE.Color('#ff5500'),
  emissiveIntensity: 2,
})
export const burnerGlow = new THREE.MeshStandardMaterial({
  color: '#4a0f00',
  emissive: new THREE.Color('#ff2200'),
  emissiveIntensity: 1.4,
})
export const ledBlue = new THREE.MeshStandardMaterial({
  color: '#003344',
  emissive: new THREE.Color('#00ccff'),
  emissiveIntensity: 2,
})
export const signGlowStrip = new THREE.MeshStandardMaterial({
  color: '#0b3d1a',
  emissive: new THREE.Color('#00ff66'),
  emissiveIntensity: 1.5,
})
