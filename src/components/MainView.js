import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

import RaisedButton from 'material-ui/RaisedButton';

class MainView extends Component {

  logout(e) {
      e.preventDefault();
      this.props.logoutAndRedirect(this.props);
      this.setState({
          open: false,
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome, {this.props.userName}</h1>
        </header>
        <br/>
        <RaisedButton
          style={{ marginTop: 50 }}
          label="Logout"
          onClick={(e) => this.logout(e)}
        />

      </div>
    );
  }
}

MainView.propTypes = {
  logoutAndRedirect: PropTypes.func,
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
