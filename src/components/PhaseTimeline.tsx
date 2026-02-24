import { ProgressBar } from "./ProgressBar"
import { TimelineControls, TimelineNextButton, TimelinePreviousButton } from "./TimelineControls"
import { PhaseIndicator, TimelinePoints } from "./TimelinePoints"
import { useNavigationMode } from "@/contexts/NavigationModeContext"

export function PhaseTimeline() {
    const { mode } = useNavigationMode()

    // Mode Installation : juste les flèches
    if (mode === "installation") {
        return (
            <div className="absolute flex bottom-8 left-0 right-0">
                <div className="flex mx-auto">
                    <div className="flex relative border rounded-full border-white w-fit px-6 py-6 gap-4 bg-white/30 backdrop-blur-none">
                        <TimelinePreviousButton />
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
        )
    }    // Modes Planning et Phasage : timeline complète
    return (
        <div className="absolute flex bottom-8 left-0 right-0">
            <div className="flex mx-auto">
                <div className="flex relative border rounded-full border-white w-fit px-6 gap-2 bg-white/30 backdrop-blur-none">
                    <TimelineControls />
                    <TimelinePreviousButton />
                    <div className="relative flex py-6 w-full h-18">
                        <ProgressBar />

                        <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between gap-40" : "justify-between gap-3"}`}>
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