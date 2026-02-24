import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { cn } from "@/lib/utils"
import { ChevronLeft } from '@/components/animate-ui/icons/chevron-left'
import { ChevronRight } from '@/components/animate-ui/icons/chevron-right'
import { Play } from "@/components/animate-ui/icons/play"
import { Pause } from "@/components/animate-ui/icons/pause"
import { phases } from "@/data/phases"

export function TimelinePreviousButton() {
    const { stepper, currentPointId, goToPoint } = useStepper()
    const { mode } = useNavigationMode()

    const handlePrevious = () => {
        if (mode === "phasage") {
            // Trouver la phase actuelle et aller au début de la phase précédente
            const currentPhaseIndex = phases.findIndex(p => 
                currentPointId >= p.startPoint && currentPointId <= p.endPoint
            )
            if (currentPhaseIndex > 0) {
                goToPoint(phases[currentPhaseIndex - 1].startPoint)
            }
        } else if (mode === "installation") {
            // Passer à l'image précédente : 1-7, 8-15, 16-22
            if (currentPointId > 15) {
                goToPoint(8)
            } else if (currentPointId > 7) {
                goToPoint(1)
            }
        } else {
            // Mode planning : navigation normale point par point
            if (!stepper.state.isFirst) stepper.navigation.prev()
        }
    }

    const isDisabled = () => {
        if (mode === "phasage") {
            const currentPhaseIndex = phases.findIndex(p => 
                currentPointId >= p.startPoint && currentPointId <= p.endPoint
            )
            return currentPhaseIndex === 0
        } else if (mode === "installation") {
            return currentPointId <= 7
        }
        return stepper.state.isFirst
    }

    return (
        <div className="flex items-center">
            <button
                onClick={handlePrevious}
                disabled={isDisabled()}
                className={cn(
                    "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 transition-all flex items-center justify-center text-black",
                    isDisabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-red-300 hover:shadow-lg'
                )}
            >
                <ChevronLeft
                    animateOnHover
                    size={28}
                    className={cn(isDisabled() ? 'opacity-50' : '')}
                />
            </button>
        </div>
    )
}

export function TimelineControls() {
    const { isPlaying, setIsPlaying } = useStepper()

    return (
        <>
            {/* Bouton Play/Pause */}
            <div className="flex items-center justify-center">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
                >
                    {isPlaying ? (
                        <Pause
                            animateOnHover
                            size={22}
                            fill='black'
                        />
                    ) : (
                        <Play
                            animateOnHover
                            size={22}
                            fill='black'
                        />
                    )}
                </button>
            </div>
        </>
    )
}

export function TimelineNextButton() {
    const { stepper, currentPointId, goToPoint } = useStepper()
    const { mode } = useNavigationMode()

    const handleNext = () => {
        if (mode === "phasage") {
            // Trouver la phase actuelle et aller au début de la phase suivante
            const currentPhaseIndex = phases.findIndex(p => 
                currentPointId >= p.startPoint && currentPointId <= p.endPoint
            )
            if (currentPhaseIndex < phases.length - 1) {
                goToPoint(phases[currentPhaseIndex + 1].startPoint)
            }
        } else if (mode === "installation") {
            // Passer à l'image suivante : 1-7, 8-15, 16-22
            if (currentPointId <= 7) {
                goToPoint(8)
            } else if (currentPointId <= 15) {
                goToPoint(16)
            }
        } else {
            // Mode planning : navigation normale point par point
            if (!stepper.state.isLast) stepper.navigation.next()
        }
    }

    const isDisabled = () => {
        if (mode === "phasage") {
            const currentPhaseIndex = phases.findIndex(p => 
                currentPointId >= p.startPoint && currentPointId <= p.endPoint
            )
            return currentPhaseIndex === phases.length - 1
        } else if (mode === "installation") {
            return currentPointId > 15
        }
        return stepper.state.isLast
    }

    return (
        <div className="flex items-center">
            <button
                onClick={handleNext}
                disabled={isDisabled()}
                className={cn(
                    "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 transition-all flex items-center justify-center text-black",
                    isDisabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:border-red-300'
                )}
            >
                <ChevronRight
                    animateOnHover
                    size={28}
                    className={cn(isDisabled() ? 'opacity-50' : '')}
                />
            </button>
        </div>
    )
}