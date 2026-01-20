import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import MicIcon from './assets/icons/icon-mic.svg?react'
import CameraIcon from './assets/icons/icon-camera.svg?react'
import SpeakerIcon from './assets/icons/icon-speaker.svg?react'

function App() {

  // Initialize state from sessionStorage if available
  const [sessionData, setSessionData] = useState(() => {
    const saved = sessionStorage.getItem('sessionData');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedCompanion, setSelectedCompanion] = useState(() => {
    const saved = sessionStorage.getItem('selectedCompanion');
    return saved ? JSON.parse(saved) : null;
  });
  // Sync state to sessionStorage whenever it changes
  useEffect(() => {
    if (sessionData) {
      sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
    } else {
      sessionStorage.removeItem('sessionData');
    }
  }, [sessionData]);

  useEffect(() => {
    if (selectedCompanion) {
      sessionStorage.setItem('selectedCompanion', JSON.stringify(selectedCompanion));
    } else {
      sessionStorage.removeItem('selectedCompanion');
    }
  }, [selectedCompanion]);

  // const [sessionData, setSessionData] = useState(null);
  // const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [selectedDevices, setSelectedDevices] = useState({
    mic: { icon: <MicIcon />, label: 'Default Microphone' },
    speaker: { icon: <SpeakerIcon />, label: 'Default Speakers' },
    camera: { icon: <CameraIcon />, label: 'Default Camera' },
  });

  return (
    <AppRoutes
      sessionData={sessionData}
      setSessionData={setSessionData}
      selectedCompanion={selectedCompanion}
      setSelectedCompanion={setSelectedCompanion}
      selectedDevices={selectedDevices}
      setSelectedDevices={setSelectedDevices}
    />
  );
}

export default App