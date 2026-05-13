import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { phases, installationViews } from "@/data/phases"

interface PreloaderContextType {
    isLoaded: boolean
    getImages: (folder: string, prefix: string) => HTMLImageElement[]
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined)

export function PreloaderProvider({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imagesCache, setImagesCache] = useState<Record<string, HTMLImageElement[]>>({})

    useEffect(() => {
        let loadedCount = 0
        const frameCount = 90
        
        // 7 phases * 90 images + installation views (images + minimaps)
        const totalImages = (phases.length * frameCount) + (installationViews.length * 2)
        const baseUrl = import.meta.env.BASE_URL

        const cache: Record<string, HTMLImageElement[]> = {}

        const handleLoad = () => {
            loadedCount++
            setProgress(Math.round((loadedCount / totalImages) * 100))
            if (loadedCount === totalImages) {
                setImagesCache(cache)
                // Petite pause pour s'assurer que le 100% est visible un instant
                setTimeout(() => setIsLoaded(true), 300)
            }
        }

        const handleError = () => {
            // En cas d'erreur (image introuvable), on incrémente pour ne pas bloquer l'appli
            handleLoad()
        }

        // 1. Charger les images des phases (Player360)
        phases.forEach((phase, index) => {
            const folder = `Phase_${String(index).padStart(2, "0")}`
            const prefix = "Phasage"
            const phaseImages: HTMLImageElement[] = []
            
            for (let i = 0; i < frameCount; i++) {
                const img = new Image()
                const indexStr = i.toString().padStart(4, "0")
                img.src = `${baseUrl}phases/${folder}/${prefix}${indexStr}.webp`
                img.onload = handleLoad
                img.onerror = handleError
                phaseImages.push(img)
            }
            cache[`${folder}_${prefix}`] = phaseImages
        })

        // 2. Charger les images d'installation et minimaps
        installationViews.forEach(view => {
            const img1 = new Image()
            img1.src = `${baseUrl}${view.image}`
            img1.onload = handleLoad
            img1.onerror = handleError

            const img2 = new Image()
            img2.src = `${baseUrl}${view.minimap}`
            img2.onload = handleLoad
            img2.onerror = handleError
        })
    }, [])

    const getImages = (folder: string, prefix: string) => {
        return imagesCache[`${folder}_${prefix}`] || []
    }

    return (
        <PreloaderContext.Provider value={{ isLoaded, getImages }}>
            {!isLoaded && (
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
                            ERIA
                        </div>
                        <h2 className="text-xs md:text-sm font-medium text-white/70 tracking-[0.1em] mb-12 text-center uppercase">
                            Chargement de la maquette
                        </h2>
                        
                        {/* Progress Bar très fine */}
                        <div className="w-full h-[2px] bg-white/20 overflow-hidden mb-3">
                            <div 
                                className="h-full bg-white transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Informations de chargement */}
                        <div className="flex justify-between w-full text-[10px] md:text-xs font-medium text-white/60 tracking-wider">
                            <span>{progress}%</span>
                            <span className="animate-pulse">Initialisation...</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Rendu conditionnel des enfants : 
                On empêche le rendu de l'AppContent tant que ce n'est pas chargé
                pour éviter que les hooks dépendent de données pas prêtes. */}
            {isLoaded && children}
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
