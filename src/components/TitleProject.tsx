import { EiffageConstruction } from "./custom-svg/EiffageConstruction"

export function TitleProject() {
    return (
        <div className="flex flex-row gap-3 px-4 h-7 w-full lg:gap-10 lg:h-10 items-center font-medium uppercase text-[10px] lg:text-lg text-black bg-white px-2 lg:px-6 border border-black whitespace-nowrap">
            Opération La Norma - Sense
            <EiffageConstruction className="w-16 lg:w-26" />
        </div>
    )
}
