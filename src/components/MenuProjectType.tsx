import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, CalendarClock, TrafficCone } from "lucide-react"
import { useNavigationMode, type NavigationMode } from "@/contexts/NavigationModeContext"
import { useStepper } from "@/contexts/StepperContext"
import { useInstallationNav } from "@/hooks/useNavigationNav"
import { Crane } from "./custom-svg/Crane"

const LABEL_TO_MODE: Record<string, NavigationMode> = {
    "Planning chantier": "planning",
    "Phasage chantier": "phasage",
    "Installation chantier": "installation",
}

const MODE_TO_LABEL: Record<NavigationMode, string> = {
    planning: "Planning chantier",
    phasage: "Phasage chantier",
    installation: "Installation chantier",
}

interface ProjectTypeButtonProps {
    label: string
    onClick?: () => void
    isSelected?: boolean
    isExpanded?: boolean
}

const ICONS = {
    "Planning chantier": CalendarClock,
    "Phasage chantier": Crane,
    "Installation chantier": TrafficCone
}

function ProjectTypeButton({ label, onClick, isSelected, isExpanded }: ProjectTypeButtonProps) {
    const Icon = ICONS[label as keyof typeof ICONS] || CalendarClock

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center h-7 lg:h-10 justify-start text-black gap-1 lg:gap-3 border border-black px-1.5 lg:px-4 text-[10px] lg:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer -mt-[1px] first:mt-0
                ${isSelected
                    ? "bg-white z-10 lg:border-r-0"
                    : "bg-white hover:bg-[#E30613] hover:text-white hover:z-10 lg:mr-[-1px]"
                }`}
        >
            <Icon className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
            <span className="flex-1 text-left whitespace-nowrap">{label}</span>
            {isSelected && (
                isExpanded ? (
                    <ChevronUp className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" />
                ) : (
                    <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" />
                )
            )}
        </button>
    )
}

const PROJECT_TYPES = [
    "Planning chantier",
    "Phasage chantier",
    "Installation chantier"
]

export function MenuProjectType() {
    const { mode, setMode } = useNavigationMode()
    const [isExpanded, setIsExpanded] = useState(false)
    const { goToPoint, setIsPlaying, currentPointId, isPlaying } = useStepper()
    const { installationIndex } = useInstallationNav()
    const containerRef = useRef<HTMLDivElement>(null)
    const selectedLabel = MODE_TO_LABEL[mode]
    const isPlayingRef = useRef(isPlaying)

    // Garder la ref synchronisée sans déclencher de re-render
    useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

    // Fermer le menu quand le mode ou l'installation change
    useEffect(() => { setIsExpanded(false) }, [mode, installationIndex])

    // Fermer le menu quand le point change, SAUF pendant le play
    useEffect(() => {
        if (!isPlayingRef.current) setIsExpanded(false)
    }, [currentPointId])

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

    const handleTypeClick = (label: string) => {
        const newMode = LABEL_TO_MODE[label]
        if (newMode === mode) {
            setIsExpanded(prev => !prev)
        } else {
            setIsPlaying(false)
            goToPoint(1)
            setMode(newMode)
            setIsExpanded(false)
        }
    }

    return (
        <div className="flex" ref={containerRef}>
            <div className="flex relative flex-col w-fit">
                {[
                    selectedLabel,
                    ...PROJECT_TYPES.filter(t => t !== selectedLabel)
                ].map((label) => {
                    const isSelected = label === selectedLabel
                    const shouldShow = isSelected || isExpanded

                    if (!shouldShow) return null

                    return (
                        <ProjectTypeButton
                            key={label}
                            label={label}
                            isSelected={isSelected}
                            isExpanded={isExpanded}
                            onClick={() => handleTypeClick(label)}
                        />
                    )
                })}
            </div>
        </div>
    )
}