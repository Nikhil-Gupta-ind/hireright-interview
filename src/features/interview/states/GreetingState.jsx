import Avatar from "../components/Avatar";

const GreetingState = ({ currentMessage, companion, className = '' }) => {
  return (
    <div className={`${className}`}>
      {/* Centered block */}
      <div className="flex flex-col py-15 max-h-full">
        {/* Companion Avatar */}
        <Avatar companion={companion} />
        {/* Scrollable */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto mt-9.25 pr-2">
          {/* Greeting */}
          <span className="font-hanken text-[28px] font-medium leading-[35.84px] text-black whitespace-pre-line">
            {currentMessage || "Waiting for companion..."}
          </span>
          {/* TODO: Greeting Elaboration */}
          <span className="font-hanken text-[20px] text-[rgba(37,37,37,0.80)] font-medium leading-[25.6px] mt-11 whitespace-pre-line">
            {`My goal is to help you showcase your best self while learning about your experience and skills. I'm here to make this as comfortable and natural as possible -  think of it as a friendly professional conversation rather than a formal interrogation.
            
            Ready to have a great conversation? I'm looking forward to getting to know you!`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GreetingState