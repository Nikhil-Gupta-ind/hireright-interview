import { Route, Routes, Navigate } from 'react-router';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { useSessionContext } from '../context/SessionContext';
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import Feedback from '../features/feedback/Feedback';
import NotFound from '../features/common/pages/NotFound';
import '@livekit/components-styles';

const AppRoutes = () => {
  const {
    sessionData,
    selectedDevices,
  } = useSessionContext();

  return (
    <Routes>
      <Route path='/interview/:sessionCode' element={
        <Welcome />}
      />

      <Route path='/companion' element={
        sessionData ? (
          <CompanionSelection />
        ) : <Navigate to="/" replace />
      }
      />

      <Route path='/setup' element={
        sessionData ? (
          <DeviceSetup />
        ) : <Navigate to="/" replace />
      }
      />

      <Route path='/interview' element={
        <LiveKitRoom
            token={sessionData?.connection?.token}
            serverUrl={sessionData?.connection?.serverUrl}
            connect={true}
            audio={{ deviceId: selectedDevices.mic?.deviceId }}
            video={{ deviceId: selectedDevices.camera?.deviceId }}
          >
            <Interview />
            <RoomAudioRenderer />
          </LiveKitRoom>
      }
      />

      <Route path='/feedback' element={<Feedback />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes