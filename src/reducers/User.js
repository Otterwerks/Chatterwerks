const userReducerDefaultState = {
  userName: "",
  userPassword: "",
  currentThread: 1,
  isLoggedIn: false
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
      default:
        return state
    }
  }
  
  export default userReducer