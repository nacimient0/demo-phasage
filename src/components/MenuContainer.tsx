import { MenuViewPoint } from "./MenuViewPoint"
import { MenuProjectType } from "./MenuProjectType"
import { Fullscreen } from "./FullScreen"
import { DownloadJPG } from "./DownloadJPG"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { PanelBottomClose } from "@/components/animate-ui/icons/panel-bottom-close"
import { PanelTopClose } from "@/components/animate-ui/icons/panel-top-close"

export function MenuContainer() {
    const { timelineVisible, setTimelineVisible } = useNavigationMode()

    return (
        <div className="absolute top-2 left-2 lg:top-5 lg:left-5 z-10 flex">
            {/* Colonne boutons icônes */}
            <div className="flex flex-col mr-1 lg:mr-5">
                <Fullscreen />
                <button
                    onClick={() => setTimelineVisible(!timelineVisible)}
                    title={timelineVisible ? "Masquer la timeline" : "Afficher la timeline"}
                    className="inline-flex size-7 lg:size-10 text-black items-center justify-center border border-t-0 border-black bg-background hover:bg-[#E30613] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none"
                >
                    {timelineVisible
                        ? <PanelBottomClose className="w-4 h-4 lg:w-6 lg:h-6" animateOnHover />
                        : <PanelTopClose className="w-4 h-4 lg:w-6 lg:h-6" animateOnHover />
                    }
                </button>
                <DownloadJPG />
            </div>
            {/* Menus : toujours en colonne sur mobile (portrait ET paysage), ligne uniquement desktop */}
            <div className="flex flex-col lg:flex-row">
                <MenuProjectType />
                <MenuViewPoint />
            </div>
        </div>
    )
}
