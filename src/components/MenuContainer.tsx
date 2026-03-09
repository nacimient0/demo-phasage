import { MenuViewPoint } from "./MenuViewPoint"
import { MenuProjectType } from "./MenuProjectType"
import { Fullscreen } from "./FullScreen"
import { DownloadPNG } from "./DownloadPNG"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { PanelBottomClose } from "@/components/animate-ui/icons/panel-bottom-close"
import { PanelTopClose } from "@/components/animate-ui/icons/panel-top-close"

export function MenuContainer() {
    const { timelineVisible, setTimelineVisible } = useNavigationMode()

    return (
        <div className="absolute top-5 left-5 z-10 flex">
            <div className="flex flex-col md:mr-5 sm:mr-2">
                <Fullscreen />
                <button
                    onClick={() => setTimelineVisible(!timelineVisible)}
                    title={timelineVisible ? "Masquer la timeline" : "Afficher la timeline"}
                    className="inline-flex md:size-10 sm:size-8 text-black items-center justify-center border border-t-0 border-black bg-background hover:bg-[#E30613] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none"
                >
                    {timelineVisible
                        ? <PanelBottomClose className="md:w-6 md:h-6 sm:w-5 sm:h-5" animateOnHover />
                        : <PanelTopClose className="md:w-6 md:h-6 sm:w-5 sm:h-5" animateOnHover />
                    }
                </button>
                <DownloadPNG />
            </div>
            <div className="flex md:flex-row sm:flex-col">
                <MenuProjectType />
                <MenuViewPoint />
            </div>
        </div>
    )
}
