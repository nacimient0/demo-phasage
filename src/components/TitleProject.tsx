import { EiffageConstruction } from "./custom-svg/EiffageConstruction"

export function TitleProject() {
    return (
        <div className="flex flex-row gap-10 items-center font-medium uppercase text-lg text-black bg-white px-6 border border-black">
            Opération La Norma - Sense
            <EiffageConstruction className="w-26" />
        </div>
    )
}
