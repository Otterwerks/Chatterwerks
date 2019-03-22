import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Chat from './Chat';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Chat} />
    </Router>
  </Provider>
)

export default App;
