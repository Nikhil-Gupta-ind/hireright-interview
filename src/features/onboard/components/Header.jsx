import BackIcon from '../../../assets/icons/icon-back.svg?react';

const Header = ({ onBack, mode = 'setup' }) => {
  const isCaptureMode = mode === 'capture';

  return (
    <div className='relative flex flex-col items-center text-center'>
      <button
        className='absolute left-0 p-2.5 active:scale-95 transition-transform duration-150 ease-in-out z-10 rounded-full hover:bg-[#EFDFD3]'
        onClick={onBack}
      >
        <BackIcon />
      </button>
      <h1 className="heading-primary">
        {isCaptureMode ? "Capture your Photo" : "Let’s get set up!"}
      </h1>
      <p className='text-[rgba(12,12,14,0.80)] font-hanken text-[20px] font-normal leading-[140%] tracking-[-0.2px] mt-3'>
        {isCaptureMode
          ? "This image will be used to verify your identity throughout the interview process to ensure integrity"
          : "Check if all your audio and video are set up, and let’s get started"
        }
      </p>
    </div>
  )
}

export default Header