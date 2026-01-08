const QuestionState = ({ isListening, className = '' }) => {
  return (
    <div className={`${className}`}>
      {/* Centered interview block */}
      <div className="flex flex-col w-full max-h-full py-15">
        
        {/* Answer / Live transcription (scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {isListening && (
            <span className="block font-hanken text-[#0c0c0ea0] leading-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi quidem
              iusto non facere distinctio! Aliquid, cumque, fugiat iste maxime
              ipsam fugit perspiciatis voluptate expedita beatae ut quisquam
              molestias, obcaecati eos?
              <br /><br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sed
              nobis minima quae debitis eos amet dolor voluptate.

              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi quidem
              iusto non facere distinctio! Aliquid, cumque, fugiat iste maxime
              ipsam fugit perspiciatis voluptate expedita beatae ut quisquam
              molestias, obcaecati eos?
              <br /><br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sed
              nobis minima quae debitis eos amet dolor voluptate.

              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi quidem
              iusto non facere distinctio! Aliquid, cumque, fugiat iste maxime
              ipsam fugit perspiciatis voluptate expedita beatae ut quisquam
              molestias, obcaecati eos?
              <br /><br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi sed
              nobis minima quae debitis eos amet dolor voluptate.

              
            </span>
          )}
        </div>

        {/* Anchored question */}
        <div className="mt-8 shrink-0">
          <span className="block font-hanken font-bold text-[16px] text-[#0C0C0E7A] leading-6">
            CURRENT QUESTION
          </span>

          {/* Question text with line clamp */}
          <span className="block font-hanken text-black text-[32px] leading-[40.96px] mt-5.5 line-clamp-3">
            Tell me about a time you made a mistake. How did you communicate that
            mistake?
          </span>
        </div>
      </div>
    </div>
  );
};

// const QuestionState = ({isListening, className=''}) => {
//   return (
//     <div className={`${className}`}>
//         {/* TODO Fade 40% of the text top region */}
//         {/* Live Transcription */}
//         {isListening && <span className="font-hanken py-8 pr-11 text-[#0c0c0ea0]">
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi quidem iusto non facere distinctio! Aliquid, cumque, fugiat iste maxime ipsam fugit perspiciatis voluptate expedita beatae ut quisquam molestias, obcaecati eos?
//         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sed nobis minima quae debitis eos amet dolor voluptate. Ex dolore nobis corrupti exercitationem vitae pariatur quam illum expedita harum quaerat.
//         </span>}

//         <span className="font-hanken font-bold text-[16px] text-[#0C0C0E7A] leading-6 mt-8">
//         CURRENT QUESTION
//         </span>
//         <span className="font-hanken font-normal text-black text-[32px] leading-[40.96px] mt-5.5">
//         Tell me about a time you made a mistake. How did you communicate that mistake?
//         </span>
//     </div>
//   )
// }

export default QuestionState