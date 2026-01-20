import { useState, useCallback } from 'react';
import { useDataChannel } from '@livekit/components-react';
import { INTERVIEW_STATES } from '../constants/interviewStates';

/**
 * Hook to manage interview state received via LiveKit Data Channel.
 * Mirrored from the Android 'InterviewStateManager.kt' logic.
 */
export function useInterviewState() {
    const [currentState, setCurrentState] = useState(null);
    const [stateData, setStateData] = useState(null);

    // Persistent fields that stay across state changes (e.g. while 'listening')
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);

    // Callback handle for receiving data
    const onDataReceived = useCallback((msg) => {
        try {
            const { payload, topic } = msg;
            const text = new TextDecoder().decode(payload);
            const message = JSON.parse(text);

            console.log('[InterviewState] Received message on topic:', topic, message);

            // Filter for 'interview_state' messages
            if (message.type === 'interview_state') {
                const { state, data } = message;
                console.log('[InterviewState] Updating state:', state, data);

                // 1. Update overall current state
                setCurrentState(state);
                setStateData(data);

                // 2. Persist Question logic (as seen in Android Manager)
                // If we are in the 'question' state, save the message as the permanent question
                if (state === INTERVIEW_STATES.QUESTION && data.message) {
                    setCurrentQuestion(data.message);
                }

                // 3. Update Question Index only when specifically on 'question' state
                if (state === INTERVIEW_STATES.QUESTION && data.questionIndex !== undefined) {
                    setQuestionIndex(data.questionIndex);
                }
            }
        } catch (error) {
            console.error('[InterviewState] Failed to parse message:', error, msg);
        }
    }, []);

    // Set up the LiveKit data channel listener
    useDataChannel('interview_state', onDataReceived);

    return {
        currentState,
        stateData,
        questionIndex: questionIndex,
        totalQuestions: stateData?.totalQuestions || 0,
        currentMessage: stateData?.message || '', // Current dynamic text (greeting/feedback)
        currentQuestion: currentQuestion,         // The actual question text that persists
        agentName: stateData?.agentName || '',
        agentAvatar: stateData?.agentAvatar || '',
        isEnding: currentState === INTERVIEW_STATES.ENDING,
        isCompleted: currentState === INTERVIEW_STATES.COMPLETE,
    };
}