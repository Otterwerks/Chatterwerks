
export const displayMessages = ({ messages }) => ({
    type: 'DISPLAY_MESSAGES',
    messages
});

export const setSubmissionStatus = (status) => ({
    type: 'SET_SUBMISSION_STATUS',
    submissionStatus: status
});

