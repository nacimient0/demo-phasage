import { phases, installationViews } from "@/data/phases"
import { useNavigationMode } from "@/contexts/NavigationModeContext"

export function usePhasageNav() {
    const { phaseIndex, setPhaseIndex } = useNavigationMode()
    
    return {
        phaseIndex,
        currentPhase: phases[phaseIndex],
        canPrev: phaseIndex > 0,
        canNext: phaseIndex < phases.length - 1,
        prev: () => setPhaseIndex(Math.max(0, phaseIndex - 1)),
        next: () => setPhaseIndex(Math.min(phases.length - 1, phaseIndex + 1)),
        goTo: (i: number) => setPhaseIndex(i),
        totalPhases: phases.length,
    }
}

export function useInstallationNav() {
    const { installationIndex, setInstallationIndex } = useNavigationMode()
    return {
        installationIndex,
        canPrev: installationIndex > 0,
        canNext: installationIndex < installationViews.length - 1,
        prev: () => setInstallationIndex(Math.max(0, installationIndex - 1)),
        next: () => setInstallationIndex(Math.min(installationViews.length - 1, installationIndex + 1)),
        goTo: (i: number) => setInstallationIndex(i),
        total: installationViews.length,
    }
}
