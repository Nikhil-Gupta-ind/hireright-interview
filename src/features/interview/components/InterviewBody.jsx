import EndingState from "../states/EndingState";
import GreetingState from "../states/GreetingState";
import QuestionState from "../states/QuestionState";
import InterviewHeader from "./InterviewHeader";
import InterviewProgress from "./InterviewProgress";
import InterviewRight from "./InterviewRight";

const InterviewBody = ({quesCount, isListening, isComplete, state, onImageClick }) => {
  return (
    // <div className="w-full flex-1 flex items-stretch justify-between gap-0 flex-col lg:flex-row">
    <div className="w-full flex-1 min-h-0 flex items-stretch justify-between gap-0 flex-col lg:flex-row overflow-hidden">

      {/* Left */}
      <div className="flex-[0.7] flex flex-col min-h-0">
        <InterviewHeader />

        <div className="flex-1 flex flex-col min-h-0">
        {/* <div className="flex-1 flex flex-col justify-evenly"> */}

          <div className="flex-1 min-h-0 flex">

            {state === "GREETING" && (
              <GreetingState className="flex flex-1 min-h-0 items-center justify-center"/>
            )}

            {state === "QUESTION" && (
              <QuestionState 
                isListening={isListening} 
                className="flex flex-1 flex-col justify-center"/>
            )}

            {state === "ENDING" && (
              <EndingState
                isComplete={isComplete}
                className="flex gap-8.75 flex-1 min-h-0 py-15"
              />
            )}

          </div>

          {/* Bottom Progress */}
          {state !== "ENDING" && (<InterviewProgress
              agentName='Angela'
              showAvatar={state === "QUESTION"}
              agentSpeaking={!isListening}
              quesNo={quesCount}
              totalQues={3}
              className='flex flex-col gap-4.75'
          />)}
        </div>
      </div>

      {/* Right */}
      <InterviewRight
        showAnswerCard={state === "QUESTION"}
        showBlurBg={state !== "ENDING"}
        onImageClick={onImageClick}
      />
    </div>
  );
};

export default InterviewBody;
