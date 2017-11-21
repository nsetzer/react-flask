import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../svg/logo.svg';
import './App.css';

class AboutView extends Component {

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
          AboutView
        </p>

        <ul>
        <li><Link to="/">Home</Link></li>
        </ul>

        <h1>{this.props.match.params.topic}</h1>

        Lorem ipsum


      </div>
    );
  }
}

export default AboutView;
