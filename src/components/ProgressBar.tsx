import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { phases, totalPoints } from "@/data/phases"

export function ProgressBar() {
    const { currentPointId, hoveredPointId } = useStepper()
    const { mode } = useNavigationMode()
    const { phaseIndex } = usePhasageNav()
    const { installationIndex } = useInstallationNav()

    // ── MODE PLANNING ─────────────────────────────────────────────
    if (mode === "planning") {
        const currentPhaseIndex = phases.findIndex(
            p => currentPointId >= p.startPoint && currentPointId <= p.endPoint
        )
        const hoveredPhaseIndex = hoveredPointId ? phases.findIndex(
            p => hoveredPointId >= p.startPoint && hoveredPointId <= p.endPoint
        ) : -1

        return (
            <>
                {/* Ligne de base */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />

                {/* Barre de progression par segments de phase */}
                <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-[2]">
                    {phases.map((phase, index) => {
                        // Allonger le segment jusqu'au début de la phase suivante (ou la fin)
                        const nextStartPoint = phases[index + 1] ? phases[index + 1].startPoint : totalPoints
                        const spanIntervals = nextStartPoint - phase.startPoint
                        const totalIntervals = totalPoints - 1

                        const leftPosition = `${((phase.startPoint - 1) / totalIntervals) * 100}%`
                        const segmentWidth = `${(spanIntervals / totalIntervals) * 100}%`

                        // Calcul de la progression réelle
                        let fillPercentage = 0
                        if (index < currentPhaseIndex) {
                            fillPercentage = 100
                        } else if (index === currentPhaseIndex) {
                            const completedIntervalsInPhase = currentPointId - phase.startPoint + 1
                            fillPercentage = Math.max(0, Math.min(100, (completedIntervalsInPhase / spanIntervals) * 100))
                        }

                        // Calcul de la progression au survol (aperçu)
                        let hoverFillPercentage = 0
                        if (hoveredPointId && hoveredPointId > currentPointId) {
                            if (index < hoveredPhaseIndex) {
                                hoverFillPercentage = 100
                            } else if (index === hoveredPhaseIndex) {
                                const hoveredIntervalsInPhase = hoveredPointId - phase.startPoint + 1
                                hoverFillPercentage = Math.max(0, Math.min(100, (hoveredIntervalsInPhase / spanIntervals) * 100))
                            }
                        }

                        const isFirst = index === 0
                        const isLast = index === phases.length - 1

                        return (
                            <div
                                key={`phase-${phase.id}`}
                                className="h-full absolute top-0"
                                style={{ left: leftPosition, width: segmentWidth }}
                            >
                                {/* Div de survol (40% opacité) */}
                                <div
                                    className="h-full absolute top-0 left-0 transition-all duration-300"
                                    style={{
                                        width: `${hoverFillPercentage}%`,
                                        backgroundColor: phase.color,
                                        opacity: 0.4,
                                        borderTopLeftRadius: isFirst ? '9999px' : '0',
                                        borderBottomLeftRadius: isFirst ? '9999px' : '0',
                                        borderTopRightRadius: isLast && hoverFillPercentage === 100 ? '9999px' : '0',
                                        borderBottomRightRadius: isLast && hoverFillPercentage === 100 ? '9999px' : '0',
                                    }}
                                />
                                {/* Div de progression réelle (100% opacité) */}
                                <div
                                    className="h-full absolute top-0 left-0 transition-all duration-300"
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
    }

    // ── MODE PHASAGE ──────────────────────────────────────────────
    if (mode === "phasage") {
        const hoveredPhaseHoverIndex = hoveredPointId ? phases.findIndex(
            p => hoveredPointId >= p.startPoint && hoveredPointId <= p.endPoint
        ) : -1

        return (
            <>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />

                {/* Barre de progression par segments de phase */}
                <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-[2]">
                    {phases.map((phase, index) => {
                        if (index === phases.length - 1) return null
                        const leftPosition = `${(index / (phases.length - 1)) * 100}%`
                        const segmentWidth = `${(1 / (phases.length - 1)) * 100}%`

                        const isCompleted = index <= phaseIndex
                        const isHovered = !isCompleted && hoveredPhaseHoverIndex !== -1 && index <= hoveredPhaseHoverIndex

                        return (
                            <div
                                key={`phasage-seg-${phase.id}`}
                                className="h-full absolute top-0"
                                style={{ left: leftPosition, width: segmentWidth }}
                            >
                                <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                        width: isCompleted || isHovered ? "100%" : "0%",
                                        backgroundColor: phase.color,
                                        opacity: isCompleted ? 1 : 0.4
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }

    // ── MODE INSTALLATION ─────────────────────────────────────────
    const installationProgressWidth = installationIndex === 0 ? 0 : (installationIndex / 2) * 100

    return (
        <>
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/40 -translate-y-1/2 z-0 rounded-full" />
            {installationIndex > 0 && (
                <div
                    className="absolute top-1/2 left-0 h-2 -translate-y-1/2 z-[2] transition-all duration-300 rounded-l-full"
                    style={{
                        width: `${installationProgressWidth}%`,
                        // backgroundColor: "#64748b",
                    }}
                />
            )}
        </>
    )
}