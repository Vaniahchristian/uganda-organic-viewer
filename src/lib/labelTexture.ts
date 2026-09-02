import * as THREE from 'three'

export interface LabelOptions {
  width?: number
  height?: number
  background?: string
  color?: string
  fontSize?: number
  fontWeight?: number
  /** Drawn under the main text at ~40% size, e.g. a strapline. */
  subtitle?: string
}

const cache = new Map<string, THREE.CanvasTexture>()

/**
 * Renders text to a canvas and returns it as a texture.
 *
 * Replaces drei's <Html> for in-world signage: an Html label is a DOM node
 * living outside the WebGL scene, so it ignores scene lighting, needs its own
 * occlusion pass, and its `transform` scaling is fiddly to match to geometry.
 * A texture is just part of the mesh. Browser-only — call it from a client
 * component (useMemo), never at module scope.
 */
export function labelTexture(text: string, opts: LabelOptions = {}): THREE.CanvasTexture {
  const {
    width = 1024,
    height = 512,
    background = '#ffffff',
    color = '#1a6b2a',
    fontSize = 132,
    fontWeight = 800,
    subtitle,
  } = opts

  const key = JSON.stringify([text, opts])
  const hit = cache.get(key)
  if (hit) return hit

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('labelTexture: 2D canvas context unavailable')

  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)

  const font = (size: number) =>
    `${fontWeight} ${size}px ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

  // Greedy wrap to the widest line that still fits the padded box.
  const maxWidth = width * 0.88
  ctx.font = font(fontSize)
  const lines: string[] = []
  let line = ''
  for (const word of text.toUpperCase().split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)

  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const lineHeight = fontSize * 1.15
  const subtitleSize = fontSize * 0.4
  const blockHeight = lines.length * lineHeight + (subtitle ? subtitleSize * 1.8 : 0)
  let y = height / 2 - blockHeight / 2 + lineHeight / 2

  for (const l of lines) {
    ctx.fillText(l, width / 2, y)
    y += lineHeight
  }

  if (subtitle) {
    ctx.font = font(subtitleSize)
    ctx.globalAlpha = 0.75
    ctx.fillText(subtitle, width / 2, y + subtitleSize * 0.4)
    ctx.globalAlpha = 1
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  cache.set(key, texture)
  return texture
}
