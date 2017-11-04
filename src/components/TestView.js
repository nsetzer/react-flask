import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import logo from '../svg/logo.svg';
import './App.css';

import RandomService from '../service/random'
import env from '../env'


class TestView extends Component {

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
        <p>todo</p>
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
