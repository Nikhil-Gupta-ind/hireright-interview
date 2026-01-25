const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSessionDetails = async (sessionCode) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionCode}/details`, {
        headers: {
            'accept': 'application/json'
        }
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Session not found');
    }

    return data.data;
};

export const startSession = async (sessionCode, agentId) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionCode}/start`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            agent: agentId
        })
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to start session');
    }

    return data.data; // Returning data just in case, even if not used immediately.
};

export const fetchSessionSummary = async (sessionCode) => { // T9SZYEIQ
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionCode}/detail`, {
        headers: {
            'accept': 'application/json'
        }
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to fetch session summary');
    }

    return data.data;
};

export const uploadEnrollmentPhoto = async (sessionCode, photoBlob) => {
    const formData = new FormData();
    formData.append('photo', photoBlob, `${sessionCode}.jpg`);
    formData.append('type', 'image/jpeg');

    const response = await fetch(`${API_BASE_URL}/enrollment-photo/${sessionCode}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            // 'Content-Type': 'multipart/form-data' // Browser sets this automatically with boundary for FormData
        },
        body: formData
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to upload photo');
    }

    return data.data;
};
