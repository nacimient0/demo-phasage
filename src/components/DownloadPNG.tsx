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
export function DownloadPNG() {
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

            // Récupérer l'image
            const response = await fetch(imageSrc);

            // Ajouter la vérification du statut HTTP
            if (!response.ok) {
                throw new Error(`Erreur réseau: ${response.status} - L'image n'a pas pu être trouvée à l'adresse URL: ${imageSrc}`);
            }

            const blob = await response.blob();

            // Créer un nom de fichier avec date (YYYYMMDD_HHMMSS)
            const now = new Date();
            const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
            const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');

            // Nom basé sur le mode et l'élément actuel
            let filename = `demo-phasage_${mode}_`;
            if (mode === "planning") {
                filename += `phase${planningPhase?.id}_frame${currentFrame}`;
            } else if (mode === "phasage") {
                filename += `phase${phasagePhase?.id}_frame${currentFrame}`;
            } else if (mode === "installation") {
                filename += `installation${installationIndex + 1}`;
            }
            filename += `_${dateStr}_${timeStr}.webp`;

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
