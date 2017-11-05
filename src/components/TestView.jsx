import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

import { get_random_int,
         get_all_messages,
         delete_message,
         create_message } from '../utils/http_functions'

class TestView extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 0, "messages":[]};
    this.handleClick = this.handleClick.bind(this)
    this.handleClick = this.getMessages.bind(this)
    this.handleClick = this.deleteMessage.bind(this)
    this.handleClick = this.createMessage.bind(this)

    this.getMessages();
  }

  async handleClick() {
    let res = await get_random_int();
    let data = res.data
    this.setState({"value": data.value});
  }

  async getMessages() {
    let res = await get_all_messages();
    let state = this.state
    state.messages = res.data.messages
    console.log(state)
    this.setState(state);
  }

  async deleteMessage(id) {
    let res = await delete_message(id);
    let state = this.state
    state.messages = res.data.messages
    this.setState(state);
  }

  async createMessage() {
    let res = await create_message("test message");
    console.log("created message: " + res.data.id)
    //this.getMessages();
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
        <Link to="/">&nbsp;Home&nbsp;</Link>
        <Link to="/login">&nbsp;Login&nbsp;</Link>
        <Link to="/register">&nbsp;Register&nbsp;</Link>
        </p>

        <h2> Get Random Int From Server</h2>
        <button onClick={this.handleClick}>Click Me</button>
        <br/>

        <h3>{this.state.value}</h3>

        <h2> Test Database Access</h2>

        <button onClick={this.createMessage}>Click Me</button>
        <br/>

        <ul>
        {
          (this.state.messages) ? this.state.messages.map(function(msg) {
                return <li>{msg.text}</li>}): <div>No Messages To Display</div>
        }
        </ul>

      </div>
    );
  }
}


TestView.propTypes = {
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
)(TestView);
