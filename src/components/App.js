import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Chat from './Chat';

const App = ({ store }) => (
  <Provider store={store}>
    <div className="container">
    <Router>
      <Route path="/" component={Header} />
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Chat} />
    </Router>
    </div>
  </Provider>
)

export default App;
