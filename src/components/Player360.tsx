import { useEffect, useRef, useState, useContext } from "react"
import { cn } from "@/lib/utils"
import { NavigationModeContext } from "@/contexts/NavigationModeContext"

interface Player360Props {
    folder: string // ex: "Phase_00"
    prefix: string // ex: "Phasage"
    frameCount?: number // default 90
    className?: string
}

export function Player360({ folder, prefix, frameCount = 90, className }: Player360Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    // REMPLACER ICI : utiliser le context
    const { currentFrame, setCurrentFrame } = useContext(NavigationModeContext)!
    const [isDragging, setIsDragging] = useState(false)
    const startX = useRef(0)

    // 1. Préchargement des images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            const indexStr = i.toString().padStart(4, "0") // ex: 0000, 0001
            const baseUrl = import.meta.env.BASE_URL
            img.src = `${baseUrl}phases/${folder}/${prefix}${indexStr}.webp`

            img.onload = () => {
                loadedCount++
                if (loadedCount === frameCount) {
                    setImages(loadedImages)
                }
            }
            loadedImages.push(img)
        }
    }, [folder, prefix, frameCount])

    // 2. Dessin sur Canvas
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = images[currentFrame]
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
    }, [images, currentFrame])

    // 3. Gestion du Swipe / Drag
    const handleStart = (clientX: number) => {
        setIsDragging(true)
        startX.current = clientX
    }

    const handleMove = (clientX: number) => {
        if (!isDragging || images.length === 0) return

        const dx = clientX - startX.current
        const w = window.innerWidth
        const diff = Math.round((dx / w) * frameCount * 1.5) // 1.5 pour sensibilité

        // Calcul la nouvelle frame en boucle sur 0..89
        const newFrame = ((currentFrame - diff) % frameCount + frameCount) % frameCount
        
        setCurrentFrame(newFrame)

        startX.current = clientX
    }

    const handleEnd = () => setIsDragging(false)

    return (
        <div
            className={cn("absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing", className)}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}

            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
        >
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>
    )
}
