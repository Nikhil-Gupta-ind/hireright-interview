import { createContext, useState, useEffect, useContext } from 'react';
import { IconMic as MicIcon, IconCamera as CameraIcon, IconSpeaker as SpeakerIcon } from '../assets/images';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
    // Initialize state from sessionStorage if available
    const [sessionData, setSessionData] = useState(() => {
        const saved = sessionStorage.getItem('sessionData');
        return saved ? JSON.parse(saved) : null;
    });

    const [selectedCompanion, setSelectedCompanion] = useState(() => {
        const saved = sessionStorage.getItem('selectedCompanion');
        return saved ? JSON.parse(saved) : null;
    });

    const [selectedDevices, setSelectedDevices] = useState({
        mic: { icon: <MicIcon />, label: 'Default Microphone' },
        speaker: { icon: <SpeakerIcon />, label: 'Default Speakers' },
        camera: { icon: <CameraIcon />, label: 'Default Camera' },
    });

    // Sync state to sessionStorage whenever it changes
    useEffect(() => {
        if (sessionData) {
            sessionStorage.setItem('sessionData', JSON.stringify(sessionData));
        } else {
            sessionStorage.removeItem('sessionData');
        }
    }, [sessionData]);

    useEffect(() => {
        if (selectedCompanion) {
            sessionStorage.setItem('selectedCompanion', JSON.stringify(selectedCompanion));
        } else {
            sessionStorage.removeItem('selectedCompanion');
        }
    }, [selectedCompanion]);

    const value = {
        sessionData,
        setSessionData,
        selectedCompanion,
        setSelectedCompanion,
        selectedDevices,
        setSelectedDevices,
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSessionContext must be used within a SessionProvider');
    }
    return context;
};
