export const fetchSessionDetails = async (sessionCode) => {
    const response = await fetch(`https://api.hire-right.ai/api/v1/sessions/${sessionCode}/details`, {
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
    const response = await fetch(`https://api.hire-right.ai/api/v1/sessions/${sessionCode}/start`, {
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

export const fetchSessionSummary = async (sessionCode) => {
    const response = await fetch(`https://api.hire-right.ai/api/v1/sessions/T9SZYEIQ/detail`, {
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
