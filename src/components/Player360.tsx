// src/components/Player360.tsx
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Player360Props {
    folder: string // ex: "Phase_00"
    prefix: string // ex: "Phasage"
    frameCount?: number // default 90
    className?: string
}

export function Player360({ folder, prefix, frameCount = 90, className }: Player360Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [currentFrame, setCurrentFrame] = useState(24) 
    const [isDragging, setIsDragging] = useState(false)
    const startX = useRef(0)

    // 1. Préchargement des images
    useEffect(() => {
        let loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 0; i < frameCount; i++) {
            const img = new Image()
            // Formatage "0000" à "0089" par exemple si prefix = Phasage000
            // S'il faut un renommage spécifique, on l'ajustera.
            const indexStr = i.toString().padStart(4, '0') // ex: 0000, 0001

            // baseUrl pour cibler public/
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

        // Auto-ajuster le canvas aux dimensions de la première image
        if (canvas.width !== img.width) canvas.width = img.width
        if (canvas.height !== img.height) canvas.height = img.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }, [currentFrame, images])


    // 3. Gestion de l'interactivité (swipe)
    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true)
        startX.current = e.clientX
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return

        const deltaX = e.clientX - startX.current
        // Sensibilité de la rotation
        const sensitivity = 5

        if (Math.abs(deltaX) > sensitivity) {
            // Déterminer la direction (-1 ou 1)
            const direction = deltaX > 0 ? -1 : 1

            setCurrentFrame((prev) => {
                let next = prev + direction
                if (next >= frameCount) next = 0
                if (next < 0) next = frameCount - 1
                return next
            })

            startX.current = e.clientX
        }
    }

    const handlePointerUp = () => {
        setIsDragging(false)
    }

    return (
        <div
            className={cn("w-full h-full relative select-none cursor-grab active:cursor-grabbing", className)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover pointer-events-none"
            />
            {/* Loading state basique */}
            {images.length < frameCount && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                    Chargement 360...
                </div>
            )}
        </div>
    )
}