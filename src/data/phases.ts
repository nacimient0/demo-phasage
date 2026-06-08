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

export const installationViews: InstallationView[] = [
    {
        id: 1,
        label: "Vue Base vie et zones de déchargement - Rue Bellini",
        image: "installation/VUE_PIC_001.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "10%", left: "43%", rotate: "rotate-[-90deg]" },
    },
    {
        id: 2,
        label: "Vue Base vie et zones de déchargement - Bd Pierre Gaudin",
        image: "installation/VUE_PIC_002.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "35%", left: "75%", rotate: "rotate-[200deg]" },
    },
    {
        id: 3,
        label: "Vue Base vie et zones de déchargement - Passerelle de l'Orme",
        image: "installation/VUE_PIC_003.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "5%", left: "70%", rotate: "rotate-[-145deg]" },
    },
    {
        id: 4,
        label: "Vue Périmètre chantier et Rayon Grue - Vue de dessus",
        image: "installation/General.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "50%", left: "20%", rotate: "rotate-[45deg]" },
    },
    {
        id: 5,
        label: "Vue Entrée Chantier - Côté Est",
        image: "installation/VUE_PIC_001.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "75%", left: "30%", rotate: "rotate-[90deg]" },
    },
    {
        id: 6,
        label: "Vue Stockage Matériaux - Zone Centrale",
        image: "installation/VUE_PIC_002.webp",
        minimap: "minimaps/phase00.webp",
        conePosition: { bottom: "60%", left: "60%", rotate: "rotate-[-45deg]" },
    },
    {
        id: 7,
        label: "Vue Grue à Tour G1 - Vue Cabine",
        image: "installation/VUE_PIC_003.webp",
        minimap: "minimaps/phase00.webp",
        conePosition: { bottom: "40%", left: "45%", rotate: "rotate-[120deg]" },
    },
    {
        id: 8,
        label: "Vue Accès Piétons et Sécurité",
        image: "installation/General.webp",
        minimap: "minimaps/phase00.webp",
        conePosition: { bottom: "80%", left: "75%", rotate: "rotate-[180deg]" },
    },
    {
        id: 9,
        label: "Vue Bungalows et Bureaux Chantier",
        image: "installation/VUE_PIC_001.webp",
        minimap: "minimaps/phase00.webp",
        conePosition: { bottom: "25%", left: "25%", rotate: "rotate-[-30deg]" },
    },
    {
        id: 10,
        label: "Vue Zone de Tri des Déchets",
        image: "installation/VUE_PIC_002.webp",
        minimap: "minimaps/phase00.webp",
        conePosition: { bottom: "15%", left: "85%", rotate: "rotate-[225deg]" },
    },
    {
        id: 11,
        label: "Vue Poste de Garde et Accueil",
        image: "installation/VUE_PIC_003.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "90%", left: "50%", rotate: "rotate-[270deg]" },
    },
    {
        id: 12,
        label: "Vue Parking et Livraison",
        image: "installation/General.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "70%", left: "15%", rotate: "rotate-[60deg]" },
    },
    {
        id: 13,
        label: "Vue Passerelle Bellini - Perspective",
        image: "installation/VUE_PIC_001.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "30%", left: "90%", rotate: "rotate-[135deg]" },
    },
    {
        id: 14,
        label: "Vue Grue G2 et Aire de Levage",
        image: "installation/VUE_PIC_002.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "45%", left: "80%", rotate: "rotate-[-60deg]" },
    },
    {
        id: 15,
        label: "Vue d'ensemble du Projet ERIA",
        image: "installation/VUE_PIC_003.webp",
        minimap: "minimaps/phase01.webp",
        conePosition: { bottom: "55%", left: "35%", rotate: "rotate-[15deg]" },
    },
]

export const phases: Phase[] = [
    {
        id: 1,
        name: "TRANCHE 1 : Juillet 2026 à Mars 2028",
        shortName: "TRANCHE 1 : Juillet 2026 à Mars 2028",
        color: "#32e068",
        startPoint: 1,
        endPoint: 8,
        points: [
            { id: 1, label: "Démolition" },
            { id: 2, label: "Nivellement" },
            { id: 3, label: "Pieux et Tête de pieux" },
            { id: 4, label: "Radier" },
            { id: 5, label: "Butonnage" },
            { id: 6, label: "Tranchées" },
            { id: 7, label: "Parois moulées" },
            { id: 8, label: "Décaissement" },

        ],
    },
    {
        id: 2,
        name: "TRANCHE 2 : Mars 2028 à Décembre 2029",
        shortName: "TRANCHE 2 : Mars 2028 à Décembre 2029",
        color: "#0037ff",
        startPoint: 9,
        endPoint: 15,
        points: [
            { id: 9, label: "Plateformes routières et ferroviaires" },
            { id: 10, label: "Plateformes routières et ferroviaires" },
            { id: 11, label: "Plateformes routières et ferroviaires" },
            { id: 12, label: "Plateformes routières et ferroviaires" },
            { id: 13, label: "Plateformes routières et ferroviaires" },
            { id: 14, label: "Plateformes routières et ferroviaires" },
            { id: 15, label: "Plateformes routières et ferroviaires" },
        ],
    },
]

export const totalPoints = 15
