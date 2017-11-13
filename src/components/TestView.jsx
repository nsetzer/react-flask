import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../svg/logo.svg';
import './App.css';

import RandomInt from './RandomInt'
import TestMessage from './TestMessage'

class TestView extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <br/>
          <p>
          <Link to="/">&nbsp;Home&nbsp;</Link>
          <Link to="/login">&nbsp;Login&nbsp;</Link>
          <Link to="/register">&nbsp;Register&nbsp;</Link>
          </p>

        </div>

        <div className="container-fluid content-body">
          <RandomInt/>
          <TestMessage/>
        </div>

      </div>

    );
  }
}

export default TestView;
