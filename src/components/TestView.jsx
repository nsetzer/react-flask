import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/message';

import logo from '../svg/logo.svg';
import './App.css';

import { get_random_int } from '../utils/http_functions'

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
    this.props.getAllMessages();
  }

  async deleteMessage(id) {
    this.props.deleteMessage(id);
  }

  async createMessage() {
    this.props.createMessage(this.state.message_text);
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

          (this.props.messages) ? this.props.messages.map( (msg) => {
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
  statusText: PropTypes.string,
  messages:  PropTypes.array,
};

function mapStateToProps(state) {
  return {
        statusText: state.message.statusText,
        messages: state.message.messages,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(TestView);
