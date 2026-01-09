import { useEffect, useRef } from "react";

const EndingState = ({isComplete, className=''}) => {

  const scrollRef = useRef(null)

  useEffect(() => {
    if (!isComplete) return


    const el = scrollRef.current
      if (!el) return

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      })
  }, [isComplete])

  return (
    <div className={`${className}`}>   
      <div className="relative w-32 shrink-0 mr-8 hidden md:block">
        <img
          src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
          alt="Agent Avatar"
          // ANIMATION LOGIC:
          // 1. absolute: Removes from flow to allow free movement in the column.
          // 2. transition-all duration-1000: Smooths the movement over 1 second.
          // 3. Conditional Position:
          //    - Start: 'top-0 translate-y-0'
          //    - Center: 'top-1/2 -translate-y-1/2' (50% down, then offset by half its height)
          className={`
            w-32 h-32 object-contain rounded-full bg-[#D5621B66] shadow-sm
            absolute left-0
            transition-all duration-1000 ease-in-out
            ${isComplete ? 'top-1/2 -translate-y-1/2' : 'top-0 translate-y-0'}
          `}
          onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />
      </div>
      {/* MOBILE FALLBACK (Static Header for small screens) */}
      <div className="md:hidden mb-6 flex justify-center w-full">
         <img
          src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
          alt="Agent Avatar"
          className="w-24 h-24 object-contain rounded-full bg-[#D5621B66]"
        />
      </div>
      {/* <div className={`flex shrink-0 ${isComplete ? "items-center" : "items-start" }`}>
        <img
            src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
            alt={`name`}
            className="w-32 h-32 object-contain rounded-full bg-[#D5621B66]"
            onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />
      </div> */}

      {/* Scrollable Content */}
      <div ref={scrollRef} className="flex flex-col min-w-0 flex-1 min-h-0 overflow-y-auto">
        {true && <div>
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
        {false && <span className="font-hanken font-normal text-[20px] text-black leading-[27.6px] whitespace-pre-line">
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
          {`
          \n\n\n`}
        </span>}
      </div>
    </div>
  )
}

export default EndingState