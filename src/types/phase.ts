export interface Point360 {
  folder: string
  prefix?: string      // optionnel, défaut : "Phasage"
  frameCount?: number
}

export interface PhasePoint {
  id: number
  label: string
  name: string
  date?: string
  duration?: string
  minimap?: string
  orbitCenter?: { x: number; y: number }
  orbitRadius?: number   // % de la plus petite dimension de la minimap (défaut : 20)
  "360"?: Point360
}

export interface Phase {
  id: number
  name: string
  color: string
  points: PhasePoint[]
  startPoint: number
  endPoint: number
  image?: string
  folder?: string
  prefix?: string
  frameCount?: number
}

export type ViewMode = "phase" | "numbered"
