import { useEffect } from "react"
import { useStepper } from "@/contexts/StepperContext"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { usePhasageNav, useInstallationNav } from "@/hooks/useNavigationNav"
import { phases } from "@/data/phases"
import { cn } from "@/lib/utils"
import { ChevronLeft } from '@/components/animate-ui/icons/chevron-left'
import { ChevronRight } from '@/components/animate-ui/icons/chevron-right'
import { Play } from "@/components/animate-ui/icons/play"
import { Pause } from "@/components/animate-ui/icons/pause"

export function TimelinePreviousButton() {
    const { stepper } = useStepper()
    const { mode } = useNavigationMode()
    const phasage = usePhasageNav()
    const installation = useInstallationNav()

    const handlePrevious = () => {
        if (mode === "phasage") phasage.prev()
        else if (mode === "installation") installation.prev()
        else if (!stepper.state.isFirst) stepper.navigation.prev()
    }

    const isDisabled =
        mode === "phasage" ? !phasage.canPrev :
            mode === "installation" ? !installation.canPrev :
                stepper.state.isFirst

    return (
        <div className="flex items-center">
            <button
                onClick={handlePrevious}
                disabled={isDisabled}
                className={cn(
                    "sm:size-6 md:size-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 transition-all flex items-center justify-center text-black",
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-red-300 hover:shadow-lg'
                )}
            >
                <ChevronLeft animateOnHover size={24} className={cn(isDisabled ? 'opacity-50' : 'md:w-6 sm:w-5')} />
            </button>
        </div>
    )
}

export function TimelineControls() {
    const { isPlaying, setIsPlaying } = useStepper()
    const { mode } = useNavigationMode()
    const { phaseIndex, canNext } = usePhasageNav()
    const { setPhaseIndex } = useNavigationMode()    // Autoplay phasage avec boucle
    useEffect(() => {
        if (!isPlaying || mode !== "phasage") return
        const interval = setInterval(() => {
            if (canNext) {
                setPhaseIndex(Math.min(phases.length - 1, phaseIndex + 1))
            } else {
                setPhaseIndex(0)
            }
        }, 1200)
        return () => clearInterval(interval)
    }, [isPlaying, mode, phaseIndex, canNext, setPhaseIndex])

    return (<div className="flex items-center justify-center">
        <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="sm:size-8 md:size-12 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
        >
            {isPlaying
                ? <Pause animateOnHover fill='black' className='md:w-6 sm:w-5' />
                : <Play animateOnHover fill='black' className='md:w-6 sm:w-5' />
            }
        </button>
    </div>
    )
}

export function TimelineNextButton() {
    const { stepper } = useStepper()
    const { mode } = useNavigationMode()
    const phasage = usePhasageNav()
    const installation = useInstallationNav()

    const handleNext = () => {
        if (mode === "phasage") phasage.next()
        else if (mode === "installation") installation.next()
        else if (!stepper.state.isLast) stepper.navigation.next()
    }

    const isDisabled =
        mode === "phasage" ? !phasage.canNext :
            mode === "installation" ? !installation.canNext :
                stepper.state.isLast

    return (
        <div className="flex items-center">
            <button
                onClick={handleNext}
                disabled={isDisabled}
                className={cn(
                    "sm:size-6 md:size-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md hover:bg-white/90 transition-all flex items-center justify-center text-black",
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:border-red-300'
                )}
            >
                <ChevronRight animateOnHover className={cn(isDisabled ? 'opacity-50' : 'md:w-6 sm:w-5')} />
            </button>
        </div>
    )
}