import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { phases, totalPoints } from "@/data/phases"

export function ProgressBar() {
    const { currentPointId, hoveredPointId } = useStepper()
    const { mode } = useNavigationMode()

    // Pour le mode Planning: segments par phase basés sur le nombre de points
    if (mode === "planning") {
        const currentPhaseIndex = phases.findIndex(
            phase => currentPointId >= phase.startPoint && currentPointId <= phase.endPoint
        )
        const hoveredPhaseIndex = hoveredPointId ? phases.findIndex(
            phase => hoveredPointId >= phase.startPoint && hoveredPointId <= phase.endPoint
        ) : -1

        return (
            <>
                {/* Ligne de base */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />

                {/* Aperçu au survol */}
                {hoveredPointId && hoveredPointId !== currentPointId && (
                    <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-[1] flex opacity-50">
                        {phases.map((phase, index) => {
                            const phasePoints = phase.endPoint - phase.startPoint + 1
                            const segmentWidth = `${(phasePoints / totalPoints) * 100}%`

                            let fillPercentage = 0
                            if (index < hoveredPhaseIndex) {
                                fillPercentage = 100
                            } else if (index === hoveredPhaseIndex && hoveredPointId) {
                                const pointsInPhase = hoveredPointId - phase.startPoint + 1
                                fillPercentage = (pointsInPhase / phasePoints) * 100
                            }

                            const isFirst = index === 0
                            const isLast = index === phases.length - 1

                            return (
                                <div key={`hover-phase-${phase.id}`} className="h-full relative" style={{ width: segmentWidth }}>
                                    <div
                                        className="h-full transition-all duration-300"
                                        style={{
                                            width: `${fillPercentage}%`,
                                            backgroundColor: phase.color,
                                            borderTopLeftRadius: isFirst ? '9999px' : '0',
                                            borderBottomLeftRadius: isFirst ? '9999px' : '0',
                                            borderTopRightRadius: isLast && fillPercentage === 100 ? '9999px' : '0',
                                            borderBottomRightRadius: isLast && fillPercentage === 100 ? '9999px' : '0',
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}
                {/* Barre de progression par phase */}
                <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-[2] flex">
                    {phases.map((phase, index) => {
                        const phasePoints = phase.endPoint - phase.startPoint + 1
                        const segmentWidth = `${(phasePoints / totalPoints) * 100}%`

                        let fillPercentage = 0
                        if (index < currentPhaseIndex) {
                            fillPercentage = 100
                        } else if (index === currentPhaseIndex) {
                            const pointsInPhase = currentPointId - phase.startPoint
                            fillPercentage = (pointsInPhase / (phasePoints - 1)) * 100
                        }

                        const isFirst = index === 0
                        const isLast = index === phases.length - 1

                        return (
                            <div key={`phase-${phase.id}`} className="h-full relative" style={{ width: segmentWidth }}>
                                <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                        width: `${fillPercentage}%`,
                                        backgroundColor: phase.color,
                                        borderTopLeftRadius: isFirst ? '9999px' : '0',
                                        borderBottomLeftRadius: isFirst ? '9999px' : '0',
                                        borderTopRightRadius: isLast && fillPercentage === 100 ? '9999px' : '0',
                                        borderBottomRightRadius: isLast && fillPercentage === 100 ? '9999px' : '0',
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }    // Pour le mode Phasage: la barre va jusqu'au centre du badge de phase actuel
    const currentPhaseIndex = phases.findIndex(
        p => currentPointId >= p.startPoint && currentPointId <= p.endPoint
    )

    // Calcul de la largeur de la barre en mode phasage
    // La barre doit s'arrêter au centre de la puce actuelle
    const progressWidth = currentPhaseIndex === 0
        ? 0
        : (currentPhaseIndex / (phases.length - 1)) * 100

    return (
        <>
            {/* Ligne de base */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0" />

            {/* Barre de progression jusqu'à la phase actuelle */}
            {currentPhaseIndex > 0 && (
                <div
                    className="absolute top-1/2 left-0 h-2 -translate-y-1/2 z-[2] transition-all duration-300 rounded-l-full"
                    style={{
                        width: `calc(${progressWidth}%)`,
                        background: `linear-gradient(to right, ${phases
                            .slice(0, currentPhaseIndex)
                            .map((phase, index) => {
                                const start = (index / currentPhaseIndex) * 100
                                const end = ((index + 1) / currentPhaseIndex) * 100
                                return `${phase.color} ${start}%, ${phase.color} ${end}%`
                            })
                            .join(', ')}, ${phases[currentPhaseIndex].color} ${(currentPhaseIndex - 1) / currentPhaseIndex * 100}%, ${phases[currentPhaseIndex].color} 100%)`
                    }}
                />
            )}
        </>
    )
}