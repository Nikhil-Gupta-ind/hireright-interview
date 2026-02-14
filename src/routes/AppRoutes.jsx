import { Route, Routes, Navigate, useNavigate } from 'react-router';
import { useEffect, lazy, Suspense } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { useSessionContext } from '../context/SessionContext';
import DotsFlashing from '../features/onboard/components/DotsFlashing';
import '@livekit/components-styles';

// Lazy load page components
const Welcome = lazy(() => import('../features/onboard/pages/Welcome'));
const CompanionSelection = lazy(() => import('../features/onboard/pages/CompanionSelection'));
const DeviceSetup = lazy(() => import('../features/onboard/pages/DeviceSetup'));
const Interview = lazy(() => import('../features/interview/pages/Interview'));
const TimeoutScreen = lazy(() => import('../features/interview/pages/TimeoutScreen'));
const GuidelinesScreen = lazy(() => import('../features/onboard/pages/GuidelinesScreen'));
const Feedback = lazy(() => import('../features/feedback/Feedback'));
const NotFound = lazy(() => import('../features/common/pages/NotFound'));

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
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-(--color-bg)">
        <DotsFlashing dotColor="var(--color-primary)" />
      </div>
    }>
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
    </Suspense>
  )
}

export default AppRoutes