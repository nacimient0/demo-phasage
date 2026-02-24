export interface PhasePoint {
  id: number
  label: string
  date?: string
  duration?: string
}

export interface Phase {
  id: number
  name: string
  shortName: string
  color: string
  points: PhasePoint[]
  startPoint: number
  endPoint: number
  image?: string
}

export type ViewMode = "phase" | "numbered"
