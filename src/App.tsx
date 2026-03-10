import './App.css'
import { PhaseTimeline } from "@/components/PhaseTimeline"
import { StepperProvider } from "@/contexts/StepperContext"
import { NavigationModeProvider } from "@/contexts/NavigationModeContext"
import { PhaseBackground } from "@/components/PhaseBackground"
import { RightContainer } from "@/components/RightContainer"
import { MenuContainer } from "@/components/MenuContainer"
import { Credits } from "@/components/Credits"
import { PortraitBlocker } from "@/components/PortraitBlocker"

function App() {
  return (
    <NavigationModeProvider>
      <StepperProvider>
        <PortraitBlocker />
        <RightContainer />
        <MenuContainer />
        <PhaseBackground />
        <PhaseTimeline />
        <Credits />
      </StepperProvider>
    </NavigationModeProvider>
  )
}

export default App