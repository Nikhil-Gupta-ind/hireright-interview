import MicIcon from '../../../assets/icons/icon-mic.svg?react'
import CameraIcon from '../../../assets/icons/icon-camera.svg?react'
import sample from '../../../assets/sample-video-call.png'
import logo from '../../../assets/logo.svg'

const CameraPreview = () => {
  return (
    // w-[515px] h-96.5 bg-[#D6C5B8]
    <div className='w-fit h-96.5 rounded-3xl relative flex items-center justify-center overflow-hidden'>
        {/* Camera Preview */}
        <img
          src={sample} 
          style={{ aspectRatio: '515/386' }}
          alt="video preview"
          className='object-cover'
        />
        {/* TODO controls not responsive with camera preview aspect ratio */}
        {/* Controls */}
        {/* <div className='absolute bottom-6 right-6 flex gap-5'>
            <button className='w-14 h-14 rounded-full bg-[#5B3823] text-white text-xl items-center justify-center flex'>
                <MicIcon />
            </button>
            <button className='w-14 h-14 rounded-full bg-[#5B3823] text-white text-xl items-center justify-center flex'>
                <CameraIcon />
            </button>
        </div> */}
    </div>
  )
}

export default CameraPreview