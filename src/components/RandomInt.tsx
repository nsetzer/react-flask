import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/message';
import './RandomInt.css';


/**
 * RandomInt is a simple example of using redux to manipulate
 * a global state.
 *
 * Notice that if multiple <RandomInt/> components are embedded they
 * all share the same state. Contrast this with the message state, which
 * uses a combination of local state and global state to allow for
 * unique text input fields, while showing a list of messages globally.
 */
class RandomInt extends Component {

  render() {
    return (
      <div className="RandomInt">
        <h2>Get Random Int From Server</h2>
        <button id="btnRandomInt" onClick={this.props.getRandomInt}>Click Me</button>
        <br/>
        <h3>{this.props.currentInteger}</h3>
      </div>
    );
  }
}

RandomInt.propTypes = {
  currentInteger:  PropTypes.number,
};

function mapStateToProps(state) {
  return {
        currentInteger: state.message.currentInteger,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(RandomInt);