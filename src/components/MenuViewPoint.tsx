import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Viewpoint } from "./custom-svg/Viewpoint"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { useInstallationNav } from "@/hooks/useNavigationNav"
import { useStepper } from "@/contexts/StepperContext"
import { installationViews } from "@/data/phases"

interface ViewpointButtonProps {
    label: string
    onClick?: () => void
    isSelected?: boolean
    isExpanded?: boolean
    showChevron?: boolean
}

function ViewpointButton({ label, onClick, isSelected, isExpanded, showChevron }: ViewpointButtonProps) {
    return (
        <button
            onClick={onClick} className={`text-black inline-flex items-center shrink-0 z-100 h-7 lg:h-10 justify-start gap-1 lg:gap-3 border border-black px-1.5 lg:px-4 text-[10px] lg:text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none -mt-[1px] lg:first:mt-0 ${isSelected
                ? "bg-white text-black"
                : "bg-white text-black hover:bg-[#E30613] hover:text-white"
                }`}
        >
            <Viewpoint className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
            <span className="flex-1 text-left whitespace-nowrap">{label}</span>
            {isSelected && showChevron && (
                isExpanded
                    ? <ChevronUp className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" />
                    : <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" />
            )}
        </button>
    )
}

export function MenuViewPoint() {
    const { mode } = useNavigationMode()
    const { installationIndex, goTo: goToInstallation } = useInstallationNav()
    const { currentPhase, currentPointId } = useStepper()

    const isInstallation = mode === "installation"
    const installationLabels = installationViews.map(v => v.label)
    const viewpoints = installationLabels

    // Récupère le name du point courant en mode planning
    const currentPoint = currentPhase?.points.find(p => p.id === currentPointId)
    const currentPointName = currentPoint?.name ?? currentPoint?.label ?? ""

    const [selectedViewpointDefault, setSelectedViewpointDefault] = useState(installationLabels[0])
    const [isExpanded, setIsExpanded] = useState(false)
    const [trackedMode, setTrackedMode] = useState(mode)
    const [trackedInstallationIndex, setTrackedInstallationIndex] = useState(installationIndex)
    const containerRef = useRef<HTMLDivElement>(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Fermer quand le mode ou l'index installation change
    if (trackedMode !== mode) {
        setTrackedMode(mode)
        setIsExpanded(false)
    }
    if (trackedInstallationIndex !== installationIndex) {
        setTrackedInstallationIndex(installationIndex)
        setIsExpanded(false)
    }

    // Fermer le menu au clic extérieur
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsExpanded(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedViewpoint = isInstallation
        ? installationViews[installationIndex].label
        : selectedViewpointDefault

    const handleViewpointClick = (viewpoint: string) => {
        if (isInstallation) {
            const isAlreadySelected = viewpoint === installationViews[installationIndex].label
            if (isAlreadySelected) {
                setIsExpanded(prev => !prev)
            } else {
                const idx = installationViews.findIndex(v => v.label === viewpoint)
                if (idx !== -1) goToInstallation(idx)
                setIsExpanded(false)
            }
        } else {
            if (viewpoint === selectedViewpointDefault) {
                setIsExpanded(prev => !prev)
            } else {
                setSelectedViewpointDefault(viewpoint)
                setIsExpanded(false)
            }
        }
    }

    const showChevron = viewpoints.length > 1
    // mobile < 768px → -110px, tablette/desktop ≥ 768px → -160px
    const expandedHeight = windowWidth < 768 ? "calc(100dvh - 110px)" : "calc(100dvh - 160px)"
    // mobile (flex-col) : -mt-px pour fusionner le border-t avec le border-b de "Installation chantier"
    const expandedClasses = isExpanded
        ? `overflow-y-auto border-t border-b border-black ${windowWidth < 768 ? "-mt-px" : ""}`
        : "overflow-visible"

    return (
        <div className="flex" ref={containerRef}>
            {isInstallation && (
                <div
                    className={`flex relative flex-col w-fit self-start z-100 ${expandedClasses}`}
                    style={isExpanded ? { height: expandedHeight } : undefined}
                >
                    {[
                        selectedViewpoint,
                        ...viewpoints.filter(v => v !== selectedViewpoint)
                    ].map((label) => {
                        const isSelected = label === selectedViewpoint
                        const shouldShow = isSelected || isExpanded

                        if (!shouldShow) return null

                        return (
                            <ViewpointButton
                                key={label}
                                label={label}
                                isSelected={isSelected}
                                isExpanded={isExpanded}
                                showChevron={showChevron}
                                onClick={() => handleViewpointClick(label)}
                            /> 
                        )
                    })}
                </div>
            )}

            {!isInstallation && currentPointName && (
                <div
                    className={`flex relative flex-col w-fit self-start z-100 ${expandedClasses}`}
                >
                    <div className={`text-black inline-flex items-center shrink-0 z-100 h-7 lg:h-10 justify-start gap-1 lg:gap-3 border border-black px-1.5 lg:px-4 text-[10px] lg:text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none -mt-[1px] lg:first:mt-0 bg-white text-black`}>
                        <Viewpoint className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
                        <span className="flex-1 text-left whitespace-nowrap">{currentPointName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}