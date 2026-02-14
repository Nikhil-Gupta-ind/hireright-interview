import { Route, Routes, Navigate, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { useSessionContext } from '../context/SessionContext';
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import TimeoutScreen from '../features/interview/pages/TimeoutScreen';
import GuidelinesScreen from '../features/onboard/pages/GuidelinesScreen';
import Feedback from '../features/feedback/Feedback';
import NotFound from '../features/common/pages/NotFound';
import '@livekit/components-styles';

const NavigateBack = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return null;
};

let isInitialLoad = true;

const InterviewGuard = ({ children }) => {
  if (isInitialLoad) {
    return <NavigateBack />;
  }
  return children;
};

const AppRoutes = () => {
  const {
    sessionData,
    selectedDevices,
  } = useSessionContext();

  useEffect(() => {
    isInitialLoad = false;
  }, []);

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
        <InterviewGuard>
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
        </InterviewGuard>
      }
      />

      <Route path='/timeout' element={<TimeoutScreen />} />
      <Route path='/guidelines' element={<GuidelinesScreen />} />
      <Route path='/feedback' element={<Feedback />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes