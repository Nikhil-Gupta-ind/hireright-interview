import { useRef, useEffect } from 'react';
import sample from '../../../assets/sample-video-call.png'

const CameraPreview = ({ localVideoTrack, permissionGranted, permissionDenied, onRequestPermission }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (localVideoTrack && videoRef.current) {
      localVideoTrack.attach(videoRef.current);
    }
    return () => {
      // Detach when component unmounts or track changes
      if (localVideoTrack) {
        localVideoTrack.detach();
      }
    };
  }, [localVideoTrack]);

  return (
    // w-[515px] h-96.5 bg-[#D6C5B8]
    <div
      className='h-96.5 rounded-3xl relative flex items-center justify-center overflow-hidden select-none bg-black'
      style={{ aspectRatio: '515/386' }}
    >
      {/* Camera Preview */}
      {localVideoTrack ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%', transform: 'scale(-1, 1)' }} // Mirror local video
          muted // Local audio should be muted to prevent feedback
          playsInline
          autoPlay
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-8 text-center"
        >
          {!permissionGranted && (
            <>
              <p className="mb-4 font-hanken text-lg">Camera and microphone permission is required</p>
              <button
                onClick={onRequestPermission}
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Allow microphone and camera
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CameraPreview