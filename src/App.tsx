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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Connected from "./components/Connected";

import Login from "./pages/Login";

function AppContent({ showConnected = false }: { showConnected?: boolean }) {
  return (
    <NavigationModeProvider>
      <StepperProvider>
        <PortraitBlocker />
        <RightContainer />
        <MenuContainer />
        <PhaseBackground />
        <PhaseTimeline />
        <Credits />
        {showConnected && <Connected />}
      </StepperProvider>
    </NavigationModeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/eiffage" element={<AppContent />} />
          <Route path="/eiffage/secured" element={<ProtectedRoute><AppContent showConnected={true} /></ProtectedRoute>} />
          <Route path="/eiffage/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
