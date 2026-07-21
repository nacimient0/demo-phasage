import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { phases, installationViews, frameCount as defaultFrameCount } from "@/data/phases"

interface PreloaderContextType {
    isLoaded: boolean
    getImages: (folder: string, prefix: string) => HTMLImageElement[]
    getPhaseStatus: (folder: string) => { loaded: number; total: number; isComplete: boolean }
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined)

export function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isAppReady, setIsAppReady] = useState(false)
    const [appProgress, setAppProgress] = useState(0)

    // Suivi de la progression individuelle des phases (pour le chargement en arrière-plan)
    const [phaseProgress, setPhaseProgress] = useState<Record<string, { loaded: number; total: number; isComplete: boolean }>>({})
    const [imagesCache, setImagesCache] = useState<Record<string, HTMLImageElement[]>>({})

    useEffect(() => {
        const baseUrl = import.meta.env.BASE_URL

        // Collecte tous les sets d'images 360° uniques définis dans les points du JSON
        const collect360Sets = () => {
            const sets = new Map<string, { folder: string; prefix: string; frameCount: number }>()

            for (const phase of phases) {
                for (const point of phase.points) {
                    const view360 = point["360"]
                    if (view360) {
                        const resolvedPrefix = view360.prefix ?? "Phasage"
                        const key = `${view360.folder}_${resolvedPrefix}`
                        if (!sets.has(key)) {
                            sets.set(key, {
                                folder: view360.folder,
                                prefix: resolvedPrefix,
                                frameCount: view360.frameCount ?? defaultFrameCount,
                            })
                        }
                    }
                }
            }

            return Array.from(sets.values())
        }

        const all360Sets = collect360Sets()

        // Fallback si aucun set n'est défini dans le JSON : utilise Phase_00/Phasage
        const prioritySet = all360Sets[0] ?? {
            folder: "Phase_00",
            prefix: "Phasage",
            frameCount: defaultFrameCount,
        }

        // 1. Chargement prioritaire du premier set 360 (pour débloquer l'UI le plus vite possible)
        const loadPriority = () => {
            const { folder, prefix, frameCount } = prioritySet
            let loadedCount = 0
            const phaseImages: HTMLImageElement[] = []

            for (let i = 0; i < frameCount; i++) {
                const img = new Image()
                const indexStr = i.toString().padStart(4, "0")
                img.src = `${baseUrl}phases/${folder}/${prefix}${indexStr}.webp`

                const handleLoad = () => {
                    loadedCount++
                    setAppProgress(Math.round((loadedCount / frameCount) * 100))

                    if (loadedCount === frameCount) {
                        setImagesCache(prev => ({ ...prev, [`${folder}_${prefix}`]: phaseImages }))
                        setPhaseProgress(prev => ({ ...prev, [folder]: { loaded: frameCount, total: frameCount, isComplete: true } }))

                        // L'UI est prête
                        setTimeout(() => {
                            setIsAppReady(true)
                            // Lancer le chargement de tout le reste en arrière-plan
                            loadBackground()
                        }, 300)
                    }
                }

                img.onload = handleLoad
                img.onerror = handleLoad // On continue même s'il y a une erreur
                phaseImages.push(img)
            }
        }

        // 2. Chargement en arrière-plan du reste des assets
        const loadBackground = () => {
            // Images d'installation en PREMIER (priorité après le set prioritaire)
            installationViews.forEach(view => {
                const img1 = new Image(); img1.src = `${baseUrl}${view.image}`
                const img2 = new Image(); img2.src = `${baseUrl}${view.minimap}`
            })

            // Puis tous les autres sets 360° (en sautant le premier déjà chargé)
            const remainingSets = all360Sets.slice(1)

            remainingSets.forEach(({ folder, prefix, frameCount }) => {
                const phaseImages: HTMLImageElement[] = []
                let loadedCount = 0
                setPhaseProgress(prev => ({ ...prev, [folder]: { loaded: 0, total: frameCount, isComplete: false } }))

                for (let i = 0; i < frameCount; i++) {
                    const img = new Image()
                    const indexStr = i.toString().padStart(4, "0")
                    img.src = `${baseUrl}phases/${folder}/${prefix}${indexStr}.webp`

                    const handleLoad = () => {
                        loadedCount++
                        setPhaseProgress(prev => ({
                            ...prev,
                            [folder]: { loaded: loadedCount, total: frameCount, isComplete: loadedCount === frameCount }
                        }))

                        if (loadedCount === frameCount) {
                            setImagesCache(prev => ({ ...prev, [`${folder}_${prefix}`]: phaseImages }))
                        }
                    }

                    img.onload = handleLoad
                    img.onerror = handleLoad
                    phaseImages.push(img)
                }
            })
        }

        loadPriority()
    }, [])

    const getImages = (folder: string, prefix: string) => {
        return imagesCache[`${folder}_${prefix}`] || []
    }

    const getPhaseStatus = (folder: string) => {
        return phaseProgress[folder] || { loaded: 0, total: defaultFrameCount, isComplete: false }
    }

    return (
        <PreloaderContext.Provider value={{ isLoaded: isAppReady, getImages, getPhaseStatus }}>
            {!isAppReady && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-auto overflow-hidden bg-[#1a1a1a]">
                    {/* Image de fond avec blur important (utilise la première image d'installation comme cover) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transform scale-110"
                        style={{
                            backgroundImage: `url(${import.meta.env.BASE_URL}${installationViews[0]?.image || ''})`,
                            filter: 'blur(24px)'
                        }}
                    ></div>

                    {/* Overlay d'assombrissement pour garantir le contraste */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Contenu du Preloader */}
                    <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8">

                        <div className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-2 text-center uppercase">
                            HAROPA PORT DU HAVRE
                        </div>
                        <h2 className="text-xs md:text-sm font-medium text-white/70 tracking-[0.1em] mb-12 text-center uppercase">
                            Chargement de la maquette
                        </h2>

                        {/* Progress Bar très fine */}
                        <div className="w-full h-[2px] bg-white/20 overflow-hidden mb-3">
                            <div
                                className="h-full bg-white transition-all duration-300 ease-out"
                                style={{ width: `${appProgress}%` }}
                            />
                        </div>

                        {/* Informations de chargement */}
                        <div className="flex justify-between w-full text-[10px] md:text-xs font-medium text-white/60 tracking-wider">
                            <span>{appProgress}%</span>
                            <span className="animate-pulse">Initialisation...</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Rendu conditionnel des enfants : 
                On empêche le rendu de l'AppContent tant que ce n'est pas chargé
                pour éviter que les hooks dépendent de données pas prêtes. */}
            {isAppReady && children}
        </PreloaderContext.Provider>
    )
}

export function usePreloader() {
    const context = useContext(PreloaderContext)
    if (context === undefined) {
        throw new Error("usePreloader must be used within a PreloaderProvider")
    }
    return context
}
