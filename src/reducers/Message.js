const messageReducerDefaultState = {
  submissionStatus: "",
  thread_messages: []
};

const messageReducer = (state = messageReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_SUBMISSION_STATUS':
        return {
          ...state,
          submissionStatus: action.submissionStatus
        }
      case 'DISPLAY_MESSAGES':
        return {
          ...state,
          thread_messages: action.messages
        }
      default:
        return state
    }
  }
  
export default messageReducer