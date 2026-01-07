import sample from '../../../assets/sample-video-call.png'
import ClockIcon from '../../../assets/icons/icon-clock.svg?react'
import KeyboardIcon from '../../../assets/icons/icon-keyboard.svg?react'
import AddIcon from '../../../assets/icons/icon-add.svg?react'

const InterviewRight = ({showAnswerCard, onImageClick}) => {
  return (
    // h-fit justify-evenly
    <div className='flex items-center justify-between'>

      {/* Card */}
      <div className="flex flex-col items-stretch justify-between rounded-3xl bg-[#FAFAFA] shadow shadow-[rgba(12, 12, 14, 0.10)]">
        {showAnswerCard && <div className='flex-1 flex flex-col justify-between p-6 '>
          <div className='flex items-center justify-between'>
            <span className='font-hanken font-bold text-[16px] leading-6 text-[#0C0C0ECC]'>
              YOUR ANSWER
            </span>
            <button className='flex items-center justify-center gap-2 px-6 p-4 bg-[#FAFAFA] rounded-2xl shadow'>
              <ClockIcon /> 04:57
            </button>
          </div>
          <span className='flex-1 max-w-112.75 max-h-64.5 font-hanken font-medium text-[18px] text-[#393939] leading-[28x] mt-9.5 mb-11 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
            {`During my final semester, I was working on a capstone project redesigning a local nonprofit's donation platform. I was really excited about conducting user research and planned to interview 15-20 donors to understand their motivations and pain points.
      The mistake I made was being overly optimistic about my timeline and access to participants. I had assumed the nonprofit would easil`}
          </span>
          <div className='flex gap-3 justify-end'>
            <button className='py-4 px-3 bg-(--color-primary) rounded-2xl'>
              <KeyboardIcon />
            </button>
            <button className='px-3 py-4 rounded-2xl'>
              <AddIcon />
            </button>
          </div>
        </div>}
      
        {/* Camera Preview */}
        <img
          src={sample}
          style={{ aspectRatio: '515/386' }}
          alt="video preview"
          className='object-cover'
          onClick={onImageClick}
        />
      </div>
    </div>
  )
}

export default InterviewRight