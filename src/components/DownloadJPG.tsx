"use client";
import { useStepper } from "@/contexts/StepperContext";
import { useNavigationMode } from "@/contexts/NavigationModeContext";
import { usePhasageNav } from "@/hooks/useNavigationNav";
import { useMemo } from "react";
import { Download } from "@/components/animate-ui/icons/download";
import { installationViews } from "@/data/phases";

/**
 * Composant bouton de téléchargement PNG
 * Télécharge l'image de fond actuellement affichée
 */
export function DownloadJPG() {
    const { currentPhase: planningPhase } = useStepper();
    const { currentPhase: phasagePhase } = usePhasageNav();
    const { mode, installationIndex, currentFrame } = useNavigationMode();

    // Déterminer l'image actuelle
    const imageSrc = useMemo(() => {
        const baseUrl = import.meta.env.BASE_URL;

        // Formatage de la frame sur 4 chiffres (ex: 0045)
        const frameStr = String(currentFrame || 0).padStart(4, "0");

        if (mode === "planning") {
            const folderId = String((planningPhase?.id || 1) - 1).padStart(2, "0");
            return `${baseUrl}phases/Phase_${folderId}/Phasage${frameStr}.webp`;
        } else if (mode === "phasage") {
            const folderId = String((phasagePhase?.id || 1) - 1).padStart(2, "0");
            return `${baseUrl}phases/Phase_${folderId}/Phasage${frameStr}.webp`;
        } else if (mode === "installation") {
            const installImage = installationViews[installationIndex]?.image;
            return installImage ? `${baseUrl}${installImage}` : "";
        }
        return "";
    }, [mode, planningPhase, phasagePhase, installationIndex, currentFrame]);

    const downloadImage = async () => {
        try {
            if (!imageSrc) {
                alert("Aucune image à télécharger");
                return;
            }

            // Charger l'image dans un objet Image
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = imageSrc;

            img.onload = async () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    alert("Impossible de créer le contexte du canvas");
                    return;
                }
                ctx.drawImage(img, 0, 0);

                // Exporter en JPG
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            alert("Erreur lors de la conversion en JPG");
                            return;
                        }

                        // Créer un nom de fichier avec date (YYYYMMDD_HHMMSS)
                        const now = new Date();
                        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
                        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
                        const randomId = Math.random().toString(36).substring(2, 8);
                        const filename = `${dateStr}_${timeStr}_${randomId}.jpg`;
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = filename;
                        link.click();
                        URL.revokeObjectURL(url);
                    },
                    "image/jpeg",
                    0.92 // qualité JPG
                );
            };

            img.onerror = () => {
                alert("Erreur lors du chargement de l'image");
            };
        } catch (error) {
            console.error("Erreur lors du téléchargement:", error);
            alert("Erreur lors du téléchargement de l'image");
        }
    };

    return (
        <button
            onClick={downloadImage}
            title="Télécharger une capture d'écran"
            className="inline-flex size-7 lg:size-10 text-black items-center justify-center border border-t-0 border-black bg-background hover:bg-[#E30613] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 select-none"
        >
            <Download className="w-4 h-4 lg:w-6 lg:h-6" animateOnHover />
        </button>
    );
}
