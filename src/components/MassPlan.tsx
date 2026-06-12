import { useState, useEffect, useRef } from "react";
import { Play } from "@/components/animate-ui/icons/play"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { useInstallationNav, usePhasageNav } from "@/hooks/useNavigationNav"
import { useStepper } from "@/contexts/StepperContext"
import { installationViews, frameCount } from "@/data/phases"

function VisionCone({ rotate, bottom, left, active }: { rotate: string, bottom: string, left: string, active: boolean }) {
    return (
        <div
            className={`absolute pointer-events-none transition-transform duration-100 ${active ? "opacity-100" : "opacity-0"}`}
            style={{ bottom, left, transform: rotate ? rotate.replace("rotate-[", "rotate(").replace("deg]", "deg)") : "rotate(0deg)" }}
        >
            <svg viewBox="0 0 24 24" version="1.1" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, width: "6vw", height: "6vw", minWidth: 20, minHeight: 20, maxWidth: 40, maxHeight: 40 }}>
                <defs>
                    <radialGradient id={`eye-gradient-${bottom}-${left}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.25512,0,0,11.0104,7.90496,11.9798)">
                        <stop offset="0" style={{ stopColor: "red", stopOpacity: 1 }} />
                        <stop offset="0.5" style={{ stopColor: "red", stopOpacity: 1 }} />
                        <stop offset="1" style={{ stopColor: "red", stopOpacity: 0 }} />
                    </radialGradient>
                </defs>
                <g transform="matrix(1.29721,0,0,1.29721,-6.72275,-3.56655)">
                    <g transform="matrix(1.54147,0,0,1.54147,-3.79129,-6.46645)">
                        <path d="M7.905,12.002C7.905,12.002 12.939,6.394 13.017,6.48L13.022,6.475L13.022,6.486C14.394,7.984 15.16,9.945 15.16,11.985C15.16,14.026 14.394,15.987 13.022,17.485L7.905,12.002Z" style={{ fill: `url(#eye-gradient-${bottom}-${left})` }} />
                    </g>
                    <path d="M9.226,12.626L16.431,19.831C16.542,19.942 16.605,20.093 16.605,20.25C16.605,20.407 16.542,20.558 16.431,20.669L16.419,20.681C16.308,20.792 16.157,20.855 16,20.855C15.843,20.855 15.692,20.792 15.581,20.681L7.319,12.419C7.208,12.308 7.145,12.157 7.145,12C7.145,11.843 7.208,11.692 7.319,11.581L15.581,3.319C15.692,3.208 15.843,3.145 16,3.145C16.157,3.145 16.308,3.208 16.419,3.319L16.431,3.331C16.542,3.442 16.605,3.593 16.605,3.75C16.605,3.907 16.542,4.058 16.431,4.169L9.176,11.424L20.144,11.424L18.574,9.854C18.462,9.743 18.4,9.592 18.4,9.435C18.4,9.278 18.462,9.127 18.574,9.016L18.586,9.004C18.697,8.893 18.847,8.83 19.005,8.83C19.162,8.83 19.312,8.893 19.424,9.004L22.047,11.627C22.278,11.859 22.278,12.234 22.047,12.465L19.439,15.073C19.328,15.184 19.177,15.247 19.02,15.247C18.863,15.247 18.712,15.184 18.601,15.073L18.589,15.061C18.358,14.83 18.358,14.454 18.589,14.223L20.186,12.626L9.226,12.626Z" style={{ fill: "red", stroke: "black", strokeWidth: "0.24px" }} />
                </g>
            </svg>
        </div>
    )
}

