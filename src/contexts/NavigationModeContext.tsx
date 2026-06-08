import { createContext, useContext, useState, type ReactNode } from "react"
import { installationViews } from "@/data/phases"

export type NavigationMode = "planning" | "phasage" | "installation"

export const INSTALLATION_COUNT = installationViews.length

export interface NavigationModeContextType {
    mode: NavigationMode
    setMode: (mode: NavigationMode) => void
    phaseIndex: number
    setPhaseIndex: (i: number) => void
    installationIndex: number
    setInstallationIndex: (i: number) => void
    timelineVisible: boolean
    setTimelineVisible: (v: boolean) => void
    currentFrame: number
    setCurrentFrame: (f: number) => void
}

export const NavigationModeContext = createContext<NavigationModeContextType | null>(null)

export function NavigationModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<NavigationMode>(
        () => (localStorage.getItem("projectMode") as NavigationMode) ?? "installation"
    )
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [installationIndex, setInstallationIndex] = useState(0)
    const [timelineVisible, setTimelineVisible] = useState(true)
    const [currentFrame, setCurrentFrame] = useState(0)

    const handleSetMode = (newMode: NavigationMode) => {
        localStorage.setItem("projectMode", newMode)
        setMode(newMode)
        setPhaseIndex(0)
        setInstallationIndex(0)
    }

    return (
        <NavigationModeContext.Provider value={{
            mode,
            setMode: handleSetMode,
            phaseIndex,
            setPhaseIndex,
            installationIndex,
            setInstallationIndex,
            timelineVisible,
            setTimelineVisible,
            currentFrame,
            setCurrentFrame,
        }}>
            {children}
        </NavigationModeContext.Provider>
    )
}

export function useNavigationMode() {
    const context = useContext(NavigationModeContext)
    if (!context) throw new Error("useNavigationMode must be used within NavigationModeProvider")
    return context
}

