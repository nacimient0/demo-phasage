import { createContext, useContext, useState, type ReactNode } from "react"

export type NavigationMode = "planning" | "phasage" | "installation"

interface NavigationModeContextType {
    mode: NavigationMode
    setMode: (mode: NavigationMode) => void
}

const NavigationModeContext = createContext<NavigationModeContextType | null>(null)

export function NavigationModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<NavigationMode>("planning")

    return (
        <NavigationModeContext.Provider value={{ mode, setMode }}>
            {children}
        </NavigationModeContext.Provider>
    )
}

export function useNavigationMode() {
    const context = useContext(NavigationModeContext)
    if (!context) {
        throw new Error("useNavigationMode must be used within NavigationModeProvider")
    }
    return context
}
