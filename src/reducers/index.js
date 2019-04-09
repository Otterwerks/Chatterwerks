import { combineReducers } from 'redux';
import messageReducer from './Message';
import userReducer from './User';

const rootReducer = combineReducers({
    message: messageReducer,
    user: userReducer,
})

export default rootReducer