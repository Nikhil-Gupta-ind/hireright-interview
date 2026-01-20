import IconAi from '../../../assets/icons/icon-ai.svg?react'
import Avatar from "./Avatar";

const InterviewProgress = ({
  quesNum,
  totalQues,
  companion,
  companionSpeaking = false,
  showAvatar = false,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
        <div className="flex items-center justify-between">
            <div className="flex gap-5.75 items-center">
                {/* Companion Avatar */}
                {showAvatar && <Avatar companion={companion} />}
                <button className={`flex items-center gap-2 px-6 py-4 rounded-full border border-[#0C0C0EA3] ${companionSpeaking ? "text-[#6466EA]" : "text-[#0C0C0EA3]"} transition`}>
                    <IconAi /> <span className={`text-[16px] text-[#0C0C0EA3] font-medium leading-6 select-none`}>{companion?.name}</span>
                </button>
            </div>
            <div>
                <span className="font-hanken text-[28px] font-normal leading-[33.6px] text-black">{quesNum.toString().padStart(2, '0')}</span>
                <span className="font-hanken text-[16px] font-normal leading-[33.6px] text-black">/{totalQues.toString().padStart(2, '0')}</span>
            </div>
        </div>
        {/* Progress */}
        <div className="w-full h-1 bg-[#0C0C0E1F] relative">
            <div className="absolute left-0 top-0 h-full bg-[#0C0C0E] transition-all duration-300 ease-in-out" style={{ width: `${(quesNum / totalQues) * 100}%` }}></div>
        </div>
    </div>
  )
}

export default InterviewProgress