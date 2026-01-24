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

export const submitRating = async (sessionCode, rating) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionCode}/rating`, {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating
        })
    });

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to submit rating');
    }

    return data;
};
