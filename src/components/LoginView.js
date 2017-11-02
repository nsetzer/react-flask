import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../svg/logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <ul>
        <li><Link to="/">Home</Link></li>
        </ul>

        <p className="App-intro">
          LoginView
        </p>
      </div>
    );
  }
}

export default App;
