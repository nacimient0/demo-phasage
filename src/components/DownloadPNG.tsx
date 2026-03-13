"use client";
import { useStepper } from "@/contexts/StepperContext";
import { useNavigationMode } from "@/contexts/NavigationModeContext";
import { useMemo } from "react";
import { Download } from "@/components/animate-ui/icons/download";

/**
 * Composant bouton de téléchargement PNG
 * Télécharge l'image de fond actuellement affichée
 */
export function DownloadPNG() {
    const { currentPhase, currentPointId } = useStepper();
    const { mode } = useNavigationMode();

    // Calculer l'index d'installation (même logique que PhaseBackground)
    const installationIndex = useMemo(() => {
        if (mode !== "installation") return 0;
        if (currentPointId <= 7) return 0;
        if (currentPointId <= 15) return 1;
        return 2;
    }, [currentPointId, mode]);    // Déterminer l'image actuelle
    const imageSrc = useMemo(() => {
        const baseUrl = import.meta.env.BASE_URL;
        if (mode === "planning") {
            return `${baseUrl}planning/Point_${currentPhase?.id}.jpg`;
        } else if (mode === "phasage") {
            return `${baseUrl}phases/Phase_${currentPhase?.id}.jpg`;
        } else if (mode === "installation") {
            return `${baseUrl}installation/Installation_${installationIndex + 1}.jpg`;
        }
        return currentPhase?.image;
    }, [mode, currentPhase, installationIndex]);

    const downloadImage = async () => {
        try {
            if (!imageSrc) {
                alert("Aucune image à télécharger");
                return;
            }

            // Récupérer l'image
            const response = await fetch(imageSrc);
            const blob = await response.blob();

            // Créer un nom de fichier avec date (YYYYMMDD_HHMMSS)
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');

            // Nom basé sur le mode et l'élément actuel
            let filename = `demo-phasage_${mode}_`;
            if (mode === "planning") {
                filename += `point${currentPhase?.id}`;
            } else if (mode === "phasage") {
                filename += `phase${currentPhase?.id}`;
            } else if (mode === "installation") {
                filename += `installation${installationIndex + 1}`;
            }
            filename += `_${dateStr}_${timeStr}.jpg`;

            // Créer un lien de téléchargement
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();

            // Nettoyer
            URL.revokeObjectURL(url);
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
