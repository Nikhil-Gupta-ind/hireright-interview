import { useNavigate } from 'react-router';
import { useSessionContext } from '../../../context/SessionContext';
import Avatar from '../components/Avatar';
import ArrowForwardIcon from '../../../assets/icons/icon-arrow-forward.svg?react';
import HRGradient from '../components/gradient';

const TimeoutScreen = () => {
  const navigate = useNavigate();
  const { selectedCompanion } = useSessionContext();

  return (
    <div className="bg-[#fefefe] relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-hanken">
      <HRGradient />

      {/* Content Container */}
      <div className="flex flex-col items-center gap-6 max-w-[632px] text-center px-4 relative z-10">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-[#D5621B66] flex items-center justify-center overflow-hidden">
          <Avatar 
            companion={selectedCompanion} 
            size="128px" 
            className="w-full h-full"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[#58240e] text-[32px] font-dm-serif italic leading-[1.28] tracking-[-0.15px]">
            Time Limit Reached
          </h1>
          <div className="text-[rgba(12,12,14,0.8)] text-xl leading-[1.4] tracking-[-0.2px]">
            <p>The allotted time for this interview session has ended.</p>
            <p>
              Don't worry—your responses have been successfully saved. All answers provided up to this point have been submitted to the hiring team and are currently under review.
            </p>
          </div>
        </div>

        {/* Finish Interview */}
        <button
          onClick={() => navigate('/feedback', { replace: true })}
          className="group mt-4 bg-[#1d1b20] text-white flex items-center gap-3 px-6 py-4 rounded-[18px] hover:bg-opacity-90 transition-all font-semibold text-base tracking-[-0.2px]"
        >
          Finish Interview
          <ArrowForwardIcon className="w-5 h-5 fill-white transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default TimeoutScreen;
