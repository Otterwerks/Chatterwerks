
export const setMessages = (messages) => ({
    type: 'SET_MESSAGES',
    thread_messages: messages
});

export const setSubmissionStatus = (status) => ({
    type: 'SET_SUBMISSION_STATUS',
    submissionStatus: status
});

export const setQueryStatus = (status) => ({
    type: 'SET_QUERY_STATUS',
    queryStatus: status
});

const defaultUserObject = {
    userName: "",
    userPassword: "",
    currentThread: "Home",
    isLoggedIn: false
}

export const setUser = (user = defaultUserObject) => ({
    type: 'SET_USER',
    userName: user.userName,
    userPassword: user.userPassword,
    currentThread: user.currentThread,
    isLoggedIn: user.isLoggedIn
});

export const setSubscribedUsers = (users = []) => ({
    type: 'SET_SUBSCRIBED_USERS',
    subscribedUsers: users
})