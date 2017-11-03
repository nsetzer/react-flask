import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

class MainView extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
          Welcome, {this.props.userName}!
        </p>
      </div>
    );
  }
}

MainView.propTypes = {
  userName: PropTypes.string,
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
)(MainView);
