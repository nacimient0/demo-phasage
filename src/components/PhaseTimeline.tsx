import { ProgressBar } from "./ProgressBar"
import { TimelineControls, TimelineNextButton, TimelinePreviousButton } from "./TimelineControls"
import { PhaseIndicator, TimelinePoints, InstallationPoints } from "./TimelinePoints"
import { useNavigationMode } from "@/contexts/NavigationModeContext"

export function PhaseTimeline() {
    const { mode, timelineVisible } = useNavigationMode()

    if (!timelineVisible) return null

    // Mode Installation : slider avec 3 puces (une par point de vue)
    if (mode === "installation") {
        return (
            <div className="absolute flex bottom-4 md:bottom-8 left-0 right-0 px-2 md:px-0">
                <div className="flex mx-auto">
                    <div className="flex relative border rounded-full border-white w-fit px-3 md:px-6 gap-4 md:gap-10 bg-white/30 backdrop-blur-none">
                        <TimelinePreviousButton />
                        <div className="relative flex py-4 md:py-6 h-fit md:h-18">
                            <ProgressBar />
                            <div className="relative flex items-center justify-between gap-5">
                                <InstallationPoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
        )
    }

    // Modes Planning et Phasage : timeline complète
    return (
        <div className="absolute flex bottom-4 md:bottom-8 left-0 right-0 px-2 md:px-0">
            <div className="flex mx-auto max-w-[calc(100vw-1rem)] md:max-w-none">
                <div className="flex relative border rounded-full border-white w-fit px-3 md:px-6 gap-3 md:gap-10 bg-white/30 backdrop-blur-none">
                    <TimelineControls />
                    <TimelinePreviousButton />
                    <div className="relative flex py-4 md:py-6 w-full h-fit md:h-18">
                        <ProgressBar />
                        <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between gap-6 md:gap-20 lg:gap-30" : "justify-between gap-3 md:gap-6"}`}>
                            {mode === "planning" && <PhaseIndicator />}
                            <TimelinePoints />
                        </div>
                    </div>
                    <TimelineNextButton />
                </div>
            </div>
        </div>
    )
}