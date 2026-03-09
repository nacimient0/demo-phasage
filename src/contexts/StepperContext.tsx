

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { defineStepper } from "@stepperize/react"
import { phases, totalPoints } from "@/data/phases"
import type { Phase } from "@/types/phase"

// Définir les steps pour stepperize
const allSteps = Array.from({ length: totalPoints }, (_, i) => {
    const pointId = i + 1
    let pointData = { label: `Point ${pointId}`, duration: "-" }
    let phaseColor = "hsl(var(--primary))"

    for (const phase of phases) {
        const point = phase.points.find((p) => p.id === pointId)
        if (point) {
            pointData = { label: point.label, duration: point.duration || "-" }
            phaseColor = phase.color
            break
        }
    }

    return {
        id: `step-${pointId}`,
        pointId,
        label: pointData.label,
        duration: pointData.duration,
        color: phaseColor,
    }
})

const { useStepper: useStepperize } = defineStepper(...allSteps)

interface StepperContextType {
    stepper: ReturnType<typeof useStepperize>
    currentPointId: number
    currentPhase: Phase | undefined
    hoveredPointId: number | null
    setHoveredPointId: (id: number | null) => void
    hoveredPhase: Phase | undefined
    isPlaying: boolean
    setIsPlaying: (playing: boolean) => void
    goToPoint: (pointId: number) => void
}

const StepperContext = createContext<StepperContextType | undefined>(undefined)

export function StepperProvider({ children }: { children: ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hoveredPointId, setHoveredPointId] = useState<number | null>(null)
    const stepper = useStepperize()
    const currentPointId = stepper.state.current.data.pointId

    // Trouver la phase courante
    const currentPhase = phases.find(
        (phase) => currentPointId >= phase.startPoint && currentPointId <= phase.endPoint
    )

    // Trouver la phase survolée
    const hoveredPhase = hoveredPointId
        ? phases.find((phase) => hoveredPointId >= phase.startPoint && hoveredPointId <= phase.endPoint)
        : undefined

    // Navigation vers un point spécifique
    const goToPoint = useCallback((pointId: number) => {
        stepper.navigation.goTo(`step-${pointId}`)
    }, [stepper.navigation])    // Auto-play : boucle infinie point par point
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>
        if (isPlaying) {
            interval = setInterval(() => {
                if (!stepper.state.isLast) {
                    stepper.navigation.next()
                } else {
                    stepper.navigation.goTo("step-1")
                }
            }, 800)
        }
        return () => clearInterval(interval)
    }, [isPlaying, stepper.state.isLast, stepper.navigation])

    return (
        <StepperContext.Provider
            value={{
                stepper,
                currentPointId,
                currentPhase,
                hoveredPointId,
                setHoveredPointId,
                hoveredPhase,
                isPlaying,
                setIsPlaying,
                goToPoint,
            }}
        >
            {children}
        </StepperContext.Provider>
    )
}

export function useStepper() {
    const context = useContext(StepperContext)
    if (!context) {
        throw new Error("useStepper must be used within a StepperProvider")
    }
    return context
}