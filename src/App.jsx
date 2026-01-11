// import './App.css'
import AppRoutes from './routes/AppRoutes';

import { useState } from 'react';

function App() {
  const [sessionData, setSessionData] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);

  // TODO:
  // API
  // LiveKit
  // prevent back and mantain livekit session
  // save selected companion and session info
  // responsivness
  return (
    <AppRoutes
      sessionData={sessionData}
      setSessionData={setSessionData}
      selectedCompanion={selectedCompanion}
      setSelectedCompanion={setSelectedCompanion}
    />
  );
}

export default App