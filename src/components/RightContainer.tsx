import { MassPlan } from "./MassPlan"
import { TitleProject } from "./TitleProject"

/**
 * Container pour les éléments positionnés à droite de l'écran
 * Regroupe TitleProject et MassPlan avec un gap harmonieux
 */
export function RightContainer() {
    return (
        <div className="absolute right-5 top-5 z-10 flex flex-col md:gap-5 sm:gap-2 items-end">
            <TitleProject />
            <MassPlan />
        </div>
    )
}
