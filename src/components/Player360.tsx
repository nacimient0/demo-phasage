import { useEffect, useRef, useState, useContext } from "react"
import { cn } from "@/lib/utils"
import { NavigationModeContext } from "@/contexts/NavigationModeContext"

interface Player360Props {
    folder: string
    prefix: string
    frameCount?: number
    className?: string
}

export function Player360({ folder, prefix, frameCount = 90, className }: Player360Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const { currentFrame, setCurrentFrame } = useContext(NavigationModeContext)!

    // Variables d'état pour le drag/pan/zoom
    const [isDragging, setIsDragging] = useState(false)
    const [currentZoom, setCurrentZoom] = useState(1)
    const [panX, setPanX] = useState(0)
    const [panY, setPanY] = useState(0)
    const [panStartX, setPanStartX] = useState(0)
    const [panStartY, setPanStartY] = useState(0)

    const startX = useRef(0)

    // Fonction pour empêcher l'image de sortir de l'écran lors du pan
    const clampPan = (px: number, py: number, zoom: number) => {
        const w = window.innerWidth
        const h = window.innerHeight

        // Le pan max correspond à la différence de taille entre l'image zoomée et la fenêtre, divisée par 2
        const maxPanX = Math.max(0, (w * zoom - w) / 2)
        const maxPanY = Math.max(0, (h * zoom - h) / 2)

        setPanX(Math.min(Math.max(px, -maxPanX), maxPanX))
        setPanY(Math.min(Math.max(py, -maxPanY), maxPanY))
    }

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
        canvas.width = window.innerWidth  // Mieux vaut utiliser la taille de la fenêtre ici
        canvas.height = window.innerHeight

        // Dessine l'image en "object-cover" manuel sur le canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width / 2) - (img.width / 2) * scale
        const y = (canvas.height / 2) - (img.height / 2) * scale

        // On clear au cas où
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }, [images, currentFrame])

    // 3. Gestion du Swipe / Drag (Pan !)
    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true)
        startX.current = clientX
        // On sauvegarde la position de départ pour calculer le pan en temps réel
        setPanStartX(clientX - panX)
        setPanStartY(clientY - panY)
    }

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging || images.length === 0) return

        if (currentZoom > 1) {
            // ---> MODE PAN : on déplace l'image (X et Y) <---
            const newPanX = clientX - panStartX
            const newPanY = clientY - panStartY
            clampPan(newPanX, newPanY, currentZoom)
        } else {
            // ---> MODE 360 : on change les frames <---
            const dx = clientX - startX.current
            const w = window.innerWidth
            const diff = Math.round((dx / w) * frameCount * 1.5) // Sensibilité

            const newFrame = ((currentFrame - diff) % frameCount + frameCount) % frameCount
            setCurrentFrame(newFrame)
            startX.current = clientX
        }
    }

    const handleEnd = () => {
        setIsDragging(false)
    }

    // 4. Gestion de la molette pour Zoomer (Wheel)
    const handleWheel = (e: React.WheelEvent) => {
        // Empêche le défilement de la page (important si scroll parent)
        e.preventDefault()

        const zoomDelta = e.deltaY > 0 ? -0.2 : 0.2
        const newZoom = Math.min(Math.max(currentZoom + zoomDelta, 1), 6)

        if (newZoom === currentZoom) return

        const scaleRatio = newZoom / currentZoom

        // Coordonnées de la souris relatives au centre de l'écran :
        const mouseX = e.clientX - window.innerWidth / 2
        const mouseY = e.clientY - window.innerHeight / 2

        const newPanX = panX * scaleRatio - mouseX * (scaleRatio - 1)
        const newPanY = panY * scaleRatio - mouseY * (scaleRatio - 1)

        setCurrentZoom(newZoom)

        // Si on dézoome complètement, on recentre de force l'image
        if (newZoom === 1) {
            setPanX(0)
            setPanY(0)
        } else {
            // On clamp pour ne pas sortir de l'image (les bords noirs)
            const w = window.innerWidth
            const h = window.innerHeight
            const maxPanX = Math.max(0, (w * newZoom - w) / 2)
            const maxPanY = Math.max(0, (h * newZoom - h) / 2)

            setPanX(Math.min(Math.max(newPanX, -maxPanX), maxPanX))
            setPanY(Math.min(Math.max(newPanY, -maxPanY), maxPanY))
        }
    }

    // e.preventDefault()
    useEffect(() => {
        const div = canvasRef.current?.parentElement
        if (!div) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
        }
        div.addEventListener("wheel", onWheel, { passive: false });
        return () => div.removeEventListener("wheel", onWheel)
    }, [])

    // Détermine le type de curseur de la souris à afficher
    const cursorClass = isDragging
        ? "cursor-grabbing"
        : (currentZoom > 1 ? 'cursor-move' : '')

    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full overflow-hidden",
                cursorClass,
                className
            )}
            style={{
                cursor: (!isDragging && currentZoom <= 1) ? 'url("./360.png") 16 7, auto' : undefined
            }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}

            onWheel={handleWheel}

            // Gestion Touch (Mobile)
            onTouchStart={(e) => {
                handleStart(e.touches[0].clientX, e.touches[0].clientY)
            }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleEnd}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                // Application du zoom / pan visuellement
                style={{
                    transform: `translate(${panX}px, ${panY}px) scale(${currentZoom})`,
                    transformOrigin: "center center",
                    // Ne pas animer si on pan avec la souris, sinon ça fait un effet "élastique", on anime le wheel.
                    transition: isDragging ? "none" : "transform 0.1s ease-out"
                }}
            />
        </div>
    )
}