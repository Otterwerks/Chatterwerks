const messages = (state = [], action) => {
    switch (action.type) {
      case 'SUBMIT_MESSAGE':
        return [
          ...state,
          {
            message_id: action.id,
            author: action.author,
            text: action.text,
          }
        ]
      default:
        return state
    }
  }
  
  export default messages