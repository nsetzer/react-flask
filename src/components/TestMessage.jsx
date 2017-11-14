import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/message';
import './TestMessage.css';

class TestMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {"message_text":""};
    this.updateMessageText = this.updateMessageText.bind(this)
    this.createMessage = this.createMessage.bind(this)
    this.props.getAllMessages();
  }

  updateMessageText(event) {
    this.setState({message_text: event.target.value});
  }

  createMessage() {
    if (this.state.message_text) {
      this.props.createMessage(this.state.message_text);
      this.setState({message_text: ""});
    }
  }

  render() {
    return (
      <div>
        <h2 className="center-text"> Test Database Access</h2>

        {this.props.statusText}

        <div className="input-group">
          <input type="text" className="form-control"
                placeholder="Enter Search Term"
                value={this.state.message_text}
                onChange={this.updateMessageText}></input>
          <span className="input-group-btn">
            <button className="btn btn-default"
                    onClick={this.createMessage}>
              <span className="glyphicon glyphicon-send"></span>
            </button>
         </span>
        </div>

        <div>

        <br/>
        <ol className="list-group">
        {
          (this.props.messages) ? this.props.messages.map( (msg) => {
            return <li key={msg.id} className="list-group-item">
                     {msg.text}
                     <div className="pull-right">
                     <a onClick={() => {this.props.deleteMessage(msg.id)}}>
                       <span className="glyphicon glyphicon-trash App-red-icon"></span>
                     </a>
                     </div>
                   </li>
            }) : <div>No Messages To Display</div>
        }
        </ol>
        <br/>
        <br/>
        <br/>
        </div>
      </div>
    );
  }
}

TestMessage.propTypes = {
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
)(TestMessage);