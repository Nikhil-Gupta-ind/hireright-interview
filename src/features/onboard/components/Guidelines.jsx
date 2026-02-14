import { IconCamera as CameraIcon } from '../../../assets/images';

const Guidelines = ({ onTakePhoto }) => {
  const guidelines = [
    "Center your face",
    "Ensure good lighting",
    "Remove face coverings/hats",
    "Look directly at the camera"
  ];

  return (
    <div className="flex flex-col w-full items-start gap-5">
      <h3 className="text-[20px] font-semibold text-(--color-text-primary) tracking-[-1px] font-hanken leading-[120%]">
        Guidelines
      </h3>

      <div className="flex-1 space-y-0">
        {guidelines.map((text, index) => (
          <div key={index} className="flex items-start gap-3">
            <p className="text-[20px] text-[#0C0C0ECC] font-hanken font-normal leading-[140%] tracking-[-0.2px]">
              {`${index + 1}. ${text}`}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onTakePhoto}
        className="w-full bg-(--color-primary) rounded-[18px] flex items-center justify-center gap-3 text-white font-hanken font-semibold text-[16px] tracking-[-0.2px] leading-[140%] hover:brightness-90 active:scale-98 transition-all duration-150 ease-in-out select-none mt-auto px-6 py-4"
      >
        <CameraIcon className="w-6 h-6" />Take Photo
      </button>
    </div>
  );
};

export default Guidelines;
