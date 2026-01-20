import { Route, Routes, useNavigate, Navigate } from 'react-router';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import Feedback from '../features/feedback/Feedback';
import NotFound from '../features/common/pages/NotFound';
import '@livekit/components-styles';

const AppRoutes = ({
  sessionData,
  setSessionData,
  selectedCompanion,
  setSelectedCompanion,
  selectedDevices,
  setSelectedDevices
}) => {

  const navigate = useNavigate()

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
        sessionData ? (
          <CompanionSelection
            agents={sessionData?.availableAgents || []}
            onSelect={(agent) => {
              setSelectedCompanion(agent);
              navigate('/setup');
            }}
          />
        ) : <Navigate to="/" replace />
      }
      />

      <Route path='/setup' element={
        sessionData ? (
          <DeviceSetup
            sessionCode={sessionData?.sessionCode}
            selectedCompanion={selectedCompanion}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            onBack={() => navigate(-1)}
            onStartInterview={() =>
              navigate('/interview')
            }
          />
        ) : <Navigate to="/" replace />
      }
      />

      <Route path='/interview' element={
        sessionData?.connection ? (
          <LiveKitRoom
            token={sessionData?.connection?.token}
            serverUrl={sessionData?.connection?.serverUrl}
            connect={true}
            audio={{ deviceId: selectedDevices.mic?.deviceId }}
            video={{ deviceId: selectedDevices.camera?.deviceId }}
          >
            <Interview
              sessionCode={sessionData?.sessionCode}
              selectedDevices={selectedDevices}
              sessionData={sessionData}
              selectedCompanion={selectedCompanion}
              onInterviewEnd={() => {
                // setSessionData(null); FIXME: is this needed? on navigating to feedback it goes to 404 check
                navigate("/feedback", { replace: true });
              }}
            />
            <RoomAudioRenderer />
          </LiveKitRoom>
        ) : (
          <Navigate to="/" replace />
        )
      }
      />

      <Route path='/feedback' element={<Feedback />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes