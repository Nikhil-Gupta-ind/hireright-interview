
const QuestionState = ({isListening, className=''}) => {
  return (
    <div className={`${className}`}>
        {/* TODO Fade 40% of the text top region */}
        {/* Live Transcription */}
        {isListening && <span className="font-hanken py-8 pr-11 text-[#0c0c0ea0]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi quidem iusto non facere distinctio! Aliquid, cumque, fugiat iste maxime ipsam fugit perspiciatis voluptate expedita beatae ut quisquam molestias, obcaecati eos?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sed nobis minima quae debitis eos amet dolor voluptate. Ex dolore nobis corrupti exercitationem vitae pariatur quam illum expedita harum quaerat.
        </span>}

        <span className="font-hanken font-bold text-[16px] text-[#0C0C0E7A] leading-6 mt-8">
        CURRENT QUESTION
        </span>
        <span className="font-hanken font-normal text-black text-[32px] leading-[40.96px] mt-5.5">
        Tell me about a time you made a mistake. How did you communicate that mistake?
        </span>
    </div>
  )
}

export default QuestionState