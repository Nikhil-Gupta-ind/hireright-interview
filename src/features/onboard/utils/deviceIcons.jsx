import React from 'react';
import SpeakerIcon from "../../../assets/icons/icon-speaker.svg?react"
import MicIcon from "../../../assets/icons/icon-mic.svg?react"
import CameraIcon from "../../../assets/icons/icon-camera.svg?react"

// --- ICONS (Material Design, matching Android) ---
export const IconBluetooth = ({ className = "w-5 h-5", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
    </svg>
);
export const IconHeadset = ({ className = "w-5 h-5", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
    </svg>
);
// Earpiece / Default Phone
export const IconPhone = ({ className = "w-5 h-5", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        {...props}
    >
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.161 15.161 0 0 1-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 15.12 15.12 0 0 0 16 16c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

// --- HELPER FUNCTION ---
/**
 * Determines the best icon to show for a given audio device.
 * @param {MediaDeviceInfo | { label: string }} device - The device object from navigator.mediaDevices.enumerateDevices()
 * @returns {React.ComponentType} The React component for the icon
 */
export function getAudioDeviceIcon(device) {
    if (!device || !device.label) {
        return SpeakerIcon; // Default fallback
    }
    const label = device.label.toLowerCase();
    // 1. Bluetooth checks
    if (
        label.includes('bluetooth') ||
        label.includes('airpods') ||
        label.includes('buds') ||
        label.includes('wireless') ||
        label.includes('wh-') || // Sony headphones prefix
        label.includes('wf-')    // Sony earbuds prefix
    ) {
        return IconBluetooth;
    }
    // 2. Wired / Headset checks
    if (
        label.includes('headphone') ||
        label.includes('headset') ||
        label.includes('usb') ||
        label.includes('wired')
    ) {
        return IconHeadset;
    }
    // 3. Earpiece / Internal
    if (
        label.includes('earpiece') ||
        label.includes('internal') ||
        label.includes('phone')
    ) {
        return IconPhone;
    }
    // 4. Default to Speaker (covers "speaker", "external speaker", etc. and unknowns)
    return SpeakerIcon;
}

export function getMicDeviceIcon(device) {
    // reusing similar logic or default to Mic if not bluetooth
    if (!device || !device.label) return MicIcon;
    const label = device.label.toLowerCase();

    if (
        label.includes('bluetooth') ||
        label.includes('airpods') ||
        label.includes('buds')
    ) {
        return IconBluetooth;
    }
    return MicIcon;
}
