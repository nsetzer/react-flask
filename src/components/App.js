import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

import RandomService from '../service/random'
import env from '../env'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    let res = await RandomService.getRandomInt();
    this.setState({"value": res.value});
    console.log(process.env.NODE_ENV)
    console.log(env.baseUrl)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p>
        <Link to="/login">Login </Link>

        <Link to="/about/react">About</Link>
        </p>
        <p className="App-intro">
          Your App is Now Running
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <h2> Get Random Int From Server</h2>
        <button onClick={this.handleClick}>Click Me</button>
        <p>{this.state.value}</p>

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
