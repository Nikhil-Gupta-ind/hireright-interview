import { useState } from 'react';
import ArrowIcon from '../../../assets/icons/icon-arrow-forward.svg?react'

const InterviewFooter = ({ isFinished, onFinish }) => {

  // TODO: finish interview button only and just scroll with anim trigger
  const buttonLabel = !isFinished ? "Next" : "Finish Interview"
    // state === "ENDING"
    //   ? "Next"
    //   : state === "COMPLETE"
    //   ? "Finish Interview"
    //   : "Continue";

  return (
    <div className="mt-16">
      <div className="h-px bg-[#0C0C0E1F] mb-11" />

      <button
        onClick={onFinish}
        className={`px-6 py-4 rounded-[18px] ${!isFinished ? "bg-(--color-primary)" : "bg-black"} text-white flex items-center gap-3 select-none`}
      >
        {buttonLabel}
        <ArrowIcon />
        {/* <span>→</span> */}
      </button>
    </div>
  );
};

export default InterviewFooter;
