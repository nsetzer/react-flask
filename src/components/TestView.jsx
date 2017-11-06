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
    this.state = {value: 0, "messages":[], "message_text":""};
    this.getRandomInt  = this.getRandomInt.bind(this)
    this.getMessages   = this.getMessages.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
    this.createMessage = this.createMessage.bind(this)
    this.updateMessageText = this.updateMessageText.bind(this)

    this.getMessages();
  }

  async getRandomInt() {
    let res = await get_random_int();
    let data = res.data
    this.setState({"value": data.value});
  }

  async getMessages() {
    let res = await get_all_messages();
    let state = this.state
    state.messages = res.data.messages
    this.setState(state);
  }

  async deleteMessage(id) {
    let res = await delete_message(id);
    let state = this.state
    state.messages = res.data.messages
    this.setState(state);
  }

  async createMessage() {
    await create_message(this.state.message_text);
    this.getMessages();
  }

  updateMessageText(event) {
    let state = this.state
    state.message_text = event.target.value;
    this.setState(state);
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

        <div className="container-fluid content-body">

        <h2> Get Random Int From Server</h2>
        <button id="btn1" onClick={this.getRandomInt}>Click Me</button>
        <br/>

        <h3>{this.state.value}</h3>

        <h2> Test Database Access</h2>

        <div className="input-group">
          <input type="text" className="form-control"
                placeholder="Enter Search Term"
                onChange={this.updateMessageText}></input>
          <span className="input-group-btn">
            <button className="btn btn-default"
                    onClick={this.createMessage}>
              <span className="glyphicon glyphicon-send"></span>
            </button>
         </span>
        </div>

        <div>
        {

          (this.state.messages) ? this.state.messages.map( (msg) => {
            return <div key={msg.id}>
                     {msg.text}
                     <button onClick={() => {this.deleteMessage(msg.id)}}>
                       Delete
                     </button>
                   </div>
            }) : <div>No Messages To Display</div>
        }
        </div>

        </div>

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
