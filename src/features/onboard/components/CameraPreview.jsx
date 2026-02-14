import { useRef, useEffect } from 'react';

const CameraPreview = ({ localVideoTrack, permissionGranted, permissionDenied, onRequestPermission, videoRef, mode = 'setup' }) => {
  const internalVideoRef = useRef(null);
  const isCapture = mode === 'capture';

  // Setup dimensions: 515x386
  // Capture dimensions: 701x481
  const width = isCapture ? 701 : 515;
  const height = isCapture ? 525 : 386;

  useEffect(() => {
    if (localVideoTrack && internalVideoRef.current) {
      localVideoTrack.attach(internalVideoRef.current);
    }
    return () => {
      // Detach when component unmounts or track changes
      if (localVideoTrack) {
        localVideoTrack.detach();
      }
    };
  }, [localVideoTrack]);

  return (
    <div
      className={`${isCapture ? 'lg:h-[525px]' : 'lg:h-[386px]'} rounded-[24px] relative flex items-center justify-center overflow-hidden select-none bg-black transition-all duration-300 ease-in-out`}
      style={{
        // width: `${width}px`,
        // height: `${height}px`,
        aspectRatio: `${width}/${height}`
      }}
    >
      {/* Camera Preview */}
      {localVideoTrack ? (
        <video
          ref={(el) => {
            internalVideoRef.current = el;
            if (videoRef) {
              if (typeof videoRef === 'function') videoRef(el);
              else videoRef.current = el;
            }
          }}
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