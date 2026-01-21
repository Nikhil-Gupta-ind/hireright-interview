import { useRemoteParticipants, useTranscriptions } from "@livekit/components-react";
import { useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"

const QuestionState = ({ isListening, currentQuestion, className = '' }) => {
  const remoteParticipants = useRemoteParticipants();
  const agentParticipant = remoteParticipants[0];
  const transcriptionOptions = useMemo(() => ({
    participantIdentities: agentParticipant ? [agentParticipant.identity] : []
  }), [agentParticipant]);
  const segments = useTranscriptions(transcriptionOptions);

  const transcriptRef = useRef(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [segments]);

  return (
    <div className={`${className}`}>
      {/* Centered interview block */}
      <div className="flex flex-col w-full max-h-full py-15">

        {/* Answer / Live transcription (scrollable) */}
        {isListening && (
          <div ref={transcriptRef} className="flex-1 min-h-0 overflow-y-auto">
            <span className="block font-hanken text-[#393939CC] text-[20px] font-medium leading-7 whitespace-pre-line">
              {segments?.map(s => s.text).join(' ') || (isListening ? '...' : '')}
            </span>
          </div>
        )}

        {/* Anchored question */}
        <div className="mt-8 shrink-0">
          <span className="block font-hanken font-bold text-[16px] text-[#0C0C0E7A] leading-6">
            CURRENT QUESTION
          </span>

          {/* Question text with line clamp */}
          <span className="block font-hanken text-black text-[32px] leading-[40.96px] mt-5.5 line-clamp-3">
            {currentQuestion}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionState