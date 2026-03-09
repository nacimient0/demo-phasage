import { EiffageConstruction } from "./custom-svg/EiffageConstruction"

export function TitleProject() {
    return (
        <div className="flex flex-row md:gap-10 md:h-10 items-center font-medium uppercase md:text-lg text-black bg-white md:px-6 border border-black sm:text-xs sm:gap-4 sm:h-8 sm:px-4">
            Opération La Norma - Sense
            <EiffageConstruction className="md:w-26 sm:w-18" />
        </div>
    )
}
