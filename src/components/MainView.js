import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../svg/logo.svg';
import './App.css';

class MainView extends Component {

/*
  constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          MainView
        </p>


        Lorem ipsum


      </div>
    );
  }
}

export default MainView;
