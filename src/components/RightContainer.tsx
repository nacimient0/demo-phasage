import { MassPlan } from "./MassPlan"
import { TitleProject } from "./TitleProject"

/**
 * Container pour les éléments positionnés à droite de l'écran
 * Regroupe TitleProject et MassPlan avec un gap harmonieux
 */
export function RightContainer() {
    return (
        <div className="absolute right-2 top-2 z-10 flex flex-col gap-2 items-end">
            <TitleProject />
            <MassPlan />
        </div>
    )
}
