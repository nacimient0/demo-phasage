import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { totalPoints, phases, installationViews } from "@/data/phases"

export function PhaseIndicator() {
    const { currentPhase, hoveredPhase } = useStepper()
    if (!currentPhase) return null

    const intervals = totalPoints - 1

    return (
        <>
            <style>{`
                .phase-indicator-vars { --dot-width: 1.25rem; }
                @media (min-width: 1024px) { .phase-indicator-vars { --dot-width: 1.75rem; } }
            `}</style>
            {phases.map(phase => {
                const kStart = phase.startPoint - 1
                const isLastPhase = phase.endPoint === totalPoints
                const endPointForCalc = isLastPhase ? totalPoints : phase.endPoint + 1
                const span = endPointForCalc - phase.startPoint

                const isCurrent = phase.id === currentPhase.id
                const isCompleted = phase.startPoint < currentPhase.startPoint
                const isHovered = hoveredPhase && phase.id === hoveredPhase.id

                const isVisible = isCurrent || isCompleted || isHovered

                return (
                    <div
                        key={`indicator-${phase.id}`}
                        className={cn(
                            "phase-indicator-vars absolute bottom-[calc(100%+0.5rem)] lg:bottom-[calc(100%+1rem)] px-2 lg:px-0 py-1 lg:py-1.5 rounded-3xl lg:rounded-full text-white shadow-lg transition-all duration-300 flex items-center justify-center",
                            isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
                            isCurrent ? "z-20" : "z-10"
                        )}
                        style={{
                            backgroundColor: phase.color,
                            left: `calc(${(kStart / intervals) * 100}% - ${(kStart / intervals)} * var(--dot-width))`,
                            width: isLastPhase
                                ? `calc(${(span / intervals) * 100}% + ${(1 - span / intervals)} * var(--dot-width))`
                                : `calc(${(span / intervals) * 100}% - ${(span / intervals)} * var(--dot-width))`
                        }}
                    >
                        <div className="text-center leading-[1.2]">
                            {phase.name.split(' : ').map((part, i, arr) => (
                                <span key={i} className={cn("block whitespace-nowrap", i === 0 ? "text-[6px] lg:text-[10px] font-medium opacity-90" : "text-[8px] lg:text-[12px] font-bold")}>
                                    {part}{i === 0 && arr.length > 1 ? " :" : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                )
            })}
        </>
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
                    const isHovered = hoveredPointId ? (hoveredPointId >= phase.startPoint && hoveredPointId <= phase.endPoint) : false

                    const isVisibleOnMobile = isCurrentPhase || isHovered
                    const isVisibleOnDesktop = isCurrentPhase || isCompleted || isHovered

                    return (
                        <div key={phase.id} className="relative flex flex-col items-center group">
                            {/* Nom de la phase au-dessus */}
                            <div
                                className={cn(
                                    "absolute bottom-[calc(100%+0.5rem)] lg:bottom-[calc(100%+0.75rem)] px-2 lg:px-3 py-1 lg:py-1.5 rounded-3xl lg:rounded-full font-semibold text-white shadow-lg transition-all duration-300",
                                    isVisibleOnMobile ? "opacity-100" : "opacity-0 pointer-events-none",
                                    isVisibleOnDesktop ? "lg:opacity-100 lg:pointer-events-auto" : "lg:opacity-0 lg:pointer-events-none",
                                    "text-[9px] lg:text-[11px]",
                                    isCurrentPhase ? "z-10" : "z-0"
                                )}
                                style={{ backgroundColor: phase.color }}
                            >
                                <div className="text-center leading-[1.2]">
                                    {phase.name.split(' : ').map((part, i, arr) => (
                                        <span key={i} className={cn("block whitespace-nowrap", i === 0 ? "text-[6px] lg:text-[10px] font-medium opacity-90" : "text-[8px] lg:text-[12px] font-bold")}>
                                            {part}{i === 0 && arr.length > 1 ? " :" : ""}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => goToPhase(index)}
                                onMouseEnter={() => setHoveredPointId(phase.startPoint)}
                                onMouseLeave={() => setHoveredPointId(null)}
                                className="relative z-10 transition-all duration-300 cursor-pointer focus:outline-none"
                            >
                                <Badge
                                    className={cn(
                                        "size-6 lg:size-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-all border",
                                        isCurrentPhase || isHovered ? "scale-110 ring-2 ring-primary/30 shadow-xl" : "hover:scale-110 hover:shadow-lg"
                                    )}
                                    style={{
                                        backgroundColor: isCompleted || isCurrentPhase || isHovered ? phase.color : "white",
                                        color: isCompleted || isCurrentPhase || isHovered ? "white" : "var(--muted-foreground)",
                                        borderColor: isCompleted || isCurrentPhase || isHovered ? phase.color : "var(--border)",
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

    // Mode Planning : tous les points via stepper
    return (
        <>
            {stepper.state.all.map((step, index) => {
                const pointId = step.pointId
                const isCurrentPoint = pointId === currentPointId
                const isCompleted = index < stepper.state.current.index
                // const isInCurrentPhase = hoveredPhase && currentPhase && hoveredPhase.id === currentPhase.id
                const isHovered = pointId === hoveredPointId

                return (
                    <div
                        key={pointId}
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredPointId(pointId)}
                        onMouseLeave={() => setHoveredPointId(null)}
                    >
                        {isCurrentPoint && (
                            <div className="absolute -bottom-4.5 lg:-bottom-5 text-[9px] lg:text-[10px] text-center text-white bg-black/50 rounded px-0.5 font-medium whitespace-nowrap pointer-events-none z-40">
                                {step.label}
                            </div>
                        )}
                        {/* {isHovered && hoveredPhase && !isInCurrentPhase && (
                            <div
                                className="hidden lg:block absolute -bottom-9 px-3 py-1 rounded-full text-[10px] font-semibold text-white shadow-lg whitespace-nowrap z-30 pointer-events-none"
                                style={{ backgroundColor: hoveredPhase.color }}
                            >
                                {hoveredPhase.name}
                            </div>
                        )} */}
                        <button
                            onClick={() => goToPoint(pointId)}
                            className="relative z-10 px-2transition-all duration-300 cursor-pointer focus:outline-none"
                        >
                            <Badge
                                className={cn(
                                    "size-5 lg:size-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all border",
                                    isCurrentPoint || isHovered ? "scale-125 ring-2 ring-primary/30 shadow-xl" : "hover:scale-110 hover:shadow-lg"
                                )}
                                style={{
                                    backgroundColor: isCompleted || isCurrentPoint || isHovered ? step.color : "white",
                                    color: isCompleted || isCurrentPoint || isHovered ? "white" : "var(--muted-foreground)",
                                    borderColor: isCompleted || isCurrentPoint || isHovered ? step.color : "var(--border)",
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