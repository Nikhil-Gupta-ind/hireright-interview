import { useEffect, useRef, useState } from "react";
import { createAudioAnalyser } from "livekit-client";
import PlayIcon from "../../../assets/icons/icon-play.svg?react";
import StopIcon from "../../../assets/icons/icon-stop.svg?react";

const BAR_WIDTH = 12;
const BAR_GAP = 4;

const AudioTest = ({ track, trackVersion, speakerDeviceId, className = "" }) => {
  const barsRef = useRef(null);
  const [barCount, setBarCount] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [volume, setVolume] = useState(0); // 0 to barCount
  const [status, setStatus] = useState("Status"); // Status | Perfect | Low

  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const testOscillatorRef = useRef(null);
  // We'll track max volume seen to determine status
  const maxVolRef = useRef(0);

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

  // Mic Visualization Effect
  useEffect(() => {
    // Only visualize if testing and track is available
    if (!isTesting || !track || !track.mediaStreamTrack) {
      setVolume(0);
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const source = ctx.createMediaStreamSource(new MediaStream([track.mediaStreamTrack]));
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 32;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    let rafId;
    const updateMeter = () => {
      analyser.getByteFrequencyData(dataArray);
      let values = 0;
      const length = dataArray.length;
      for (let i = 0; i < length; i++) {
        values += dataArray[i];
      }
      const average = values / length;

      const normalized = Math.min(barCount, Math.floor((average / 100) * barCount));
      setVolume(normalized);

      // Status logic: Perfect if > 50, else Low (if detecting input)
      if (average > 50) {
        setStatus("Perfect");
      } else if (average > 10) { // Using 10 as noise floor to show 'Low' instead of 'Status'
        setStatus("Low");
      }

      rafId = requestAnimationFrame(updateMeter);
    };

    updateMeter();

    return () => {
      cancelAnimationFrame(rafId);
      source.disconnect();
      analyser.disconnect();
      ctx.close();
    };
  }, [isTesting, trackVersion, barCount]);

  // Toggle Handler
  const handleTestClick = () => {
    setIsTesting(!isTesting);
    if (!isTesting) {
      // Reset status when starting new test? 
      // Or keep previous? User said "I can't see other status".
      // Let's reset to "Status" (or "Listening...") so they see it change to Perfect.
      setStatus("Status");
    }
  };

  return (
    <div className={`flex flex-row gap-3 ${className}`}>

      {/* Test Button */}
      <button
        onClick={handleTestClick}
        className="flex gap-2.5 py-4 pl-4.5 pr-6 bg-[#E0E1F9] border border-[#3637A9] rounded-tl-[56px] rounded-bl-[56px] rounded-tr-[18px] rounded-br-[18px] items-center hover:brightness-95 shrink-0 min-w-28"
      >
        {isTesting ? <StopIcon /> : <PlayIcon />}
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
              className={`w-3 h-8 rounded-sm ${i < volume ? "bg-[#6466EA]" : "bg-[#6466EA33]"}`}
            />
          ))}
        </div>

        {/* Status */}
        <div className="flex gap-2 ml-4 shrink-0">
          <span
            className={`w-5 h-5 rounded-full ${status === "Perfect" ? "bg-[#17A012]" : "bg-[#9CA3AF]"}`} // gray-400
          />
          <span className="font-hanken text-[16px] font-medium leading-[22.4px]">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;