const userReducerDefaultState = {
  userName: "",
  userPassword: "",
  currentThread: "Home",
  isLoggedIn: false,
  availableThreads: []
};

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          userName: action.userName,
          userPassword: action.userPassword,
          currentThread: action.currentThread,
          isLoggedIn: action.isLoggedIn
        }
      case 'SET_AVAILABLE_THREADS':
        return {
          ...state,
          availableThreads: action.availableThreads
        }
      default:
        return state
    }
  }
  
  export default userReducer