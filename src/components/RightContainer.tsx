import { MassPlan } from "@/components/MassPlan"
import { TitleProject } from "@/components/TitleProject"

/**
 * Container pour les éléments positionnés à droite de l'écran
 * Regroupe TitleProject et MassPlan avec un gap harmonieux
 */
export function RightContainer() {
    return (
        <div className="flex z-101 absolute right-2 top-2 lg:right-5 lg:top-5 z-10 flex flex-col gap-2 lg:gap-5 items-end w-[45vw] md:w-[38vw] lg:w-[28vw] xl:w-[25vw]">
            <TitleProject />
            <MassPlan />
        </div>
    )
}