export function MassPlan() {
    const [display, setDisplay] = useState(true);
    const { mode, currentFrame } = useNavigationMode()
    const { installationIndex, goTo: goToInstallation } = useInstallationNav()
    const { currentPhase: phasagePhase } = usePhasageNav()
    const { currentPhase: planningPhase } = useStepper()
    const [imageError, setImageError] = useState(false)

    const [isZoomed, setIsZoomed] = useState(false);

    const isInstallation = mode === "installation"

    let phaseId = 0;
    if (mode === "phasage" && phasagePhase) {
        phaseId = phasagePhase.id - 1;
    } else if (mode === "planning" && planningPhase) {
        phaseId = planningPhase.id - 1;
    }

    const minimapSrc = isInstallation
        ? `${import.meta.env.BASE_URL}${installationViews[installationIndex].minimap}`
        : `${import.meta.env.BASE_URL}minimaps/phase0${phaseId}.webp`

    useEffect(() => {
        setImageError(false)
    }, [minimapSrc])

    // Reset de l'état zoomé lors d'un changement de navigation ou phase
    useEffect(() => {
        setIsZoomed(false)
    }, [mode, phaseId, installationIndex])

    const containerRef = useRef<HTMLDivElement>(null)

    // Fermer le zoom au clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isZoomed && containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsZoomed(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isZoomed])

    // Calcul de la rotation en fonction de la frame (max frameCount frames = 360 deg)
    const rotationRatio = -(currentFrame / frameCount) * 360;
    const baseRotation = 270;
    const dynamicRotation = baseRotation + rotationRatio;

    const scaleX = 40; // Rayon horizontal de l'orbite en %
    const scaleY = 40; // Rayon vertical de l'orbite en %
    const centerX = 50; // Position X du centre de l'orbite en %
    const centerY = 50; // Position Y du centre de l'orbite en %

    const angleRad = (dynamicRotation - 180) * (Math.PI / 180);

    // Calcul de la position
    const orbitLeft = centerX + (scaleX * Math.cos(angleRad));
    const orbitTop = centerY + (scaleY * Math.sin(angleRad));
    return (
        <div ref={containerRef} className="relative w-fit select-none">
            <div
                className="absolute top-2 right-2 z-20 cursor-pointer shadow-2xl bg-white"
                title={display ? "Replier le plan de masse" : "Déplier le plan de masse"}
            >
                {display
                    ? <Play onClick={() => { setDisplay(false); setIsZoomed(false); }} fill="black" className="w-4 h-4 lg:w-6 lg:h-6 lg:rotate-90" />
                    : <Play onClick={() => setDisplay(true)} fill="black" className="w-4 h-4 lg:w-6 lg:h-6 rotate-180 lg:rotate-270" />
                }
            </div>

            {display && (
                <div
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`flex relative overflow-hidden border border-white shadow-2xl bg-black/10 transition-transform duration-300 origin-top-right ${isZoomed
                        ? "scale-[1.7] max-md:landscape:scale-[1.6] md:scale-[2.1] md:max-lg:landscape:scale-[2.0] lg:scale-[2.8] xl:scale-[2.8] cursor-zoom-out z-10"
                        : "scale-100 cursor-zoom-in z-0 w-full"
                        }`}
                >
                    <img
                        src={imageError ? `${import.meta.env.BASE_URL}minimaps/phase00.webp` : minimapSrc}
                        onError={() => setImageError(true)}
                        alt="Mass Plan"
                        className="w-full h-auto shadow-lg object-cover pointer-events-none"
                    />

                    {isInstallation ? (
                        <>
                            {(() => {
                                const activeView = installationViews[installationIndex]
                                if (!activeView || !activeView.conePosition) return null
                                return (
                                    <>
                                        <VisionCone
                                            bottom={activeView.conePosition.bottom || ""}
                                            left={activeView.conePosition.left || ""}
                                            rotate={activeView.conePosition.rotate || ""}
                                            active={true}
                                        />
                                    </>
                                )
                            })()}
                        </>
                    ) : (
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                top: `${orbitTop}%`,
                                left: `${orbitLeft}%`,
                                transform: `translate(-50%, -50%) rotate(${dynamicRotation}deg)`
                            }}
                        >
                            <svg viewBox="0 0 24 24" version="1.1" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, width: "6vw", height: "6vw", minWidth: 20, minHeight: 20, maxWidth: 45, maxHeight: 45 }}>
                                <defs>
                                    <radialGradient id="eye-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.25512,0,0,11.0104,7.90496,11.9798)">
                                        <stop offset="0" style={{ stopColor: "red", stopOpacity: 1 }} />
                                        <stop offset="0.5" style={{ stopColor: "red", stopOpacity: 1 }} />
                                        <stop offset="1" style={{ stopColor: "red", stopOpacity: 0 }} />
                                    </radialGradient>
                                </defs>
                                <g transform="matrix(1.29721,0,0,1.29721,-6.72275,-3.56655)">
                                    <g transform="matrix(1.54147,0,0,1.54147,-3.79129,-6.46645)">
                                        <path d="M7.905,12.002C7.905,12.002 12.939,6.394 13.017,6.48L13.022,6.475L13.022,6.486C14.394,7.984 15.16,9.945 15.16,11.985C15.16,14.026 14.394,15.987 13.022,17.485L7.905,12.002Z" style={{ fill: "url(#eye-gradient)" }} />
                                    </g>
                                    <path d="M9.226,12.626L16.431,19.831C16.542,19.942 16.605,20.093 16.605,20.25C16.605,20.407 16.542,20.558 16.431,20.669L16.419,20.681C16.308,20.792 16.157,20.855 16,20.855C15.843,20.855 15.692,20.792 15.581,20.681L7.319,12.419C7.208,12.308 7.145,12.157 7.145,12C7.145,11.843 7.208,11.692 7.319,11.581L15.581,3.319C15.692,3.208 15.843,3.145 16,3.145C16.157,3.145 16.308,3.208 16.419,3.319L16.431,3.331C16.542,3.442 16.605,3.593 16.605,3.75C16.605,3.907 16.542,4.058 16.431,4.169L9.176,11.424L20.144,11.424L18.574,9.854C18.462,9.743 18.4,9.592 18.4,9.435C18.4,9.278 18.462,9.127 18.574,9.016L18.586,9.004C18.697,8.893 18.847,8.83 19.005,8.83C19.162,8.83 19.312,8.893 19.424,9.004L22.047,11.627C22.278,11.859 22.278,12.234 22.047,12.465L19.439,15.073C19.328,15.184 19.177,15.247 19.02,15.247C18.863,15.247 18.712,15.184 18.601,15.073L18.589,15.061C18.358,14.83 18.358,14.454 18.589,14.223L20.186,12.626L9.226,12.626Z" style={{ fill: "red", stroke: "black", strokeWidth: "0.24px" }} />
                                </g>
                            </svg>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
