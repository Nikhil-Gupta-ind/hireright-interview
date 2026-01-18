import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import Feedback from '../features/feedback/Feedback';
import MicIcon from '../assets/icons/icon-mic.svg?react'
import CameraIcon from '../assets/icons/icon-camera.svg?react'
import SpeakerIcon from '../assets/icons/icon-speaker.svg?react'
import NotFound from '../features/common/pages/NotFound';

const AppRoutes = ({ sessionData, setSessionData, setSelectedCompanion, selectedCompanion }) => {

  const navigate = useNavigate()

  const [selectedDevices, setSelectedDevices] = useState({
    mic: { icon: <MicIcon />, label: 'Default Microphone' },
    speaker: { icon: <SpeakerIcon />, label: 'Default Speakers' },
    camera: { icon: <CameraIcon />, label: 'Default Camera' },
  });

  return (
    <Routes>
      <Route path='/interview/:sessionCode' element={
        <Welcome
          title={sessionData?.title}
          setSessionData={setSessionData}
          onClick={() => { navigate('/companion') }}
        />}
      />

      <Route path='/companion' element={
        <CompanionSelection
          agents={sessionData?.availableAgents || []}
          onSelect={(agent) => {
            setSelectedCompanion(agent);
            navigate('/setup');
          }}
        />}
      />
      <Route path='/setup' element={
        <DeviceSetup
          sessionCode={sessionData?.sessionCode}
          selectedCompanion={selectedCompanion}
          selectedDevices={selectedDevices}
          setSelectedDevices={setSelectedDevices}
          onBack={() => navigate(-1)}
          onStartInterview={() =>
            navigate('/interview')
          }
        />}
      />
      <Route path='/interview' element={
        <Interview
          sessionCode={sessionData?.sessionCode}
          onInterviewEnd={() =>
            navigate("/feedback")
          }
        />}
      />
      <Route path='/feedback' element={<Feedback />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes