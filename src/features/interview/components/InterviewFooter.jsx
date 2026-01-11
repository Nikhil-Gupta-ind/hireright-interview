import ArrowIcon from '../../../assets/icons/icon-arrow-forward.svg?react'

const InterviewFooter = ({ onFinish }) => {
  return (
    <div className="mt-16">
      <div className="h-px bg-[#0C0C0E1F] mb-11" />

      <button
        onClick={onFinish}
        className={`px-6 py-4 rounded-[18px] bg-black text-white flex items-center gap-3 hover:brightness-90 active:scale-95 transition-transform duration-150 ease-in-out select-none`}
      >
        Finish Interview<ArrowIcon />
      </button>
    </div>
  );
};

export default InterviewFooter;
