import { useState } from "react"
import { ChevronDown, ChevronUp, CalendarClock, TrafficCone, Construction } from "lucide-react"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { useStepper } from "@/contexts/StepperContext"

interface ProjectTypeButtonProps {
    label: string
    onClick?: () => void
    isSelected?: boolean
    isExpanded?: boolean
}

const ICONS = {
    "Planning chantier": CalendarClock,
    "Phasage chantier": Construction,
    "Installation chantier": TrafficCone
}

function ProjectTypeButton({ label, onClick, isSelected, isExpanded }: ProjectTypeButtonProps) {
    const Icon = ICONS[label as keyof typeof ICONS] || CalendarClock

    return (
        <button
            onClick={onClick}
            className={`inline-flex text-black items-center justify-start gap-3 border border-black px-4 py-3 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer -mt-[1px] first:mt-0  ${
                isSelected
                    ? "bg-white z-10"
                    : "bg-background hover:bg-[#E30613] hover:text-white hover:z-10"
            }`}
        >
            <Icon className="w-6 h-6 shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            {isSelected && (
                isExpanded ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
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
    const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]) // Planning par défaut
    const [isExpanded, setIsExpanded] = useState(false)
    const { setMode } = useNavigationMode()
    const { goToPoint, setIsPlaying } = useStepper()

    const handleTypeClick = (type: string) => {
        if (type === selectedType) {
            // Toggle expand/collapse si on clique sur le type sélectionné
            setIsExpanded(!isExpanded)
        } else {
            // Sélectionner un nouveau type et fermer le menu
            setSelectedType(type)
            setIsExpanded(false)
            
            // Arrêter la lecture automatique
            setIsPlaying(false)
            
            // Réinitialiser la progression au début (point 1)
            goToPoint(1)
            
            // Mettre à jour le mode de navigation
            if (type === "Planning chantier") setMode("planning")
            else if (type === "Phasage chantier") setMode("phasage")
            else if (type === "Installation chantier") setMode("installation")
        }
    }

    return (
        <div className="flex">
            <div className="flex relative flex-col w-fit">
                {PROJECT_TYPES.map((label) => {
                    const isSelected = label === selectedType
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