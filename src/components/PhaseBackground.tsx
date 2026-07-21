import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { installationViews, frameCount as defaultFrameCount, phases } from "@/data/phases"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Player360 } from "./Player360"

export function PhaseBackground() {
    const { currentPhase: planningPhase, currentPointId } = useStepper()
    const { mode } = useNavigationMode()
    const { currentPhase: phasagePhase } = usePhasageNav()
    const { installationIndex } = useInstallationNav()

    // Récupère le champ "360" du point courant en mode planning
    const planning360 = useMemo(() => {
        if (!planningPhase) return null
        const point = planningPhase.points.find((p) => p.id === currentPointId)
        return point?.["360"] ?? null
    }, [planningPhase, currentPointId])

    // Récupère le champ "360" du premier point de la phase courante en mode phasage
    const phasage360 = useMemo(() => {
        if (!phasagePhase) return null
        // On utilise le premier point de la phase comme référence pour le 360
        const point = phasagePhase.points[0]
        return point?.["360"] ?? null
    }, [phasagePhase])

    const imageSrc = useMemo(() => {
        const baseUrl = import.meta.env.BASE_URL
        if (mode === "planning") {
            const folder = planning360?.folder ?? `Phase_${String((planningPhase?.id || 1) - 1).padStart(2, "00")}`
            const prefix = planning360?.prefix ?? "Phasage"
            return `${baseUrl}phases/${folder}/${prefix}0000.webp`
        } else if (mode === "phasage") {
            const folder = phasage360?.folder ?? `Phase_${String((phasagePhase?.id || 1) - 1).padStart(2, "00")}`
            const prefix = phasage360?.prefix ?? "Phasage"
            return `${baseUrl}phases/${folder}/${prefix}0000.webp`
        } else {
            return `${baseUrl}${installationViews[installationIndex].image}`
        }
    }, [mode, planningPhase, phasagePhase, installationIndex, planning360, phasage360])

    const altText = mode === "installation"
        ? `Installation ${installationIndex + 1}`
        : mode === "phasage"
            ? phasagePhase?.name ?? ""
            : planningPhase?.name ?? ""

    if (mode === "phasage" && phasagePhase) {
        const folder = phasage360?.folder ?? `Phase_${String((phasagePhase.id || 1) - 1).padStart(2, "0")}`
        const prefix = phasage360?.prefix ?? "Phasage"
        const fc = phasage360?.frameCount ?? defaultFrameCount
        return (
            <div className="fixed inset-0 w-full select-none" style={{ height: "100dvh" }}>
                <Player360
                    folder={folder}
                    prefix={prefix}
                    frameCount={fc}
                />
            </div>
        )
    }

    if (mode === "installation") {
        return (
            <div className="fixed inset-0 w-full h-screen select-none bg-black overflow-hidden flex items-center justify-center">
                {/* Blurred backdrop to fill the screen for non-standard aspect ratios (e.g. square images) */}
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-40 scale-110 pointer-events-none transition-all duration-500"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                />

                {/* Main image rendered in full view without cropping */}
                <img
                    src={imageSrc}
                    alt={altText}
                    className="relative z-10 max-w-full max-h-full object-contain transition-opacity duration-500 pointer-events-none"
                />
            </div>
        )
    }

    if (mode === "planning" && planningPhase) {
        const folder = planning360?.folder ?? `Phase_${String((planningPhase.id || 1) - 1).padStart(2, "0")}`
        const prefix = planning360?.prefix ?? "Phasage"
        const fc = planning360?.frameCount ?? defaultFrameCount
        return (
            <div className="fixed inset-0 w-full select-none" style={{ height: "100dvh" }}>
                <Player360
                    folder={folder}
                    prefix={prefix}
                    frameCount={fc}
                />
            </div>
        )
    }

}
