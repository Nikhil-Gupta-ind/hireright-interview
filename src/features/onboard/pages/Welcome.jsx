import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSessionContext } from '../../../context/SessionContext';
import logo from '../../../assets/logo.svg'
import ArrowIcon from '../../../assets/icons/icon-arrow-forward.svg?react'
import { fetchSessionDetails } from '../../../core/services/session';
import DotsFlashing from '../components/DotsFlashing';

const Welcome = () => {
  const { sessionCode } = useParams();
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useSessionContext();
  const [loading, setLoading] = useState(!!sessionCode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const data = await fetchSessionDetails(sessionCode);
        setSessionData({ ...data, sessionCode }); // Merge sessionCode into sessionData
        setLoading(false);
      } catch (err) {
        console.error("Failed to load session", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (sessionCode) {
      loadSession();
    }
  }, [sessionCode, setSessionData]);

  if (loading) {
    return (
      <div className='h-screen w-full bg-[#F8F2ED] flex flex-col items-center justify-center'>
        <DotsFlashing dotColor="#D5621B" />
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-screen w-full bg-[#F8F2ED] flex flex-col items-center justify-center text-[#58240E]'>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Session</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='h-screen w-full bg-[#F8F2ED] flex flex-col items-center justify-center gap-11'>
      <img src={logo} alt="hireright" />
      <p className='text-[rgb(88,36,14)] font-hanken text-[48px] font-light leading-[57.6px] tracking-[-1px] text-center'>
        Welcomes you to your
        <br />
        <span className="heading-serif">
          {sessionData?.title || 'Interview'}
        </span> Interview
      </p>
      <button onClick={() => navigate('/companion')} className="px-3 py-4 rounded-full border border-[#D5621B] flex items-center justify-center text-[#D5621B] hover:bg-[#D5621B] hover:text-white transition">
        <ArrowIcon />
      </button>
    </div>
  )
}

export default Welcome