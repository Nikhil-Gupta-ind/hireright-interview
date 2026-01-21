import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParticipants, useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { useSessionContext } from "../../../context/SessionContext";
import InterviewBody from "../components/InterviewBody";
import InterviewFooter from "../components/InterviewFooter";
import HRGradient from "../components/gradient";
import { useInterviewState } from "../hooks/useInterviewState";
import { INTERVIEW_STATES } from "../constants/interviewStates";

const Interview = () => {
  const navigate = useNavigate();
  const { sessionData, selectedCompanion, setSessionData } = useSessionContext();
  const sessionCode = sessionData?.sessionCode;

  const onInterviewEnd = () => {
    setSessionData(null); // FIXME: is this needed? on navigating to feedback it goes to 404 check
    navigate("/feedback", { replace: true })
  };

  const {
    currentState,
    currentQuestion,
    currentMessage,
    questionIndex,
    totalQuestions
  } = useInterviewState();

  const { room, state: connectionState } = useRoomContext();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();

  const [questionOver, setQuestionOver] = useState(false) // all questions completed but interview is not ended

  useEffect(() => {
    if (currentState === INTERVIEW_STATES.ENDING) {
      setQuestionOver(true)
    }
  }, [currentState])

  useEffect(() => {
    console.log("Local Participant:", localParticipant);
  }, [localParticipant]);

  useEffect(() => {
    console.log("Participants:", participants);
    console.log("Total Participants:", participants.length);
    console.log("Remote Participants:", participants.filter(p => !p.isLocal));
  }, [participants]);

  useEffect(() => {
    if (connectionState === 'connected') {
      console.log("Connected to LiveKit Room. Room Info:", room);
      console.log("Local Mic Enabled:", localParticipant.isMicrophoneEnabled);
      console.log("Local Audio Tracks:", localParticipant.audioTrackPublications);
    }
  }, [connectionState, localParticipant, room]);

  // useEffect(() => {
  //   if (isEnding) {
  //     console.log("[Interview] State is ending, navigating...");
  //     onInterviewEnd();
  //   }
  // }, [isEnding]);

  useEffect(() => {
    console.log("[Interview] Current State:", currentState);
  }, [currentState]);

  return (
    <div className={`h-screen ${currentState === INTERVIEW_STATES.COMPLETE ? "bg-(--color-bg)" : "bg-[#FEFEFE]"} p-8 sm:p-12 lg:p-18 relative flex flex-col overflow-clip`}>

      <HRGradient />
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <InterviewBody
          sessionCode={sessionCode}
          sessionData={sessionData}
          selectedCompanion={selectedCompanion}
          quesNum={questionIndex}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          currentMessage={currentMessage}
          state={currentState}
          questionOver={questionOver}
        />
        {questionOver && <InterviewFooter
          onFinish={() => {
            onInterviewEnd()
          }}
        />}
      </div>
    </div>
  )
}

export default Interview