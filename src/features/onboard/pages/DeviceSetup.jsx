import CameraPreview from "../components/CameraPreview"
import DeviceSelect from "../components/DeviceSelect"
import MicIcon from "../../../assets/icons/icon-mic.svg?react"
import SpeakerIcon from "../../../assets/icons/icon-speaker.svg?react"
import CameraIcon from '../../../assets/icons/icon-camera.svg?react'
import ArrowIcon from "../../../assets/icons/icon-arrow-forward.svg?react"
import Header from "../components/Header"
import AudioTest from "../components/AudioTest"
import BlutoothIcon from '../../../assets/icons/icon-bluetooth.svg?react'

const DeviceSetup = ({onBack, onStartInterview}) => {
  return (
    <div className="min-h-screen bg-(--color-bg) px-4 py-6 sm:p-8 lg:p-16 relative flex flex-col">
      <Header onBack={onBack} />

      {/* Main Content */}
      <div className="w-full flex-1 flex items-center justify-center lg:-translate-y-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16.75 w-full max-w-6xl items-start lg:items-center">
          {/* Left */}
          <div className="flex justify-center">
            <CameraPreview />
          </div>

          {/* Right */}
          <div>

            <DeviceSelect 
              icon={<MicIcon />}
              label='Microphone Array (Realtek(R) Audio)' 
              options={[
                {icon: <MicIcon />, label: 'Microphone Array (Realtek(R) Audio)'},
                {icon: <MicIcon />, label: 'Default Microphone'},
                {icon: <MicIcon />, label: 'Built-in Microphone'}
              ]}
            />
            <DeviceSelect
              icon={<SpeakerIcon />} 
              label='Speakers (Realtek(R) Audio)'
              className='mt-4.5'
              options={[
                {icon: <BlutoothIcon />, label: 'Speakers (Realtek(R) Audio)'},
                {icon: <BlutoothIcon />, label: 'Default Speakers'},
                {icon: <BlutoothIcon />, label: 'Headphones'}
              ]}
            />

            <AudioTest className='mt-4.5' />

            <DeviceSelect
              icon={<CameraIcon />}
              label='USB 2.0 HD UVC Webcam'
              className='mt-6.5'
              options={[
                {icon: <CameraIcon />, label: 'USB 2.0 HD UVC Webcam'},
                {icon: <CameraIcon />, label: 'Built-in Camera'},
                {icon: <CameraIcon />, label: 'External Webcam'}
              ]}
            />

            <button
              onClick={onStartInterview}
              className="flex gap-3 text-white bg-(--color-primary) px-6 py-4 rounded-[18px] mt-6 items-center hover:brightness-90 active:scale-95 transition-transform duration-150 ease-in-out">
              Start Interview <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceSetup