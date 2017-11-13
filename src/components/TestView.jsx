import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/message';

import logo from '../svg/logo.svg';
import './App.css';

import RandomInt from './RandomInt'
import TestMessage from './TestMessage'

class TestView extends Component {

  constructor(props) {
    super(props);
    this.state = {"message_text":""};
    this.updateMessageText = this.updateMessageText.bind(this)
    this.props.getAllMessages();
  }

  updateMessageText(event) {
    let state = this.state
    state.message_text = event.target.value;
    this.setState(state);
  }

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

TestView.propTypes = {
  statusText: PropTypes.string,
  messages:  PropTypes.array,
  currentInteger:  PropTypes.number,
};

function mapStateToProps(state) {
  return {
        statusText: state.message.statusText,
        messages: state.message.messages,
        currentInteger: state.message.currentInteger,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(TestView);
