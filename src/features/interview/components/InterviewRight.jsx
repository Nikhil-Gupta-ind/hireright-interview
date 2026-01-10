import { motion } from "framer-motion"
import sample from '../../../assets/sample-video-call.png'
import ClockIcon from '../../../assets/icons/icon-clock.svg?react'
import KeyboardIcon from '../../../assets/icons/icon-keyboard.svg?react'
import AddIcon from '../../../assets/icons/icon-add.svg?react'
import fcamBlur from '../../../assets/fcam-blur.svg'
import fcamBlur2 from '../../../assets/fcam-blur2.svg'

const InterviewRight = ({ showAnswerCard, showBlurBg, onImageClick }) => {
  return (
    <div
      className={`flex flex-col h-full min-h-0
      ${showAnswerCard ? 'justify-start' : 'justify-center'}`}
    >

      {/* Card */}
      <motion.div
        layout
        // transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex flex-col w-full rounded-3xl bg-[#FAFAFA] shadow
        ${showAnswerCard ? 'flex-1 min-h-0 overflow-hidden' : 'h-auto'}`}
      >

        {/* Answer Content */}
        {showAnswerCard && (
          <motion.div
            layout
            className="flex flex-col flex-1 min-h-0 p-6"
          >
            <div className='flex items-center justify-between'>
              <span className='font-hanken font-bold text-[16px] leading-6 text-[#0C0C0ECC]'>
                YOUR ANSWER
              </span>
              <button className='flex items-center justify-center gap-2 px-6 p-4 bg-[#FAFAFA] rounded-2xl shadow'>
                <ClockIcon /> 04:57
              </button>
            </div>

            <span className="flex-1 min-h-0 max-w-112.75 font-hanken font-medium text-[18px] text-[#393939] leading-[28px] pt-7.5 pb-10 my-2 overflow-y-auto whitespace-pre-line">
              {`During my final semester, I was working on a capstone project redesigning a local nonprofit's donation platform. I was really excited about conducting user research and planned to interview 15-20 donors to understand their motivations and pain points.
        The mistake I made was being overly optimistic about my timeline and access to participants. I had assumed the nonprofit would easil
        
        During my final semester, I was working on a capstone project redesigning a local nonprofit's donation platform. I was really excited about conducting user research and planned to interview 15-20 donors to understand their motivations and pain points.
        The mistake I made was being overly optimistic about my timeline and access to participants. I had assumed the nonprofit would easil
        
        `}
            </span>

            <div className='flex gap-3 justify-end'>
              <button className='py-4 px-3 bg-(--color-primary) rounded-2xl'>
                <KeyboardIcon />
              </button>
              <button className='px-3 py-4 rounded-2xl'>
                <AddIcon />
              </button>
            </div>
          </motion.div>
        )}

        {/* Camera Preview */}
        <motion.div layout className="relative w-full select-none">
          {showBlurBg && (
            <motion.img
              src={showAnswerCard ? fcamBlur2 : fcamBlur}
              alt=""
              aria-hidden
              initial={false}
              animate={{
                y: showAnswerCard ? -24 : 24,
                opacity: showAnswerCard ? 1 : 0.85
              }}
              transition={{
                duration: 0.35,
                ease: "easeInOut"
              }}
              className="
                absolute inset-0 object-cover rounded-3xl
                pointer-events-none
              "
            />
          )}

          <img
            src={sample}
            style={{ aspectRatio: '515/386' }}
            alt="video preview"
            className='relative z-10 w-full h-full object-cover cursor-pointer'
            onClick={onImageClick}
          />

          {showBlurBg && (
            <div className="z-10 rounded-3xl absolute inset-0 flex items-center justify-center bg-[#00000035] text-white text-lg font-semibold pointer-events-none">
              Click for next state
            </div>
          )}
        </motion.div>

      </motion.div>
    </div>
  )
}

export default InterviewRight


// import sample from '../../../assets/sample-video-call.png'
// import ClockIcon from '../../../assets/icons/icon-clock.svg?react'
// import KeyboardIcon from '../../../assets/icons/icon-keyboard.svg?react'
// import AddIcon from '../../../assets/icons/icon-add.svg?react'
// import fcamBlur from '../../../assets/fcam-blur.svg'
// import fcamBlur2 from '../../../assets/fcam-blur2.svg'

// const InterviewRight = ({showAnswerCard, showBlurBg, onImageClick}) => {
//   return (
//     // h-fit justify-evenly
//     // <div className='h-full flex items-center justify-between bg-green-500'>
//     // <div className={`flex flex-col h-full ${showAnswerCard ? 'justify-start' : 'justify-center'}`}>
//     <div
//       className={`flex flex-col h-full min-h-0
//       ${showAnswerCard ? 'justify-start' : 'justify-center'}`}
//     >

//       {/* Card */}
//       <div
//         className={`flex flex-col w-full rounded-3xl bg-[#FAFAFA] shadow
//         ${showAnswerCard ? 'flex-1 min-h-0 overflow-hidden' : 'h-auto'}`}
//       >

//       {/* <div className={`flex flex-col w-full rounded-3xl bg-[#FAFAFA] shadow ${showAnswerCard ? 'flex-1 min-h-0' : 'h-auto'}`}> */}
//       {/* <div className="flex flex-col flex-1 min-h-0 items-stretch justify-between rounded-3xl bg-[#FAFAFA] shadow shadow-[rgba(12, 12, 14, 0.10)]"> */}
//         {/* Answer Content */}
//         {showAnswerCard && (
//           <div className="flex flex-col flex-1 min-h-0 p-6">
//           {/* <div className='flex-1 flex flex-col justify-between p-6 '> */}
//             <div className='flex items-center justify-between'>
//               <span className='font-hanken font-bold text-[16px] leading-6 text-[#0C0C0ECC]'>
//                 YOUR ANSWER
//               </span>
//               <button className='flex items-center justify-center gap-2 px-6 p-4 bg-[#FAFAFA] rounded-2xl shadow'>
//                 <ClockIcon /> 04:57
//               </button>
//             </div>

//             <span className="flex-1 min-h-0 max-w-112.75 font-hanken font-medium text-[18px] text-[#393939] leading-[28px] mt-9.5 mb-11 overflow-y-auto whitespace-pre-line">
//             {/* <span className='flex-1 max-w-112.75 max-h-64.5 font-hanken font-medium text-[18px] text-[#393939] leading-[28x] mt-9.5 mb-11 overflow-y-auto whitespace-pre-line' style={{ scrollbarWidth: 'none' }}> */}
//               {`During my final semester, I was working on a capstone project redesigning a local nonprofit's donation platform. I was really excited about conducting user research and planned to interview 15-20 donors to understand their motivations and pain points.
//         The mistake I made was being overly optimistic about my timeline and access to participants. I had assumed the nonprofit would easil
        
//         During my final semester, I was working on a capstone project redesigning a local nonprofit's donation platform. I was really excited about conducting user research and planned to interview 15-20 donors to understand their motivations and pain points.
//         The mistake I made was being overly optimistic about my timeline and access to participants. I had assumed the nonprofit would easil
        
//         `}
//             </span>

//             <div className='flex gap-3 justify-end'>
//               <button className='py-4 px-3 bg-(--color-primary) rounded-2xl'>
//                 <KeyboardIcon />
//               </button>
//               <button className='px-3 py-4 rounded-2xl'>
//                 <AddIcon />
//               </button>
//             </div>
//           </div>)}
//         {/* Camera Preview */}
//         <div className="relative w-full">
//           {/* Blur background */}
//           {showBlurBg && (
//             <img
//             src={showAnswerCard ? fcamBlur2 : fcamBlur}
//             alt=""
//             aria-hidden
//             className={`
//               absolute inset-0 object-cover rounded-3xl
//               pointer-events-none
//               ${showAnswerCard ? '-translate-y-6' : 'translate-y-6'}
//             `}
//           />
//           )}

//           <img
//             src={sample}
//             style={{ aspectRatio: '515/386' }}
//             alt="video preview"
//             className='relative z-10 w-full h-full object-cover cursor-pointer'
//             onClick={onImageClick}
//           />
//           {showBlurBg && ( 
//             <div className="z-10 rounded-3xl absolute inset-0 flex items-center justify-center bg-[#00000035] bg-opacity-50 text-white text-lg font-semibold pointer-events-none">
//               Click for next state
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InterviewRight