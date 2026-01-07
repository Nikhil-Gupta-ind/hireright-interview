import EndingState from "../states/EndingState";
import GreetingState from "../states/GreetingState";
import QuestionState from "../states/QuestionState";
import InterviewHeader from "./InterviewHeader";
import InterviewProgress from "./InterviewProgress";
import InterviewRight from "./InterviewRight";

const InterviewBody = ({quesCount, isListening, isComplete, state, onImageClick }) => {
  return (
    <div className="w-full flex-1 flex items-stretch justify-between gap-0 flex-col lg:flex-row">
      <div className="flex-[0.7] flex flex-col">
        <InterviewHeader />

        {/* Left */}
        <div className="flex-1 flex flex-col justify-evenly">
          {state === "GREETING" && <GreetingState className="flex flex-col"/>}
          {state === "QUESTION" && <QuestionState isListening={isListening} className="flex flex-col justify-evenly"/>}
          {state === "ENDING" && (
            <EndingState
              isComplete={isComplete} 
              className="flex gap-8.75 justify-between"
            />
          )}
          {state !== "ENDING" && <InterviewProgress
              agentName='Angela'
              showAvatar={state === "QUESTION"}
              agentSpeaking={!isListening}
              quesNo={quesCount}
              totalQues={3}
              className='flex flex-col gap-4.75'
          />}
        </div>
      </div>

      {/* Right */}
      <InterviewRight 
        showAnswerCard={state === "QUESTION"}
        onImageClick={onImageClick}
      />
    </div>
  );
};

export default InterviewBody;
