import type { TableData, Vec3, Zone, ZoneMeta } from '@/types/scene.types'

export const ROOM = {
  restaurantFloor: { color: '#6b4a1e' },
  kitchenFloor: { color: '#4a3318' },
  organicFloor: { color: '#2a4a1a' },
  wallPlaster: { color: '#f2e8d4' },
  wallAccent: { color: '#4a2800' },
  ceiling: { color: '#e0d4bc' },
  height: 4.2,
} as const

export const BRAND = {
  primaryGreen: '#1a6b2a',
  accentGold: '#d4930a',
  organicSign: '#00ee55',
  tagline: 'Naturally Ugandan. Authentically Fresh.',
  name: 'Uganda Organic Foods',
} as const

export const ZONES: Record<Zone, ZoneMeta> = {
  restaurant: {
    label: 'Restaurant',
    emoji: '🍽',
    color: '#5c3010',
    description:
      'Seating capacity: 24 guests across 6 round tables. Full bar service with 5 stools. Premium sound system.',
  },
  kitchen: {
    label: 'Kitchen',
    emoji: '🍳',
    color: '#ff4400',
    description:
      'Open kitchen with dual commercial stoves, stainless prep surfaces, and full extraction.',
  },
  organic: {
    label: 'Uganda Organic',
    emoji: '🌿',
    color: '#1a6b2a',
    description:
      "Branded display featuring Uganda's finest — fresh matooke and cassava, sourced directly from local farmers. The heart of Ugandan cuisine, served fresh daily.",
  },
}

export const LEGEND = [
  { dot: '🟤', label: 'Bar & Speakers' },
  { dot: '🔵', label: 'Dining Area' },
  { dot: '🟠', label: 'Kitchen' },
  { dot: '🟢', label: 'Uganda Organic Foods' },
  { dot: '🟡', label: 'Matooke & Cassava' },
] as const

/** Six round tables: left column red fabric, right column green fabric. */
export const TABLES: readonly TableData[] = [
  { id: 'l1', position: [-5, 0, -5.5], accent: 'red' },
  { id: 'l2', position: [-5, 0, -3], accent: 'red' },
  { id: 'l3', position: [-5, 0, -0.5], accent: 'red' },
  { id: 'r1', position: [5, 0, -5.5], accent: 'green' },
  { id: 'r2', position: [5, 0, -3], accent: 'green' },
  { id: 'r3', position: [5, 0, -0.5], accent: 'green' },
]

export const BAR_STOOL_X = [-3, -1.5, 0, 1.5, 3] as const

export const SPEAKER_POSITIONS: readonly Vec3[] = [
  [-7.3, 0.5, -7.1],
  [6.6, 0.5, -7.1],
]

export const STOVE_POSITIONS: readonly Vec3[] = [
  [-5.5, 0.44, 5.2],
  [-2.5, 0.44, 5.2],
]

export const PLANT_POSITIONS: readonly Vec3[] = [
  [2.8, 0, 4.5],
  [2.8, 0, 6.5],
  [6.2, 0, 4.5],
  [6.2, 0, 6.5],
]

export const CAMERA = {
  fovDesktop: 52,
  fovMobile: 65,
  minDistance: 4,
  maxDistance: 30,
  minPolar: Math.PI * (10 / 180),
  maxPolar: Math.PI * (85 / 180),
  transitionSeconds: 1.2,
} as const

// ponytail: PRD's 0.045/0.055 FogExp2 density greys out the whole 16m room
// (exp(-(0.045*20)^2) ~= 44% visibility at orbit distance). Dialled to a value
// that still culls far geometry but keeps the scene readable. Tune here.
export const FOG = { day: 0.018, night: 0.024 } as const
