import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

import env from '../env'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>
        <p>
        <Link to="/login">&nbsp;Login&nbsp;</Link>
        <Link to="/register">&nbsp;Register&nbsp;</Link>
        <Link to="/test">&nbsp;Test&nbsp;</Link>
        </p>
        <p className="App-intro">
          Your App is Now Running<br/>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


App.propTypes = {
};

function mapStateToProps(state) {
  return {
    };
}

function mapDispatchToProps(dispatch) {
  return {
    };
}

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(App);
