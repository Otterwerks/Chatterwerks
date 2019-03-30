import { combineReducers } from 'redux';
import messages from './Messages';

const rootReducer = combineReducers({
    messages,
    user,
})

export default rootReducer