import type { Phase } from "@/types/phase"

export interface InstallationView {
    id: number
    label: string        // Nom affiché dans MenuViewPoint
    image: string        // Chemin relatif au dossier public
    minimap: string      // Chemin relatif au dossier public de la minimap associée
    conePosition: {      // Position du cône sur le plan de masse
        bottom: string
        left?: string
        rotate: string
    }
}

export const installationViews: InstallationView[] = [
    {
        id: 1,
        label: "Vue Base vie et zones de déchargement - Rue Bellini",
        image: "installation/VUE_PIC_001.webp",
        minimap: "minimaps/phase02.webp",
        conePosition: { bottom: "20%", left: "70%", rotate: "rotate-[200deg]" },
    },
    {
        id: 2,
        label: "Vue Base vie et zones de déchargement - Bd Pierre Gaudin",
        image: "installation/VUE_PIC_002.webp",
        minimap: "minimaps/phase05.webp",
        conePosition: { bottom: "20%", left: "70%", rotate: "rotate-[200deg]" },
    },
    {
        id: 3,
        label: "Vue Base vie et zones de déchargement - Passerelle de l'Orme",
        image: "installation/VUE_PIC_003.webp",
        minimap: "minimaps/phase06.webp",
        conePosition: { bottom: "20%", left: "70%", rotate: "rotate-[200deg]" },
    },
    {
        id: 4,
        label: "Vue Périmètre chantier et Rayon Grue - Vue de dessus",
        image: "installation/VUE_PIC_004.webp",
        minimap: "minimaps/phase06.webp",
        conePosition: { bottom: "20%", left: "70%", rotate: "rotate-[200deg]" },
    },
]

export const phases: Phase[] = [
    {
        id: 1,
        name: "MOIS 1-2 : TERRASSEMENT",
        shortName: "MOIS 1-2 : TERRASSEMENT",
        color: "#0080FF",
        startPoint: 1,
        endPoint: 2,
        points: [
            { id: 1, label: "Démolition" },
            { id: 2, label: "Nivellement" },
        ],
    },
    {
        id: 2,
        name: "MOIS 3-5 : FONDATIONS",
        shortName: "MOIS 3-5 : FONDATIONS",
        color: "#018A57",
        startPoint: 3,
        endPoint: 5,
        points: [
            { id: 3, label: "Pieux et Tête de pieux" },
            { id: 4, label: "Radier" },
            { id: 5, label: "Butonnage" },
        ],
    },
    {
        id: 3,
        name: "MOIS 6-7 : INFRASTRUCTURE",
        shortName: "MOIS 6-7 : INFRASTRUCTURE",
        color: "#84C801",
        startPoint: 6,
        endPoint: 7,
        points: [
            { id: 6, label: "Tranchées" },
            { id: 7, label: "Parois moulées" },
        ],
    },
    {
        id: 4,
        name: "MOIS 8-9 : NOYAU",
        shortName: "MOIS 8-9 : NOYAU",
        color: "#FF8000",
        startPoint: 8,
        endPoint: 9,
        points: [
            { id: 8, label: "Décaissement" },
            { id: 9, label: "Butonnage" },
        ],
    },
    {
        id: 5,
        name: "MOIS 10-13 : SUPERSTRUCTURE",
        shortName: "MOIS 10-13 : SUPERSTRUCTURE",
        color: "#DA2222",
        startPoint: 10,
        endPoint: 13,
        points: [
            { id: 10, label: "Sous-sols" },
            { id: 11, label: "R+0 à R+2" },
            { id: 12, label: "R+3 à R+5" },
            { id: 13, label: "R+6 à R+8" },
        ],
    },
    {
        id: 6,
        name: "MOIS 14-16 : SECOND ŒUVRE",
        shortName: "MOIS 14-16 : SECOND ŒUVRE",
        color: "#E200A2",
        startPoint: 14,
        endPoint: 16,
        points: [
            { id: 14, label: "Façades" },
            { id: 15, label: "Isolation" },
            { id: 16, label: "Clos et couvert" },
        ],
    },
    {
        id: 7,
        name: "MOIS 17-20 : CES et CET",
        shortName: "MOIS 17-20 : CES et CET",
        color: "#5C099F",
        startPoint: 17,
        endPoint: 20,
        points: [
            { id: 17, label: "Plomberie" },
            { id: 18, label: "Electricité" },
            { id: 19, label: "Peinture" },
            { id: 20, label: "Revêtement de sol" },
        ],
    },
]

export const totalPoints = 20
