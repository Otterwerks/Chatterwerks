import { combineReducers } from 'redux';
import messageReducer from './Message';
import userReducer from './User';

// MESSAGE_QUERY
// SUBMIT_MESSAGE
// USER_LOGIN
// USER_REGISTER

// USER_LOGOUT
// SELECT_THREAD

const rootReducer = combineReducers({
    message: messageReducer,
    user: userReducer,
})

export default rootReducer