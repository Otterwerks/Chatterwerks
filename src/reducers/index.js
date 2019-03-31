import { combineReducers } from 'redux';
import messages from './Messages';
import user from './User';

const rootReducer = combineReducers({
    messages,
    user,
})

export default rootReducer