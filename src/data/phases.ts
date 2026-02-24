import type { Phase } from "@/types/phase"

export const phases: Phase[] = [
    {
        id: 1,
        name: "Fondations",
        shortName: "Fondations",
        color: "hsl(210, 100%, 50%)",
        startPoint: 1,
        endPoint: 4,
        image: "/Phase_1.jpg",
        points: [
            { id: 1, label: "Terrassement" },
            { id: 2, label: "Semelles" },
            { id: 3, label: "Longrines" },
            { id: 4, label: "Dallage" },
        ],
    },
    {
        id: 2,
        name: "Infrastructures",
        shortName: "Infrastructures",
        color: "hsl(150, 70%, 45%)",
        startPoint: 5,
        endPoint: 7,
        image: "/Phase_2.jpg",
        points: [
            { id: 5, label: "Sous-sol" },
            { id: 6, label: "Voiles béton" },
            { id: 7, label: "Plancher S-1" },
        ],
    },
    {
        id: 3,
        name: "Superstructure",
        shortName: "Superstructure",
        color: "hsl(30, 100%, 50%)",
        startPoint: 8,
        endPoint: 12,
        image: "/Phase_3.jpg",
        points: [
            { id: 8, label: "Étanchéité" },
            { id: 9, label: "RDC" },
            { id: 10, label: "Étage 1" },
            { id: 11, label: "Étage 2" },
            { id: 12, label: "Étage 3" },
        ],
    },
    {
        id: 4,
        name: "Pose de la façade",
        shortName: "Façade",
        color: "hsl(280, 70%, 55%)",
        startPoint: 13,
        endPoint: 16,
        image: "/Phase_4.jpg",
        points: [
            { id: 13, label: "Charpente" },
            { id: 14, label: "Bardage" },
            { id: 15, label: "Menuiseries ext." },
            { id: 16, label: "Isolation ext." },
        ],
    },
    {
        id: 5,
        name: "CES et CEA",
        shortName: "Finitions",
        color: "hsl(340, 80%, 55%)",
        startPoint: 17,
        endPoint: 22,
        image: "/Phase_5.jpg",
        points: [
            { id: 17, label: "Enduit" },
            { id: 18, label: "Électricité" },
            { id: 19, label: "Plomberie" },
            { id: 20, label: "Cloisonnement" },
            { id: 21, label: "Peinture" },
            { id: 22, label: "Livraison" },
        ],
    },
]

export const totalPoints = 22
