import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

setInterval(function() {
    const chatField = document.getElementById("chatField");
    if (chatField != null) {
        let isScrolledToBottom = chatField.scrollHeight - chatField.clientHeight <= chatField.scrollTop + 100;
        if (isScrolledToBottom || chatField.scrollTop == 0) {
          chatField.scrollTop = chatField.scrollHeight - chatField.clientHeight;
        }
    }
}, 1000)

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const initialState = {
  message: {
    submissionStatus: "",
    queryStatus: "COMPLETE",
    thread_messages: [],
    subscribedUsers: []
  },
  user: {
    isLoggedIn: false,
    userName: "",
    userPassword: "",
    currentThread: "Home",
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(logger));

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
