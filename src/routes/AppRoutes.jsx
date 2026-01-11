import { Route, Routes, useNavigate } from 'react-router';
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import Feedback from '../features/feedback/Feedback';

const AppRoutes = ({ sessionData, setSessionData, setSelectedCompanion, selectedCompanion }) => {

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
    </Routes>
  )
}

export default AppRoutes