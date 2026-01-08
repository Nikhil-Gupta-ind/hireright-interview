const EndingState = ({isComplete, className=''}) => {
  return (
    <div className={`${className}`}>   
      <div className={`flex shrink-0 ${isComplete ? "items-center" : "items-start" }`}>
        <img
            src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
            alt={`name`}
            className="w-32 h-32 object-contain rounded-full bg-[#D5621B66]"
            onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col min-w-0 flex-1 min-h-0 overflow-y-auto">
        {!isComplete && <div>
          <span className="font-dm-serif font-normal text-[32px] text-[#58240E] leading-[40.96px] italic whitespace-pre-line">
            {`That was a wonderful conversation!
            
            `}
          </span>
        </div>}
          
        <span className="font-hanken font-normal text-[20px] text-black leading-[138%] whitespace-pre-line">
          {`Here are some insights from our Chat!

          `}
        </span>

        {/* Interview Summary */}
        <ul className="font-hanken font-normal text-[20px] text-black leading-[27.6px] list-outside pl-6" style={{ listStyleType: 'square' }}>
          <li className="text-indent-[-1em]">Valued design process and problem-solving.</li>
          <li className="text-indent-[-1em]">Appreciated transparency and adaptability, especially in research.</li>
          <li className="text-indent-[-1em]">Recognized these as essential designer qualities.</li>
        </ul>

        {/* Dummy content */}
        {!isComplete && <span className="font-hanken font-normal text-[20px] text-black leading-[27.6px] whitespace-pre-line">
          {`Valued design process and problem-solving.
          Appreciated transparency and adaptability, especially in research.
          Recognized these as essential designer qualities.`}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex recusandae qui fuga minus. Nam magni, corrupti totam autem non nobis delectus, asperiores reprehenderit, alias ipsam assumenda rem qui voluptates recusandae.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iure dignissimos quos sapiente, voluptatibus dicta repudiandae, saepe et pariatur corrupti velit possimus molestiae corporis delectus nobis qui distinctio ipsa. Enim!
        </span>}

        <span className="mt-10 font-dm-serif font-normal text-[32px] text-[#58240E] leading-[40.96px] italic whitespace-pre-line">
          {`Here’s what happens next...

          `}
        </span>

        {/* TODO Show on click Next, scroll up, fade the text and move the agent below */}
        {true && <span className="font-hanken font-normal text-[20px] text-black leading-[138%] whitespace-pre-line">
          {`You'll receive detailed feedback from our team within 24 hours via email. This will include insights on your responses and information about the next steps in our process.`}
        </span>}
      </div>
    </div>
  )
}

export default EndingState