import { MenuViewPoint } from "./MenuViewPoint"
import { MenuProjectType } from "./MenuProjectType"
import { Fullscreen } from "./FullScreen"
import { DownloadPNG } from "./DownloadPNG"

export function MenuContainer() {
    return (
        <div className="absolute top-2 left-2 z-10 flex">
            <div className="flex flex-col mr-2 ">
                <Fullscreen />
                <DownloadPNG />
            </div>
            <MenuViewPoint />
            <MenuProjectType />
        </div>
    )
}
