import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { installationViews } from "@/data/phases"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export function PhaseBackground() {
    const { currentPhase: planningPhase } = useStepper()
    const { mode } = useNavigationMode()
    const { currentPhase: phasagePhase } = usePhasageNav()
    const { installationIndex } = useInstallationNav()

    const imageSrc = useMemo(() => {
        const baseUrl = import.meta.env.BASE_URL
        if (mode === "planning") {
            return `${baseUrl}planning/Point_${planningPhase?.id}.jpg`
        } else if (mode === "phasage") {
            return `${baseUrl}phases/Phase_${phasagePhase?.id}.jpg`
        } else {
            return `${baseUrl}${installationViews[installationIndex].image}`
        }
    }, [mode, planningPhase, phasagePhase, installationIndex])

    const altText = mode === "installation"
        ? `Installation ${installationIndex + 1}`
        : mode === "phasage"
        ? phasagePhase?.name ?? ""
        : planningPhase?.name ?? ""

    return (
        <div className="fixed inset-0 w-full select-none" style={{ height: '100dvh' }}>
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