import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { totalPoints, phases } from "@/data/phases"

export function PhaseIndicator() {
    const { currentPhase } = useStepper()

    if (!currentPhase) return null

    return (
        <div
            className="absolute -top-10 px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg transition-all duration-300"
            style={{
                backgroundColor: currentPhase.color,
                insetInlineStart: `${((currentPhase.startPoint - 1) / totalPoints) * 100}%`,
                insetInlineEnd: `${((totalPoints - currentPhase.endPoint) / totalPoints) * 100}%`,
                transform: 'translateX(0)'
            }}
        >
            <div className="text-center">{currentPhase.name}</div>
        </div>
    )
}

export function TimelinePoints() {
    const { stepper, currentPointId, hoveredPointId, setHoveredPointId, hoveredPhase, goToPoint, currentPhase } = useStepper()
    const { mode } = useNavigationMode()

    // Mode Phasage : afficher seulement les phases (5 puces)
    if (mode === "phasage") {
        return (
            <>
            {phases.map((phase) => {
                const isCurrentPhase = currentPointId >= phase.startPoint && currentPointId <= phase.endPoint
                const isCompleted = currentPointId > phase.endPoint

                return (
                    <div
                        key={phase.id}
                        className="relative flex flex-col items-center group"
                    >
                        {/* Nom de la phase au-dessus */}
                        <div
                            className={cn(
                                "absolute -top-8 px-3 py-1 rounded-full font-semibold text-white shadow-lg whitespace-nowrap",
                                isCurrentPhase ? "text-sm" : "text-xs"
                            )}
                            style={{ backgroundColor: phase.color }}
                        >
                            {phase.name}
                        </div>

                        {/* Point cliquable */}
                        <button
                            onClick={() => goToPoint(phase.startPoint)}
                            className={cn(
                                "relative z-10 transition-all duration-300",
                                "hover:scale-110 cursor-pointer focus:outline-none"
                            )}
                        >
                            <Badge
                                className={cn(
                                    "size-8 rounded-full flex items-center justify-center font-bold text-xs hover:shadow-lg transition-all border",
                                    isCurrentPhase && "size-10 ring-2 ring-primary/30 shadow-xl"
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

    // Mode Planning : afficher tous les points (22 puces) - comportement actuel
    return (
        <>
            {stepper.state.all.map((step, index) => {
                const pointId = step.pointId
                const isCurrentPoint = pointId === currentPointId
                const isCompleted = index < stepper.state.current.index

                // Vérifier si le point survolé est dans la même phase que le point actuel
                const isInCurrentPhase = hoveredPhase && currentPhase && hoveredPhase.id === currentPhase.id

                return (
                    <div
                        key={pointId}
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredPointId(pointId)}
                        onMouseLeave={() => setHoveredPointId(null)}
                    >
                        {/* Label en-dessous (point actuel) */}
                        {isCurrentPoint && (
                            <div className="absolute -bottom-4 text-xs text-center font-medium word-keep whitespace-nowrap text-black">
                                {step.label}
                            </div>
                        )}
                        {/* Phase badge au survol - Ne pas afficher si on est dans la phase actuelle */}
                        {hoveredPointId === pointId && hoveredPhase && !isInCurrentPhase && (
                            <div
                                className="absolute -bottom-9 px-3 py-1 rounded-full text-[10px] font-semibold text-white shadow-lg whitespace-nowrap z-30"
                                style={{ backgroundColor: hoveredPhase.color }}
                            >
                                {hoveredPhase.name}
                            </div>
                        )}

                        {/* Point cliquable */}
                        <button
                            onClick={() => goToPoint(pointId)}
                            className={cn(
                                "relative z-10 transition-all duration-300",
                                "hover:scale-110 cursor-pointer focus:outline-none"
                            )}
                        >
                            <Badge
                                className={cn(
                                    "size-7 rounded-full flex items-center justify-center font-bold text-[10px] hover:shadow-lg transition-all border",
                                    isCurrentPoint && "size-10 ring-2 ring-primary/30 shadow-xl"
                                )}
                                style={{
                                    backgroundColor: isCompleted || isCurrentPoint
                                        ? step.color
                                        : "var(--muted)",
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