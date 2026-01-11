import { useEffect, useRef, useState } from "react";
import PlayIcon from "../../../assets/icons/icon-play.svg?react";
import StopIcon from "../../../assets/icons/icon-stop.svg?react";

const BAR_WIDTH = 12;
const BAR_GAP = 4;

const AudioTest = ({ onTestClick, className = "" }) => {
  const barsRef = useRef(null);
  const [barCount, setBarCount] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [volume, setVolume] = useState(0);

  const [hasTestedOnce, setHasTestedOnce] = useState(false);

  useEffect(() => {
    const updateBars = () => {
      if (!barsRef.current) return;
      const width = barsRef.current.offsetWidth;
      setBarCount(Math.floor(width / (BAR_WIDTH + BAR_GAP)));
    };

    updateBars();

    const observer = new ResizeObserver(updateBars);
    observer.observe(barsRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isTesting) {
      setVolume(0);
      return;
    }

    const interval = setInterval(() => {
      setVolume(Math.floor(Math.random() * (barCount + 1)));
    }, 100);

    return () => clearInterval(interval);
  }, [isTesting, barCount]);

  const handleTestClick = () => {
    setIsTesting(!isTesting);
    setHasTestedOnce(true);
    if (onTestClick) onTestClick();
  };

  // TODO: Need pause icon
  return (
    <div className={`flex flex-row gap-3 ${className}`}>

      {/* Test Button */}
      <button
        onClick={handleTestClick}
        className="flex gap-2.5 py-4 pl-4.5 pr-6 bg-[#E0E1F9] border border-[#3637A9] rounded-tl-[56px] rounded-bl-[56px] rounded-tr-[18px] rounded-br-[18px] items-center hover:brightness-95 shrink-0 min-w-28"
      >
        { isTesting ? <StopIcon /> : <PlayIcon />}
        <span className="text-[#3637A9] font-hanken text-[16px] font-medium leading-[22.4px]">
          {isTesting ? 'Stop' : 'Test'}
        </span>
      </button>

      {/* Bars + Status */}
      <div className="flex items-center bg-[#F8F2ED5C] rounded-2xl border border-[#58240E33] px-4 py-4 flex-1 min-w-0">

        {/* Audio Bars */}
        <div ref={barsRef} className="flex gap-1 flex-1">
          {Array.from({ length: barCount }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-8 rounded-sm ${
                i < volume ? "bg-[#6466EA]" : "bg-[#6466EA33]"
              }`}
            />
          ))}
        </div>

        {/* Status */}
        <div className="flex gap-2 ml-4 shrink-0">
          <span
            className={`w-5 h-5 rounded-full ${
              hasTestedOnce ? "bg-[#17A012]" : "bg-[#9CA3AF]" // gray-400
            }`}
          />
          <span className="font-hanken text-[16px] font-medium leading-[22.4px]">
            {hasTestedOnce ? "Perfect" : "Status"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;


// const AudioTest = ({ onTestClick, className = ''}) => {
//   return (
//     <div className={`flex gap-3 ${className}`}>

//       <button 
//         onClick={() => {onTestClick()}} 
//         className="flex gap-2.5 py-4 pl-4.5 pr-6 bg-[#E0E1F9] border border-[#3637A9] rounded-tl-[56px] rounded-bl-[56px] rounded-tr-[18px] rounded-br-[18px] items-center hover:brightness-95"
//         >
//         <PlayIcon />
//         <span className="text-[#3637A9] font-hanken text-[16px] font-weight-medium leading-[22.4px]">Test</span>
//       </button>

//       <div className="flex items-center justify-between bg-[#F8F2ED5C] rounded-2xl border border-[#58240E33] px-6 py-4 flex-1">

//         {/* Audio Bars */}
//         <div className="flex gap-1">
//           {Array.from({ length: 19 }).map((_, i) => (
//             <div
//               key={i}
//               className={`
//                 w-3 h-8 rounded-sm ${
//                   i < 6 ? "bg-[#6466EA]" : "bg-[#6466EA33]"
//                 }
//               `}
//             />
//           ))}
//         </div>

//         <div className="flex gap-2">
//           <span className="w-5 h-5 bg-[#17A012] rounded-full"></span>
//           <span className="font-hanken text-[16px] font-weight-medium leading-[22.4px]">
//             Perfect
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AudioTest