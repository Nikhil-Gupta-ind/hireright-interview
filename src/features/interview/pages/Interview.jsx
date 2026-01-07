import { useState } from "react";
import InterviewBody from "../components/InterviewBody";
import InterviewFooter from "../components/InterviewFooter";
import HRGradient from "../components/Gradient";

const Interview = ({onInterviewEnd}) => {

  const [state, setState] = useState("GREETING"); //GREETING, QUESTION, ENDING, COMPLETE

  // todo need a data class alternative here rather than simple enum object
  const [isFinished, setFinished] = useState(false)
  const [isListening, setListening] = useState(false)
  const [count, setCount] = useState(1)

  return (
    <div className={`h-screen ${state === "COMPLETE" ? "bg-(--color-bg)" : "bg-[#FEFEFE]"} p-8 sm:p-12 lg:p-18 relative flex flex-col`}>
      {/* {state}
      {isFinished.toString()}
      {isListening.toString()} */}
      
      <HRGradient />
      <div className="relative z-10 flex flex-col flex-1">
        <InterviewBody
          quesCount={count}
          isListening={isListening}
          isComplete={isFinished}
          state={state}
          onImageClick={() => {
            if (state === "GREETING") setState("QUESTION");
            else if (state === "QUESTION") {
              if (isListening) {
                if (count < 3) {
                  setCount(count + 1)
                  setListening(false)
                } else {
                  setState("ENDING")
                }
              } else {
                setListening(true)
              }
            }
          }}
        />
        {state === "ENDING" && <InterviewFooter
          isFinished={isFinished}
          state={state}
          onFinish={() => {
            !isFinished ? setFinished(true) : onInterviewEnd()
          }}
        />}
      </div>
    </div>
  )
}

export default Interview