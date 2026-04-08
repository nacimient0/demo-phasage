import type { Phase } from "@/types/phase"

export interface InstallationView {
    id: number
    label: string        // Nom affiché dans MenuViewPoint
    image: string        // Chemin relatif au dossier public
    conePosition: {      // Position du cône sur le plan de masse
        bottom: string
        left: string
        rotate: string
    }
}

export const installationViews: InstallationView[] = [
    {
        id: 1,
        label: "Vue zone de déchargement - Rue Paul LAFARGE",
        image: "installation/VUE_PIC_001.webp",
        conePosition: { bottom: "0%", left: "8%", rotate: "rotate-[300deg]" },
    },
    {
        id: 2,
        label: "Vue zone de déchargement - Rue Jean JAURÈS",
        image: "installation/VUE_PIC_002.webp",
        conePosition: { bottom: "55%", left: "90%", rotate: "rotate-[175deg]" },
    },
    {
        id: 3,
        label: "Vue base vie et zones de déchargement - Rue Paul LAFARGE",
        image: "installation/VUE_PIC_003.webp",
        conePosition: { bottom: "0%", left: "50%", rotate: "rotate-[270deg]" },
    },
]

export const phases: Phase[] = [
    {
        id: 1,
        name: "Gros œuvre",
        shortName: "Gros œuvre",
        color: "hsl(210, 100.00%, 50.00%)",
        startPoint: 1,
        endPoint: 3,
        points: [
            { id: 1, label: "Terrassement" },
            { id: 2, label: "Semelles" },
            { id: 3, label: "Longrines" },
        ],
    },
    {
        id: 2,
        name: "Fondations",
        shortName: "Fondations",
        color: "hsl(150, 100.00%, 50.00%)",
        startPoint: 4,
        endPoint: 6,
        points: [
            { id: 4, label: "Dallage" },
            { id: 5, label: "Sous-sol" },
            { id: 6, label: "Voiles béton" },
        ],
    },
    {
        id: 3,
        name: "Infrastructures",
        shortName: "Infrastructures",
        color: "hsl(288, 100.00%, 50.00%)",
        startPoint: 7,
        endPoint: 9,
        points: [
            { id: 7, label: "Plancher S-1" },
            { id: 8, label: "Étanchéité" },
            { id: 9, label: "RDC" },
        ],
    },
    {
        id: 4,
        name: "Superstructure",
        shortName: "Superstructure",
        color: "hsl(256, 100.00%, 50.00%)",
        startPoint: 10,
        endPoint: 12,
        points: [
            { id: 10, label: "Étage 1" },
            { id: 11, label: "Étage 2" },
            { id: 12, label: "Étage 3" },
        ],
    },
    {
        id: 5,
        name: "Pose de la façade",
        shortName: "Façade",
        color: "hsl(41, 100.00%, 50.00%)",
        startPoint: 13,
        endPoint: 15,
        points: [
            { id: 13, label: "Charpente" },
            { id: 14, label: "Bardage" },
            { id: 15, label: "Menuiseries ext." },

        ],
    },
    {
        id: 6,
        "name": "CEA et CET",
        shortName: "Finitions",
        color: "hsl(0, 100.00%, 50.00%)",
        startPoint: 16,
        endPoint: 18,
        points: [
            { id: 16, label: "Isolation ext." },
            { id: 17, label: "Enduit" },
            { id: 18, label: "Électricité" },
        ],
    },
    {
        id: 7,
        name: "test",
        shortName: "test",
        color: "hsl(59, 100.00%, 51.40%)",
        startPoint: 19,
        endPoint: 21,
        points: [
            { id: 19, label: "Plomberie" },
            { id: 20, label: "Cloisonnement" },
            { id: 21, label: "Peinture" },
        ],
    },
]

export const totalPoints = 21
