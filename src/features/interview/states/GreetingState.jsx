import React from 'react'

const GreetingState = ({className = ''}) => {
  return (
    <div className={`${className}`}>
        {/* Companion Avatar */}
        <img
            src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
            alt={`name`}
            style={{ width: '82px', height: '82px' }}
            className="object-contain rounded-full bg-[#D5621B66]"
            onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />

        {/* Greeting */}
        <span className="font-hanken text-[28px] font-medium leading-[35.84px] text-black mt-9.25 whitespace-pre-line">
        {`Hi John!
        I’m Angela and I'll be guiding you through our conversation today.`}
        </span>

        {/* Greeting Elaboration */}
        <span className="font-hanken text-[20px] text-[rgba(37,37,37,0.80)] font-medium leading-[25.6px] mt-11 whitespace-pre-line">{`My goal is to help you showcase your best self while learning about your experience and skills. I'm here to make this as comfortable and natural as possible -  think of it as a friendly professional conversation rather than a formal interrogation.
    
        Ready to have a great conversation? I'm looking forward to getting to know you!`}
        </span>
    </div>
  )
}

export default GreetingState