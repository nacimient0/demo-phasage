import './App.css';
import { PhaseTimeline } from "@/components/PhaseTimeline";
import { StepperProvider } from "@/contexts/StepperContext";
import { NavigationModeProvider } from "@/contexts/NavigationModeContext";
import { PhaseBackground } from "@/components/PhaseBackground";
import { RightContainer } from "@/components/RightContainer";
import { MenuContainer } from "@/components/MenuContainer";
import { Credits } from "@/components/Credits";
import { PortraitBlocker } from "@/components/PortraitBlocker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PreloaderProvider } from "./contexts/PreloaderContext";

function AppContent() {
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
  );
}

function App() {
  return (
    <PreloaderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/haropa" element={<AppContent />} />
        </Routes>
      </Router>
    </PreloaderProvider>
  );
}

export default App;
