import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { installationViews } from "@/data/phases"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Player360 } from "./Player360"

export function PhaseBackground() {
    const { currentPhase: planningPhase } = useStepper()
    const { mode } = useNavigationMode()
    const { currentPhase: phasagePhase } = usePhasageNav()
    const { installationIndex } = useInstallationNav()

    const imageSrc = useMemo(() => {
        const baseUrl = import.meta.env.BASE_URL
        if (mode === "planning") {
            const folderId = String((planningPhase?.id || 1) - 1).padStart(2, "0")
            return `${baseUrl}phases/Phase_${folderId}/Phasage0000.webp`
        } else if (mode === "phasage") {
            const folderId = String((phasagePhase?.id || 1) - 1).padStart(2, "0")
            return `${baseUrl}phases/Phase_${folderId}/Phasage0000.webp`
        } else {
            return `${baseUrl}${installationViews[installationIndex].image}`
        }
    }, [mode, planningPhase, phasagePhase, installationIndex])

    const altText = mode === "installation"
        ? `Installation ${installationIndex + 1}`
        : mode === "phasage"
            ? phasagePhase?.name ?? ""
            : planningPhase?.name ?? ""

    if (mode === "phasage" && phasagePhase) {
        const folderId = String((phasagePhase?.id || 1) - 1).padStart(2, "0")
        return (
            <div className="fixed inset-0 w-full select-none" style={{ height: "100dvh" }}>
                <Player360
                    folder={`Phase_${folderId}`}
                    prefix="Phasage"
                    frameCount={90}
                />
            </div>
        )
    }

    if (mode === "installation") {
        return (
            <div className="fixed inset-0 w-full select-none" style={{ height: "100dvh" }}>
                <img
                    src={imageSrc}
                    alt={altText}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500 pointer-events-none",
                        mode === "installation" ? "object-bottom" : "object-center"
                    )}
                />
            </div>
        )
    }

    if (mode === "planning" && planningPhase) {
        const folderId = String((planningPhase?.id || 1) - 1).padStart(2, "0")
        return (
            <div className="fixed inset-0 w-full select-none" style={{ height: "100dvh" }}>
                <Player360
                    folder={`Phase_${folderId}`}
                    prefix="Phasage"
                    frameCount={90}
                />
            </div>
        )
    }

}



