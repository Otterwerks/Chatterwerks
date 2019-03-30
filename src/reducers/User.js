const user = (state = {user_name: "", user_password: ""}, action) => {
    switch (action.type) {
      case 'SET_USER':
        return [
          {
            user_name: action.user_name,
            user_password: action.user_password,
            current_thread: action.current_thread,
          }
        ]
      default:
        return state
    }
  }
  
  export default messages