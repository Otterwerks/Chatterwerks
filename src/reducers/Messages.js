const messages = (state = [], action) => {
    switch (action.type) {
      case 'SUBMIT_MESSAGE':
        return [
          ...state,
          {
            message_id: action.id,
            author: action.user_name,
            text: action.text,
          }
        ]
      default:
        return state
    }
  }
  
  export default messages