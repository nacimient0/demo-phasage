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
        const hoveredProgress = hoveredPointId ? (hoveredPointId - 1) / (totalPoints - 1) : 0

        return (
            <>
                {/* Ligne de base */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />

                {/* Aperçu au survol */}
                {hoveredPointId && hoveredPointId !== currentPointId && (
                    <div
                        className="absolute top-1/2 h-2 -translate-y-1/2 z-[1] rounded-full opacity-40 transition-all duration-200"
                        style={{
                            left: 0,
                            width: `${hoveredProgress * 100}%`,
                            backgroundColor: phases[hoveredPhaseIndex]?.color ?? "var(--border)",
                        }}
                    />
                )}
                {/* Barre de progression par segments de phase */}
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
    }

    // ── MODE PHASAGE ──────────────────────────────────────────────
    if (mode === "phasage") {
        const progressWidth = phaseIndex === 0 ? 0 : (phaseIndex / (phases.length - 1)) * 100

        return (
            <>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -translate-y-1/2 z-0 rounded-full" />
                {phaseIndex > 0 && (
                    <div
                        className="absolute top-1/2 left-0 h-2 -translate-y-1/2 z-[2] transition-all duration-300 rounded-l-full"
                        style={{
                            width: `${progressWidth}%`,
                            background: `linear-gradient(to right, ${phases
                                .slice(0, phaseIndex)
                                .map((phase, i) => {
                                    const start = (i / phaseIndex) * 100
                                    const end = ((i + 1) / phaseIndex) * 100
                                    return `${phase.color} ${start}%, ${phase.color} ${end}%`
                                })
                                .join(', ')}, ${phases[phaseIndex].color} ${(phaseIndex - 1) / phaseIndex * 100}%, ${phases[phaseIndex].color} 100%)`
                        }}
                    />
                )}
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