import ArrowIcon from "../../../assets/icons/icon-arrow-forward.svg?react"
import DotsFlashing from "./DotsFlashing"

const PhotoPreview = ({ photoUrl, onRetake, onStartInterview, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-(--color-text-primary) font-hanken text-[20px] font-semibold leading-[120%] tracking-[-1px] mb-[28px]">
        Your Photo Preview
      </h3>

      <div className="flex-1 flex flex-col items-start gap-0">
        <div
          className='flex-1 rounded-[12px] relative flex items-center justify-center overflow-hidden select-none bg-black overflow-clip'
        >
          <img
            src={photoUrl}
            alt="Captured"
            className="w-full h-full object-cover"
            // Mirrored because we mirrored the capture canvas
            style={{
              aspectRatio: `427/235`,
              transform: 'scale(-1, 1)'
            }}
          />
        </div>

        <div className="w-[427px] flex flex-col gap-[16px] mt-[78px]">
          <button
            onClick={onStartInterview}
            disabled={isLoading}
            className="w-full h-[56px] flex gap-[12px] text-white bg-(--color-primary) border border-(--color-primary) pl-[24px] pr-[20px] py-[16px] rounded-[18px] items-center justify-center hover:brightness-90 active:scale-95 transition-all duration-150 ease-in-out select-none disabled:cursor-not-allowed disabled:opacity-70 font-hanken font-semibold text-[16px] tracking-[-0.2px]"
          >
            {isLoading ? (
              // <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <DotsFlashing />
            ) : (
              <>
                Start Interview
                <ArrowIcon />
              </>
            )}
          </button>

          <button
            onClick={onRetake}
            disabled={isLoading}
            className="w-full h-[56px] flex items-center justify-center text-(--color-primary) bg-transparent border border-(--color-primary) rounded-[100px] hover:bg-(--color-primary)/5 active:scale-95 transition-all duration-150 ease-in-out select-none font-hanken font-semibold text-[16px] tracking-[-0.2px]"
          >
            Retake
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoPreview;
