import { useState, useEffect, useRef } from "react"
import { createLocalTracks, Room } from "livekit-client"
import { useNavigate } from "react-router"
import { useSessionContext } from "../../../context/SessionContext"
import CameraPreview from "../components/CameraPreview"
import DeviceSelect from "../components/DeviceSelect"
import { IconCamera as CameraIcon, IconArrowForward as ArrowIcon } from '../../../assets/images';
import Header from "../components/Header"
import AudioTest from "../components/AudioTest"
import { getAudioDeviceIcon, getMicDeviceIcon } from "../utils/deviceIcons"
import Guidelines from "../components/Guidelines"
import PhotoPreview from "../components/PhotoPreview"
import { startSession, uploadEnrollmentPhoto } from "../../../core/services/session"

const DeviceSetup = () => {
  const navigate = useNavigate();
  const { sessionData, selectedCompanion, selectedDevices, setSelectedDevices } = useSessionContext();
  const sessionCode = sessionData?.sessionCode;

  const [mode, setMode] = useState('setup'); // 'setup' | 'capture'
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  const onBack = () => {
    if (mode === 'capture') {
      window.history.back();
    } else {
      navigate(-1);
    }
  };

  const onStartInterview = () => navigate('/interview');

  const onNext = () => {
    setMode('capture');
    window.history.pushState({ mode: 'capture' }, '');
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (mode === 'capture') {
        setMode('setup');
        setCapturedImage(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [mode]);

  const onTakePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      // Mirror the image to match the preview
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        setCapturedImage(blob);
      }, 'image/jpeg');
    }
  };

  const onRetake = () => {
    setCapturedImage(null);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [audioTrackVersion, setAudioTrackVersion] = useState(0);

  const [micOptions, setMicOptions] = useState([selectedDevices.mic]);
  const [speakerOptions, setSpeakerOptions] = useState([selectedDevices.speaker]);
  const [camOptions, setCamOptions] = useState([selectedDevices.camera]);

  const tracksRef = useRef([]);

  const fetchDevices = async (mounted = true) => {
    try {
      const audioInputs = await Room.getLocalDevices('audioinput');
      const audioOutputs = await Room.getLocalDevices('audiooutput');
      const videoInputs = await Room.getLocalDevices('videoinput');

      if (mounted) {
        const micOpts = audioInputs.map(d => {
          const Icon = getMicDeviceIcon(d);
          return { icon: <Icon />, label: d.label, deviceId: d.deviceId };
        });

        const speakerOpts = audioOutputs.map(d => {
          const Icon = getAudioDeviceIcon(d);
          return { icon: <Icon />, label: d.label, deviceId: d.deviceId };
        });

        const camOpts = videoInputs.map(d => {
          return { icon: <CameraIcon />, label: d.label, deviceId: d.deviceId };
        });

        setMicOptions(micOpts);
        setSpeakerOptions(speakerOpts);
        setCamOptions(camOpts);

        // Only update selected if it's not set or doesn't exist anymore
        // Logic: if current mic is in the new list, keep it. Else set to first.
        if (micOpts.length > 0) {
          const currentStillExists = selectedDevices.mic && micOpts.find(m => m.deviceId === selectedDevices.mic.deviceId);
          if (!currentStillExists) setSelectedDevices(prev => ({ ...prev, mic: micOpts[0] }));
        }

        if (speakerOpts.length > 0) {
          const currentStillExists = selectedDevices.speaker && speakerOpts.find(s => s.deviceId === selectedDevices.speaker.deviceId);
          if (!currentStillExists) setSelectedDevices(prev => ({ ...prev, speaker: speakerOpts[0] }));
        }

        if (camOpts.length > 0) {
          const currentStillExists = selectedDevices.camera && camOpts.find(c => c.deviceId === selectedDevices.camera.deviceId);
          if (!currentStillExists) setSelectedDevices(prev => ({ ...prev, camera: camOpts[0] }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch devices", error);
    }
  };

  const initTracks = async (mounted = true) => {
    try {
      // request permissions
      // const tracks = await createLocalTracks({
      //   audio: true,
      //   video: true,
      // });
      const tracks = await createLocalTracks({
        audio: setSelectedDevices.mic?.deviceId
          ? { deviceId: { exact: setSelectedDevices.mic.deviceId } }
          : true,
        video: true,
      });


      if (!mounted) {
        tracks.forEach(track => track.stop());
        return;
      }

      // Clean up old tracks if re-initializing
      tracksRef.current.forEach(track => {
        if (track.stop) track.stop();
      });
      tracksRef.current = [];

      tracksRef.current = tracks;
      setPermissionGranted(true);
      setPermissionDenied(false);

      const videoTrack = tracks.find(t => t.kind === 'video');
      const audioTrack = tracks.find(t => t.kind === 'audio');

      if (videoTrack) setLocalVideoTrack(videoTrack);
      if (audioTrack) setLocalAudioTrack(audioTrack);

      await fetchDevices(mounted);

    } catch (error) {
      console.error("Failed to acquire tracks:", error);
      setPermissionDenied(true);
    }
  };

  useEffect(() => {
    let mounted = true;

    initTracks(mounted);

    const handleDeviceChange = () => {
      fetchDevices(mounted);
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    return () => {
      mounted = false;
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);

      tracksRef.current.forEach(track => {
        track.stop();
        // track.detach(); // detach is mostly for element management, stop is key
      });
      tracksRef.current = [];
    };
  }, []);

  const handleRequestPermission = () => {
    // Retry initialization
    initTracks(true);
  };

  // Handle device switching
  const handleDeviceChange = async (kind, deviceId) => {
    if (kind === 'videoinput' && localVideoTrack) {
      await localVideoTrack.restartTrack({ deviceId });
    }
  };

  const handleStartInterview = async () => {
    if (!sessionCode || !selectedCompanion) {
      console.error("Missing session Code or selected companion");
      return;
    }

    if (!capturedImage) {
      alert("Please capture a photo first.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Upload Image
      await uploadEnrollmentPhoto(sessionCode, capturedImage);

      // 2. Start Session
      await startSession(sessionCode, selectedCompanion.id);

      // Stop local tracks before navigating
      tracksRef.current.forEach(track => track.stop());
      tracksRef.current = [];

      onStartInterview();
    } catch (error) {
      console.error("Failed to start session:", error);
      alert(error.message || "Failed to start session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log(localAudioTrack?.mediaStreamTrack.getSettings().deviceId);
  }, [audioTrackVersion]);

  return (
    <div className="min-h-screen bg-(--color-bg) px-4 py-6 sm:p-8 lg:p-16 relative flex flex-col">
      <Header onBack={onBack} mode={mode} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center lg:-translate-y-10">
        <div className={`flex flex-col lg:flex-row w-full max-w-6xl 
          ${mode === 'setup' ? 'gap-6 lg:gap-16.75' : 'gap-0 lg:gap-[32px]'} 
          items-center lg:items-start`}>
          {/* <div className={`bg-blue-600 flex flex-col lg:flex-row ${mode === 'setup' ? 'gap-6 lg:gap-16.75' : 'gap-0 lg:gap-[32px]'} w-full max-w-6xl items-center justify-start`}> */}
          {/* <div className="h-full bg-blue-600 flex flex-col lg:flex-row gap-6 lg:gap-16.75 w-full max-w-6xl items-center lg:items-center"> */}
          {/* <div className="h-full bg-blue-600 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16.75 w-full max-w-6xl items-start lg:items-center"> */}
            {/* Left */}
            <div className="flex-none flex flex-col items-center justify-center">
              <CameraPreview
                localVideoTrack={localVideoTrack}
                permissionGranted={permissionGranted}
                permissionDenied={permissionDenied}
                onRequestPermission={handleRequestPermission}
                videoRef={videoRef}
                mode={mode}
              />
            </div>
            {/* Right */}
            <div className={`flex-1 ${!permissionGranted ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
              {mode === 'setup' && (
                <>
                  <div className="relative">
                    {!permissionGranted && (
                      <div className="absolute -top-10 left-0 text-sm font-medium text-[#5B3823]">
                        Permission needed
                      </div>
                    )}
                    {selectedDevices.mic && (
                      <DeviceSelect
                        selectedOption={selectedDevices.mic}
                        options={micOptions}
                        onOptionSelected={async (opt) => {
                          setSelectedDevices(prev => ({
                            ...prev,
                            mic: opt
                          }));
                          // stop and remove old audio track
                          if (localAudioTrack) {
                            localAudioTrack.stop();
                            tracksRef.current = tracksRef.current.filter(
                              t => t.kind !== 'audio'
                            );
                          }
                          // create new audio track
                          const [newAudioTrack] = await createLocalTracks({
                            audio: { deviceId: { exact: opt.deviceId } },
                            video: false,
                          });
                          // track it for cleanup
                          tracksRef.current.push(newAudioTrack);
                          setLocalAudioTrack(newAudioTrack);
                          setAudioTrackVersion(v => v + 1);
                        }}
                      />
                    )}
                  </div>
                  {selectedDevices.speaker && (
                    <DeviceSelect
                      selectedOption={selectedDevices.speaker}
                      options={speakerOptions}
                      className='mt-4.5'
                      onOptionSelected={(opt) => {
                        setSelectedDevices(prev => ({
                          ...prev,
                          speaker: opt
                        }));
                      }}
                    />
                  )}
                  <AudioTest
                    className='mt-4.5 select-none'
                    track={localAudioTrack}
                    trackVersion={audioTrackVersion}
                    speakerDeviceId={selectedDevices.speaker?.deviceId}
                  />
                  {selectedDevices.camera && (
                    <DeviceSelect
                      selectedOption={selectedDevices.camera}
                      options={camOptions}
                      className='mt-6.5'
                      onOptionSelected={async (opt) => {
                        setSelectedDevices(prev => ({
                          ...prev,
                          camera: opt
                        }));
                        if (localVideoTrack) {
                          try {
                            await localVideoTrack.restartTrack({ deviceId: opt.deviceId });
                          } catch (e) { console.error("Failed to switch camera", e) }
                        }
                      }}
                    />
                  )}
                  <button
                    onClick={onNext}
                    disabled={isLoading || !permissionGranted}
                    className="group flex gap-3 text-white bg-(--color-primary) px-6 py-4 rounded-[18px] mt-6 items-center hover:brightness-90 active:scale-95 transition-transform duration-150 ease-in-out select-none disabled:cursor-not-allowed justify-center">
                    Next
                    <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </>
              )}
              {mode === 'capture' && !capturedImage && (
                <Guidelines onTakePhoto={onTakePhoto} />
              )}
              {mode === 'capture' && capturedImage && (
                <PhotoPreview
                  photoUrl={URL.createObjectURL(capturedImage)}
                  onRetake={onTakePhoto}
                  onStartInterview={handleStartInterview}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
    </div>
  )
}
export default DeviceSetup