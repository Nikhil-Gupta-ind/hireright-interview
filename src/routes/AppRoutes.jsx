import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router'
import Welcome from '../features/onboard/pages/Welcome';
import CompanionSelection from '../features/onboard/pages/CompanionSelection';
import DeviceSetup from '../features/onboard/pages/DeviceSetup';
import Interview from '../features/interview/pages/Interview';
import Feedback from '../features/feedback/Feedback';

const AppRoutes = () => {

    const navigate = useNavigate()

  return (
    <Routes>
      <Route path='/' element={
        <Welcome
          title='Product Design' 
          onClick={() => {navigate('/companion')}}
        />}
      />
      <Route path='/companion' element={
        <CompanionSelection 
          onSelect={()=> { navigate('/setup') }}
        />}
      />
      <Route path='/setup' element={
        <DeviceSetup
          onBack={() => navigate(-1)}
          onStartInterview={() => 
            navigate('/interview')
          }
        />}
      />
      <Route path='/interview' element={
        <Interview 
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