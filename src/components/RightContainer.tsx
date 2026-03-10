import { MassPlan } from "./MassPlan"
import { TitleProject } from "./TitleProject"

/**
 * Container pour les éléments positionnés à droite de l'écran
 * Regroupe TitleProject et MassPlan avec un gap harmonieux
 */
export function RightContainer() {
    return (
        <div className="flex absolute right-2 top-2 lg:right-5 lg:top-5 z-10 flex flex-col gap-2 lg:gap-5 items-end w-[32vw] lg:w-[25vw]">
            <TitleProject />
            <MassPlan />
        </div>
    )
}
