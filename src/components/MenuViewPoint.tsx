import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Viewpoint } from "./custom-svg/Viewpoint"

interface ViewpointButtonProps {
    label: string
    onClick?: () => void
    isSelected?: boolean
    isExpanded?: boolean
}

function ViewpointButton({ label, onClick, isSelected, isExpanded }: ViewpointButtonProps) {
    const showChevron = VIEWPOINTS.length > 1

    return (
        <button
            onClick={onClick}
            className={`inline-flex text-black items-center justify-start gap-3 border border-r-0 border-black px-4 py-3 text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none -mt-[1px] first:mt-0  ${
                isSelected
                    ? "bg-white z-10"
                    : "bg-background hover:bg-[#E30613] hover:text-white hover:z-10"
            }`}
        >
            <Viewpoint className="w-6 h-6 shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            {isSelected && showChevron && (
                isExpanded ? (
                    <ChevronUp className="w-3 h-3 shrink-0" />
                ) : (
                    <ChevronDown className="w-3 h-3 shrink-0" />
                )
            )}
        </button>
    )
}

const VIEWPOINTS = [
    "Boulevard de la Résistance",
]

export function MenuViewPoint() {
    const [selectedViewpoint, setSelectedViewpoint] = useState(VIEWPOINTS[0])
    const [isExpanded, setIsExpanded] = useState(false)

    const handleViewpointClick = (viewpoint: string) => {
        if (viewpoint === selectedViewpoint) {
            // Toggle expand/collapse si on clique sur le viewpoint sélectionné
            setIsExpanded(!isExpanded)
        } else {
            // Sélectionner un nouveau viewpoint et fermer le menu
            setSelectedViewpoint(viewpoint)
            setIsExpanded(false)
        }
    }

    return (
        <div className="flex">
            <div className="flex relative flex-col w-fit">
                {VIEWPOINTS.map((label) => {
                    const isSelected = label === selectedViewpoint
                    const shouldShow = isSelected || isExpanded

                    if (!shouldShow) return null

                    return (
                        <ViewpointButton
                            key={label}
                            label={label}
                            isSelected={isSelected}
                            isExpanded={isExpanded}
                            onClick={() => handleViewpointClick(label)}
                        />
                    )
                })}
            </div>
        </div>
    )
}