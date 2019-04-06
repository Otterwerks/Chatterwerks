const messageReducerDefaultState = {
  submissionStatus: "",
  queryStatus: "",
  thread_messages: []
};

const messageReducer = (state = messageReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_SUBMISSION_STATUS':
        return {
          ...state,
          submissionStatus: action.submissionStatus
        }
      case 'SET_QUERY_STATUS':
        return {
          ...state,
          queryStatus: action.queryStatus
        }
      case 'SET_MESSAGES':
        return {
          ...state,
          thread_messages: action.thread_messages
        }
      default:
        return state
    }
  }
  
export default messageReducer