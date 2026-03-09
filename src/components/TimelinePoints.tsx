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
            className="absolute -top-7 md:-top-10 px-2 md:px-4 py-0.5 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold text-white shadow-lg transition-all duration-300 whitespace-nowrap"
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
                        <div key={phase.id} className="relative flex flex-col items-center group">                            {/* Nom de la phase au-dessus : toujours visible en desktop, uniquement phase active en mobile */}
                            <div
                                className={cn(
                                    "absolute -top-5 md:-top-8 px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold text-white shadow-lg whitespace-nowrap",
                                    isCurrentPhase ? "text-[10px] md:text-sm" : "hidden md:block text-[9px] opacity-75 md:text-xs"
                                )}
                                style={{ backgroundColor: phase.color }}
                            >
                                {phase.name}
                            </div>
                            <button
                                onClick={() => goToPhase(index)}
                                className="relative z-10 transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                            >
                                <Badge
                                    className={cn(
                                        "size-6 md:size-8 rounded-full flex items-center justify-center font-bold text-[10px] hover:shadow-lg transition-all border",
                                        isCurrentPhase && "size-8 md:size-10 ring-2 ring-primary/30 shadow-xl"
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
                            <div className="absolute md:-bottom-4 md:text-[9px] sm:text-[6px] sm:-bottom-3 text-center text-white bg-black/50 rounded p-0.5 font-medium word-keep whitespace-nowrap">
                                {step.label}
                            </div>
                        )}
                        {hoveredPointId === pointId && hoveredPhase && !isInCurrentPhase && (
                            <div
                                className="absolute -bottom-8 md:-bottom-9 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-semibold text-white shadow-lg whitespace-nowrap z-30"
                                style={{ backgroundColor: hoveredPhase.color }}
                            >
                                {hoveredPhase.name}
                            </div>
                        )}
                        <button
                            onClick={() => goToPoint(pointId)}
                            className="relative z-10 transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                        >
                            <Badge
                                className={cn(
                                    "size-5 md:size-7 rounded-full flex items-center justify-center font-bold text-[10px] hover:shadow-lg transition-all border",
                                    isCurrentPoint && "size-7 md:size-10 ring-2 ring-primary/30 shadow-xl"
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
                            className="relative z-10 transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                        >
                            <Badge
                                className={cn(
                                    "size-8 rounded-full flex items-center justify-center font-bold text-xs hover:shadow-lg transition-all border",
                                    isActive && "size-10 ring-2 shadow-xl"
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