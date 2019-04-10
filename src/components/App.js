import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Chat from '../containers/ChatContainer';

const App = ({ store }) => (
  <Provider store={store}>
    <div className="container site-bg pb-5">
    <Router>
      <Route path="/" component={Header} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
    </Router>
    </div>
  </Provider>
)

export default App;
