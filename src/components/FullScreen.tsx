"use client";
import { useEffect, useState } from "react";
import { Minimize } from "@/components/animate-ui/icons/minimize"
import { Maximize } from "@/components/animate-ui/icons/maximize"

/**
 * Bouton plein écran responsive
 * - Icône 20px sur mobile, 30px sur desktop
 * - Toggle fullscreen avec mise à jour automatique de l’état
 */
export function Fullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleChange);
        return () => document.removeEventListener("fullscreenchange", handleChange);
    }, []);

    const toggleFullscreen = () => {
        const element = document.documentElement;
        if (!document.fullscreenElement) {
            element.requestFullscreen?.().catch(console.error);
        } else {
            document.exitFullscreen?.().catch(console.error);
        }    }; return (        <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}            className="inline-flex text-black items-center justify-center border size-7 lg:size-10 border-black bg-background hover:bg-[#E30613] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none"
        >
            {isFullscreen ? (
                <Minimize className="w-4 h-4 lg:w-6 lg:h-6" animateOnHover />
            ) : (
                <Maximize className="w-4 h-4 lg:w-6 lg:h-6" animateOnHover />
            )}
        </button>
    );
}
