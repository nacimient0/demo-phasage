import type { Phase } from "@/types/phase"

export interface InstallationView {
    id: number
    label: string        // Nom affiché dans MenuViewPoint
    image: string        // Chemin relatif au dossier public
    minimap: string      // Chemin relatif au dossier public de la minimap associée
    conePosition?: {     // Position du cône sur le plan de masse (Optionnel)
        bottom: string
        left?: string
        rotate: string
    }
}

// Fetch base URL and load configuration dynamically at runtime (Top-level await)
const baseUrl = import.meta.env.BASE_URL || "/";
const response = await fetch(`${baseUrl}phases.json`);
if (!response.ok) {
    throw new Error(`Failed to load phases.json: ${response.statusText}`);
}
const data = await response.json();

export const installationViews: InstallationView[] = data.installationViews;
export const phases: Phase[] = data.phases;
export const totalPoints: number = data.totalPoints;
export const frameCount: number = data.frameCount || 30;
