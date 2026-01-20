import EndingState from "../states/EndingState";
import GreetingState from "../states/GreetingState";
import QuestionState from "../states/QuestionState";
import InterviewHeader from "./InterviewHeader";
import InterviewProgress from "./InterviewProgress";
import InterviewRight from "./InterviewRight";
import { INTERVIEW_STATES } from "../constants/interviewStates";

const InterviewBody = ({
  sessionCode,
  sessionData,
  selectedCompanion,
  quesNum,
  totalQuestions,
  currentQuestion,
  currentMessage,
  state,
  questionOver,
  onImageClick
}) => {

  const isListening = state === INTERVIEW_STATES.LISTENING

  return (
    // <div className="w-full flex-1 flex items-stretch justify-between gap-0 flex-col lg:flex-row">
    <div className="w-full flex-1 min-h-0 flex items-stretch justify-between gap-0 flex-col lg:flex-row overflow-hidden">

      {/* Left */}
      <div className="flex-[0.75] flex flex-col min-h-0">
        <InterviewHeader />

        <div className="flex-1 flex flex-col min-h-0">
          {/* <div className="flex-1 flex flex-col justify-evenly"> */}

          <div className="flex-1 min-h-0 flex">

            {state === INTERVIEW_STATES.GREETING && (
              <GreetingState
                companion={selectedCompanion}
                currentMessage={currentMessage}
                className="flex flex-1 min-h-0 items-center justify-center"
              />
            )}

            {/* Show question until interivew has ended */}
            {(state === INTERVIEW_STATES.QUESTION || (isListening && !questionOver)) && (
              <QuestionState
                isListening={isListening}
                currentQuestion={currentQuestion}
                className="flex flex-1 flex-col justify-center"
              />
            )}

            {
              // (state === INTERVIEW_STATES.ENDING || state === INTERVIEW_STATES.COMPLETE) 
              questionOver
              && (
                <EndingState
                  sessionCode={sessionCode}
                  companion={selectedCompanion}
                  className="flex gap-8.75 flex-1 min-h-0 py-15"
                />
              )}

          </div>

          {/* Bottom Progress */}
          {(!questionOver) && (<InterviewProgress
            companion={selectedCompanion}
            showAvatar={state == INTERVIEW_STATES.QUESTION || isListening}
            companionSpeaking={!isListening}
            quesNum={quesNum}
            totalQues={totalQuestions}
            className='flex flex-col gap-4.75'
          />)}
        </div>
      </div>

      {/* Right */}
      <InterviewRight
        // showAnswerCard={bool}
        // onImageClick={() => {
        //   setBool(!bool)
        // }}
        duration={sessionData?.duration}
        quesNum={quesNum}
        showAnswerCard={(isListening && !questionOver)}
        showBlurBg={state !== INTERVIEW_STATES.ENDING && state !== INTERVIEW_STATES.COMPLETE}
        onImageClick={onImageClick}
      />
    </div>
  );
};

export default InterviewBody;
