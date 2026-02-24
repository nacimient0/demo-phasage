import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export function PhaseBackground() {
    const { currentPhase, currentPointId } = useStepper()
    const { mode } = useNavigationMode()

    // Calculer l'index d'installation basé sur currentPointId
    const installationIndex = useMemo(() => {
        if (mode !== "installation") return 0
        // Diviser en 3 parties : points 1-7, 8-15, 16-22
        if (currentPointId <= 7) return 0
        if (currentPointId <= 15) return 1
        return 2
    }, [currentPointId, mode])

    // Déterminer l'image à afficher
    const imageSrc = useMemo(() => {
        if (mode === "planning") {
            // En mode planning, l'image correspond à la phase actuelle, pas au point
            return `/planning/Point_${currentPhase?.id}.jpg`
        } else if (mode === "phasage") {
            return `/phases/Phase_${currentPhase?.id}.jpg`
        } else if (mode === "installation") {
            return `/installation/Installation_${installationIndex + 1}.jpg`
        } return currentPhase?.image
    }, [mode, currentPhase, installationIndex])

    const altText = useMemo(() => {
        if (mode === "installation") return `Installation ${installationIndex + 1}`
        return currentPhase?.name || ""
    }, [mode, installationIndex, currentPhase])

    return (
        <div className="h-screen w-screen select-none">
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