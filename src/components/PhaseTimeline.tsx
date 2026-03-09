import { ProgressBar } from "./ProgressBar"
import { TimelineControls, TimelineNextButton, TimelinePreviousButton } from "./TimelineControls"
import { PhaseIndicator, TimelinePoints, InstallationPoints } from "./TimelinePoints"
import { useNavigationMode } from "@/contexts/NavigationModeContext"

export function PhaseTimeline() {
    const { mode, timelineVisible } = useNavigationMode()

    if (!timelineVisible) return null

    // Mode Installation
    if (mode === "installation") {
        return (
            <div className="absolute flex bottom-2 md:bottom-8 left-0 right-0 px-2 md:px-0">
                <div className="flex mx-auto">
                    <div className="flex relative border rounded-full border-white w-fit px-3 md:px-6 gap-3 md:gap-10 bg-white/30 backdrop-blur-none items-center">
                        <TimelinePreviousButton />
                        <div className="relative flex py-2 md:py-6 md:h-18">
                            <ProgressBar />
                            <div className="relative flex items-center justify-between gap-4 md:gap-5">
                                <InstallationPoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
        )
    }

    // Modes Planning et Phasage :
    // Desktop → layout original centré, w-fit, pas de scroll
    // Mobile  → scroll horizontal, labels au-dessus grâce au pt-8
    return (
        <>
            {/* ── DESKTOP ── */}
            <div className="hidden md:absolute md:flex md:bottom-8 left-0 right-0">
                <div className="flex mx-auto">
                    <div className="flex relative border rounded-full border-white w-fit px-6 gap-10 bg-white/30 backdrop-blur-none">
                        <TimelineControls />
                        <TimelinePreviousButton />
                        <div className="relative flex py-6 w-full h-18">
                            <ProgressBar />
                            <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between gap-30" : "justify-between gap-6"}`}>
                                {mode === "planning" && <PhaseIndicator />}
                                <TimelinePoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
            
            {/* ── MOBILE ── */}
            <div className="md:hidden h-fit absolute flex bottom-2 left-0 right-0 px-2">
                <div className="w-full overflow-x-auto pt-6 scrollbar-none">
                    <div className="flex relative border rounded-full border-white w-fit mx-auto px-2 gap-2 bg-white/30 backdrop-blur-none items-center">
                        <TimelineControls />
                        <TimelinePreviousButton />
                        <div className="relative flex py-2 w-full">
                            <ProgressBar />
                            <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between gap-3" : "justify-between gap-2"}`}>
                                {mode === "planning" && <PhaseIndicator />}
                                <TimelinePoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
        </>
    )
}