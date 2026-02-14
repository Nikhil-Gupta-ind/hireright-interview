import { useState } from 'react';
import { useNavigate } from 'react-router';
import ArrowForwardIcon from '../../../assets/icons/icon-arrow-forward.svg?react';
import HRGradient from '../../interview/components/gradient';

const GuidelinesScreen = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const guidelines = [
    {
      id: 1,
      title: "Photo Requirements :",
      text: "To verify your identity, please ensure:",
      bullets: [
        "Your face is centered and well-lit.",
        "No hats, masks, or face coverings.",
        "You are looking directly at the camera."
      ]
    },
    {
      id: 2,
      title: "Anti-Cheating Protocol :",
      text: "The entire session is recorded. Ensure to maintain the integrity of the process"
    },
    {
      id: 3,
      title: "Disconnection Rule :",
      text: "If you lose internet connection, you have 1 minute to rejoin and continue. Beyond this time, the interview is marked incomplete."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8f2ed] flex flex-col items-center justify-center p-8 relative overflow-hidden font-hanken">
      <HRGradient />

      <div className="max-w-[682px] w-full flex flex-col gap-8 items-center z-10">
        <h1 className="text-[#58240e] text-[40px] font-dm-serif italic tracking-[-1px] text-center">
          Important Guidelines
        </h1>

        <div className="flex flex-col gap-5 text-[20px] text-[rgba(12,12,14,0.8)] tracking-[-0.2px] w-full">
          {guidelines.map((g) => (
            <div key={g.id} className="flex flex-col">
              <p>
                <span className="leading-normal">{g.id}. </span>
                <span className="font-bold leading-normal">{g.title}</span>
                <span className="leading-normal"> {g.text}</span>
              </p>
              {g.bullets && (
                <ul className="list-disc ml-8 mt-1 flex flex-col gap-1">
                  {g.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-normal">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 items-center w-full mt-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-[#d5621b] cursor-pointer"
            />
            <span className="text-black text-base tracking-[-1px] leading-tight">
              I have read and understood the interview guidelines.
            </span>
          </label>

          <button
            onClick={() => agreed && navigate('/companion')}
            disabled={!agreed}
            className={`group w-full max-w-[200px] flex items-center justify-center gap-3 h-[56px] rounded-[18px] transition-all font-semibold text-base tracking-[-0.2px]
              ${agreed ? 'bg-[#d5621b] text-white hover:bg-opacity-90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            <span>Next</span>
            <ArrowForwardIcon className={`w-5 h-5 transition-transform duration-300 ${agreed ? 'fill-white group-hover:translate-x-1' : 'fill-gray-500'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesScreen;
