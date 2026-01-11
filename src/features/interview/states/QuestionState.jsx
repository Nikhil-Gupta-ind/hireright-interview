const QuestionState = ({ isListening, className = '' }) => {
  return (
    <div className={`${className}`}>
      {/* Centered interview block */}
      <div className="flex flex-col w-full max-h-full py-15">
        
        {/* Answer / Live transcription (scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {isListening && (
            <span className="block font-hanken text-[#393939CC] text-[20px] font-medium leading-7">
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

export default QuestionState