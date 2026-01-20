import { motion } from "framer-motion"
import sample from '../../../assets/sample-video-call.png'
import { VideoTrack, useTracks, useLocalParticipant, useTranscriptions } from "@livekit/components-react";
import { Track } from "livekit-client";
import ClockIcon from '../../../assets/icons/icon-clock.svg?react'
import KeyboardIcon from '../../../assets/icons/icon-keyboard.svg?react'
import AddIcon from '../../../assets/icons/icon-add.svg?react'
import fcamBlur from '../../../assets/fcam-blur.svg'
import fcamBlur2 from '../../../assets/fcam-blur2.svg'
import { useEffect, useState, useMemo, useRef } from "react"

const InterviewRight = ({ duration, quesNum, showAnswerCard, showBlurBg, onImageClick }) => {

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
    ],
    { onlySubscribed: false }
  );

  const { localParticipant } = useLocalParticipant();
  const transcriptionOptions = useMemo(() => ({
    participantIdentities: localParticipant?.identity ? [localParticipant.identity] : []
  }), [localParticipant?.identity]);
  const segments = useTranscriptions(transcriptionOptions);

  const transcriptRef = useRef(null);


  // Filter segments to only show those from the current question
  const [startIndex, setStartIndex] = useState(0);
  
  useEffect(() => {
    // When question number changes, update the start index to the current length
    if (segments) {
      setStartIndex(segments.length);
    }
  }, [quesNum]); // Dependency on quesNum ensures reset on new question

  const visibleSegments = segments ? segments.slice(startIndex) : [];

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visibleSegments]); // dependence on visibleSegments

  const localCameraTrackRef = tracks.find((track) => track.participant.isLocal);

  const [timeLeft, setTimeLeft] = useState(duration * 60)

  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div
      className={`flex flex-col h-full min-h-0
      ${showAnswerCard ? 'justify-start' : 'justify-center'}`}
    >

      {/* Card */}
      <motion.div
        layout
        // transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex flex-col w-full rounded-3xl bg-[#FAFAFA] shadow
        ${showAnswerCard ? 'flex-1 min-h-0 overflow-hidden' : 'h-auto'}`}
      >

        {/* Answer Content */}
        {showAnswerCard && (
          <motion.div
            layout
            className="flex flex-col flex-1 min-h-0 p-6"
          >
            <div className='flex items-center justify-between'>
              <span className='font-hanken font-bold text-[16px] leading-6 text-[#0C0C0ECC]'>
                YOUR ANSWER
              </span>
              <button className='flex items-center justify-center gap-2 px-6 p-4 bg-[#FAFAFA] rounded-2xl shadow min-w-[122px] tabular-nums'>
                <ClockIcon /> {formatTime(timeLeft)}
              </button>
            </div>

            <span 
              ref={transcriptRef}
              className="flex-1 min-h-0 max-w-112.75 font-hanken font-medium text-[18px] text-[#393939] leading-7 pt-7.5 pb-10 my-2 overflow-y-auto whitespace-pre-line"
            >
              {visibleSegments.map(s => s.text).join(' ') || 'Start speaking...'}
            </span>

            <div className='flex gap-3 justify-end'>
              <button className='py-4 px-3 bg-(--color-primary) rounded-2xl'>
                <KeyboardIcon />
              </button>
              <button className='px-3 py-4 rounded-2xl'>
                <AddIcon />
              </button>
            </div>
          </motion.div>
        )}

        {/* Camera Preview */}
        <motion.div layout className="relative w-full select-none">
          {showBlurBg && (
            <motion.img
              src={showAnswerCard ? fcamBlur2 : fcamBlur}
              alt=""
              aria-hidden
              initial={false}
              animate={{
                y: showAnswerCard ? -24 : 24,
                opacity: showAnswerCard ? 1 : 0.85
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut"
              }}
              className="
                absolute inset-0 object-cover rounded-3xl
                pointer-events-none
              "
            />
          )}

          <div className='h-96.5 w-full rounded-3xl overflow-hidden relative z-10 cursor-pointer'>
            {localCameraTrackRef ? (
              <VideoTrack
                trackRef={localCameraTrackRef}
                // style={{ aspectRatio: '515/386' }}
                style={{ aspectRatio: '515/386', transform: 'scale(-1, 1)' }} // Mirror local video
                className='w-full h-full object-cover'
                onClick={onImageClick}
              />
            ) : (
              <div
                className='w-full h-full bg-black cursor-pointer'
                style={{ aspectRatio: '515/386' }}
                onClick={onImageClick}
              />
            )}
          </div>

          {/* <img
            src={sample}
            style={{ aspectRatio: '515/386' }}
            alt="video preview"
            className='relative z-10 w-full h-full object-cover cursor-pointer'
            onClick={onImageClick}
          /> */}

          {/* {showBlurBg && (
            <div className="z-10 rounded-3xl absolute inset-0 flex items-center justify-center bg-[#00000035] text-white text-lg font-semibold pointer-events-none">
              Click for next state
            </div>
          )} */}
        </motion.div>

      </motion.div>
    </div>
  )
}

export default InterviewRight