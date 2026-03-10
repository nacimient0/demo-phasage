import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { totalPoints, phases, installationViews } from "@/data/phases"

export function PhaseIndicator() {
    const { currentPhase } = useStepper()
    if (!currentPhase) return null
    return (
        <div
            className="absolute -top-7 lg:-top-10 px-2 lg:px-4 py-0.5 lg:py-1.5 rounded-full text-[9px] lg:text-xs font-semibold text-white shadow-lg transition-all duration-300 whitespace-nowrap"
            style={{
                backgroundColor: currentPhase.color,
                insetInlineStart: `${((currentPhase.startPoint - 1) / totalPoints) * 100}%`,
                insetInlineEnd: `${((totalPoints - currentPhase.endPoint) / totalPoints) * 100}%`,
            }}
        >
            <div className="text-center">{currentPhase.name}</div>
        </div>
    )
}

export function TimelinePoints() {
    const { stepper, currentPointId, hoveredPointId, setHoveredPointId, hoveredPhase, goToPoint, currentPhase } = useStepper()
    const { mode } = useNavigationMode()
    const { phaseIndex, goTo: goToPhase } = usePhasageNav()

    // Mode Phasage : 5 puces indépendantes du stepper
    if (mode === "phasage") {
        return (
            <>
                {phases.map((phase, index) => {
                    const isCurrentPhase = index === phaseIndex
                    const isCompleted = index < phaseIndex

                    return (
                        <div key={phase.id} className="relative flex flex-col items-center group">
                            {/* Nom de la phase au-dessus : toujours visible en desktop, uniquement phase active en mobile */}
                            <div
                                className={cn(
                                    "absolute -top-6.5 lg:-top-8 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full font-semibold text-white shadow-lg whitespace-nowrap",
                                    isCurrentPhase ? "text-[10px] lg:text-sm" : "hidden lg:block text-[9px] opacity-75 lg:text-xs"
                                )}
                                style={{ backgroundColor: phase.color }}
                            >
                                {phase.name}
                            </div>
                            <button
                                onClick={() => goToPhase(index)}
                                className="relative z-10 transition-all duration-300 cursor-pointer focus:outline-none"
                            >
                                <Badge
                                    className={cn(
                                        "size-6 lg:size-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all border",
                                        isCurrentPhase ? "scale-110 ring-2 ring-primary/30 shadow-xl" : "hover:scale-110 hover:shadow-lg"
                                    )}
                                    style={{
                                        backgroundColor: isCompleted || isCurrentPhase ? phase.color : "var(--muted)",
                                        color: isCompleted || isCurrentPhase ? "white" : "var(--muted-foreground)",
                                        borderColor: isCompleted || isCurrentPhase ? phase.color : "var(--border)",
                                    }}
                                >
                                    {phase.id}
                                </Badge>
                            </button>
                        </div>
                    )
                })}
            </>
        )
    }

    // Mode Planning : tous les points via stepper
    return (
        <>
            {stepper.state.all.map((step, index) => {
                const pointId = step.pointId
                const isCurrentPoint = pointId === currentPointId
                const isCompleted = index < stepper.state.current.index
                const isInCurrentPhase = hoveredPhase && currentPhase && hoveredPhase.id === currentPhase.id

                return (
                    <div
                        key={pointId}
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredPointId(pointId)}
                        onMouseLeave={() => setHoveredPointId(null)}
                    >
                        {isCurrentPoint && (
                            <div className="absolute -bottom-4.5 lg:-bottom-5 text-[9px] px-2lg:text-[10px] text-center text-white bg-black/50 rounded px-0.5 font-medium whitespace-nowrap pointer-events-none z-40">
                                {step.label}
                            </div>
                        )}
                        {hoveredPointId === pointId && hoveredPhase && !isInCurrentPhase && (
                            <div
                                className="hidden lg:block absolute -bottom-9 px-3 py-1 rounded-full text-[10px] font-semibold text-white shadow-lg whitespace-nowrap z-30 pointer-events-none"
                                style={{ backgroundColor: hoveredPhase.color }}
                            >
                                {hoveredPhase.name}
                            </div>
                        )}
                        <button
                            onClick={() => goToPoint(pointId)}
                            className="relative z-10 px-2transition-all duration-300 cursor-pointer focus:outline-none"
                        >
                            <Badge
                                className={cn(
                                    "size-5 lg:size-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all border",
                                    isCurrentPoint ? "scale-125 ring-2 ring-primary/30 shadow-xl" : "hover:scale-110 hover:shadow-lg"
                                )}
                                style={{
                                    backgroundColor: isCompleted || isCurrentPoint ? step.color : "var(--muted)",
                                    color: isCompleted || isCurrentPoint ? "white" : "var(--muted-foreground)",
                                    borderColor: isCompleted || isCurrentPoint ? step.color : "var(--border)",
                                }}
                            >
                                {pointId}
                            </Badge>
                        </button>
                    </div>
                )
            })}
        </>
    )
}

export function InstallationPoints() {
    const { installationIndex, goTo } = useInstallationNav()

    return (
        <>
            {installationViews.map((view, index) => {
                const isActive = index === installationIndex

                return (
                    <div key={view.id} className="relative flex flex-col items-center group">
                        <button
                            onClick={() => goTo(index)}
                            className="relative z-10 transition-all duration-300 cursor-pointer focus:outline-none"
                        >
                            <Badge
                                className={cn(
                                    "size-6 lg:size-8 rounded-full flex items-center justify-center font-bold text-xs transition-all border",
                                    isActive ? "scale-125 ring-2 shadow-xl" : "hover:scale-110 hover:shadow-lg"
                                )}
                                style={{
                                    backgroundColor: isActive ? "#64748b" : "white",
                                    color: isActive ? "white" : "var(--muted-foreground)",
                                    borderColor: isActive ? "#64748b" : "var(--border)",
                                }}
                            >
                                {index + 1}
                            </Badge>
                        </button>
                    </div>
                )
            })}
        </>
    )
}