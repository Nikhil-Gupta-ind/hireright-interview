import { useState, useEffect, useRef } from "react"
import { createLocalTracks, Room } from "livekit-client"
import CameraPreview from "../components/CameraPreview"
import DeviceSelect from "../components/DeviceSelect"
import MicIcon from "../../../assets/icons/icon-mic.svg?react"
import SpeakerIcon from "../../../assets/icons/icon-speaker.svg?react"
import CameraIcon from '../../../assets/icons/icon-camera.svg?react'
import ArrowIcon from "../../../assets/icons/icon-arrow-forward.svg?react"
import Header from "../components/Header"
import AudioTest from "../components/AudioTest"
import { getAudioDeviceIcon, getMicDeviceIcon } from "../utils/deviceIcons"
import { startSession } from "../../../core/services/session"

const DeviceSetup = ({ onBack, onStartInterview, sessionCode, selectedCompanion }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [audioTrackVersion, setAudioTrackVersion] = useState(0);

  const [micOptions, setMicOptions] = useState([
    { icon: <MicIcon />, label: 'Default Microphone' },
  ]);
  const [speakerOptions, setSpeakerOptions] = useState([
    { icon: <SpeakerIcon />, label: 'Default Speakers' },
  ]);
  const [camOptions, setCamOptions] = useState([
    { icon: <CameraIcon />, label: 'Default Camera' },
  ]);

  const [mic, setMic] = useState(micOptions[0]);
  const [speaker, setSpeaker] = useState(speakerOptions[0]);
  const [camera, setCamera] = useState(camOptions[0]);

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
          const currentStillExists = mic && micOpts.find(m => m.deviceId === mic.deviceId);
          if (!currentStillExists) setMic(micOpts[0]);
        }

        if (speakerOpts.length > 0) {
          const currentStillExists = speaker && speakerOpts.find(s => s.deviceId === speaker.deviceId);
          if (!currentStillExists) setSpeaker(speakerOpts[0]);
        }

        if (camOpts.length > 0) {
          const currentStillExists = camera && camOpts.find(c => c.deviceId === camera.deviceId);
          if (!currentStillExists) setCamera(camOpts[0]);
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
        audio: mic?.deviceId
          ? { deviceId: { exact: mic.deviceId } }
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

    setIsLoading(true);
    try {
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
      <Header onBack={onBack} />

      {/* Main Content */}
      <div className="w-full flex-1 flex items-center justify-center lg:-translate-y-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16.75 w-full max-w-6xl items-start lg:items-center">
          {/* Left */}
          <div className="flex justify-center">
            <CameraPreview
              localVideoTrack={localVideoTrack}
              permissionGranted={permissionGranted}
              permissionDenied={permissionDenied}
              onRequestPermission={handleRequestPermission}
            />
          </div>

          {/* Right */}
          <div className={!permissionGranted ? 'opacity-50 pointer-events-none grayscale' : ''}>

            <div className="relative">
              {!permissionGranted && (
                <div className="absolute -top-10 left-0 text-sm font-medium text-[#5B3823]">
                  Permission needed
                </div>
              )}
              {mic && (
                <DeviceSelect
                  selectedOption={mic}
                  options={micOptions}
                  onOptionSelected={async (opt) => {
                    setMic(opt);

                    // stop old track
                    if (localAudioTrack) {
                      localAudioTrack.stop();
                    }

                    // create NEW track with explicit device
                    const tracks = await createLocalTracks({
                      audio: { deviceId: { exact: opt.deviceId } },
                      video: false,
                    });

                    const newAudioTrack = tracks[0];

                    setLocalAudioTrack(newAudioTrack);
                    setAudioTrackVersion(v => v + 1);

                    // if (localAudioTrack) {
                    //   try {
                    //     await localAudioTrack.restartTrack({ deviceId: opt.deviceId });
                    //     setAudioTrackVersion(v => v + 1);
                    //   } catch (e) { console.error("Failed to switch microphone", e); }
                    // }
                  }}
                />
              )}
            </div>

            {speaker && (
              <DeviceSelect
                selectedOption={speaker}
                options={speakerOptions}
                className='mt-4.5'
                onOptionSelected={(opt) => {
                  setSpeaker(opt);
                }}
              />
            )}

            <AudioTest
              className='mt-4.5 select-none'
              track={localAudioTrack}
              trackVersion={audioTrackVersion}
              speakerDeviceId={speaker?.deviceId}
            />

            {camera && (
              <DeviceSelect
                selectedOption={camera}
                options={camOptions}
                className='mt-6.5'
                onOptionSelected={async (opt) => {
                  setCamera(opt);
                  if (localVideoTrack) {
                    try {
                      await localVideoTrack.restartTrack({ deviceId: opt.deviceId });
                    } catch (e) { console.error("Failed to switch camera", e) }
                  }
                }}
              />
            )}

            <button
              onClick={handleStartInterview}
              disabled={isLoading || !permissionGranted}
              className="flex gap-3 text-white bg-(--color-primary) px-6 py-4 rounded-[18px] mt-6 items-center hover:brightness-90 active:scale-95 transition-transform duration-150 ease-in-out select-none disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Starting..." : "Start Interview"}
              {!isLoading && <ArrowIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeviceSetup